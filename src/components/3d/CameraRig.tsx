'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { CameraPresetName, getCameraPresetConfig } from '@/lib/cameraPresets';

interface CameraRigProps {
  presetName?: CameraPresetName;
  reducedMotion?: boolean;
}

export function CameraRig({ presetName = 'HERO', reducedMotion = false }: CameraRigProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { viewport } = useThree();

  const tier = viewport.width < 5 ? 'mobile' : viewport.width < 9 ? 'tablet' : 'desktop';
  const targetConfig = getCameraPresetConfig(presetName, tier);

  const targetPos = useRef(new THREE.Vector3(...targetConfig.position));
  const lookAtTarget = useRef(new THREE.Vector3(...targetConfig.target));

  useEffect(() => {
    const cfg = getCameraPresetConfig(presetName, tier);
    targetPos.current.set(...cfg.position);
    lookAtTarget.current.set(...cfg.target);

    if (cameraRef.current && cameraRef.current.fov !== cfg.fov) {
      cameraRef.current.fov = cfg.fov;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [presetName, tier]);

  useFrame((state, delta) => {
    if (!cameraRef.current) return;

    const cfg = getCameraPresetConfig(presetName, tier);

    if (!reducedMotion && presetName === 'HERO') {
      const mx = state.pointer.x * 0.2;
      const my = state.pointer.y * 0.12;

      targetPos.current.set(
        cfg.position[0] + mx,
        cfg.position[1] + my,
        cfg.position[2]
      );
    } else {
      targetPos.current.set(...cfg.position);
    }

    // Delta-time aware critically damped camera movement for 60fps+ stability
    const dampFactor = 6;
    cameraRef.current.position.x = THREE.MathUtils.damp(
      cameraRef.current.position.x,
      targetPos.current.x,
      dampFactor,
      delta
    );
    cameraRef.current.position.y = THREE.MathUtils.damp(
      cameraRef.current.position.y,
      targetPos.current.y,
      dampFactor,
      delta
    );
    cameraRef.current.position.z = THREE.MathUtils.damp(
      cameraRef.current.position.z,
      targetPos.current.z,
      dampFactor,
      delta
    );

    cameraRef.current.lookAt(lookAtTarget.current);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={targetConfig.fov}
      near={targetConfig.near}
      far={targetConfig.far}
      position={targetConfig.position}
    />
  );
}
