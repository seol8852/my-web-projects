# 2단계: Blender(Cycles)로 구조물마다 라이트맵(하늘빛 GI + 앰비언트 오클루전)을 구워 텍스처 1장짜리 .glb로 만듦
# 사용법: blender -b -P tools/bake/bake.py -- [키필터]      (또는 pip의 bpy 모듈: python tools/bake/bake.py)
# 입력: tools/bake/in/*.glb + index.json   출력: ../assets/baked/*.glb + manifest.json
import bpy, bmesh, sys, os, json, math, hashlib, re, time
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
IN = os.path.join(HERE, 'in')
OUT = os.path.abspath(os.path.join(HERE, '..', '..', '..', 'assets', 'baked'))
os.makedirs(OUT, exist_ok=True)
argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else sys.argv[1:]
FILTER = re.compile(argv[0]) if argv else None
SAMPLES = int(os.environ.get('BAKE_SAMPLES', '64'))
DENSITY = float(os.environ.get('BAKE_DENSITY', '44'))   # 1m(=1유닛)당 텍셀
AO_STRENGTH = float(os.environ.get('BAKE_AO', '0.9'))
MODE = os.environ.get('BAKE_MODE', 'full')   # full: 햇빛+하늘 전체 조명 굽기(무광 재질) / ao: 가림만
SUN = float(os.environ.get('BAKE_SUN', '2.2'))
BEVEL = float(os.environ.get('BAKE_BEVEL', '0.03'))

# 외곽선 두께(유닛). 작은 소품은 얇게
def outline_for(size):
    m = max(size)
    return 0.025 if m < 3 else 0.032 if m < 10 else 0.04


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    sc.cycles.device = 'CPU'
    sc.cycles.samples = SAMPLES
    sc.cycles.use_denoising = False
    sc.render.bake.margin = 6
    sc.render.bake.use_clear = True
    w = bpy.data.worlds.new('sky')
    w.use_nodes = True
    bg = w.node_tree.nodes['Background']
    if MODE == 'full':
        bg.inputs[0].default_value = (0.78, 0.86, 1.0, 1)   # 하늘빛
        bg.inputs[1].default_value = 1.0
    else:
        bg.inputs[0].default_value = (1.0, 1.0, 1.0, 1)
        bg.inputs[1].default_value = 1.0
    sc.world = w
    if MODE == 'full':
        # 게임 태양 방향(three: 48,86,40 → blender: 48,-40,86)과 같은 부드러운 햇빛
        sun_d = bpy.data.lights.new('sun', 'SUN')
        sun_d.energy = SUN
        sun_d.angle = math.radians(6)
        sun_d.color = (1.0, 0.95, 0.82)
        sun = bpy.data.objects.new('sun', sun_d)
        sc.collection.objects.link(sun)
        import mathutils
        d = mathutils.Vector((48, -40, 86)).normalized()
        sun.rotation_euler = d.to_track_quat('Z', 'Y').to_euler()
    return sc


def soft(R, valid, radius=2, sigma=1.3):
    k = np.exp(-0.5 * (np.arange(-radius, radius + 1) / sigma) ** 2); k /= k.sum()
    W = valid.astype(np.float32)[..., None]
    def blur(X):
        Y = np.zeros_like(X)
        for i, w in enumerate(k):
            Y += w * np.roll(X, i - radius, axis=0)
        Z = np.zeros_like(Y)
        for i, w in enumerate(k):
            Z += w * np.roll(Y, i - radius, axis=1)
        return Z
    num = blur(R * W); den = blur(W)
    out = np.where(den > 1e-4, num / np.maximum(den, 1e-4), R)
    return np.where(W > 0, out, R)


def pow2(n):
    return int(2 ** round(math.log2(max(1, n))))


MODELS = os.path.join(HERE, 'models')


def model_name(key):
    """'bush:1.4' → ('bush', [1.4]) : 인자가 있는 소품은 models/<이름>.py 의 build(*인자) 로 만듦"""
    base, _, rest = key.partition(':')
    args = []
    for a in (rest.split(',') if rest else []):
        try:
            args.append(int(a))
        except ValueError:
            try:
                args.append(float(a))
            except ValueError:
                args.append(a)
    return base, args


