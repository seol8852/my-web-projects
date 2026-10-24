# 👾 일반 몬스터 5종 3D 모델 (게임 좌표: y 위, +z 정면, 발바닥 y=0)
#  - 부위(part)마다 따로 내보내고 게임에서 관절(pivot) 기준으로 흔들어 움직임 (걷기·숨쉬기·날갯짓·피격 반동)
#  - 색은 정점색 'Col' 로 칠하고, 내보내기 때 가림(AO)을 곱해 입체감을 줌
#  - kind: '' 일반(툰 음영) / 'glow' 빛나는 부분(눈) / 'wing' 반투명 날개
import math, random
import bmesh
from mathutils import Vector
from lib import *

PARTS = []      # (obj, mon, part, kind)
PIVOTS = {}     # (mon, part) -> (x, y, z) 게임 좌표
PARENT = {}     # (mon, part) -> 부모 part ('' = 뿌리)
PATHS = {}      # mon -> 꼬리 경로 점들 (꼬리 뼈 3마디로 나눔)
_cur = {'mon': '', 'part': 'body', 'kind': ''}


def mon(name):
    _cur['mon'] = name


def part(name, pivot, parent='body', kind=''):
    _cur['part'] = name; _cur['kind'] = kind
    PIVOTS[(_cur['mon'], name)] = pivot
    PARENT[(_cur['mon'], name)] = parent if name != 'body' else ''


def kind(k):
    _cur['kind'] = k


def C(ob, hexc, smooth=True, bevel=0.0, seg=2, angle=70):
    """정점색 칠하기 + 부위 등록"""
    bpy.context.view_layer.objects.active = ob
    if bevel > 0:
        for o in bpy.context.selected_objects:
            o.select_set(False)
        ob.select_set(True)
        bv = ob.modifiers.new('bv', 'BEVEL')
        bv.width = bevel; bv.segments = seg; bv.limit_method = 'ANGLE'; bv.angle_limit = math.radians(35)
        bv.use_clamp_overlap = True
        bpy.ops.object.modifier_apply(modifier=bv.name)
    me = ob.data
    for p in me.polygons:
        p.use_smooth = smooth
    if smooth:
        try:
            me.set_sharp_from_angle(angle=math.radians(angle))
        except Exception:
            pass
    a = me.color_attributes.get('Col') or me.color_attributes.new('Col', 'FLOAT_COLOR', 'CORNER')
    c = hexcol(hexc)
    for d in a.data:
        d.color = c
    PARTS.append((ob, _cur['mon'], _cur['part'], _cur['kind']))
    return ob


# ---------------------------------------------------------------------------
# 도형 도우미
# ---------------------------------------------------------------------------
def fluff(r, pos, scale=(1, 1, 1), tufts=60, amp=0.12, seed=1, subdiv=4, sharp=28, flat_bottom=None, face=None):
    """복슬복슬 털뭉치 (구 표면에 털 다발 혹)"""
    rnd = random.Random(seed)
    dirs = []
    for _ in range(tufts):
        v = Vector((rnd.gauss(0, 1), rnd.gauss(0, 1), rnd.gauss(0, 1))).normalized()
        if face is not None and v.dot(Vector(face).normalized()) > 0.62:
            continue   # 얼굴 자리는 매끈하게
        dirs.append((v, 0.6 + rnd.random() * 0.6))
    bm = bmesh.new()
    bmesh.ops.create_icosphere(bm, subdivisions=subdiv, radius=1.0)
    for v in bm.verts:
        n = v.co.normalized()
        d = 0.0
        for c, w in dirs:
            k = n.dot(c)
            if k > 0:
                d = max(d, (k ** sharp) * w)
        rr = 1.0 + amp * d
        v.co = n * rr
        if flat_bottom is not None and v.co.y < flat_bottom:
            v.co.y = flat_bottom + (v.co.y - flat_bottom) * 0.25
    ob = bpy.data.meshes.new('fl')
    bm.to_mesh(ob); bm.free()
    o = bpy.data.objects.new('fl', ob)
    bpy.context.scene.collection.objects.link(o)
    return place(o, pos=Vector(pos) * 1.0, scale=(r * scale[0], r * scale[1], r * scale[2]))


def _frame(T, prevN=None):
    T = T.normalized()
    if prevN is None:
        up = Vector((0, 1, 0)) if abs(T.y) < 0.9 else Vector((1, 0, 0))
        N = (up - T * up.dot(T)).normalized()
    else:
        N = (prevN - T * prevN.dot(T)).normalized()
    B = T.cross(N)
    return N, B


