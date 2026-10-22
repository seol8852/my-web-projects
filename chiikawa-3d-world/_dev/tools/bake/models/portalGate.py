# ⛩️ 출격 포털 (도리이) — 원래 배치(town_hq.js portalGate())와 같은 크기
# 게임 부품(그대로 사용): 소용돌이 원판 + 금색 고리(회전), 빛, 석등 불빛 2개
import math, random
from lib import *


def build():
    random.seed(81)
    stone = material('stone', 0xd6cfbf, 'stone', 2.0, 0.18)
    stone_dk = material('stone_dk', 0xa8a092, 'stone', 2.5, 0.2)
    red = material('red', 0xe0313b, 'plaster', 3.0, 0.05)
    black = material('black', 0x1f1f1f)
    gold = material('gold', 0xfacc15)
    rope = material('rope', 0xe9d5a8, 'wood', 6.0, 0.15)
    paper = material('paper', 0xffffff)
    moss = material('moss', 0x6fa04f, 'plaster', 3.0, 0.2)

    # ------------------------------------------------------------------
    # 3단 석조 단 (원래 r 7.6/6.4/5.4) — 둘레 돌 블록 + 계단
    # ------------------------------------------------------------------
    for (r, h, y) in [(7.6, 0.4, 0.2), (6.4, 0.4, 0.6), (5.4, 0.35, 0.95)]:
        finish(cyl(r - 0.05, r + 0.25, h, seg=48, pos=(0, y, 0)), stone, ol=True, ol_t=0.015)
        n = int(TAU * r / 1.1)
        for i in range(n):
            a = TAU * (i + 0.5) / n
            blk = box(1.0, h * 0.8, 0.12, pos=(math.sin(a) * (r + 0.13), y, math.cos(a) * (r + 0.13)), rot=(0, a, 0))
            finish(blk, stone_dk, bevel=0.03, seg=1, smooth=False, jitter=0.07)
    # 바닥 판석 무늬 (윗단)
    for i in range(10):
        a = TAU * i / 10
        finish(box(0.06, 0.02, 5.2, pos=(math.sin(a) * 2.6, 1.13, math.cos(a) * 2.6), rot=(0, a, 0)), stone_dk, smooth=False)

    # ------------------------------------------------------------------
    # 도리이 (원래 기둥 (±4.2, 5.4) r0.55~0.68 h8.6, 받침 y1.5)
    # ------------------------------------------------------------------
    for x in (-4.2, 4.2):
        finish(cyl(0.55, 0.68, 8.6, seg=20, pos=(x, 5.4, 0)), red, ol=True, ol_t=0.03)
        finish(cyl(0.78, 0.82, 0.8, seg=20, pos=(x, 1.5, 0)), black, bevel=0.05)
        finish(torus(0.62, 0.06, seg=20, rseg=4, pos=(x, 1.95, 0), rot=(math.pi / 2, 0, 0)), black)
        finish(torus(0.57, 0.05, seg=20, rseg=4, pos=(x, 9.2, 0), rot=(math.pi / 2, 0, 0)), black)
    # 가사기 (휘어진 검은 상단 들보) — 원래 곡선 그대로
    def qc(p0, p1, p2, n=16):
        return [((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0], (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1]) for t in [i / n for i in range(n + 1)]]
    top = qc((-6.4, 0.5), (0, -0.2), (6.4, 0.5)) + list(reversed(qc((-6.2, -0.35), (0, -0.9), (6.2, -0.35))))
    finish(extrude_shape(top, 1.46, pos=(0, 10.1, 0)), black, bevel=0.05, seg=1, smooth=False, ol=True, ol_t=0.02)
    # 시마키 (빨간 아래 들보) + 누키 + 쐐기
    finish(box(12.0, 0.6, 1.0, pos=(0, 9.55, 0)), red, bevel=0.08, smooth=False, ol=True, ol_t=0.02)
    finish(box(10.4, 0.5, 0.7, pos=(0, 7.7, 0)), red, bevel=0.06, smooth=False, ol=True, ol_t=0.03)
    for x in (-4.2, 4.2):
        for s in (-1, 1):
            finish(box(0.3, 0.42, 0.14, pos=(x + s * 0.75, 7.7, 0.38)), black, smooth=False)
    # 현판 (금색 틀 + 붉은 판)
    finish(box(1.3, 1.5, 0.25, pos=(0, 8.65, 0.45)), gold, bevel=0.05, smooth=False, ol=True, ol_t=0.04)
    finish(box(1.0, 1.2, 0.05, pos=(0, 8.65, 0.6)), material('plaque', 0x7f1d1d), smooth=False)
    for k in range(3):
        finish(box(0.5 - k * 0.1, 0.08, 0.02, pos=(0, 9.0 - k * 0.35, 0.64)), gold, smooth=False)

    # ------------------------------------------------------------------
    # 시메나와 (꼰 밧줄 2가닥) + 종이 술 (지그재그) — 원래 반원 r4.0 (0, 7.4, 0.4)
    # ------------------------------------------------------------------
    for k in range(2):
        for i in range(24):
            t0 = i / 24; t1 = (i + 1) / 24
            def pt(t):
                a = math.pi + math.pi * t
                tw = math.sin(t * 40 + k * math.pi) * 0.07
                return Vector((math.cos(a) * 4.0, 7.4 + math.sin(a) * 4.0 * 0.25 + tw, 0.4 + math.cos(t * 40 + k * math.pi) * 0.07))
            p0, p1 = pt(t0), pt(t1)
            d = p1 - p0
            finish(cyl(0.11, 0.11, d.length + 0.04, seg=6, pos=tuple((p0 + p1) / 2), rot=(math.atan2(math.hypot(d.x, d.z), d.y), math.atan2(d.x, d.z), 0), order='YXZ'), rope)
    for i in range(5):
        x = -2.4 + i * 1.2
        y = 6.6 - math.sin(((i + 0.5) / 5) * math.pi) * 0.8
        for k in range(4):  # 번개 모양 종이
            finish(box(0.32, 0.22, 0.02, pos=(x + (0.06 if k % 2 else -0.06), y + 0.33 - k * 0.22, 0.45), rot=(0, 0, 0.15 if k % 2 else -0.15)), paper, smooth=False)
    # 밧줄 양 끝 묶음
    for x in (-4.0, 4.0):
        finish(sphere(0.2, seg=8, rings=6, pos=(x, 7.4, 0.4)), rope)

    # ------------------------------------------------------------------
    # 석등 한 쌍 (원래 (±6.2, 1.1, 2.5), 배율 0.85)
    # ------------------------------------------------------------------
    for x in (-6.2, 6.2):
        stone_lantern(x, 2.5, stone, y0=1.1, s=0.85, moss=moss)
    # 고마이누 받침 대신 작은 화분 (계단 양옆)
    for x in (-2.4, 2.4):
        finish(box(0.7, 0.6, 0.7, pos=(x, 1.42, 4.6)), stone_dk, bevel=0.05, smooth=False)
        for k in range(3):
            finish(sphere(0.25, seg=8, rings=6, pos=(x + (k - 1) * 0.18, 1.85, 4.6), scale=(1, 0.8, 1)), material('shrub', 0x4e9a33), jitter=0.1)
