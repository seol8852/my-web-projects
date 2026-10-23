# ⛲ 우물 & 육각 정자 쉼터 — 원래 배치(town_hq.js wellRest())와 같은 크기·위치
# 게임 부품(그대로 사용): 우물 물(원판), 정자 종이 등불
import math, random
from lib import *

HEX = 0.0   # Blender 원기둥 꼭짓점이 이미 three.js 6각과 같은 방향


def build():
    random.seed(71)
    stone = material('stone', 0xd2c8b5, 'stone', 2.0, 0.2)
    stone_dk = material('stone_dk', 0xb5aa96, 'stone', 2.0, 0.2)
    moss = material('moss', 0x6fa04f, 'plaster', 3.0, 0.2)
    post = material('post', 0x8a5a2b, 'wood', 1.6, 0.22)
    red_roof = material('red_roof', 0xd94b4b, 'plaster', 3.0, 0.08)
    red_dk = material('red_dk', 0xa83232)
    roller = material('roller', 0xa86b3c, 'wood', 2.0, 0.2)
    rope = material('rope', 0xe9d5a8)
    iron = material('iron', 0x3b3550)
    deck_m = material('deck', 0xe2b27a, 'wood', 1.6, 0.18)
    pillar = material('pillar', 0xb45309, 'wood', 1.6, 0.2)
    roof = material('roof', 0x34d399, 'plaster', 3.0, 0.08)
    roof_dk = material('roof_dk', 0x1f9d70)
    gold = material('gold', 0xfacc15)
    ring_wood = material('ring_wood', 0xe0b47c, 'wood', 3.0, 0.15)
    seat_m = material('seat', 0xf3dfc1, 'wood', 1.8, 0.15)
    white = material('white', 0xffffff)
    teal = material('teal', 0x8ecae6)
    leaf = material('leaf', 0x6cbf4a, 'plaster', 4.0, 0.15)
    terra = material('terra', 0xe07a5f, 'plaster', 3.0, 0.1)
    stem = material('stem', 0x4f9a2f)
    center = material('center', 0xfacc15)

    # ------------------------------------------------------------------
    # 우물 (원래 그룹 (-5, 0, 2)): 돌 고리 r1.0~1.55 h1.35 (물 y0.7 은 게임 부품)
    # ------------------------------------------------------------------
    Wl = Grp((-5, 0, 2))
    finish(Wl(lathe([(1.0, 0), (1.38, 0), (1.38, 1.15), (1.0, 1.15), (1.0, 0.2)], seg=32)), stone_dk)
    for c in range(3):  # 돌 블록 3단 (엇갈림)
        n = 14
        for i in range(n):
            a0 = TAU * (i + 0.5 * (c % 2)) / n
            y0, y1 = 0.02 + c * 0.38, 0.02 + c * 0.38 + 0.34
            finish(Wl(lathe([(1.36, y0), (1.48, y0), (1.48, y1), (1.36, y1), (1.36, y0)], seg=3, phi0=a0 + 0.02, phi=TAU / n - 0.04)), stone if (i + c) % 3 else stone_dk, smooth=False, jitter=0.07)
    for i in range(12):  # 위 테두리 돌 (원래 r1.55 y1.2~1.35)
        a0 = TAU * i / 12
        finish(Wl(lathe([(0.98, 1.15), (1.57, 1.15), (1.57, 1.33), (0.98, 1.33), (0.98, 1.15)], seg=3, phi0=a0 + 0.015, phi=TAU / 12 - 0.03)), stone, bevel=0.02, smooth=False, jitter=0.06, ol=(i % 3 == 0), ol_t=0.03)
    for k in range(6):  # 이끼
        a = random.uniform(0, TAU)
        finish(Wl(sphere(0.18, seg=8, rings=5, pos=(math.cos(a) * 1.5, random.uniform(0.1, 0.9), math.sin(a) * 1.5), scale=(1, 0.6, 0.5), rot=(0, -a, 0))), moss)
    # 기둥 2개 (원래 roundBox(0.2, 2.8, 0.2) at (±1.25, 2.3, 0)) + 버팀
    for x in (-1.25, 1.25):
        finish(Wl(box(0.2, 2.8, 0.2, pos=(x, 2.3, 0))), post, bevel=0.03, seg=1, smooth=False, jitter=0.05, ol=True, ol_t=0.04)
        finish(Wl(box(0.12, 0.6, 0.12, pos=(x, 3.35, 0.32), rot=(-0.6, 0, 0))), post, smooth=False)
        finish(Wl(box(0.12, 0.6, 0.12, pos=(x, 3.35, -0.32), rot=(0.6, 0, 0))), post, smooth=False)
    # 박공지붕 (원래 gableRoof(2.6, 2.0, 3.6, 0.9, over 0.3) 을 ry π/2)
    R_ = Wl.sub(rot=(0, math.pi / 2, 0))
    th = math.atan2(0.9, 1.0); L = 1.3 / math.cos(th)
    for side in (-1, 1):
        cy = 3.6 + 0.9 - (L / 2) * math.sin(th) + 0.1; cz = side * (L / 2) * math.cos(th)
        finish(R_(box(3.2, 0.16, L, pos=(0, cy, cz), rot=(side * th, 0, 0))), red_dk, bevel=0.03, seg=1, smooth=False, ol=True, ol_t=0.02)
        for k in range(4):
            lp = lpos((0, cy, cz), (side * th, 0, 0), (0, 0.1, side * (-L / 2 + (k + 0.5) * L / 4)))
            finish(R_(box(3.15, 0.07, L / 4 + 0.1, pos=lp, rot=(side * th - side * 0.07, 0, 0))), red_roof, bevel=0.02, seg=1, smooth=False, jitter=0.05)
            for j in range(5):
                gp = lpos(lp, (side * th - side * 0.07, 0, 0), (-1.25 + j * 0.6 + 0.3 * (k % 2) - 0.15, 0.04, 0))
                finish(R_(box(0.03, 0.012, L / 4 + 0.06, pos=gp, rot=(side * th - side * 0.07, 0, 0))), red_dk, smooth=False)
    finish(R_(cyl(0.16, 0.16, 3.4, seg=10, pos=(0, 4.62, 0), rot=(0, 0, math.pi / 2))), red_dk, ol=True, ol_t=0.02)
    for s in (-1, 1):  # 박공 삼각판
        finish(R_(extrude_shape([(-1.0, 0), (1.0, 0), (0, 0.9)], 0.08, pos=(s * 1.3, 3.6, 0), rot=(0, math.pi / 2, 0))), post, smooth=False)
    # 도르래 (원래 roller r0.16 len 2.5 y2.9) + 손잡이 + 줄 + 두레박 (원래 r0.28/0.22 h0.4 y1.4)
    finish(Wl(cyl(0.16, 0.16, 2.5, seg=12, pos=(0, 2.9, 0), rot=(0, 0, math.pi / 2))), roller)
    for x in (-0.3, 0.3):
        finish(Wl(cyl(0.2, 0.2, 0.04, seg=12, pos=(x, 2.9, 0), rot=(0, 0, math.pi / 2))), post)
    finish(Wl(box(0.05, 0.5, 0.05, pos=(1.45, 2.7, 0))), iron, smooth=False)
    finish(Wl(cyl(0.04, 0.04, 0.3, seg=6, pos=(1.55, 2.47, 0), rot=(0, 0, math.pi / 2))), roller)
    for k in range(5):
        finish(Wl(torus(0.18, 0.03, seg=10, rseg=4, pos=(-0.1 + k * 0.05, 2.9, 0), rot=(0, math.pi / 2, 0))), rope)
    finish(Wl(cyl(0.03, 0.03, 1.4, seg=5, pos=(0, 2.2, 0))), rope)
    finish(Wl(lathe([(0, 0), (0.22, 0), (0.28, 0.4), (0.25, 0.4), (0.19, 0.04), (0, 0.04)], seg=16, pos=(0, 1.2, 0))), roller, ol=True, ol_t=0.03)
    for y in (1.28, 1.52):
        finish(Wl(torus(0.24 + (y - 1.2) * 0.12, 0.02, seg=14, rseg=3, pos=(0, y, 0), rot=(math.pi / 2, 0, 0))), iron)
    finish(Wl(torus(0.26, 0.02, seg=12, rseg=3, arc=math.pi, pos=(0, 1.6, 0))), iron)
    # 우물 옆 물동이 + 화분
    finish(Wl(lathe([(0, 0), (0.25, 0), (0.32, 0.35), (0.3, 0.35), (0.22, 0.04), (0, 0.04)], seg=14, pos=(1.9, 0, 0.9))), teal, ol=True, ol_t=0.03)
    finish(Wl(lathe([(0, 0), (0.28, 0), (0.36, 0.45), (0.4, 0.5), (0.4, 0.58), (0, 0.58)], seg=14, pos=(-1.9, 0, -0.6))), terra, ol=True, ol_t=0.03)
    finish(Wl(sphere(0.38, seg=10, rings=8, pos=(-1.9, 0.85, -0.6), scale=(1, 0.8, 1))), leaf, jitter=0.08)
    for k in range(4):
        p = Wl.p(-1.9 + math.cos(k * 1.6) * 0.22, 0.95, -0.6 + math.sin(k * 1.6) * 0.22)
        flower(p[0], p[1], p[2], [0xff85a2, 0xfde047, 0xffffff, 0xc084fc][k], (stem, center), size=1.0, stem=0.22)
    # 우물 둘레 바닥돌
    for i in range(16):
        a = TAU * i / 16
        finish(Wl(cyl(0.38, 0.4, 0.08, seg=8, pos=(math.cos(a) * 1.95, 0.04, math.sin(a) * 1.95), rot=(0, a, 0))), stone, smooth=False, jitter=0.07)

    # ------------------------------------------------------------------
    # 육각 정자 (원래 그룹 (4, 0, -1))
    # ------------------------------------------------------------------
    P = Grp((4, 0, -1))
    # 마루 (원래 6각 r4.2~4.4 h0.5) — 받침 돌 + 판자 마루
    finish(P(cyl(4.2, 4.4, 0.4, seg=6, pos=(0, 0.2, 0), rot=(0, HEX, 0))), stone_dk, bevel=0.05, smooth=False, ol=True, ol_t=0.02)
    for i in range(6):  # 6조각 판자 (부채꼴마다 결 방향)
        a = TAU * i / 6 + math.pi / 6   # 변 가운데 방향 (sin, cos)
        nb = 9
        for k in range(nb):
            rr = 0.3 + (k + 0.5) * 3.75 / nb
            Lb = 2 * rr * math.tan(math.pi / 6) - 0.04
            finish(P(box(Lb, 0.1, 3.75 / nb - 0.035, pos=(math.sin(a) * rr, 0.45, math.cos(a) * rr), rot=(0, a, 0))), deck_m, smooth=False, jitter=0.06)
    finish(P(cyl(0.35, 0.35, 0.1, seg=6, pos=(0, 0.45, 0), rot=(0, HEX, 0))), deck_m)
    for i in range(6):  # 마루 테두리 각목
        a = TAU * i / 6 + math.pi / 6
        rr = 4.2 * math.cos(math.pi / 6)
        finish(P(box(4.2, 0.14, 0.16, pos=(math.sin(a) * rr, 0.47, math.cos(a) * rr), rot=(0, a, 0))), pillar, smooth=False)
    # 입구 계단 (난간 없는 i=1 쪽)
    a_in = (1 / 6) * TAU + math.pi / 6
    sx, sz = math.cos(a_in), math.sin(a_in)
    finish(P(box(2.0, 0.25, 0.6, pos=(sx * 4.25, 0.12, sz * 4.25), rot=(0, -a_in + math.pi / 2, 0))), stone, bevel=0.04, smooth=False)
    # 기둥 6개 (원래 r0.18~0.2 h3.6 at 반지름 3.7, y2.3) + 받침 + 까치발
    for i in range(6):
        a = (i / 6) * TAU
        x, z = math.cos(a) * 3.7, math.sin(a) * 3.7
        finish(P(cyl(0.18, 0.2, 3.6, seg=12, pos=(x, 2.3, z))), pillar, jitter=0.05, ol=True, ol_t=0.05)
        finish(P(cyl(0.28, 0.3, 0.2, seg=10, pos=(x, 0.6, z))), stone, smooth=False)
        finish(P(box(0.12, 0.7, 0.12, pos=(math.cos(a) * 3.35, 3.75, math.sin(a) * 3.35), rot=(0, -a, 0.6), order='YXZ')), pillar, smooth=False)
        a2 = a + math.pi / 6
        finish(P(box(3.9, 0.22, 0.16, pos=(math.cos(a2) * 3.2, 4.05, math.sin(a2) * 3.2), rot=(0, -a2 + math.pi / 2, 0))), pillar, smooth=False)
        if i != 1:
            # 난간 (원래 roundBox(3.5, 0.14, 0.14) at r3.2 y1.2) + 살 + 의자 (원래 roundBox(3.0, 0.12, 0.55) r2.85 y0.95)
            ry = -a2 + math.pi / 2
            finish(P(box(3.5, 0.14, 0.14, pos=(math.cos(a2) * 3.2, 1.2, math.sin(a2) * 3.2), rot=(0, ry, 0))), pillar, bevel=0.02, seg=1, smooth=False)
            for k in range(7):
                t = -1.5 + k * 0.5
                finish(P(box(0.07, 0.6, 0.07, pos=(math.cos(a2) * 3.2 + math.cos(ry) * t, 0.85, math.sin(a2) * 3.2 - math.sin(ry) * t), rot=(0, ry, 0))), pillar, smooth=False)
            finish(P(box(3.0, 0.12, 0.55, pos=(math.cos(a2) * 2.85, 0.95, math.sin(a2) * 2.85), rot=(0, ry, 0))), seat_m, bevel=0.03, seg=1, smooth=False, ol=True, ol_t=0.02)
            for t in (-1.2, 1.2):
                finish(P(box(0.1, 0.45, 0.4, pos=(math.cos(a2) * 2.85 + math.cos(ry) * t, 0.7, math.sin(a2) * 2.85 - math.sin(ry) * t), rot=(0, ry, 0))), pillar, smooth=False)
    # 6각 지붕 (원래 ConeGeometry(5.2, 2.6, 6) y5.3) — 기와 띠 + 처마 끝 들림 + 꼭대기 구슬
    finish(P(cyl(0.0, 5.2, 2.6, seg=6, pos=(0, 5.3, 0), rot=(0, HEX, 0))), roof_dk, bevel=0.04, smooth=False, ol=True, ol_t=0.02)
    for k in range(6):
        t = (k + 0.5) / 6
        rr = 5.2 * (1 - t) + 0.08
        y = 4.0 + 2.6 * t
        finish(P(cyl(rr - 0.05, rr + 0.35, 0.18, seg=6, pos=(0, y - 0.05, 0), rot=(0, HEX, 0))), roof, smooth=False, jitter=0.04)
    for i in range(6):  # 내림마루 + 처마 끝 장식
        a = TAU * i / 6   # 꼭짓점 방향 (sin, cos)
        d = (math.sin(a), math.cos(a))
        mid = (d[0] * 2.6, 5.3 + 0.12, d[1] * 2.6)
        Lr = math.hypot(5.2, 2.6)
        finish(P(cyl(0.11, 0.11, Lr, seg=8, pos=mid, rot=(-math.atan2(5.2, 2.6), a, 0), order='YXZ')), roof_dk)
        finish(P(sphere(0.2, seg=10, rings=8, pos=(d[0] * 5.25, 4.05, d[1] * 5.25))), gold)
    finish(P(sphere(0.35, seg=14, rings=10, pos=(0, 6.75, 0))), gold, ol=True, ol_t=0.03)
    finish(P(cyl(0.05, 0.1, 0.5, seg=8, pos=(0, 7.2, 0))), gold)
    # 등불 고리 (등불 y3.4 은 게임 부품)
    finish(P(cyl(0.015, 0.015, 0.6, seg=4, pos=(0, 4.15, 0))), rope)
    # 찻상 (원래 6각 r0.8 h0.1 y1.0 + 다리 r0.12~0.2 h0.5 y0.75) + 찻주전자·찻잔
    finish(P(cyl(0.8, 0.8, 0.1, seg=6, pos=(0, 1.0, 0), rot=(0, HEX, 0))), ring_wood, bevel=0.03, smooth=False, ol=True, ol_t=0.03)
    finish(P(cyl(0.12, 0.2, 0.5, seg=10, pos=(0, 0.75, 0))), post)
    finish(P(lathe([(0, 0), (0.16, 0), (0.2, 0.12), (0.17, 0.24), (0.08, 0.28), (0, 0.3)], seg=14, pos=(0.15, 1.05, 0.1))), white, ol=True, ol_t=0.015)
    finish(P(cyl(0.02, 0.04, 0.2, seg=6, pos=(0.38, 1.18, 0.1), rot=(0, 0, -0.9))), white)
    for k in range(3):
        a = TAU * k / 3 + 2.0
        finish(P(cyl(0.07, 0.06, 0.1, seg=10, pos=(math.cos(a) * 0.5, 1.1, math.sin(a) * 0.5))), teal)
