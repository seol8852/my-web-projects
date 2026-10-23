# ⚔️ 장착 무기 16종 (shop_hq.js buildWeaponHead 와 같은 크기·손잡이 위치: 손잡이 원점, 날은 +y, 넓은 면은 xy 평면)
# 부품마다 "칸(slot)"을 붙여 내보내고, 게임에서 등급 색을 입힘:
#   blade(날, 밝은 등급색) / acc(장식, 등급색) / grip(손잡이) / wrap(손잡이 감은 끈, 손잡이보다 어둡게) / gem(빛나는 보석)
#   metal(쇠, 고정 은색) / dark(검은 쇠) / white / wood(나무) / 그 외 '#rrggbb' 고정색
# lv: 이 부품이 보이기 시작하는 단계 (게임 lv = 등급(C0 B1 A2 S3) + 강화/4) → 등급·강화가 오를수록 장식이 늘어남
import math, random
from lib import *

PARTS = []      # (obj, shape, slot, lv)
_cur = {'shape': ''}


def W(ob, slot, lv=0, smooth=True, bevel=0.0, seg=1, angle=40):
    bpy.context.view_layer.objects.active = ob
    if bevel > 0:
        bv = ob.modifiers.new('bv', 'BEVEL')
        bv.width = bevel; bv.segments = seg; bv.limit_method = 'ANGLE'; bv.angle_limit = math.radians(35)
        bv.use_clamp_overlap = True
        for o in bpy.context.selected_objects:
            o.select_set(False)
        ob.select_set(True)
        bpy.ops.object.modifier_apply(modifier=bv.name)
    for p in ob.data.polygons:
        p.use_smooth = smooth
    if smooth:
        try:
            ob.data.set_sharp_from_angle(angle=math.radians(angle))
        except Exception:
            pass
    PARTS.append((ob, _cur['shape'], slot, lv))
    return ob


def blade_shape(w, h, tip, taper=0.9):
    """칼날 외곽 (밑변 폭 w, 곧은 길이 h, 끝 길이 tip)"""
    return [(-w / 2, 0), (w / 2, 0), (w / 2 * taper, h), (0, h + tip), (-w / 2 * taper, h)]


def grip_wrap(y0, y1, r, n, slot='wrap', lv=0):
    for k in range(n):
        y = y0 + (y1 - y0) * (k + 0.5) / n
        W(torus(r, 0.028, seg=14, rseg=5, pos=(0, y, 0), rot=(math.pi / 2 + 0.22, 0, 0)), slot, lv)


def shaft(y0, y1, r, slot='grip', bands=(), band_slot='acc', seg=12):
    W(cyl(r, r, y1 - y0, seg=seg, pos=(0, (y0 + y1) / 2, 0)), slot)
    for (y, lv) in bands:
        W(cyl(r + 0.03, r + 0.03, 0.08, seg=seg, pos=(0, y, 0)), band_slot, lv, bevel=0.01)


def gem(pos, r=0.1, lv=0, scale=(1, 1.3, 0.6)):
    W(sphere(r, seg=10, rings=6, pos=pos, scale=scale), 'gem', lv, smooth=False)


