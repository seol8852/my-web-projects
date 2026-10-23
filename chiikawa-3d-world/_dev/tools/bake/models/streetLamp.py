# 🏮 가로등 (town_hq.js streetLamp()) — 유리·불빛은 게임 부품
import math, random
from lib import *


def build():
    random.seed(101)
    iron = material('iron', 0x3b3550, 'plaster', 4.0, 0.06)
    gold = material('gold', 0xd4a017)
    street_lamp_model(Grp(), iron, gold)
    # 받침 둘레 작은 꽃 (바닥 장식)
    stem = material('stem', 0x4f9a2f); center = material('center', 0xfacc15)
    for k in range(5):
        a = TAU * k / 5 + 0.3
        flower(math.cos(a) * 0.55, 0.0, math.sin(a) * 0.55, [0xff85a2, 0xfde047, 0xffffff, 0xc084fc, 0xff85a2][k], (stem, center), size=0.9, stem=0.22)
