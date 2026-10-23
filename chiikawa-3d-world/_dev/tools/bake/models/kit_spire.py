# 🗻 전투 스테이지 바위 첨탑 (원래 ConeGeometry(1, 1, 6), 바닥 y0 → 게임에서 높이 26~66배로 늘림) — 층층이 쌓인 바위 기둥
import math, random
from lib import *


def build():
    random.seed(23)
    a = material('rockA', 0xe8e4dc, 'stone', 3.0, 0.16)
    b = material('rockB', 0xd4cec2, 'stone', 3.0, 0.18)
    c = material('rockC', 0xbdb5a8, 'stone', 3.0, 0.18)
    tiers = 7
    for i in range(tiers):
        y0 = i / tiers; y1 = (i + 1) / tiers
        r0 = 1.0 - 0.92 * y0; r1 = 1.0 - 0.92 * y1
        off = (random.uniform(-0.05, 0.05) * r0, random.uniform(-0.05, 0.05) * r0)
        finish(cyl(r1 * 1.02, r0 * 1.02, (y1 - y0) * 0.92, seg=7, pos=(off[0], (y0 + y1) / 2, off[1]), rot=(0, random.uniform(0, 1), 0)), [a, b, c][i % 3], smooth=False, jitter=0.05)
        finish(cyl(r1 * 1.08, r1 * 1.12, (y1 - y0) * 0.1, seg=7, pos=(off[0], y1 - (y1 - y0) * 0.05, off[1]), rot=(0, random.uniform(0, 1), 0)), c, smooth=False)
    finish(cyl(0.0, 0.1, 0.06, seg=6, pos=(0, 1.0, 0)), a, smooth=False)
    for k in range(5):  # 밑동 바위
        ang = TAU * k / 5
        finish(rounded_pebble(0.35, seed=40 + k, pos=(math.cos(ang) * 0.95, 0.04, math.sin(ang) * 0.95), scale=(1, 0.12, 1)), b, smooth=False, jitter=0.06)
