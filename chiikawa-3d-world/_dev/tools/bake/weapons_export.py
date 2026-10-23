# ⚔️ 무기 16종 → assets/weapons.glb (부품 이름 = "모양|칸|단계") + 미리보기
# 사용법: python tools/bake/weapons_export.py [preview 등급 C|B|A|S] [미리보기 lv]
import sys, os, math, importlib
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, 'models'))
import bpy
from mathutils import Vector
OUT = os.path.abspath(os.path.join(HERE, '..', '..', '..', 'assets', 'weapons.glb'))
argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else sys.argv[1:]
PREVIEW = argv[0] if argv else None
PLV = int(argv[1]) if len(argv) > 1 else 3
bpy.ops.wm.read_factory_settings(use_empty=True)
import lib
lib.reset_model()
import weapons
tips = weapons.build()

PAL = {'C': dict(blade=0xcbd5e1, acc=0x94a3b8, grip=0x8b5a2b, glow=0x94a3b8), 'B': dict(blade=0xe0f2fe, acc=0x3b82f6, grip=0x1e3a8a, glow=0x60a5fa),
       'A': dict(blade=0xf5f3ff, acc=0xa855f7, grip=0x4c1d95, glow=0xc084fc), 'S': dict(blade=0xfffbeb, acc=0xf59e0b, grip=0x7c2d12, glow=0xfbbf24)}
FIXED = {'metal': 0xd1d5db, 'dark': 0x334155, 'white': 0xffffff, 'wood': 0xa8703f}


def slot_color(slot, P):
    base = slot.split('-')[0]
    if base.startswith('#'):
        return int(base[1:], 16)
    if base in FIXED:
        return FIXED[base]
    if base == 'wrap':
        c = P['grip']; return ((c >> 16 & 255) * 7 // 10 << 16) | ((c >> 8 & 255) * 7 // 10 << 8) | ((c & 255) * 7 // 10)
    if base == 'gem':
        return P['glow']
    return P[base]


# 같은 (모양, 칸, 단계) 끼리 합치기
groups = {}
for ob, shape, slot, lv in weapons.PARTS:
    groups.setdefault((shape, slot, lv), []).append(ob)
merged = []
for (shape, slot, lv), obs in groups.items():
    for o in bpy.context.selected_objects:
        o.select_set(False)
    for o in obs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = obs[0]
    if len(obs) > 1:
        bpy.ops.object.join()
    ob = bpy.context.view_layer.objects.active
    ob.name = f'{shape}|{slot}|{lv}'
    ob.data.name = ob.name
    merged.append((ob, shape, slot, lv))
print('[weapons] parts', len(merged), 'faces', sum(len(o.data.polygons) for o, *_ in merged))

if not PREVIEW:
    for o in bpy.context.selected_objects:
        o.select_set(False)
    for ob, *_ in merged:
        for attr in list(ob.data.color_attributes):
            ob.data.color_attributes.remove(attr)
        ob.select_set(True)
    bpy.ops.export_scene.gltf(filepath=OUT, export_format='GLB', use_selection=True, export_normals=True, export_texcoords=False,
                              export_materials='NONE', export_yup=True, export_apply=True, export_animations=False)
    print('[weapons] wrote', OUT, os.path.getsize(OUT) // 1024, 'KB', 'tips', tips)
else:
    P = PAL[PREVIEW]
    names = list(weapons.SHAPES.keys())
    mats = {}
    for ob, shape, slot, lv in merged:
        i = names.index(shape)
        if lv > PLV:
            bpy.data.objects.remove(ob, do_unlink=True); continue
        col = slot_color(slot, P)
        if col not in mats:
            m = bpy.data.materials.new('c%x' % col); m.use_nodes = True
            b = m.node_tree.nodes['Principled BSDF']; b.inputs['Base Color'].default_value = lib.hexcol(col); b.inputs['Roughness'].default_value = 0.6
            if slot.startswith('gem'):
                b.inputs['Emission Color'].default_value = lib.hexcol(col); b.inputs['Emission Strength'].default_value = 1.5
            mats[col] = m
        ob.data.materials.clear(); ob.data.materials.append(mats[col])
        ob.location = Vector(((i % 8) * 2.6 - 9.1, 0, (1 - i // 8) * 4.6))
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'; sc.cycles.samples = 16; sc.cycles.use_denoising = False
    sc.render.resolution_x = 1400; sc.render.resolution_y = 900
    w = bpy.data.worlds.new('w'); w.use_nodes = True; w.node_tree.nodes['Background'].inputs[0].default_value = (0.16, 0.17, 0.22, 1); sc.world = w
    sd = bpy.data.lights.new('sun', 'SUN'); sd.energy = 3.0
    so = bpy.data.objects.new('sun', sd); sc.collection.objects.link(so)
    so.rotation_euler = Vector((0.4, -1.0, 0.8)).normalized().to_track_quat('Z', 'Y').to_euler()
    cam_d = bpy.data.cameras.new('c'); cam_d.type = 'ORTHO'; cam_d.ortho_scale = 21.5
    cam = bpy.data.objects.new('cam', cam_d); sc.collection.objects.link(cam); sc.camera = cam
    cam.location = (0, -20, 3.4); cam.rotation_euler = (math.pi / 2, 0, 0)
    sc.view_settings.view_transform = 'Standard'
    sc.render.filepath = f'/home/claude/shots/wprev_{PREVIEW}{PLV}.png'
    bpy.ops.render.render(write_still=True)
    print('[weapons] preview', sc.render.filepath)
