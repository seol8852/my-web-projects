# 🪨 전투 스테이지 바깥 절벽 바위 (원래 DodecahedronGeometry(1) 를 크게 늘려 씀) — 반지름 약 1 의 각진 바위 덩어리
import math, random
import bmesh
from lib import *


def facet_rock(r, seed, pos, scale=(1, 1, 1), sub=1, amt=0.22):
    rnd = random.Random(seed)
    bm = bmesh.new()
    bmesh.ops.create_icosphere(bm, subdivisions=sub, radius=r)
    for v in bm.verts:
        v.co *= 1 + (rnd.random() - 0.5) * amt * 2
    ob = lib_new(bm)
    for v in ob.data.vertices:
        x, y, z = v.co
        v.co = Vector((x, z, -y))
    return place(ob, pos=pos, scale=scale)


def lib_new(bm):
    import lib
    return lib._new_obj_from_bm(bm, 'rock')


def build():
    random.seed(21)
    a = material('rockA', 0xe8e4dc, 'stone', 2.5, 0.16)
    b = material('rockB', 0xd8d2c6, 'stone', 2.5, 0.18)
    c = material('rockC', 0xc6bfb2, 'stone', 2.5, 0.18)
    finish(facet_rock(0.95, 1, (0, 0, 0), sub=1, amt=0.18), a, smooth=False, jitter=0.05)
    for i, (p, r, m) in enumerate([((0.55, -0.2, 0.35), 0.55, b), ((-0.5, -0.25, -0.3), 0.6, c), ((0.1, 0.55, -0.2), 0.45, b), ((-0.35, 0.3, 0.45), 0.4, a)]):
        finish(facet_rock(r, 10 + i, p, sub=1, amt=0.22), m, smooth=False, jitter=0.06)
