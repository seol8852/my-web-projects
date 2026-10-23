# 🔮 전투 스테이지 성소 오벨리스크 (원래 CylinderGeometry(0.45, 0.9, 6.5, 4) ry π/4, 색 0x3b3550) — 수정(y7.6)은 게임 부품
import math, random
from lib import *


def build():
    random.seed(17)
    dark = material('dark', 0x3b3550, 'stone', 1.4, 0.12)
    dark2 = material('dark2', 0x2e2840, 'stone', 1.4, 0.12)
    stone = material('stone', 0xcfc8b8, 'stone', 1.6, 0.16)
    gold = material('gold', 0xd4a017)
    lilac = material('lilac', 0xa78bfa)
    finish(box(2.6, 0.4, 2.6, pos=(0, 0.2, 0)), stone, bevel=0.05, seg=1, smooth=False, ol=True, ol_t=0.03)
    finish(box(2.0, 0.35, 2.0, pos=(0, 0.57, 0)), stone, bevel=0.04, seg=1, smooth=False)
    finish(cyl(0.45, 0.9, 6.5, seg=4, pos=(0, 3.25, 0), rot=(0, math.pi / 4, 0)), dark, bevel=0.04, smooth=False, ol=True, ol_t=0.04)
    for y in (1.6, 3.4, 5.2):  # 금 띠
        r = 0.9 - 0.45 * y / 6.5 + 0.04
        finish(cyl(r, r + 0.02, 0.16, seg=4, pos=(0, y, 0), rot=(0, math.pi / 4, 0)), gold, smooth=False)
    for k in range(4):  # 네 면 룬 홈
        a = k * math.pi / 2
        for j in range(3):
            y = 2.1 + j * 0.42
            r = 0.9 - 0.45 * y / 6.5
            finish(box(0.32 - j * 0.06, 0.08, 0.04, pos=(math.sin(a) * r * 0.71, y, math.cos(a) * r * 0.71), rot=(0, a, 0)), lilac, smooth=False)
    # 꼭대기 받침 + 금 발톱 (수정 y7.6, 높이 ±1.1)
    finish(cyl(0.55, 0.42, 0.22, seg=8, pos=(0, 6.55, 0)), gold, ol=True, ol_t=0.02)
    for k in range(4):
        a = TAU * k / 4
        finish(box(0.1, 0.6, 0.1, pos=(math.sin(a) * 0.45, 6.9, math.cos(a) * 0.45), rot=(math.cos(a) * 0.4, 0, -math.sin(a) * 0.4)), gold, smooth=False)
