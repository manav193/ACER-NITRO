'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Environment } from './Environment';
import { Lighting } from './Lighting';
import { CameraRig } from './CameraRig';
import { LaptopModel, FanHighlightMode, KeyboardHighlightMode, PortHighlightMode } from './LaptopModel';
import { CoolingAirflow } from './CoolingAirflow';
import { SignalVisualization, SignalType } from './SignalVisualization';
import { Effects } from './Effects';
import { getOptimalDPR } from '@/lib/performance';
import { CameraPresetName } from '@/lib/cameraPresets';
import { LightingPresetName } from '@/lib/lightingPresets';
import { KeyboardBacklightState } from '@/lib/keyboardLighting';
import { LaptopPartRegistry } from '@/lib/partRegistry';

interface NitroSceneProps {
  reducedMotion?: boolean;
  cameraPreset?: CameraPresetName;
  lightingPreset?: LightingPresetName;
  backlightState?: KeyboardBacklightState;
  fanHighlight?: FanHighlightMode;
  keyboardHighlight?: KeyboardHighlightMode;
  portHighlight?: PortHighlightMode;
  showAirflow?: boolean;
  onModelLoaded?: (isRealGLB: boolean, registry: LaptopPartRegistry) => void;
}

function SceneLoader() {
  return (
    <Html center>
      <div className="font-mono text-xs text-slate-200 uppercase tracking-widest bg-nitro-card/95 backdrop-blur-md px-5 py-2.5 rounded-full border border-nitro-border shadow-2xl flex items-center gap-3 select-none pointer-events-none whitespace-nowrap">
        <span className="w-2 h-2 bg-nitro-red rounded-full animate-ping" />
        <span className="font-bold text-white">NITRO ANV15-41</span>
        <span className="text-nitro-muted">•</span>
        <span className="text-slate-400">INITIALIZING EXPERIENCE</span>
      </div>
    </Html>
  );
}

export function NitroScene({
  reducedMotion = false,
  cameraPreset = 'HERO',
  lightingPreset = 'HERO_LIGHTING',
  backlightState = 'ACTIVE',
  fanHighlight = 'NONE',
  keyboardHighlight = 'NONE',
  portHighlight = 'NONE',
  showAirflow = false,
  onModelLoaded,
}: NitroSceneProps) {
  const dpr = getOptimalDPR();

  // Derive signal type for I/O visualization
  let signalType: SignalType = 'NONE';
  if (portHighlight === 'POWER_ETHERNET') signalType = 'POWER_ETHERNET';
  else if (portHighlight === 'HDMI') signalType = 'HDMI';
  else if (portHighlight === 'USB_C') signalType = 'USB_C';
  else if (portHighlight === 'HEADPHONE') signalType = 'HEADPHONE';

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-auto z-0">
      <Canvas
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <Suspense fallback={<SceneLoader />}>
          <Environment lightingPreset={lightingPreset} />
          <Lighting preset={lightingPreset} />
          <CameraRig presetName={cameraPreset} reducedMotion={reducedMotion} />
          <LaptopModel
            reducedMotion={reducedMotion}
            backlightState={backlightState}
            fanHighlight={fanHighlight}
            keyboardHighlight={keyboardHighlight}
            portHighlight={portHighlight}
            onModelLoaded={onModelLoaded}
          />
          <CoolingAirflow active={showAirflow} />
          <SignalVisualization type={signalType} />
          <Effects />
        </Suspense>
      </Canvas>
    </div>
  );
}
