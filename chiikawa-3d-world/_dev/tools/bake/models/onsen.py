# ♨️ 벚꽃 온천 — 원래 배치(town_hq.js onsen())와 같은 크기
# 게임 부품(그대로 사용): 온천 물(반지름 12.6, y0.22), 김, 정자 등불 2개, 석등 불빛 3개
import math, random
from lib import *


def quad(p0, p1, p2, n=12):
    pts = []
    for i in range(n + 1):
        t = i / n
        x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0]
        y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1]
        pts.append((x, y))
    return pts


def roof_profile():
    """원래 정자 지붕 단면 (휘어진 처마)"""
    top = quad((-5.6, 0), (-2.5, 0.6), (0, 2.6)) + quad((0, 2.6), (2.5, 0.6), (5.6, 0))[1:]
    bot = quad((5.6, -0.3), (2.5, 0.25), (0, 2.2)) + quad((0, 2.2), (-2.5, 0.25), (-5.6, -0.3))[1:]
    return top + bot


def stone_lantern(x, z, stone, roof_m):
    """석등 (원래 stoneLantern(): 불빛 상자 y2.38은 게임 부품)"""
    finish(cyl(0.7, 0.8, 0.35, seg=6, pos=(x, 0.17, z)), stone, bevel=0.04, smooth=False, ol=True, ol_t=0.03)
    finish(cyl(0.2, 0.3, 1.4, seg=8, pos=(x, 1.05, z)), stone, jitter=0.04)
    for y in (0.5, 1.6):
        finish(torus(0.26, 0.05, seg=10, rseg=4, pos=(x, y, z), rot=(math.pi / 2, 0, 0)), stone)
    finish(cyl(0.6, 0.48, 0.3, seg=6, pos=(x, 1.9, z)), stone, bevel=0.04, smooth=False, ol=True, ol_t=0.03)
    # 불 넣는 칸: 기둥 4개만 (가운데는 게임 불빛)
    for sx in (-1, 1):
        for sz in (-1, 1):
            finish(box(0.14, 0.62, 0.14, pos=(x + sx * 0.3, 2.38, z + sz * 0.3)), stone, smooth=False)
    finish(cyl(0.0, 0.88, 0.6, seg=6, pos=(x, 3.0, z)), roof_m, bevel=0.03, smooth=False, ol=True, ol_t=0.03)
    for k in range(6):  # 처마 끝 올라간 장식
        a = TAU * k / 6 + math.pi / 6
        finish(sphere(0.1, seg=6, rings=4, pos=(x + math.cos(a) * 0.82, 2.76, z + math.sin(a) * 0.82)), roof_m)
    finish(sphere(0.18, seg=10, rings=8, pos=(x, 3.42, z), scale=(1, 1.3, 1)), roof_m)
    # 이끼
    for k in range(4):
        a = random.uniform(0, TAU)
        finish(sphere(0.14, seg=6, rings=4, pos=(x + math.cos(a) * 0.6, 0.36, z + math.sin(a) * 0.6), scale=(1, 0.4, 1)), material('moss', 0x6fa04f))


