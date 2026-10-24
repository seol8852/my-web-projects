# 👾 몬스터 → assets/monsters.glb (뼈대 애니메이션 버전: 몬스터마다 뼈대 + 동작 클립)
# 사용법: python tools/bake/monsters_export.py            (내보내기)
#         python tools/bake/monsters_export.py preview    (미리보기 그림만)
import sys, os, math, json
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, 'models'))
import bpy
from mathutils import Vector
ASSETS = os.path.abspath(os.path.join(HERE, '..', '..', '..', 'assets'))
OUT = os.path.join(ASSETS, 'monsters.glb')
argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else sys.argv[1:]
PREVIEW = bool(argv and argv[0] == 'preview')
ONLY = argv[1] if len(argv) > 1 else None
bpy.ops.wm.read_factory_settings(use_empty=True)
import lib
lib.reset_model()
import monsters as MM
if ONLY:
    MM.ALL = [f for f in MM.ALL if f.__name__ == ONLY]
MM.build()
mons = []
for _, m, _, _ in MM.PARTS:
    if m not in mons:
        mons.append(m)
OFF = {m: i * 40.0 for i, m in enumerate(mons)}
print('[monsters] mons', mons)
for ob, m, p, k in MM.PARTS:
    ob.location.x += OFF[m]

# ---- 가림(AO) 굽기 → 정점색에 곱하기 ----
sc = bpy.context.scene
sc.render.engine = 'CYCLES'; sc.cycles.device = 'CPU'; sc.cycles.samples = int(os.environ.get('MON_SAMPLES', '48')); sc.cycles.use_denoising = False
w = bpy.data.worlds.new('w'); w.use_nodes = True; sc.world = w
w.light_settings.distance = 0.9
bake_mat = bpy.data.materials.new('bake'); bake_mat.use_nodes = True
for o in bpy.context.selected_objects:
    o.select_set(False)
for ob, m, p, k in MM.PARTS:
    me = ob.data
    me.materials.clear(); me.materials.append(bake_mat)
    a = me.color_attributes.get('AO') or me.color_attributes.new('AO', 'FLOAT_COLOR', 'CORNER')
    me.color_attributes.active_color = a
    ob.select_set(True)
bpy.context.view_layer.objects.active = MM.PARTS[0][0]
bpy.ops.object.bake(type='AO', target='VERTEX_COLORS')
for ob, m, p, k in MM.PARTS:
    me = ob.data
    ao = me.color_attributes['AO']; col = me.color_attributes['Col']
    lo, span = (0.85, 0.15) if k in ('glow', 'wing') else (0.58, 0.42)
    for i in range(len(col.data)):
        v = ao.data[i].color[0]
        f = lo + span * v
        c = col.data[i].color
        col.data[i].color = (c[0] * f, c[1] * f, c[2] * f, 1.0)
    me.color_attributes.remove(ao)
    me.color_attributes.active_color = me.color_attributes['Col']
for ob, m, p, k in MM.PARTS:
    ob.location.x -= OFF[m]
bpy.context.view_layer.update()
for ob, m, p, k in MM.PARTS:
    ob.data.transform(ob.matrix_world); ob.matrix_world = ob.matrix_world.Identity(4)


# =====================================================================
# 뼈대(armature) + 정점 가중치 + 동작 클립
# =====================================================================
from mathutils import Matrix, Quaternion
C3 = Matrix(((1, 0, 0), (0, 0, -1), (0, 1, 0)))     # 게임축 → 블렌더축
C3i = C3.inverted()
def gv(p):
    return Vector((p[0], -p[2], p[1]))
sc.render.fps = 30
ACTS_ALL = []


