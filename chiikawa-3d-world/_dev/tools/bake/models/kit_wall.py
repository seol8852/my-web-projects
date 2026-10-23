# 🧱 전투 스테이지 성벽 한 칸 (길이 6.5, 높이 4.2, 두께 1.6) — 게임에서 벽 따라 이어 붙임 (안쪽 = -x, 바깥 = +x)
# 색은 회색 계열로 굽고 게임에서 스테이지 테마 색을 곱함 → 들판(모래색)·협곡(붉은)·유적(청록 회색)·심연(보라)…
import math, random
from lib import *

L = 6.5


def block_rows(face_x, sign, rows, y0, y1, mats, depth=0.12, seed=0):
    """벽 한 면에 엇갈린 돌 블록 줄 (face_x: 면 위치, sign: 바깥쪽 방향 -1/+1)"""
    rnd = random.Random(seed)
    rh = (y1 - y0) / rows
    for r in range(rows):
        z = -L / 2 + (rnd.uniform(0.2, 0.7) if r % 2 else 0.0)
        while z < L / 2 - 0.05:
            bl = rnd.uniform(0.8, 1.45)
            z1 = min(L / 2, z + bl)
            if z1 - z > 0.15:
                cz = (z + z1) / 2
                d = depth * rnd.uniform(0.7, 1.3)
                finish(box(d, rh - 0.07, z1 - z - 0.07, pos=(face_x + sign * d / 2, y0 + rh * (r + 0.5), cz),
                           rot=(rnd.uniform(-0.01, 0.01), 0, rnd.uniform(-0.01, 0.01))),
                       mats[rnd.randrange(len(mats))], bevel=0.035, seg=1, smooth=False, jitter=0.07)
            z = z1


def build():
    random.seed(7)
    stone = material('stone', 0xeeeae2, 'stone', 1.6, 0.12)
    stone2 = material('stone2', 0xe2ddd3, 'stone', 1.6, 0.14)
    stone3 = material('stone3', 0xd6d0c4, 'stone', 1.6, 0.14)
    mortar = material('mortar', 0x9a958c)
    cap_m = material('cap', 0xd2ccc0, 'stone', 1.2, 0.12)
    S = [stone, stone2, stone3]

    # 속 (줄눈 색) — 안쪽 면 x=-0.8, 바깥 면 x=+0.8
    finish(box(1.5, 4.2, L, pos=(0, 2.1, 0)), mortar, smooth=False)
    block_rows(-0.75, -1, 7, 0.0, 4.2, S, seed=11)
    block_rows(0.75, 1, 6, 0.0, 4.2, S, depth=0.08, seed=12)
    # 안쪽 아래 받침돌 (발치 그림자 + 무게감)
    for k in range(5):
        z = -L / 2 + L * (k + 0.5) / 5
        finish(box(0.3, 0.45, L / 5 - 0.06, pos=(-0.98, 0.22, z)), S[k % 3], bevel=0.05, seg=1, smooth=False, jitter=0.06)
    # 갓돌 (원래 2.2 × 0.35 at y4.35) — 4장 이어 붙임, 끝이 살짝 튀어나옴
    for k in range(4):
        z = -L / 2 + L * (k + 0.5) / 4
        finish(box(2.2, 0.35, L / 4 - 0.05, pos=(0, 4.35, z)), cap_m, bevel=0.05, seg=1, smooth=False, jitter=0.05)
    # 갓돌 아래 돌출 띠 (안쪽)
    finish(box(0.2, 0.18, L, pos=(-0.9, 4.08, 0)), cap_m, bevel=0.03, seg=1, smooth=False)
    # 성가퀴 3개 (원래 1.1 × 0.9 × 1.9, 2.4 간격, 바깥쪽 +0.25) — 위가 둥글게 깎인 돌
    for k in range(3):
        z = -L / 3 + k * L / 3
        finish(box(1.1, 0.8, 1.75, pos=(0.25, 4.92, z)), stone2, bevel=0.06, seg=2, smooth=False, jitter=0.06)
        finish(box(1.2, 0.14, 1.85, pos=(0.25, 5.38, z)), cap_m, bevel=0.04, seg=1, smooth=False)
        # 활 쏘는 틈 (안쪽에서 보이는 홈)
        finish(box(0.06, 0.4, 0.14, pos=(-0.31, 4.92, z)), mortar, smooth=False)
