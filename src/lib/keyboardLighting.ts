import * as THREE from 'three';

export type KeyboardBacklightState = 'OFF' | 'DIM' | 'ACTIVE';

export interface BacklightConfig {
  state: KeyboardBacklightState;
  color: string;
  intensity: number;
}

export const BACKLIGHT_STATES: Record<KeyboardBacklightState, BacklightConfig> = {
  OFF: {
    state: 'OFF',
    color: '#ffffff',
    intensity: 0,
  },
  DIM: {
    state: 'DIM',
    color: '#ffffff',
    intensity: 0.15,
  },
  ACTIVE: {
    state: 'ACTIVE',
    color: '#ffffff',
    intensity: 0.45,
  },
};

export function applyKeyboardBacklight(
  keyboardMesh: THREE.Object3D | null,
  state: KeyboardBacklightState = 'ACTIVE'
) {
  if (!keyboardMesh) return;

  const config = BACKLIGHT_STATES[state];

  keyboardMesh.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
        if ('emissive' in mat && 'emissiveIntensity' in mat) {
          (mat as any).emissive.set(config.color);
          (mat as any).emissiveIntensity = config.intensity;
        }
      }
    }
  });
}
