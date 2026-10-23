# 🛠️ 노동 안내소 — 원래 배치(town_hq.js laborOffice())와 같은 크기·위치
# 게임 부품(그대로 사용): 접수 창 유리(밤에 빛남), 큰 간판·게시판 제목(글씨), 전단지 판(글씨)
import math, random
from lib import *


def build():
    random.seed(37)
    wall = material('wall', 0xf3dfc1, 'wood', 1.2, 0.12)
    roof = material('roof', 0x6d8fd1, 'plaster', 3.0, 0.08)
    roof_dk = material('roof_dk', 0x4f6fae)
    trim = material('trim', 0xa86b3c, 'wood', 1.6, 0.22)
    base = material('cobble', 0xd2c8b5, 'stone', 2.0, 0.2)
    cream = material('cream', 0xfff3d6, 'plaster', 3.0, 0.06)
    door_m = material('door', 0xd9a066, 'wood', 1.6, 0.2)
    wood = material('wood', 0x8a5a2b, 'wood', 1.6, 0.22)
    plank = material('plank', 0xc8955a, 'wood', 1.8, 0.2)
    iron = material('iron', 0x3b3550)
    gold = material('gold', 0xfacc15)
    blue = material('blue', 0x3b82f6)
    white = material('white', 0xffffff)
    navy = material('navy', 0x1e3a8a)
    basket_m = material('basket', 0xd6a35c, 'wood', 4.0, 0.25)
    weed = material('weed', 0x65a30d)
    weed2 = material('weed2', 0x4d7c0f)
    leaf = material('leaf', 0x6cbf4a, 'plaster', 4.0, 0.15)
    terra = material('terra', 0xe07a5f, 'plaster', 3.0, 0.1)
    stem = material('stem', 0x4f9a2f)
    center = material('center', 0xfacc15)

    W = Grp()
    # ------------------------------------------------------------------
    # 건물 (원래 building w9 d6 h4 rise2.4) — 가로 판자벽 + 파란 기와
    # ------------------------------------------------------------------
    gable_building(W, 9, 6, 4.0, 2.4, wall, roof, trim, base, roof_dk=roof_dk, ridge=iron, plank='trim')
    # 문 (원래 doorW(1.7, 2.7) at (-2.2, 0.5, 3.02)) + 디딤돌 + 문 위 작은 차양
    arch_door(Grp((-2.2, 0.5, 3.02)), 1.7, 2.7, cream, door_m, gold, plank_n=4)
    finish(box(2.3, 0.22, 0.7, pos=(-2.2, 0.11, 3.55)), base, bevel=0.04, smooth=False, jitter=0.05)
    finish(box(2.5, 0.08, 0.7, pos=(-2.2, 3.75, 3.35), rot=(0.3, 0, 0)), roof, bevel=0.02, seg=1, smooth=False, ol=True, ol_t=0.02)
    for x in (-3.3, -1.1):
        finish(box(0.08, 0.5, 0.08, pos=(x, 3.5, 3.4), rot=(0.75, 0, 0)), trim, smooth=False)

    # ------------------------------------------------------------------
    # 접수 창구 (원래 windowW(2.2, 1.4) at (1.8, 2.6, 3.0)) — 유리는 게임 부품(z 3.11)
    # ------------------------------------------------------------------
    finish(box(2.5, 1.7, 0.2, pos=(1.8, 2.6, 3.0)), cream, bevel=0.05, seg=2, smooth=False, ol=True, ol_t=0.04)
    finish(box(2.2, 0.08, 0.06, pos=(1.8, 2.6, 3.14)), trim, smooth=False)
    finish(box(0.08, 1.4, 0.06, pos=(1.8, 2.6, 3.14)), trim, smooth=False)
    finish(box(2.7, 0.14, 0.32, pos=(1.8, 3.5, 3.08)), trim, bevel=0.03, seg=1, smooth=False)
    # 카운터 선반 (원래 roundBox(2.8, 0.15, 0.7) at (1.8, 1.75, 3.3)) + 받침 + 종
    finish(box(2.8, 0.15, 0.7, pos=(1.8, 1.75, 3.3)), wood, bevel=0.04, seg=1, smooth=False, ol=True, ol_t=0.02)
    for x in (0.7, 2.9):
        finish(box(0.12, 0.45, 0.45, pos=(x, 1.45, 3.22)), wood, bevel=0.02, seg=1, smooth=False)
    finish(sphere_cap(0.16, 0.0, math.pi / 2, seg=14, rings=6, pos=(2.6, 1.83, 3.35)), gold, ol=True, ol_t=0.015)
    finish(sphere(0.04, seg=8, rings=5, pos=(2.6, 2.0, 3.35)), gold)
    finish(cyl(0.2, 0.2, 0.03, seg=14, pos=(2.6, 1.84, 3.35)), wood)
    # 서류 더미 + 펜꽂이
    for k in range(3):
        finish(box(0.5, 0.03, 0.36, pos=(1.2, 1.85 + k * 0.035, 3.3), rot=(0, random.uniform(-0.2, 0.2), 0)), white, smooth=False)
    finish(cyl(0.08, 0.08, 0.2, seg=10, pos=(0.6, 1.92, 3.35)), blue)
    for k in range(2):
        finish(cyl(0.012, 0.012, 0.28, seg=5, pos=(0.6 + (k - 0.5) * 0.05, 2.05, 3.35), rot=(0, 0, (k - 0.5) * 0.3)), material('pen%d' % k, [0xef4444, 0x1f2937][k]))
    # 줄무늬 차양 (원래 roundBox(3.2, 0.1, 1.2) at (1.8, 3.65, 3.5) 기울기 0.35)
    o = (1.8, 3.65, 3.5); rot = (0.35, 0, 0)
    for k in range(8):
        x = -1.6 + 0.2 + k * 0.4
        finish(box(0.4, 0.1, 1.2, pos=lpos(o, rot, (x, 0.015 * (k % 2), 0)), rot=rot), blue if k % 2 == 0 else white, bevel=0.02, seg=1, smooth=False, ol=(k == 0), ol_t=0.02)
    for i in range(8):
        finish(cyl(0.2, 0.2, 0.08, seg=12, pos=lpos(o, rot, (-1.4 + i * 0.4, -0.08, 0.61)), rot=(rot[0] + math.pi / 2, 0, 0)), white if i % 2 else blue)
    # 간판 받침 (간판 5.2×1.1 at (0, 5.35, 3.15)은 게임 부품)
    for x in (-2.0, 2.0):
        finish(box(0.16, 1.1, 0.16, pos=(x, 4.75, 2.98)), trim, bevel=0.02, seg=1, smooth=False)

    # 옆벽 꽃상자 + 화분 (장식)
    for x in (-4.0, 3.9):
        finish(lathe([(0, 0), (0.3, 0), (0.38, 0.45), (0.42, 0.5), (0.42, 0.58), (0, 0.58)], seg=14, pos=(x, 0.5, 3.4)), terra, ol=True, ol_t=0.03)
        finish(sphere(0.4, seg=10, rings=8, pos=(x, 1.2, 3.4), scale=(1, 0.8, 1)), leaf, jitter=0.08)
        for k in range(4):
            a = TAU * k / 4 + 0.4
            flower(x + math.cos(a) * 0.25, 1.3, 3.4 + math.sin(a) * 0.25, [0xff85a2, 0xfde047, 0xffffff, 0xc084fc][k], (stem, center), size=1.0, stem=0.25)

    # ------------------------------------------------------------------
    # 일거리 게시판 (원래 그룹 (4.6, 0, 6.6) ry -0.35)
    # ------------------------------------------------------------------
    B = Grp((4.6, 0, 6.6), (0, -0.35, 0))
    for x in (-2.2, 2.2):
        finish(B(box(0.28, 3.9, 0.28, pos=(x, 1.95, 0))), plank, bevel=0.04, seg=1, smooth=False, jitter=0.06, ol=True, ol_t=0.04)
        finish(B(box(0.42, 0.25, 0.42, pos=(x, 0.12, 0))), base, bevel=0.04, smooth=False)
        finish(B(box(0.5, 0.12, 0.12, pos=(x * 0.86, 1.1, 0.0), rot=(0, 0, 0.6 if x < 0 else -0.6))), plank, smooth=False)
    # 전단지 판(4.1×2.4×0.15, y2.3)은 게임 부품 → 둘레 나무 테두리만
    for (w_, h_, x, y) in ((4.4, 0.16, 0, 3.58), (4.4, 0.16, 0, 1.02), (0.16, 2.6, -2.12, 2.3), (0.16, 2.6, 2.12, 2.3)):
        finish(B(box(w_, h_, 0.24, pos=(x, y, 0.0))), wood, bevel=0.03, seg=1, smooth=False, ol=True, ol_t=0.02)
    finish(B(box(4.1, 0.08, 0.32, pos=(0, 0.9, 0.12))), wood, smooth=False)
    finish(B(box(0.4, 0.14, 0.2, pos=(1.4, 1.0, 0.16))), material('tin', 0xef4444), bevel=0.02, seg=1, smooth=False)
    finish(B(cyl(0.08, 0.08, 0.12, seg=10, pos=(-1.3, 1.0, 0.16))), material('tape', 0xfde68a))
    # 작은 박공지붕 (원래 gableRoof(4.6, 1.2, 3.55, 0.55, over 0.3))
    th = math.atan2(0.55, 0.6); L = 0.9 / math.cos(th)
    for side in (-1, 1):
        cy = 3.55 + 0.55 - (L / 2) * math.sin(th) + 0.1; cz = side * (L / 2) * math.cos(th)
        finish(B(box(5.2, 0.18, L, pos=(0, cy, cz), rot=(side * th, 0, 0))), roof_dk, bevel=0.04, seg=1, smooth=False, ol=True, ol_t=0.02)
        for k in range(3):
            lp = lpos((0, cy, cz), (side * th, 0, 0), (0, 0.11, side * (-L / 2 + (k + 0.5) * L / 3)))
            finish(B(box(5.15, 0.07, L / 3 + 0.1, pos=lp, rot=(side * th - side * 0.07, 0, 0))), roof, bevel=0.02, seg=1, smooth=False, jitter=0.05)
    finish(B(cyl(0.2, 0.2, 5.4, seg=12, pos=(0, 4.28, 0), rot=(0, 0, math.pi / 2))), iron, ol=True, ol_t=0.02)
    for x in (-1, 1):
        finish(B(sphere(0.24, seg=10, rings=8, pos=(x * 2.75, 4.28, 0))), iron)

    # ------------------------------------------------------------------
    # 소품: 벤치 (-3.6, 6.2, ry0.2), 풀 바구니 (-0.4, 4.4), 상자 2개
    # ------------------------------------------------------------------
    bench_model(Grp((-3.6, 0, 6.2), (0, 0.2, 0)), plank, iron)
    bx, bz = -0.4, 4.4
    finish(lathe([(0, 0.02), (0.48, 0.02), (0.6, 0.6), (0.54, 0.6), (0.43, 0.08), (0, 0.08)], seg=20, pos=(bx, 0, bz)), basket_m, ol=True, ol_t=0.04)
    for y in (0.15, 0.3, 0.45):
        finish(torus(0.5 + y * 0.18, 0.025, seg=20, rseg=4, pos=(bx, y, bz), rot=(math.pi / 2, 0, 0)), material('basket_dk', 0xb8833f))
    finish(torus(0.6, 0.04, seg=20, rseg=5, pos=(bx, 0.6, bz), rot=(math.pi / 2, 0, 0)), material('basket_dk', 0xb8833f))
    finish(torus(0.5, 0.04, seg=16, rseg=5, arc=math.pi, pos=(bx, 0.6, bz), rot=(0, 0.6, 0)), material('basket_dk', 0xb8833f))
    for i in range(14):
        a = random.uniform(0, TAU); r = random.uniform(0, 0.42)
        finish(cyl(0.0, 0.08, random.uniform(0.5, 0.8), seg=4, pos=(bx + math.cos(a) * r, 0.75, bz + math.sin(a) * r), rot=(random.uniform(-0.4, 0.4), 0, random.uniform(-0.4, 0.4))), weed if i % 2 else weed2, smooth=False)
    # 낫 (바구니에 기대어)
    finish(box(0.06, 1.0, 0.06, pos=(bx + 0.7, 0.45, bz + 0.2), rot=(0, 0, 0.35)), wood, smooth=False)
    finish(torus(0.25, 0.025, seg=12, rseg=3, arc=math.pi * 0.7, pos=(bx + 0.55, 0.95, bz + 0.2), rot=(0, 0, 1.2)), material('steel', 0xcbd5e1))
    crate_model(-5.4, 0, 2.2, 0.9, 0.0, plank, wood)
    crate_model(-5.3, 0.9, 2.1, 0.7, 0.4, plank, wood)
