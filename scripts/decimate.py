import pymeshlab
import sys
import os

input_path = os.path.join('public', 'models', 'robot-model.glb')
output_path = os.path.join('public', 'models', 'robot-model-lite.glb')
target_faces = 5000

ms = pymeshlab.MeshSet()
ms.load_new_mesh(input_path)

current = ms.current_mesh()
print(f"Before: {current.vertex_number()} vertices, {current.face_number()} faces")

ms.apply_filter('meshing_decimation_quadric_edge_collapse',
                targetfacenum=target_faces,
                qualitythr=0.5,
                preserveboundary=True,
                preservenormal=True,
                preservetopology=False,
                planarquadric=True)

current = ms.current_mesh()
print(f"After: {current.vertex_number()} vertices, {current.face_number()} faces")

ms.save_current_mesh(output_path)
size_kb = os.path.getsize(output_path) / 1024
print(f"Saved: {output_path} ({size_kb:.0f} KB)")