# ---------------------------------------------------------------------------
def sword(big=False):
    k = 1.25 if big else 1.0
    gl = 1.1 if big else 0.9
    shaft(-gl / 2, gl / 2, 0.1 * (1.1 if big else 1), 'grip', seg=12)
    grip_wrap(-gl / 2 + 0.05, gl / 2 - 0.05, 0.105 * (1.1 if big else 1), 6 if big else 5)
    # 폼멜
    W(sphere(0.15 * k, seg=14, rings=10, pos=(0, -gl / 2 - 0.08, 0)), 'acc')
    W(cyl(0.11, 0.13, 0.08, seg=12, pos=(0, -gl / 2 + 0.01, 0)), 'acc')
    gem((0, -gl / 2 - 0.08, 0.12 * k), 0.06, 2, (1, 1, 0.6))
    gem((0, -gl / 2 - 0.08, -0.12 * k), 0.06, 2, (1, 1, 0.6))
    for s in (-1, 1):  # S: 폼멜 뿔
        W(cyl(0.0, 0.05, 0.22, seg=6, pos=(s * 0.14 * k, -gl / 2 - 0.2, 0), rot=(0, 0, s * 0.6)), 'acc', 3, smooth=False)
    # 가드 (가운데 덩이 + 휘어 올라간 양팔 + 끝 구슬)
    gy = gl / 2 + 0.06
    W(box(0.32 * k, 0.24 * k, 0.3, pos=(0, gy, 0)), 'acc', bevel=0.05, seg=2, smooth=False)
    for s in (-1, 1):
        W(cyl(0.065 * k, 0.085 * k, 0.42 * k, seg=10, pos=(s * 0.34 * k, gy + 0.04, 0), rot=(0, 0, s * (math.pi / 2 - 0.25))), 'acc')
        W(sphere(0.08 * k, seg=10, rings=8, pos=(s * 0.55 * k, gy + 0.1 * k, 0)), 'acc')
        # B+: 가드 날개
        W(extrude_shape([(0, 0), (0.32 * k, 0.12 * k), (0.42 * k, 0.32 * k), (0.2 * k, 0.16 * k)], 0.05, pos=(s * 0.18 * k, gy + 0.08, 0), rot=(0, 0 if s > 0 else math.pi, 0)), 'acc', 1, smooth=False, bevel=0.012)
    gem((0, gy, 0.16), 0.09 * k, 2)
    gem((0, gy, -0.16), 0.09 * k, 2)
    # 날 (밑동 리카소 + 몸통 + 끝) — 가운데 홈(장식색)
    w = (0.6 if big else 0.4)
    h = (2.1 if big else 1.72)
    y0 = gy + 0.12 * k
    pts = [(-w / 2 * 0.8, 0), (w / 2 * 0.8, 0), (w / 2, 0.18), (w / 2 * 0.92, h), (0, h + w * 0.95), (-w / 2 * 0.92, h), (-w / 2, 0.18)]
    W(extrude_shape(pts, 0.1, pos=(0, y0, 0)), 'blade', smooth=False, bevel=0.03)
    for zs in (-1, 1):
        W(box(w * 0.16, h * 0.82, 0.03, pos=(0, y0 + 0.2 + h * 0.41, zs * 0.06)), 'acc', 0, smooth=False)
    if big:  # 대검: 밑동 톱니
        for s in (-1, 1):
            for j in range(3):
                W(cyl(0.0, 0.07, 0.14, seg=4, pos=(s * (w / 2 + 0.05), y0 + 0.3 + j * 0.18, 0), rot=(0, 0, -s * math.pi / 2)), 'blade', 0, smooth=False)
    # S: 날 위 룬 (빛나는 짧은 선)
    for j in range(4):
        for zs in (-1, 1):
            W(box(0.03, 0.12, 0.02, pos=((j % 2 - 0.5) * w * 0.38, y0 + 0.45 + j * h * 0.18, zs * 0.065), rot=(0, 0, (j % 2 - 0.5) * 0.6)), 'gem', 3, smooth=False)
    return y0 + h + w * 0.95


def claw():
    shaft(-0.6, 0.5, 0.11, 'grip')
    grip_wrap(-0.55, 0.45, 0.115, 5)
    W(sphere(0.15, seg=12, rings=8, pos=(0, -0.66, 0)), 'acc')
    # 주먹 보호대 (둥근 판) + 손가락 마디 징
    W(box(1.2, 0.3, 0.34, pos=(0, 0.6, 0)), 'acc', bevel=0.08, seg=2, smooth=False)
    for x in (-0.4, 0, 0.4):
        W(sphere(0.09, seg=8, rings=6, pos=(x, 0.6, 0.18)), 'metal', 1)
    # 발톱 3개 (휜 칼날)
    for i, x in enumerate((-0.32, 0, 0.32)):
        L = 1.9 - abs(i - 1) * 0.35
        sh = []
        n = 8
        for j in range(n + 1):
            t = j / n
            cx = x + math.sin(t * 1.2) * 0.35 * (1 if x >= 0 else -1) * (0.4 if x == 0 else 1)
            sh.append((cx + 0.16 * (1 - t) + 0.01, 0.72 + t * L))
        for j in range(n, -1, -1):
            t = j / n
            cx = x + math.sin(t * 1.2) * 0.35 * (1 if x >= 0 else -1) * (0.4 if x == 0 else 1)
            sh.append((cx - 0.16 * (1 - t) - 0.01, 0.72 + t * L))
        W(extrude_shape(sh, 0.08), 'blade', smooth=False, bevel=0.02)
        gem((x, 0.95, 0.05), 0.05, 2, (1, 1, 0.5))
    for s in (-1, 1):  # S: 옆 가시
        W(cyl(0.0, 0.08, 0.5, seg=5, pos=(s * 0.72, 0.75, 0), rot=(0, 0, -s * 1.1)), 'acc', 3, smooth=False)
    return 2.6