def build():
    random.seed(71)
    rock = material('rock', 0xb9b3a6, 'stone', 1.5, 0.25)
    rock_dk = material('rock_dk', 0x8f8a80, 'stone', 1.8, 0.2)
    moss = material('moss', 0x6fa04f, 'plaster', 3.0, 0.2)
    bed = material('bed', 0x2f6f7a)
    deck_m = material('deck', 0xd9a066, 'wood', 1.8, 0.22)
    post_m = material('post', 0xb45309, 'wood', 1.6, 0.2)
    roof_m = material('roof', 0xf472b6, 'plaster', 3.0, 0.06)
    roof_dk = material('roof_dk', 0x9d174d)
    bamboo = material('bamboo', 0x86c55a, 'wood', 4.0, 0.12)
    bamboo_dk = material('bamboo_dk', 0x5f9a3c)
    rope = material('rope', 0x8a6a3a)
    stone = material('lantern', 0xc2bba9, 'stone', 2.5, 0.2)
    petal = material('petal', 0xffc2d6)

    # 바닥 (물 아래)
    finish(cyl(12.8, 13.0, 0.2, seg=48, pos=(0, 0.05, 0)), bed)
    # ------------------------------------------------------------------
    # 자연석 테두리 (크고 작은 돌 2겹 + 이끼)
    # ------------------------------------------------------------------
    for i in range(40):
        a = (i / 40) * TAU + random.uniform(-0.04, 0.04)
        r = 12.9 + random.uniform(-0.2, 0.6)
        s = random.uniform(0.9, 1.6)
        rk = rounded_pebble(s, seed=700 + i, pos=(math.cos(a) * r, 0.3, math.sin(a) * r), rot=(0, random.uniform(0, 6), 0), scale=(1.1, random.uniform(0.5, 0.75), 0.9))
        finish(rk, rock if i % 3 else rock_dk, jitter=0.08, ol=True, ol_t=0.03)
        if i % 2 == 0:
            finish(sphere(s * 0.45, seg=8, rings=6, pos=(math.cos(a) * r, 0.3 + s * 0.55, math.sin(a) * r), scale=(1.2, 0.35, 1)), moss, jitter=0.1)
    for i in range(18):
        a = random.uniform(0, TAU); r = 14.1 + random.uniform(0, 0.8)
        finish(rounded_pebble(random.uniform(0.35, 0.6), seed=800 + i, pos=(math.cos(a) * r, 0.15, math.sin(a) * r), scale=(1, 0.6, 1)), rock_dk, jitter=0.08)
    # 물 위 벚꽃잎
    for i in range(40):
        a = random.uniform(0, TAU); r = random.uniform(1.0, 12.0)
        finish(sphere(0.09, seg=6, rings=4, pos=(math.cos(a) * r, 0.235, math.sin(a) * r), scale=(1, 0.15, 0.7), rot=(0, random.uniform(0, 3), 0)), petal)

    # ------------------------------------------------------------------
    # 정자 (원래 그룹 (0, 0, -10.2)): 판자 마루 + 기둥 + 난간 + 휘어진 기와 지붕
    # ------------------------------------------------------------------
    gz = (0, 0, -10.2)
    def G(x, y, z):
        return (gz[0] + x, gz[1] + y, gz[2] + z)
    finish(box(8.2, 0.3, 5.4, pos=G(0, 0.35, 0)), material('deck_base', 0x8a5a2b), smooth=False)
    for k in range(12):
        z = -2.7 + 5.4 * (k + 0.5) / 12
        finish(box(8.4, 0.12, 5.4 / 12 - 0.04, pos=G(0, 0.6, z)), deck_m, bevel=0.015, seg=1, smooth=False, jitter=0.06)
    finish(box(8.6, 0.16, 0.2, pos=G(0, 0.58, 2.8)), post_m, smooth=False, ol=True, ol_t=0.02)
    for sx in (-1, 1):  # 받침 기둥
        for sz in (-1, 1):
            finish(box(0.4, 0.5, 0.4, pos=G(sx * 3.8, 0.25, sz * 2.4)), rock_dk, bevel=0.05, smooth=False)
    # 물로 내려가는 계단
    for k in range(3):
        finish(box(2.4, 0.12, 0.6, pos=G(0, 0.42 - k * 0.15, 3.0 + k * 0.5)), deck_m, bevel=0.02, smooth=False, jitter=0.04)
    for (x, z) in [(-3.6, -2.3), (3.6, -2.3), (-3.6, 2.3), (3.6, 2.3)]:
        finish(cyl(0.2, 0.22, 4.2, seg=12, pos=G(x, 2.7, z)), post_m, ol=True, ol_t=0.04)
        # 기둥 머리 받침
        finish(box(0.6, 0.2, 0.6, pos=G(x, 4.75, z)), post_m, bevel=0.03, smooth=False)
    # 들보
    for z in (-2.3, 2.3):
        finish(box(7.8, 0.3, 0.32, pos=G(0, 4.6, z)), post_m, bevel=0.03, smooth=False)
    # 난간 (뒤·양옆)
    for (x0, z0, x1, z1) in [(-3.6, -2.3, 3.6, -2.3), (-3.6, -2.3, -3.6, 2.3), (3.6, -2.3, 3.6, 2.3)]:
        L = math.hypot(x1 - x0, z1 - z0); yaw = math.atan2(x1 - x0, z1 - z0)
        mx, mz = (x0 + x1) / 2, (z0 + z1) / 2
        finish(box(0.1, 0.1, L, pos=G(mx, 1.6, mz), rot=(0, yaw, 0)), post_m, smooth=False)
        n = int(L / 0.5)
        for k in range(1, n):
            t = k / n
            finish(box(0.07, 0.95, 0.07, pos=G(x0 + (x1 - x0) * t, 1.1, z0 + (z1 - z0) * t)), post_m, smooth=False)
    # 지붕: 원래 단면을 기와 띠(14장)로 나눠 돌출 + 속지붕
    prof = roof_profile()
    finish(extrude_shape(prof, 7.0, pos=G(0, 4.8 - 0.06, 0)), roof_dk, smooth=False, ol=True, ol_t=0.025)
    for k in range(14):
        z = -3.5 + 7.0 * (k + 0.5) / 14
        strip = extrude_shape([(x, y + 0.08) for (x, y) in prof[:len(prof) // 2 + 1]] + [(x, y + 0.02) for (x, y) in reversed(prof[:len(prof) // 2 + 1])], 7.0 / 14 - 0.06, pos=G(0, 4.8, z))
        finish(strip, roof_m, smooth=False, jitter=0.04)
    finish(cyl(0.22, 0.22, 7.4, seg=10, pos=G(0, 7.45, 0), rot=(math.pi / 2, 0, 0)), roof_dk, ol=True, ol_t=0.02)
    for z in (-3.75, 3.75):
        finish(sphere(0.32, seg=10, rings=8, pos=G(0, 7.5, z)), roof_dk)
    for sx in (-1, 1):  # 처마 끝 올라간 장식
        for z in (-3.5, 3.5):
            finish(cyl(0.0, 0.14, 0.5, seg=6, pos=G(sx * 5.65, 4.95, z), rot=(0, 0, -sx * 0.6)), roof_dk)

    # ------------------------------------------------------------------
    # 석등 3개 (원래 [(-9,-8),(9,-8),(10.5,6.5)] × 1.12)
    # ------------------------------------------------------------------
    for (x, z) in [(-9, -8), (9, -8), (10.5, 6.5)]:
        stone_lantern(x * 1.12, z * 1.12, stone, stone)

    # ------------------------------------------------------------------
    # 대나무 울타리 (원래 반지름 15.2, 각도 0.95π~1.55π) + 가로 묶음
    # ------------------------------------------------------------------
    for i in range(34):
        a = math.pi * 0.95 + (i / 33) * math.pi * 0.6
        h = 2.2 + (i % 3) * 0.2
        x, z = math.cos(a) * 15.2, math.sin(a) * 15.2
        finish(cyl(0.12, 0.12, h, seg=8, pos=(x, h / 2, z)), bamboo, jitter=0.06)
        for k in range(int(h / 0.7)):
            finish(torus(0.125, 0.025, seg=10, rseg=4, pos=(x, 0.55 + k * 0.7, z), rot=(math.pi / 2, 0, 0)), bamboo_dk)
    for y in (0.6, 1.6):
        for i in range(33):
            a0 = math.pi * 0.95 + (i / 33) * math.pi * 0.6
            a1 = math.pi * 0.95 + ((i + 1) / 33) * math.pi * 0.6
            p0 = Vector((math.cos(a0) * 15.0, y, math.sin(a0) * 15.0)); p1 = Vector((math.cos(a1) * 15.0, y, math.sin(a1) * 15.0))
            d = p1 - p0
            finish(cyl(0.05, 0.05, d.length + 0.05, seg=6, pos=tuple((p0 + p1) / 2), rot=(math.pi / 2, math.atan2(d.x, d.z), 0), order='YXZ'), bamboo_dk)

    # ------------------------------------------------------------------
    # 물가 소품: 나무 들통 + 목욕 의자, 피크닉 돗자리 + 바구니 (원래 (9.5, 0.05, 8.5))
    # ------------------------------------------------------------------
    bx, bz = -8.5, 9.6
    finish(lathe([(0, 0.0), (0.42, 0.0), (0.48, 0.55), (0.43, 0.55), (0.38, 0.05), (0, 0.05)], seg=16, pos=(bx, 0, bz)), deck_m, ol=True, ol_t=0.03)
    for y in (0.12, 0.45):
        finish(torus(0.46 - (0.45 - y) * 0.1, 0.025, seg=16, rseg=4, pos=(bx, y, bz), rot=(math.pi / 2, 0, 0)), material('band', 0x3b3550))
    finish(box(0.8, 0.1, 0.5, pos=(bx + 1.0, 0.4, bz - 0.2), rot=(0, 0.3, 0)), deck_m, bevel=0.02, smooth=False, ol=True, ol_t=0.02)
    for sx in (-1, 1):
        finish(box(0.08, 0.35, 0.45, pos=lpos((bx + 1.0, 0.18, bz - 0.2), (0, 0.3, 0), (sx * 0.32, 0, 0)), rot=(0, 0.3, 0)), deck_m, smooth=False)
    mx, mz = 9.5, 8.5
    for k in range(7):
        x = -2.75 + 5.5 * (k + 0.5) / 7
        finish(box(5.5 / 7, 0.05, 4.2, pos=(mx + x, 0.05, mz)), material('mat_a', 0xfda4af) if k % 2 == 0 else material('mat_b', 0xfff1f2), smooth=False)
    finish(lathe([(0, 0.05), (0.45, 0.05), (0.56, 0.55), (0.5, 0.55), (0.4, 0.1), (0, 0.1)], seg=16, pos=(mx, 0, mz)), material('basket', 0xd6a35c, 'wood', 6.0, 0.25), ol=True, ol_t=0.04)
    finish(torus(0.5, 0.035, seg=16, rseg=4, arc=math.pi, pos=(mx, 0.55, mz)), material('basket', 0xd6a35c, 'wood', 6.0, 0.25))
    for k in range(3):
        finish(sphere(0.16, seg=8, rings=6, pos=(mx + 1.0 + k * 0.35, 0.18, mz + 0.8)), material('apple', 0xef4444))
    finish(cyl(0.35, 0.35, 0.05, seg=16, pos=(mx - 1.1, 0.1, mz + 0.6)), material('plate', 0xffffff))
    for k in range(3):
        finish(sphere(0.12, seg=8, rings=6, pos=(mx - 1.1 + (k - 1) * 0.15, 0.17, mz + 0.6), scale=(1, 0.8, 1)), material('dango_%d' % k, [0xfbcfe8, 0xffffff, 0x86efac][k]))
