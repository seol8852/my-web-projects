# 🌳 덤불 (town_hq.js bush(r): 둥근 잎 뭉치 + 가끔 열매)
import random
from lib import *


def build(r=1.0):
    leaf = material('leaf', 0x6cbf4a, 'plaster', 4.0, 0.15)
    leaf2 = material('leaf2', 0x5fae3e, 'plaster', 4.0, 0.15)
    leaf3 = material('leaf3', 0x4e9a33, 'plaster', 4.0, 0.12)
    berry = material('berry', 0xff6b8a)
    bush_model(Grp(), r, [leaf, leaf2, leaf3], seed=int(r * 100), berries=berry if r >= 1.1 else None)
