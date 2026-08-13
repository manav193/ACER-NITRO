const fs = require('fs');
const path = require('path');

const glbPath = 'C:/Users/manav/OneDrive/ACER-NITRO/public/models/nitro-anv15-41.glb';
if (!fs.existsSync(glbPath)) {
  console.log('GLB file not found!');
  process.exit(1);
}

const buf = fs.readFileSync(glbPath);
const jsonChunkLen = buf.readUInt32LE(12);
const jsonBuf = buf.subarray(20, 20 + jsonChunkLen);
const gltf = JSON.parse(jsonBuf.toString('utf8'));

console.log('==================================================');
console.log('DETAILED GEOMETRY & BOUNDING BOX FORENSIC AUDIT');
console.log('==================================================');

// Extract Accessors for min/max position bounding boxes
console.log('\n--- POSITION ACCESSOR BOUNDING BOXES ---');
const nodeBounds = [];

gltf.meshes.forEach((mesh, meshIdx) => {
  mesh.primitives.forEach((prim, primIdx) => {
    if (prim.attributes && prim.attributes.POSITION !== undefined) {
      const accIdx = prim.attributes.POSITION;
      const acc = gltf.accessors[accIdx];
      if (acc && acc.min && acc.max) {
        console.log(`Mesh [${meshIdx}] "${mesh.name}" Prim ${primIdx}:`);
        console.log(`  Min [X, Y, Z]: [${acc.min.join(', ')}]`);
        console.log(`  Max [X, Y, Z]: [${acc.max.join(', ')}]`);
        const dims = [
          (acc.max[0] - acc.min[0]).toFixed(4),
          (acc.max[1] - acc.min[1]).toFixed(4),
          (acc.max[2] - acc.min[2]).toFixed(4)
        ];
        console.log(`  Dimensions [W(X), H(Y), D(Z)]: [${dims.join(', ')}]`);
      }
    }
  });
});

console.log('\n--- COMPLETE SCENE ROOT HIERARCHY & TRANSFORMS ---');
gltf.nodes.forEach((node, i) => {
  console.log(`Node [${i}]: "${node.name || 'UNNAMED'}"`);
  if (node.translation) console.log(`  Translation: ${JSON.stringify(node.translation)}`);
  if (node.rotation) console.log(`  Rotation (Quaternion): ${JSON.stringify(node.rotation)}`);
  if (node.scale) console.log(`  Scale: ${JSON.stringify(node.scale)}`);
  if (node.mesh !== undefined) console.log(`  Mesh [${node.mesh}]: "${gltf.meshes[node.mesh]?.name}"`);
  if (node.children) console.log(`  Children: ${JSON.stringify(node.children)}`);
});
