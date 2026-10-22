# 🧱 Blender 모델링 도우미 (구조물 새로 만들기용)
#  - 좌표는 게임(three.js) 기준으로 적으면 됨: P(x, y, z)  (y가 위, +z가 건물 정면)
#  - 색은 게임과 같은 규칙(16진수 값을 그대로 사용)
#  - 모든 오브젝트는 'Tint' 색 속성을 가짐(개별 돌·기와 색 흔들림) → 합쳐도 검게 안 됨
#  - ol=True 로 만든 부품만 외곽선(뒷면 껍데기) 대상
import bpy, bmesh, math, random
from mathutils import Vector, Matrix, Euler

TAU = math.pi * 2
MODEL_OBJS = []
OUTLINE_OBJS = []
_mats = {}


def P(x, y, z):
    """게임 좌표(y-up, +z 정면) → Blender 좌표(z-up, -y 정면)"""
    return Vector((x, -z, y))


def hexcol(h):
    return ((h >> 16 & 255) / 255.0, (h >> 8 & 255) / 255.0, (h & 255) / 255.0, 1.0)


def reset_model():
    MODEL_OBJS.clear(); OUTLINE_OBJS.clear(); _mats.clear()


# ------------------------------------------------------------------
# 재질 (절차적 텍스처는 굽기 때 색으로 구워짐)
# ------------------------------------------------------------------
def material(name, color, kind='plain', scale=1.0, amount=0.12, color2=None):
    key = (name, color, kind, scale, amount, color2)
    if key in _mats:
        return _mats[key]
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    nodes, links = nt.nodes, nt.links
    bsdf = nodes['Principled BSDF']
    bsdf.inputs['Roughness'].default_value = 1.0
    base = nodes.new('ShaderNodeRGB'); base.outputs[0].default_value = hexcol(color)
    tint = nodes.new('ShaderNodeVertexColor'); tint.layer_name = 'Tint'
    mul = nodes.new('ShaderNodeMix'); mul.data_type = 'RGBA'; mul.blend_type = 'MULTIPLY'; mul.inputs['Factor'].default_value = 1.0
    links.new(base.outputs[0], mul.inputs[6]); links.new(tint.outputs['Color'], mul.inputs[7])
    out = mul.outputs[2]
    if kind != 'plain':
        tc = nodes.new('ShaderNodeTexCoord')
        mp = nodes.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (scale, scale, scale)
        links.new(tc.outputs['Object'], mp.inputs['Vector'])
        if kind == 'wood':
            tx = nodes.new('ShaderNodeTexWave'); tx.wave_type = 'BANDS'; tx.bands_direction = 'Z'
            tx.inputs['Scale'].default_value = 3.0; tx.inputs['Distortion'].default_value = 6.0; tx.inputs['Detail'].default_value = 3.0
            fac = tx.outputs['Fac']
        elif kind == 'stone':
            tx = nodes.new('ShaderNodeTexNoise'); tx.inputs['Scale'].default_value = 4.0; tx.inputs['Detail'].default_value = 6.0
            fac = tx.outputs['Fac']
        else:  # plaster / soft noise
            tx = nodes.new('ShaderNodeTexNoise'); tx.inputs['Scale'].default_value = 2.5; tx.inputs['Detail'].default_value = 3.0
            fac = tx.outputs['Fac']
        links.new(mp.outputs['Vector'], tx.inputs['Vector'])
        dark = nodes.new('ShaderNodeMix'); dark.data_type = 'RGBA'; dark.blend_type = 'MULTIPLY'
        c2 = nodes.new('ShaderNodeRGB')
        c2.outputs[0].default_value = hexcol(color2) if color2 is not None else (1 - amount, 1 - amount * 1.05, 1 - amount * 1.15, 1)
        ramp = nodes.new('ShaderNodeMapRange')
        ramp.inputs['From Min'].default_value = 0.35; ramp.inputs['From Max'].default_value = 0.65
        links.new(fac, ramp.inputs['Value'])
        links.new(ramp.outputs['Result'], dark.inputs['Factor'])
        links.new(out, dark.inputs[6]); links.new(c2.outputs[0], dark.inputs[7])
        # 곱하기 결과를 원래 색과 섞기: Factor 위치에 따라 어두운 무늬
        mix2 = nodes.new('ShaderNodeMix'); mix2.data_type = 'RGBA'; mix2.blend_type = 'MIX'
        links.new(ramp.outputs['Result'], mix2.inputs['Factor'])
        links.new(out, mix2.inputs[6])
        mulc = nodes.new('ShaderNodeMix'); mulc.data_type = 'RGBA'; mulc.blend_type = 'MULTIPLY'; mulc.inputs['Factor'].default_value = 1.0
        links.new(out, mulc.inputs[6]); links.new(c2.outputs[0], mulc.inputs[7])
        links.new(mulc.outputs[2], mix2.inputs[7])
        out = mix2.outputs[2]
    links.new(out, bsdf.inputs['Base Color'])
    _mats[key] = m
    return m


