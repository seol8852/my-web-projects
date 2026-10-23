# 🍎 마켓 거리 (과일 · 꽃 · 빵 노점) — 원래 배치(town_hq.js market() / marketStall())와 같은 크기·위치
# 게임 부품(그대로 사용): 노점 간판 3개(글씨), 가로등 유리 2개, 전구 15개(빛)
import math, random
from lib import *

KINDS = {'fruit': 0xf97316, 'flower': 0x22c55e, 'bread': 0xa855f7}


def stall(G, kind, M):
    col = KINDS[kind]
    cm = material('stall_' + kind, col)
    white = M['white']
    # 카운터 (원래 roundBox(4.0, 1.1, 1.8) y0.55) — 판자 앞판 + 각목 틀
    finish(G(box(3.9, 1.0, 1.7, pos=(0, 0.55, 0))), M['wood_dk'], smooth=False)
    for sz in (1, -1):
        for i in range(8):
            x = -1.95 + 0.25 + i * 0.5
            finish(G(box(0.47, 1.0, 0.06, pos=(x, 0.55, sz * 0.88))), M['plank'], bevel=0.015, seg=1, smooth=False, jitter=0.07, ol=(i == 0 and sz == 1), ol_t=0.03)
    for sx in (-1, 1):
        finish(G(box(0.06, 1.0, 1.7, pos=(sx * 1.98, 0.55, 0))), M['plank'], smooth=False, jitter=0.06)
        for sz in (-1, 1):
            finish(G(box(0.14, 1.1, 0.14, pos=(sx * 1.95, 0.55, sz * 0.86))), M['wood_dk'], bevel=0.02, seg=1, smooth=False)
    finish(G(box(3.9, 0.12, 0.08, pos=(0, 0.25, 0.92))), cm, smooth=False)
    # 상판 (원래 roundBox(4.3, 0.12, 2.1) y1.16)
    finish(G(box(4.3, 0.12, 2.1, pos=(0, 1.16, 0))), M['wood_dk'], bevel=0.03, seg=1, smooth=False, ol=True, ol_t=0.02)
    # 기둥 4개 (원래 r0.08, 뒤 h3.4 / 앞 h2.8, 색 0xfde68a) — 줄무늬 감기
    for (x, z) in ((-1.9, -0.8), (1.9, -0.8), (-1.9, 0.9), (1.9, 0.9)):
        h = 3.4 if z < 0 else 2.8
        finish(G(cyl(0.08, 0.08, h, seg=10, pos=(x, h / 2, z))), M['post'], ol=True, ol_t=0.025)
        for k in range(int(h / 0.45)):
            finish(G(torus(0.085, 0.02, seg=10, rseg=3, pos=(x, 0.3 + k * 0.45, z), rot=(math.pi / 2, 0, 0.3))), cm)
        finish(G(sphere(0.12, seg=10, rings=6, pos=(x, h + 0.04, z))), cm)
    # 줄무늬 차양 (원래 roundBox(4.6, 0.1, 2.6) at (0, 3.15, 0.1) 기울기 0.24)
    o = (0, 3.15, 0.1); rot = (0.24, 0, 0)
    for k in range(10):
        x = -2.3 + 0.23 + k * 0.46
        finish(G(box(0.46, 0.1, 2.6, pos=lpos(o, rot, (x, 0.015 * (k % 2), 0)), rot=rot)), cm if k % 2 == 0 else white, bevel=0.02, seg=1, smooth=False, ol=(k == 0), ol_t=0.02)
    # 물결 끝단 (원래 반원 9개 at (-2.04 + i*0.51, 2.83, 1.4))
    for i in range(9):
        finish(G(cyl(0.255, 0.255, 0.08, seg=12, pos=(-2.04 + i * 0.51, 2.83, 1.4), rot=(math.pi / 2, 0, 0))), white if i % 2 else cm)
    finish(G(box(4.62, 0.06, 0.1, pos=lpos(o, rot, (0, 0.07, 1.25)), rot=rot)), cm, smooth=False)
    # 간판 받침 (간판 (0, 3.75, -0.8)은 게임 부품)
    for x in (-1.0, 1.0):
        finish(G(box(0.1, 0.5, 0.1, pos=(x, 3.45, -0.85))), M['wood_dk'], smooth=False)

    if kind == 'fruit':
        fcols = [0xef4444, 0xfb923c, 0xfde047]
        for i, x in enumerate((-1.3, 0, 1.3)):
            bp = (x, 1.37, 0.2); br = (-0.2, 0, 0)
            finish(G(box(1.1, 0.06, 0.9, pos=lpos(bp, br, (0, -0.12, 0)), rot=br)), M['plank'], smooth=False)
            for sx in (-1, 1):
                finish(G(box(0.06, 0.3, 0.9, pos=lpos(bp, br, (sx * 0.52, 0, 0)), rot=br)), M['plank'], smooth=False)
            for sz in (-1, 1):
                finish(G(box(1.1, 0.3, 0.06, pos=lpos(bp, br, (0, 0, sz * 0.42)), rot=br)), M['plank'], bevel=0.01, seg=1, smooth=False, jitter=0.06)
            fm = material('fruit%d' % i, fcols[i])
            for k in range(11):  # 수북하게 쌓은 과일
                lx = -0.36 + (k % 4) * 0.24 + (0.12 if (k // 4) % 2 else 0)
                lz = -0.25 + (k // 4) * 0.24
                if lx > 0.42:
                    continue
                p = lpos(bp, br, (lx, 0.1 + (k // 4 == 1) * 0.06, lz))
                finish(G(sphere(0.15, seg=10, rings=8, pos=p)), fm, jitter=0.06)
                if i == 0:
                    finish(G(cyl(0.01, 0.01, 0.08, seg=4, pos=(p[0], p[1] + 0.16, p[2]))), M['stem'])
        # 포도송이 (원래 그룹 (1.6, 2.7, 0.7)) + 걸이
        for k in range(10):
            p = (1.6 + (k % 3 - 1) * 0.14, 2.7 - (k // 3) * 0.13, 0.7 + (k % 2) * 0.08)
            finish(G(sphere(0.09, seg=8, rings=6, pos=p)), M['grape'], jitter=0.06)
        finish(G(cyl(0.012, 0.012, 0.3, seg=4, pos=(1.6, 2.92, 0.72))), M['stem'])
        finish(G(sphere(0.12, seg=6, rings=4, pos=(1.68, 2.82, 0.72), scale=(1.4, 0.3, 1))), M['leaf'])
        # 바나나 송이 (앞 기둥에 매달림)
        for k in range(5):
            finish(G(torus(0.22, 0.045, seg=10, rseg=5, arc=math.pi * 0.55, pos=(-1.72, 2.25 - k * 0.02, 1.0 + (k - 2) * 0.06), rot=(0, (k - 2) * 0.15, 2.1))), M['banana'])
        # 가격표 칠판
        finish(G(box(0.7, 0.5, 0.04, pos=(-1.2, 0.75, 1.0), rot=(-0.15, 0, 0))), M['board'], bevel=0.01, seg=1, smooth=False)
        finish(G(box(0.78, 0.58, 0.03, pos=(-1.2, 0.75, 0.98), rot=(-0.15, 0, 0))), M['wood_dk'], smooth=False)
    elif kind == 'flower':
        bcols = [0x60a5fa, 0xf9a8d4, 0xfde68a, 0xa7f3d0]
        fl = [0xff85a2, 0xfde047, 0xffffff, 0xc084fc]
        for i, x in enumerate((-1.4, -0.5, 0.4, 1.3)):
            bm = material('bucket%d' % i, bcols[i])
            finish(G(lathe([(0, 0), (0.26, 0), (0.32, 0.5), (0.29, 0.5), (0.23, 0.04), (0, 0.04)], seg=16, pos=(x, 1.22, 0.25))), bm, ol=True, ol_t=0.03)
            finish(G(torus(0.31, 0.025, seg=16, rseg=4, pos=(x, 1.62, 0.25), rot=(math.pi / 2, 0, 0))), M['white'])
            finish(G(cyl(0.28, 0.28, 0.02, seg=14, pos=(x, 1.62, 0.25))), M['leaf'])
            for k in range(6):
                a = TAU * k / 6 + i
                p = G.p(x + math.cos(a) * 0.15, 1.6, 0.25 + math.sin(a) * 0.15)
                flower(p[0], p[1], p[2], fl[i], (M['stem'], M['center']), size=1.4, stem=0.45 + 0.08 * (k % 2))
        for x in (-1.6, 1.6):  # 화분 + 덤불 (원래 pot(bush) ×0.8 at (±1.6, 0, 1.6))
            pp = G.p(x, 0, 1.6)
            finish(lathe([(0.0, 0), (0.26, 0), (0.34, 0.44), (0.38, 0.48), (0.38, 0.56), (0.0, 0.56)], seg=16, pos=pp), M['terra'], ol=True, ol_t=0.03)
            finish(G(rounded_pebble(0.44, seed=int(x * 10) + 77, pos=(x, 0.84, 1.6))), M['leaf'], jitter=0.06, ol=True, ol_t=0.03)
            for k in range(4):
                a = TAU * k / 4 + 0.3
                finish(G(sphere(0.07, seg=6, rings=4, pos=(x + math.cos(a) * 0.38, 0.95, 1.6 + math.sin(a) * 0.38))), M['berry'])
        # 물뿌리개
        finish(G(cyl(0.18, 0.2, 0.32, seg=14, pos=(1.5, 1.38, -0.5))), M['tin'], ol=True, ol_t=0.02)
        finish(G(cyl(0.02, 0.04, 0.4, seg=6, pos=(1.75, 1.45, -0.5), rot=(0, 0, -0.9))), M['tin'])
    else:
        for k in range(6):  # 빵 (원래 r0.3 scale (1.3, 0.7, 0.9))
            p = (-1.5 + k * 0.55, 1.42, 0.25 + (k % 2) * 0.25)
            finish(G(sphere(0.3, seg=14, rings=10, pos=p, scale=(1.3, 0.7, 0.9))), M['bread'], ol=True, ol_t=0.03)
            for j in range(3):  # 칼집
                finish(G(box(0.04, 0.03, 0.34, pos=(p[0] - 0.18 + j * 0.18, p[1] + 0.19, p[2]), rot=(0, 0.4, 0))), M['crust'], smooth=False)
        # 바구니 (원래 r0.5/0.4 h0.4 at (1.4, 1.42, -0.4)) + 바게트 3개
        finish(G(lathe([(0, 0), (0.4, 0), (0.5, 0.4), (0.45, 0.4), (0.36, 0.04), (0, 0.04)], seg=18, pos=(1.4, 1.22, -0.4))), M['basket'], ol=True, ol_t=0.03)
        for y in (1.32, 1.45, 1.57):
            finish(G(torus(0.42 + (y - 1.22) * 0.25, 0.022, seg=18, rseg=4, pos=(1.4, y, -0.4), rot=(math.pi / 2, 0, 0))), M['basket_dk'])
        for k in range(3):
            finish(G(cyl(0.1, 0.1, 1.0, seg=10, pos=(1.3 + k * 0.12, 1.85, -0.4), rot=(0, 0, -0.3 + k * 0.25))), M['bread'])
            finish(G(sphere(0.1, seg=8, rings=6, pos=lpos((1.3 + k * 0.12, 1.85, -0.4), (0, 0, -0.3 + k * 0.25), (0, 0.5, 0)))), M['bread'])
        # 케이크 (원래 r0.35 h0.35 at (-1.3, 1.85, -0.45)) — 받침 + 크림 + 딸기
        finish(G(cyl(0.45, 0.4, 0.06, seg=18, pos=(-1.3, 1.25, -0.45))), M['white'])
        finish(G(cyl(0.05, 0.08, 0.25, seg=10, pos=(-1.3, 1.4, -0.45))), M['white'])
        finish(G(cyl(0.35, 0.35, 0.35, seg=20, pos=(-1.3, 1.7, -0.45))), M['cake'], ol=True, ol_t=0.02)
        finish(G(torus(0.35, 0.05, seg=20, rseg=5, pos=(-1.3, 1.87, -0.45), rot=(math.pi / 2, 0, 0))), M['white'])
        for k in range(6):
            a = TAU * k / 6
            finish(G(sphere(0.06, seg=8, rings=6, pos=(-1.3 + math.cos(a) * 0.22, 1.93, -0.45 + math.sin(a) * 0.22))), M['berry'])
        # 쟁반 위 쿠키
        finish(G(cyl(0.4, 0.4, 0.03, seg=16, pos=(0.4, 1.24, -0.5))), M['tin'])
        for k in range(5):
            a = TAU * k / 5
            finish(G(cyl(0.1, 0.1, 0.04, seg=10, pos=(0.4 + math.cos(a) * 0.22, 1.28, -0.5 + math.sin(a) * 0.22))), M['crust'])


def build():
    random.seed(53)
    M = {
        'white': material('white', 0xffffff),
        'wood_dk': material('wood_dk', 0x8a5a2b, 'wood', 1.6, 0.22),
        'plank': material('plank', 0xd9a066, 'wood', 1.8, 0.2),
        'post': material('post', 0xfde68a),
        'stem': material('stem', 0x4f9a2f),
        'center': material('center', 0xfacc15),
        'leaf': material('leaf', 0x5fae3e, 'plaster', 4.0, 0.15),
        'grape': material('grape', 0x7c3aed),
        'banana': material('banana', 0xfde047),
        'board': material('board', 0x1f2937),
        'terra': material('terra', 0xe07a5f, 'plaster', 3.0, 0.1),
        'berry': material('berry', 0xef4444),
        'tin': material('tin', 0x9ca3af, 'plaster', 3.0, 0.08),
        'bread': material('bread', 0xd4a056, 'plaster', 3.0, 0.12),
        'crust': material('crust', 0xa86b3c),
        'basket': material('basket', 0xd6a35c, 'wood', 4.0, 0.25),
        'basket_dk': material('basket_dk', 0xb8833f),
        'cake': material('cake', 0xfbcfe8),
    }
    iron = material('iron', 0x3b3550)
    gold = material('gold', 0xd4a017)
    cobble = material('cobble', 0xd8d0c0, 'stone', 1.5, 0.15)
    cobble_dk = material('cobble_dk', 0xbfb5a3, 'stone', 1.5, 0.15)
    ring_wood = material('ring_wood', 0xe0b47c, 'wood', 3.0, 0.15)
    red = material('red', 0xf43f5e)
    stool = material('stool', 0x60a5fa)
    wire = material('wire', 0x374151)

    # ------------------------------------------------------------------
    # 돌길 바닥 (원래 CircleGeometry(11) y0.04) — 동심원 판석
    # ------------------------------------------------------------------
    finish(cyl(11.0, 11.0, 0.06, seg=64, pos=(0, 0.03, 0)), cobble_dk)
    r0 = 0.0
    ring = 0
    while r0 < 10.9:
        r1 = min(11.0, r0 + 0.85)
        n = max(6, int(TAU * (r0 + r1) / 2 / 0.95))
        off = random.uniform(0, 1)
        for i in range(n):
            a0 = TAU * (i + off) / n
            span = TAU / n * 0.95
            ri = r0 + 0.04 if r0 > 0 else 0.0
            prof = [(ri, 0.06), (r1 - 0.04, 0.06), (r1 - 0.06, 0.1), (ri + (0.02 if ri > 0 else 0), 0.1), (ri, 0.06)]
            finish(lathe(prof, seg=2 if n > 20 else 4, phi0=a0, phi=span), cobble if (i + ring) % 5 else cobble_dk, smooth=False, jitter=0.07)
        r0 = r1
        ring += 1
    # 가장자리 연석
    for i in range(48):
        a = TAU * i / 48
        finish(box(1.4, 0.18, 0.3, pos=(math.cos(a) * 11.05, 0.09, math.sin(a) * 11.05), rot=(0, -a + math.pi / 2, 0)), cobble_dk, bevel=0.03, smooth=False, jitter=0.05)

    # ------------------------------------------------------------------
    # 노점 3개 (원래 a=(i-1)*0.5, 위치 (sin a*9, 0, -cos a*9 + 9), 회전 -a)
    # ------------------------------------------------------------------
    for i, kind in enumerate(('fruit', 'flower', 'bread')):
        a = (i - 1) * 0.5
        stall(Grp((math.sin(a) * 9, 0, -math.cos(a) * 9 + 9), (0, -a, 0)), kind, M)

    # ------------------------------------------------------------------
    # 가로등 2개 (원래 (±9, 0, 4) ry π/2) + 전구 줄 (전구는 게임 부품)
    # ------------------------------------------------------------------
    for x in (-9, 9):
        street_lamp_model(Grp((x, 0, 4), (0, math.pi / 2, 0)), iron, gold)
    pts = [(-9.0, 4.05, 4.0)]
    for i in range(15):
        t = i / 14
        pts.append((-8 + 16 * t, 4.4 - math.sin(t * math.pi) * 1.0 + 0.14, 4 - math.sin(t * math.pi) * 2.0))
    pts.append((9.0, 4.05, 4.0))
    for i in range(len(pts) - 1):
        p0, p1 = Vector(pts[i]), Vector(pts[i + 1])
        d = p1 - p0
        mid = (p0 + p1) / 2
        L = d.length
        yaw = math.atan2(d.x, d.z)
        pitch = -math.asin(max(-1, min(1, d.y / L)))
        finish(box(0.025, 0.025, L, pos=tuple(mid), rot=(pitch, yaw, 0), order='YXZ'), wire, smooth=False)
    for p in pts[1:-1]:
        finish(cyl(0.05, 0.05, 0.08, seg=8, pos=(p[0], p[1] - 0.05, p[2])), wire)

    # ------------------------------------------------------------------
    # 가운데 피크닉 테이블 + 파라솔 (원래 (0, 0, 4.8)) + 의자 4개
    # ------------------------------------------------------------------
    T = Grp((0, 0, 4.8))
    finish(T(cyl(1.1, 1.1, 0.12, seg=28, pos=(0, 1.0, 0))), ring_wood, bevel=0.03, ol=True, ol_t=0.04)
    finish(T(cyl(1.14, 1.14, 0.05, seg=28, pos=(0, 0.92, 0))), M['wood_dk'])
    finish(T(cyl(0.1, 0.1, 3.2, seg=10, pos=(0, 1.6, 0))), M['white'])
    finish(T(cyl(0.5, 0.6, 0.08, seg=16, pos=(0, 0.04, 0))), iron)
    finish(T(cyl(0.12, 0.25, 0.9, seg=12, pos=(0, 0.45, 0))), M['wood_dk'])
    # 파라솔 (원래 ConeGeometry(2.3, 0.8) y3.3, 빨강·흰 줄 6쌍)
    for k in range(12):
        finish(T(lathe([(2.3, 2.9), (1.2, 3.35), (0.0, 3.7)], seg=3, phi0=TAU * k / 12, phi=TAU / 12)), red if k % 2 == 0 else M['white'], ol=(k == 0), ol_t=0.03)
        finish(T(lathe([(0.0, 3.7), (1.2, 3.35), (2.3, 2.9)], seg=3, phi0=TAU * k / 12, phi=TAU / 12)), red if k % 2 == 0 else M['white'])
    for k in range(24):
        a = TAU * (k + 0.5) / 24
        finish(T(sphere(0.12, seg=8, rings=5, pos=(math.sin(a) * 2.3, 2.86, math.cos(a) * 2.3), scale=(1, 0.6, 1))), red if k % 2 == 0 else M['white'])
    finish(T(sphere(0.14, seg=10, rings=8, pos=(0, 3.78, 0))), gold)
    for k in range(4):  # 의자 (원래 r0.35/0.3 h0.65, 반지름 1.7, 각 k/4*2π+0.4)
        a = (k / 4) * TAU + 0.4
        p = (math.cos(a) * 1.7, 0, math.sin(a) * 1.7)
        finish(T(cyl(0.35, 0.35, 0.1, seg=16, pos=(p[0], 0.6, p[2]))), stool, bevel=0.03, ol=True, ol_t=0.04)
        for j in range(3):
            b = TAU * j / 3 + a
            finish(T(cyl(0.035, 0.05, 0.6, seg=6, pos=(p[0] + math.cos(b) * 0.22, 0.3, p[2] + math.sin(b) * 0.22), rot=(math.sin(b) * 0.12, 0, -math.cos(b) * 0.12))), M['white'])
        finish(T(torus(0.24, 0.025, seg=14, rseg=4, pos=(p[0], 0.25, p[2]), rot=(math.pi / 2, 0, 0))), M['white'])
    # 테이블 위 레모네이드 + 컵
    finish(T(lathe([(0, 0), (0.15, 0), (0.17, 0.35), (0.12, 0.42), (0, 0.42)], seg=14, pos=(0.35, 1.06, 0.2))), material('lemonade', 0xfde68a), ol=True, ol_t=0.015)
    for k in range(3):
        a = TAU * k / 3 + 1
        finish(T(cyl(0.08, 0.07, 0.18, seg=10, pos=(math.cos(a) * 0.6, 1.15, math.sin(a) * 0.6))), M['white'])
