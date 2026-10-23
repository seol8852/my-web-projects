# 🗼 전투 스테이지 망루 (원래 CylinderGeometry(1.25, 1.55, 7.5) + 화로 그릇 y7.5) — 불꽃·빛은 게임 부품(y9.4)
import math, random
from lib import *


def build():
    random.seed(9)
    stone = material('stone', 0xeeeae2, 'stone', 1.6, 0.12)
    stone2 = material('stone2', 0xe2ddd3, 'stone', 1.6, 0.14)
    stone3 = material('stone3', 0xd6d0c4, 'stone', 1.6, 0.14)
    mortar = material('mortar', 0x9a958c)
    cap_m = material('cap', 0xd2ccc0, 'stone', 1.2, 0.12)
    iron = material('iron', 0x6a6478)
    S = [stone, stone2, stone3]

    H = 7.5
    rad = lambda y: 1.55 - 0.3 * y / H
    finish(cyl(1.25, 1.55, H, seg=16, pos=(0, H / 2, 0)), mortar, smooth=True)
    rows = 11
    for r in range(rows):  # 돌 줄 (줄마다 엇갈린 둥근 블록)
        y0 = H * r / rows; y1 = H * (r + 1) / rows - 0.06
        n = 9
        off = 0.5 * (r % 2)
        for i in range(n):
            a0 = TAU * (i + off) / n + 0.02
            r0 = rad((y0 + y1) / 2)
            finish(lathe([(r0 - 0.02, y0), (r0 + 0.07, y0), (r0 + 0.07, y1), (r0 - 0.02, y1), (r0 - 0.02, y0)], seg=3, phi0=a0, phi=TAU / n - 0.04),
                   S[(i + r) % 3], smooth=False, jitter=0.07)
    # 받침 (넓은 돌 고리)
    finish(cyl(1.8, 1.95, 0.45, seg=16, pos=(0, 0.22, 0)), cap_m, bevel=0.05, smooth=False)
    # 위 돌출 테 + 까치발 돌 (처마 받침)
    finish(cyl(1.55, 1.4, 0.3, seg=16, pos=(0, H - 0.35, 0)), cap_m, bevel=0.04, smooth=False)
    for k in range(10):
        a = TAU * k / 10
        finish(box(0.25, 0.4, 0.35, pos=(math.sin(a) * 1.35, H - 0.75, math.cos(a) * 1.35), rot=(0, a, 0)), stone3, bevel=0.03, seg=1, smooth=False)
    finish(cyl(1.6, 1.6, 0.2, seg=16, pos=(0, H - 0.1, 0)), cap_m, bevel=0.03, smooth=False)
    # 화살 틈 2개
    for a in (0.0, math.pi):
        finish(box(0.16, 0.9, 0.2, pos=(math.sin(a) * 1.42, 4.6, math.cos(a) * 1.42), rot=(0, a, 0)), mortar, smooth=False)
        finish(box(0.5, 0.12, 0.25, pos=(math.sin(a) * 1.44, 5.12, math.cos(a) * 1.44), rot=(0, a, 0)), cap_m, smooth=False)
    # 화로 그릇 (원래 Lathe [[0,0],[0.5,0],[1.1,0.5],[1.3,0.9],[1.15,0.95],[0.9,0.6],[0,0.6]] at y7.5)
    finish(lathe([(0, 0), (0.5, 0), (1.1, 0.5), (1.3, 0.9), (1.15, 0.95), (0.9, 0.6), (0, 0.6)], seg=20, pos=(0, H, 0)), iron)
    for k in range(4):
        a = TAU * k / 4 + math.pi / 4
        finish(box(0.12, 0.6, 0.12, pos=(math.sin(a) * 0.95, H + 0.4, math.cos(a) * 0.95), rot=(math.cos(a) * 0.5, 0, -math.sin(a) * 0.5)), iron, smooth=False)
    finish(torus(1.25, 0.06, seg=24, rseg=5, pos=(0, H + 0.92, 0), rot=(math.pi / 2, 0, 0)), iron)
    # 그릇 속 장작·숯
    for k in range(5):
        a = TAU * k / 5
        finish(cyl(0.08, 0.08, 1.0, seg=6, pos=(math.sin(a) * 0.3, H + 0.75, math.cos(a) * 0.3), rot=(0.6, a, 0), order='YXZ'), material('char', 0x3a2a22))