def spear(trident=False):
    shaft(-0.65, 2.85, 0.08, 'grip', bands=[(-0.2, 0), (0.6, 1), (1.6, 1)])
    grip_wrap(0.0, 0.5, 0.085, 4)
    W(cyl(0.11, 0.07, 0.18, seg=10, pos=(0, -0.72, 0)), 'acc')       # 물미
    W(lathe([(0.0, 0), (0.12, 0), (0.15, 0.08), (0.1, 0.2), (0.0, 0.22)], seg=12, pos=(0, 2.78, 0)), 'acc')   # 소켓
    if trident:
        W(box(0.85, 0.12, 0.14, pos=(0, 3.0, 0)), 'acc', bevel=0.04, smooth=False)
        for s in (-1, 1):
            W(cyl(0.05, 0.06, 0.4, seg=8, pos=(s * 0.38, 3.18, 0)), 'acc')
        for x, L in ((-0.38, 0.55), (0, 0.8), (0.38, 0.55)):
            y0 = 3.38 if x else 3.06
            W(extrude_shape([(-0.09, 0), (0.09, 0), (0.0, L)], 0.07, pos=(x, y0, 0)), 'blade', smooth=False, bevel=0.015)
            W(extrude_shape([(0.0, 0), (0.14 * (1 if x >= 0 else -1), -0.12), (0.06 * (1 if x >= 0 else -1), 0.1)], 0.05, pos=(x + 0.07 * (1 if x >= 0 else -1), y0 + 0.12, 0)), 'blade', 1, smooth=False)
        gem((0, 3.0, 0.09), 0.07, 2, (1, 1, 0.5))
        return 3.9
    # 나뭇잎 모양 창날 + 가운데 능선
    pts = []
    for j in range(13):
        t = j / 12
        pts.append((0.2 * math.sin(math.pi * min(1, t * 1.15)) * (1 - t * 0.2), t * 1.05))
    shape = [(x, y) for (x, y) in pts] + [(-x, y) for (x, y) in reversed(pts[1:-1])]
    W(extrude_shape(shape, 0.08, pos=(0, 2.98, 0)), 'blade', smooth=False, bevel=0.02)
    W(box(0.04, 0.85, 0.12, pos=(0, 3.45, 0)), 'acc', smooth=False)
    # 술 (B+)
    for k in range(6):
        a = TAU * k / 6
        W(cyl(0.025, 0.04, 0.4, seg=5, pos=(math.cos(a) * 0.07, 2.62, math.sin(a) * 0.07), rot=(math.sin(a) * 0.25, 0, -math.cos(a) * 0.25)), 'acc', 1)
    W(sphere(0.08, seg=8, rings=6, pos=(0, 2.82, 0)), 'acc', 1)
    gem((0, 3.2, 0.06), 0.05, 2, (1, 1.4, 0.5))
    for s in (-1, 1):  # S: 날개 장식
        W(extrude_shape([(0, 0), (0.28, -0.08), (0.36, 0.14), (0.12, 0.1)], 0.04, pos=(s * 0.12, 2.92, 0), rot=(0, 0 if s > 0 else math.pi, 0)), 'acc', 3, smooth=False)
    return 3.6


