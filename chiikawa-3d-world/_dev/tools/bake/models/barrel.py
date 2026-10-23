# 🛢️ 나무 통 (town_hq.js barrel(): 높이 1.3, 반지름 0.5~0.6)
import math, random
from lib import *


def build():
    random.seed(103)
    wood = material('barrel_wood', 0xc98b52, 'wood', 2.0, 0.12)
    iron = material('iron', 0x52525b)
    ring = material('ring_wood', 0xe0b47c, 'wood', 3.0, 0.15)
    barrel_model(0, 0, wood, iron, h=1.3, r=0.6)
    finish(cyl(0.5, 0.5, 0.1, seg=20, pos=(0, 1.23, 0)), ring)
    finish(cyl(0.12, 0.12, 0.05, seg=10, pos=(0.2, 1.3, 0.1)), iron)   # 마개