# ------------------------------------------------------------------
# 오브젝트 마무리: 베벨·부드러운 음영·색 흔들림·등록
# ------------------------------------------------------------------
def finish(obj, mat, bevel=0.0, seg=2, smooth=True, angle=40, tint=None, jitter=0.0, ol=False, ol_t=0.035):
    obj.data.materials.clear()
    obj.data.materials.append(mat)
    bpy.context.view_layer.objects.active = obj
    for o in bpy.context.selected_objects:
        o.select_set(False)
    obj.select_set(True)
    if bevel > 0:
        bv = obj.modifiers.new('bv', 'BEVEL')
        bv.width = bevel; bv.segments = seg; bv.limit_method = 'ANGLE'; bv.angle_limit = math.radians(35)
        bv.use_clamp_overlap = True
        bpy.ops.object.modifier_apply(modifier=bv.name)
    me = obj.data
    if smooth:
        for p in me.polygons:
            p.use_smooth = True
        try:
            me.set_sharp_from_angle(angle=math.radians(angle))
        except Exception:
            pass
    else:
        for p in me.polygons:
            p.use_smooth = False
    # 색 흔들림 (돌·기와 하나하나 살짝 다른 색)
    t = tint if tint is not None else (1.0, 1.0, 1.0)
    if jitter > 0:
        j = 1.0 + (random.random() - 0.5) * 2 * jitter
        hj = (random.random() - 0.5) * jitter * 0.6
        t = (t[0] * j * (1 + hj), t[1] * j, t[2] * j * (1 - hj))
    attr = me.color_attributes.get('Tint') or me.color_attributes.new('Tint', 'FLOAT_COLOR', 'CORNER')
    for d in attr.data:
        d.color = (t[0], t[1], t[2], 1.0)
    MODEL_OBJS.append(obj)
    if ol:
        obj['ol'] = ol_t
        OUTLINE_OBJS.append(obj)
    return obj


def _new_obj_from_bm(bm, name='part', recalc=True):
    if recalc:
        bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me); bm.free()
    ob = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(ob)
    return ob


def rotm(rot, order='XYZ'):
    """three.js Euler와 같은 의미의 회전행렬 (three 'XYZ' = Rx·Ry·Rz, 즉 Z가 먼저 적용)"""
    return Euler(rot, order[::-1]).to_matrix()


def place(ob, pos=(0, 0, 0), rot=(0, 0, 0), scale=(1, 1, 1), order='XYZ'):
    """pos/rot는 게임 좌표 기준 (rot: three.js와 같은 Euler, order도 three 방식)"""
    # 게임 좌표 회전을 Blender 축으로 변환: three(x,y,z) 회전 → blender (x, -z, y)
    R3 = rotm(rot, order).to_4x4()
    C = Matrix(((1, 0, 0, 0), (0, 0, -1, 0), (0, 1, 0, 0), (0, 0, 0, 1)))  # three → blender
    S = Matrix.Diagonal((scale[0], scale[1], scale[2], 1))
    T = Matrix.Translation(Vector(pos))
    ob.matrix_world = C @ T @ R3 @ S  # 정점은 게임 축 기준
    bpy.context.view_layer.update()
    ob.data.transform(ob.matrix_world)
    ob.matrix_world = Matrix.Identity(4)
    return ob


# ------------------------------------------------------------------
# 기본 도형 (게임 좌표 기준: y가 위)
# ------------------------------------------------------------------
def box(w, h, d, **kw):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        v.co = Vector((v.co.x * w, v.co.y * h, v.co.z * d))
    ob = _new_obj_from_bm(bm, 'box')
    return place(ob, **kw)


