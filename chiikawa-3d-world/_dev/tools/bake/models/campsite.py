# ⛺ 별빛 캠핑장 — 원래 배치(town_hq.js campsite())와 같은 크기
# 게임 부품(그대로 사용): 모닥불 불꽃·빛, 전구 줄의 전구·빛, 텐트 안쪽 어두운 면
import math, random
from lib import *


def tent_model(origin, ry, color, stripe):
    """원래 tent(): W4.4 H3.6 D5, 원점 기준 회전 ry"""
    W, H, D = 4.4, 3.6, 5.0
    rot = (0, ry, 0)
    c_main = material('tent_%x' % color, color, 'plaster', 2.0, 0.06)
    c_str = material('tent_%x' % stripe, stripe, 'plaster', 2.0, 0.05)
    pole = material('pole', 0x8a5a2b, 'wood', 2.0, 0.2)
    rope = material('rope', 0xd6c7a1)
    slope_len = math.hypot(W / 2, H)
    ang = math.atan2(H, W / 2)
    # 지붕 천: 줄무늬 띠 6장씩 (양쪽)
    for side in (-1, 1):
        for k in range(6):
            zz = -D / 2 + D * (k + 0.5) / 6
            # 띠 중심: 경사면 중간
            cx = side * W / 4
            cy = H / 2
            pnl = box(slope_len, 0.06, D / 6 + 0.01, pos=lpos(origin, rot, (cx, cy, zz)), rot=(0, ry, side * -(ang)), order='YXZ')
            finish(pnl, c_main if k % 2 == 0 else c_str, smooth=False, ol=(k == 0), ol_t=0.02)
        # 처마 끝 접힌 단
        finish(box(0.12, 0.1, D + 0.1, pos=lpos(origin, rot, (side * (W / 2 - 0.02), 0.06, 0))), c_main, smooth=False)
    # 뒷면 삼각
    tri = extrude_shape([(-W / 2, 0), (W / 2, 0), (0, H)], 0.06, pos=lpos(origin, rot, (0, 0, -D / 2)), rot=rot)
    finish(tri, c_main, smooth=False)
    # 앞 플랩 (열림) — 원래 위치 (-W/2*0.1, 0, D/2), 회전 -1.1
    fo = lpos(origin, rot, (-W / 2 * 0.1, 0, D / 2))
    flap = extrude_shape([(0, 0), (W / 2, 0), (0, H)], 0.05, pos=fo, rot=(0, ry - 1.1, 0))
    finish(flap, c_str, smooth=False)
    finish(cyl(0.05, 0.05, 1.0, seg=6, pos=lpos(fo, (0, ry - 1.1, 0), (0.6, 0.5, 0.03)), rot=(0, ry - 1.1, math.pi / 2)), rope)
    # 앞 기둥 + 깃발대 (원래 pole 위치 (0, (H+0.6)/2, D/2+0.1))
    finish(cyl(0.07, 0.07, H + 0.6, seg=8, pos=lpos(origin, rot, (0, (H + 0.6) / 2, D / 2 + 0.1))), pole)
    finish(cyl(0.07, 0.07, H, seg=8, pos=lpos(origin, rot, (0, H / 2, -D / 2 - 0.1))), pole)
    finish(cyl(0.05, 0.05, D + 0.4, seg=6, pos=lpos(origin, rot, (0, H + 0.02, 0)), rot=(math.pi / 2, ry, 0), order='YXZ'), pole)
    finish(cyl(0.0, 0.25, 0.6, seg=3, pos=lpos(origin, rot, (0.3, H + 0.45, D / 2 + 0.1)), rot=(0, ry, -math.pi / 2), order='YXZ'), material('flag', 0xfacc15))
    # 바닥 시트
    finish(box(W + 0.4, 0.03, D + 0.6, pos=lpos(origin, rot, (0, 0.015, 0.2)), rot=rot), material('sheet', 0x6b8f5e), smooth=False)
    # 지지 줄 + 말뚝 (네 귀퉁이 바깥으로)
    for sx in (-1, 1):
        for sz in (-1, 1):
            top = lpos(origin, rot, (0, H * 0.95, sz * (D / 2 + 0.1)))
            stake = lpos(origin, rot, (sx * (W / 2 + 1.0), 0.15, sz * (D / 2 + 0.9)))
            mid = [(top[i] + stake[i]) / 2 for i in range(3)]
            dv = Vector(top) - Vector(stake)
            L = dv.length
            yaw = math.atan2(dv.x, dv.z); pitch = math.atan2(math.hypot(dv.x, dv.z), dv.y)
            finish(cyl(0.015, 0.015, L, seg=4, pos=tuple(mid), rot=(pitch, yaw, 0), order='YXZ'), rope, smooth=False)
            finish(cyl(0.04, 0.02, 0.4, seg=5, pos=stake), pole)


