'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { Hero } from '@/components/sections/Hero';
import { CpuSection } from '@/components/sections/CpuSection';
import { GpuSection } from '@/components/sections/GpuSection';
import { DisplaySection } from '@/components/sections/DisplaySection';
import { MemorySection } from '@/components/sections/MemorySection';
import { StorageSection } from '@/components/sections/StorageSection';
import { CoolingSection } from '@/components/sections/CoolingSection';
import { KeyboardSection } from '@/components/sections/KeyboardSection';
import { PortsSection } from '@/components/sections/PortsSection';
import { SpecOverviewSection } from '@/components/sections/SpecOverviewSection';
import { FinaleSection } from '@/components/sections/FinaleSection';
import { ProductExplorer } from '@/components/explorer/ProductExplorer';

import { DevModelNotice } from '@/components/ui/DevModelNotice';
import { DebugPanel } from '@/components/ui/DebugPanel';
import { Fallback2D } from '@/components/ui/Fallback2D';
import { isWebGLAvailable, prefersReducedMotion } from '@/lib/performance';
import { CameraPresetName } from '@/lib/cameraPresets';
import { LightingPresetName } from '@/lib/lightingPresets';
import { KeyboardBacklightState } from '@/lib/keyboardLighting';
import { FanHighlightMode, KeyboardHighlightMode, PortHighlightMode } from '@/components/3d/LaptopModel';
import { createMasterStoryTimeline } from '@/animations/storyTimeline';
import { LaptopPartRegistry } from '@/lib/partRegistry';

const NitroScene = dynamic(
  () => import('@/components/3d/NitroScene').then((mod) => mod.NitroScene),
  { ssr: false }
);