def cyl(r1, r2, h, seg=24, cap=True, **kw):
    """게임 y축 방향 원기둥 (r1 위, r2 아래)"""
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=cap, cap_tris=False, segments=seg, radius1=r2, radius2=r1, depth=h)
    ob = _new_obj_from_bm(bm, 'cyl')
    for v in ob.data.vertices:  # blender z-up 원기둥 → 게임축(y-up)
        x, y, z = v.co
        v.co = Vector((x, z, -y))
    return place(ob, **kw)


def sphere(r, seg=24, rings=16, **kw):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=rings, radius=r)
    ob = _new_obj_from_bm(bm, 'sph')
    for v in ob.data.vertices:
        x, y, z = v.co
        v.co = Vector((x, z, -y))
    return place(ob, **kw)


def sphere_cap(r, theta0, theta1, seg=48, rings=16, **kw):
    """게임 y축 기준 위쪽 극각 theta0~theta1 구간 껍데기 (0 = 꼭대기)"""
    bm = bmesh.new()
    rows = []
    for i in range(rings + 1):
        th = theta0 + (theta1 - theta0) * i / rings
        row = []
        for j in range(seg):
            ph = TAU * j / seg
            if math.sin(th) < 1e-5 and row:
                row.append(row[0]); continue
            row.append(bm.verts.new((r * math.sin(th) * math.cos(ph), r * math.cos(th), r * math.sin(th) * math.sin(ph))))
        rows.append(row)
    for i in range(rings):
        for j in range(seg):
            a, b = rows[i][j], rows[i][(j + 1) % seg]
            c, d = rows[i + 1][(j + 1) % seg], rows[i + 1][j]
            vs = []
            for v in (a, d, c, b):
                if v not in vs:
                    vs.append(v)
            if len(vs) >= 3:
                try:
                    bm.faces.new(vs)
                except ValueError:
                    pass
    ob = _new_obj_from_bm(bm, 'cap')
    return place(ob, **kw)


def torus(R, r, seg=32, rseg=8, arc=TAU, **kw):
    """three.js TorusGeometry와 같은 모양·축 (xy 평면, arc는 x축에서 시작)"""
    bm = bmesh.new()
    full = arc >= TAU - 1e-6
    n = seg if full else seg + 1
    rings = []
    for i in range(n):
        a = arc * i / seg
        ring = []
        for j in range(rseg):
            b = TAU * j / rseg
            ring.append(bm.verts.new(((R + r * math.cos(b)) * math.cos(a), (R + r * math.cos(b)) * math.sin(a), r * math.sin(b))))
        rings.append(ring)
    for i in range(seg):
        r0, r1 = rings[i], rings[(i + 1) % n]
        for j in range(rseg):
            bm.faces.new((r0[j], r0[(j + 1) % rseg], r1[(j + 1) % rseg], r1[j]))
    if not full:
        bm.faces.new(rings[0]); bm.faces.new(list(reversed(rings[-1])))
    ob = _new_obj_from_bm(bm, 'tor')
    return place(ob, **kw)


def place_matrix(ob, M):
    """게임 좌표계 4x4 행렬로 배치"""
    C = Matrix(((1, 0, 0, 0), (0, 0, -1, 0), (0, 1, 0, 0), (0, 0, 0, 1)))
    ob.data.transform(C @ M)
    return ob


def frame_on_sphere(theta, phi, r, y0=0.0):
    """구 표면 (극각 theta, 방위 phi) 위치에 접하는 프레임: +z=바깥 법선, +y=꼭대기 쪽 경사"""
    n = Vector((math.sin(theta) * math.cos(phi), math.cos(theta), math.sin(theta) * math.sin(phi)))
    t = Vector((-math.cos(theta) * math.cos(phi), math.sin(theta), -math.cos(theta) * math.sin(phi)))
    x = t.cross(n)
    M = Matrix((
        (x.x, t.x, n.x, n.x * r), (x.y, t.y, n.y, n.y * r + y0), (x.z, t.z, n.z, n.z * r), (0, 0, 0, 1)))
    return M


