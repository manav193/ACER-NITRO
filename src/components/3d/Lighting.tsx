'use client';

import React from 'react';
import { ContactShadows } from '@react-three/drei';
import { COLORS } from '@/lib/constants';
import { LightingPresetName, LIGHTING_PRESETS } from '@/lib/lightingPresets';

interface LightingProps {
  preset?: LightingPresetName;
}

export function Lighting({ preset = 'HERO_LIGHTING' }: LightingProps) {
  const config = LIGHTING_PRESETS[preset] || LIGHTING_PRESETS.HERO_LIGHTING;

  // Responsive contact shadow grounding
  const isDisplay = preset === 'DISPLAY_LIGHTING';
  const shadowPosY = isDisplay ? -0.55 : -0.6;
  const shadowScale = isDisplay ? 7 : 6;

  return (
    <>
      {/* Ambient Fill Light */}
      <ambientLight color={COLORS.ambientLight} intensity={config.ambientIntensity} />

      {/* Main Specular Key Light */}
      <directionalLight
        position={[3, 5, 4]}
        intensity={config.keyLightIntensity}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Restrained Acer Nitro Red/Orange Rim Light */}
      <spotLight
        position={[-4, 2.5, -3]}
        angle={0.6}
        penumbra={0.8}
        intensity={config.rimLightIntensity}
        color={COLORS.rimLightRed}
        distance={12}
      />

      {/* Subtle Electric Blue Secondary Fill Light */}
      <directionalLight
        position={[-3, -1, 2]}
        intensity={config.fillLightIntensity}
        color={COLORS.secondaryLightBlue}
      />

      {/* Dynamic Grounded Contact Shadow */}
      <ContactShadows
        position={[0, shadowPosY, 0]}
        opacity={config.contactShadowOpacity}
        scale={shadowScale}
        blur={2.5}
        far={3}
        color="#000000"
      />
    </>
  );
}