def build_model(key, sc):
    """models/<key>.py 가 있으면 Blender에서 새로 모델링한 구조물을 사용 (외곽선 .ol.glb도 여기서 만듦)"""
    import importlib
    if MODELS not in sys.path:
        sys.path.insert(0, MODELS)
    import lib
    importlib.reload(lib)
    lib.reset_model()
    base, args = model_name(key)
    mod = importlib.import_module(base)
    importlib.reload(mod)
    mod.lib = lib
    mod.build(*args)
    ol_file = None
    olob = lib.build_outline_object()
    if olob:
        bpy.ops.object.select_all(action='DESELECT')
        olob.select_set(True)
        bpy.context.view_layer.objects.active = olob
        olob.data.color_attributes.active_color = olob.data.color_attributes['Tint']
        ol_file = re.sub(r'[^a-zA-Z0-9]+', '_', key) + '.ol.glb'
        kw = dict(filepath=os.path.join(OUT, ol_file), export_format='GLB', use_selection=True, export_normals=False,
                  export_texcoords=False, export_materials='NONE', export_yup=True, export_apply=True, export_animations=False)
        try:
            bpy.ops.export_scene.gltf(export_vertex_color='ACTIVE', **kw)
        except TypeError:
            bpy.ops.export_scene.gltf(export_colors=True, **kw)
        bpy.data.objects.remove(olob, do_unlink=True)
    return [o for o in lib.MODEL_OBJS if o.name in bpy.data.objects], ol_file


