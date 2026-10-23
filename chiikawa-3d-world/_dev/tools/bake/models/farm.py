# 🥕 들판 농장 (밭 · 헛간 · 울타리) — 원래 배치(town_hq.js farm())와 같은 크기·위치
# 게임 부품(그대로 사용): 허수아비 전체(바람에 흔들림), 헛간 다락 창 유리
import math, random
from lib import *


def build():
    random.seed(61)
    soil = material('soil', 0x8b5a2b, 'plaster', 2.5, 0.15)
    ridge_m = material('ridge', 0x7a4a22, 'plaster', 3.0, 0.15)
    cabbage = material('cabbage', 0x86efac, 'plaster', 4.0, 0.08)
    cab_leaf = material('cab_leaf', 0x4ade80)
    carrot = material('carrot', 0xf97316)
    green = material('green', 0x22c55e)
    sprout = material('sprout', 0x65a30d)
    wall = material('barn', 0xd9534f, 'wood', 1.4, 0.15)
    roof = material('barn_roof', 0x6b4a3a, 'plaster', 3.0, 0.1)
    roof_dk = material('barn_roof_dk', 0x553a2d)
    white = material('white', 0xffffff, 'wood', 2.0, 0.06)
    base = material('cobble', 0xd2c8b5, 'stone', 2.0, 0.2)
    door_m = material('barn_door', 0xb33a35, 'wood', 1.4, 0.15)
    fence_w = material('fence', 0xe8c99a, 'wood', 1.8, 0.2)
    can_m = material('can', 0x34d399)
    grey = material('grey', 0x9ca3af, 'plaster', 3.0, 0.08)
    dark = material('dark', 0x374151)
    pump = material('pumpkin', 0xf97316, 'plaster', 3.0, 0.08)
    stem = material('stem', 0x4d7c0f)
    hay = material('hay', 0xf4d27a, 'wood', 3.0, 0.2)
    hay_dk = material('hay_dk', 0xd9b45a)
    twine = material('twine', 0xb45309)
    wood = material('wood', 0x8a5a2b, 'wood', 1.6, 0.22)
    sun_p = material('sun_petal', 0xfacc15)
    sun_c = material('sun_center', 0x7c4a24)
    leaf = material('leaf', 0x4e9a33)

    # ------------------------------------------------------------------
    # 밭 (원래 roundBox(14, 0.2, 10) at (0, 0.1, 2)) + 이랑 6줄 + 작물
    # ------------------------------------------------------------------
    finish(box(14, 0.2, 10, pos=(0, 0.1, 2)), soil, bevel=0.06, seg=2, smooth=False)
    for r in range(6):
        z = -2.2 + r * 1.65
        # 이랑: 둥근 흙 두둑 (원래 roundBox(13, 0.3, 0.9) y0.25)
        finish(cyl(0.45, 0.45, 13, seg=12, pos=(0, 0.16, z), rot=(0, 0, math.pi / 2), scale=(1, 1, 0.45)), ridge_m, jitter=0.04)
        for k in range(9):
            x = -5.8 + k * 1.45
            if r % 3 == 0:  # 양배추: 속 + 겉잎
                finish(rounded_pebble(0.36, seed=r * 20 + k, pos=(x, 0.6, z), scale=(1, 0.85, 1)), cabbage, jitter=0.06, ol=True, ol_t=0.02)
                for j in range(5):
                    a = TAU * j / 5 + k
                    finish(sphere(0.3, seg=8, rings=6, pos=(x + math.cos(a) * 0.3, 0.5, z + math.sin(a) * 0.3), scale=(1, 0.35, 0.8), rot=(0, -a, 0.5)), cab_leaf, jitter=0.06)
            elif r % 3 == 1:  # 당근: 주황 머리 + 잎
                finish(cyl(0.12, 0.08, 0.14, seg=10, pos=(x, 0.42, z)), carrot)
                for l in range(4):
                    finish(cyl(0.0, 0.06, 0.6, seg=4, pos=(x + (l - 1.5) * 0.06, 0.75, z + random.uniform(-0.05, 0.05)), rot=(random.uniform(-0.2, 0.2), 0, (l - 1.5) * 0.3)), green, smooth=False)
            else:  # 새싹
                finish(sphere(0.22, seg=8, rings=6, pos=(x, 0.52, z), scale=(1, 0.6, 1.4)), sprout, jitter=0.08)
                for l in (-1, 1):
                    finish(sphere(0.13, seg=6, rings=4, pos=(x + l * 0.16, 0.7, z), scale=(1, 0.35, 0.6), rot=(0, 0, -l * 0.5)), green)
    # 뒤쪽 해바라기 줄 (뒤 울타리 앞)
    for k in range(8):
        x = -6.0 + k * 1.7 + random.uniform(-0.2, 0.2)
        h = random.uniform(1.8, 2.4)
        z = -2.95
        finish(cyl(0.04, 0.05, h, seg=6, pos=(x, h / 2, z)), stem)
        for s in (-1, 1):
            finish(sphere(0.18, seg=6, rings=4, pos=(x + s * 0.18, h * 0.55, z), scale=(1.3, 0.3, 0.8), rot=(0, 0, -s * 0.4)), leaf)
        fp = (x, h, z + 0.05)
        finish(cyl(0.18, 0.18, 0.08, seg=14, pos=fp, rot=(math.pi / 2 - 0.3, 0, 0)), sun_c)
        for j in range(12):
            a = TAU * j / 12
            finish(sphere(0.12, seg=6, rings=4, pos=lpos(fp, (math.pi / 2 - 0.3, 0, 0), (math.cos(a) * 0.27, 0.0, math.sin(a) * 0.27)), scale=(1, 0.3, 0.5), rot=(math.pi / 2 - 0.3, 0, 0)), sun_p)

    # ------------------------------------------------------------------
    # 빨간 헛간 (원래 building w7 d6 h4 rise2.6 at (10.5, 0, -6.5) ry -0.35, 흰 모서리)
    # ------------------------------------------------------------------
    B = Grp((10.5, 0, -6.5), (0, -0.35, 0))
    gable_building(B, 7, 6, 4.0, 2.6, wall, roof, white, base, roof_dk=roof_dk, ridge=white)
    for side, (L, nx, nz, ry) in enumerate([(7, 0, 3, 0), (7, 0, -3, math.pi), (6, 3.5, 0, math.pi / 2), (6, -3.5, 0, -math.pi / 2)]):
        n = int(L / 0.45)
        for i in range(n):  # 세로 판자 이음
            x = -L / 2 + L * (i + 0.5) / n
            if side == 0 and abs(x) < 1.5:
                continue
            lp = (nx + math.cos(ry) * x + math.sin(ry) * 0.01, 2.3, nz - math.sin(ry) * x + math.cos(ry) * 0.01)
            finish(B(box(0.04, 3.9, 0.04, pos=lp, rot=(0, ry, 0))), door_m, smooth=False)
    # 큰 미닫이 문 2짝 (원래 roundBox(1.4, 2.8, 0.16) at (±0.72, 1.4+0.5, 3.05)) + 흰 X 보강 + 테
    for s in (-1, 1):
        finish(B(box(1.4, 2.8, 0.16, pos=(s * 0.72, 1.9, 3.05))), door_m, bevel=0.03, seg=1, smooth=False, ol=True, ol_t=0.03)
        for (w_, h_, x, y) in ((1.42, 0.12, 0, 1.36), (1.42, 0.12, 0, -1.36), (0.12, 2.8, -0.65, 0), (0.12, 2.8, 0.65, 0)):
            finish(B(box(w_, h_, 0.06, pos=(s * 0.72 + x, 1.9 + y, 3.15))), white, smooth=False)
        for sg in (1, -1):
            finish(B(box(1.75, 0.13, 0.06, pos=(s * 0.72, 1.9, 3.16), rot=(0, 0, sg * 1.1 * s))), white, smooth=False)
    finish(B(box(3.2, 0.12, 0.12, pos=(0, 3.45, 3.12))), dark, smooth=False)  # 미닫이 레일
    finish(B(box(0.08, 0.3, 0.06, pos=(-0.1, 1.9, 3.2))), dark, smooth=False)
    finish(B(box(0.08, 0.3, 0.06, pos=(0.1, 1.9, 3.2))), dark, smooth=False)
    # 다락 지붕창 (창 유리 (0, 5.2, 2.96)은 게임 부품): 작은 박공 상자 + 흰 창틀
    finish(B(box(1.7, 1.9, 1.6, pos=(0, 5.0, 1.95))), wall, bevel=0.03, seg=1, smooth=False, ol=True, ol_t=0.02)
    finish(B(box(1.4, 1.2, 0.2, pos=(0, 5.2, 2.85))), white, bevel=0.04, seg=1, smooth=False, ol=True, ol_t=0.03)
    finish(B(box(1.1, 0.07, 0.05, pos=(0, 5.2, 2.99))), white, smooth=False)
    finish(B(box(0.07, 0.9, 0.05, pos=(0, 5.2, 2.99))), white, smooth=False)
    for s in (-1, 1):
        finish(B(box(1.25, 0.14, 2.1, pos=(s * 0.5, 6.25, 1.85), rot=(0, 0, -s * 0.62))), roof, bevel=0.03, seg=1, smooth=False, ol=True, ol_t=0.02)
    finish(B(extrude_shape([(-0.85, 0), (0.85, 0), (0, 0.55)], 0.1, pos=(0, 5.95, 2.72))), wall, smooth=False)
    finish(B(cyl(0.08, 0.08, 2.15, seg=8, pos=(0, 6.62, 1.85), rot=(math.pi / 2, 0, 0))), white)
    # 풍향계 (용마루 위)
    finish(B(cyl(0.03, 0.03, 0.9, seg=6, pos=(-2.5, 7.4, 0))), dark)
    finish(B(extrude_shape([(-0.35, 0), (0.25, 0), (0.35, 0.12), (0.2, 0.22), (-0.2, 0.22), (-0.3, 0.12)], 0.04, pos=(-2.5, 7.75, 0), rot=(0, 0.6, 0))), dark, smooth=False)
    for k in range(4):
        a = TAU * k / 4
        finish(B(box(0.35, 0.03, 0.03, pos=(-2.5 + math.cos(a) * 0.17, 7.5, math.sin(a) * 0.17), rot=(0, -a, 0))), dark, smooth=False)

    # ------------------------------------------------------------------
    # 울타리 (원래 fence(len, posts) 5줄)
    # ------------------------------------------------------------------
    for (x, z, ry, L) in ((-7.4, 2, math.pi / 2, 10), (7.4, 2, math.pi / 2, 10), (0, -3.4, 0, 15), (-4.5, 7.4, 0, 6), (4.5, 7.4, 0, 6)):
        fence_model(Grp((x, 0, z), (0, ry, 0)), fence_w, L, max(3, round(L / 2.2)))

    # ------------------------------------------------------------------
    # 물뿌리개 (원래 (-6.2, 0, 8.6)) / 수레 + 호박 (원래 (6.5, 0, 6.5) ry 0.6) / 건초 3개 (x 13.5)
    # ------------------------------------------------------------------
    cx, cz = -6.2, 8.6
    finish(cyl(0.32, 0.36, 0.6, seg=18, pos=(cx, 0.3, cz)), can_m, bevel=0.02, ol=True, ol_t=0.05)
    finish(torus(0.33, 0.03, seg=18, rseg=4, pos=(cx, 0.6, cz), rot=(math.pi / 2, 0, 0)), can_m)
    finish(cyl(0.05, 0.08, 0.7, seg=8, pos=(cx + 0.45, 0.5, cz), rot=(0, 0, -0.9)), can_m)
    finish(cyl(0.12, 0.06, 0.08, seg=10, pos=(cx + 0.74, 0.72, cz), rot=(0, 0, -0.9)), grey)
    finish(torus(0.22, 0.035, seg=12, rseg=4, arc=math.pi, pos=(cx - 0.05, 0.62, cz), rot=(0, 0, 0)), can_m)
    C = Grp((6.5, 0, 6.5), (0, 0.6, 0))
    finish(C(box(1.6, 0.5, 1.0, pos=(0, 0.8, 0))), grey, bevel=0.06, seg=2, smooth=False, ol=True, ol_t=0.04)
    finish(C(box(1.45, 0.06, 0.85, pos=(0, 1.03, 0))), dark, smooth=False)
    for z in (-0.35, 0.35):
        finish(C(box(2.4, 0.08, 0.08, pos=(-0.25, 0.62, z))), wood, smooth=False)
        finish(C(box(0.08, 0.55, 0.08, pos=(-0.55, 0.3, z))), wood, smooth=False)
        finish(C(cyl(0.05, 0.05, 0.3, seg=8, pos=(-1.4, 0.62, z), rot=(0, 0, math.pi / 2))), dark)
    finish(C(torus(0.32, 0.08, seg=18, rseg=6, pos=(0.9, 0.35, 0))), dark, ol=True, ol_t=0.03)
    for k in range(4):
        finish(C(box(0.04, 0.6, 0.04, pos=(0.9, 0.35, 0), rot=(0, 0, math.pi * k / 4))), grey, smooth=False)
    finish(C(cyl(0.06, 0.06, 0.25, seg=8, pos=(0.9, 0.35, 0), rot=(math.pi / 2, 0, 0))), grey)
    for k in range(8):  # 호박 (원래 r0.4 scaleY 0.75 at (0, 1.2, 0)) — 골 나눔
        a = TAU * k / 8
        finish(C(sphere(0.24, seg=10, rings=8, pos=(math.cos(a) * 0.18, 1.2, math.sin(a) * 0.18), scale=(1, 1.2, 1))), pump, jitter=0.05, ol=(k == 0), ol_t=0.03)
    finish(C(cyl(0.04, 0.06, 0.18, seg=6, pos=(0, 1.55, 0), rot=(0.3, 0, 0))), stem)
    finish(C(sphere(0.12, seg=6, rings=4, pos=(0.12, 1.5, 0.05), scale=(1.4, 0.3, 1))), leaf)
    for i in range(3):
        hp = (13.5, 0.85 + (1.5 if i == 2 else 0), -2.2 + (0.9 if i == 2 else i * 1.8))
        finish(cyl(0.85, 0.85, 1.3, seg=20, pos=hp, rot=(0, 0, math.pi / 2)), hay, bevel=0.06, jitter=0.05, ol=True, ol_t=0.04)
        for s in (-1, 1):
            finish(cyl(0.6, 0.6, 0.02, seg=18, pos=(hp[0] + s * 0.66, hp[1], hp[2]), rot=(0, 0, math.pi / 2)), hay_dk)
            finish(torus(0.86, 0.03, seg=20, rseg=4, pos=(hp[0] + s * 0.35, hp[1], hp[2]), rot=(0, math.pi / 2, 0)), twine)
        for k in range(10):  # 삐죽 나온 지푸라기
            a = random.uniform(0, TAU)
            finish(box(0.02, 0.02, 0.4, pos=(hp[0] + random.uniform(-0.6, 0.6), hp[1] + math.sin(a) * 0.86, hp[2] + math.cos(a) * 0.86), rot=(random.uniform(0, 3), random.uniform(0, 3), 0)), hay_dk, smooth=False)
    # 쇠스랑 (건초에 기댐)
    finish(box(0.06, 2.0, 0.06, pos=(12.6, 1.0, -3.4), rot=(0.25, 0, 0.1)), wood, smooth=False)
    for k in range(3):
        finish(box(0.03, 0.4, 0.03, pos=(12.7 + (k - 1) * 0.1, 2.15, -3.12)), grey, smooth=False)
    finish(box(0.32, 0.05, 0.05, pos=(12.7, 1.95, -3.15)), grey, smooth=False)
