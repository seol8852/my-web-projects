# 🪵 울타리 (town_hq.js fence(len, posts))
import random
from lib import *


def build(length=6, posts=4):
    random.seed(int(length * 10) + posts)
    wood = material('fence', 0xe8c99a, 'wood', 1.8, 0.1)
    fence_model(Grp(), wood, length, posts)