def bake_one(key, ent):
    t0 = time.time()
    sc = reset()
    modeled = os.path.exists(os.path.join(MODELS, model_name(key)[0] + '.py'))
    ol_file = None
    if modeled:
        meshes, ol_file = build_model(key, sc)
    else:
        bpy.ops.import_scene.gltf(filepath=os.path.join(IN, ent['file']))
        meshes = [o for o in sc.objects if o.type == 'MESH']
    if not meshes:
        return None
    # 원본 텍스처는 "원본 값 그대로"(게임과 같은 규칙)로 읽기
    for img in bpy.data.images:
        img.colorspace_settings.name = 'Non-Color'
    bpy.ops.object.select_all(action='DESELECT')
    for o in meshes:
        o.select_set(True)
    bpy.context.view_layer.objects.active = meshes[0]
    if len(meshes) > 1:
        bpy.ops.object.join()
    ob = bpy.context.view_layer.objects.active
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    me = ob.data
    src_uv = me.uv_layers[0].name if len(me.uv_layers) else None
    if modeled:
        # 새 모델은 면적·크기를 직접 계산 (추출본 index.json 대신)
        ent = dict(ent)
        ent['area'] = sum(p.area for p in me.polygons) * 0.6   # 숨은 면·작은 부품이 많아 실제 보이는 면적은 더 작음
        xs = [v.co for v in me.vertices]
        ent['size'] = [max(c[i] for c in xs) - min(c[i] for c in xs) for i in range(3)]
    else:
        # 정점 합치기 → UV 섬이 삼각형 단위로 쪼개지지 않게 (모서리 법선은 유지)
        bm = bmesh.new(); bm.from_mesh(me)
        bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=0.0005)
        bm.to_mesh(me); bm.free()
    if BEVEL > 0 and not modeled:
        # 모서리를 살짝 둥글게 → 빛을 받는 하이라이트 선이 생겨 말랑한 느낌
        bv = ob.modifiers.new('bevel', 'BEVEL')
        bv.width = BEVEL; bv.segments = 2; bv.limit_method = 'ANGLE'; bv.angle_limit = math.radians(50)
        bv.harden_normals = False; bv.use_clamp_overlap = True
        bpy.ops.object.modifier_apply(modifier='bevel')

    # 텍스처 노드가 항상 원본 UV를 쓰도록 고정
    for mat in me.materials:
        if not mat or not mat.use_nodes:
            continue
        nt = mat.node_tree
        for n in list(nt.nodes):
            if n.type == 'TEX_IMAGE' and src_uv and not n.inputs['Vector'].is_linked:
                uvn = nt.nodes.new('ShaderNodeUVMap'); uvn.uv_map = src_uv
                nt.links.new(uvn.outputs['UV'], n.inputs['Vector'])

    # 라이트맵 UV
    bake_uv = me.uv_layers.new(name='BakeUV')
    me.uv_layers.active = bake_uv
    if src_uv:
        me.uv_layers[src_uv].active_render = True
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(60), island_margin=0.0, area_weight=0.0, correct_aspect=True, scale_to_bounds=False)
    res = max(256, min(2048, pow2(math.sqrt(max(ent['area'], 1) / 0.55) * DENSITY)))
    try:
        bpy.ops.uv.pack_islands(rotate=True, margin=4.0 / res)
    except Exception:
        pass
    bpy.ops.object.mode_set(mode='OBJECT')

    # 바닥(빛 가림·풀빛 반사용, 굽기 대상 아님)
    bpy.ops.mesh.primitive_plane_add(size=max(ent['size']) * 4 + 20, location=(0, 0, -0.01))
    ground = bpy.context.active_object
    gm = bpy.data.materials.new('ground'); gm.use_nodes = True
    gm.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (0.62, 0.66, 0.5, 1)
    gm.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value = 1.0
    ground.data.materials.append(gm)

    # 금속·광택 끄기 (굽기는 확산광만)
    for mat in me.materials:
        if mat and mat.use_nodes:
            for n in mat.node_tree.nodes:
                if n.type == 'BSDF_PRINCIPLED':
                    n.inputs['Metallic'].default_value = 0.0
                    n.inputs['Roughness'].default_value = 1.0
                    if 'Emission Strength' in n.inputs:
                        n.inputs['Emission Strength'].default_value = 0.0

    def target(name):
        img = bpy.data.images.new(name, res, res, alpha=False, float_buffer=True)
        img.colorspace_settings.name = 'Non-Color'
        for mat in me.materials:
            if not mat or not mat.use_nodes:
                continue
            nt = mat.node_tree
            tn = nt.nodes.get('__bake__') or nt.nodes.new('ShaderNodeTexImage')
            tn.name = '__bake__'; tn.image = img
            for n in nt.nodes:
                n.select = False
            tn.select = True
            nt.nodes.active = tn
        return img

    bpy.ops.object.select_all(action='DESELECT')
    ob.select_set(True)
    bpy.context.view_layer.objects.active = ob

    sc.cycles.samples = 1
    a_img = target('albedo')
    bpy.ops.object.bake(type='DIFFUSE', pass_filter={'COLOR'}, margin=6, use_clear=True)
    A = np.array(a_img.pixels[:], dtype=np.float32).reshape(res, res, 4)[..., :3]
    if os.environ.get('BAKE_DEBUG'):
        a_img.filepath_raw = os.path.join(HERE, 'debug_albedo.png'); a_img.file_format = 'PNG'; a_img.save()

    sc.cycles.samples = SAMPLES
    l_img = target('lit')
    bpy.ops.object.bake(type='DIFFUSE', pass_filter={'DIRECT', 'INDIRECT', 'COLOR'}, margin=6, use_clear=True)
    L = np.array(l_img.pixels[:], dtype=np.float32).reshape(res, res, 4)[..., :3]

    if MODE == 'full':
        # 조명 비율 R = L/A. 햇빛 받는 면 ≈ 1.12, 그늘 ≈ 0.55~0.7 이 되도록 정규화 후 부드럽게 압축
        R = L / np.maximum(A, 1e-3)
        valid = A.mean(axis=2) > 0.02
        R = soft(R, valid)                                 # 조명은 부드러운 성분 → 노이즈만 걸러냄 (색 텍스처는 선명 유지)
        ref = np.percentile(R.mean(axis=2)[valid], 92) if valid.any() else 1.0
        R = R / max(ref, 1e-3) * 1.12
        lum = R.mean(axis=2, keepdims=True)
        R = lum + (R - lum) * 0.7
        R = 0.58 + 0.42 * np.clip(R, 0, 1.6)             # 그늘이 새까매지지 않게 바닥값 (툰 느낌의 밝은 그늘)
        R = np.minimum(R, 1.12)                          # 블룸에 하얗게 번지지 않게
        F = np.clip(A * R, 0, 1)
        out = np.ones((res, res, 4), dtype=np.float32)
        out[..., :3] = F
        return finish(key, ent, ob, me, res, out, t0, ol_file)
    # 가림 비율(색 번짐 포함) → 원래 색 위에 곱하기. 너무 어둡지 않게 살짝 들어올림
    O = np.clip(L / np.maximum(A, 1e-3), 0.0, 1.25)
    lum = O.mean(axis=2, keepdims=True)
    O = lum + (O - lum) * 0.6           # 색 번짐은 은은하게
    O = np.power(np.clip(O, 0, 1.25), 0.85)
    F = A * (1.0 - AO_STRENGTH + AO_STRENGTH * O)
    F = np.clip(F, 0, 1)
    out = np.ones((res, res, 4), dtype=np.float32)
    out[..., :3] = F
    return finish(key, ent, ob, me, res, out, t0, ol_file)


