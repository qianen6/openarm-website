import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { SimplifyModifier } from 'three/addons/modifiers/SimplifyModifier.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import fs from 'fs';
import path from 'path';

const inputPath = path.resolve('public/models/robot-model.glb');
const outputPath = path.resolve('public/models/robot-model-lite.glb');

const data = fs.readFileSync(inputPath);
const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
loader.setDRACOLoader(dracoLoader);

loader.parse(arrayBuffer, '', async (gltf) => {
  const scene = gltf.scene;
  const modifier = new SimplifyModifier();
  
  let totalBefore = 0;
  let totalAfter = 0;
  
  scene.traverse((child) => {
    if (child.isMesh && child.geometry) {
      const geo = child.geometry;
      const vertexCount = geo.attributes.position.count;
      totalBefore += vertexCount;
      
      const targetCount = Math.max(Math.floor(vertexCount * 0.05), 4);
      
      try {
        const simplified = modifier.modify(geo, Math.max(vertexCount - targetCount, 0));
        child.geometry = simplified;
        totalAfter += simplified.attributes.position.count;
        console.log(`  ${child.name || 'unnamed'}: ${vertexCount} → ${simplified.attributes.position.count}`);
      } catch (e) {
        totalAfter += vertexCount;
        console.log(`  ${child.name || 'unnamed'}: ${vertexCount} (kept, simplify failed)`);
      }
    }
  });
  
  console.log(`\nTotal: ${totalBefore} → ${totalAfter} vertices (${((1 - totalAfter/totalBefore) * 100).toFixed(1)}% reduction)`);
  
  const exporter = new GLTFExporter();
  const result = await exporter.parseAsync(scene, { binary: true });
  
  fs.writeFileSync(outputPath, Buffer.from(result));
  console.log(`\nSaved to ${outputPath} (${(fs.statSync(outputPath).size / 1024).toFixed(0)} KB)`);
  
  process.exit(0);
}, (error) => {
  console.error('Failed to load model:', error);
  process.exit(1);
});