def tube(pts, radii, seg=10, cap0=True, cap1=True, flat=1.0):
    """경로 pts(게임 좌표) 따라 굵기 radii 로 가는 관 (뿔·꼬리·더듬이). radii 끝이 0이면 뾰족"""
    pts = [Vector(p) for p in pts]
    bm = bmesh.new()
    rings = []
    N = None
    n = len(pts)
    for i, p in enumerate(pts):
        T = (pts[min(n - 1, i + 1)] - pts[max(0, i - 1)])
        N, B = _frame(T, N)
        r = radii[i]
        if r <= 1e-4:
            rings.append([bm.verts.new(p)])
            continue
        ring = []
        for j in range(seg):
            a = TAU * j / seg
            ring.append(bm.verts.new(p + (N * math.cos(a) * flat + B * math.sin(a)) * r))
        rings.append(ring)
    for i in range(n - 1):
        r0, r1 = rings[i], rings[i + 1]
        if len(r0) == 1 and len(r1) == 1:
            continue
        if len(r1) == 1:
            for j in range(seg):
                bm.faces.new((r0[j], r0[(j + 1) % seg], r1[0]))
        elif len(r0) == 1:
            for j in range(seg):
                bm.faces.new((r1[(j + 1) % seg], r1[j], r0[0]))
        else:
            for j in range(seg):
                bm.faces.new((r0[j], r0[(j + 1) % seg], r1[(j + 1) % seg], r1[j]))
    if cap0 and len(rings[0]) > 1:
        bm.faces.new(list(reversed(rings[0])))
    if cap1 and len(rings[-1]) > 1:
        bm.faces.new(rings[-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new('tube')
    bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new('tube', me)
    bpy.context.scene.collection.objects.link(o)
    return place(o)


def bez(p0, p1, p2, n=10):
    p0, p1, p2 = Vector(p0), Vector(p1), Vector(p2)
    return [(1 - t) ** 2 * p0 + 2 * (1 - t) * t * p1 + t * t * p2 for t in [i / (n - 1) for i in range(n)]]


def horn(p0, p1, p2, r0, n=12, seg=12, r1=0.0):
    pts = bez(p0, p1, p2, n)
    radii = [r0 * (1 - t) ** 0.85 + r1 * t for t in [i / (n - 1) for i in range(n)]]
    radii[-1] = r1
    return tube(pts, radii, seg=seg)


def cone(base, d, length, r, seg=10):
    base = Vector(base); d = Vector(d).normalized()
    return tube([base - d * r * 0.3, base + d * length], [r, 0.0], seg=seg)


def ell(pos, r, scale=(1, 1, 1), rot=(0, 0, 0), seg=20, rings=12):
    return sphere(r, seg=seg, rings=rings, pos=pos, rot=rot, scale=scale)


def surf_z(c, R, x, y):
    """중심 c, 반지름 R=(rx,ry,rz) 타원체 앞면(+z) 위 (x,y) 위치의 z"""
    dx = (x - c[0]) / R[0]; dy = (y - c[1]) / R[1]
    k = max(0.0, 1 - dx * dx - dy * dy)
    return c[2] + R[2] * math.sqrt(k)


def surf_n(c, R, x, y):
    z = surf_z(c, R, x, y)
    n = Vector(((x - c[0]) / R[0] ** 2, (y - c[1]) / R[1] ** 2, (z - c[2]) / R[2] ** 2)).normalized()
    return z, n


def face_rot(n):
    """+z 가 n 을 향하도록 하는 three Euler (XYZ 아님: YX 순서 근사)"""
    yaw = math.atan2(n.x, n.z)
    pitch = -math.asin(max(-1, min(1, n.y)))
    return (pitch, yaw, 0)


def eye(c, R, x, y, er, col=0x1d1520, hi=True, sx=1.0, sy=1.15, depth=0.42, sink=0.35):
    """머리 표면에 붙는 눈 (검은 타원 + 하이라이트 2개)"""
    z, n = surf_n(c, R, x, y)
    rot = face_rot(n)
    p = Vector((x, y, z)) - n * er * sink * depth
    C(ell(tuple(p), er, scale=(sx, sy, depth), rot=rot, seg=18, rings=12), col)
    if hi:
        q = Vector((x - er * 0.32, y + er * 0.38, z)) + n * er * 0.12
        C(ell(tuple(q), er * 0.34, scale=(1, 1, 0.5), rot=rot, seg=10, rings=7), 0xffffff)
        q2 = Vector((x + er * 0.3, y - er * 0.32, z)) + n * er * 0.08
        C(ell(tuple(q2), er * 0.15, scale=(1, 1, 0.5), rot=rot, seg=8, rings=6), 0xffffff)


def blush(c, R, x, y, r, col=0xf4a3b4):
    z, n = surf_n(c, R, x, y)
    C(ell((x, y, z - r * 0.06), r, scale=(1.35, 0.62, 0.18), rot=face_rot(n), seg=14, rings=8), col)


def brow(c, R, x, y, w, ang, col=0x2a1c1c, t=0.06):
    z, n = surf_n(c, R, x, y)
    r = face_rot(n)
    C(box(w, t, t * 1.4, pos=(x, y, z + t * 0.2), rot=(r[0], r[1], ang)), col, bevel=t * 0.4, seg=1)


def arc_mouth(c, R, x, y, w, col=0x4a1f24, t=0.035, smile=True, depth=0.4):
    z, n = surf_n(c, R, x, y)
    rot = face_rot(n)
    rr = w / 2
    a0 = math.pi if smile else 0.0
    C(torus(rr, t, seg=16, rseg=6, arc=math.pi, pos=(x, y + (rr * depth if smile else -rr * depth), z + t * 0.3),
            rot=(rot[0], rot[1], a0), scale=(1, depth * 1.6, 1)), col)


def path_mouth(pts, col=0x4a1f24, t=0.035):
    C(tube(pts, [t] * len(pts), seg=6), col)


# ---------------------------------------------------------------------------
# 1) 날개벌레 (보라 털뭉치 + 반투명 날개 4장 + 더듬이)  — 공중에 떠 있음
# ---------------------------------------------------------------------------
def bug():
    mon('bug')
    cy = 1.9
    part('body', (0, cy, 0))
    BC, BR = (0, cy, 0), (0.66, 0.62, 0.6)
    C(fluff(1.0, BC, scale=BR, tufts=90, amp=0.16, seed=3, sharp=34, face=(0, 0.1, 1)), 0xc58ae0)
    C(fluff(1.0, (0, cy - 0.26, 0.16), scale=(0.42, 0.32, 0.42), tufts=30, amp=0.1, seed=4), 0xdcb2f0)   # 배
    for s in (-1, 1):
        eye(BC, BR, s * 0.2, cy + 0.06, 0.075, sy=1.25)
        blush(BC, BR, s * 0.36, cy - 0.08, 0.075)
        # 더듬이
        C(tube(bez((s * 0.16, cy + 0.5, 0.05), (s * 0.2, cy + 0.85, 0.1), (s * 0.36, cy + 1.02, -0.02), 8), [0.035] * 7 + [0.03], seg=7), 0x9a6cc0)
        C(ell((s * 0.37, cy + 1.04, -0.03), 0.085), 0x7a4fa6)
        # 발
        for k in (-1, 1):
            C(ell((s * 0.26, cy - 0.58, k * 0.16), 0.09, scale=(1, 0.8, 1.2)), 0xa86fd0)
    arc_mouth(BC, BR, 0, cy - 0.06, 0.12, t=0.022, depth=0.5)
    # 날개 (위 2장 + 아래 2장) — 날개 뿌리가 관절
    for s, nm in ((1, 'wingL'), (-1, 'wingR')):
        part(nm, (s * 0.3, cy + 0.2, -0.28), kind='wing')
        for (ln, wd, up, back) in ((0.95, 0.42, 0.55, 0.25), (0.7, 0.3, 0.05, 0.35)):
            hx, hy, hz = s * 0.3, cy + 0.2, -0.28
            ex = hx + s * ln * math.cos(up); ey = hy + ln * math.sin(up) * 0.85
            mid = ((hx + ex) / 2, (hy + ey) / 2, hz - back * 0.5)
            ang = math.atan2(ey - hy, (ex - hx) * s)
            C(ell(mid, ln / 2, scale=(1, wd / ln * 1.0, 0.035), rot=(0.25, -s * 0.35, s * ang), seg=24, rings=10), 0xc4d4fa)
            # 날개 맥
            C(tube([(hx, hy, hz), (mid[0] + s * ln * 0.18, mid[1] + (ey - hy) * 0.18, mid[2] - 0.02)], [0.018, 0.008], seg=5), 0x8b9de0)


# ---------------------------------------------------------------------------
# 2) 고블린 (초록 피부, 뿔 2개, 뾰족귀, 허리 천, 새총)
# ---------------------------------------------------------------------------
def goblin():
    mon('goblin')
    SK, SK2, SKD = 0x7db456, 0x8fc566, 0x5c8d3d
    part('body', (0, 1.25, 0), parent='')
    TC, TR = (0, 1.3, 0), (0.62, 0.66, 0.5)
    C(fluff(1.0, TC, scale=TR, tufts=30, amp=0.04, seed=11, subdiv=4), SK)
    C(ell((0, 1.2, 0.2), 0.42, scale=(1, 1.05, 0.55)), SK2)   # 배
    # 허리 천 (들쭉날쭉 조각)
    rnd = random.Random(5)
    for k in range(18):
        a = TAU * k / 18
        ln = 0.42 + rnd.random() * 0.22
        r0 = 0.6
        x, z = math.sin(a) * r0, math.cos(a) * r0 * 0.82
        C(box(0.24, ln, 0.06, pos=(x, 0.92 - ln / 2 + 0.12, z), rot=(0.12, a, 0)), 0x6b4630 if k % 3 else 0x5a3a27, bevel=0.02, seg=1)
    C(torus(0.6, 0.06, seg=28, rseg=6, pos=(0, 0.98, 0), rot=(math.pi / 2, 0, 0), scale=(1, 0.82, 1)), 0x4a2f1f)
    # 꼬리 (끝에 털뭉치)
    part('tail', (0, 0.95, -0.4))
    PATHS['goblin'] = [tuple(v) for v in bez((0, 0.95, -0.4), (0.15, 0.7, -0.95), (0.45, 1.05, -1.15), 9)] + [(0.48, 1.12, -1.17)]
    C(tube(bez((0, 0.95, -0.4), (0.15, 0.7, -0.95), (0.45, 1.05, -1.15), 9), [0.07, 0.065, 0.06, 0.055, 0.05, 0.045, 0.04, 0.035, 0.035], seg=8), SK)
    C(fluff(1.0, (0.48, 1.12, -1.17), scale=(0.15, 0.15, 0.15), tufts=14, amp=0.35, seed=8, subdiv=2, sharp=10), SKD)
    # 다리
    for s, nm in ((1, 'legL'), (-1, 'legR')):
        part(nm, (s * 0.3, 0.78, 0))
        C(cyl(0.2, 0.22, 0.62, seg=14, pos=(s * 0.3, 0.45, 0)), SK)
        C(ell((s * 0.32, 0.12, 0.08), 0.25, scale=(1, 0.55, 1.3)), SK)
        for t in (-1, 0, 1):
            C(ell((s * 0.32 + t * 0.1, 0.08, 0.36), 0.065, scale=(1, 0.8, 1)), 0xe8ddc0)   # 발톱
    # 머리
    part('head', (0, 1.8, 0))
    HC, HR = (0, 2.45, 0.05), (0.84, 0.76, 0.74)
    C(fluff(1.0, HC, scale=HR, tufts=24, amp=0.03, seed=12, face=(0, 0, 1)), SK)
    for s in (-1, 1):
        # 뾰족 귀
        C(tube(bez((s * 0.72, 2.5, -0.02), (s * 1.05, 2.62, -0.05), (s * 1.38, 2.86, -0.12), 7), [0.24, 0.22, 0.18, 0.13, 0.08, 0.035, 0.0], seg=12, flat=0.45), SK)
        C(tube(bez((s * 0.78, 2.52, 0.05), (s * 1.04, 2.62, 0.03), (s * 1.3, 2.82, -0.06), 6), [0.13, 0.12, 0.09, 0.06, 0.03, 0.0], seg=10, flat=0.3), 0xc98f7a)
        # 뿔
        C(horn((s * 0.36, 3.02, -0.05), (s * 0.5, 3.45, -0.05), (s * 0.4, 3.82, -0.18), 0.16, n=12), 0xd9c28f)
        C(torus(0.15, 0.04, seg=16, rseg=6, pos=(s * 0.37, 3.06, -0.05), rot=(math.pi / 2 - 0.3, 0, s * 0.3)), 0xa89060)
        eye(HC, HR, s * 0.28, 2.5, 0.1, sy=1.2)
        brow(HC, HR, s * 0.3, 2.72, 0.3, s * 0.32, t=0.07)
        blush(HC, HR, s * 0.52, 2.3, 0.1)
    C(ell((0, 2.35, surf_z(HC, HR, 0, 2.35) - 0.02), 0.09, scale=(1.2, 0.8, 0.8)), SKD)   # 코
    path_mouth([(x, 2.12 + 0.05 * math.sin(x * 3.5 + 0.4), surf_z(HC, HR, x, 2.12) - 0.01) for x in [-0.22 + i * 0.055 for i in range(9)]], t=0.03)
    # 팔 (왼팔: 새총, 오른팔: 고무줄 당김)
    for s, nm in ((1, 'armL'), (-1, 'armR')):
        part(nm, (s * 0.58, 1.68, 0))
        if s > 0:
            C(tube([(0.58, 1.68, 0), (0.85, 1.45, 0.25), (0.98, 1.5, 0.6)], [0.15, 0.13, 0.12], seg=12), SK)
            C(ell((1.0, 1.5, 0.66), 0.16), SK)
            W_ = 0x8a5a33
            C(cyl(0.05, 0.05, 0.45, seg=8, pos=(1.0, 1.62, 0.7)), W_)
            for t in (-1, 1):
                C(tube([(1.0, 1.82, 0.7), (1.0 + t * 0.14, 2.05, 0.7), (1.0 + t * 0.18, 2.2, 0.7)], [0.045, 0.04, 0.035], seg=7), W_)
            C(tube([(0.82, 2.18, 0.7), (0.55, 1.9, 0.55), (1.18, 2.18, 0.7)], [0.018, 0.018, 0.018], seg=5, cap0=True), 0x3a2a20)
            C(ell((0.55, 1.88, 0.55), 0.09), 0x8d8a85)   # 돌멩이
        else:
            C(tube([(-0.58, 1.68, 0), (-0.8, 1.42, 0.2), (-0.62, 1.55, 0.5)], [0.15, 0.13, 0.12], seg=12), SK)
            C(ell((-0.58, 1.58, 0.54), 0.16), SK)


# ---------------------------------------------------------------------------
# 3) 분홍 키메라 (울보 털뭉치, 처진 귀, 작은 뿔, 비늘 꼬리)
# ---------------------------------------------------------------------------
def chimera():
    mon('chimera')
    PK, PK2, PKD = 0xf7abc2, 0xfbc8d6, 0xe8899f
    part('body', (0, 1.5, 0), parent='')
    BC, BR = (0, 1.62, 0), (1.25, 1.32, 1.08)
    C(fluff(1.0, BC, scale=BR, tufts=120, amp=0.12, seed=21, subdiv=5, sharp=36, flat_bottom=-0.86, face=(0, 0.55, 1)), PK)
    C(fluff(1.0, (0, 0.95, 0.5), scale=(0.68, 0.45, 0.5), tufts=30, amp=0.08, seed=22), PK2)   # 배 털
    for s in (-1, 1):
        # 처진 귀
        C(ell((s * 1.2, 2.55, 0.0), 0.5, scale=(1, 0.42, 0.62), rot=(0, 0, -s * 0.35)), PK)
        C(ell((s * 1.22, 2.53, 0.12), 0.36, scale=(1, 0.32, 0.4), rot=(0, 0, -s * 0.35)), 0xf29db2)
        # 작은 뿔
        C(horn((s * 0.62, 2.72, 0.1), (s * 0.78, 3.05, 0.12), (s * 0.68, 3.22, 0.02), 0.15, n=9), 0xe27a92)
        # 큰 울먹이는 눈
        eye(BC, BR, s * 0.4, 2.22, 0.2, col=0x2a1820, sy=1.1, depth=0.4)
        q = Vector((s * 0.4, 2.22, surf_z(BC, BR, s * 0.4, 2.22)))
        C(ell(tuple(q + Vector((s * 0.06, -0.06, 0.05))), 0.075, scale=(1, 1, 0.4)), 0xffffff)
        # 걱정 눈썹
        brow(BC, BR, s * 0.38, 2.55, 0.2, -s * 0.38, col=0xc9708a, t=0.045)
        # 눈물 줄기
        pts = [(s * (0.52 + 0.03 * i), 2.05 - 0.13 * i, 0) for i in range(5)]
        pts = [(x, y, surf_z(BC, BR, x, y) + 0.01) for x, y, _ in pts]
        C(tube(pts, [0.05, 0.06, 0.065, 0.06, 0.0], seg=8), 0x9fd8f4)
        blush(BC, BR, s * 0.7, 1.95, 0.13, col=0xf38aa5)
    C(ell((0, 2.0, surf_z(BC, BR, 0, 2.0)), 0.07, scale=(1.3, 0.8, 0.6)), PKD)  # 코
    path_mouth([(x, 1.8 + 0.04 * math.sin(x * 22), surf_z(BC, BR, x, 1.8) - 0.01) for x in [-0.2 + i * 0.04 for i in range(11)]], col=0x5a2834, t=0.028)
    # 팔 (얼굴 앞으로 올린 작은 앞발)
    for s, nm in ((1, 'armL'), (-1, 'armR')):
        part(nm, (s * 0.75, 1.5, 0.55))
        C(fluff(1.0, (s * 0.62, 1.62, 1.05), scale=(0.3, 0.36, 0.28), tufts=18, amp=0.14, seed=30 + s, subdiv=3, sharp=14), PK)
        for t in (-1, 0, 1):
            C(cone((s * 0.6 + t * 0.09, 1.92, 1.12), (t * 0.2, 1, 0.3), 0.1, 0.035, seg=6), 0xe27a92)
    # 다리
    for s, nm in ((1, 'legL'), (-1, 'legR')):
        part(nm, (s * 0.58, 0.55, 0.2))
        C(fluff(1.0, (s * 0.6, 0.24, 0.42), scale=(0.36, 0.26, 0.42), tufts=16, amp=0.12, seed=40 + s, subdiv=3, sharp=12, flat_bottom=-0.75), PK)
    # 비늘 꼬리
    part('tail', (0.55, 0.65, -0.75))
    pts = bez((0.55, 0.65, -0.75), (1.45, 0.25, -1.1), (2.0, 0.55, -0.85), 12)
    PATHS['chimera'] = [tuple(v) for v in pts]
    radii = [0.32 * (1 - i / 11) ** 0.8 + 0.02 for i in range(12)]; radii[-1] = 0.0
    C(tube(pts, radii, seg=14, flat=0.8), 0xf3a4b9)
    for i in range(1, 10):
        p = pts[i]; r = radii[i]
        C(cone((p.x, p.y + r * 0.7, p.z), (0.1, 1, -0.2), 0.12 * (1 - i / 12) + 0.04, 0.09 * (1 - i / 12) + 0.03, seg=6), 0xe27a92)


# ---------------------------------------------------------------------------
# 4) 가시 뿔괴수 (중간보스: 주황 털, 등의 갈색 가시 갈기, 큰 뿔, 화난 얼굴)
# ---------------------------------------------------------------------------
def midboss():
    mon('midboss')
    OR, OR2, ORD, SP = 0xf08a2c, 0xf8b058, 0xc9661b, 0x4b2c1c
    part('body', (0, 1.4, 0), parent='')
    BC, BR = (0, 1.45, 0), (1.05, 1.0, 0.9)
    C(fluff(1.0, BC, scale=BR, tufts=60, amp=0.08, seed=51, subdiv=4, sharp=22, flat_bottom=-0.9), OR)
    rnd = random.Random(7)
    for k in range(26):   # 등 가시
        th = 0.35 + rnd.random() * 1.2
        ph = math.pi + (rnd.random() - 0.5) * 2.6
        n = Vector((math.sin(th) * math.sin(ph), math.cos(th), math.sin(th) * math.cos(ph)))
        base = Vector(BC) + Vector((n.x * BR[0], n.y * BR[1], n.z * BR[2])) * 0.9
        C(cone(tuple(base), tuple(n + Vector((0, 0.25, -0.2))), 0.5 + rnd.random() * 0.35, 0.16, seg=7), SP if k % 4 else 0x3a2216)
    for k in range(16):   # 털 끝 결
        a = rnd.random() * TAU; y = 0.8 + rnd.random() * 1.2
        x, z = math.sin(a) * BR[0] * 0.95, math.cos(a) * BR[2] * 0.95
        if z > 0.3:
            continue
        C(cone((x, y, z), (math.sin(a), -0.3, math.cos(a)), 0.18, 0.06, seg=5), ORD)
    # 머리
    part('head', (0, 2.25, 0.05))
    HC, HR = (0, 2.95, 0.12), (0.98, 0.9, 0.86)
    C(fluff(1.0, HC, scale=HR, tufts=40, amp=0.05, seed=53, face=(0, 0, 1)), OR)
    for k in range(34):   # 머리 가시 갈기
        th = 0.2 + rnd.random() * 1.15
        ph = math.pi + (rnd.random() - 0.5) * 3.6
        n = Vector((math.sin(th) * math.sin(ph), math.cos(th), math.sin(th) * math.cos(ph)))
        if n.z > 0.45 and n.y < 0.75:
            continue
        base = Vector(HC) + Vector((n.x * HR[0], n.y * HR[1], n.z * HR[2])) * 0.88
        C(cone(tuple(base), tuple(n + Vector((0, 0.35, -0.25))), 0.42 + rnd.random() * 0.3, 0.15, seg=7), SP if k % 3 else 0x3a2216)
    for s in (-1, 1):
        C(horn((s * 0.55, 3.62, 0.0), (s * 1.05, 4.05, -0.1), (s * 0.82, 4.62, -0.35), 0.22, n=13, seg=12), 0x3d2416)
        eye(HC, HR, s * 0.33, 2.98, 0.14, sy=1.0)
        brow(HC, HR, s * 0.33, 3.22, 0.34, s * 0.5, t=0.08)
        blush(HC, HR, s * 0.62, 2.72, 0.12, col=0xf06a4a)
    # 크게 벌린 입 + 송곳니
    mz = surf_z(HC, HR, 0, 2.6)
    C(ell((0, 2.6, mz - 0.1), 0.24, scale=(1.15, 0.85, 0.5)), 0x6e1a1a)
    C(ell((0, 2.52, mz - 0.06), 0.13, scale=(1.2, 0.6, 0.5)), 0xe9677a)
    for s in (-1, 1):
        C(cone((s * 0.14, 2.76, mz - 0.02), (0, -1, 0.15), 0.12, 0.05, seg=6), 0xffffff)
    C(ell((0, 2.84, surf_z(HC, HR, 0, 2.84)), 0.06, scale=(1.3, 0.8, 0.6)), 0x2a1810)  # 코
    # 팔 (주먹)
    for s, nm in ((1, 'armL'), (-1, 'armR')):
        part(nm, (s * 0.92, 1.85, 0.1))
        up = 0.35 if s > 0 else 0.0
        C(tube([(s * 0.92, 1.85, 0.1), (s * 1.25, 1.6 + up, 0.35), (s * 1.18, 1.95 + up * 1.4, 0.65)], [0.26, 0.24, 0.22], seg=12), OR)
        C(fluff(1.0, (s * 1.16, 2.02 + up * 1.4, 0.72), scale=(0.27, 0.27, 0.27), tufts=10, amp=0.06, seed=60 + s, subdiv=3), OR)
        for t in (-1, 0, 1):
            C(cone((s * 1.16 + t * 0.1, 2.24 + up * 1.4, 0.8), (0, 0.6, 1), 0.1, 0.04, seg=6), 0x2a1810)
    # 다리
    for s, nm in ((1, 'legL'), (-1, 'legR')):
        part(nm, (s * 0.52, 0.7, 0.05))
        C(cyl(0.3, 0.32, 0.5, seg=14, pos=(s * 0.52, 0.42, 0.05)), OR)
        C(ell((s * 0.54, 0.15, 0.18), 0.34, scale=(1, 0.5, 1.25)), OR)
        for t in (-1, 0, 1):
            C(cone((s * 0.54 + t * 0.14, 0.12, 0.55), (0, -0.2, 1), 0.12, 0.05, seg=6), 0x2a1810)


# ---------------------------------------------------------------------------
# 5) 강철 키메라 (갑옷 판, 거대한 뿔, 빛나는 눈, 꼬리)
# ---------------------------------------------------------------------------
def iron():
    mon('iron_chimera')
    SKN, ARM, ARM2, ARMD, HRN = 0x645f70, 0x56525f, 0x77738a, 0x3d3a46, 0x6f6a7c
    part('body', (0, 2.4, 0), parent='')
    BC, BR = (0, 2.55, 0), (1.45, 1.35, 1.15)
    C(ell(BC, 1.0, scale=BR, seg=36, rings=24), SKN)
    # 가슴·배 갑옷 판 (몸에 붙은 둥근 껍데기 판)
    for i, (y, w, h) in enumerate(((3.25, 1.55, 0.5), (2.62, 1.4, 0.46), (2.02, 1.2, 0.42), (1.5, 0.9, 0.36))):
        z = surf_z(BC, BR, 0, y)
        C(ell((0, y, z - 0.18), 1.0, scale=(w * 0.55, h * 0.62, 0.36), rot=(-0.35 + i * 0.18, 0, 0), seg=28, rings=14), ARM if i % 2 == 0 else ARM2)
    for s_ in (-1, 1):
        for i, y in enumerate((3.0, 2.4, 1.85)):
            x = s_ * 1.0
            C(ell((x, y, surf_z(BC, BR, x, y) - 0.22), 1.0, scale=(0.38, 0.3, 0.26), rot=(0, s_ * 0.7, 0), seg=20, rings=12), ARMD if i % 2 else ARM)
    # 등 판
    for i in range(4):
        C(ell((0, 3.3 - i * 0.55, -0.98 + i * 0.05), 1.0, scale=(0.8 - i * 0.1, 0.24, 0.3), rot=(0.3, 0, 0), seg=22, rings=12), ARM)
    # 꼬리 (판 꼬리)
    part('tail', (0, 1.7, -0.95))
    pts = bez((0, 1.7, -0.95), (-0.6, 0.8, -2.2), (-1.9, 0.45, -2.6), 12)
    PATHS['iron_chimera'] = [tuple(v) for v in pts]
    radii = [0.55 * (1 - i / 11) ** 0.9 + 0.03 for i in range(12)]; radii[-1] = 0.0
    C(tube(pts, radii, seg=14), SKN)
    for i in range(1, 11):
        p = pts[i]; r = radii[i]
        C(cone((p.x, p.y + r * 0.75, p.z), (0, 1, 0.15), 0.32 * (1 - i / 12) + 0.08, 0.16 * (1 - i / 12) + 0.05, seg=5), ARMD)
    # 다리
    for s, nm in ((1, 'legL'), (-1, 'legR')):
        part(nm, (s * 0.8, 1.5, 0))
        C(tube([(s * 0.8, 1.55, 0), (s * 0.95, 0.9, 0.12), (s * 0.95, 0.35, 0.05)], [0.52, 0.46, 0.44], seg=14), SKN)
        C(ell((s * 0.95, 1.0, 0.42), 1.0, scale=(0.42, 0.32, 0.22), rot=(-0.15, 0, 0), seg=20, rings=12), ARM2)   # 무릎 판
        C(ell((s * 0.95, 0.24, 0.3), 1.0, scale=(0.55, 0.3, 0.68), seg=24, rings=14), ARM)                        # 발
        for t in (-1, 0, 1):
            C(cone((s * 0.95 + t * 0.3, 0.18, 0.85), (0, -0.3, 1), 0.28, 0.1, seg=6), 0x2e2b35)
    # 머리
    part('head', (0, 3.55, 0.4))
    HC, HR = (0, 4.05, 0.6), (0.86, 0.74, 0.76)
    C(ell(HC, 1.0, scale=HR, seg=30, rings=20), SKN)
    C(ell((0, 4.3, 1.08), 1.0, scale=(0.7, 0.15, 0.3), rot=(0.2, 0, 0), seg=20, rings=10), ARMD)   # 눈썹뼈
    C(ell((0, 3.62, 1.08), 0.58, scale=(1.05, 0.5, 0.75)), ARM)   # 턱
    for s in (-1, 1):
        C(cone((s * 0.28, 3.68, 1.42), (0, 1, 0.2), 0.24, 0.07, seg=6), 0xece6d8)   # 송곳니
        C(horn((s * 0.6, 4.3, 0.55), (s * 1.7, 4.4, 0.4), (s * 1.6, 5.45, 0.1), 0.34, n=15, seg=14), HRN)
        C(torus(0.33, 0.07, seg=18, rseg=6, pos=(s * 0.66, 4.31, 0.55), rot=(0, math.pi / 2, 0)), ARMD)
    kind('glow')
    for s in (-1, 1):
        C(ell((s * 0.3, 4.1, surf_z(HC, HR, s * 0.3, 4.1) + 0.02), 0.13, scale=(1.3, 0.55, 0.5), rot=(0.1, 0, -s * 0.25)), 0xffd84a)
    kind('')
    # 팔 (어깨 갑옷 + 손톱)
    for s, nm in ((1, 'armL'), (-1, 'armR')):
        part(nm, (s * 1.35, 3.3, 0))
        C(tube([(s * 1.35, 3.3, 0), (s * 1.75, 2.4, 0.15), (s * 1.7, 1.55, 0.45)], [0.45, 0.4, 0.36], seg=14), SKN)
        C(ell((s * 1.5, 3.55, 0), 0.72, scale=(1, 0.62, 0.95), rot=(0, 0, -s * 0.35)), ARM2)   # 어깨 판
        C(ell((s * 1.62, 3.42, 0), 0.6, scale=(1, 0.55, 0.85), rot=(0, 0, -s * 0.5)), ARM)
        C(ell((s * 1.72, 2.05, 0.3), 1.0, scale=(0.45, 0.48, 0.45), rot=(0.2, 0, s * 0.1), seg=20, rings=12), ARM)  # 팔목 판
        C(ell((s * 1.7, 1.45, 0.5), 0.38, scale=(1, 0.8, 1)), SKN)
        for t in (-1, 0, 1):
            C(cone((s * 1.7 + t * 0.18, 1.3, 0.72), (t * 0.2, -1, 0.6), 0.32, 0.09, seg=6), 0x2e2b35)


# ---------------------------------------------------------------------------
# 6) 🐢 용암 거북 요새 (레이드 보스: 등에 화산, 현무암 등딱지 사이로 용암이 흐름)
#    앞다리 = armL/armR, 뒷다리 = legL/legR (게임의 걷기 흔들기 규칙을 그대로 사용 → 대각선 걸음)
# ---------------------------------------------------------------------------
def ell_pt(c, R, th, ph, k=1.0):
    n = Vector((math.sin(th) * math.sin(ph) / R[0], math.cos(th) / R[1], math.sin(th) * math.cos(ph) / R[2]))
    p = Vector((c[0] + R[0] * k * math.sin(th) * math.sin(ph), c[1] + R[1] * k * math.cos(th), c[2] + R[2] * k * math.sin(th) * math.cos(ph)))
    return p, n.normalized()


def turtle():
    mon('lavaturtle')
    SKIN, SKIN2, BELLY = 0x8c4e3a, 0x6e3b2c, 0xd9873f
    ROCK, ROCK2, ROCKD = 0x4a413c, 0x3a332f, 0x2a2422
    LAVA, LAVA2 = 0xff7a1a, 0xffc04a
    rnd = random.Random(77)
    part('body', (0, 2.2, 0), parent='')
    # 몸통(배 쪽 살) + 배딱지
    C(ell((0, 2.0, 0.0), 1.0, scale=(2.9, 1.25, 3.5), seg=40, rings=24), SKIN2)
    C(ell((0, 1.45, 0.25), 1.0, scale=(2.5, 0.75, 3.1), seg=36, rings=20), BELLY)
    for i in range(4):   # 배딱지 줄무늬
        C(torus(1.0, 0.06, seg=40, rseg=5, pos=(0, 1.1, 0.25), rot=(math.pi / 2, 0, 0), scale=(2.1 - i * 0.35, 2.8 - i * 0.5, 1)), 0xb86a2e)
    # 등딱지 돔
    SC, SR = (0, 2.55, -0.15), (3.45, 2.35, 4.05)
    C(sphere_cap(1.0, 0.0, math.pi * 0.5, seg=56, rings=22, pos=SC, scale=SR), ROCK2)
    # 등딱지 테두리 (두툼한 고리 + 가시)
    pts = []
    for i in range(49):
        a = TAU * i / 48
        pts.append((math.sin(a) * 3.55, 2.5 + 0.12 * math.sin(a * 6), -0.15 + math.cos(a) * 4.15))
    C(tube(pts, [0.42] * 49, seg=10, cap0=False, cap1=False), ROCKD)
    for i in range(16):
        a = TAU * (i + 0.5) / 16
        if abs(math.cos(a)) > 0.9 and math.cos(a) > 0:
            continue   # 머리 나오는 자리는 비움
        d = Vector((math.sin(a), -0.15, math.cos(a)))
        C(cone((math.sin(a) * 3.8, 2.45, -0.15 + math.cos(a) * 4.4), tuple(d), 0.75, 0.32, seg=7), 0x221d1b)
    # 현무암 판 (등딱지 위 울퉁불퉁 돌판) + 판 사이 용암 틈
    seams = []
    rings = [(0.42, 6), (0.78, 9), (1.15, 12)]
    for th, n in rings:
        for j in range(n):
            ph = TAU * (j + (0.5 if n == 9 else 0)) / n + rnd.uniform(-0.08, 0.08)
            p, nn = ell_pt(SC, SR, th + rnd.uniform(-0.05, 0.05), ph, 0.97)
            sz = 0.62 if th < 0.5 else 0.78 if th < 1 else 0.7
            C(ell(tuple(p), sz, scale=(1.0 + rnd.random() * 0.25, 0.9 + rnd.random() * 0.2, 0.3), rot=face_rot(nn), seg=16, rings=10), ROCK if j % 2 else 0x524842)
    kind('glow')
    for th in (0.6, 0.97, 1.33):   # 가로 용암 틈
        pts = []
        for i in range(61):
            ph = TAU * i / 60
            p, nn = ell_pt(SC, SR, th + 0.04 * math.sin(ph * 7), ph, 1.0)
            pts.append(tuple(p + nn * 0.02))
        C(tube(pts, [0.11] * 61, seg=6, cap0=False, cap1=False), LAVA)
    for j in range(12):   # 세로 용암 틈 (화산에서 흘러내림)
        ph = TAU * j / 12 + 0.13
        pts = []
        for i in range(12):
            th = 0.3 + 1.1 * i / 11
            p, nn = ell_pt(SC, SR, th, ph + 0.06 * math.sin(i * 1.7 + j), 1.0)
            pts.append(tuple(p + nn * 0.02))
        C(tube(pts, [0.08 + 0.04 * (1 - i / 11) for i in range(12)], seg=6), LAVA if j % 3 else LAVA2)
    kind('')
    # 등 위 화산
    C(lathe([(0.0, 0.0), (2.0, 0.0), (1.75, 0.6), (1.35, 1.35), (1.0, 2.05), (0.92, 2.2), (0.62, 2.12), (0.45, 1.8), (0.0, 1.75)], seg=40, pos=(0, 4.65, -0.35)), 0x3a302c)
    for j in range(10):   # 화산 바위 결
        a = TAU * j / 10 + 0.2
        C(ell((math.sin(a) * 1.55, 5.25, -0.35 + math.cos(a) * 1.55), 0.45, scale=(1, 0.8, 0.6), rot=(0, a, 0)), 0x2e2624)
    kind('glow')
    C(cyl(0.66, 0.66, 0.1, seg=28, pos=(0, 6.62, -0.35)), LAVA2)                     # 분화구 용암
    C(sphere_cap(0.6, 0.0, 0.9, seg=24, rings=6, pos=(0, 6.6, -0.35), scale=(1, 0.4, 1)), 0xffe08a)
    prof = [(2.0, 0.0), (1.75, 0.6), (1.35, 1.35), (1.0, 2.05), (0.92, 2.2)]
    def vr(h):
        for (r0, y0), (r1, y1) in zip(prof, prof[1:]):
            if y0 <= h <= y1:
                return r0 + (r1 - r0) * (h - y0) / (y1 - y0)
        return prof[-1][0]
    for j in range(6):   # 화산 옆으로 흐르는 용암 줄기
        a = TAU * j / 6 + 0.5
        pts = []
        for i in range(9):
            k = i / 8
            h = 2.12 - 1.9 * k
            r = vr(h) + 0.04
            aa = a + 0.12 * math.sin(k * 6 + j)
            pts.append((math.sin(aa) * r, 4.65 + h, -0.35 + math.cos(aa) * r))
        C(tube(pts, [0.17 - 0.07 * i / 8 for i in range(9)], seg=7, flat=0.6), LAVA if j % 2 else LAVA2)
    kind('')
    # 꼬리
    part('tail', (0, 1.9, -3.7))
    tp = bez((0, 1.9, -3.7), (0, 1.5, -4.8), (0.4, 0.9, -5.6), 9)
    PATHS['lavaturtle'] = [tuple(v) for v in tp]
    tr = [0.62, 0.55, 0.48, 0.4, 0.32, 0.25, 0.17, 0.09, 0.0]
    C(tube(tp, tr, seg=12), SKIN)
    for i in range(1, 7):
        C(cone((tp[i].x, tp[i].y + tr[i] * 0.8, tp[i].z), (0, 1, -0.3), 0.32 - i * 0.03, 0.16 - i * 0.015, seg=6), ROCKD)
    # 다리 (앞=arm, 뒤=leg)
    for nm, x, z, fz in (('armL', 1, 2.3, 1), ('armR', -1, 2.3, 1), ('legL', 1, -2.3, -1), ('legR', -1, -2.3, -1)):
        piv = (x * 2.35, 2.05, z)
        part(nm, piv)
        foot = (x * 3.05, 0.42, z + fz * 0.45)
        C(tube([piv, ((piv[0] + foot[0]) / 2 + x * 0.25, 1.25, (piv[2] + foot[2]) / 2), foot], [0.95, 0.85, 0.8], seg=16), SKIN)
        C(ell((foot[0], 0.36, foot[2] + fz * 0.15), 1.0, scale=(0.95, 0.42, 1.05), seg=24, rings=12), SKIN)
        for t in (-1, 0, 1):
            C(cone((foot[0] + t * 0.42, 0.28, foot[2] + fz * 0.95), (t * 0.25, -0.2, fz), 0.32, 0.14, seg=6), 0xeadfc6)   # 발톱
        for k in range(3):   # 다리 바위 비늘
            C(ell((piv[0] + x * 0.55, 1.9 - k * 0.45, piv[2] + fz * 0.25 * k), 0.34, scale=(1, 0.7, 0.55), rot=(0, x * 1.2, 0)), ROCK)
    # 머리 (귀엽지만 성난 얼굴)
    part('head', (0, 2.55, 3.55))
    HC, HR = (0, 3.05, 4.75), (1.3, 1.08, 1.32)
    C(tube([(0, 2.4, 3.3), (0, 2.75, 4.0), (0, 2.95, 4.4)], [0.95, 0.92, 0.9], seg=16), SKIN)   # 목
    C(ell(HC, 1.0, scale=HR, seg=36, rings=22), SKIN)
    C(ell((0, 2.38, 4.95), 1.0, scale=(0.95, 0.38, 0.85), seg=28, rings=14), BELLY)            # 턱 아래
    C(ell((0, 3.95, 4.55), 1.0, scale=(0.95, 0.32, 0.85), rot=(-0.2, 0, 0), seg=24, rings=12), ROCK)   # 이마 바위 갑
    for k, (x, z) in enumerate(((-0.45, 4.2), (0.45, 4.2), (0, 3.85))):
        C(cone((x, 4.15, z), (x * 0.4, 1, -0.4), 0.42, 0.2, seg=7), 0x221d1b)
    for s in (-1, 1):
        eye(HC, HR, s * 0.56, 3.2, 0.29, sy=1.08, depth=0.45)
        brow(HC, HR, s * 0.56, 3.62, 0.52, s * 0.45, col=0x2a1810, t=0.1)
        blush(HC, HR, s * 0.88, 2.82, 0.17, col=0xf07050)
        C(ell((s * 0.17, 3.0, surf_z(HC, HR, s * 0.17, 3.0) + 0.0), 0.05, scale=(1, 0.7, 0.6)), 0x2a1810)   # 콧구멍
    path_mouth([(x, 2.62 + 0.09 * math.cos(x * 3.2), surf_z(HC, HR, x, 2.62) - 0.02) for x in [-0.55 + i * 0.1 for i in range(12)]], col=0x3a1410, t=0.05)
    for s in (-1, 1):
        C(cone((s * 0.32, 2.66, surf_z(HC, HR, s * 0.32, 2.66) - 0.02), (0, -1, 0.25), 0.2, 0.08, seg=6), 0xffffff)   # 송곳니


ALL = [bug, goblin, chimera, midboss, iron, turtle]
HEIGHTS = {'bug': 2.9, 'goblin': 3.9, 'chimera': 3.3, 'midboss': 4.75, 'iron_chimera': 5.5, 'lavaturtle': 6.6}
RADII = {'lavaturtle': 4.3}


def build():
    random.seed(1)
    for f in ALL:
        f()
