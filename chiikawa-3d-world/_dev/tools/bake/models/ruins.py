# 🏛️ 고대 유적 — 원래 배치(town_hq.js ruins())와 같은 크기
# 게임 부품(그대로 사용): 보라 룬 고리, 떠다니는 수정 + 빛 (온전한 기둥 위)
import math, random
from lib import *


def build():
    random.seed(91)
    stone = material('stone', 0xcfc8b8, 'stone', 1.8, 0.2)
    stone_dk = material('stone_dk', 0xa59d8d, 'stone', 2.2, 0.22)
    floor_m = material('floor', 0xd8d2c4, 'stone', 1.2, 0.15)
    moss = material('moss', 0x6fa04f, 'plaster', 3.0, 0.2)
    moss_dk = material('moss_dk', 0x4e7f3a)
    vine = material('vine', 0x5a9a45)
    purple = material('book', 0x7c3aed)
    gold = material('gold', 0xfacc15)
    leaf = material('leaf', 0x6cbf4a, 'plaster', 4.0, 0.15)

    # ------------------------------------------------------------------
    # 원형 바닥 (원래 CylinderGeometry(15, 16.5, 0.6)) — 판석 + 금 간 틈 + 이끼
    # ------------------------------------------------------------------
    finish(cyl(15.0, 16.5, 0.56, seg=64, pos=(0, 0.28, 0)), stone_dk, ol=True, ol_t=0.012)   # 룬 고리(y0.62, 게임 부품)보다 낮게
    # 동심원 판석 (3겹 링을 블록으로)
    rings = [(2.5, 8), (5.0, 16), (7.5, 24), (10.0, 32), (12.5, 40), (14.9, 48)]
    r0 = 0.0
    for (r1, n) in rings:
        for i in range(n):
            a0 = TAU * (i + 0.5 * (len(rings) % 2)) / n
            span = TAU / n * 0.97
            if random.random() < 0.06:
                continue  # 빠진 판석
            prof = [(r0 + 0.04, 0.56), (r1 - 0.04, 0.56), (r1 - 0.04, 0.6), (r0 + 0.04, 0.6), (r0 + 0.04, 0.56)]
            if r0 < 0.01:
                prof = [(0.0, 0.56), (r1 - 0.04, 0.56), (r1 - 0.04, 0.6), (0.0, 0.6), (0.0, 0.56)]
            tile = lathe(prof, seg=3, phi0=a0, phi=span)
            finish(tile, floor_m, smooth=False, jitter=0.06)
        r0 = r1
    # 바닥 이끼 얼룩
    for i in range(30):
        a = random.uniform(0, TAU); r = random.uniform(3, 14.5)
        finish(cyl(random.uniform(0.3, 0.8), random.uniform(0.3, 0.8), 0.04, seg=10, pos=(math.cos(a) * r, 0.605, math.sin(a) * r), scale=(1, 1, random.uniform(0.5, 1))), moss, jitter=0.1)

    # ------------------------------------------------------------------
    # 기둥 8개 (원래 반지름 13.5, i%3==1 은 부서진 기둥)
    # ------------------------------------------------------------------
    for i in range(8):
        a = (i / 8) * TAU
        cx, cz = math.cos(a) * 13.5, math.sin(a) * 13.5
        broken = i % 3 == 1
        h = 3.5 + (i % 2) if broken else 8.2
        # 받침 2단
        finish(box(2.4, 0.6, 2.4, pos=(cx, 0.9, cz), rot=(0, -a, 0)), stone, bevel=0.08, smooth=False, ol=True, ol_t=0.025)
        finish(box(2.0, 0.25, 2.0, pos=(cx, 1.32, cz), rot=(0, -a, 0)), stone, bevel=0.05, smooth=False)
        # 기둥: 돌 드럼을 쌓아 올림 (드럼마다 살짝 어긋남)
        nd = max(2, int(h / 1.4))
        dh = h / nd
        for k in range(nd):
            y = 1.45 + dh * (k + 0.5)
            rr = 0.95 - 0.1 * (y / 9.0)
            finish(cyl(rr - 0.02, rr, dh - 0.04, seg=16, pos=(cx + random.uniform(-0.03, 0.03), y, cz + random.uniform(-0.03, 0.03)), rot=(0, random.uniform(0, 1), 0)), stone, jitter=0.05, ol=(k == 0), ol_t=0.03)
        for k in range(10):  # 세로 홈
            fa = TAU * k / 10
            finish(box(0.1, h * 0.95, 0.1, pos=(cx + math.cos(fa) * 0.9, 1.45 + h / 2, cz + math.sin(fa) * 0.9), rot=(0, -fa, 0)), stone_dk, smooth=False)
        if not broken:
            finish(box(2.2, 0.55, 2.2, pos=(cx, 1.2 + h + 0.25, cz), rot=(0, -a, 0)), stone, bevel=0.08, smooth=False, ol=True, ol_t=0.03)
            finish(cyl(1.1, 0.9, 0.3, seg=16, pos=(cx, 1.2 + h - 0.1, cz)), stone)
            # 수정 받침대 (수정은 게임 부품)
            finish(lathe([(0, 0), (0.5, 0), (0.3, 0.15), (0.35, 0.3), (0, 0.3)], seg=12, pos=(cx, 1.2 + h + 0.52, cz)), gold)
        else:
            # 부서진 윗면 (울퉁불퉁) + 쓰러진 조각 (원래 col 기준 (2.2, 1.45, 1.2))
            for k in range(5):
                finish(rounded_pebble(0.3, seed=900 + i * 10 + k, pos=(cx + random.uniform(-0.5, 0.5), 1.45 + h + 0.05, cz + random.uniform(-0.5, 0.5)), scale=(1, 0.6, 1)), stone, jitter=0.06)
            px, pz = cx + 2.2, cz + 1.2
            ry = random.uniform(0, 3)
            finish(cyl(0.85, 0.85, 2.6, seg=16, pos=(px, 1.45, pz), rot=(0, ry, math.pi / 2)), stone, jitter=0.05, ol=True, ol_t=0.03)
            for k in range(3):
                finish(rounded_pebble(0.35, seed=950 + i * 10 + k, pos=(px + random.uniform(-1.6, 1.6), 0.85, pz + random.uniform(-1.4, 1.4)), scale=(1, 0.6, 1)), stone_dk, jitter=0.06)
        # 덩굴 (기둥을 감고 올라감)
        for k in range(14):
            t = k / 14
            va = a + t * 6.0
            y = 1.5 + t * min(h, 5.5)
            finish(sphere(random.uniform(0.15, 0.24), seg=6, rings=5, pos=(cx + math.cos(va) * 1.0, y, cz + math.sin(va) * 1.0), scale=(1, 0.7, 0.6)), vine, jitter=0.12)
        for k in range(6):
            aa = random.uniform(0, TAU)
            finish(sphere(random.uniform(0.25, 0.4), seg=8, rings=6, pos=(cx + math.cos(aa) * 1.35, 0.75, cz + math.sin(aa) * 1.35), scale=(1, 0.6, 1)), moss, jitter=0.1)

    # ------------------------------------------------------------------
    # 중앙 제단 (원래 roundBox(4.2, 1.2, 2.6) y1.2) + 책 + 촛대
    # ------------------------------------------------------------------
    finish(box(4.6, 0.25, 3.0, pos=(0, 0.72, 0)), stone_dk, bevel=0.05, smooth=False)
    finish(box(4.2, 1.0, 2.6, pos=(0, 1.3, 0)), stone, bevel=0.1, seg=2, smooth=False, ol=True, ol_t=0.03)
    finish(box(4.4, 0.18, 2.8, pos=(0, 1.88, 0)), stone, bevel=0.05, smooth=False)
    for s in (-1, 1):  # 옆면 조각 (원 문양)
        finish(torus(0.4, 0.06, seg=20, rseg=4, pos=(0, 1.3, s * 1.31)), stone_dk)
        finish(torus(0.4, 0.06, seg=20, rseg=4, pos=(s * 2.11, 1.3, 0), rot=(0, math.pi / 2, 0)), stone_dk)
    bo = (0, 1.99, 0); brot = (0, 0.3, 0)
    finish(box(1.0, 0.18, 0.75, pos=bo, rot=brot), purple, bevel=0.03, smooth=False, ol=True, ol_t=0.02)
    finish(box(0.92, 0.12, 0.68, pos=lpos(bo, brot, (0.04, 0.0, 0)), rot=brot), material('pages', 0xfff7e6), smooth=False)
    finish(box(0.1, 0.19, 0.76, pos=lpos(bo, brot, (-0.46, 0.0, 0)), rot=brot), gold, smooth=False)
    for x in (-1.6, 1.6):
        finish(lathe([(0, 0), (0.18, 0), (0.06, 0.1), (0.05, 0.45), (0.14, 0.5), (0, 0.5)], seg=10, pos=(x, 1.97, 0.6)), gold)
        finish(cyl(0.06, 0.06, 0.25, seg=8, pos=(x, 2.6, 0.6)), material('candle', 0xfff7e6))

    # ------------------------------------------------------------------
    # 덩굴 덤불 6개 (원래 bush(1.2), 반지름 9, y0.5)
    # ------------------------------------------------------------------
    for i in range(6):
        a = TAU * i / 6 + 0.4
        bx, bz = math.cos(a) * 9, math.sin(a) * 9
        for k in range(4):
            finish(sphere(1.2 * random.uniform(0.6, 0.9), seg=10, rings=8, pos=(bx + random.uniform(-0.6, 0.6), 0.9 + random.uniform(0, 0.3), bz + random.uniform(-0.6, 0.6)), scale=(1, 0.8, 1)), leaf if k % 2 else moss_dk, jitter=0.1, ol=(k == 0), ol_t=0.03)
