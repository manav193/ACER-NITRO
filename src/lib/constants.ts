export const MODEL_PATH = '/models/nitro-anv15-41.glb';

export const COLORS = {
  bg: '#070709',
  card: '#101116',
  nitroRed: '#ff3b00',
  nitroRedSubtle: 'rgba(255, 59, 0, 0.25)',
  ambientLight: '#ffffff',
  rimLightRed: '#ff3b00',
  secondaryLightBlue: '#3b82f6',
  whiteKeyBacklight: '#f1f5f9',
};

export const INITIAL_CAMERA = {
  fov: 35,
  position: [0, 0.8, 4.2] as [number, number, number],
  target: [0, 0, 0] as [number, number, number],
};

export const HERO_LAPTOP_TRANSFORM = {
  position: [0, -0.15, 0] as [number, number, number],
  rotation: [0.15, -0.45, 0.05] as [number, number, number],
  scale: [1, 1, 1] as [number, number, number],
};
