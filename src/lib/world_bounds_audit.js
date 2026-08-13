const fs = require('fs');
const * as THREE = require('three');

// Write a simple Three.js hierarchy evaluator
const glbPath = 'C:/Users/manav/OneDrive/ACER-NITRO/public/models/nitro-anv15-41.glb';
const buf = fs.readFileSync(glbPath);
const jsonChunkLen = buf.readUInt32LE(12);
const jsonBuf = buf.subarray(20, 20 + jsonChunkLen);
const gltf = JSON.parse(jsonBuf.toString('utf8'));

console.log('--- AXIS & ORIENTATION ANALYSIS ---');
console.log('Root Node [3] Translation:', gltf.nodes[3].translation || [0,0,0]);
console.log('Root Node [3] Scale:', gltf.nodes[3].scale || [1,1,1]);
console.log('Root Node [3] Rotation:', gltf.nodes[3].rotation || [0,0,0,1]);
