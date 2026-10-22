# ⛲ 광장 분수 — 원래 배치(town_hq.js fountain())와 같은 크기
# 게임 부품(그대로 사용): 물 3면(y 0.62 r3.72 / y 2.82 r1.72), 꼭대기 황금 별(y 4.85), 물방울 파티클
import math, random
from lib import *


def build():
    random.seed(21)
    stone = material('stone', 0xdcd3c2, 'stone', scale=2.2, amount=0.16)
    stone_lt = material('stone_lt', 0xebe4d6, 'stone', scale=2.5, amount=0.12)
    stone_dk = material('stone_dk', 0xc9c0ae, 'stone', scale=3.0, amount=0.15)
    tile_a = material('tile_a', 0x7cc4e4)
    tile_b = material('tile_b', 0xffffff)
    tile_c = material('tile_c', 0xf9a8c4)
    gold = material('gold', 0xf2c14e)
    leaf = material('leaf', 0x6cbf4a, 'plaster', 4.0, 0.15)
    leaf_dk = material('leaf_dk', 0x4e9a33)
    lily = material('lily', 0x5fae3e, 'plaster', 5.0, 0.1)
    soil = material('soil', 0x7a4a22)
    center = material('center', 0xfacc15)

    # ------------------------------------------------------------------
    # 바닥 계단 링 + 수반 벽(돌 블록) + 갓돌 + 타일 띠
    # ------------------------------------------------------------------
    finish(lathe([(0, 0.0), (4.95, 0.0), (5.0, 0.04), (5.0, 0.16), (4.95, 0.2), (0, 0.2)], seg=64), stone_dk, ol=True, ol_t=0.015)
    # 수반 바닥 (물 아래)
    finish(cyl(3.75, 3.75, 0.5, seg=48, pos=(0, 0.3, 0)), material('basin_in', 0x9fb7bd, 'stone', 2.0, 0.15))
    # 벽 블록 (2단, 엇갈려 쌓기)
    for row in range(2):
        n = 22
        for i in range(n):
            a0 = TAU * (i + 0.5 * row) / n
            span = TAU / n * 0.96
            blk = lathe([(3.78, 0.2 + row * 0.3), (4.42, 0.2 + row * 0.3), (4.42, 0.48 + row * 0.3), (3.78, 0.48 + row * 0.3), (3.78, 0.2 + row * 0.3)],
                        seg=4, phi0=a0, phi=span)
            finish(blk, stone, bevel=0.035, seg=2, smooth=False, jitter=0.06)
    # 타일 모자이크 띠 (바깥 벽면에 작은 사각 타일)
    for i in range(72):
        a = TAU * i / 72
        col = [tile_a, tile_b, tile_a, tile_c][i % 4]
        t = box(0.3, 0.16, 0.05, pos=(math.sin(a) * 4.44, 0.62, math.cos(a) * 4.44), rot=(0, a, 0))
        finish(t, col, bevel=0.01, seg=1, smooth=False)
    # 갓돌(둥근 테두리)
    cap = lathe([(3.66, 0.78), (3.7, 0.86), (3.85, 0.95), (4.25, 0.97), (4.5, 0.9), (4.56, 0.82), (4.5, 0.74), (3.66, 0.74), (3.66, 0.78)], seg=72)
    finish(cap, stone_lt, ol=True, ol_t=0.018)
    # 연잎 + 연꽃 (물 위)
    for k in range(6):
        a = TAU * k / 6 + random.uniform(-0.2, 0.2); rr = random.uniform(2.5, 3.2)
        r_ = random.uniform(0.32, 0.42)
        lp = cyl(r_, r_, 0.03, seg=14, pos=(math.sin(a) * rr, 0.645 + k * 0.002, math.cos(a) * rr))
        finish(lp, lily, jitter=0.08)
        if k % 2 == 0:
            for p in range(6):
                pa = TAU * p / 6
                finish(sphere(0.09, seg=8, rings=5, pos=(math.sin(a) * rr + math.cos(pa) * 0.08, 0.72, math.cos(a) * rr + math.sin(pa) * 0.08), scale=(0.7, 0.9, 0.7)), material('lotus', 0xffc2d6))
            finish(sphere(0.05, seg=6, rings=4, pos=(math.sin(a) * rr, 0.74, math.cos(a) * rr)), center)

    # ------------------------------------------------------------------
    # 중앙 기둥 (몰딩 + 세로 홈) + 1단 그릇
    # ------------------------------------------------------------------
    col_prof = [(0, 0.25), (1.05, 0.25), (1.05, 0.42), (0.92, 0.5), (0.78, 0.6), (0.62, 0.72), (0.56, 1.0), (0.54, 1.5), (0.58, 1.9),
                (0.7, 2.0), (0.86, 2.12), (0.9, 2.22), (0, 2.22)]
    finish(lathe(col_prof, seg=40), stone, ol=True, ol_t=0.02)
    for i in range(12):
        a = TAU * i / 12
        fl = box(0.08, 0.95, 0.06, pos=(math.sin(a) * 0.56, 1.25, math.cos(a) * 0.56), rot=(0, a, 0))
        finish(fl, stone_dk, bevel=0.02, seg=1)
    bowl_prof = [(0, 2.25), (0.5, 2.27), (1.0, 2.36), (1.5, 2.5), (1.85, 2.66), (2.08, 2.84), (2.12, 2.94), (2.04, 2.98), (1.9, 2.92), (1.72, 2.86), (0, 2.86)]
    finish(lathe(bowl_prof, seg=56), stone_lt, ol=True, ol_t=0.02)
    # 그릇 가장자리 물결 장식 + 아래 리브
    for i in range(24):
        a = TAU * i / 24
        finish(sphere(0.12, seg=8, rings=6, pos=(math.sin(a) * 2.1, 2.9, math.cos(a) * 2.1), scale=(1, 0.7, 1)), stone_lt)
        if i % 2 == 0:
            rb = box(0.1, 0.35, 0.9, pos=(math.sin(a) * 1.25, 2.5, math.cos(a) * 1.25), rot=(-0.35, a, 0))
            finish(rb, stone, bevel=0.03, seg=1)
    # 물 나오는 꼭지 4개 (작은 물고기 머리 모양)
    for i in range(4):
        a = TAU * i / 4 + math.pi / 4
        x, z = math.sin(a) * 2.1, math.cos(a) * 2.1
        finish(sphere(0.2, seg=10, rings=8, pos=(x, 2.78, z), scale=(1, 0.9, 1.3), rot=(0, a, 0)), gold)
        finish(cyl(0.07, 0.09, 0.3, seg=8, pos=(math.sin(a) * 2.32, 2.72, math.cos(a) * 2.32), rot=(math.pi / 2 - 0.4, a, 0)), gold)

    # ------------------------------------------------------------------
    # 2단 기둥 + 작은 그릇 + 별 받침
    # ------------------------------------------------------------------
    c2 = [(0, 2.86), (0.48, 2.86), (0.48, 2.98), (0.36, 3.08), (0.3, 3.5), (0.33, 3.85), (0.42, 3.95), (0, 3.95)]
    finish(lathe(c2, seg=28), stone, ol=True, ol_t=0.02)
    small = [(r * 0.55, 3.9 + (y - 2.25) * 0.55) for (r, y) in bowl_prof]
    finish(lathe(small, seg=40), stone_lt, ol=True, ol_t=0.025)
    for i in range(14):
        a = TAU * i / 14
        finish(sphere(0.08, seg=8, rings=6, pos=(math.sin(a) * 1.15, 3.9 + 0.65 * 0.55 + 0.03, math.cos(a) * 1.15), scale=(1, 0.7, 1)), stone_lt)
    finish(lathe([(0, 4.2), (0.25, 4.2), (0.18, 4.32), (0.14, 4.45), (0.22, 4.55), (0, 4.55)], seg=20), gold)

    # ------------------------------------------------------------------
    # 둘레 화단 8개 (돌 테두리 + 흙 + 풀 + 꽃) — 원래 위치 (반지름 4.9)
    # ------------------------------------------------------------------
    cols = [0xff85a2, 0xfde047, 0xffffff, 0xc084fc, 0xfb7185, 0x93c5fd]
    for i in range(8):
        a = (i / 8) * TAU + math.pi / 8
        x, z = math.cos(a) * 5.15, math.sin(a) * 5.15
        ry = look_out(x, z)
        finish(lathe([(0.58, 0.0), (0.62, 0.05), (0.62, 0.22), (0.52, 0.25), (0.5, 0.18), (0, 0.18)], seg=18, pos=(x, 0, z)), stone_dk, ol=True, ol_t=0.012)
        finish(cyl(0.5, 0.5, 0.04, seg=16, pos=(x, 0.2, z)), soil)
        for k in range(3):
            finish(sphere(random.uniform(0.15, 0.22), seg=8, rings=6, pos=(x + random.uniform(-0.25, 0.25), 0.27, z + random.uniform(-0.25, 0.25)), scale=(1, 0.7, 1)), leaf, jitter=0.1)
        for k in range(4):
            flower(x + random.uniform(-0.3, 0.3), 0.2, z + random.uniform(-0.3, 0.3), random.choice(cols), (leaf_dk, center), size=1.1, stem=random.uniform(0.2, 0.35))
