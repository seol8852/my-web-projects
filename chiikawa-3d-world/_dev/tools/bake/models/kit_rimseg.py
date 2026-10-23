# 🧱 레이드 투기장 바닥 테두리 한 조각 (원 둘레 1/24, 반지름 53.9~56.2) — 게임에서 24번 돌려 붙임
#    원래: 테두리 원통 r55.2~56.2 h1.4 (y -1.25~0.15) + 윗면 고리 r53.9~55.25 y0.12
import math, random
from lib import *

N = 24
SPAN = TAU / N


def build():
    random.seed(37)
    d1 = material('rim1', 0x3b3340, 'stone', 1.4, 0.14)
    d2 = material('rim2', 0x2f2836, 'stone', 1.4, 0.14)
    d3 = material('rim3', 0x463c4d, 'stone', 1.4, 0.14)
    rune = material('rune', 0x9d7bff)
    a0 = -SPAN / 2
    # 바깥으로 내려가는 경사면 (아래는 땅 속)
    finish(lathe([(55.2, 0.14), (56.6, -0.6), (57.6, -1.4), (55.2, -1.4), (55.2, 0.14)], seg=6, phi0=a0, phi=SPAN), d2, smooth=False)
    # 윗면 돌 블록 2줄 (안쪽 줄 / 바깥 줄 엇갈림)
    for row, (r0, r1, nb, off) in enumerate([(53.9, 54.6, 6, 0.0), (54.62, 55.35, 5, 0.5)]):
        for i in range(nb):
            b0 = a0 + SPAN * (i + off) / nb
            b1 = min(a0 + SPAN, b0 + SPAN / nb) - 0.002
            if b0 >= a0 + SPAN - 0.003:
                continue
            h = 0.16 + random.uniform(-0.02, 0.03)
            finish(lathe([(r0 + 0.03, -0.1), (r1 - 0.03, -0.1), (r1 - 0.03, h), (r0 + 0.03, h), (r0 + 0.03, -0.1)], seg=2, phi0=b0 + 0.001, phi=b1 - b0 - 0.002),
                   [d1, d3][(i + row) % 2], smooth=False, jitter=0.07)
        if row == 1 and off:
            b1 = a0 + SPAN * 0.5 / nb
            finish(lathe([(r0 + 0.03, -0.1), (r1 - 0.03, -0.1), (r1 - 0.03, 0.17), (r0 + 0.03, 0.17), (r0 + 0.03, -0.1)], seg=2, phi0=a0 + 0.001, phi=b1 - a0 - 0.002), d1, smooth=False, jitter=0.07)
    # 바깥 테두리 낮은 난간돌 + 조각마다 작은 기둥 1개 (룬 박힘)
    finish(lathe([(55.3, 0.1), (55.8, 0.1), (55.8, 0.55), (55.3, 0.55), (55.3, 0.1)], seg=6, phi0=a0 + 0.004, phi=SPAN - 0.008), d2, bevel=0.03, smooth=False, ol=True, ol_t=0.03)
    px, pz = math.sin(0) * 55.55, math.cos(0) * 55.55
    finish(box(0.9, 1.6, 0.9, pos=(px, 0.85, pz)), d1, bevel=0.06, seg=1, smooth=False, ol=True, ol_t=0.03)
    finish(cyl(0.0, 0.62, 0.7, seg=4, pos=(px, 2.0, pz), rot=(0, math.pi / 4, 0)), d3, bevel=0.03, smooth=False)
    finish(box(0.4, 0.08, 0.04, pos=(px, 1.0, pz - 0.47)), rune, smooth=False)
    finish(box(0.08, 0.5, 0.04, pos=(px, 1.0, pz - 0.47)), rune, smooth=False)