def extrude_shape(pts2d, depth, holes=None, **kw):
    """게임 xy 평면 2D 외곽선을 z방향(정면)으로 depth만큼 돌출. pts2d: [(x,y),...]"""
    bm = bmesh.new()
    def ring(pts, z):
        return [bm.verts.new((x, y, z)) for x, y in pts]
    f = ring(pts2d, depth / 2); b = ring(pts2d, -depth / 2)
    n = len(pts2d)
    if not holes:
        bm.faces.new(f)
        bm.faces.new(list(reversed(b)))
    for i in range(n):
        bm.faces.new((b[i], b[(i + 1) % n], f[(i + 1) % n], f[i]))
    if holes:
        for hp in holes:
            hf = ring(hp, depth / 2); hb = ring(hp, -depth / 2)
            m = len(hp)
            for i in range(m):
                bm.faces.new((hf[i], hf[(i + 1) % m], hb[(i + 1) % m], hb[i]))
            # 앞뒤 면: 바깥-구멍 사이를 브리지 (같은 점 수일 때)
            if m == n:
                for i in range(n):
                    bm.faces.new((f[i], f[(i + 1) % n], hf[(i + 1) % n], hf[i]))
                    bm.faces.new((hb[i], hb[(i + 1) % n], b[(i + 1) % n], b[i]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    ob = _new_obj_from_bm(bm, 'ext')
    return place(ob, **kw)


def arch_pts(w, h, n=16):
    r = w / 2
    pts = [(-r, 0), (r, 0), (r, h - r)]
    for i in range(1, n):
        a = math.pi * i / n
        pts.append((r * math.cos(a), h - r + r * math.sin(a)))
    pts.append((-r, h - r))
    return pts


def circle_pts(r, n=24):
    return [(r * math.cos(TAU * i / n), r * math.sin(TAU * i / n)) for i in range(n)]


def rounded_pebble(r, seed=0, **kw):
    """둥글둥글한 돌멩이 (찌그러진 저폴리 구)"""
    rnd = random.Random(seed)
    bm = bmesh.new()
    bmesh.ops.create_icosphere(bm, subdivisions=2, radius=r)
    for v in bm.verts:
        v.co *= 1 + (rnd.random() - 0.5) * 0.18
    ob = _new_obj_from_bm(bm, 'peb')
    for v in ob.data.vertices:
        x, y, z = v.co
        v.co = Vector((x, z, -y))
    return place(ob, **kw)


def look_out(x, z):
    """원점에서 (x,z) 방향을 바라보게 하는 게임 y축 회전 (부품의 +z가 바깥을 향하게)"""
    return math.atan2(x, z)


def build_outline_object(color=0x2b1d19):
    """ol=True 부품을 복제→법선방향으로 부풀려 하나로 합친 외곽선 메시 (뒷면으로 그려짐)"""
    objs = []
    for o in OUTLINE_OBJS:
        c = o.copy(); c.data = o.data.copy()
        bpy.context.scene.collection.objects.link(c)
        t = o.get('ol', 0.035)
        bm = bmesh.new(); bm.from_mesh(c.data)
        bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=0.0005)
        bm.normal_update()
        for v in bm.verts:
            v.co += v.normal * t
        bm.to_mesh(c.data); bm.free()
        c.data.materials.clear()
        attr = c.data.color_attributes.get('Tint')
        col = hexcol(color)
        for d in attr.data:
            d.color = col
        objs.append(c)
    if not objs:
        return None
    for o in bpy.context.selected_objects:
        o.select_set(False)
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    if len(objs) > 1:
        bpy.ops.object.join()
    ob = bpy.context.view_layer.objects.active
    ob.name = 'outline'
    return ob


def lathe(profile, seg=48, phi0=0.0, phi=TAU, **kw):
    """three.js LatheGeometry와 같은 회전체: profile=[(반지름, 높이), ...] (y축 회전)"""
    bm = bmesh.new()
    full = phi >= TAU - 1e-6
    n = seg if full else seg + 1
    cols = []
    for i in range(n):
        a = phi0 + phi * i / seg
        col = []
        for (r, y) in profile:
            col.append(bm.verts.new((r * math.sin(a), y, r * math.cos(a))))
        cols.append(col)
    for i in range(seg):
        c0, c1 = cols[i], cols[(i + 1) % n]
        for j in range(len(profile) - 1):
            vs = [c0[j], c1[j], c1[j + 1], c0[j + 1]]
            # 반지름 0인 점은 합치기 (삼각형)
            uniq = []
            for v in vs:
                if all((v.co - u.co).length > 1e-6 for u in uniq):
                    uniq.append(v)
            if len(uniq) >= 3:
                try:
                    bm.faces.new(uniq)
                except ValueError:
                    pass
    if not full and len(profile) > 3 and profile[0] == profile[-1]:
        # 닫힌 단면을 일부만 돌린 경우(돌 블록) 양 끝 막기
        for col in (cols[0], cols[-1]):
            try:
                bm.faces.new(col[:-1])
            except ValueError:
                pass
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-6)
    ob = _new_obj_from_bm(bm, 'lathe')
    return place(ob, **kw)


