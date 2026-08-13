import gsap from 'gsap';
import * as THREE from 'three';
import { CameraConfig } from '@/types';

export function animateCameraTo(
  camera: THREE.PerspectiveCamera,
  targetConfig: Partial<CameraConfig>,
  duration: number = 1.5,
  ease: string = 'power3.inOut'
): gsap.core.Timeline {
  const tl = gsap.timeline();

  if (targetConfig.position) {
    tl.to(
      camera.position,
      {
        x: targetConfig.position[0],
        y: targetConfig.position[1],
        z: targetConfig.position[2],
        duration,
        ease,
      },
      0
    );
  }

  if (targetConfig.fov) {
    tl.to(
      camera,
      {
        fov: targetConfig.fov,
        duration,
        ease,
        onUpdate: () => camera.updateProjectionMatrix(),
      },
      0
    );
  }

  return tl;
}
