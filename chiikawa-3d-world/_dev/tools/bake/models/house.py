# 🏠 치이카와의 집 (광장 북쪽) — 원래 배치(town_hq.js house())와 같은 크기·위치
# 움직이는/빛나는 부품(창문 유리·커튼·문 손잡이·꼭대기 별·굴뚝 연기)은 게임에서 그대로 쓰므로 위치를 맞춤
import math, random
from lib import *

R = 5.6


def build():
    random.seed(11)
    plaster = material('plaster', 0xfff8ea, 'plaster', scale=1.2, amount=0.07)
    wood = material('wood', 0xa86b3c, 'wood', scale=1.5, amount=0.22)
    wood_l = material('wood_light', 0xd9a066, 'wood', scale=2.0, amount=0.2)
    stone = material('stone', 0xd2c8b5, 'stone', scale=2.0, amount=0.2)
    mortar = material('mortar', 0xbdb4a4, 'stone', scale=3.0, amount=0.1)
    shingle = material('shingle', 0xff8fab, 'plaster', scale=3.0, amount=0.06)
    shingle_dk = material('shingle_dk', 0xff6b8f)
    roof_base = material('roof_base', 0xd9667f)
    brick = material('brick', 0xc8644f, 'stone', scale=6.0, amount=0.15)
    iron = material('iron', 0x3b3550)
    cream = material('cream', 0xefe0c4, 'stone', scale=3.0, amount=0.1)
    green = material('leaf', 0x6cbf4a, 'plaster', scale=4.0, amount=0.15)
    green_dk = material('leaf_dk', 0x4e9a33)
    soil = material('soil', 0x7a4a22)
    white = material('white', 0xffffff)
    pink = material('pink', 0xff8fab)
    terracotta = material('terra', 0xe07a5f, 'plaster', scale=3.0, amount=0.1)

    # ------------------------------------------------------------------
    # 돌 기초: 둥근 돌 2단 + 안쪽 모르타르
    # ------------------------------------------------------------------
    finish(cyl(R + 0.25, R + 0.45, 0.66, seg=48, pos=(0, 0.33, 0)), mortar, bevel=0.04, ol=True, ol_t=0.02)
    for row, (y, n, rr) in enumerate([(0.2, 34, R + 0.5), (0.52, 32, R + 0.36)]):
        for i in range(n):
            a = TAU * (i + 0.5 * row) / n + random.uniform(-0.03, 0.03)
            if row == 1 and abs(math.sin(a) - 1) < 0.05:
                pass
            s = random.uniform(0.82, 1.08)
            st = rounded_pebble(0.36 * s, seed=row * 100 + i, pos=(math.cos(a) * rr, y, math.sin(a) * rr),
                                rot=(0, -a, 0), scale=(1.15, 0.62, 0.8))
            finish(st, stone, tint=(1, 1, 1), jitter=0.07)

    # ------------------------------------------------------------------
    # 회벽 돔 + 나무 골조
    # ------------------------------------------------------------------
    finish(sphere_cap(R, 0.0, math.pi * 0.62, seg=56, rings=24, pos=(0, 0.55, 0)), plaster, ol=True, ol_t=0.025)
    for i in range(8):
        a = (i / 8) * TAU + math.pi / 8
        if abs(math.sin(a) - 1) < 0.3:
            continue
        rib = torus(R + 0.04, 0.11, seg=18, rseg=4, arc=math.pi * 0.42, pos=(0, 0.55, 0), rot=(0, -a, math.pi / 2 - math.pi * 0.42 + 0.02))
        finish(rib, wood, bevel=0.025, seg=1, smooth=False)
    belt = torus(R * 0.93 + 0.05, 0.13, seg=64, rseg=4, pos=(0, 2.6, 0), rot=(math.pi / 2, 0, 0))
    finish(belt, wood, bevel=0.03, seg=1, smooth=False, ol=True, ol_t=0.02)
    # 벽 아래 담쟁이(둥근 잎 뭉치)
    for k in range(26):
        a = math.pi / 2 + random.uniform(0.95, 1.75) * (1 if k % 2 else -1)
        y = random.uniform(0.9, 2.2)
        rw = math.sqrt(max(0.1, R * R - (y - 0.55) ** 2)) + 0.05
        lf = sphere(random.uniform(0.18, 0.3), seg=8, rings=6, pos=(math.cos(a) * rw, y, math.sin(a) * rw), scale=(1, 0.7, 0.6))
        finish(lf, green if k % 3 else green_dk, jitter=0.1)

    # ------------------------------------------------------------------
    # 기와 지붕: 진짜 비늘 기와를 한 장씩
    # ------------------------------------------------------------------
    roofR = R + 0.25
    finish(sphere_cap(roofR, 0.0, math.pi * 0.3, seg=56, rings=14, pos=(0, 0.6, 0)), roof_base)
    rows = 13
    for j in range(rows):
        th = math.pi * 0.3 * (1 - j / rows) + 0.004
        if th < 0.05:
            continue
        circ = TAU * roofR * math.sin(th)
        n = max(7, int(circ / 0.5))
        for i in range(n):
            ph = TAU * (i + (0.5 if j % 2 else 0)) / n
            sh = extrude_shape(arch_pts(0.54, 0.52, 5)[::-1], 0.05)
            # 아치를 뒤집어 아래쪽이 둥근 비늘 모양으로 (지붕면에 거의 붙게)
            M = frame_on_sphere(th, ph, roofR + 0.035, y0=0.6) @ Matrix.Rotation(math.pi, 4, 'Z') @ Matrix.Translation((0, -0.52, 0))
            M = M @ Matrix.Rotation(-0.02, 4, 'X')
            place_matrix(sh, M)
            finish(sh, shingle, smooth=False, tint=(1, 1, 1), jitter=0.05)
    # 가장자리 물결 장식 (닫힌 타원체)
    edgeY = 0.6 + roofR * math.cos(math.pi * 0.3)
    edgeR = roofR * math.sin(math.pi * 0.3)
    for i in range(28):
        a = (i / 28) * TAU
        sc = sphere(0.42, seg=12, rings=8, pos=(math.cos(a) * edgeR, edgeY - 0.1, math.sin(a) * edgeR), scale=(1, 0.42, 1))
        finish(sc, shingle_dk, jitter=0.04)
    # 꼭대기 손잡이 + 풍향계 막대 (별은 게임에서 회전)
    knobY = 0.6 + roofR + 0.25
    finish(sphere(0.55, seg=20, rings=14, pos=(0, knobY, 0)), shingle_dk, ol=True, ol_t=0.04)
    finish(torus(0.5, 0.08, seg=24, rseg=6, pos=(0, knobY - 0.35, 0), rot=(math.pi / 2, 0, 0)), material('gold', 0xfacc15))
    finish(cyl(0.05, 0.05, 1.3, seg=8, pos=(0, knobY + 0.9, 0)), iron)
    for d in range(4):
        arm = box(0.9, 0.04, 0.04, pos=(0, knobY + 0.85, 0), rot=(0, d * math.pi / 2, 0))
        finish(arm, iron, smooth=False)

    # ------------------------------------------------------------------
    # 벽돌 굴뚝 (한 장씩) — 원래 위치 (2.6, 3.6, -1.8)
    # ------------------------------------------------------------------
    cx, cy, cz = 2.6, 3.6, -1.8
    finish(box(1.12, 3.0, 1.12, pos=(cx, cy + 1.5, cz)), mortar, smooth=False)
    bw, bh = 0.4, 0.2
    for k in range(14):
        y = cy + 0.12 + k * 0.205
        off = (k % 2) * 0.2
        for side in range(4):
            for b in range(3):
                u = -0.4 + b * 0.4 + off - (0.2 if off and b == 2 else 0)
                if off and b == 2:
                    continue
                rot = side * math.pi / 2
                lx, lz = u, 0.6
                x = cx + lx * math.cos(rot) + lz * math.sin(rot)
                z = cz - lx * math.sin(rot) + lz * math.cos(rot)
                br = box(bw - 0.03, bh - 0.03, 0.12, pos=(x, y, z), rot=(0, rot, 0))
                finish(br, brick, bevel=0.018, seg=1, smooth=False, jitter=0.1)
    finish(box(1.55, 0.3, 1.55, pos=(cx, cy + 3.1, cz)), material('cap', 0x7d5a4a), bevel=0.06, ol=True, ol_t=0.03)
    finish(box(1.0, 0.12, 1.0, pos=(cx, cy + 3.3, cz)), material('cap_dk', 0x4a3a33), bevel=0.03)

    # ------------------------------------------------------------------
    # 아치 문 + 돌 아치 틀 (원래 문 그룹: (0, 0.7, R-0.55))
    # ------------------------------------------------------------------
    dx, dy, dz = 0, 0.7, R + 0.05   # town_hq.js의 doorG 위치와 같음
    # 문판: 세로 판자 5장 (위는 아치 모양에 맞춰 높이 조절)
    for k in range(5):
        x = -0.8 + k * 0.4
        top = 2.0 + math.sqrt(max(0.0, 1.0 - (abs(x) + 0.2) ** 2)) * 0.98
        pl = box(0.37, top, 0.2, pos=(dx + x, dy + top / 2, dz + 0.18))
        finish(pl, wood_l, bevel=0.03, seg=1, smooth=False, jitter=0.06)
    for yb in (0.55, 2.0):
        finish(box(1.95, 0.14, 0.06, pos=(dx, dy + yb, dz + 0.3)), iron, bevel=0.015, smooth=False)
        for sx in (-0.75, -0.25, 0.25, 0.75):
            finish(sphere(0.035, seg=6, rings=4, pos=(dx + sx, dy + yb, dz + 0.34)), material('rivet', 0x9ca3af))
    finish(extrude_shape(arch_pts(2.3, 3.15, 16), 0.5, pos=(dx, dy, dz - 0.2)), material('niche', 0x8a6a52), smooth=False)
    # 돌 아치 쐐기돌 (좌우 기둥 + 반원 9개)
    for side in (-1, 1):
        for k in range(4):
            blk = box(0.28, 0.48, 0.5, pos=(dx + side * 1.15, dy + 0.25 + k * 0.5, dz + 0.1))
            finish(blk, cream, bevel=0.04, seg=2, smooth=False, jitter=0.05, ol=(k == 0), ol_t=0.02)
    for k in range(9):
        a = math.pi * (k + 0.5) / 9
        rr = 1.17
        blk = box(0.28, 0.36 if k != 4 else 0.46, 0.52, pos=(dx + math.cos(a) * 1.15, dy + 2.0 + math.sin(a) * 1.15, dz + 0.1), rot=(0, 0, a - math.pi / 2))
        finish(blk, cream if k != 4 else material('key', 0xffe4b5, 'stone', 3.0, 0.08), bevel=0.04, seg=2, smooth=False, jitter=0.05)
    # 문 옆 랜턴 (철제 받침 + 등 몸통)
    lx = dx + 1.75
    finish(box(0.08, 0.08, 0.5, pos=(lx, dy + 2.45, dz + 0.35)), iron, smooth=False)
    finish(box(0.36, 0.5, 0.36, pos=(lx, dy + 2.2, dz + 0.58)), iron, bevel=0.03, smooth=False)
    finish(box(0.28, 0.4, 0.38, pos=(lx, dy + 2.2, dz + 0.58)), material('lamp', 0xffe9a8))
    finish(cyl(0.02, 0.26, 0.18, seg=4, pos=(lx, dy + 2.54, dz + 0.58), rot=(0, math.pi / 4, 0)), iron, smooth=False)

    # ------------------------------------------------------------------
    # 줄무늬 차양 (천 띠를 실제로 번갈아) — 원래 그룹 (0, 4.05, R-0.45), 기울기 0.42
    # ------------------------------------------------------------------
    ax, ay, az, tilt = 0, 4.4, R + 0.2, 0.42   # 문을 앞으로 내놓은 만큼 차양도 앞·위로
    def awn_local(x, y, z):
        c, s = math.cos(tilt), math.sin(tilt)
        return (ax + x, ay + y * c - z * s, az + y * s + z * c)
    for k in range(8):
        x = -1.31 + k * 0.375
        st = box(0.375, 0.08, 1.3, pos=awn_local(x, 0, 0.6), rot=(tilt, 0, 0))
        finish(st, pink if k % 2 == 0 else white, bevel=0.015, seg=1, smooth=False, ol=(k == 0), ol_t=0.02)
    for i in range(7):
        sc = cyl(0.21, 0.21, 0.08, seg=12, pos=awn_local(-1.29 + i * 0.43, 0, 1.25), rot=(tilt + math.pi / 2, 0, 0))
        finish(sc, white if i % 2 else pink)
    for side in (-1, 1):
        finish(box(0.06, 0.06, 0.9, pos=awn_local(side * 1.45, -0.25, 0.45), rot=(tilt - 0.5, 0, 0)), iron, smooth=False)

    # ------------------------------------------------------------------
    # 계단 2단 + 디딤돌 길 + 발판
    # ------------------------------------------------------------------
    for i in range(2):
        st = box(2.8 - i * 0.4, 0.25, 0.9, pos=(0, 0.12 + i * 0.25, R + 0.85 - i * 0.45))
        finish(st, stone, bevel=0.05, seg=2, smooth=False, ol=True, ol_t=0.015)
    for k in range(4):
        ps = cyl(0.42, 0.45, 0.1, seg=14, pos=(random.uniform(-0.25, 0.25), 0.05, R + 2.9 + k * 0.95), scale=(1.1, 1, 0.85))
        finish(ps, stone, bevel=0.03, jitter=0.06)
    mat_ = box(1.8, 0.05, 0.9, pos=(0, 0.05, R + 2.0))
    finish(mat_, material('mat', 0xffd1dc), bevel=0.02, smooth=False)
    for k in range(5):
        finish(box(0.16, 0.055, 0.9, pos=(-0.72 + k * 0.36, 0.052, R + 2.0)), pink, smooth=False)

    # ------------------------------------------------------------------
    # 동그란 창문 (나무틀 + 창살 + 창턱 + 덧문 + 화분 상자) — 유리·커튼은 게임 부품
    # ------------------------------------------------------------------
    for side in (-1, 1):
        a = math.pi / 2 + side * 0.62
        wx, wz = math.cos(a) * (R - 0.15), math.sin(a) * (R - 0.15)
        ry = look_out(wx, wz)
        def wl(x, y, z):
            c, s = math.cos(ry), math.sin(ry)
            return (wx + x * c + z * s, 3.0 + y, wz - x * s + z * c)
        finish(torus(0.86, 0.17, seg=28, rseg=8, pos=wl(0, 0, 0), rot=(0, ry, 0)), wood, ol=True, ol_t=0.03)
        finish(box(1.62, 0.08, 0.07, pos=wl(0, 0, 0.02), rot=(0, ry, 0)), wood, smooth=False)
        finish(box(0.08, 1.62, 0.07, pos=wl(0, 0, 0.02), rot=(0, ry, 0)), wood, smooth=False)
        finish(box(1.9, 0.14, 0.42, pos=wl(0, -0.98, 0.16), rot=(0, ry, 0)), cream, bevel=0.04, smooth=False)
        # 열린 덧문 (판자 3장씩)
        for sd in (-1, 1):
            for k in range(3):
                sh = box(0.26, 1.3, 0.06, pos=wl(sd * (1.12 + k * 0.27), 0, 0.05), rot=(0, ry, 0))
                finish(sh, material('shutter', 0x7fb685, 'wood', 2.0, 0.15), bevel=0.015, seg=1, smooth=False, jitter=0.04)
            finish(box(0.84, 0.08, 0.08, pos=wl(sd * 1.39, 0.4, 0.1), rot=(0, ry, 0)), wood, smooth=False)
            finish(box(0.84, 0.08, 0.08, pos=wl(sd * 1.39, -0.4, 0.1), rot=(0, ry, 0)), wood, smooth=False)
        # 화분 상자 + 꽃
        bx, by, bz = wx * 1.03, 1.95, wz * 1.03
        def bl(x, y, z):
            c, s = math.cos(ry), math.sin(ry)
            return (bx + x * c + z * s, by + y, bz - x * s + z * c)
        finish(box(1.7, 0.42, 0.5, pos=bl(0, 0, 0), rot=(0, ry, 0)), wood, bevel=0.04, smooth=False, ol=True, ol_t=0.02)
        finish(box(1.55, 0.06, 0.38, pos=bl(0, 0.2, 0)), soil, smooth=False)
        cols = [0xff85a2, 0xfde047, 0xffffff, 0xc084fc, 0xfb7185]
        for k in range(7):
            x = -0.68 + k * 0.226
            hgt = random.uniform(0.25, 0.45)
            finish(cyl(0.025, 0.025, hgt, seg=5, pos=bl(x, 0.2 + hgt / 2, random.uniform(-0.08, 0.08))), green_dk)
            col = random.choice(cols)
            for pk in range(5):
                pa = TAU * pk / 5
                pt = sphere(0.075, seg=8, rings=6, pos=bl(x + math.cos(pa) * 0.08, 0.2 + hgt, math.sin(pa) * 0.08), scale=(1, 0.5, 1))
                finish(pt, material('petal_%x' % col, col))
            finish(sphere(0.05, seg=6, rings=4, pos=bl(x, 0.22 + hgt, 0)), material('center', 0xfacc15))
            finish(sphere(0.1, seg=6, rings=4, pos=bl(x + 0.08, 0.28, 0.08), scale=(1, 0.6, 1)), green)

    # ------------------------------------------------------------------
    # 집 앞 소품: 우체통, 화분 2개, 울타리, 피크닉 매트 + 케이크
    # ------------------------------------------------------------------
    mx, mz = 3.4, R + 2.4
    finish(cyl(0.06, 0.07, 1.2, seg=8, pos=(mx, 0.6, mz)), wood, smooth=False)
    mb_ry = -0.4
    finish(box(0.5, 0.42, 0.75, pos=(mx, 1.38, mz), rot=(0, mb_ry, 0)), material('mailbox', 0xef4444), bevel=0.1, seg=3, ol=True, ol_t=0.03)
    finish(box(0.06, 0.32, 0.06, pos=(mx + 0.25, 1.62, mz + 0.08), rot=(0, mb_ry, 0.3)), material('flag', 0xfde047), smooth=False)
    for i, (x, z) in enumerate([(-2.2, R + 1.6), (2.2, R + 1.6)]):
        finish(cyl(0.42, 0.32, 0.6, seg=16, pos=(x, 0.3, z)), terracotta, bevel=0.03, ol=True, ol_t=0.03)
        finish(torus(0.42, 0.06, seg=20, rseg=6, pos=(x, 0.6, z), rot=(math.pi / 2, 0, 0)), terracotta)
        finish(cyl(0.38, 0.38, 0.05, seg=16, pos=(x, 0.58, z)), soil)
        if i:
            for k in range(4):
                finish(sphere(random.uniform(0.25, 0.35), seg=10, rings=7, pos=(x + random.uniform(-0.12, 0.12), 0.85 + k * 0.08, z + random.uniform(-0.12, 0.12))), green, jitter=0.08)
        else:
            for k in range(6):
                pa = TAU * k / 6
                finish(cyl(0.02, 0.02, 0.35, seg=5, pos=(x + math.cos(pa) * 0.18, 0.75, z + math.sin(pa) * 0.18)), green_dk)
                finish(sphere(0.1, seg=8, rings=6, pos=(x + math.cos(pa) * 0.18, 0.95, z + math.sin(pa) * 0.18)), material('fl_red', 0xff6b8a))
    # 울타리 (4.2m, 기둥 4) 위치 (-5.4, R+1.2), 회전 0.5
    fx, fz, fr = -5.4, R + 1.2, 0.5
    def fl(x, y):
        return (fx + x * math.cos(fr), y, fz - x * math.sin(fr))
    for k in range(4):
        x = -2.0 + k * (4.0 / 3)
        finish(box(0.18, 1.15, 0.18, pos=fl(x, 0.58), rot=(0, fr, 0)), wood_l, bevel=0.03, smooth=False, jitter=0.05)
        finish(cyl(0.0, 0.13, 0.18, seg=4, pos=fl(x, 1.24), rot=(0, fr + math.pi / 4, 0)), wood_l, smooth=False)
    for y in (0.45, 0.9):
        finish(box(4.2, 0.12, 0.08, pos=fl(0, y), rot=(0, fr, 0)), wood_l, bevel=0.02, smooth=False)
    # 피크닉 매트 + 케이크
    px, pz, pr = -4.6, 6.4, 0.3
    for k in range(6):
        u = -1.5 + k * 0.6
        finish(box(0.6, 0.05, 2.8, pos=(px + u * math.cos(pr), 0.05, pz - u * math.sin(pr)), rot=(0, pr, 0)),
               material('pic_a', 0xfb7185) if k % 2 == 0 else material('pic_b', 0xfff1f2), smooth=False)
    finish(cyl(0.6, 0.62, 0.42, seg=24, pos=(px, 0.29, pz)), material('cake', 0xf6d7a7, 'plaster', 4.0, 0.08), bevel=0.04, ol=True, ol_t=0.04)
    finish(cyl(0.64, 0.64, 0.1, seg=24, pos=(px, 0.53, pz)), white, bevel=0.04)
    for k in range(8):
        pa = TAU * k / 8
        finish(sphere(0.09, seg=8, rings=6, pos=(px + math.cos(pa) * 0.5, 0.6, pz + math.sin(pa) * 0.5)), white)
    finish(sphere(0.13, seg=10, rings=8, pos=(px, 0.68, pz)), material('berry', 0xef4444))
    # 기초 둘레 꽃밭 (문 양옆 반원)
    for side in (-1, 1):
        for k in range(10):
            a = math.pi / 2 + side * (0.45 + k * 0.09)
            rr = R + 0.85 + random.uniform(-0.1, 0.15)
            finish(sphere(random.uniform(0.22, 0.32), seg=8, rings=6, pos=(math.cos(a) * rr, 0.22, math.sin(a) * rr), scale=(1, 0.75, 1)), green, jitter=0.1)
            if k % 2 == 0:
                col = random.choice([0xff85a2, 0xfde047, 0xffffff, 0xc084fc])
                finish(sphere(0.09, seg=6, rings=4, pos=(math.cos(a) * rr, 0.48, math.sin(a) * rr)), material('pf_%x' % col, col))
