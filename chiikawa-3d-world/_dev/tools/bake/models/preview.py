# 모델 미리보기 렌더 (Cycles) : python preview.py <key> [out.png] [각도]
import sys, os, math, importlib
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy
from mathutils import Vector
key = sys.argv[1]; out = sys.argv[2] if len(sys.argv) > 2 else f'/tmp/prev_{key}.png'
yaw = float(sys.argv[3]) if len(sys.argv) > 3 else 0.6
dist = float(sys.argv[4]) if len(sys.argv) > 4 else 1.0
bpy.ops.wm.read_factory_settings(use_empty=True)
import lib
lib.reset_model()
base, _, rest = key.partition(':')
args = [float(a) if '.' in a else int(a) for a in rest.split(',')] if rest else []
mod = importlib.import_module(base)
mod.build(*args)
sc = bpy.context.scene
sc.render.engine = 'CYCLES'; sc.cycles.samples = int(os.environ.get('PS', '24')); sc.cycles.use_denoising = False
sc.render.resolution_x = 960; sc.render.resolution_y = 600
w = bpy.data.worlds.new('w'); w.use_nodes = True; w.node_tree.nodes['Background'].inputs[0].default_value = (0.78, 0.86, 1, 1); sc.world = w
sd = bpy.data.lights.new('sun', 'SUN'); sd.energy = 2.2; sd.angle = math.radians(6)
so = bpy.data.objects.new('sun', sd); sc.collection.objects.link(so)
so.rotation_euler = Vector((48, -40, 86)).normalized().to_track_quat('Z', 'Y').to_euler()
bpy.ops.mesh.primitive_plane_add(size=80, location=(0, 0, -0.01))
g = bpy.context.active_object; gm = bpy.data.materials.new('g'); gm.use_nodes = True
gm.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (0.62, 0.66, 0.5, 1); g.data.materials.append(gm)
# 카메라: 정면(-Y) 기준 yaw 만큼 돌려 비스듬히
objs = lib.MODEL_OBJS
mn = Vector((1e9,) * 3); mx = Vector((-1e9,) * 3)
for o in objs:
    for v in o.data.vertices:
        mn = Vector(map(min, mn, v.co)); mx = Vector(map(max, mx, v.co))
c = (mn + mx) / 2; size = (mx - mn).length
cam_d = bpy.data.cameras.new('c'); cam_d.lens = 35
cam = bpy.data.objects.new('cam', cam_d); sc.collection.objects.link(cam); sc.camera = cam
d = size * 0.85 * dist
cam.location = c + Vector((math.sin(yaw) * d, -math.cos(yaw) * d, d * 0.45))
cam.rotation_euler = (c - cam.location).to_track_quat('-Z', 'Y').to_euler()
sc.view_settings.view_transform = 'Standard'
sc.render.filepath = out
bpy.ops.render.render(write_still=True)
print('faces', sum(len(o.data.polygons) for o in objs), 'objs', len(objs))