def flower(x, y, z, col, mats, size=1.0, stem=0.3):
    """작은 꽃 한 송이 (줄기 + 꽃잎 5장 + 꽃술)"""
    green_dk, center = mats
    finish(cyl(0.02 * size, 0.02 * size, stem, seg=5, pos=(x, y + stem / 2, z)), green_dk)
    pm = material('petal_%x' % col, col)
    for k in range(5):
        a = TAU * k / 5
        finish(sphere(0.07 * size, seg=7, rings=5, pos=(x + math.cos(a) * 0.075 * size, y + stem, z + math.sin(a) * 0.075 * size), scale=(1, 0.5, 1)), pm)
    finish(sphere(0.045 * size, seg=6, rings=4, pos=(x, y + stem + 0.02, z)), center)


def lpos(origin, rot, local, order='XYZ'):
    """origin 위치·rot(게임 Euler) 회전된 부모 기준 local 좌표 → 게임 월드 좌표"""
    v = rotm(rot, order) @ Vector(local)
    return (origin[0] + v.x, origin[1] + v.y, origin[2] + v.z)


def plank_wall(w, h, n, mat, depth=0.12, horizontal=True, gap=0.02, **kw):
    """판자를 여러 장 이어 붙인 벽 (부모 좌표 pos/rot 기준). 판자마다 색 살짝 다르게"""
    objs = []
    origin = kw.get('pos', (0, 0, 0)); rot = kw.get('rot', (0, 0, 0))
    for i in range(n):
        if horizontal:
            ph = h / n
            y = -h / 2 + ph * (i + 0.5)
            b = box(w, ph - gap, depth, pos=lpos(origin, rot, (0, y, random.uniform(-0.01, 0.01))), rot=rot)
        else:
            pw = w / n
            x = -w / 2 + pw * (i + 0.5)
            b = box(pw - gap, h, depth, pos=lpos(origin, rot, (x, 0, random.uniform(-0.01, 0.01))), rot=rot)
        objs.append(finish(b, mat, bevel=0.02, seg=1, smooth=False, jitter=0.07))
    return objs


def wheel(radius, mat, iron, spokes=8, **kw):
    origin = kw.get('pos', (0, 0, 0)); rot = kw.get('rot', (0, 0, 0))
    finish(torus(radius, radius * 0.12, seg=28, rseg=6, pos=origin, rot=rot), mat, ol=True, ol_t=0.025)
    finish(torus(radius + radius * 0.1, radius * 0.06, seg=28, rseg=4, pos=origin, rot=rot), iron)
    finish(cyl(radius * 0.2, radius * 0.2, radius * 0.35, seg=12, pos=origin, rot=(rot[0] + math.pi / 2, rot[1], rot[2])), mat)
    for k in range(spokes):
        a = math.pi * k / spokes
        finish(box(radius * 0.1, radius * 1.9, radius * 0.08, pos=origin, rot=(rot[0], rot[1], rot[2] + a)), mat, smooth=False)