def sasumata():
    shaft(-0.65, 2.45, 0.09, 'acc', bands=[(0.2, 0), (1.2, 1)])
    grip_wrap(-0.5, 0.2, 0.095, 5)
    W(sphere(0.16, seg=12, rings=8, pos=(0, 2.4, 0)), 'acc')
    W(torus(0.5, 0.09, seg=24, rseg=8, arc=math.pi, pos=(0, 2.95, 0), rot=(0, 0, math.pi)), 'blade')
    for s in (-1, 1):
        W(sphere(0.12, seg=10, rings=8, pos=(s * 0.5, 2.95, 0)), 'acc')
        for j in range(3):  # 갈래 안쪽 가시 (B+)
            a = math.pi + (j + 1) * math.pi / 4 * (1 if s > 0 else 1)
        W(cyl(0.0, 0.06, 0.2, seg=5, pos=(s * 0.4, 2.6, 0), rot=(0, 0, -s * 0.9)), 'metal', 1, smooth=False)
    gem((0, 2.4, 0.15), 0.07, 2, (1, 1, 0.5))
    W(torus(0.62, 0.03, seg=24, rseg=4, arc=math.pi, pos=(0, 2.95, 0), rot=(0, 0, math.pi)), 'gem', 3)
    return 2.95


def axe():
    shaft(-0.65, 2.25, 0.09, 'wood', bands=[(1.45, 1)])
    grip_wrap(-0.55, 0.15, 0.095, 5)
    W(cyl(0.12, 0.08, 0.14, seg=10, pos=(0, -0.72, 0)), 'acc')
    W(box(0.32, 0.6, 0.28, pos=(0, 1.95, 0)), 'acc', bevel=0.05, seg=2, smooth=False)
    # 초승달 도끼날 (앞) + 뒤 가시
    sh = [(0.12, -0.3)]
    for j in range(13):
        a = -0.85 + 1.7 * j / 12
        sh.append((0.12 + 0.9 * math.cos(a) * 1.0, 0.75 * math.sin(a)))
    sh.append((0.12, 0.3))
    W(extrude_shape(sh, 0.1, pos=(0.0, 1.95, 0)), 'blade', smooth=False, bevel=0.025)
    W(extrude_shape([(0.12, -0.2), (0.5, -0.3), (0.5, 0.3), (0.12, 0.2)], 0.13, pos=(0, 1.95, 0)), 'metal', smooth=False)
    W(cyl(0.0, 0.12, 0.45, seg=6, pos=(-0.38, 1.95, 0), rot=(0, 0, math.pi / 2)), 'acc', 1, smooth=False)
    W(cyl(0.0, 0.07, 0.22, seg=6, pos=(0, 2.35, 0)), 'acc', 1, smooth=False)
    gem((0, 1.95, 0.15), 0.08, 2, (1, 1, 0.5))
    for j in range(3):  # S: 날 위 룬
        W(box(0.03, 0.14, 0.02, pos=(0.55 + j * 0.12, 1.95 + (j - 1) * 0.12, 0.065)), 'gem', 3, smooth=False)
    return 2.5


def hammer():
    shaft(-0.65, 1.85, 0.1, 'wood', bands=[(1.3, 1)])
    grip_wrap(-0.55, 0.2, 0.105, 5)
    W(cyl(0.13, 0.09, 0.14, seg=10, pos=(0, -0.72, 0)), 'acc')
    W(cyl(0.42, 0.42, 1.0, seg=20, pos=(0, 2.05, 0), rot=(0, 0, math.pi / 2)), 'blade', bevel=0.06, seg=2)
    for x in (-0.53, 0.53):
        W(cyl(0.47, 0.47, 0.12, seg=20, pos=(x, 2.05, 0), rot=(0, 0, math.pi / 2)), 'acc', bevel=0.02)
        W(cyl(0.3, 0.36, 0.1, seg=16, pos=(x * 1.1, 2.05, 0), rot=(0, 0, math.pi / 2)), 'metal', smooth=False)
    W(cyl(0.44, 0.44, 0.16, seg=20, pos=(0, 2.05, 0), rot=(0, 0, math.pi / 2)), 'acc', 1)
    for k in range(6):  # 징 (B+)
        a = TAU * k / 6
        W(sphere(0.06, seg=8, rings=5, pos=(0, 2.05 + math.sin(a) * 0.44, math.cos(a) * 0.44)), 'metal', 1)
    gem((0, 2.05, 0.46), 0.1, 2, (1, 1, 0.5))
    gem((0, 2.05, -0.46), 0.1, 2, (1, 1, 0.5))
    W(cyl(0.0, 0.1, 0.35, seg=6, pos=(0, 2.6, 0)), 'acc', 3, smooth=False)
    return 2.5


