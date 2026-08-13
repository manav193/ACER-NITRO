'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface CoolingAirflowProps {
  active?: boolean;
}

export function CoolingAirflow({ active = false }: CoolingAirflowProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!active || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.2;
  });

  if (!active) return null;

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Cold Air Intake Sparkles (Blue) */}
      <Sparkles
        count={40}
        scale={[2.5, 0.5, 1.5]}
        size={1.8}
        speed={1.2}
        opacity={0.4}
        color="#38bdf8"
      />

      {/* Warm Air Exhaust Sparkles (Red) */}
      <Sparkles
        count={30}
        scale={[2.5, 0.4, 1.5]}
        size={2.2}
        speed={1.5}
        opacity={0.5}
        color="#ff3b00"
      />
    </group>
  );
}
