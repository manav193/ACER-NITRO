const fs = require('fs');
const path = require('path');

const glbPath = 'C:/Users/manav/OneDrive/ACER-NITRO/public/models/nitro-anv15-41.glb';
if (!fs.existsSync(glbPath)) {
  console.log('GLB_EXISTS: FALSE');
  process.exit(0);
}

const stats = fs.statSync(glbPath);
console.log('==================================================');
console.log('FORENSIC AUDIT OF public/models/nitro-anv15-41.glb');
console.log('==================================================');
console.log('GLB_EXISTS: TRUE');
console.log('FILE_SIZE_BYTES:', stats.size);
console.log('FILE_SIZE_MB:', (stats.size / (1024 * 1024)).toFixed(2) + ' MB');

const buf = fs.readFileSync(glbPath);
const magic = buf.readUInt32LE(0);
const version = buf.readUInt32LE(4);
const length = buf.readUInt32LE(8);

console.log('GLB_MAGIC:', magic.toString(16) === '46544c67' ? '0x46544C67 (glTF)' : magic.toString(16));
console.log('GLB_VERSION:', version);
console.log('GLB_HEADER_LENGTH:', length);

const jsonChunkLen = buf.readUInt32LE(12);
const jsonChunkType = buf.readUInt32LE(16);
const jsonBuf = buf.subarray(20, 20 + jsonChunkLen);
const gltf = JSON.parse(jsonBuf.toString('utf8'));

console.log('\n--- GLTF METADATA ---');
console.log('Generator:', gltf.asset ? gltf.asset.generator : 'N/A');
console.log('Nodes count:', gltf.nodes ? gltf.nodes.length : 0);
console.log('Meshes count:', gltf.meshes ? gltf.meshes.length : 0);
console.log('Materials count:', gltf.materials ? gltf.materials.length : 0);
console.log('Textures count:', gltf.textures ? gltf.textures.length : 0);
console.log('Images count:', gltf.images ? gltf.images.length : 0);

console.log('\n--- COMPLETE NODE HIERARCHY ---');
gltf.nodes.forEach((node, i) => {
  const meshInfo = node.mesh !== undefined ? ` | Mesh [${node.mesh}] "${gltf.meshes[node.mesh]?.name || 'UNNAMED'}"` : '';
  const childrenInfo = node.children ? ` | Children: [${node.children.join(', ')}]` : '';
  const posInfo = node.translation ? ` | Pos: ${JSON.stringify(node.translation)}` : '';
  const rotInfo = node.rotation ? ` | Rot: ${JSON.stringify(node.rotation)}` : '';
  const scaleInfo = node.scale ? ` | Scale: ${JSON.stringify(node.scale)}` : '';
  console.log(`Node [${i}]: "${node.name || 'UNNAMED'}"${meshInfo}${childrenInfo}${posInfo}${rotInfo}${scaleInfo}`);
});

console.log('\n--- MESHES & PRIMITIVES ---');
gltf.meshes.forEach((mesh, i) => {
  console.log(`Mesh [${i}]: "${mesh.name || 'UNNAMED'}" | Primitives: ${mesh.primitives.length}`);
  mesh.primitives.forEach((prim, j) => {
    const matIdx = prim.material;
    const matName = matIdx !== undefined && gltf.materials && gltf.materials[matIdx] ? gltf.materials[matIdx].name : 'DEFAULT';
    console.log(`  Primitive ${j}: Material [${matIdx}] "${matName}"`);
  });
});

console.log('\n--- MATERIALS LIST ---');
gltf.materials.forEach((mat, i) => {
  console.log(`Material [${i}]: "${mat.name}" | PBR: ${JSON.stringify(mat.pbrMetallicRoughness || {})}`);
});