export function SceneManager() {
  const [mounted, setMounted] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isRealGLB, setIsRealGLB] = useState(false);
  const [registryInfo, setRegistryInfo] = useState<LaptopPartRegistry>({});

  // Active Telemetry & Presets
  const [activeSceneIndex, setActiveSceneIndex] = useState(1);
  const [activeSceneName, setActiveSceneName] = useState('HERO');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cameraPreset, setCameraPreset] = useState<CameraPresetName>('HERO');
  const [lightingPreset, setLightingPreset] = useState<LightingPresetName>('HERO_LIGHTING');
  const [backlightState, setBacklightState] = useState<KeyboardBacklightState>('ACTIVE');
  const [fanHighlight, setFanHighlight] = useState<FanHighlightMode>('NONE');
  const [keyboardHighlight, setKeyboardHighlight] = useState<KeyboardHighlightMode>('NONE');
  const [portHighlight, setPortHighlight] = useState<PortHighlightMode>('NONE');
  const [showAirflow, setShowAirflow] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setWebglSupported(isWebGLAvailable());
    setReducedMotion(prefersReducedMotion());
  }, []);

  // Master Timeline ScrollTrigger Setup with GSAP Context Isolation
  useEffect(() => {
    if (!mounted || !webglSupported || !containerRef.current) return;

    if (reducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      createMasterStoryTimeline(containerRef.current!, {
        onStateChange: (state) => {
          setActiveSceneIndex(state.sceneIndex);
          setActiveSceneName(state.sceneName);
          setCameraPreset(state.cameraPreset);
          setLightingPreset(state.lightingPreset);
          setFanHighlight(state.fanHighlight);
          setKeyboardHighlight(state.keyboardHighlight);
          setPortHighlight(state.portHighlight);
          setShowAirflow(state.showAirflow);
          setScrollProgress(state.progress);
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [mounted, webglSupported, reducedMotion]);

  if (!mounted) {
    return <div className="w-full h-screen bg-nitro-bg" />;
  }

  if (!webglSupported) {
    return <Fallback2D />;
  }

  return (
    <div className="relative w-full bg-nitro-bg text-nitro-text overflow-hidden select-none">
      {/* 1. FIXED 3D WEBGL CANVAS LAYER */}
      <div className="fixed inset-0 w-full h-full pointer-events-auto z-0">
        <NitroScene
          reducedMotion={reducedMotion}
          cameraPreset={cameraPreset}
          lightingPreset={lightingPreset}
          backlightState={backlightState}
          fanHighlight={fanHighlight}
          keyboardHighlight={keyboardHighlight}
          portHighlight={portHighlight}
          showAirflow={showAirflow}
          onModelLoaded={(isReal, reg) => {
            setIsRealGLB(isReal);
            if (reg) setRegistryInfo(reg);
          }}
        />
      </div>

      {/* 2. ISOLATED PINNED SCROLL LAYER (Protects React DOM reconciliation from GSAP pin-spacer reparenting) */}
      <div className="relative w-full z-10">
        <div ref={containerRef} className="relative w-full h-screen">
          {/* SCENE 01: HERO */}
          <div
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
              activeSceneIndex === 1
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-6 pointer-events-none'
            }`}
          >
            <Hero reducedMotion={reducedMotion} />
          </div>

          {/* SCENE 02: RYZEN 5 6600H CPU */}
          <div
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
              activeSceneIndex === 2
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <CpuSection />
          </div>

          {/* SCENE 03: RTX 3050 GPU */}
          <div
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
              activeSceneIndex === 3
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <GpuSection />
          </div>

          {/* SCENE 04: 165Hz DISPLAY */}
          <div
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
              activeSceneIndex === 4
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <DisplaySection />
          </div>

          {/* SCENE 05: 16GB DDR5 MEMORY */}
          <div
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
              activeSceneIndex === 5
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <MemorySection />
          </div>

          {/* SCENE 06: 512GB NVMe STORAGE */}
          <div
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
              activeSceneIndex === 6
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <StorageSection />
          </div>

          {/* SCENE 07: COOLING EXPLORATION */}
          <div
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
              activeSceneIndex === 7
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <CoolingSection fanHighlight={fanHighlight} showAirflow={showAirflow} />
          </div>

          {/* SCENES 08–13: INPUT DECK EXPLORATION */}
          <div
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
              activeSceneIndex >= 8 && activeSceneIndex <= 13
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <KeyboardSection keyboardHighlight={keyboardHighlight} />
          </div>

          {/* SCENES 14–20: PORTS & I/O EXPLORATION */}
          <div
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
              activeSceneIndex >= 14 && activeSceneIndex <= 20
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <PortsSection portHighlight={portHighlight} />
          </div>

          {/* SCENE 21: FULL PRODUCT REVEAL */}
          <div
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
              activeSceneIndex === 21
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <Hero reducedMotion={reducedMotion} />
          </div>

          {/* SCENE 22: EDITORIAL SPECIFICATION OVERVIEW */}
          <div
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
              activeSceneIndex === 22
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <SpecOverviewSection />
          </div>

          {/* SCENE 23: INTERACTIVE PRODUCT EXPLORER */}
          <div
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
              activeSceneIndex === 23
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <ProductExplorer
              onCategorySelect={(_, preset) => {
                setCameraPreset(preset);
              }}
            />
          </div>

          {/* SCENE 24: CINEMATIC HERO FINALE */}
          <div
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
              activeSceneIndex === 24
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <FinaleSection />
          </div>
        </div>
      </div>

      {/* 3. ISOLATED OVERLAY UI LAYER */}
      <div className="relative z-20 pointer-events-none">
        <DevModelNotice isRealGLB={isRealGLB} />
        <DebugPanel
          cameraPreset={cameraPreset}
          lightingPreset={lightingPreset}
          backlightState={backlightState}
          fanHighlight={fanHighlight}
          keyboardHighlight={keyboardHighlight}
          portHighlight={portHighlight}
          isRealGLB={isRealGLB}
          activeSceneName={activeSceneName}
          scrollProgress={scrollProgress}
          registryInfo={registryInfo}
          onCameraChange={(preset) => setCameraPreset(preset)}
          onLightingChange={(preset) => setLightingPreset(preset)}
          onBacklightChange={(state) => setBacklightState(state)}
        />
      </div>
    </div>
  );
}