def bow():
    # 손잡이 (원래 x0, y0.6) + 휘어진 양 팔 (활대 끝 x -1.14, y 1.93 / -0.73)
    W(cyl(0.13, 0.13, 0.55, seg=12, pos=(0, 0.6, 0)), 'grip')
    grip_wrap(0.38, 0.82, 0.135, 4)
    cx, cy, R = -1.35, 0.6, 1.35
    for s in (-1, 1):
        n = 10
        prev = None
        for j in range(n + 1):
            a = s * (0.02 + 0.98 * j / n) * math.pi * 0.45
            pt = (cx + R * math.cos(a), cy + R * math.sin(a))
            if prev:
                mx, my = (prev[0] + pt[0]) / 2, (prev[1] + pt[1]) / 2
                L = math.hypot(pt[0] - prev[0], pt[1] - prev[1])
                rr = 0.085 - 0.035 * j / n
                W(cyl(rr, rr + 0.005, L + 0.02, seg=8, pos=(mx, my, 0), rot=(0, 0, math.atan2(pt[1] - prev[1], pt[0] - prev[0]) - math.pi / 2)), 'blade')
            prev = pt
        tip = (cx + R * math.cos(s * math.pi * 0.45), cy + R * math.sin(s * math.pi * 0.45))
        W(sphere(0.1, seg=10, rings=8, pos=(tip[0], tip[1], 0)), 'acc')
        # B+: 끝 장식 날개 / A+: 보석
        W(extrude_shape([(0, 0), (0.25, 0.08), (0.18, 0.22)], 0.04, pos=(tip[0], tip[1], 0), rot=(0, 0, s * 0.9 + math.pi)), 'acc', 1, smooth=False)
        gem((cx + R * math.cos(s * 0.6), cy + R * math.sin(s * 0.6), 0.07), 0.06, 2, (1, 1, 0.6))
    top = (cx + R * math.cos(math.pi * 0.45), cy + R * math.sin(math.pi * 0.45))
    bot = (cx + R * math.cos(-math.pi * 0.45), cy + R * math.sin(-math.pi * 0.45))
    W(cyl(0.012, 0.012, top[1] - bot[1], seg=4, pos=(top[0], (top[1] + bot[1]) / 2, 0)), 'white')
    W(box(0.12, 0.08, 0.1, pos=(0.08, 0.92, 0)), 'acc')          # 화살 받침
    W(torus(0.18, 0.025, seg=14, rseg=4, pos=(0, 0.6, 0), rot=(math.pi / 2, 0, 0)), 'gem', 3)
    return 1.9


