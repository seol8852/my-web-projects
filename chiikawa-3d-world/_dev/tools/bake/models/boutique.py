# 🎀 포쉐트 의상실 부스 — 원래 배치(town_hq.js boutique())와 같은 크기
# 게임 부품(그대로 사용): 간판(글씨), 진열 모자 3개, 거울 유리
import math, random
from lib import *


def build():
    random.seed(41)
    pink = material('pink', 0xf472b6)
    pink_lt = material('pink_lt', 0xfbcfe8, 'wood', 2.0, 0.1)
    cream = material('cream', 0xfff1f7, 'wood', 2.0, 0.08)
    white = material('white', 0xffffff)
    top_m = material('top', 0xf9a8d4, 'wood', 2.0, 0.12)
    gold = material('gold', 0xfacc15)
    pole_y = material('pole', 0xfde68a)
    wood = material('wood', 0xc98b52, 'wood', 1.6, 0.2)
    lilac = material('lilac', 0xc084fc, 'plaster', 3.0, 0.08)
    skin = material('skin', 0xfecdd3)
    iron = material('iron', 0x3b3550)
    leaf = material('leaf', 0x6cbf4a, 'plaster', 4.0, 0.15)
    leaf_dk = material('leaf_dk', 0x4e9a33)
    center = material('center', 0xfacc15)

    # ------------------------------------------------------------------
    # 카운터 (원래 roundBox(5.4, 1.9, 2.4) 중심 y0.95) — 분홍·흰 판자 + 물결 치마 + 상판
    # ------------------------------------------------------------------
    finish(box(5.3, 1.8, 2.3, pos=(0, 0.95, 0)), pink_lt, smooth=False)
    for k in range(11):  # 앞면 세로 판자 (분홍/흰 번갈아)
        x = -2.5 + k * 0.5
        finish(box(0.46, 1.5, 0.08, pos=(x, 1.05, 1.17)), cream if k % 2 else pink_lt, bevel=0.02, seg=1, smooth=False, jitter=0.03)
    for side in (-1, 1):
        for k in range(5):
            z = -0.92 + k * 0.46
            finish(box(0.08, 1.5, 0.42, pos=(side * 2.67, 1.05, z)), cream if k % 2 else pink_lt, bevel=0.02, seg=1, smooth=False)
    finish(box(5.5, 0.16, 2.5, pos=(0, 0.12, 0)), pink, bevel=0.04, smooth=False, ol=True, ol_t=0.02)
    for k in range(14):  # 물결 치마
        finish(sphere(0.2, seg=10, rings=6, pos=(-2.6 + k * 0.4, 0.3, 1.24), scale=(1, 0.8, 0.4)), white)
    finish(box(5.8, 0.18, 2.8, pos=(0, 1.98, 0)), top_m, bevel=0.06, seg=2, smooth=False, ol=True, ol_t=0.02)
    finish(box(5.9, 0.06, 0.08, pos=(0, 1.88, 1.41)), gold, smooth=False)
    # 하트 장식 3개 (앞면)
    for x in (-1.6, 0, 1.6):
        for s in (-1, 1):
            finish(sphere(0.13, seg=10, rings=8, pos=(x + s * 0.09, 1.25, 1.23), scale=(1, 1, 0.5)), pink)
        finish(cyl(0.0, 0.17, 0.2, seg=4, pos=(x, 1.12, 1.23), rot=(0, math.pi / 4, math.pi)), pink)

    # ------------------------------------------------------------------
    # 기둥 4개 (사탕 줄무늬 + 공 장식) — 원래 (±2.5, 2.1, -0.9/1.0)
    # ------------------------------------------------------------------
    for x in (-2.5, 2.5):
        for z in (-0.9, 1.0):
            finish(cyl(0.13, 0.15, 4.2, seg=12, pos=(x, 2.1, z)), pole_y, ol=True, ol_t=0.04)
            for k in range(9):
                finish(torus(0.145, 0.03, seg=12, rseg=4, pos=(x, 0.4 + k * 0.45, z), rot=(math.pi / 2 - 0.25, 0, 0)), pink)
            finish(sphere(0.2, seg=12, rings=8, pos=(x, 4.3, z)), pink)

    # ------------------------------------------------------------------
    # 줄무늬 차양 (천 띠 + 주름 + 물결 끝단) — 원래 box(6.0, 0.12, 3.2) (0, 4.45, 0.15) 기울기 0.22
    # ------------------------------------------------------------------
    o = (0, 4.45, 0.15); rot = (0.22, 0, 0)
    for k in range(12):
        x = -2.75 + k * 0.5
        finish(box(0.5, 0.1, 3.2, pos=lpos(o, rot, (x, 0.02 * (k % 2), 0)), rot=rot), pink if k % 2 == 0 else white, bevel=0.02, seg=1, smooth=False, ol=(k == 0), ol_t=0.02)
    for i in range(12):
        finish(cyl(0.25, 0.25, 0.1, seg=14, pos=lpos(o, rot, (-2.75 + i * 0.5, -0.1, 1.62)), rot=(rot[0] + math.pi / 2, 0, 0)), white if i % 2 else pink)
    finish(box(6.1, 0.1, 0.12, pos=lpos(o, rot, (0, 0.05, -1.6)), rot=rot), gold, smooth=False)

    # ------------------------------------------------------------------
    # 모자 진열대 3개 (모자는 게임 부품) — 원래 (-1.6 + i*1.6, 2.32, 0.2)
    # ------------------------------------------------------------------
    for i in range(3):
        x = -1.6 + i * 1.6
        finish(lathe([(0, 0), (0.3, 0), (0.3, 0.05), (0.1, 0.1), (0.07, 0.45), (0.12, 0.5), (0, 0.5)], seg=16, pos=(x, 2.07, 0.2)), white, ol=True, ol_t=0.02)
    # 리본 실패·쇼핑백
    for k, (x, col) in enumerate([(-2.3, 0xf472b6), (-2.0, 0x93c5fd), (2.2, 0xfde047)]):
        finish(cyl(0.12, 0.12, 0.18, seg=12, pos=(x, 2.17, -0.8), rot=(math.pi / 2, 0, 0)), material('spool_%d' % k, col))
    finish(box(0.5, 0.6, 0.25, pos=(1.0, 2.37, -0.75)), material('bag', 0xfbcfe8), bevel=0.02, smooth=False, ol=True, ol_t=0.015)
    finish(torus(0.12, 0.02, seg=10, rseg=4, arc=math.pi, pos=(1.0, 2.67, -0.75)), pink)

    # ------------------------------------------------------------------
    # 마네킹 (원래 (3.6, 0, 0.6)) — 프릴 드레스 + 리본
    # ------------------------------------------------------------------
    mx, mz = 3.6, 0.6
    finish(cyl(0.45, 0.5, 0.08, seg=16, pos=(mx, 0.04, mz)), iron)
    finish(cyl(0.05, 0.05, 0.6, seg=8, pos=(mx, 0.35, mz)), iron)
    finish(lathe([(0, 0.4), (0.92, 0.4), (0.95, 0.45), (0.72, 0.8), (0.5, 1.25), (0.42, 1.55), (0, 1.55)], seg=28, pos=(mx, 0, mz)), lilac, ol=True, ol_t=0.04)
    for k in range(16):
        a = TAU * k / 16
        finish(sphere(0.14, seg=8, rings=6, pos=(mx + math.cos(a) * 0.9, 0.45, mz + math.sin(a) * 0.9), scale=(1, 0.6, 1)), white)
    finish(lathe([(0, 1.5), (0.5, 1.5), (0.45, 1.9), (0.36, 2.3), (0.4, 2.45), (0, 2.45)], seg=20, pos=(mx, 0, mz)), skin, ol=True, ol_t=0.04)
    finish(torus(0.48, 0.07, seg=20, rseg=6, pos=(mx, 1.55, mz), rot=(math.pi / 2, 0, 0)), pink)
    for s in (-1, 1):
        finish(sphere(0.18, seg=10, rings=8, pos=(mx + s * 0.22, 1.6, mz + 0.45), scale=(1.2, 0.8, 0.6)), pink)
    finish(cyl(0.06, 0.08, 0.25, seg=8, pos=(mx, 2.55, mz)), skin)
    finish(sphere(0.35, seg=16, rings=12, pos=(mx, 2.85, mz)), skin, ol=True, ol_t=0.03)

    # ------------------------------------------------------------------
    # 거울 (원래 (-3.6, 1.6, 0.4), 회전 0.5) — 장식 틀 + 받침다리 (유리는 게임 부품)
    # ------------------------------------------------------------------
    mo = (-3.6, 1.6, 0.4); mrot = (0, 0.5, 0)
    finish(torus(0.75, 0.11, seg=32, rseg=8, pos=mo, rot=mrot, scale=(1, 1.4, 1)), gold, ol=True, ol_t=0.03)
    for k in range(12):
        a = TAU * k / 12
        finish(sphere(0.07, seg=8, rings=6, pos=lpos(mo, mrot, (math.cos(a) * 0.86, math.sin(a) * 0.86 * 1.4, 0.05))), gold)
    finish(sphere(0.16, seg=10, rings=8, pos=lpos(mo, mrot, (0, 1.25, 0))), pink)
    for s in (-1, 1):
        finish(box(0.08, 1.7, 0.08, pos=lpos(mo, mrot, (s * 0.55, -0.75, -0.25)), rot=(0.18, mrot[1], s * 0.12)), gold, smooth=False)
    finish(box(0.08, 0.08, 1.1, pos=lpos(mo, mrot, (0, -1.0, -0.15)), rot=mrot), gold, smooth=False)

    # ------------------------------------------------------------------
    # 옷걸이 행거 (부스 뒤쪽) + 원피스 3벌
    # ------------------------------------------------------------------
    for x in (-1.6, 1.6):
        finish(cyl(0.05, 0.05, 2.2, seg=8, pos=(x, 1.1, -1.75)), gold)
        finish(cyl(0.3, 0.3, 0.05, seg=12, pos=(x, 0.03, -1.75)), gold)
    finish(cyl(0.04, 0.04, 3.3, seg=8, pos=(0, 2.15, -1.75), rot=(0, 0, math.pi / 2)), gold)
    for k, col in enumerate([0xf9a8d4, 0x93c5fd, 0xfde68a, 0xc4b5fd]):
        x = -1.2 + k * 0.8
        finish(torus(0.25, 0.02, seg=12, rseg=4, arc=math.pi, pos=(x, 1.95, -1.75), rot=(0, 0, 0)), iron)
        finish(lathe([(0, 1.95), (0.18, 1.95), (0.22, 1.6), (0.38, 1.0), (0, 1.0)], seg=16, pos=(x, 0, -1.75), scale=(1, 1, 0.5)), material('dress_%d' % k, col), jitter=0.03)

    # ------------------------------------------------------------------
    # 화분 (원래 pot (-3.2, 0, 1.9)) + 작은 러그
    # ------------------------------------------------------------------
    px, pz = -3.2, 1.9
    finish(cyl(0.42, 0.32, 0.6, seg=16, pos=(px, 0.3, pz)), material('pot', 0xf9a8d4, 'plaster', 3.0, 0.08), bevel=0.03, ol=True, ol_t=0.03)
    finish(torus(0.42, 0.06, seg=20, rseg=6, pos=(px, 0.6, pz), rot=(math.pi / 2, 0, 0)), material('pot_rim', 0xf472b6))
    finish(cyl(0.38, 0.38, 0.05, seg=16, pos=(px, 0.58, pz)), material('soil', 0x7a4a22))
    for k in range(5):
        finish(sphere(random.uniform(0.16, 0.22), seg=8, rings=6, pos=(px + random.uniform(-0.2, 0.2), 0.7, pz + random.uniform(-0.2, 0.2))), leaf, jitter=0.1)
    for k in range(5):
        flower(px + random.uniform(-0.22, 0.22), 0.6, pz + random.uniform(-0.22, 0.22), random.choice([0xff85a2, 0xffffff, 0xfde047]), (leaf_dk, center), size=1.2, stem=random.uniform(0.25, 0.4))
    finish(cyl(1.2, 1.2, 0.03, seg=28, pos=(0.2, 0.02, 2.4), scale=(1.6, 1, 0.6)), material('rug', 0xfce7f3))
    finish(torus(1.15, 0.04, seg=28, rseg=4, pos=(0.2, 0.04, 2.4), rot=(math.pi / 2, 0, 0), scale=(1.6, 0.6, 1)), pink)
