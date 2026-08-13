'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export type SignalType = 'NONE' | 'POWER_ETHERNET' | 'HDMI' | 'USB_C' | 'HEADPHONE';

interface SignalVisualizationProps {
  type?: SignalType;
}

export function SignalVisualization({ type = 'NONE' }: SignalVisualizationProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  if (type === 'NONE') return null;

  let color = '#38bdf8';
  let position: [number, number, number] = [-1.3, -0.03, 0];
  let scale: [number, number, number] = [0.4, 0.4, 0.4];

  if (type === 'POWER_ETHERNET') {
    color = '#ff3b00';
    position = [-1.3, -0.03, -0.3];
  } else if (type === 'HDMI') {
    color = '#3b82f6';
    position = [-1.3, -0.03, 0.0];
  } else if (type === 'USB_C') {
    color = '#38bdf8';
    position = [-1.3, -0.03, 0.45];
  } else if (type === 'HEADPHONE') {
    color = '#a855f7';
    position = [1.3, -0.03, 0.3];
  }

  return (
    <group ref={groupRef} position={position}>
      <Sparkles
        count={20}
        scale={scale}
        size={1.5}
        speed={0.8}
        opacity={0.6}
        color={color}
      />
    </group>
  );
}