def finish(key, ent, ob, me, res, out, t0, ol_file=None):
    fin = bpy.data.images.new('baked_' + ent['file'][:-4], res, res, alpha=False)
    fin.colorspace_settings.name = 'Non-Color'
    fin.pixels[:] = out.ravel()

    # 재질 1개로 정리
    m = bpy.data.materials.new('baked'); m.use_nodes = True
    nt = m.node_tree
    bsdf = nt.nodes['Principled BSDF']
    tn = nt.nodes.new('ShaderNodeTexImage'); tn.image = fin
    uvn = nt.nodes.new('ShaderNodeUVMap'); uvn.uv_map = 'BakeUV'
    nt.links.new(uvn.outputs['UV'], tn.inputs['Vector'])
    nt.links.new(tn.outputs['Color'], bsdf.inputs['Base Color'])
    me.materials.clear()
    me.materials.append(m)
    for p in me.polygons:
        p.material_index = 0
    for uvl in [u for u in me.uv_layers if u.name != 'BakeUV']:
        me.uv_layers.remove(uvl)
    for attr in [a for a in me.color_attributes]:
        me.color_attributes.remove(attr)

    for o in [o for o in bpy.context.scene.objects if o != ob]:
        bpy.data.objects.remove(o, do_unlink=True)
    bpy.ops.object.select_all(action='DESELECT')
    ob.select_set(True)
    out_path = os.path.join(OUT, ent['file'])
    bpy.ops.export_scene.gltf(filepath=out_path, export_format='GLB', use_selection=True, export_image_format='JPEG',
                              export_image_quality=86, export_texcoords=True, export_normals=True, export_materials='EXPORT',
                              export_yup=True, export_apply=True, export_tangents=False, export_animations=False)
    with open(out_path, 'rb') as f:
        h = hashlib.sha1(f.read()).hexdigest()[:10]
    print(f'[bake] {key}: {res}px, {len(me.polygons)} faces, {os.path.getsize(out_path)//1024}KB, {time.time()-t0:.1f}s', flush=True)
    r = {'file': ent['file'], 'v': h, 'res': res, 'mode': MODE}
    if ol_file:
        r['ol'] = ol_file; r['modeled'] = True
    return r


def main():
    if os.environ.get('KIT'):
        # 조립식 부품(전투 스테이지·레이드): models/kit_*.py → assets/baked/kit_*.glb + kit.json (가림만 굽고 색은 게임에서 테마대로)
        names = sorted(f[:-3] for f in os.listdir(MODELS) if f.startswith('kit_') and f.endswith('.py'))
        index = {n: {'file': n + '.glb'} for n in names}
        man_path = os.path.join(OUT, 'kit.json')
    else:
        index = json.load(open(os.path.join(IN, 'index.json')))
        man_path = os.path.join(OUT, 'manifest.json')
    man = {'items': {}}
    if os.path.exists(man_path):
        man = json.load(open(man_path))
    for key, ent in index.items():
        if FILTER and not FILTER.search(key):
            continue
        try:
            r = bake_one(key, ent)
            if r:
                man['items'][key] = r
        except Exception as e:
            print('[bake] 실패', key, e, flush=True)
    man['items'] = {k: v for k, v in man['items'].items() if k in index}
    for k, v in man['items'].items():
        v.pop('outline', None)
        if not v.get('modeled'):
            v['ol'] = index[k].get('ol')
        if os.environ.get('KIT'):
            v.pop('ol', None)   # 부품은 외곽선을 게임에서 따로 처리
    json.dump(man, open(man_path, 'w'), ensure_ascii=False, indent=1)
    print('[bake] manifest', len(man['items']), flush=True)


main()
