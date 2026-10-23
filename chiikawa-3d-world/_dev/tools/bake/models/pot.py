# 🪴 꽃 화분 (town_hq.js pot(color, 'flower'))
import math, random
from lib import *


def build(color=0xe07a5f):
    random.seed(color % 997)
    pot_m = material('pot', color, 'plaster', 3.0, 0.1)
    rim = material('pot_rim', color, 'plaster', 3.0, 0.16)
    soil = material('soil', 0x6b4423)
    leaf = material('leaf', 0x6cbf4a, 'plaster', 4.0, 0.15)
    stem = material('stem', 0x4f9a2f); center = material('center', 0xfacc15)
    finish(lathe([(0.0, 0), (0.32, 0), (0.42, 0.55), (0.36, 0.55), (0.0, 0.55)], seg=20), pot_m, ol=True, ol_t=0.04)
    finish(lathe([(0.41, 0.52), (0.48, 0.56), (0.49, 0.7), (0.42, 0.7), (0.41, 0.52)], seg=20), rim, ol=True, ol_t=0.03)
    finish(cyl(0.42, 0.42, 0.04, seg=18, pos=(0, 0.66, 0)), soil)
    for k in range(5):  # 잎
        a = TAU * k / 5
        finish(sphere(0.2, seg=8, rings=6, pos=(math.cos(a) * 0.22, 0.74, math.sin(a) * 0.22), scale=(1.3, 0.35, 0.7), rot=(0, -a, 0.3)), leaf, jitter=0.08)
    cols = [0xff85a2, 0xfde047, 0xffffff, 0xc084fc, 0xff85a2]
    for k in range(5):
        a = TAU * k / 5 + 0.5
        r = 0.08 + random.random() * 0.1
        flower(math.cos(a) * r, 0.66, math.sin(a) * r, cols[k], (stem, center), size=1.4, stem=0.4 + random.random() * 0.15)
