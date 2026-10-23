# ⛩️ 전투 스테이지 구역 관문 (원래 기둥 2.6×13×2.6 at x ±18.4, 갓 3.4×0.8 at y13.3, 상인방 40×2×2.8 at y14.4,
#    마름모 쐐기돌 3.2 at y14.6 깊이 3.0) — 룬 문장(쐐기돌 앞뒤 z ±1.55)은 게임 부품
import math, random
from lib import *


def build():
    random.seed(13)
    stone = material('stone', 0xeeeae2, 'stone', 1.6, 0.12)
    stone2 = material('stone2', 0xe2ddd3, 'stone', 1.6, 0.14)
    stone3 = material('stone3', 0xd6d0c4, 'stone', 1.6, 0.14)
    mortar = material('mortar', 0x9a958c)
    cap_m = material('cap', 0xc9c2b4, 'stone', 1.2, 0.12)
    dark = material('dark', 0xb0a99b, 'stone', 1.2, 0.12)
    S = [stone, stone2, stone3]

    for s in (-1, 1):
        x = s * 18.4
        finish(box(2.5, 13, 2.5, pos=(x, 6.5, 0)), mortar, smooth=False)
        for r in range(13):  # 기둥 돌 (줄마다 큰 돌 한 장 + 엇갈린 반쪽)
            y0 = r * 1.0; y1 = y0 + 0.94
            w = 2.62 + (0.06 if r % 2 else 0.0)
            finish(box(w, y1 - y0, w, pos=(x, (y0 + y1) / 2, 0), rot=(0, 0.01 * (r % 3 - 1), 0)), S[r % 3], bevel=0.06, seg=1, smooth=False, jitter=0.06)
        finish(box(3.4, 0.9, 3.4, pos=(x, 0.45, 0)), cap_m, bevel=0.07, seg=2, smooth=False)       # 받침
        finish(box(3.0, 0.4, 3.0, pos=(x, 1.1, 0)), dark, bevel=0.05, seg=1, smooth=False)
        finish(box(3.4, 0.8, 3.4, pos=(x, 13.3, 0)), cap_m, bevel=0.07, seg=2, smooth=False)      # 원래 갓
        finish(box(3.0, 0.35, 3.0, pos=(x, 12.75, 0)), dark, bevel=0.04, seg=1, smooth=False)
        for z in (-1.32, 1.32):  # 기둥 앞뒤 세로 홈
            for xx in (-0.6, 0.6):
                finish(box(0.14, 9.5, 0.06, pos=(x + xx, 6.6, z)), mortar, smooth=False)
    # 상인방 (원래 40×2×2.8 at y14.4) — 아치돌 블록 줄 + 위아래 테
    finish(box(39.6, 1.9, 2.7, pos=(0, 14.4, 0)), mortar, smooth=False)
    n = 22
    for i in range(n):
        x0 = -20 + 40 * i / n; x1 = -20 + 40 * (i + 1) / n
        finish(box(x1 - x0 - 0.07, 1.7, 2.82, pos=((x0 + x1) / 2, 14.4, 0)), S[i % 3], bevel=0.05, seg=1, smooth=False, jitter=0.06)
    finish(box(40.6, 0.3, 3.1, pos=(0, 15.45, 0)), cap_m, bevel=0.04, seg=1, smooth=False)
    finish(box(40.2, 0.25, 3.0, pos=(0, 13.4, 0)), dark, bevel=0.03, seg=1, smooth=False)
    # 쐐기돌 (원래 3.2 마름모, 깊이 3.0) + 테두리
    finish(box(3.2, 3.2, 3.0, pos=(0, 14.6, 0), rot=(0, 0, math.pi / 4)), cap_m, bevel=0.1, seg=2, smooth=False)
    finish(box(3.6, 3.6, 2.6, pos=(0, 14.6, 0), rot=(0, 0, math.pi / 4)), dark, bevel=0.06, seg=1, smooth=False)
    for s in (-1, 1):  # 쐐기돌 양옆 소용돌이 장식
        finish(torus(0.45, 0.12, seg=16, rseg=6, arc=math.pi * 1.5, pos=(s * 3.0, 14.6, 1.42)), cap_m)
        finish(torus(0.45, 0.12, seg=16, rseg=6, arc=math.pi * 1.5, pos=(s * 3.0, 14.6, -1.42)), cap_m)
