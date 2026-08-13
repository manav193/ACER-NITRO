import { Vector3, Euler } from 'three';
import * as THREE from 'three';

export interface TransformState {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

export interface CameraConfig {
  fov: number;
  near: number;
  far: number;
  position: [number, number, number];
  target: [number, number, number];
}

export interface LaptopMeshNodes {
  chassis?: THREE.Mesh | THREE.Group;
  lid?: THREE.Mesh | THREE.Group;
  display?: THREE.Mesh | THREE.Group;
  keyboard?: THREE.Mesh | THREE.Group;
  numpad?: THREE.Mesh | THREE.Group;
  trackpad?: THREE.Mesh | THREE.Group;
  nitroSenseKey?: THREE.Mesh | THREE.Group;
  copilotKey?: THREE.Mesh | THREE.Group;
  camera?: THREE.Mesh | THREE.Group;
  bottomPanel?: THREE.Mesh | THREE.Group;
  leftPorts?: THREE.Mesh | THREE.Group;
  rightPorts?: THREE.Mesh | THREE.Group;
  fanLeft?: THREE.Mesh | THREE.Group;
  fanRight?: THREE.Mesh | THREE.Group;
}

export interface ExperienceState {
  isLoaded: boolean;
  reducedMotion: boolean;
  webglSupported: boolean;
  deviceTier: 'desktop' | 'tablet' | 'mobile';
  modelAvailable: boolean;
  activeSection: string;
  scrollProgress: number;
}
