# 🛝 놀이터 (그네 · 미끄럼틀 · 시소 · 모래성) — 원래 배치(town_hq.js playground())와 같은 크기·위치
# 게임 부품(그대로 사용): 그네 의자 2개 + 줄(흔들림), 시소 판(움직임), 가로등 유리
import math, random
from lib import *


def build():
    random.seed(67)
    sand = material('sand', 0xf6dfa8, 'plaster', 1.5, 0.08)
    sand_dk = material('sand_dk', 0xe9c98a, 'plaster', 2.0, 0.1)
    sand_mk = material('sand_mk', 0xefd59a)
    log = material('log', 0xd9a066, 'wood', 2.0, 0.2)
    red = material('red', 0xef4444)
    yellow = material('yellow', 0xfacc15)
    blue = material('blue', 0x3b82f6)
    green = material('green', 0x22c55e, 'plaster', 3.0, 0.06)
    pink = material('pink', 0xf472b6)
    pink_dk = material('pink_dk', 0xec4899)
    white = material('white', 0xffffff)
    iron = material('iron', 0x3b3550)
    gold = material('gold', 0xd4a017)
    grey = material('grey', 0x52525b)
    plank = material('plank', 0xd9a066, 'wood', 1.8, 0.2)
    lblue = material('lblue', 0x60a5fa)
    stone = material('stone', 0xd6d0c2, 'stone', 2.2, 0.18)

    # ------------------------------------------------------------------
    # 모래밭 (원래 r10.5~10.8 h0.16) + 통나무 테두리 (원래 torus R10.7 r0.25 y0.2)
    # ------------------------------------------------------------------
    finish(cyl(10.5, 10.8, 0.16, seg=72, pos=(0, 0.08, 0)), sand)
    for i in range(14):  # 모래 무늬 (살짝 진한 얼룩)
        a = random.uniform(0, TAU); r = random.uniform(1, 9.5)
        rr = random.uniform(0.5, 1.0)
        finish(cyl(rr, rr, 0.03, seg=14, pos=(math.cos(a) * r, 0.17, math.sin(a) * r), scale=(1, 1, random.uniform(0.5, 1))), sand_mk)
    n = 56
    for i in range(n):  # 짧은 통나무를 둥글게
        a = TAU * (i + 0.5) / n
        L = TAU * 10.7 / n
        finish(cyl(0.25, 0.25, L - 0.06, seg=10, pos=(math.cos(a) * 10.7, 0.2 + 0.04 * (i % 2), math.sin(a) * 10.7), rot=(math.pi / 2, -a, 0), order='YXZ'),
               log, jitter=0.07, ol=(i % 4 == 0), ol_t=0.03)

    # ------------------------------------------------------------------
    # 그네 (원래 그룹 (-4.5, 0, -2.5)) — 의자·줄은 게임 부품
    # ------------------------------------------------------------------
    S = Grp((-4.5, 0, -2.5))
    for x in (-2.6, 2.6):
        for s in (-1, 1):
            finish(S(cyl(0.12, 0.12, 4.3, seg=12, pos=(x, 2.05, s * 0.7), rot=(-s * 0.33, 0, 0))), red, ol=True, ol_t=0.06)
            finish(S(cyl(0.22, 0.26, 0.2, seg=10, pos=(x, 0.1, s * 1.4))), stone, bevel=0.03, smooth=False)
        finish(S(box(0.12, 0.12, 1.6, pos=(x, 1.4, 0))), red, smooth=False)  # 다리 보강
        finish(S(sphere(0.22, seg=12, rings=8, pos=(x, 4.08, 0))), yellow)
    finish(S(cyl(0.13, 0.13, 5.6, seg=12, pos=(0, 4.05, 0), rot=(0, 0, math.pi / 2))), yellow, ol=True, ol_t=0.05)
    for x in (-1.55, -0.85, 0.85, 1.55):  # 줄 고리
        finish(S(torus(0.09, 0.025, seg=10, rseg=4, pos=(x, 3.98, 0), rot=(0, math.pi / 2, 0))), grey)

    # ------------------------------------------------------------------
    # 미끄럼틀 (원래 그룹 (4.5, 0, -3.5) ry 0.3)
    # ------------------------------------------------------------------
    L = Grp((4.5, 0, -3.5), (0, 0.3, 0))
    finish(L(box(1.8, 0.2, 1.8, pos=(0, 2.4, 0))), yellow, bevel=0.05, seg=2, smooth=False, ol=True, ol_t=0.04)
    for (x, z) in ((-0.8, -0.8), (0.8, -0.8), (-0.8, 0.8), (0.8, 0.8)):
        finish(L(cyl(0.1, 0.1, 3.4, seg=10, pos=(x, 1.7, z))), blue)
        finish(L(sphere(0.13, seg=8, rings=6, pos=(x, 3.42, z))), blue)
    for (x, z, ry) in ((0, 0.8, 0), (-0.8, 0, math.pi / 2), (0.8, 0, math.pi / 2)):  # 난간 (앞은 미끄럼 입구라 일부)
        for y in (2.75, 3.05):
            finish(L(box(1.6 if ry else 0.5, 0.06, 0.06, pos=(x if ry else -0.55, y, z), rot=(0, ry, 0))), white, smooth=False)
            if not ry:
                finish(L(box(0.5, 0.06, 0.06, pos=(0.55, y, z))), white, smooth=False)
    finish(L(box(1.6, 0.6, 0.06, pos=(0, 2.85, -0.8))), green, bevel=0.02, seg=1, smooth=False)  # 뒤 가림판
    for k in range(3):
        finish(L(cyl(0.12, 0.12, 0.03, seg=12, pos=(-0.5 + k * 0.5, 2.85, -0.84), rot=(math.pi / 2, 0, 0))), [yellow, pink, lblue][k])
    # 뾰족 지붕 (원래 ConeGeometry(1.5, 1.0, 4) ry π/4 y3.9)
    finish(L(cyl(0.0, 1.5, 1.0, seg=4, pos=(0, 3.9, 0), rot=(0, math.pi / 4, 0))), green, bevel=0.03, smooth=False, ol=True, ol_t=0.04)
    finish(L(sphere(0.14, seg=10, rings=8, pos=(0, 4.45, 0))), yellow)
    finish(L(cyl(0.02, 0.02, 0.5, seg=6, pos=(0, 4.7, 0))), iron)
    finish(L(extrude_shape([(0, 0), (0.4, 0.12), (0, 0.24)], 0.02, pos=(0, 4.7, 0))), red, smooth=False)
    # 미끄럼판 (원래 roundBox(1.1, 0.12, L) 기울기 atan2(2.3, 3.6) at (0, 1.3, 2.7)) + 옆 난간
    sl = math.hypot(3.6, 2.3); th = math.atan2(2.3, 3.6)
    finish(L(box(1.1, 0.12, sl, pos=(0, 1.3, 2.7), rot=(th, 0, 0))), pink, bevel=0.04, seg=2, smooth=False, ol=True, ol_t=0.04)
    for x in (-0.6, 0.6):
        finish(L(box(0.1, 0.35, sl, pos=(x, 1.55, 2.7), rot=(th, 0, 0))), pink_dk, bevel=0.03, seg=1, smooth=False)
    finish(L(box(1.3, 0.12, 0.6, pos=(0, 0.12, 4.75))), pink, bevel=0.04, seg=1, smooth=False)  # 끝 받침
    for k in range(6):  # 사다리 (원래 가로대 6개 at (0, 0.35 + k*0.38, -1.0), 기둥 (±0.5, 1.3, -1.0))
        finish(L(cyl(0.05, 0.05, 1.0, seg=8, pos=(0, 0.35 + k * 0.38, -1.0), rot=(0, 0, math.pi / 2))), white)
    for x in (-0.5, 0.5):
        finish(L(cyl(0.06, 0.06, 2.6, seg=8, pos=(x, 1.3, -1.0))), white, ol=True, ol_t=0.03)
        finish(L(torus(0.25, 0.05, seg=10, rseg=5, arc=math.pi, pos=(x, 2.6, -0.8), rot=(0, math.pi / 2, 0))), white)

    # ------------------------------------------------------------------
    # 시소 받침 (원래 삼각기둥 r0.4 h0.9 at (0, 0.4, 5.5)) — 판은 게임 부품
    # ------------------------------------------------------------------
    finish(extrude_shape([(-0.45, 0), (0.45, 0), (0.06, 0.78), (-0.06, 0.78)], 0.9, pos=(0, 0, 5.5)), blue, bevel=0.04, smooth=False, ol=True, ol_t=0.05)
    finish(cyl(0.08, 0.08, 1.0, seg=10, pos=(0, 0.78, 5.5), rot=(math.pi / 2, 0, 0)), yellow)
    for x in (-2.0, 2.0):  # 떨어지는 자리 타이어 쿠션
        finish(torus(0.35, 0.14, seg=16, rseg=8, pos=(x, 0.17, 5.5), rot=(math.pi / 2, 0, 0)), material('tire', 0x374151), ol=True, ol_t=0.03)

    # ------------------------------------------------------------------
    # 모래성 (원래 (-5.5, 0, 5.5): 원기둥 r0.8~0.9 h0.7 + 원뿔 r0.55 h0.8 + 깃발) + 양동이·삽
    # ------------------------------------------------------------------
    cx, cz = -5.5, 5.5
    finish(cyl(0.8, 0.9, 0.7, seg=20, pos=(cx, 0.45, cz)), sand_dk, jitter=0.04, ol=True, ol_t=0.05)
    for k in range(10):  # 성가퀴
        a = TAU * k / 10
        finish(box(0.2, 0.18, 0.18, pos=(cx + math.cos(a) * 0.72, 0.88, cz + math.sin(a) * 0.72), rot=(0, -a, 0)), sand_dk, smooth=False)
    finish(cyl(0.0, 0.55, 0.8, seg=12, pos=(cx, 1.2, cz)), sand_dk, jitter=0.04)
    for (dx, dz, s) in ((0.95, 0.3, 0.6), (-0.7, -0.75, 0.5)):  # 작은 탑
        finish(cyl(0.25 * s / 0.5, 0.28 * s / 0.5, 0.5 * s / 0.5, seg=12, pos=(cx + dx, 0.25 * s / 0.5 + 0.16, cz + dz)), sand_dk)
        finish(cyl(0.0, 0.2 * s / 0.5, 0.35 * s / 0.5, seg=10, pos=(cx + dx, 0.66 * s / 0.5 + 0.16, cz + dz)), sand_dk)
    finish(box(0.25, 0.4, 0.06, pos=(cx, 0.4, cz + 0.88)), material('door_s', 0xb8945e), smooth=False)
    finish(cyl(0.015, 0.015, 0.55, seg=5, pos=(cx, 1.75, cz)), iron)
    finish(extrude_shape([(0, 0), (0.3, 0.1), (0, 0.2)], 0.02, pos=(cx, 1.82, cz)), red, smooth=False)
    finish(torus(1.15, 0.08, seg=28, rseg=5, pos=(cx, 0.17, cz), rot=(math.pi / 2, 0, 0)), material('moat', 0x7dd3fc))
    px, pz = -4.3, 6.3
    finish(lathe([(0, 0), (0.22, 0), (0.3, 0.45), (0.27, 0.45), (0.2, 0.04), (0, 0.04)], seg=16, pos=(px, 0.16, pz)), lblue, ol=True, ol_t=0.03)
    finish(torus(0.22, 0.015, seg=12, rseg=3, arc=math.pi, pos=(px, 0.62, pz)), grey)
    finish(box(0.06, 0.6, 0.04, pos=(px + 0.5, 0.35, pz - 0.2), rot=(0.4, 0.3, 0.3)), red, smooth=False)
    finish(box(0.18, 0.22, 0.03, pos=(px + 0.62, 0.12, pz - 0.05), rot=(0.4, 0.3, 0.3)), yellow, smooth=False)

    # ------------------------------------------------------------------
    # 벤치 2개 (원래 (±11.8, 0, 0) ry ±π/2) + 가로등 (원래 (0, 0, -11.5) ry π/2)
    # ------------------------------------------------------------------
    bench_model(Grp((-11.8, 0, 0), (0, math.pi / 2, 0)), plank, iron)
    bench_model(Grp((11.8, 0, 0), (0, -math.pi / 2, 0)), plank, iron)
    street_lamp_model(Grp((0, 0, -11.5), (0, math.pi / 2, 0)), iron, gold)

    # ------------------------------------------------------------------
    # 스프링 오리 놀이기구 (장식, (6.5, 0, 5.0))
    # ------------------------------------------------------------------
    D = Grp((6.5, 0, 5.0), (0, -0.6, 0))
    finish(D(cyl(0.45, 0.5, 0.1, seg=16, pos=(0, 0.2, 0))), grey)
    for k in range(6):
        finish(D(torus(0.16, 0.035, seg=12, rseg=4, pos=(0, 0.3 + k * 0.09, 0), rot=(math.pi / 2, 0, 0.15 * (k % 2)))), material('spring', 0x9ca3af))
    finish(D(sphere(0.5, seg=18, rings=12, pos=(0, 1.05, 0), scale=(1.3, 0.75, 0.75))), yellow, ol=True, ol_t=0.03)
    finish(D(sphere(0.32, seg=14, rings=10, pos=(0.55, 1.55, 0))), yellow, ol=True, ol_t=0.03)
    finish(D(cyl(0.0, 0.14, 0.3, seg=10, pos=(0.88, 1.5, 0), rot=(0, 0, -math.pi / 2))), material('beak', 0xfb923c))
    for z in (-0.18, 0.18):
        finish(D(sphere(0.05, seg=8, rings=5, pos=(0.78, 1.62, z))), material('eye', 0x1f2937))
    finish(D(sphere(0.2, seg=10, rings=6, pos=(-0.62, 1.25, 0), scale=(1, 0.6, 0.8), rot=(0, 0, 0.6))), yellow)
    finish(D(cyl(0.03, 0.03, 0.5, seg=6, pos=(0.5, 1.5, 0), rot=(math.pi / 2, 0, 0))), red)
    for z in (-0.25, 0.25):
        finish(D(sphere(0.06, seg=8, rings=5, pos=(0.5, 1.5, z))), red)
        finish(D(box(0.3, 0.05, 0.12, pos=(0.2, 0.75, z * 1.6))), red, smooth=False)
    finish(D(box(0.5, 0.06, 0.5, pos=(-0.1, 1.42, 0))), red, bevel=0.02, seg=1, smooth=False)