def make_rig(mon, parts):
    H = MM.HEIGHTS.get(mon, 4)
    ad = bpy.data.armatures.new(mon + '_rig')
    arm = bpy.data.objects.new(f'{mon}|rig', ad)
    sc.collection.objects.link(arm)
    for o in bpy.context.selected_objects:
        o.select_set(False)
    bpy.context.view_layer.objects.active = arm
    arm.select_set(True)
    bpy.ops.object.mode_set(mode='EDIT')
    eb = ad.edit_bones
    blen = 0.22 * max(1.0, H / 3.5)
    def mk(name, p, parent=None):
        b = eb.new(name)
        b.head = gv(p); b.tail = gv(p) + Vector((0, 0, blen)); b.roll = 0.0
        if parent is not None:
            b.parent = eb[parent]
        return b
    mk('root', (0, 0, 0))
    names = [p for (m, p) in MM.PIVOTS if m == mon]
    order = sorted(names, key=lambda n: 0 if n == 'body' else 1)
    path = MM.PATHS.get(mon)
    bones = ['root']
    for n in order:
        piv = MM.PIVOTS[(mon, n)]
        par = MM.PARENT.get((mon, n), 'body') or 'root'
        if n.startswith('leg') or n == 'body':
            par = 'root'
        if par not in eb:
            par = 'body' if 'body' in eb else 'root'
        if n == 'tail' and path:
            k = len(path)
            idx = [0, k // 3, (2 * k) // 3]
            mk('tail0', path[idx[0]], par); mk('tail1', path[idx[1]], 'tail0'); mk('tail2', path[idx[2]], 'tail1')
            bones += ['tail0', 'tail1', 'tail2']
        else:
            mk(n, piv, par)
            bones.append(n)
    bpy.ops.object.mode_set(mode='OBJECT')
    # 정점 가중치
    for ob, p, k in parts:
        if p == 'tail' and path:
            P = [gv(q) for q in path]
            seg = [(P[i], P[i + 1]) for i in range(len(P) - 1)]
            lens = [ (b - a).length for a, b in seg ]
            tot = sum(lens) or 1
            cum = [0]
            for L in lens:
                cum.append(cum[-1] + L)
            gs = [ob.vertex_groups.new(name=f'tail{j}') for j in range(3)]
            for v in ob.data.vertices:
                best, bu = 1e9, 0
                for i, (a, b) in enumerate(seg):
                    ab = b - a
                    t = max(0.0, min(1.0, (v.co - a).dot(ab) / max(1e-9, ab.dot(ab))))
                    d = (a + ab * t - v.co).length
                    if d < best:
                        best, bu = d, (cum[i] + lens[i] * t) / tot
                cs = [0.0, 1 / 3, 2 / 3]
                ws = [max(0.0, 1 - abs(bu - c) * 3) for c in cs]
                if bu >= 2 / 3:
                    ws[2] = 1.0
                s_ = sum(ws) or 1
                for j in range(3):
                    if ws[j] > 0:
                        gs[j].add([v.index], ws[j] / s_, 'REPLACE')
        else:
            g = ob.vertex_groups.new(name=p)
            g.add([v.index for v in ob.data.vertices], 1.0, 'REPLACE')
    # 종류별(일반/빛/날개)로 하나로 합치고 뼈대에 붙이기
    out = []
    kinds = sorted(set(k for _, _, k in parts))
    for kd in kinds:
        obs = [o for o, _, k in parts if k == kd]
        for o in bpy.context.selected_objects:
            o.select_set(False)
        for o in obs:
            o.select_set(True)
        bpy.context.view_layer.objects.active = obs[0]
        if len(obs) > 1:
            bpy.ops.object.join()
        ob = bpy.context.view_layer.objects.active
        ob.name = f'{mon}|{kd or "skin"}'; ob.data.name = ob.name
        ob.parent = arm
        md = ob.modifiers.new('arm', 'ARMATURE'); md.object = arm
        out.append(ob)
    return arm, bones, out


def key_pose(arm, bone, f, rot=(0, 0, 0), loc=(0, 0, 0), scl=(1, 1, 1)):
    pb = arm.pose.bones[bone]
    R = arm.data.bones[bone].matrix_local.to_3x3()
    Ri = R.inverted()
    W = C3 @ lib.rotm(rot, 'XYZ') @ C3i
    pb.rotation_mode = 'QUATERNION'
    pb.rotation_quaternion = (Ri @ W @ R).to_quaternion()
    pb.location = Ri @ (C3 @ Vector(loc))
    Sg = Matrix.Diagonal(Vector(scl))
    Sl = Ri @ (C3 @ Sg @ C3i) @ R
    pb.scale = (abs(Sl[0][0]), abs(Sl[1][1]), abs(Sl[2][2]))
    pb.keyframe_insert('rotation_quaternion', frame=f)
    pb.keyframe_insert('location', frame=f)
    pb.keyframe_insert('scale', frame=f)


def specs(mon, bones):
    H = MM.HEIGHTS.get(mon, 4)
    quad = mon == 'lavaturtle'
    bug = mon == 'bug'
    heavy = mon in ('iron_chimera', 'midboss', 'lavaturtle')
    has = lambda b: b in bones
    A = {}
    # --- 숨쉬기 ---
    k = {}
    k['body'] = [(0, (0, 0, 0), (0, 0, 0), (1, 1, 1)), (24, (0, 0, 0), (0, 0.12 if bug else 0, 0), (0.985, 1.035, 0.985)), (48, (0, 0, 0), (0, 0, 0), (1, 1, 1))]
    k['head'] = [(0, (0.0, 0, 0.0), None, None), (24, (0.05, 0.06, 0.03), None, None), (48, (0, 0, 0), None, None)]
    for s, b in ((1, 'armL'), (-1, 'armR')):
        k[b] = [(0, (0, 0, s * 0.04), None, None), (24, (0.08, 0, s * 0.1), None, None), (48, (0, 0, s * 0.04), None, None)]
    for j, b in enumerate(('tail0', 'tail1', 'tail2')):
        k[b] = [(0, (0, -0.22, 0), None, None), (24, (0, 0.22, 0), None, None), (48, (0, -0.22, 0), None, None)]
        k[b] = [(f + j * 3 if 0 < f < 48 else f, r, l, sc_) for (f, r, l, sc_) in k[b]]
    A['Idle'] = (48, k)
    # --- 걷기 ---
    k = {}
    sw = 0.42 if heavy else 0.62
    bob = (0.035 if heavy else 0.07) * H
    if bug:
        k['body'] = [(0, (0.15, 0, 0.05), (0, 0.1, 0), None), (6, (0.2, 0, 0), (0, 0.3, 0), None), (12, (0.15, 0, -0.05), (0, 0.1, 0), None), (18, (0.2, 0, 0), (0, 0.3, 0), None), (24, (0.15, 0, 0.05), (0, 0.1, 0), None)]
    else:
        k['body'] = [(0, (0, 0, 0.06), (0, 0, 0), None), (6, (0.04, 0, 0), (0, bob, 0), None), (12, (0, 0, -0.06), (0, 0, 0), None), (18, (0.04, 0, 0), (0, bob, 0), None), (24, (0, 0, 0.06), (0, 0, 0), None)]
    k['legL'] = [(0, (-sw, 0, 0), None, None), (12, (sw, 0, 0), None, None), (24, (-sw, 0, 0), None, None)]
    k['legR'] = [(0, (sw, 0, 0), None, None), (12, (-sw, 0, 0), None, None), (24, (sw, 0, 0), None, None)]
    asw = sw * (1.0 if quad else 0.75)
    k['armL'] = [(0, (asw, 0, 0.06), None, None), (12, (-asw, 0, 0.06), None, None), (24, (asw, 0, 0.06), None, None)]
    k['armR'] = [(0, (-asw, 0, -0.06), None, None), (12, (asw, 0, -0.06), None, None), (24, (-asw, 0, -0.06), None, None)]
    k['head'] = [(0, (0.03, 0, -0.03), None, None), (6, (-0.04, 0, 0), None, None), (12, (0.03, 0, 0.03), None, None), (18, (-0.04, 0, 0), None, None), (24, (0.03, 0, -0.03), None, None)]
    for j, b in enumerate(('tail0', 'tail1', 'tail2')):
        k[b] = [(0, (0, -0.3, 0), None, None), (12, (0, 0.3, 0), None, None), (24, (0, -0.3, 0), None, None)]
    A['Walk'] = (24, k)
    # --- 기 모으기 (공격 전 웅크림, 마지막 자세 유지) ---
    k = {}
    if quad:
        k['body'] = [(0, (0, 0, 0), (0, 0, 0), (1, 1, 1)), (12, (-0.22, 0, 0), (0, 0.05 * H, -0.05 * H), (1.04, 0.95, 1.04))]
        k['armL'] = [(0, (0, 0, 0), None, None), (12, (-0.9, 0, 0.2), None, None)]
        k['armR'] = [(0, (0, 0, 0), None, None), (12, (-0.9, 0, -0.2), None, None)]
        k['head'] = [(0, (0, 0, 0), None, None), (12, (-0.35, 0, 0), None, None)]
        k['legL'] = [(0, (0, 0, 0), None, None), (12, (0.25, 0, 0), None, None)]
        k['legR'] = [(0, (0, 0, 0), None, None), (12, (0.25, 0, 0), None, None)]
    else:
        k['body'] = [(0, (0, 0, 0), (0, 0, 0), (1, 1, 1)), (12, (-0.22, 0, 0), (0, -0.05 * H, -0.04 * H), (1.07, 0.9, 1.07))]
        k['armL'] = [(0, (0, 0, 0), None, None), (12, (2.6, 0, 0.3), None, None)]
        k['armR'] = [(0, (0, 0, 0), None, None), (12, (2.6, 0, -0.3), None, None)]
        k['head'] = [(0, (0, 0, 0), None, None), (12, (-0.3, 0, 0), None, None)]
        k['legL'] = [(0, (0, 0, 0), None, None), (12, (-0.2, 0, 0.12), None, None)]
        k['legR'] = [(0, (0, 0, 0), None, None), (12, (-0.2, 0, -0.12), None, None)]
    for b in ('tail0', 'tail1', 'tail2'):
        k[b] = [(0, (0, 0, 0), None, None), (12, (0.35, 0, 0), None, None)]
    A['Windup'] = (12, k)
    # --- 내려치기 ---
    k = {}
    W = A['Windup'][1]
    def last(b):
        L = W.get(b)
        return L[-1] if L else (0, (0, 0, 0), (0, 0, 0), (1, 1, 1))
    def S(b, mid, end_=(0, 0, 0), midloc=None, midscl=None):
        _, r0, l0, s0 = last(b)
        k[b] = [(0, r0, l0, s0), (3, mid, midloc, midscl), (7, mid, midloc, midscl), (16, end_, (0, 0, 0), (1, 1, 1))]
    if quad:
        S('body', (0.18, 0, 0), midloc=(0, -0.05 * H, 0.06 * H), midscl=(1.05, 0.93, 1.05))
        S('armL', (0.35, 0, 0.15)); S('armR', (0.35, 0, -0.15)); S('head', (0.35, 0, 0))
        S('legL', (-0.15, 0, 0)); S('legR', (-0.15, 0, 0))
    else:
        S('body', (0.42, 0, 0), midloc=(0, -0.02 * H, 0.12 * H), midscl=(0.95, 1.06, 0.95))
        S('armL', (-1.3, 0, 0.1)); S('armR', (-1.3, 0, -0.1)); S('head', (0.28, 0, 0))
        S('legL', (0.35, 0, 0)); S('legR', (-0.3, 0, 0))
    for b in ('tail0', 'tail1', 'tail2'):
        S(b, (-0.4, 0, 0))
    A['Strike'] = (16, k)
    # --- 맞음 ---
    k = {}
    for b, r in (('body', (-0.32, 0, 0.08)), ('head', (-0.45, 0, -0.1)), ('armL', (0.7, 0, 0.35)), ('armR', (0.7, 0, -0.35)), ('tail0', (0.4, 0, 0))):
        k[b] = [(0, (0, 0, 0), None, None), (2, r, None, None), (10, (0, 0, 0), None, None)]
    k['body'][1] = (2, (-0.32, 0, 0.08), (0, 0, -0.04 * H), (1.05, 0.95, 1.05))
    A['Hit'] = (10, k)
    # --- 쓰러짐 ---
    k = {}
    if quad:
        k['body'] = [(0, (0, 0, 0), (0, 0, 0), (1, 1, 1)), (5, (-0.25, 0, 0), (0, 0.04 * H, 0), (1, 1, 1)), (18, (0.06, 0, 0.12), (0, -0.2 * H, 0), (1.06, 0.92, 1.06)), (30, (0.06, 0, 0.12), (0, -0.2 * H, 0), (1.06, 0.92, 1.06))]
        for b, z in (('armL', 1.0), ('armR', -1.0), ('legL', 1.0), ('legR', -1.0)):
            k[b] = [(0, (0, 0, 0), None, None), (18, (0, 0, z), None, None), (30, (0, 0, z), None, None)]
        k['head'] = [(0, (0, 0, 0), None, None), (5, (-0.5, 0, 0), None, None), (20, (0.55, 0, 0.2), None, None), (30, (0.55, 0, 0.2), None, None)]
    else:
        drop = -0.62 * MM.PIVOTS.get((mon, 'body'), (0, 1, 0))[1]
        bz = -0.22 * H
        k['body'] = [(0, (0, 0, 0), (0, 0, 0), (1, 1, 1)), (5, (-0.3, 0, 0.05), (0, 0.03 * H, 0), (1, 1, 1)), (16, (-1.45, 0, 0.18), (0.0, drop, bz), (1, 1, 1)), (19, (-1.32, 0, 0.15), (0, drop + 0.05 * H, bz), (1, 1, 1)), (30, (-1.4, 0, 0.16), (0, drop, bz), (1, 1, 1))]
        k['head'] = [(0, (0, 0, 0), None, None), (5, (-0.5, 0, 0), None, None), (18, (0.3, 0, 0.3), None, None), (30, (0.3, 0, 0.3), None, None)]
        for b, z in (('armL', 1.2), ('armR', -0.6)):
            k[b] = [(0, (0, 0, 0), None, None), (16, (0.4, 0, z), None, None), (30, (0.4, 0, z), None, None)]
        for b, z in (('legL', 0.3), ('legR', -0.2)):
            k[b] = [(0, (0, 0, 0), None, None), (16, (-0.9, 0, z), None, None), (30, (-0.9, 0, z), None, None)]
    for b in ('tail0', 'tail1', 'tail2'):
        k[b] = [(0, (0, 0, 0), None, None), (16, (0.5, 0, 0), None, None), (30, (0.5, 0, 0), None, None)]
    A['Death'] = (30, k)
    # --- 거북: 등껍질 회전 (머리·다리·꼬리를 집어넣음) ---
    if quad:
        k = {}
        tuck = (0.12, 0.12, 0.12)
        for b in ('head', 'armL', 'armR', 'legL', 'legR', 'tail0'):
            k[b] = [(0, (0, 0, 0), (0, 0, 0), tuck), (10, (0, 0, 0), (0, 0, 0), tuck)]
        k['body'] = [(0, (0, 0, 0), (0, -0.09 * H, 0), (1, 1, 1)), (10, (0, 0, 0), (0, -0.09 * H, 0), (1, 1, 1))]
        A['Spin'] = (10, k)
    return A


def build_actions(mon, arm, bones):
    arm.animation_data_create()
    ad = arm.animation_data
    bpy.context.view_layer.objects.active = arm
    for name, (L, k) in specs(mon, bones).items():
        act = bpy.data.actions.new(f'{mon}|{name}')
        ad.action = act
        for b in bones:
            if b == 'root':
                continue
            keys = k.get(b)
            if not keys:
                keys = [(0, (0, 0, 0), (0, 0, 0), (1, 1, 1)), (L, (0, 0, 0), (0, 0, 0), (1, 1, 1))]
            for (f, r, l, s_) in keys:
                key_pose(arm, b, f, r or (0, 0, 0), l or (0, 0, 0), s_ or (1, 1, 1))
        # 리셋
        for pb in arm.pose.bones:
            pb.rotation_quaternion = (1, 0, 0, 0); pb.location = (0, 0, 0); pb.scale = (1, 1, 1)
        tr = ad.nla_tracks.new(); tr.name = act.name
        st = tr.strips.new(act.name, 0, act)
        ad.action = None
        ACTS_ALL.append(act.name)


rigs = []
for m in mons:
    parts = [(ob, p, k) for ob, mm, p, k in MM.PARTS if mm == m]
    arm, bones, objs = make_rig(m, parts)
    build_actions(m, arm, bones)
    rigs.append((m, arm, objs, bones))
tri = {m: sum(sum(len(pl.vertices) - 2 for pl in o.data.polygons) for o in objs) for m, arm, objs, b in rigs}
print('[monsters] rigs', [(m, len(b)) for m, a, o, b in rigs], 'tris', tri, 'actions', len(ACTS_ALL))

if not PREVIEW:
    for o in bpy.context.selected_objects:
        o.select_set(False)
    for m, arm, objs, b in rigs:
        arm.select_set(True)
        for o in objs:
            o.data.materials.clear()
            o.select_set(True)
    bpy.ops.export_scene.gltf(filepath=OUT, export_format='GLB', use_selection=True, export_normals=True, export_texcoords=False,
                              export_materials='NONE', export_vertex_color='ACTIVE', export_yup=True, export_apply=False,
                              export_animations=True, export_animation_mode='ACTIONS', export_skins=True, export_force_sampling=True,
                              export_frame_step=1, export_def_bones=False, export_optimize_animation_size=False)
    meta = {'heights': MM.HEIGHTS, 'radii': getattr(MM, 'RADII', {}), 'rigged': True,
            'pivots': {f'{m}|{p}': MM.PIVOTS[(m, p)] for (m, p) in MM.PIVOTS}}
    with open(os.path.join(ASSETS, 'monsters_meta.json'), 'w') as f:
        json.dump(meta, f)
    print('[monsters] wrote', OUT, os.path.getsize(OUT) // 1024, 'KB')
else:
    # 미리보기: 각 동작의 특정 프레임 자세를 몬스터별로 렌더
    act_name = os.environ.get('MON_ACT', 'Walk'); fr = int(os.environ.get('MON_FRAME', '6'))
    vm = bpy.data.materials.new('vc'); vm.use_nodes = True
    nt = vm.node_tree; b_ = nt.nodes['Principled BSDF']; b_.inputs['Roughness'].default_value = 0.8
    at = nt.nodes.new('ShaderNodeVertexColor'); at.layer_name = 'Col'
    nt.links.new(at.outputs['Color'], b_.inputs['Base Color'])
    for i, (m, arm, objs, b) in enumerate(rigs):
        for o in objs:
            o.data.materials.clear(); o.data.materials.append(vm)
        arm.location.x = (i - (len(rigs) - 1) / 2) * float(os.environ.get('MON_GAP', '6'))
        ad = arm.animation_data
        for tr in ad.nla_tracks:
            tr.mute = not tr.name.endswith('|' + act_name)
    sc.frame_set(fr)
    sc.render.engine = 'CYCLES'; sc.cycles.samples = 16
    sc.render.resolution_x = 1800; sc.render.resolution_y = 700
    w.node_tree.nodes['Background'].inputs[0].default_value = (0.55, 0.6, 0.68, 1)
    sd = bpy.data.lights.new('sun', 'SUN'); sd.energy = 3.5
    so = bpy.data.objects.new('sun', sd); sc.collection.objects.link(so)
    so.rotation_euler = Vector((0.5, -1.0, 1.0)).normalized().to_track_quat('Z', 'Y').to_euler()
    cam_d = bpy.data.cameras.new('c'); cam_d.type = 'ORTHO'; cam_d.ortho_scale = float(os.environ.get('MON_ORTHO', 6.2 * len(rigs)))
    cam = bpy.data.objects.new('cam', cam_d); sc.collection.objects.link(cam); sc.camera = cam
    yaw = float(os.environ.get('MON_YAW', '0.9'))
    d = Vector((math.sin(yaw), -math.cos(yaw), 0.28)).normalized()
    cam.location = Vector((0, 0, float(os.environ.get('MON_CY', '2.4')))) + d * 40
    cam.rotation_euler = (-d).to_track_quat('-Z', 'Y').to_euler()
    sc.view_settings.view_transform = 'Standard'
    sc.render.filepath = '/home/claude/shots/rig_%s_%s%d.png' % (os.environ.get('MON_TAG', 'a'), act_name, fr)
    bpy.ops.render.render(write_still=True)
    print('[monsters] preview', sc.render.filepath)
