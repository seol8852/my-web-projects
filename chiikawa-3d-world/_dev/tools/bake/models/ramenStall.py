# 🍜 라멘 포차 (야타이) — 원래 배치(town_hq.js ramenStall())와 같은 크기
# 게임 부품(그대로 사용): 노렌 4장(바람에 흔들림), 간판(글씨), 종이 등불 2개, 육수 김, 조명
import math, random
from lib import *


def build():
    random.seed(31)
    wood = material('wood', 0xc98b52, 'wood', scale=1.6, amount=0.22)
    wood_dk = material('wood_dk', 0x8a4b22, 'wood', scale=1.4, amount=0.25)
    wood_lt = material('wood_lt', 0xe2b27a, 'wood', scale=2.0, amount=0.18)
    wheel_m = material('wheel', 0x5b3412, 'wood', scale=2.0, amount=0.2)
    iron = material('iron', 0x3b3550)
    tile = material('tile', 0xd94b4b, 'plaster', scale=3.0, amount=0.08)
    tile_dk = material('tile_dk', 0x9f2a2a)
    metal = material('metal', 0xb6c2d1, 'plaster', 3.0, 0.08)
    steel = material('steel', 0x9ca3af, 'plaster', 4.0, 0.1)
    white = material('white', 0xffffff)
    red = material('red', 0xef4444)
    dark = material('dark', 0x1f2937)

    # ------------------------------------------------------------------
    # 카운터 (각목 틀 + 가로 판자 + 아래 격자) — 원래 roundBox(8.2, 2.3, 3.6) 중심 y1.15
    # ------------------------------------------------------------------
    finish(box(8.0, 2.2, 3.4, pos=(0, 1.15, 0)), wood_dk, smooth=False)
    plank_wall(8.0, 1.5, 6, wood, depth=0.1, pos=(0, 1.45, 1.75))
    plank_wall(8.0, 1.5, 6, wood, depth=0.1, pos=(0, 1.45, -1.75))
    plank_wall(3.4, 1.5, 6, wood, depth=0.1, pos=(4.05, 1.45, 0), rot=(0, math.pi / 2, 0))
    plank_wall(3.4, 1.5, 6, wood, depth=0.1, pos=(-4.05, 1.45, 0), rot=(0, math.pi / 2, 0))
    # 아래 격자 장식 (앞면)
    finish(box(8.0, 0.6, 0.1, pos=(0, 0.42, 1.74)), wood_dk, smooth=False)
    for k in range(17):
        finish(box(0.08, 0.5, 0.06, pos=(-3.8 + k * 0.475, 0.42, 1.82)), wood_lt, smooth=False)
    for y in (0.22, 0.62):
        finish(box(7.9, 0.07, 0.06, pos=(0, y, 1.83)), wood_lt, smooth=False)
    # 모서리 각목
    for x in (-4.1, 4.1):
        for z in (-1.8, 1.8):
            finish(box(0.26, 2.3, 0.26, pos=(x, 1.15, z)), wood_dk, bevel=0.03, smooth=False, ol=True, ol_t=0.02)
    # 상판 (두꺼운 판자 5장 + 앞 테두리)
    for k in range(5):
        finish(box(8.8, 0.18, 0.86, pos=(0, 2.35, -1.52 + k * 0.88)), wood_dk, bevel=0.03, seg=1, smooth=False, jitter=0.06)
    finish(box(8.9, 0.12, 0.14, pos=(0, 2.28, 2.42)), wood_lt, bevel=0.03, smooth=False, ol=True, ol_t=0.02)

    # 바퀴 (원래 (±3.2, 0.75, 1.9))
    for x in (-3.2, 3.2):
        wheel(0.75, wheel_m, iron, spokes=8, pos=(x, 0.75, 1.95))

    # ------------------------------------------------------------------
    # 기둥 4개 + 기와 맞배지붕
    # ------------------------------------------------------------------
    for (x, z) in [(-3.8, -1.4), (3.8, -1.4), (-3.8, 1.9), (3.8, 1.9)]:
        finish(box(0.32, 4.4, 0.32, pos=(x, 4.5, z)), wood, bevel=0.04, smooth=False, ol=True, ol_t=0.025)
        finish(box(0.42, 0.18, 0.42, pos=(x, 2.55, z)), wood_dk, bevel=0.03, smooth=False)
    # 들보 (지붕 받침)
    for z in (-1.4, 1.9):
        finish(box(8.1, 0.28, 0.3, pos=(0, 6.62, z)), wood_dk, bevel=0.03, smooth=False)
    for x in (-3.8, 3.8):
        finish(box(0.3, 0.28, 3.6, pos=(x, 6.62, 0.25)), wood_dk, bevel=0.03, smooth=False)
    # 지붕면 (원래: 중심 (0, 7.35, 0.25 ± 1.45), 기울기 ±0.42, 9.6 x 3.4)
    for side in (-1, 1):
        o = (0, 7.35, 0.25 + side * 1.45); rot = (side * 0.42, 0, 0)
        finish(box(9.6, 0.14, 3.4, pos=lpos(o, rot, (0, -0.05, 0)), rot=rot), tile_dk, smooth=False, ol=True, ol_t=0.025)
        # 둥근 기와 (볼록·오목 번갈아) 열 x 4줄
        ncol = 24
        for c in range(ncol):
            x = -4.6 + c * (9.2 / (ncol - 1))
            for r in range(4):
                zz = -1.25 + r * 0.82
                piece = cyl(0.19, 0.2, 0.9, seg=10, pos=lpos(o, rot, (x, 0.07 - r * 0.012, zz * side)), rot=(rot[0] + math.pi / 2, 0, 0), scale=(1, 1, 0.45))
                finish(piece, tile, jitter=0.05)
        # 처마 끝 둥근 막새
        for c in range(ncol):
            x = -4.6 + c * (9.2 / (ncol - 1))
            finish(cyl(0.2, 0.2, 0.08, seg=10, pos=lpos(o, rot, (x, 0.07, side * 1.72)), rot=(rot[0] + math.pi / 2, 0, 0), scale=(1, 1, 0.6)), tile_dk)
    # 용마루 + 양 끝 장식
    finish(cyl(0.26, 0.26, 9.9, seg=12, pos=(0, 8.02, 0.25), rot=(0, 0, math.pi / 2)), tile_dk, ol=True, ol_t=0.02)
    for x in (-5.0, 5.0):
        finish(sphere(0.38, seg=12, rings=8, pos=(x, 8.1, 0.25), scale=(0.6, 1, 1)), tile_dk)
    # 박공 끝 판 (양 옆 삼각 판)
    for x in (-4.85, 4.85):
        tri = extrude_shape([(-1.7, 0), (1.7, 0), (0, 0.85)], 0.1, pos=(x, 6.75, 0.25), rot=(0, math.pi / 2, 0))
        finish(tri, wood_dk, smooth=False)

    # ------------------------------------------------------------------
    # 카운터 위: 라멘 그릇 4개 (원래 (x, 2.47, 1.6)), 젓가락통, 양념병
    # ------------------------------------------------------------------
    for x in (-2.7, -0.9, 0.9, 2.7):
        bz = 1.6
        finish(lathe([(0, 0), (0.22, 0), (0.24, 0.04), (0.45, 0.32), (0.48, 0.36), (0.44, 0.37), (0.41, 0.33), (0.2, 0.08), (0, 0.07)], seg=20, pos=(x, 2.47, bz)), white, ol=True, ol_t=0.03)
        finish(torus(0.43, 0.025, seg=24, rseg=4, pos=(x, 2.47 + 0.3, bz), rot=(math.pi / 2, 0, 0)), material('bowl_line', 0xdc2626))
        finish(cyl(0.39, 0.39, 0.02, seg=20, pos=(x, 2.47 + 0.29, bz)), material('soup', 0xf4c27a))
        for k in range(6):  # 면
            finish(torus(0.1 + k * 0.035, 0.018, seg=14, rseg=4, pos=(x - 0.05, 2.47 + 0.325, bz), rot=(math.pi / 2, 0, k)), material('noodle', 0xfde68a))
        finish(sphere(0.12, seg=10, rings=8, pos=(x + 0.17, 2.47 + 0.35, bz), scale=(1, 0.5, 1)), material('egg', 0xfff7d6))
        finish(sphere(0.06, seg=8, rings=6, pos=(x + 0.17, 2.47 + 0.38, bz)), material('yolk', 0xf59e0b))
        finish(cyl(0.14, 0.14, 0.04, seg=12, pos=(x - 0.15, 2.47 + 0.34, bz + 0.12), rot=(0.2, 0, 0)), material('chashu', 0xc2703d))
        finish(box(0.22, 0.26, 0.015, pos=(x - 0.2, 2.47 + 0.4, bz - 0.2), rot=(-0.3, 0.4, 0)), material('nori', 0x1f3a2a))
        for k in range(5):
            finish(cyl(0.025, 0.025, 0.02, seg=6, pos=(x + random.uniform(-0.2, 0.2), 2.47 + 0.335, bz + random.uniform(-0.2, 0.2))), material('negi', 0x65a30d))
        finish(box(0.03, 0.03, 0.7, pos=(x + 0.35, 2.5, bz + 0.15), rot=(0, 0.3, 0)), wood_lt, smooth=False)
        finish(box(0.03, 0.03, 0.7, pos=(x + 0.4, 2.5, bz + 0.15), rot=(0, 0.3, 0)), wood_lt, smooth=False)
    for k, (x, col) in enumerate([(-3.7, 0x7f1d1d), (-3.5, 0xfde047), (3.6, 0x1f2937)]):
        finish(cyl(0.09, 0.1, 0.32, seg=10, pos=(x, 2.6, 0.9)), material('bottle_%d' % k, col), ol=True, ol_t=0.02)
        finish(cyl(0.05, 0.05, 0.08, seg=8, pos=(x, 2.8, 0.9)), white)
    finish(cyl(0.16, 0.16, 0.4, seg=12, pos=(3.3, 2.65, 1.0)), wood, ol=True, ol_t=0.02)
    for k in range(6):
        finish(box(0.03, 0.55, 0.03, pos=(3.3 + random.uniform(-0.08, 0.08), 2.9, 1.0 + random.uniform(-0.08, 0.08)), rot=(random.uniform(-0.1, 0.1), 0, random.uniform(-0.1, 0.1))), wood_lt, smooth=False)
    # 뒷벽 메뉴 나무패 (기둥 사이 들보에 매달림)
    for k in range(6):
        x = -2.9 + k * 1.16
        finish(box(0.8, 1.0, 0.06, pos=(x, 5.9, -1.38)), wood_lt, bevel=0.02, smooth=False, jitter=0.05, ol=True, ol_t=0.015)
        for l in range(3):
            finish(box(0.5, 0.06, 0.01, pos=(x, 6.15 - l * 0.22, -1.34)), dark, smooth=False)

    # ------------------------------------------------------------------
    # 육수 냄비 (원래 (-2.6, 2.95, -0.6)) + 국자
    # ------------------------------------------------------------------
    px, py, pz = -2.6, 2.95, -0.6
    finish(cyl(0.75, 0.7, 1.0, seg=24, pos=(px, py, pz)), steel, ol=True, ol_t=0.03)
    finish(torus(0.75, 0.06, seg=24, rseg=6, pos=(px, py + 0.5, pz), rot=(math.pi / 2, 0, 0)), material('rim', 0x6b7280))
    for s in (-1, 1):
        finish(torus(0.16, 0.04, seg=10, rseg=4, arc=math.pi, pos=(px + s * 0.78, py + 0.25, pz), rot=(0, math.pi / 2, 0)), iron)
    finish(cyl(0.7, 0.7, 0.03, seg=24, pos=(px, py + 0.46, pz)), material('broth', 0xe0a458))
    finish(cyl(0.04, 0.04, 1.2, seg=6, pos=(px + 0.3, py + 0.85, pz + 0.1), rot=(0.3, 0, -0.4)), wood_lt)
    # 두 번째 작은 냄비 + 화구
    finish(cyl(0.45, 0.42, 0.6, seg=20, pos=(-1.0, 2.75, -0.8)), steel, ol=True, ol_t=0.025)
    finish(cyl(0.5, 0.5, 0.06, seg=20, pos=(-1.0, 3.07, -0.8)), material('lid', 0x6b7280))
    finish(sphere(0.07, seg=8, rings=6, pos=(-1.0, 3.14, -0.8)), iron)

    # ------------------------------------------------------------------
    # 갑옷씨 (주인장) — 원래 (0, 1.2, -0.7)
    # ------------------------------------------------------------------
    ax, ay, az = 0, 1.2, -0.7
    finish(lathe([(0, 0), (1.15, 0), (1.12, 0.6), (1.05, 1.4), (1.0, 2.2), (0, 2.2)], seg=24, pos=(ax, ay, az)), metal, ol=True, ol_t=0.04)
    for y in (0.5, 1.2, 1.9):
        finish(torus(1.1 - y * 0.05, 0.04, seg=28, rseg=4, pos=(ax, ay + y, az), rot=(math.pi / 2, 0, 0)), material('plate_line', 0x8b97a8))
    finish(lathe([(1.2, 0.1), (1.16, 0.9), (1.08, 1.5), (1.1, 1.5), (1.18, 0.9), (1.22, 0.1), (1.2, 0.1)], seg=10, phi0=-0.9, phi=1.8, pos=(ax, ay, az)), white)
    finish(sphere(0.95, seg=24, rings=18, pos=(ax, ay + 2.75, az)), metal, ol=True, ol_t=0.04)
    finish(box(1.2, 0.14, 0.2, pos=(ax, ay + 2.8, az + 0.88)), dark, bevel=0.04)
    finish(cyl(0.0, 0.18, 0.6, seg=8, pos=(ax, ay + 3.8, az)), red)
    finish(torus(0.95, 0.1, seg=28, rseg=6, pos=(ax, ay + 3.2, az), rot=(math.pi / 2, 0, 0)), white)
    finish(sphere(0.12, seg=8, rings=6, pos=(ax + 0.85, ay + 3.25, az + 0.35)), white)
    for s in (-1, 1):  # 어깨 + 팔
        finish(sphere(0.42, seg=14, rings=10, pos=(ax + s * 1.1, ay + 1.95, az), scale=(1, 0.8, 1)), metal)
        finish(cyl(0.22, 0.26, 1.0, seg=12, pos=(ax + s * 1.25, ay + 1.35, az + 0.25), rot=(0.4, 0, s * 0.25)), metal)

    # ------------------------------------------------------------------
    # 의자 4개 (원래 (x, 1.3, 3.25))
    # ------------------------------------------------------------------
    for x in (-2.7, -0.9, 0.9, 2.7):
        finish(cyl(0.55, 0.5, 0.22, seg=20, pos=(x, 1.3, 3.25)), red, bevel=0.06, ol=True, ol_t=0.03)
        finish(cyl(0.5, 0.5, 0.04, seg=20, pos=(x, 1.43, 3.25)), material('cushion', 0xf87171))
        for k in range(3):
            a = TAU * k / 3
            finish(cyl(0.05, 0.06, 1.2, seg=6, pos=(x + math.cos(a) * 0.3, 0.6, 3.25 + math.sin(a) * 0.3), rot=(math.sin(a) * 0.12, 0, -math.cos(a) * 0.12)), wood_dk)
        finish(torus(0.3, 0.03, seg=16, rseg=4, pos=(x, 0.45, 3.25), rot=(math.pi / 2, 0, 0)), wood_dk)

    # ------------------------------------------------------------------
    # 옆 소품: 나무통 (-5.0, -0.6), 상자 2개 (5.0, -0.9), 메뉴판 (4.9, 0.95, 2.6)
    # ------------------------------------------------------------------
    barrel_model(-5.0, -0.6, wood, iron, h=1.3, r=0.62)
    crate_model(5.0, 0, -0.9, 1.0, 0.3, wood_lt, wood_dk)
    crate_model(5.0, 1.0, -0.9, 0.7, -0.2, wood_lt, wood_dk)
    mrot = (-0.15, -0.3, 0)
    finish(box(1.1, 1.5, 0.1, pos=(4.9, 0.95, 2.6), rot=mrot), dark, bevel=0.03, smooth=False, ol=True, ol_t=0.03)
    finish(box(1.25, 0.1, 0.14, pos=lpos((4.9, 0.95, 2.6), mrot, (0, 0.78, 0)), rot=mrot), wood, smooth=False)
    finish(box(1.25, 0.1, 0.14, pos=lpos((4.9, 0.95, 2.6), mrot, (0, -0.78, 0)), rot=mrot), wood, smooth=False)
    for l in range(4):
        finish(box(0.7 - l * 0.08, 0.05, 0.01, pos=lpos((4.9, 0.95, 2.6), mrot, (0, 0.45 - l * 0.28, 0.06)), rot=mrot), material('chalk', 0xf8fafc), smooth=False)
    finish(sphere(0.12, seg=8, rings=6, pos=lpos((4.9, 0.95, 2.6), mrot, (0.35, -0.5, 0.07))), material('chalk_y', 0xfde047))