def staff():
    shaft(-0.65, 2.55, 0.085, 'wood', bands=[(1.0, 1), (2.0, 0)])
    grip_wrap(0.1, 0.7, 0.09, 4)
    W(cyl(0.11, 0.07, 0.16, seg=10, pos=(0, -0.72, 0)), 'acc')
    # 꼭대기: 휘감은 덩굴 고리 (보석은 따로 돌아감 → 'spin')
    W(lathe([(0.0, 0), (0.14, 0), (0.18, 0.12), (0.12, 0.24), (0.0, 0.26)], seg=12, pos=(0, 2.5, 0)), 'acc')
    for k in range(3):
        a = TAU * k / 3
        W(torus(0.32, 0.04, seg=16, rseg=5, arc=math.pi * 0.9, pos=(math.cos(a) * 0.06, 2.95, math.sin(a) * 0.06), rot=(0, -a, math.pi * 0.55)), 'acc')
    W(cyl(0.0, 0.06, 0.25, seg=6, pos=(0, 3.4, 0)), 'acc', 1, smooth=False)
    for k in range(3):  # B+: 잎 장식
        a = TAU * k / 3 + 0.5
        W(sphere(0.1, seg=8, rings=6, pos=(math.cos(a) * 0.2, 2.68, math.sin(a) * 0.2), scale=(1.6, 0.4, 0.8), rot=(0, -a, 0.4)), 'acc', 1)
    # 보석(회전) + 고리(흔들림) — 이름으로 게임 애니메이션 연결
    W(sphere(0.3, seg=4, rings=2, pos=(0, 2.95, 0), scale=(1, 1.15, 1)), 'gem', 0, smooth=False)
    PARTS[-1] = (PARTS[-1][0], _cur['shape'], 'gem-spin', 0)
    W(torus(0.5, 0.045, seg=24, rseg=6, pos=(0, 2.95, 0)), 'blade', 0)
    PARTS[-1] = (PARTS[-1][0], _cur['shape'], 'blade-ring', 0)
    W(torus(0.62, 0.025, seg=24, rseg=4, pos=(0, 2.95, 0), rot=(0, 0, math.pi / 2)), 'gem', 3)
    PARTS[-1] = (PARTS[-1][0], _cur['shape'], 'gem-ring', 3)
    return 3.0


def scythe():
    shaft(-0.65, 2.65, 0.085, 'wood', bands=[(0.9, 1), (2.4, 0)])
    grip_wrap(-0.5, 0.2, 0.09, 5)
    W(cyl(0.11, 0.07, 0.16, seg=10, pos=(0, -0.72, 0)), 'acc')
    W(box(0.26, 0.32, 0.22, pos=(0, 2.62, 0)), 'acc', bevel=0.04, smooth=False)
    # 초승달 낫날 (원래 absarc 1.2 / 1.05, (-1.05, 1.8) 기준)
    sh = []
    for j in range(17):
        a = math.pi * 0.05 + (math.pi * 0.62 - math.pi * 0.05) * j / 16
        sh.append((math.cos(a) * 1.2, math.sin(a) * 1.2))
    for j in range(17):
        a = math.pi * 0.6 - (math.pi * 0.6 - math.pi * 0.08) * j / 16
        sh.append((0.12 + math.cos(a) * 1.05, -0.25 + math.sin(a) * 1.05))
    W(extrude_shape(sh, 0.07, pos=(-1.05 + 1.05, 1.8, 0)), 'blade', smooth=False, bevel=0.018)
    W(sphere(0.15, seg=10, rings=8, pos=(0, 2.85, 0)), 'acc')
    gem((0, 2.62, 0.13), 0.07, 2, (1, 1, 0.5))
    for j in range(5):  # S: 날 위 룬
        a = math.pi * 0.15 + j * 0.09
        W(box(0.03, 0.1, 0.02, pos=(math.cos(a) * 1.08, 1.8 + math.sin(a) * 1.08 - 0.05, 0.045), rot=(0, 0, a)), 'gem', 3, smooth=False)
    W(cyl(0.0, 0.08, 0.3, seg=6, pos=(0, -0.92, 0), rot=(math.pi, 0, 0)), 'acc', 1, smooth=False)
    return 2.9


