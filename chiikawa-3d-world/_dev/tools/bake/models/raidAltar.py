# 🐉 레이드 입장 제단 — 원래 배치(town_hq.js raidAltar())와 같은 크기·위치
# 게임 부품(그대로 사용): 보라 룬 원판(회전), 입장 존 링, 떠다니는 수정 8개 + 빛, 석판의 🐉 문양
import math, random
from lib import *


def build():
    random.seed(79)
    stone = material('stone', 0xd8d2c4, 'stone', 1.6, 0.18)
    stone_dk = material('stone_dk', 0xb7ad9c, 'stone', 1.6, 0.2)
    dark = material('dark', 0x4c3a63, 'stone', 1.4, 0.18)
    dark2 = material('dark2', 0x3b2d50, 'stone', 1.4, 0.18)
    gold = material('gold', 0xd4a017)
    lilac = material('lilac', 0xa78bfa)
    moss = material('moss', 0x6fa04f, 'plaster', 3.0, 0.2)

    # ------------------------------------------------------------------
    # 2단 팔각 단 (원래 CylinderGeometry(7.0, 7.3, 0.35, 8) y0.17 / (5.8, 6.1, 0.35, 8) y0.52)
    # ------------------------------------------------------------------
    finish(cyl(7.0, 7.3, 0.35, seg=8, pos=(0, 0.175, 0)), stone_dk, bevel=0.04, smooth=False, ol=True, ol_t=0.015)
    for i in range(8):  # 아래 단 윗면 판석 (변마다 4장)
        for k in range(4):
            a0 = TAU * i / 8 + TAU / 8 * k / 4
            finish(lathe([(6.05, 0.345), (6.95, 0.345), (6.95, 0.37), (6.05, 0.37), (6.05, 0.345)], seg=1, phi0=a0 + 0.005, phi=TAU / 32 - 0.01), stone, smooth=False, jitter=0.06)
    finish(cyl(5.8, 6.1, 0.35, seg=8, pos=(0, 0.52, 0)), dark, bevel=0.04, smooth=False, ol=True, ol_t=0.015)
    # 윗단 금 테두리 (룬 원판 r4.6 바깥, y0.695 아래 살짝 위)
    finish(torus(5.2, 0.05, seg=64, rseg=4, pos=(0, 0.7, 0), rot=(math.pi / 2, 0, 0)), gold)
    for i in range(8):  # 금 별 장식 (팔각 모서리)
        a = TAU * i / 8
        finish(cyl(0.16, 0.16, 0.03, seg=4, pos=(math.sin(a) * 5.45, 0.705, math.cos(a) * 5.45), rot=(0, a, 0)), gold)
    # 계단 4방향 (아래단 → 윗단)
    for i in range(4):
        a = TAU * i / 4 + math.pi / 8 * 0
        d = (math.sin(a), math.cos(a))
        if i == 2:
            continue  # 석판 쪽(-z)은 비움
        finish(box(2.2, 0.2, 0.5, pos=(d[0] * 6.25, 0.44, d[1] * 6.25), rot=(0, a, 0)), dark2, bevel=0.03, smooth=False)
        finish(box(2.4, 0.18, 0.55, pos=(d[0] * 7.45, 0.09, d[1] * 7.45), rot=(0, a, 0)), stone_dk, bevel=0.03, smooth=False)
    # 이끼 조금
    for k in range(10):
        a = random.uniform(0, TAU)
        finish(sphere(0.28, seg=8, rings=5, pos=(math.cos(a) * 7.15, 0.3, math.sin(a) * 7.15), scale=(1.2, 0.3, 0.6), rot=(0, -a, 0)), moss)

    # ------------------------------------------------------------------
    # 오벨리스크 8개 (원래 반지름 8.6, a = i/8*2π + π/8; 몸통 r0.35~0.6 h4.2 4각 ry π/4) — 수정은 게임 부품(y4.9)
    # ------------------------------------------------------------------
    for i in range(8):
        a = (i / 8) * TAU + math.pi / 8
        x, z = math.cos(a) * 8.6, math.sin(a) * 8.6
        finish(box(1.5, 0.3, 1.5, pos=(x, 0.15, z), rot=(0, math.pi / 4 + 0.0, 0)), stone_dk, bevel=0.04, smooth=False, ol=True, ol_t=0.02)
        finish(box(1.15, 0.2, 1.15, pos=(x, 0.4, z), rot=(0, math.pi / 4, 0)), stone, bevel=0.03, smooth=False)
        finish(cyl(0.35, 0.6, 4.2, seg=4, pos=(x, 2.1, z), rot=(0, math.pi / 4, 0)), dark, bevel=0.03, smooth=False, ol=True, ol_t=0.04)
        for y in (1.2, 2.6):  # 금 띠
            r = 0.6 - 0.25 * y / 4.2 + 0.03
            finish(cyl(r, r + 0.02, 0.12, seg=4, pos=(x, y, z), rot=(0, math.pi / 4, 0)), gold, smooth=False)
        # 앞면 룬 홈 (보라)
        fa = math.atan2(-x, -z)
        for k in range(3):
            y = 1.6 + k * 0.32
            r = 0.6 - 0.25 * y / 4.2
            finish(box(0.22 - k * 0.04, 0.06, 0.03, pos=(x - math.sin(fa) * 0.0 + math.sin(fa) * r * 0.72, y, z + math.cos(fa) * r * 0.72), rot=(0, fa, 0)), lilac, smooth=False)
        # 꼭대기 받침 + 금 발톱 (수정 y4.9 를 받침)
        finish(cyl(0.42, 0.32, 0.18, seg=8, pos=(x, 4.27, z)), gold, ol=True, ol_t=0.02)
        for k in range(4):
            b = TAU * k / 4 + math.pi / 4
            finish(box(0.08, 0.45, 0.08, pos=(x + math.cos(b) * 0.33, 4.5, z + math.sin(b) * 0.33), rot=(math.sin(b) * 0.35, 0, -math.cos(b) * 0.35)), gold, smooth=False)

    # ------------------------------------------------------------------
    # 아노코 문양 석판 (원래 roundBox(2.4, 3.0, 0.5) at (0, 2.2, -3.2)) — 🐉 문양 판(z -2.94)은 게임 부품
    # ------------------------------------------------------------------
    finish(box(2.4, 3.0, 0.5, pos=(0, 2.2, -3.2)), dark, bevel=0.1, seg=2, smooth=False, ol=True, ol_t=0.04)
    finish(box(2.6, 0.5, 0.7, pos=(0, 0.95, -3.2)), dark2, bevel=0.05, seg=1, smooth=False)
    # 문양 둘레 금 테 (문양 1.8×1.8 at y2.3 바깥)
    for (w_, h_, x, y) in ((2.0, 0.08, 0, 3.24), (2.0, 0.08, 0, 1.36), (0.08, 1.96, -0.96, 2.3), (0.08, 1.96, 0.96, 2.3)):
        finish(box(w_, h_, 0.04, pos=(x, y, -2.94)), gold, smooth=False)
    # 아치 모양 꼭대기 장식 + 양옆 뿔
    finish(lathe([(0, 0), (0.5, 0), (0.35, 0.35), (0, 0.5)], seg=8, pos=(0, 3.68, -3.2)), dark2, smooth=False, ol=True, ol_t=0.03)
    finish(sphere(0.16, seg=10, rings=8, pos=(0, 4.25, -3.2)), gold)
    for s in (-1, 1):
        finish(cyl(0.0, 0.18, 0.8, seg=8, pos=(s * 1.25, 3.85, -3.2), rot=(0, 0, -s * 0.5)), gold, ol=True, ol_t=0.02)
