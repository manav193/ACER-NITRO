import { CameraConfig } from '@/types';

export type CameraPresetName =
  | 'HERO'
  | 'FRONT'
  | 'THREE_QUARTER'
  | 'DISPLAY_CLOSE'
  | 'KEYBOARD_CLOSE'
  | 'NUMPAD_CLOSE'
  | 'NITROSENSE_CLOSE'
  | 'COPILOT_CLOSE'
  | 'TRACKPAD_CLOSE'
  | 'INPUT_SUMMARY'
  | 'BOTTOM'
  | 'FAN_LEFT'
  | 'FAN_RIGHT'
  | 'AIRFLOW'
  | 'COOLING_SUMMARY'
  | 'PORTS_INTRO'
  | 'LEFT_PORTS'
  | 'LEFT_POWER'
  | 'LEFT_HDMI'
  | 'LEFT_USB_C'
  | 'RIGHT_PORTS'
  | 'RIGHT_HEADPHONE'
  | 'PORTS_SUMMARY'
  | 'EXPLORER';

export interface CameraPresetConfig {
  name: CameraPresetName;
  desktop: CameraConfig;
  tablet: CameraConfig;
  mobile: CameraConfig;
  laptopRotation?: [number, number, number];
  laptopPosition?: [number, number, number];
}

