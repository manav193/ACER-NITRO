import * as THREE from 'three';

export interface LaptopPartRegistry {
  chassis?: THREE.Object3D;
  lid?: THREE.Object3D;
  display?: THREE.Object3D;
  keyboard?: THREE.Object3D;
  numpad?: THREE.Object3D;
  trackpad?: THREE.Object3D;
  nitroSenseKey?: THREE.Object3D;
  copilotKey?: THREE.Object3D;
  camera?: THREE.Object3D;
  bottomPanel?: THREE.Object3D;
  fanLeft?: THREE.Object3D;
  fanRight?: THREE.Object3D;
  leftPorts?: THREE.Object3D;
  rightPorts?: THREE.Object3D;
}

export function registerLaptopParts(root: THREE.Object3D): LaptopPartRegistry {
  const registry: LaptopPartRegistry = {};

  root.traverse((node) => {
    const name = node.name.toLowerCase();

    if (name.includes('chassis') || name.includes('base') || name.includes('body')) {
      registry.chassis = node;
    } else if (name.includes('lid') || name.includes('top')) {
      registry.lid = node;
    } else if (name.includes('screen') || name.includes('display') || name.includes('panel')) {
      registry.display = node;
    } else if (name.includes('keyboard') || name.includes('keys')) {
      registry.keyboard = node;
    } else if (name.includes('numpad')) {
      registry.numpad = node;
    } else if (name.includes('trackpad') || name.includes('touchpad')) {
      registry.trackpad = node;
    } else if (name.includes('nitrosense') || name.includes('nitro_key')) {
      registry.nitroSenseKey = node;
    } else if (name.includes('copilot')) {
      registry.copilotKey = node;
    } else if (name.includes('webcam') || name.includes('camera')) {
      registry.camera = node;
    } else if (name.includes('bottom') || name.includes('vent')) {
      registry.bottomPanel = node;
    } else if (name.includes('fan_l') || name.includes('fanleft')) {
      registry.fanLeft = node;
    } else if (name.includes('fan_r') || name.includes('fanright')) {
      registry.fanRight = node;
    } else if (name.includes('left_port') || name.includes('ports_l')) {
      registry.leftPorts = node;
    } else if (name.includes('right_port') || name.includes('ports_r')) {
      registry.rightPorts = node;
    }
  });

  return registry;
}
