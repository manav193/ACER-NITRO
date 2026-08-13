'use client';

import React from 'react';
import { Sparkles } from '@react-three/drei';
import { COLORS } from '@/lib/constants';
import { LightingPresetName } from '@/lib/lightingPresets';

interface EnvironmentProps {
  lightingPreset?: LightingPresetName;
}

export function Environment({ lightingPreset = 'HERO_LIGHTING' }: EnvironmentProps) {
  // Topic-specific particle parameters
  const isDisplay = lightingPreset === 'DISPLAY_LIGHTING';
  const isKeyboard = lightingPreset === 'KEYBOARD_LIGHTING';

  const particleColor = isDisplay ? COLORS.secondaryLightBlue : isKeyboard ? '#ffffff' : COLORS.rimLightRed;
  const particleCount = isDisplay ? 45 : isKeyboard ? 25 : 35;
  const particleSpeed = isDisplay ? 0.6 : 0.3;

  return (
    <>
      {/* Dark Studio Background Color */}
      <color attach="background" args={[COLORS.bg]} />

      {/* Atmospheric Depth Fog */}
      <fog attach="fog" args={[COLORS.bg, 6, 20]} />

      {/* Dynamic Topic-Specific Atmosphere Sparkles */}
      <Sparkles
        count={particleCount}
        scale={[8, 8, 8]}
        size={1.2}
        speed={particleSpeed}
        opacity={0.15}
        color={particleColor}
      />
    </>
  );
}
