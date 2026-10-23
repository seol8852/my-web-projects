# 🔮 레이드 투기장 오벨리스크 (원래 CylinderGeometry(0.9, 1.7, h, 4), h 10/14 → 기준 높이 12, 게임에서 세로 배율)
#    떠다니는 수정(y h+2.2)·빛은 게임 부품
import math, random
from lib import *

H = 12.0


def build():
    random.seed(31)
    dark = material('dark', 0x3a3342, 'stone', 1.2, 0.14)
    dark2 = material('dark2', 0x2a2430, 'stone', 1.2, 0.14)
    rune = material('rune', 0x9d7bff)
    iron = material('iron', 0x524a5c)
    finish(box(4.2, 0.8, 4.2, pos=(0, 0.4, 0), rot=(0, math.pi / 4, 0)), dark2, bevel=0.08, seg=1, smooth=False, ol=True, ol_t=0.04)
    finish(box(3.3, 0.6, 3.3, pos=(0, 1.1, 0), rot=(0, math.pi / 4, 0)), dark, bevel=0.06, seg=1, smooth=False)
    finish(cyl(0.9, 1.7, H, seg=4, pos=(0, H / 2, 0), rot=(0, math.pi / 4, 0)), dark, bevel=0.05, smooth=False, ol=True, ol_t=0.05)
    rad = lambda y: 1.7 - 0.8 * y / H
    for y in (2.2, 5.5, 9.0):  # 쇠 띠
        r = rad(y) + 0.06
        finish(cyl(r - 0.02, r, 0.3, seg=4, pos=(0, y, 0), rot=(0, math.pi / 4, 0)), iron, smooth=False)
        for k in range(4):  # 띠의 징
            a = k * math.pi / 2 + math.pi / 4
            finish(sphere(0.12, seg=8, rings=5, pos=(math.sin(a) * r * 0.72 * 1.0, y, math.cos(a) * r * 0.72)), iron)
    for k in range(4):  # 네 면 빛나는 룬 줄 (보라)
        a = k * math.pi / 2
        for j in range(5):
            y = 3.0 + j * 0.9
            r = rad(y)
            w = 0.5 - j * 0.05
            finish(box(w, 0.12, 0.05, pos=(math.sin(a) * r * 0.71, y, math.cos(a) * r * 0.71), rot=(0, a, 0)), rune, smooth=False)
            if j % 2 == 0:
                finish(box(0.12, 0.4, 0.05, pos=(math.sin(a) * r * 0.71, y + 0.3, math.cos(a) * r * 0.71), rot=(0, a, 0)), rune, smooth=False)
    # 꼭대기 발톱 4개 (수정을 받치는 모양)
    for k in range(4):
        a = k * math.pi / 2 + math.pi / 4
        p0 = (math.sin(a) * 0.55, H, math.cos(a) * 0.55)
        finish(cyl(0.06, 0.2, 1.6, seg=6, pos=(p0[0] + math.sin(a) * 0.3, H + 0.7, p0[2] + math.cos(a) * 0.3), rot=(math.cos(a) * 0.45, 0, -math.sin(a) * 0.45)), dark2, smooth=False, ol=True, ol_t=0.02)
    finish(cyl(0.7, 0.9, 0.3, seg=8, pos=(0, H + 0.1, 0)), iron)