def build():
    random.seed(61)
    stone = material('stone', 0xb8b0a2, 'stone', 2.5, 0.22)
    bark = material('bark', 0x7c4a24, 'wood', 1.0, 0.3)
    ring = material('ring', 0xe2b27a, 'wood', 5.0, 0.25)
    char = material('char', 0x3a2a20)
    wood = material('wood', 0x9a6232, 'wood', 1.6, 0.22)
    pole = material('pole', 0x8a5a2b, 'wood', 2.0, 0.2)
    iron = material('iron', 0x3b3550)
    blue = material('cooler', 0x60a5fa)
    white = material('white', 0xffffff)

    tent_model((-7.5, 0, -5.5), 0.45, 0xfbbf24, 0xfff7d6)
    tent_model((7.8, 0, -4.8), -0.5, 0x38bdf8, 0xe0f2fe)

    # ------------------------------------------------------------------
    # 돌 화로 (원래 돌 10개 반지름 1.35) + 숯 바닥 + 장작
    # ------------------------------------------------------------------
    for i in range(12):
        a = (i / 12) * TAU
        st = rounded_pebble(0.42 * random.uniform(0.85, 1.1), seed=600 + i, pos=(math.cos(a) * 1.35, 0.22, math.sin(a) * 1.35), rot=(0, -a, 0), scale=(1, 0.72, 0.9))
        finish(st, stone, jitter=0.08, ol=True, ol_t=0.03)
    finish(cyl(1.1, 1.15, 0.08, seg=20, pos=(0, 0.04, 0)), char)
    for i in range(4):
        lg = cyl(0.16, 0.18, 1.8, seg=8, pos=(0, 0.45, 0), rot=(0.9, (i / 4) * TAU, 0), order='YXZ')
        finish(lg, bark, jitter=0.06)
    # 삼각대 + 주전자 (불 위)
    for k in range(3):
        a = TAU * k / 3
        finish(cyl(0.04, 0.05, 3.4, seg=6, pos=(math.cos(a) * 0.75, 1.55, math.sin(a) * 0.75), rot=(-0.22, -a + math.pi / 2, 0), order="YXZ"), pole)
    finish(cyl(0.015, 0.015, 0.7, seg=4, pos=(0, 2.75, 0)), iron)
    finish(lathe([(0, 2.0), (0.32, 2.02), (0.4, 2.2), (0.36, 2.42), (0.18, 2.48), (0, 2.48)], seg=20), material('kettle', 0x4b5563), ol=True, ol_t=0.025)
    finish(cyl(0.04, 0.05, 0.35, seg=6, pos=(0.42, 2.3, 0), rot=(0, 0, -0.9)), material('kettle', 0x4b5563))
    finish(torus(0.25, 0.02, seg=12, rseg=4, arc=math.pi, pos=(0, 2.5, 0)), iron)

    # ------------------------------------------------------------------
    # 통나무 의자 3개 (원래 반지름 4.5, 길이 4.2) — 껍질 + 나이테 단면 + 다리 받침
    # ------------------------------------------------------------------
    for a in (0, 2.1, 4.2):
        o = (math.cos(a) * 4.5, 0.5, math.sin(a) * 4.5); r = (0, -a + math.pi / 2, 0)
        finish(cyl(0.5, 0.52, 4.2, seg=16, pos=o, rot=(r[0], r[1], math.pi / 2)), bark, ol=True, ol_t=0.03)
        for s in (-1, 1):
            finish(cyl(0.47, 0.47, 0.04, seg=16, pos=lpos(o, r, (s * 2.11, 0, 0)), rot=(r[0], r[1], math.pi / 2)), ring)
            finish(box(0.3, 0.3, 0.9, pos=lpos(o, r, (s * 1.5, -0.4, 0)), rot=r), wood, bevel=0.03, smooth=False)
        finish(box(3.6, 0.06, 0.5, pos=lpos(o, r, (0, 0.47, 0)), rot=r), material('seat', 0xb07a4a, 'wood', 2.0, 0.2), smooth=False)

    # ------------------------------------------------------------------
    # 전구 줄 기둥 (원래 (-4, 0, -9), (4.5, 0, -9.5)) + 줄 (전구는 게임 부품)
    # ------------------------------------------------------------------
    poles = [(-4.0, -9.0), (4.5, -9.5)]
    for (x, z) in poles:
        finish(cyl(0.1, 0.13, 4.2, seg=8, pos=(x, 2.1, z)), pole, ol=True, ol_t=0.02)
        finish(cyl(0.18, 0.2, 0.2, seg=8, pos=(x, 0.1, z)), stone)
        finish(box(0.5, 0.06, 0.06, pos=(x, 4.0, z)), pole, smooth=False)
    pts = []
    for i in range(17):
        t = i / 16
        pts.append((poles[0][0] + (poles[1][0] - poles[0][0]) * t, 4.0 - math.sin(t * math.pi) * 0.8 + 0.08, poles[0][1] + (poles[1][1] - poles[0][1]) * t))
    for i in range(16):
        p0, p1 = Vector(pts[i]), Vector(pts[i + 1])
        d = p1 - p0
        finish(cyl(0.015, 0.015, d.length, seg=4, pos=tuple((p0 + p1) / 2), rot=(math.atan2(math.hypot(d.x, d.z), d.y), math.atan2(d.x, d.z), 0), order='YXZ'), iron, smooth=False)
    for i in range(9):  # 전구 소켓
        t = i / 8
        x = poles[0][0] + (poles[1][0] - poles[0][0]) * t
        z = poles[0][1] + (poles[1][1] - poles[0][1]) * t
        y = 4.0 - math.sin(t * math.pi) * 0.8
        finish(cyl(0.05, 0.06, 0.1, seg=6, pos=(x, y + 0.12, z)), iron)

    # ------------------------------------------------------------------
    # 장작 더미 (원래 (-11.x, y, 2)) + 쿨러 (10.5, 0.4, 2.5) + 배낭·도끼
    # ------------------------------------------------------------------
    for i in range(6):
        x = -11 + (i % 3) * 0.42
        y = 0.2 + (i // 3) * 0.38
        finish(cyl(0.2, 0.2, 1.6, seg=8, pos=(x, y, 2), rot=(math.pi / 2, 0, 0)), bark, jitter=0.08)
        for s in (-1, 1):
            finish(cyl(0.18, 0.18, 0.02, seg=8, pos=(x, y, 2 + s * 0.81), rot=(math.pi / 2, 0, 0)), ring)
    finish(box(1.6, 0.06, 0.06, pos=(-10.6, 0.05, 1.3)), wood, smooth=False)
    # 도끼 (장작에 박힘)
    finish(cyl(0.05, 0.05, 1.0, seg=6, pos=(-10.2, 1.1, 2.3), rot=(0.4, 0, -0.5)), wood)
    finish(box(0.08, 0.35, 0.4, pos=(-10.45, 0.72, 2.15), rot=(0.4, 0, -0.5)), material('axe', 0x9ca3af), bevel=0.02, smooth=False)
    # 쿨러
    finish(box(1.2, 0.62, 0.8, pos=(10.5, 0.33, 2.5)), blue, bevel=0.08, seg=2, ol=True, ol_t=0.03)
    finish(box(1.24, 0.2, 0.84, pos=(10.5, 0.74, 2.5)), white, bevel=0.06, seg=2)
    finish(torus(0.3, 0.04, seg=12, rseg=4, arc=math.pi, pos=(10.5, 0.82, 2.5)), material('handle', 0x1e40af))
    # 배낭 (텐트 옆)
    bo = (-5.0, 0, -3.0)
    finish(box(0.7, 0.9, 0.45, pos=(bo[0], 0.48, bo[2]), rot=(0, 0.6, 0.1)), material('pack', 0xef4444), bevel=0.12, seg=3, ol=True, ol_t=0.03)
    finish(box(0.5, 0.3, 0.2, pos=lpos((bo[0], 0.35, bo[2]), (0, 0.6, 0.1), (0, 0, 0.3)), rot=(0, 0.6, 0.1)), material('pack2', 0xb91c1c), bevel=0.06, seg=2)
    finish(cyl(0.18, 0.18, 0.8, seg=10, pos=lpos((bo[0], 1.0, bo[2]), (0, 0.6, 0), (0, 0, 0)), rot=(0, 0.6, math.pi / 2)), material('mat_roll', 0x60a5fa))
