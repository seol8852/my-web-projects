# 🪑 벤치 (town_hq.js bench())
from lib import *


def build():
    wood = material('plank', 0xd9a066, 'wood', 1.8, 0.1)
    iron = material('iron', 0x3b3550)
    bench_model(Grp(), wood, iron)
