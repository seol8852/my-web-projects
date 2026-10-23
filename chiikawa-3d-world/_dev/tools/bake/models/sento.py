# ♨️ 대중목욕탕 (센토) — 원래 배치(town_hq.js sento())와 같은 크기·위치
# 게임 부품(그대로 사용): 노렌 3장(바람), 입구 어둠판, 창문 유리 2개, 굴뚝 글씨 띠, 동그란 ♨ 간판, 종이 등불 2개, 연기
import math, random
from lib import *

W, D, H = 12, 8, 4.6


def bez(p0, p1, p2, p3, n=16):
    out = []
    for i in range(n + 1):
        t = i / n
        a = (1 - t) ** 3; b = 3 * (1 - t) ** 2 * t; c = 3 * (1 - t) * t * t; d = t ** 3
        out.append((a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]))
    return out


def build():
    random.seed(41)
    wall = material('wall', 0xfffaf0, 'plaster', 1.2, 0.06)
    roof = material('roof', 0x5f7396, 'plaster', 3.0, 0.08)
    roof_dk = material('roof_dk', 0x4a5b7a)
    trim = material('trim', 0x7c4a24, 'wood', 1.6, 0.22)
    base = material('cobble', 0xd2c8b5, 'stone', 2.0, 0.2)
    plank = material('plank', 0xc8955a, 'wood', 1.8, 0.2)
    brick = material('brick', 0xc8644f, 'stone', 5.0, 0.15)
    mortar = material('mortar', 0xd9cfc0)
    iron = material('iron', 0x4b5563)
    iron2 = material('iron2', 0x3b3550)
    gold = material('gold', 0xfacc15)
    cream = material('cream', 0xfff3d6, 'plaster', 3.0, 0.06)
    yellow = material('yellow', 0xfacc15)
    stone = material('stone', 0xd6d0c2, 'stone', 2.2, 0.18)
    bamboo = material('bamboo', 0x84cc16, 'wood', 3.0, 0.12)
    bamboo_dk = material('bamboo_dk', 0x65a30d)
    leaf = material('leaf', 0x6cbf4a, 'plaster', 4.0, 0.15)
    rope = material('rope', 0x3b2a1a)

    G = Grp()
    # ------------------------------------------------------------------
    # 건물 (원래 building w12 d8 h4.6 rise3, trim 0x7c4a24) + 아래 세로 판자벽 (원래 roundBox(W+.08, 1.4, D+.08) y1.0)
    # ------------------------------------------------------------------
    gable_building(G, W, D, H, 3.0, wall, roof, trim, base, roof_dk=roof_dk, ridge=iron2)
    for side, (L, nx, nz, ry) in enumerate([(W, 0, D / 2, 0), (W, 0, -D / 2, math.pi), (D, W / 2, 0, math.pi / 2), (D, -W / 2, 0, -math.pi / 2)]):
        n = int(L / 0.36)
        for i in range(n):
            x = -L / 2 + L * (i + 0.5) / n
            if side == 0 and abs(x) < 1.8:
                continue  # 입구 (어둠판 3.6 폭)
            lp = (nx + math.cos(ry) * x + math.sin(ry) * 0.05, 1.0, nz - math.sin(ry) * x + math.cos(ry) * 0.05)
            finish(box(L / n - 0.03, 1.4, 0.06, pos=lp, rot=(0, ry, 0)), plank, smooth=False, jitter=0.07)
        finish(box(L + 0.12, 0.12, 0.12, pos=(nx + math.sin(ry) * 0.1, 1.72, nz + math.cos(ry) * 0.1), rot=(0, ry, 0)), trim, smooth=False)
    # 박공 옆 환기 격자
    for sx in (-1, 1):
        for k in range(5):
            finish(box(0.08, 0.9, 0.08, pos=(sx * (W / 2 + 0.02), H + 1.35, -0.8 + k * 0.4)), trim, smooth=False)
        finish(box(0.1, 0.1, 2.0, pos=(sx * (W / 2 + 0.03), H + 1.85, 0)), trim, smooth=False)
        finish(box(0.1, 0.1, 2.0, pos=(sx * (W / 2 + 0.03), H + 0.85, 0)), trim, smooth=False)

    # ------------------------------------------------------------------
    # 가라하후(물결 지붕) 현관 (원래 기둥 (±1.9, 2.2, 5.6), 지붕 ExtrudeGeometry at (0, 4.1, 4.2) 깊이 2.6)
    # ------------------------------------------------------------------
    for x in (-1.9, 1.9):
        finish(cyl(0.2, 0.22, 3.8, seg=12, pos=(x, 2.2, 5.6)), trim, jitter=0.05, ol=True, ol_t=0.05)
        finish(cyl(0.3, 0.32, 0.3, seg=10, pos=(x, 0.15, 5.6)), stone, bevel=0.03, smooth=False)
        finish(box(0.5, 0.18, 0.5, pos=(x, 4.0, 5.6)), trim, bevel=0.03, seg=1, smooth=False)
    finish(box(4.3, 0.22, 0.3, pos=(0, 3.95, 5.6)), trim, bevel=0.03, seg=1, smooth=False)  # 인방
    outer = bez((-3.0, 0), (-2.4, 0.2), (-1.4, 1.6), (0, 1.6)) + bez((0, 1.6), (1.4, 1.6), (2.4, 0.2), (3.0, 0))[1:]
    inner = bez((3.0, -0.35), (2.4, -0.15), (1.4, 1.2), (0, 1.2)) + bez((0, 1.2), (-1.4, 1.2), (-2.4, -0.15), (-3.0, -0.35))[1:]
    shape = outer + inner
    finish(extrude_shape(shape, 2.6, pos=(0, 4.1, 5.5)), roof_dk, smooth=False, ol=True, ol_t=0.02)
    # 위쪽 기와 줄 (곡면을 따라 놓인 둥근 기와)
    for i in range(1, len(outer) - 1):  # 앞뒤로 길게 놓인 둥근 기와 (곡선을 따라)
        x, y = outer[i]
        finish(cyl(0.1, 0.1, 2.7, seg=8, pos=(x, 4.1 + y + 0.06, 5.5), rot=(math.pi / 2, 0, 0)), roof, jitter=0.05)
    # 앞 박공 판 + 금 장식 받침 (금 고리는 원래 위치 (0, 5.15, 6.85))
    finish(extrude_shape(outer + [(2.6, -0.1), (-2.6, -0.1)], 0.12, pos=(0, 4.1, 6.84)), trim, smooth=False)
    finish(torus(0.35, 0.08, seg=20, rseg=6, pos=(0, 5.15, 6.92)), gold, ol=True, ol_t=0.02)
    finish(sphere(0.14, seg=10, rings=8, pos=(0, 5.15, 6.95)), gold)
    for x in (-0.75, 0.75):
        finish(torus(0.2, 0.05, seg=14, rseg=5, arc=math.pi, pos=(x, 5.05, 6.92), rot=(0, 0, math.pi if x > 0 else 0)), gold)
    # 등불 고리 + 끈 (등불 (±2.6, 3.5, 5.9)은 게임 부품)
    for x in (-2.6, 2.6):
        finish(cyl(0.012, 0.012, 0.3, seg=4, pos=(x, 3.98, 5.9)), rope)
        finish(torus(0.05, 0.012, seg=8, rseg=3, pos=(x, 4.14, 5.9)), iron)
    # 입구 앞 돌계단 + 신발장 판
    finish(box(4.4, 0.2, 1.3, pos=(0, 0.1, 5.6)), stone, bevel=0.04, smooth=False, jitter=0.04)
    for k in range(3):
        finish(cyl(0.45, 0.5, 0.1, seg=10, pos=(-0.6 + k * 0.6, 0.05, 7.0 + k * 0.9), rot=(0, k, 0)), stone, bevel=0.03, smooth=False, jitter=0.06)

    # ------------------------------------------------------------------
    # 창문 2개 (원래 windowW(1.6, 1.3) at (±4.3, 3.3, 4.02)) — 유리는 게임 부품 + 대나무 발 장식 아래
    # ------------------------------------------------------------------
    for x in (-4.3, 4.3):
        finish(box(1.9, 1.6, 0.2, pos=(x, 3.3, 4.02)), cream, bevel=0.05, seg=2, smooth=False, ol=True, ol_t=0.04)
        finish(box(1.6, 0.08, 0.06, pos=(x, 3.3, 4.16)), trim, smooth=False)
        finish(box(0.08, 1.3, 0.06, pos=(x, 3.3, 4.16)), trim, smooth=False)
        finish(box(2.1, 0.12, 0.3, pos=(x, 2.45, 4.12)), trim, bevel=0.02, seg=1, smooth=False)
        finish(box(2.1, 0.12, 0.22, pos=(x, 4.18, 4.08)), trim, bevel=0.02, seg=1, smooth=False)

    # ------------------------------------------------------------------
    # 벽돌 굴뚝 (원래 r0.75~1.0, h12 at (4.0, 6.0, -5.2), 꼭대기 y12.2) — 글씨 띠(y8.7~10.5)는 게임 부품
    # ------------------------------------------------------------------
    cx, cz = 4.0, -D / 2 - 1.2
    finish(cyl(0.75, 1.0, 12, seg=20, pos=(cx, 6.0, cz)), brick, ol=True, ol_t=0.02)
    for k in range(26):
        y = 0.4 + k * 0.32
        if 8.6 < y < 10.6:
            continue
        r = 1.0 - 0.25 * y / 12 + 0.01
        finish(torus(r, 0.022, seg=20, rseg=3, pos=(cx, y, cz), rot=(math.pi / 2, 0, 0)), mortar)
    for y in (10.7, 11.4):
        r = 1.0 - 0.25 * y / 12 + 0.06
        finish(torus(r, 0.06, seg=20, rseg=4, pos=(cx, y, cz), rot=(math.pi / 2, 0, 0)), iron)
    finish(cyl(0.95, 0.85, 0.5, seg=20, pos=(cx, 12.2, cz)), iron, bevel=0.03, ol=True, ol_t=0.03)
    finish(torus(0.98, 0.07, seg=20, rseg=5, pos=(cx, 12.45, cz), rot=(math.pi / 2, 0, 0)), iron)
    finish(cyl(1.15, 1.25, 0.5, seg=20, pos=(cx, 0.25, cz)), stone, bevel=0.04, smooth=False)
    # 철 사다리
    for x in (-0.2, 0.2):
        finish(box(0.05, 7.5, 0.05, pos=(cx + 0.95 + x * 0.0, 4.1, cz + x)), iron, smooth=False)
    for k in range(18):
        finish(box(0.05, 0.05, 0.45, pos=(cx + 0.95, 0.6 + k * 0.4, cz)), iron, smooth=False)

    # ♨ 간판 받침 (간판 (-4.3, 6.2, 4.6)은 게임 부품)
    finish(box(0.16, 0.9, 0.16, pos=(-4.3, 5.0, 4.45)), trim, smooth=False)

    # ------------------------------------------------------------------
    # 노란 목욕 바가지 탑 (원래 r0.42/0.34 h0.36 ×4 at (-3.5, y, 5.6)) + 벤치 + 대나무 화분
    # ------------------------------------------------------------------
    for i in range(4):
        y = 0.18 + i * 0.22 - 0.18
        finish(lathe([(0.0, 0.0), (0.34, 0.0), (0.42, 0.36), (0.38, 0.36), (0.31, 0.04), (0.0, 0.04)], seg=20, pos=(-3.5, y, 5.6), rot=(0, i * 0.4, 0)), yellow, ol=True, ol_t=0.03)
    finish(torus(0.28, 0.02, seg=14, rseg=4, pos=(-3.5, 1.02, 5.6), rot=(math.pi / 2, 0, 0)), material('ink', 0x2563eb))
    bench_model(Grp((4.2, 0, D / 2 + 1.8), (0, math.pi, 0)), plank, iron2)
    for x in (-5.4, 5.6):
        finish(cyl(0.45, 0.5, 0.6, seg=12, pos=(x, 0.3, 5.0)), trim, bevel=0.03, jitter=0.05, ol=True, ol_t=0.03)
        for k in range(5):
            a = TAU * k / 5
            h = random.uniform(1.6, 2.6)
            px, pz = x + math.cos(a) * 0.2, 5.0 + math.sin(a) * 0.2
            finish(cyl(0.05, 0.05, h, seg=6, pos=(px, 0.6 + h / 2, pz), rot=(random.uniform(-0.08, 0.08), 0, random.uniform(-0.08, 0.08))), bamboo)
            for j in range(int(h / 0.5)):
                finish(cyl(0.065, 0.065, 0.04, seg=6, pos=(px, 0.9 + j * 0.5, pz)), bamboo_dk)
            for j in range(2):
                finish(sphere(0.22, seg=6, rings=4, pos=(px + random.uniform(-0.2, 0.2), 0.6 + h - 0.1 * j, pz + random.uniform(-0.2, 0.2)), scale=(1.6, 0.25, 0.7), rot=(0, random.uniform(0, 3), 0.3)), leaf)
