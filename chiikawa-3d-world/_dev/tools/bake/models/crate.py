# 📦 나무 상자 (town_hq.js crate(s): 한 변 s, 바닥 y0)
import math, random
from lib import *


def build(s=1.0):
    random.seed(int(s * 100) + 7)
    wood = material('plank', 0xd9a066, 'wood', 1.8, 0.1)
    dark = material('beam', 0x9a6232, 'wood', 1.6, 0.22)
    crate_model(0, 0, 0, s, 0.0, wood, dark)
    finish(box(s * 0.96, s * 0.96, s * 0.96, pos=(0, s / 2, 0)), dark, smooth=False, ol=True, ol_t=0.03)
    for k in range(4):  # 위 판자
        finish(box(s * 0.9 / 4 - 0.02, 0.04, s * 0.9, pos=(-s * 0.45 + s * 0.9 / 4 * (k + 0.5), s + 0.005, 0)), wood, smooth=False, jitter=0.08)