export const CAMERA_PRESETS: Record<CameraPresetName, CameraPresetConfig> = {
  HERO: {
    name: 'HERO',
    desktop: { fov: 35, near: 0.1, far: 100, position: [0, 0.8, 4.2], target: [0, 0, 0] },
    tablet: { fov: 38, near: 0.1, far: 100, position: [0, 1.0, 4.8], target: [0, 0, 0] },
    mobile: { fov: 42, near: 0.1, far: 100, position: [0, 1.2, 5.6], target: [0, 0, 0] },
    laptopRotation: [0.15, -0.45, 0.05],
    laptopPosition: [0, -0.15, 0],
  },
  FRONT: {
    name: 'FRONT',
    desktop: { fov: 32, near: 0.1, far: 100, position: [0, 0.2, 3.8], target: [0, 0.2, 0] },
    tablet: { fov: 36, near: 0.1, far: 100, position: [0, 0.3, 4.4], target: [0, 0.2, 0] },
    mobile: { fov: 40, near: 0.1, far: 100, position: [0, 0.4, 5.0], target: [0, 0.2, 0] },
    laptopRotation: [0.08, 0, 0],
    laptopPosition: [0, -0.1, 0],
  },
  THREE_QUARTER: {
    name: 'THREE_QUARTER',
    desktop: { fov: 35, near: 0.1, far: 100, position: [1.8, 0.9, 3.8], target: [0, 0, 0] },
    tablet: { fov: 38, near: 0.1, far: 100, position: [2.0, 1.1, 4.4], target: [0, 0, 0] },
    mobile: { fov: 42, near: 0.1, far: 100, position: [2.2, 1.3, 5.2], target: [0, 0, 0] },
    laptopRotation: [0.12, -0.35, 0.04],
    laptopPosition: [0, -0.15, 0],
  },
  DISPLAY_CLOSE: {
    name: 'DISPLAY_CLOSE',
    desktop: { fov: 28, near: 0.1, far: 100, position: [0, 0.55, 2.5], target: [0, 0.55, 0] },
    tablet: { fov: 32, near: 0.1, far: 100, position: [0, 0.58, 3.0], target: [0, 0.55, 0] },
    mobile: { fov: 36, near: 0.1, far: 100, position: [0, 0.62, 3.6], target: [0, 0.55, 0] },
    laptopRotation: [0.02, 0, 0],
    laptopPosition: [0, -0.05, 0.2],
  },
  KEYBOARD_CLOSE: {
    name: 'KEYBOARD_CLOSE',
    desktop: { fov: 30, near: 0.1, far: 100, position: [0, 1.8, 1.6], target: [0, -0.1, 0.2] },
    tablet: { fov: 34, near: 0.1, far: 100, position: [0, 2.0, 2.0], target: [0, -0.1, 0.2] },
    mobile: { fov: 38, near: 0.1, far: 100, position: [0, 2.3, 2.5], target: [0, -0.1, 0.2] },
    laptopRotation: [0.3, -0.15, 0],
    laptopPosition: [0, -0.2, 0],
  },
  NUMPAD_CLOSE: {
    name: 'NUMPAD_CLOSE',
    desktop: { fov: 26, near: 0.1, far: 100, position: [0.65, 1.7, 1.4], target: [0.65, -0.1, 0.1] },
    tablet: { fov: 30, near: 0.1, far: 100, position: [0.65, 1.9, 1.8], target: [0.65, -0.1, 0.1] },
    mobile: { fov: 34, near: 0.1, far: 100, position: [0.65, 2.2, 2.2], target: [0.65, -0.1, 0.1] },
    laptopRotation: [0.32, -0.1, 0],
    laptopPosition: [-0.3, -0.18, 0],
  },
  NITROSENSE_CLOSE: {
    name: 'NITROSENSE_CLOSE',
    desktop: { fov: 24, near: 0.1, far: 100, position: [0.42, 1.2, 1.1], target: [0.42, -0.05, 0.0] },
    tablet: { fov: 28, near: 0.1, far: 100, position: [0.42, 1.4, 1.4], target: [0.42, -0.05, 0.0] },
    mobile: { fov: 32, near: 0.1, far: 100, position: [0.42, 1.7, 1.8], target: [0.42, -0.05, 0.0] },
    laptopRotation: [0.28, -0.08, 0],
    laptopPosition: [-0.2, -0.12, 0],
  },
  COPILOT_CLOSE: {
    name: 'COPILOT_CLOSE',
    desktop: { fov: 24, near: 0.1, far: 100, position: [0.22, 1.2, 1.1], target: [0.22, -0.05, 0.4] },
    tablet: { fov: 28, near: 0.1, far: 100, position: [0.22, 1.4, 1.4], target: [0.22, -0.05, 0.4] },
    mobile: { fov: 32, near: 0.1, far: 100, position: [0.22, 1.7, 1.8], target: [0.22, -0.05, 0.4] },
    laptopRotation: [0.28, -0.05, 0],
    laptopPosition: [-0.1, -0.12, 0],
  },
  TRACKPAD_CLOSE: {
    name: 'TRACKPAD_CLOSE',
    desktop: { fov: 26, near: 0.1, far: 100, position: [-0.2, 1.1, 1.1], target: [-0.2, -0.1, 0.55] },
    tablet: { fov: 30, near: 0.1, far: 100, position: [-0.2, 1.3, 1.4], target: [-0.2, -0.1, 0.55] },
    mobile: { fov: 34, near: 0.1, far: 100, position: [-0.2, 1.6, 1.8], target: [-0.2, -0.1, 0.55] },
    laptopRotation: [0.25, 0, 0],
    laptopPosition: [0.1, -0.15, 0],
  },
  INPUT_SUMMARY: {
    name: 'INPUT_SUMMARY',
    desktop: { fov: 32, near: 0.1, far: 100, position: [0, 1.8, 1.8], target: [0, -0.1, 0.2] },
    tablet: { fov: 36, near: 0.1, far: 100, position: [0, 2.0, 2.2], target: [0, -0.1, 0.2] },
    mobile: { fov: 40, near: 0.1, far: 100, position: [0, 2.3, 2.7], target: [0, -0.1, 0.2] },
    laptopRotation: [0.3, -0.12, 0],
    laptopPosition: [0, -0.18, 0],
  },
  BOTTOM: {
    name: 'BOTTOM',
    desktop: { fov: 35, near: 0.1, far: 100, position: [0, -1.2, 3.2], target: [0, -0.2, 0] },
    tablet: { fov: 38, near: 0.1, far: 100, position: [0, -1.4, 3.8], target: [0, -0.2, 0] },
    mobile: { fov: 42, near: 0.1, far: 100, position: [0, -1.6, 4.4], target: [0, -0.2, 0] },
    laptopRotation: [-0.35, 0.5, 0],
    laptopPosition: [0, 0.1, 0],
  },
  FAN_LEFT: {
    name: 'FAN_LEFT',
    desktop: { fov: 28, near: 0.1, far: 100, position: [-0.8, -1.1, 2.5], target: [-0.8, 0, 0] },
    tablet: { fov: 32, near: 0.1, far: 100, position: [-0.8, -1.3, 3.0], target: [-0.8, 0, 0] },
    mobile: { fov: 36, near: 0.1, far: 100, position: [-0.8, -1.5, 3.6], target: [-0.8, 0, 0] },
    laptopRotation: [-0.38, 0.45, 0],
    laptopPosition: [0.3, 0.15, 0],
  },
  FAN_RIGHT: {
    name: 'FAN_RIGHT',
    desktop: { fov: 28, near: 0.1, far: 100, position: [0.8, -1.1, 2.5], target: [0.8, 0, 0] },
    tablet: { fov: 32, near: 0.1, far: 100, position: [0.8, -1.3, 3.0], target: [0.8, 0, 0] },
    mobile: { fov: 36, near: 0.1, far: 100, position: [0.8, -1.5, 3.6], target: [0.8, 0, 0] },
    laptopRotation: [-0.38, 0.55, 0],
    laptopPosition: [-0.3, 0.15, 0],
  },
  AIRFLOW: {
    name: 'AIRFLOW',
    desktop: { fov: 32, near: 0.1, far: 100, position: [0, -1.3, 3.0], target: [0, 0, 0] },
    tablet: { fov: 36, near: 0.1, far: 100, position: [0, -1.5, 3.6], target: [0, 0, 0] },
    mobile: { fov: 40, near: 0.1, far: 100, position: [0, -1.7, 4.2], target: [0, 0, 0] },
    laptopRotation: [-0.4, 0.5, 0],
    laptopPosition: [0, 0.12, 0],
  },
  COOLING_SUMMARY: {
    name: 'COOLING_SUMMARY',
    desktop: { fov: 35, near: 0.1, far: 100, position: [0, -1.0, 3.5], target: [0, 0, 0] },
    tablet: { fov: 38, near: 0.1, far: 100, position: [0, -1.2, 4.0], target: [0, 0, 0] },
    mobile: { fov: 42, near: 0.1, far: 100, position: [0, -1.4, 4.6], target: [0, 0, 0] },
    laptopRotation: [-0.3, 0.45, 0],
    laptopPosition: [0, 0.08, 0],
  },
  PORTS_INTRO: {
    name: 'PORTS_INTRO',
    desktop: { fov: 34, near: 0.1, far: 100, position: [1.5, 0.4, 3.5], target: [0, 0, 0] },
    tablet: { fov: 38, near: 0.1, far: 100, position: [1.8, 0.5, 4.0], target: [0, 0, 0] },
    mobile: { fov: 42, near: 0.1, far: 100, position: [2.0, 0.6, 4.6], target: [0, 0, 0] },
    laptopRotation: [0.1, -0.5, 0],
    laptopPosition: [0, -0.1, 0],
  },
  LEFT_PORTS: {
    name: 'LEFT_PORTS',
    desktop: { fov: 30, near: 0.1, far: 100, position: [-2.2, 0.2, 2.2], target: [-0.6, -0.1, 0] },
    tablet: { fov: 34, near: 0.1, far: 100, position: [-2.5, 0.3, 2.6], target: [-0.6, -0.1, 0] },
    mobile: { fov: 38, near: 0.1, far: 100, position: [-2.8, 0.4, 3.0], target: [-0.6, -0.1, 0] },
    laptopRotation: [0.1, 0.65, 0],
    laptopPosition: [0.2, -0.1, 0],
  },
  LEFT_POWER: {
    name: 'LEFT_POWER',
    desktop: { fov: 24, near: 0.1, far: 100, position: [-2.3, 0.1, 1.8], target: [-0.8, -0.05, -0.3] },
    tablet: { fov: 28, near: 0.1, far: 100, position: [-2.5, 0.2, 2.2], target: [-0.8, -0.05, -0.3] },
    mobile: { fov: 32, near: 0.1, far: 100, position: [-2.8, 0.3, 2.6], target: [-0.8, -0.05, -0.3] },
    laptopRotation: [0.08, 0.7, 0],
    laptopPosition: [0.3, -0.08, 0],
  },
  LEFT_HDMI: {
    name: 'LEFT_HDMI',
    desktop: { fov: 24, near: 0.1, far: 100, position: [-2.3, 0.1, 2.0], target: [-0.8, -0.05, 0.0] },
    tablet: { fov: 28, near: 0.1, far: 100, position: [-2.5, 0.2, 2.4], target: [-0.8, -0.05, 0.0] },
    mobile: { fov: 32, near: 0.1, far: 100, position: [-2.8, 0.3, 2.8], target: [-0.8, -0.05, 0.0] },
    laptopRotation: [0.08, 0.68, 0],
    laptopPosition: [0.3, -0.08, 0],
  },
  LEFT_USB_C: {
    name: 'LEFT_USB_C',
    desktop: { fov: 24, near: 0.1, far: 100, position: [-2.3, 0.1, 2.4], target: [-0.8, -0.05, 0.45] },
    tablet: { fov: 28, near: 0.1, far: 100, position: [-2.5, 0.2, 2.8], target: [-0.8, -0.05, 0.45] },
    mobile: { fov: 32, near: 0.1, far: 100, position: [-2.8, 0.3, 3.2], target: [-0.8, -0.05, 0.45] },
    laptopRotation: [0.08, 0.65, 0],
    laptopPosition: [0.3, -0.08, 0],
  },
  RIGHT_PORTS: {
    name: 'RIGHT_PORTS',
    desktop: { fov: 30, near: 0.1, far: 100, position: [2.2, 0.2, 2.2], target: [0.6, -0.1, 0] },
    tablet: { fov: 34, near: 0.1, far: 100, position: [2.5, 0.3, 2.6], target: [0.6, -0.1, 0] },
    mobile: { fov: 38, near: 0.1, far: 100, position: [2.8, 0.4, 3.0], target: [0.6, -0.1, 0] },
    laptopRotation: [0.1, -0.65, 0],
    laptopPosition: [-0.2, -0.1, 0],
  },
  RIGHT_HEADPHONE: {
    name: 'RIGHT_HEADPHONE',
    desktop: { fov: 24, near: 0.1, far: 100, position: [2.3, 0.1, 2.4], target: [0.8, -0.05, 0.3] },
    tablet: { fov: 28, near: 0.1, far: 100, position: [2.5, 0.2, 2.8], target: [0.8, -0.05, 0.3] },
    mobile: { fov: 32, near: 0.1, far: 100, position: [2.8, 0.3, 3.2], target: [0.8, -0.05, 0.3] },
    laptopRotation: [0.08, -0.68, 0],
    laptopPosition: [-0.3, -0.08, 0],
  },
  PORTS_SUMMARY: {
    name: 'PORTS_SUMMARY',
    desktop: { fov: 34, near: 0.1, far: 100, position: [0, 1.0, 4.0], target: [0, -0.1, 0] },
    tablet: { fov: 38, near: 0.1, far: 100, position: [0, 1.2, 4.6], target: [0, -0.1, 0] },
    mobile: { fov: 42, near: 0.1, far: 100, position: [0, 1.4, 5.2], target: [0, -0.1, 0] },
    laptopRotation: [0.15, -0.4, 0],
    laptopPosition: [0, -0.12, 0],
  },
  EXPLORER: {
    name: 'EXPLORER',
    desktop: { fov: 35, near: 0.1, far: 100, position: [0, 1.2, 4.5], target: [0, 0, 0] },
    tablet: { fov: 38, near: 0.1, far: 100, position: [0, 1.4, 5.0], target: [0, 0, 0] },
    mobile: { fov: 42, near: 0.1, far: 100, position: [0, 1.6, 5.6], target: [0, 0, 0] },
    laptopRotation: [0, 0, 0],
    laptopPosition: [0, 0, 0],
  },
};

export function getCameraPresetConfig(
  name: CameraPresetName,
  tier: 'desktop' | 'tablet' | 'mobile' = 'desktop'
): CameraConfig {
  const preset = CAMERA_PRESETS[name] || CAMERA_PRESETS.HERO;
  return preset[tier] || preset.desktop;
}
