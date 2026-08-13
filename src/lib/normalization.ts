import * as THREE from 'three';

export interface LaptopBoundsInfo {
  box: THREE.Box3;
  sphere: THREE.Sphere;
  center: THREE.Vector3;
  dimensions: THREE.Vector3;
}

export function getLaptopBounds(object: THREE.Object3D): LaptopBoundsInfo {
  const box = new THREE.Box3().setFromObject(object);
  const sphere = new THREE.Sphere();
  box.getBoundingSphere(sphere);
  const center = new THREE.Vector3();
  box.getCenter(center);
  const dimensions = new THREE.Vector3();
  box.getSize(dimensions);

  return {
    box,
    sphere,
    center,
    dimensions,
  };
}

export function getLaptopCenter(object: THREE.Object3D): THREE.Vector3 {
  const bounds = getLaptopBounds(object);
  return bounds.center;
}

export function getLaptopDimensions(object: THREE.Object3D): THREE.Vector3 {
  const bounds = getLaptopBounds(object);
  return bounds.dimensions;
}

export function normalizeLaptopTransform(
  object: THREE.Object3D,
  targetWidth: number = 2.4
): THREE.Vector3 {
  const bounds = getLaptopBounds(object);

  // Center geometry at origin (0,0,0)
  object.position.x -= bounds.center.x;
  object.position.y -= bounds.center.y;
  object.position.z -= bounds.center.z;

  // Scale object uniformly to target width
  if (bounds.dimensions.x > 0) {
    const scaleFactor = targetWidth / bounds.dimensions.x;
    object.scale.set(scaleFactor, scaleFactor, scaleFactor);
  }

  return bounds.dimensions;
}
