# 🧱 성벽 밑 무너진 돌무더기 + 부서진 기둥 토막 (벽에 붙여 놓는 장식, 바깥 = +x)
import math, random
from lib import *


def build():
    random.seed(29)
    s1 = material('stone', 0xeeeae2, 'stone', 1.6, 0.12)
    s2 = material('stone2', 0xd6d0c4, 'stone', 1.6, 0.14)
    for k in range(7):
        w = random.uniform(0.35, 0.6)
        finish(box(w, w * 0.6, w * random.uniform(0.8, 1.3), pos=(random.uniform(-0.1, 0.35), w * 0.3 + (0.25 if k > 4 else 0), random.uniform(-0.9, 0.9)),
                   rot=(random.uniform(-0.3, 0.3), random.uniform(0, 3), random.uniform(-0.3, 0.3))), s1 if k % 2 else s2, bevel=0.04, seg=1, smooth=False, jitter=0.07)
    # 쓰러진 기둥 토막
    finish(cyl(0.32, 0.32, 0.8, seg=12, pos=(0.0, 0.32, -0.2), rot=(math.pi / 2, 0.3, 0), order='YXZ'), s1, bevel=0.03, jitter=0.05)
    for k in range(8):
        a = TAU * k / 8
        finish(box(0.05, 0.05, 0.78, pos=(math.cos(a) * 0.3 + 0.0, 0.32 + math.sin(a) * 0.3, -0.2), rot=(0, 0.3, 0)), s2, smooth=False)
    for k in range(6):  # 자갈
        finish(rounded_pebble(0.1, seed=60 + k, pos=(random.uniform(-0.4, 0.4), 0.04, random.uniform(-1.1, 1.1)), scale=(1, 0.6, 1)), s2, jitter=0.08)
