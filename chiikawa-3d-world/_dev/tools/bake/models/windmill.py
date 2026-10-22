# 🌾 풍차 — 원래 배치(town_hq.js windmill())와 같은 크기
# 게임 부품(그대로 사용): 회전 날개 전체(중심 (0, 7.6, 2.45)), 창문 불빛 2개
import math, random
from lib import *


def r_at(y):
    """탑 반지름 (원래 CylinderGeometry(2.0, 2.8, 7.2) 중심 y4.8 → y1.2~8.4)"""
    return 2.8 - ((y - 1.2) / 7.2) * 0.8


def build():
    random.seed(51)
    plaster = material('plaster', 0xfffaf0, 'plaster', 1.4, 0.07)
    stone = material('stone', 0xd2c8b5, 'stone', 2.0, 0.2)
    mortar = material('mortar', 0xb5ab97, 'stone', 3.0, 0.1)
    wood = material('wood', 0xa86b3c, 'wood', 1.6, 0.22)
    wood_lt = material('wood_lt', 0xd9a066, 'wood', 2.0, 0.2)
    shingle = material('shingle', 0x34d399, 'plaster', 3.0, 0.06)
    shingle_dk = material('shingle_dk', 0x1f9e73)
    gold = material('gold', 0xfde047)
    iron = material('iron', 0x3b3550)
    sack_m = material('sack', 0xe9d5a8, 'plaster', 4.0, 0.12)
    rope = material('rope', 0xb08850)
    leaf = material('leaf', 0x6cbf4a, 'plaster', 4.0, 0.15)
    leaf_dk = material('leaf_dk', 0x4e9a33)
    center = material('center', 0xfacc15)

    # ------------------------------------------------------------------
    # 돌 받침 (팔각, 원래 CylinderGeometry(3.1, 3.4, 1.2, 8)) — 돌 블록 2단
    # ------------------------------------------------------------------
    finish(cyl(3.0, 3.3, 1.2, seg=8, pos=(0, 0.6, 0)), mortar, smooth=False, ol=True, ol_t=0.02)
    for row in range(3):
        y = 0.2 + row * 0.4
        n = 24
        for i in range(n):
            a = TAU * (i + 0.5 * (row % 2)) / n
            rr = 3.32 - row * 0.1
            blk = box(0.8, 0.36, 0.3, pos=(math.sin(a) * rr, y, math.cos(a) * rr), rot=(0, a, 0))
            finish(blk, stone, bevel=0.05, seg=2, smooth=False, jitter=0.08)
    finish(cyl(3.0, 3.05, 0.14, seg=8, pos=(0, 1.25, 0)), material('cap', 0xe7e1d4, 'stone', 3.0, 0.1), bevel=0.04, smooth=False)

    # ------------------------------------------------------------------
    # 탑 (팔각 회벽) + 모서리 목재 + 가로 띠 + 사선 버팀
    # ------------------------------------------------------------------
    finish(cyl(2.0, 2.8, 7.2, seg=8, pos=(0, 4.8, 0)), plaster, smooth=False, ol=True, ol_t=0.02)
    for i in range(8):
        a = TAU * i / 8
        # 모서리 기둥 (기울어진 각목)
        x0, z0 = math.sin(a) * 2.84, math.cos(a) * 2.84
        x1, z1 = math.sin(a) * 2.04, math.cos(a) * 2.04
        L = math.sqrt((x0 - x1) ** 2 + 7.2 ** 2 + (z0 - z1) ** 2)
        tilt = math.atan2(0.8, 7.2)
        post = box(0.2, L, 0.2, pos=((x0 + x1) / 2, 4.8, (z0 + z1) / 2), rot=(-tilt, a, 0), order='YXZ')
        finish(post, wood, bevel=0.03, smooth=False)
    for y in (2.2, 5.0, 8.2):
        r = r_at(y) + 0.05
        finish(cyl(r + 0.02, r + 0.05, 0.25, seg=8, pos=(0, y, 0)), wood, bevel=0.03, smooth=False)
    # 사선 버팀 (면마다, 아래 칸)
    for i in range(8):
        if i == 0:
            continue  # 문 있는 면
        a = TAU * (i + 0.5) / 8
        r = r_at(3.6) * math.cos(math.pi / 8) + 0.06
        finish(box(0.14, 2.6, 0.08, pos=(math.sin(a) * r, 3.6, math.cos(a) * r), rot=(0, a, 0.8 if i % 2 else -0.8)), wood, smooth=False)

    # ------------------------------------------------------------------
    # 문 (원래 아치 1.3x2.1, 위치 (0, 1.2, 2.62), 기울기 -0.1) + 돌 문틀 + 랜턴
    # ------------------------------------------------------------------
    do = (0, 1.2, 2.62); drot = (-0.1, 0, 0)
    finish(extrude_shape(arch_pts(1.6, 2.4, 14), 0.3, pos=lpos(do, drot, (0, -0.02, -0.05)), rot=drot), material('niche', 0x6b4a32), smooth=False)
    for k in range(4):
        x = -0.48 + k * 0.32
        top = 1.45 + math.sqrt(max(0.0, 0.65 ** 2 - (abs(x) + 0.16) ** 2))
        finish(box(0.3, top, 0.14, pos=lpos(do, drot, (x, top / 2, 0.15)), rot=drot), wood_lt, bevel=0.02, seg=1, smooth=False, jitter=0.06)
    finish(box(1.25, 0.1, 0.05, pos=lpos(do, drot, (0, 0.5, 0.24)), rot=drot), iron, smooth=False)
    finish(box(1.25, 0.1, 0.05, pos=lpos(do, drot, (0, 1.5, 0.24)), rot=drot), iron, smooth=False)
    finish(sphere(0.08, seg=8, rings=6, pos=lpos(do, drot, (0.4, 1.0, 0.28))), gold)
    for k in range(9):
        a = math.pi * (k + 0.5) / 9
        finish(box(0.24, 0.3, 0.36, pos=lpos(do, drot, (math.cos(a) * 0.82, 1.45 + math.sin(a) * 0.82, 0.08)), rot=(drot[0], 0, a - math.pi / 2)), material('arch', 0xe7e1d4, 'stone', 3.0, 0.1), bevel=0.03, smooth=False, jitter=0.05)
    for s in (-1, 1):
        for k in range(3):
            finish(box(0.26, 0.45, 0.36, pos=lpos(do, drot, (s * 0.82, 0.24 + k * 0.48, 0.08)), rot=drot), material('arch', 0xe7e1d4, 'stone', 3.0, 0.1), bevel=0.03, smooth=False, jitter=0.05)
    # 문 앞 디딤돌
    finish(box(1.8, 0.2, 0.9, pos=(0, 1.1, 3.05)), stone, bevel=0.05, smooth=False)
    finish(box(2.2, 0.25, 0.9, pos=(0, 0.6, 3.5)), stone, bevel=0.05, smooth=False)
    finish(box(2.6, 0.3, 0.9, pos=(0, 0.15, 3.95)), stone, bevel=0.05, smooth=False)

    # ------------------------------------------------------------------
    # 창문 틀 (창 불빛은 게임 부품: 아치 0.8x1.1, [(0,5.2),(a=0.55,6.8)])
    # ------------------------------------------------------------------
    for (a, y) in [(0.0, 5.2), (0.55, 6.8)]:
        r = r_at(y)
        wo = (math.sin(a) * r, y, math.cos(a) * r); wr = (0, a, 0)
        # 아치 테두리 (바깥 아치 - 안쪽은 비움: 4개 부품으로)
        for s in (-1, 1):
            finish(box(0.14, 0.78, 0.16, pos=lpos(wo, wr, (s * 0.47, 0.38, 0.05)), rot=wr), wood, smooth=False, ol=True, ol_t=0.015)
        finish(torus(0.47, 0.07, seg=12, rseg=4, arc=math.pi, pos=lpos(wo, wr, (0, 0.7, 0.05)), rot=wr), wood)
        finish(box(1.1, 0.1, 0.3, pos=lpos(wo, wr, (0, -0.02, 0.15)), rot=wr), wood_lt, smooth=False)
        finish(box(0.05, 1.1, 0.04, pos=lpos(wo, wr, (0, 0.55, 0.13)), rot=wr), wood, smooth=False)
        finish(box(0.8, 0.05, 0.04, pos=lpos(wo, wr, (0, 0.55, 0.13)), rot=wr), wood, smooth=False)

    # ------------------------------------------------------------------
    # 원뿔 지붕 (원래 ConeGeometry(2.6, 2.8) 중심 y9.8) — 비늘 기와 + 처마 + 꼭대기
    # ------------------------------------------------------------------
    finish(cyl(0.0, 2.6, 2.8, seg=24, pos=(0, 9.8, 0)), shingle_dk, ol=True, ol_t=0.025)
    slope = math.atan2(2.6, 2.8)
    rows = 8
    for j in range(rows):
        t = j / rows
        y = 8.4 + 2.8 * t + 0.05
        rr = 2.6 * (1 - t) + 0.05
        n = max(6, int(TAU * rr / 0.45))
        for i in range(n):
            a = TAU * (i + 0.5 * (j % 2)) / n
            sh = extrude_shape(arch_pts(0.48, 0.46, 5)[::-1], 0.05)
            # 원뿔 면 위: 바깥 법선 방향으로 기울인 비늘
            F = frame_on_sphere(math.pi / 2 - slope, math.pi / 2 - a, 0.0)
            F.translation = Vector((math.sin(a) * rr, y, math.cos(a) * rr))
            M = F @ Matrix.Rotation(math.pi, 4, 'Z') @ Matrix.Translation((0, -0.46, 0))
            place_matrix(sh, M)
            finish(sh, shingle, smooth=False, jitter=0.05)
    finish(torus(2.62, 0.12, seg=32, rseg=6, pos=(0, 8.42, 0), rot=(math.pi / 2, 0, 0)), shingle_dk)
    finish(sphere(0.3, seg=12, rings=8, pos=(0, 11.3, 0)), gold, ol=True, ol_t=0.03)
    finish(cyl(0.04, 0.04, 0.8, seg=6, pos=(0, 11.75, 0)), iron)
    finish(box(0.5, 0.25, 0.02, pos=(0.22, 12.0, 0)), material('flag', 0xf87171), smooth=False)

    # 날개 축 받침 (게임 날개 중심 (0, 7.6, 2.45) 뒤쪽)
    finish(box(1.3, 1.3, 0.5, pos=(0, 7.6, 2.05)), wood, bevel=0.06, smooth=False, ol=True, ol_t=0.02)
    finish(cyl(0.18, 0.18, 0.6, seg=10, pos=(0, 7.6, 2.3), rot=(math.pi / 2, 0, 0)), iron)

    # ------------------------------------------------------------------
    # 주변 소품: 자루 여러 개 (원래 (2.6, 0.7, 2.6)), 상자 (-2.8, 0, 2.4), 맷돌, 꽃
    # ------------------------------------------------------------------
    for k, (x, z, s) in enumerate([(2.6, 2.6, 1.0), (3.2, 2.0, 0.75), (2.1, 3.15, 0.7)]):
        finish(sphere(0.6 * s, seg=14, rings=10, pos=(x, 0.65 * s, z), scale=(1, 1.15, 0.9)), sack_m, ol=True, ol_t=0.03, jitter=0.05)
        finish(cyl(0.12 * s, 0.22 * s, 0.25 * s, seg=10, pos=(x, 1.35 * s, z)), sack_m)
        finish(torus(0.16 * s, 0.035, seg=12, rseg=4, pos=(x, 1.25 * s, z), rot=(math.pi / 2, 0, 0)), rope)
    crate_model(-2.8, 0, 2.4, 0.9, 0.0, wood_lt, wood)
    finish(cyl(0.7, 0.7, 0.28, seg=24, pos=(-3.4, 0.7, 0.9), rot=(0.25, 0.3, math.pi / 2 - 0.2)), material('millstone', 0xb8b2a6, 'stone', 3.0, 0.2), bevel=0.04, ol=True, ol_t=0.025)
    for k in range(10):
        a = math.pi / 2 + (k - 4.5) * 0.12 + 0.9
        rr = 3.7 + random.uniform(-0.1, 0.2)
        finish(sphere(random.uniform(0.22, 0.32), seg=8, rings=6, pos=(math.sin(a) * rr, 0.22, math.cos(a) * rr), scale=(1, 0.7, 1)), leaf, jitter=0.1)
        if k % 2 == 0:
            flower(math.sin(a) * rr, 0.3, math.cos(a) * rr, random.choice([0xff85a2, 0xfde047, 0xffffff, 0xc084fc]), (leaf_dk, center), size=1.1, stem=0.25)