def broom():
    # 원래: 빗자루를 뒤집어 들어 솔이 위 (자루 y -1.25~1.65, 솔 1.25~2.25)
    W(cyl(0.08, 0.08, 2.9, seg=12, pos=(0, 0.2, 0)), 'wood')
    W(sphere(0.1, seg=10, rings=6, pos=(0, -1.27, 0)), 'acc')
    W(torus(0.12, 0.035, seg=14, rseg=5, pos=(0, -1.0, 0), rot=(math.pi / 2, 0, 0)), 'acc', 1)
    for k in range(5):
        W(torus(0.085, 0.022, seg=12, rseg=4, pos=(0, -0.7 + k * 0.1, 0), rot=(math.pi / 2 + 0.2, 0, 0)), 'wrap')
    W(cyl(0.22, 0.12, 0.25, seg=14, pos=(0, 1.3, 0)), 'acc')
    W(torus(0.22, 0.05, seg=16, rseg=6, pos=(0, 1.35, 0), rot=(math.pi / 2, 0, 0)), 'acc', 1)
    random.seed(5)
    for k in range(26):  # 솔 다발
        a = random.uniform(0, TAU); r = random.uniform(0.0, 0.22)
        x, z = math.cos(a) * r, math.sin(a) * r
        W(cyl(0.035, 0.025, 0.95, seg=5, pos=(x * 1.4, 1.85, z * 1.4), rot=(z * 0.9, 0, -x * 0.9)), '#fcd34d', smooth=False)
    W(torus(0.26, 0.03, seg=16, rseg=4, pos=(0, 1.6, 0), rot=(math.pi / 2, 0, 0)), 'gem', 3)
    return 1.8


def ladle():
    shaft(-0.65, 1.85, 0.08, 'blade')
    grip_wrap(-0.55, 0.1, 0.085, 4)
    W(torus(0.1, 0.03, seg=12, rseg=4, pos=(0, -0.78, 0)), 'acc')       # 거는 고리
    # 국자 그릇 (원래 r0.48 반구 at y2.2, x축 0.6π 기울임)
    W(lathe([(0.0, 0.0), (0.3, 0.03), (0.44, 0.15), (0.48, 0.32), (0.44, 0.32), (0.4, 0.17), (0.28, 0.07), (0.0, 0.04)], seg=20, pos=(0, 2.2, 0.05), rot=(math.pi * 0.6, 0, 0)), 'acc')
    W(cyl(0.06, 0.08, 0.35, seg=8, pos=(0, 1.95, 0), rot=(0.3, 0, 0)), 'blade')
    gem((0, 0.25, 0.08), 0.06, 2, (1, 1, 0.5))
    W(torus(0.5, 0.025, seg=20, rseg=4, pos=(0, 2.2, 0.05), rot=(math.pi * 0.6 + math.pi / 2, 0, 0)), 'gem', 3)
    return 2.4


def pan():
    shaft(-0.65, 0.95, 0.1, 'grip')
    grip_wrap(-0.55, 0.6, 0.105, 6)
    W(torus(0.12, 0.035, seg=12, rseg=4, pos=(0, -0.8, 0)), 'acc')
    # 프라이팬 (원래 r0.85 위 / 0.7 아래 두께 0.22 at y1.75, 납작한 면이 z)
    W(lathe([(0.0, -0.11), (0.7, -0.11), (0.85, 0.11), (0.79, 0.11), (0.65, -0.06), (0.0, -0.06)], seg=28, pos=(0, 1.75, 0), rot=(math.pi / 2, 0, 0)), 'dark')
    W(torus(0.83, 0.05, seg=28, rseg=6, pos=(0, 1.75, 0.11)), 'acc')
    W(cyl(0.64, 0.64, 0.01, seg=28, pos=(0, 1.75, 0.055), rot=(math.pi / 2, 0, 0)), '#475569')
    W(box(0.22, 0.3, 0.16, pos=(0, 0.98, 0)), 'acc', bevel=0.03, smooth=False)
    # B+: 계란 프라이 / A+: 노른자 보석 / S: 하트 김
    W(cyl(0.3, 0.3, 0.03, seg=16, pos=(0.05, 1.8, 0.07), rot=(math.pi / 2, 0, 0), scale=(1.2, 1, 1)), 'white', 1)
    W(sphere(0.12, seg=12, rings=8, pos=(0.05, 1.8, 0.1), scale=(1, 1, 0.5)), '#fbbf24', 1)
    gem((0.05, 1.8, 0.14), 0.07, 2, (1, 1, 0.4))
    W(torus(0.9, 0.025, seg=28, rseg=4, pos=(0, 1.75, 0.0)), 'gem', 3)
    return 2.5


