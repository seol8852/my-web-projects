# 🏠 하치와레의 동굴 집 — 원래 배치(town_hq.js hachiCave())와 같은 크기·위치
# 게임 부품(그대로 사용): 동그란 창문 유리 2개(밤에 빛남), 빨래 3장(바람), 종이 등불 2개, 연통 연기
import math, random
from lib import *

SX, SY, SZ = 1.0, 0.78, 0.92   # 언덕 찌그러짐 (원래 mound.scale)
R = 7.0


def mound_pt(theta, phi, r=R, out=0.0):
    """언덕 표면 점 (theta: 꼭대기에서 각, phi: xz 평면 각 (π/2 = 정면 +z))"""
    rr = r + out
    return (rr * math.sin(theta) * math.cos(phi) * SX, rr * math.cos(theta) * SY, rr * math.sin(theta) * math.sin(phi) * SZ)


def build():
    random.seed(23)
    rock = material('rock', 0xaeb394, 'stone', 0.45, 0.16, color2=0x93a07c)
    rock_dk = material('rock_dk', 0x9a9c88, 'stone', 2.0, 0.22)
    stone = material('stone', 0xd6d0c2, 'stone', 2.2, 0.18)
    grass = material('grass', 0x7cc35a, 'plaster', 2.0, 0.12)
    grass_dk = material('grass_dk', 0x5fa63e)
    leaf = material('leaf', 0x6cbf4a, 'plaster', 4.0, 0.15)
    leaf2 = material('leaf2', 0x5fae3e, 'plaster', 4.0, 0.15)
    leaf3 = material('leaf3', 0x4e9a33)
    wood = material('wood', 0xa86b3c, 'wood', 1.6, 0.22)
    wood_dk = material('wood_dk', 0x8a5a2b, 'wood', 1.6, 0.22)
    ring_wood = material('ring_wood', 0xe0b47c, 'wood', 3.0, 0.15)
    cream = material('cream', 0xfff3d6, 'plaster', 3.0, 0.06)
    door_m = material('door', 0x8ecae6, 'wood', 1.4, 0.15)
    gold = material('gold', 0xfacc15)
    iron = material('iron', 0x6b7280, 'plaster', 3.0, 0.08)
    iron_dk = material('iron_dk', 0x4b5563)
    white = material('white', 0xffffff)
    blue = material('blue', 0x60a5fa)
    pink = material('pink', 0xf9a8d4)
    rope = material('rope', 0xe9d5a8)
    stem = material('stem', 0x4f9a2f)
    center = material('center', 0xfacc15)

    # ------------------------------------------------------------------
    # 바위 언덕 (원래 SphereGeometry(7) 반구, scale (1, 0.78, 0.92)) + 박힌 바위 + 꼭대기 잔디
    # ------------------------------------------------------------------
    finish(sphere_cap(R, 0.0, math.pi / 2, seg=64, rings=24, scale=(SX, SY, SZ)), rock, ol=True, ol_t=0.015)
    for i in range(64):  # 표면에 반쯤 묻힌 바위 (문·창문 자리는 비움)
        th = random.uniform(0.45, 1.5)
        ph = random.uniform(0, TAU)
        if math.sin(ph) > 0.55 and th > 0.75:
            continue  # 문 쪽
        if any(abs(math.atan2(math.sin(ph - wa), math.cos(ph - wa))) < 0.25 and abs(th - 1.15) < 0.3 for wa in (math.pi / 2 + 0.75, math.pi / 2 - 0.75)):
            continue  # 창문
        s = random.uniform(0.35, 0.8)
        p = mound_pt(th, ph, out=-s * 0.35)
        finish(rounded_pebble(s, seed=300 + i, pos=p, rot=(random.uniform(0, 3), random.uniform(0, 3), 0), scale=(1.2, 0.7, 1.0)), rock_dk if i % 3 == 0 else rock, jitter=0.08)
    # 꼭대기 잔디 (원래 r7.12, 0~0.2π) + 가장자리 늘어진 잔디 혀
    finish(sphere_cap(R + 0.12, 0.0, math.pi * 0.2, seg=64, rings=8, scale=(SX, SY, SZ)), grass, ol=True, ol_t=0.015)
    for i in range(30):
        ph = TAU * i / 30 + random.uniform(-0.05, 0.05)
        th = math.pi * 0.2 + random.uniform(0.0, 0.08)
        p = mound_pt(th, ph, out=0.05)
        finish(sphere(random.uniform(0.35, 0.55), seg=8, rings=6, pos=p, scale=(1, 0.45, 1)), grass if i % 2 else grass_dk, jitter=0.08)
    for i in range(40):  # 풀잎 덤불
        ph = random.uniform(0, TAU); th = random.uniform(0.0, math.pi * 0.19)
        p = mound_pt(th, ph, r=R + 0.12)
        finish(cyl(0.0, 0.08, 0.35, seg=4, pos=(p[0], p[1] + 0.12, p[2]), rot=(random.uniform(-0.3, 0.3), 0, random.uniform(-0.3, 0.3))), grass_dk, smooth=False)
    # 언덕 위 덤불 3개 (원래 bush(1.0) at (-2,-1.5), (2.4,-0.8), (0.5,-3), y 5.0 - i*0.2)
    for i, (x, z) in enumerate([(-2, -1.5), (2.4, -0.8), (0.5, -3)]):
        bush_model(Grp((x, 5.0 - i * 0.2, z)), 1.0, [leaf, leaf2, leaf3], seed=40 + i, berries=pink if i == 1 else None)
    # 꽃 무리 (원래 flowerCluster(8, 1.2) at (0, 5.35, 1.2))
    cols = [0xff85a2, 0xfde047, 0xffffff, 0xc084fc]
    for k in range(12):
        x = random.uniform(-1.4, 1.4); z = 1.2 + random.uniform(-1.0, 1.0)
        y = 5.46 * math.sqrt(max(0.0, 1 - (x * x + (z / SZ) ** 2) / (R * R))) * 1.0 - 0.05
        flower(x, y, z, cols[k % 4], (stem, center), size=1.3, stem=0.35)

    # ------------------------------------------------------------------
    # 언덕 둘레 바위 (원래 14개, 반지름 6.8/6.3, 정면 비움)
    # ------------------------------------------------------------------
    for i in range(14):
        a = (i / 14) * TAU
        if abs(math.sin(a) - 1) < 0.25:
            continue
        s = 0.9 + random.random() * 0.8
        finish(rounded_pebble(s * 0.85, seed=500 + i, pos=(math.cos(a) * 6.8, 0.35, math.sin(a) * 6.3), rot=(0, random.uniform(0, 3), 0), scale=(1.1, 0.7, 1.0)), rock_dk, jitter=0.07, ol=True, ol_t=0.03)
        for k in range(2):  # 사이사이 작은 돌
            aa = a + (k - 0.5) * 0.18
            finish(rounded_pebble(0.28, seed=560 + i * 3 + k, pos=(math.cos(aa) * 7.4, 0.12, math.sin(aa) * 6.9), scale=(1, 0.6, 1)), stone, jitter=0.08)

    # ------------------------------------------------------------------
    # 둥근 나무문 (원래 doorW(2.0, 2.9, 0x8ecae6) at z 6.15) + 돌 아치
    # ------------------------------------------------------------------
    arch_door(Grp((0, 0, 6.15)), 2.0, 2.9, cream, door_m, gold, plank_n=5)
    # 문 안쪽 어두운 틈 메우기(언덕 표면과 문 사이)
    finish(extrude_shape(arch_pts(2.7, 3.2, 16), 1.2, pos=(0, 0, 5.5)), rock_dk, smooth=False)
    for i in range(9):  # 원래 반원 반지름 1.45, 중심 y1.95, z6.25
        a = math.pi * (i / 8)
        x = math.cos(a) * 1.45
        y = 1.95 + math.sin(a) * 1.45 * (0 if i in (0, 8) else 1)
        if i in (0, 8):
            y = 0.4
        finish(rounded_pebble(0.42, seed=700 + i, pos=(x, y, 6.25), rot=(0, 0, a), scale=(1.0, 0.8, 0.8)), stone, jitter=0.07, ol=True, ol_t=0.03)
    for x in (-1.45, 1.45):
        finish(rounded_pebble(0.42, seed=720 + int(x > 0), pos=(x, 1.2, 6.25), scale=(0.9, 1.0, 0.8)), stone, jitter=0.07, ol=True, ol_t=0.03)
    # 문 앞 발판
    finish(cyl(1.1, 1.2, 0.12, seg=20, pos=(0, 0.06, 6.95), scale=(1, 1, 0.55)), stone, bevel=0.03, smooth=False, jitter=0.05)

    # ------------------------------------------------------------------
    # 동그란 창문 2개: 나무 틀 + 십자 창살 + 꽃상자 (유리 r0.6 z-0.02 는 게임 부품)
    # ------------------------------------------------------------------
    for side in (-1, 1):
        a = math.pi / 2 + side * 0.75
        wx, wz = math.cos(a) * 6.55, math.sin(a) * 6.0   # town_hq.js 와 같이 언덕 표면으로 꺼냄 + 경사만큼 뒤로 기울임
        G = Grp((wx, 2.0, wz), (0, math.atan2(wx, wz), 0)).sub(rot=(-0.42, 0, 0))
        finish(G(torus(0.62, 0.13, seg=28, rseg=8)), wood, ol=True, ol_t=0.04)
        finish(G(torus(0.74, 0.06, seg=28, rseg=5, pos=(0, 0, -0.08))), stone)
        finish(G(box(1.2, 0.06, 0.05, pos=(0, 0, 0.02))), wood, smooth=False)
        finish(G(box(0.06, 1.2, 0.05, pos=(0, 0, 0.02))), wood, smooth=False)
        # 바깥 돌 테
        for k in range(10):
            ka = TAU * k / 10
            finish(G(rounded_pebble(0.17, seed=800 + k + side * 20, pos=(math.cos(ka) * 0.86, math.sin(ka) * 0.86, -0.06), scale=(1.2, 1, 0.7))), stone, jitter=0.07)
        # 꽃상자
        finish(G(box(1.3, 0.3, 0.38, pos=(0, -0.9, 0.12))), wood_dk, bevel=0.03, seg=1, smooth=False, ol=True, ol_t=0.02)
        finish(G(box(1.2, 0.04, 0.3, pos=(0, -0.74, 0.12))), material('soil', 0x6b4423), smooth=False)
        for k in range(5):
            p = G.p(-0.48 + k * 0.24, -0.74, 0.12 + random.uniform(-0.05, 0.05))
            flower(p[0], p[1], p[2], cols[(k + side) % 4], (stem, center), size=0.9, stem=0.2)

    # ------------------------------------------------------------------
    # 연통 (원래 r0.28 h2.2 at (-2.4, 5.4, -1.2), 갓 y6.75) — 연기는 게임 부품
    # ------------------------------------------------------------------
    finish(cyl(0.28, 0.28, 2.2, seg=14, pos=(-2.4, 5.4, -1.2)), iron, ol=True, ol_t=0.05)
    for y in (4.9, 5.7, 6.3):
        finish(torus(0.3, 0.04, seg=14, rseg=4, pos=(-2.4, y, -1.2), rot=(math.pi / 2, 0, 0)), iron_dk)
    finish(cyl(0.0, 0.55, 0.45, seg=14, pos=(-2.4, 6.75, -1.2)), iron_dk, ol=True, ol_t=0.03)
    for k in range(3):
        a = TAU * k / 3
        finish(box(0.04, 0.3, 0.04, pos=(-2.4 + math.cos(a) * 0.3, 6.55, -1.2 + math.sin(a) * 0.3)), iron_dk, smooth=False)
    for k in range(6):  # 연통 밑동 돌무더기
        a = TAU * k / 6
        finish(rounded_pebble(0.22, seed=900 + k, pos=(-2.4 + math.cos(a) * 0.4, 4.45, -1.2 + math.sin(a) * 0.4), scale=(1, 0.6, 1)), stone, jitter=0.07)

    # ------------------------------------------------------------------
    # 앞마당: 원탁 + 찻잔·주전자, 그루터기 의자 2개
    # ------------------------------------------------------------------
    tx, tz = 3.6, 9.2
    finish(cyl(1.0, 1.0, 0.14, seg=28, pos=(tx, 1.0, tz)), ring_wood, bevel=0.03, ol=True, ol_t=0.04)
    finish(cyl(1.06, 1.06, 0.05, seg=28, pos=(tx, 0.92, tz)), wood_dk)
    finish(cyl(0.14, 0.3, 1.0, seg=12, pos=(tx, 0.5, tz)), wood_dk)
    for k in range(3):
        a = TAU * k / 3
        finish(box(0.12, 0.12, 0.7, pos=(tx + math.cos(a) * 0.3, 0.08, tz + math.sin(a) * 0.3), rot=(0, -a + math.pi / 2, 0)), wood_dk, bevel=0.02, seg=1, smooth=False)
    finish(cyl(0.7, 0.7, 0.01, seg=24, pos=(tx, 1.075, tz)), material('cloth', 0xfde2e4))
    for (x, z, c) in ((0.35, 0.2, white), (-0.35, -0.15, material('cup_b', 0x8ecae6))):
        finish(lathe([(0, 0), (0.11, 0), (0.14, 0.2), (0.12, 0.2), (0.09, 0.03), (0, 0.03)], seg=14, pos=(tx + x, 1.07, tz + z)), c, ol=True, ol_t=0.015)
        finish(torus(0.06, 0.015, seg=10, rseg=4, pos=(tx + x + 0.15, 1.17, tz + z)), c)
        finish(cyl(0.2, 0.2, 0.02, seg=14, pos=(tx + x, 1.075, tz + z)), white)
    kp = (tx, 1.07, tz - 0.4)
    finish(lathe([(0, 0), (0.2, 0), (0.27, 0.15), (0.24, 0.32), (0.12, 0.4), (0.08, 0.46), (0, 0.46)], seg=16, pos=kp), pink, ol=True, ol_t=0.02)
    finish(sphere(0.05, seg=8, rings=5, pos=(kp[0], kp[1] + 0.5, kp[2])), white)
    finish(cyl(0.025, 0.05, 0.3, seg=8, pos=(kp[0] + 0.3, kp[1] + 0.27, kp[2]), rot=(0, 0, -0.9)), pink)
    finish(torus(0.13, 0.025, seg=12, rseg=4, arc=math.pi, pos=(kp[0] - 0.24, kp[1] + 0.24, kp[2]), rot=(0, 0, math.pi / 2)), pink)
    for (x, z) in ((2.2, 9.6), (5.0, 9.0)):
        finish(cyl(0.45, 0.5, 0.6, seg=16, pos=(x, 0.3, z)), material('bark', 0x9a6a3c, 'wood', 3.0, 0.3), jitter=0.06, ol=True, ol_t=0.04)
        finish(cyl(0.44, 0.44, 0.02, seg=16, pos=(x, 0.6, z)), ring_wood)
        for k in range(3):  # 뿌리
            a = random.uniform(0, TAU)
            finish(cyl(0.05, 0.12, 0.45, seg=6, pos=(x + math.cos(a) * 0.5, 0.06, z + math.sin(a) * 0.5), rot=(0, -a, math.pi / 2 - 0.25), order='YXZ'), material('bark', 0x9a6a3c, 'wood', 3.0, 0.3))

    # ------------------------------------------------------------------
    # 빨랫줄 기둥 (원래 (-5.2, 8.0), (-1.8, 10.6) r0.08~0.1 h2.4) + 줄 + 집게 — 빨래는 게임 부품
    # ------------------------------------------------------------------
    p1 = (-5.2, 8.0); p2 = (-1.8, 10.6)
    for (x, z) in (p1, p2):
        finish(cyl(0.08, 0.1, 2.4, seg=8, pos=(x, 1.2, z)), wood_dk, jitter=0.05, ol=True, ol_t=0.03)
        finish(sphere(0.12, seg=8, rings=6, pos=(x, 2.42, z)), wood_dk)
    dx, dz = p2[0] - p1[0], p2[1] - p1[1]
    L = math.hypot(dx, dz)
    ry = math.atan2(dx, dz)
    for k in range(10):  # 살짝 처진 줄
        t0, t1 = k / 10, (k + 1) / 10
        y0 = 2.22 - math.sin(t0 * math.pi) * 0.08; y1 = 2.22 - math.sin(t1 * math.pi) * 0.08
        mx, mz = p1[0] + dx * (t0 + t1) / 2, p1[1] + dz * (t0 + t1) / 2
        seg = math.hypot(L / 10, y1 - y0)
        finish(box(0.03, 0.03, seg, pos=(mx, (y0 + y1) / 2, mz), rot=(0, ry, 0)), rope, smooth=False)
    for i in range(3):
        t = 0.22 + i * 0.28
        for s in (-0.25, 0.25):
            tt = t + s / L
            finish(box(0.05, 0.14, 0.05, pos=(p1[0] + dx * tt, 2.2 - math.sin(tt * math.pi) * 0.08, p1[1] + dz * tt)), material('peg', 0xfda4af), smooth=False)

    # ------------------------------------------------------------------
    # 파란 우체통 (원래 mailbox() 색만 바꿈, (-2.4, 0, 8.4))
    # ------------------------------------------------------------------
    mailbox_model(Grp((-2.4, 0, 8.4)), blue, wood_dk, gold)

    # ------------------------------------------------------------------
    # 종이 등불 걸이 (등불 (±1.6, 3.6, 6.6)은 게임 부품) — 언덕에서 뻗은 나무 팔
    # ------------------------------------------------------------------
    for x in (-1.6, 1.6):
        finish(box(0.14, 0.14, 2.9, pos=(x, 4.25, 5.3)), wood, bevel=0.02, seg=1, smooth=False, ol=True, ol_t=0.02)
        finish(box(0.12, 0.8, 0.12, pos=(x, 3.95, 4.75), rot=(0.75, 0, 0)), wood, smooth=False)
        finish(cyl(0.012, 0.012, 0.3, seg=4, pos=(x, 4.06, 6.6)), rope)
        finish(torus(0.05, 0.012, seg=8, rseg=3, pos=(x, 4.2, 6.6)), iron_dk)

    # ------------------------------------------------------------------
    # 징검돌 4개 (원래 r0.6~0.65 h0.12, (sin(i)*0.4, z 7.6 + i*1.3))
    # ------------------------------------------------------------------
    for i in range(4):
        x, z = math.sin(i) * 0.4, 7.6 + i * 1.3
        finish(cyl(0.6, 0.65, 0.14, seg=12, pos=(x, 0.06, z), rot=(0, random.uniform(0, 1), 0), scale=(1, 1, random.uniform(0.85, 1))), stone, bevel=0.04, smooth=False, jitter=0.06)
        for k in range(3):
            a = random.uniform(0, TAU)
            finish(cyl(0.0, 0.05, 0.22, seg=3, pos=(x + math.cos(a) * 0.72, 0.1, z + math.sin(a) * 0.72), rot=(random.uniform(-0.3, 0.3), 0, random.uniform(-0.3, 0.3))), grass_dk, smooth=False)
