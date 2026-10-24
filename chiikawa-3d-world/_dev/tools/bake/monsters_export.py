# 👾 몬스터 5종 → assets/monsters.glb (부품 이름 = "몬스터|부위|종류", 원점 = 관절) + assets/monsters_meta.json
# 사용법: python tools/bake/monsters_export.py            (내보내기)
#         python tools/bake/monsters_export.py preview    (미리보기 그림만)
import sys, os, math, json
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, 'models'))
import bpy
from mathutils import Vector
ASSETS = os.path.abspath(os.path.join(HERE, '..', '..', '..', 'assets'))
OUT = os.path.join(ASSETS, 'monsters.glb')
argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else sys.argv[1:]
PREVIEW = bool(argv and argv[0] == 'preview')
ONLY = argv[1] if len(argv) > 1 else None
bpy.ops.wm.read_factory_settings(use_empty=True)
import lib
lib.reset_model()
import monsters as MM
if ONLY:
    MM.ALL = [f for f in MM.ALL if f.__name__ == ONLY]
MM.build()
mons = []
for _, m, _, _ in MM.PARTS:
    if m not in mons:
        mons.append(m)
OFF = {m: i * 40.0 for i, m in enumerate(mons)}
print('[monsters] mons', mons)
for ob, m, p, k in MM.PARTS:
    ob.location.x += OFF[m]

# ---- 가림(AO) 굽기 → 정점색에 곱하기 ----
sc = bpy.context.scene
sc.render.engine = 'CYCLES'; sc.cycles.device = 'CPU'; sc.cycles.samples = int(os.environ.get('MON_SAMPLES', '48')); sc.cycles.use_denoising = False
w = bpy.data.worlds.new('w'); w.use_nodes = True; sc.world = w
w.light_settings.distance = 0.9
bake_mat = bpy.data.materials.new('bake'); bake_mat.use_nodes = True
for o in bpy.context.selected_objects:
    o.select_set(False)
for ob, m, p, k in MM.PARTS:
    me = ob.data
    me.materials.clear(); me.materials.append(bake_mat)
    a = me.color_attributes.get('AO') or me.color_attributes.new('AO', 'FLOAT_COLOR', 'CORNER')
    me.color_attributes.active_color = a
    ob.select_set(True)
bpy.context.view_layer.objects.active = MM.PARTS[0][0]
bpy.ops.object.bake(type='AO', target='VERTEX_COLORS')
for ob, m, p, k in MM.PARTS:
    me = ob.data
    ao = me.color_attributes['AO']; col = me.color_attributes['Col']
    lo, span = (0.85, 0.15) if k in ('glow', 'wing') else (0.58, 0.42)
    for i in range(len(col.data)):
        v = ao.data[i].color[0]
        f = lo + span * v
        c = col.data[i].color
        col.data[i].color = (c[0] * f, c[1] * f, c[2] * f, 1.0)
    me.color_attributes.remove(ao)
    me.color_attributes.active_color = me.color_attributes['Col']
for ob, m, p, k in MM.PARTS:
    ob.location.x -= OFF[m]
bpy.context.view_layer.update()
for ob, m, p, k in MM.PARTS:
    ob.data.transform(ob.matrix_world); ob.matrix_world = ob.matrix_world.Identity(4)

# ---- 부위별로 합치고 원점을 관절로 ----
groups = {}
for ob, m, p, k in MM.PARTS:
    groups.setdefault((m, p, k), []).append(ob)
merged = []
for (m, p, k), obs in groups.items():
    for o in bpy.context.selected_objects:
        o.select_set(False)
    for o in obs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = obs[0]
    if len(obs) > 1:
        bpy.ops.object.join()
    ob = bpy.context.view_layer.objects.active
    ob.name = f'{m}|{p}|{k}'; ob.data.name = ob.name
    piv = MM.PIVOTS[(m, p)]
    sc.cursor.location = lib.P(*piv)
    for o in bpy.context.selected_objects:
        o.select_set(False)
    ob.select_set(True)
    bpy.ops.object.origin_set(type='ORIGIN_CURSOR')
    merged.append((ob, m, p, k))
tri = {}
for ob, m, p, k in merged:
    tri[m] = tri.get(m, 0) + sum(len(pl.vertices) - 2 for pl in ob.data.polygons)
print('[monsters] parts', len(merged), 'tris', tri)

if not PREVIEW:
    for o in bpy.context.selected_objects:
        o.select_set(False)
    for ob, *_ in merged:
        ob.data.materials.clear()
        ob.select_set(True)
    bpy.ops.export_scene.gltf(filepath=OUT, export_format='GLB', use_selection=True, export_normals=True, export_texcoords=False,
                              export_materials='NONE', export_vertex_color='ACTIVE', export_yup=True, export_apply=True, export_animations=False)
    meta = {'pivots': {f'{m}|{p}': MM.PIVOTS[(m, p)] for (m, p) in MM.PIVOTS},
            'parents': {f'{m}|{p}': MM.PARENT[(m, p)] for (m, p) in MM.PARENT},
            'heights': MM.HEIGHTS, 'radii': getattr(MM, 'RADII', {})}
    with open(os.path.join(ASSETS, 'monsters_meta.json'), 'w') as f:
        json.dump(meta, f)
    print('[monsters] wrote', OUT, os.path.getsize(OUT) // 1024, 'KB')
else:
    vm = bpy.data.materials.new('vc'); vm.use_nodes = True
    nt = vm.node_tree; b = nt.nodes['Principled BSDF']; b.inputs['Roughness'].default_value = 0.8
    at = nt.nodes.new('ShaderNodeVertexColor'); at.layer_name = 'Col'
    nt.links.new(at.outputs['Color'], b.inputs['Base Color'])
    for ob, m, p, k in merged:
        ob.data.materials.clear(); ob.data.materials.append(vm)
        i = mons.index(m)
        ob.location = Vector((ob.location.x + (i - (len(mons) - 1) / 2) * 6.0, ob.location.y, ob.location.z))
    sc.render.engine = 'CYCLES'; sc.cycles.samples = 24
    sc.render.resolution_x = 1800; sc.render.resolution_y = 700
    w.node_tree.nodes['Background'].inputs[0].default_value = (0.55, 0.6, 0.68, 1)
    sd = bpy.data.lights.new('sun', 'SUN'); sd.energy = 3.5
    so = bpy.data.objects.new('sun', sd); sc.collection.objects.link(so)
    so.rotation_euler = Vector((0.5, -1.0, 1.0)).normalized().to_track_quat('Z', 'Y').to_euler()
    cam_d = bpy.data.cameras.new('c'); cam_d.type = 'ORTHO'; cam_d.ortho_scale = float(os.environ.get('MON_ORTHO', 6.2 * len(mons)))
    cam = bpy.data.objects.new('cam', cam_d); sc.collection.objects.link(cam); sc.camera = cam
    yaw = float(os.environ.get('MON_YAW', '0.45'))
    d = Vector((math.sin(yaw), -math.cos(yaw), 0.28)).normalized()
    cam.location = Vector((0, 0, float(os.environ.get('MON_CY', '2.6')))) + d * 40
    cam.rotation_euler = (-d).to_track_quat('-Z', 'Y').to_euler()
    sc.view_settings.view_transform = 'Standard'
    sc.render.filepath = '/home/claude/shots/mon_prev_%s.png' % os.environ.get('MON_TAG', 'a')
    bpy.ops.render.render(write_still=True)
    print('[monsters] preview', sc.render.filepath)