def umbrella():
    shaft(-0.55, 2.45, 0.07, 'metal')
    W(torus(0.2, 0.06, seg=14, rseg=6, arc=math.pi, pos=(0.2, -0.65, 0), rot=(0, 0, math.pi)), 'grip')
    W(cyl(0.07, 0.07, 0.4, seg=10, pos=(0, -0.45, 0)), 'grip')
    # 우산 (원래 열린 원뿔 r1.1 h0.75 at y2.4) — 8폭 천 + 살 + 끝 방울
    n = 8
    for k in range(n):
        a0 = TAU * k / n
        W(lathe([(1.12, 2.02), (0.75, 2.35), (0.35, 2.62), (0.0, 2.78)], seg=3, phi0=a0, phi=TAU / n), 'acc' if k % 2 == 0 else 'white', smooth=True)
        W(lathe([(0.0, 2.76), (0.35, 2.6), (0.75, 2.33), (1.12, 2.0)], seg=3, phi0=a0, phi=TAU / n), 'acc' if k % 2 == 0 else 'white', smooth=True)
        W(sphere(0.05, seg=6, rings=4, pos=(math.sin(a0) * 1.13, 2.0, math.cos(a0) * 1.13)), 'metal', 1)
    W(sphere(0.08, seg=8, rings=6, pos=(0, 2.83, 0)), 'acc')
    W(cyl(0.0, 0.05, 0.2, seg=6, pos=(0, 2.98, 0)), 'metal', 1)
    gem((0, 2.85, 0), 0.07, 2, (1, 1, 1))
    for k in range(n):  # S: 끝 빛 방울
        a0 = TAU * (k + 0.5) / n
        W(sphere(0.06, seg=6, rings=4, pos=(math.sin(a0) * 1.08, 1.92, math.cos(a0) * 1.08)), 'gem', 3)
    return 2.8


def boomerang():
    # 원래 두 팔 (±0.3, 0.9) 각 0.28×1.6, 기울기 ±0.5
    for s in (-1, 1):
        L = 1.65
        sh = []
        for j in range(9):  # 바깥쪽 둥근 변
            t = j / 8
            sh.append((0.17 + 0.05 * math.sin(t * math.pi), t * L))
        sh.append((0.0, L + 0.12))
        for j in range(8, -1, -1):
            t = j / 8
            sh.append((-0.17 + 0.03 * math.sin(t * math.pi), t * L))
        W(extrude_shape(sh, 0.12, pos=(0, 0.05, 0), rot=(0, 0, s * 0.5)), 'blade' if s < 0 else 'acc', smooth=False, bevel=0.035)
        tip = lpos((0, 0.05, 0), (0, 0, s * 0.5), (0, 1.55, 0))
        W(sphere(0.09, seg=8, rings=6, pos=(tip[0], tip[1], 0.07)), 'acc' if s < 0 else 'blade', 1)
    W(cyl(0.18, 0.18, 0.16, seg=16, pos=(0, 0.12, 0), rot=(math.pi / 2, 0, 0)), 'acc')
    gem((0, 0.12, 0.09), 0.08, 2, (1, 1, 0.5))
    for s in (-1, 1):
        for j in range(3):
            p = lpos((0, 0.05, 0), (0, 0, s * 0.5), (0.0, 0.5 + j * 0.35, 0.065))
            W(box(0.06, 0.12, 0.02, pos=p, rot=(0, 0, s * 0.5)), 'gem', 3, smooth=False)
    return 1.7


SHAPES = {
    'sword': lambda: sword(False), 'great': lambda: sword(True), 'claw': claw, 'spear': lambda: spear(False), 'trident': lambda: spear(True),
    'sasumata': sasumata, 'axe': axe, 'hammer': hammer, 'bow': bow, 'staff': staff, 'scythe': scythe, 'broom': broom,
    'ladle': ladle, 'pan': pan, 'umbrella': umbrella, 'boomerang': boomerang,
}


def build(only=None):
    """모든 무기(또는 only 하나)를 만들고 PARTS 반환. 미리보기용으로 x축으로 나란히 놓음(preview 전용)"""
    PARTS.clear()
    tips = {}
    for i, (name, fn) in enumerate(SHAPES.items()):
        if only and name != only:
            continue
        _cur['shape'] = name
        tips[name] = fn()
    return tips