def barrel_model(x, z, mat_wood, iron, h=1.3, r=0.62, ry=0.0):
    """나무 통: 휜 널판 + 쇠테 3줄"""
    staves = 14
    for k in range(staves):
        a = TAU * k / staves + ry
        prof = []
        for t in range(7):
            y = h * t / 6
            bulge = r * (0.86 + 0.14 * math.sin(math.pi * t / 6))
            prof.append((bulge, y))
        # 널판 한 장 = 좁은 각도의 회전체
        st = lathe(prof + [(prof[-1][0] - 0.06, h), (prof[0][0] - 0.06, 0), prof[0]], seg=2, phi0=a, phi=TAU / staves * 0.94, pos=(x, 0, z))
        finish(st, mat_wood, smooth=True, jitter=0.08)
    for y in (0.18, h / 2, h - 0.18):
        bulge = r * (0.86 + 0.14 * math.sin(math.pi * y / h)) + 0.02
        finish(torus(bulge, 0.035, seg=28, rseg=4, pos=(x, y, z), rot=(math.pi / 2, 0, 0)), iron)
    finish(cyl(r * 0.84, r * 0.84, 0.04, seg=20, pos=(x, h - 0.06, z)), mat_wood)


def crate_model(x, y, z, s, ry, mat_wood, mat_dark):
    """나무 상자: 테두리 각목 + 가운데 판자 + X 보강"""
    finish(box(s * 0.94, s * 0.94, s * 0.94, pos=(x, y + s / 2, z), rot=(0, ry, 0)), mat_dark, smooth=False)
    for face in range(4):
        fr = ry + face * math.pi / 2
        o = lpos((x, y + s / 2, z), (0, fr, 0), (0, 0, s * 0.47))
        for k in range(3):
            yy = -s * 0.32 + k * s * 0.32
            finish(box(s * 0.92, s * 0.28, 0.04, pos=lpos(o, (0, fr, 0), (0, yy, 0)), rot=(0, fr, 0)), mat_wood, bevel=0.01, seg=1, smooth=False, jitter=0.08)
        finish(box(s * 1.2, 0.08, 0.05, pos=lpos(o, (0, fr, 0), (0, 0, 0.03)), rot=(0, fr, 0.78)), mat_wood, smooth=False)
    for ex in (-1, 1):
        for ez in (-1, 1):
            finish(box(0.09, s, 0.09, pos=lpos((x, y + s / 2, z), (0, ry, 0), (ex * s * 0.46, 0, ez * s * 0.46)), rot=(0, ry, 0)), mat_wood, smooth=False)


def stone_lantern(x, z, stone, y0=0.0, s=1.0, moss=None):
    """석등 (town_hq.js stoneLantern(): 불빛 상자 y2.38(×s)은 게임 부품) — 바닥 y0, 배율 s"""
    def P_(px, py, pz):
        return (x + px * s, y0 + py * s, z + pz * s)
    finish(cyl(0.7 * s, 0.8 * s, 0.35 * s, seg=6, pos=P_(0, 0.17, 0)), stone, bevel=0.04, smooth=False, ol=True, ol_t=0.03)
    finish(cyl(0.2 * s, 0.3 * s, 1.4 * s, seg=8, pos=P_(0, 1.05, 0)), stone, jitter=0.04)
    for y in (0.5, 1.6):
        finish(torus(0.26 * s, 0.05 * s, seg=10, rseg=4, pos=P_(0, y, 0), rot=(math.pi / 2, 0, 0)), stone)
    finish(cyl(0.6 * s, 0.48 * s, 0.3 * s, seg=6, pos=P_(0, 1.9, 0)), stone, bevel=0.04, smooth=False, ol=True, ol_t=0.03)
    for sx in (-1, 1):
        for sz in (-1, 1):
            finish(box(0.14 * s, 0.62 * s, 0.14 * s, pos=P_(sx * 0.3, 2.38, sz * 0.3)), stone, smooth=False)
    finish(cyl(0.0, 0.88 * s, 0.6 * s, seg=6, pos=P_(0, 3.0, 0)), stone, bevel=0.03, smooth=False, ol=True, ol_t=0.03)
    for k in range(6):
        a = TAU * k / 6 + math.pi / 6
        finish(sphere(0.1 * s, seg=6, rings=4, pos=P_(math.cos(a) * 0.82, 2.76, math.sin(a) * 0.82)), stone)
    finish(sphere(0.18 * s, seg=10, rings=8, pos=P_(0, 3.42, 0), scale=(1, 1.3, 1)), stone)
    if moss:
        for k in range(4):
            a = random.uniform(0, TAU)
            finish(sphere(0.14 * s, seg=6, rings=4, pos=P_(math.cos(a) * 0.6, 0.36, math.sin(a) * 0.6), scale=(1, 0.4, 1)), moss)
