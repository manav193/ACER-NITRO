'use client';

import React, { useState, useEffect } from 'react';
import { CameraPresetName } from '@/lib/cameraPresets';
import { LightingPresetName } from '@/lib/lightingPresets';
import { KeyboardBacklightState } from '@/lib/keyboardLighting';
import { FanHighlightMode, KeyboardHighlightMode, PortHighlightMode } from '@/components/3d/LaptopModel';

interface DebugPanelProps {
  cameraPreset: CameraPresetName;
  lightingPreset: LightingPresetName;
  backlightState: KeyboardBacklightState;
  fanHighlight?: FanHighlightMode;
  keyboardHighlight?: KeyboardHighlightMode;
  portHighlight?: PortHighlightMode;
  isRealGLB: boolean;
  activeSceneName?: string;
  scrollProgress?: number;
  onCameraChange?: (preset: CameraPresetName) => void;
  onLightingChange?: (preset: LightingPresetName) => void;
  onBacklightChange?: (state: KeyboardBacklightState) => void;
}

export function DebugPanel({
  cameraPreset,
  lightingPreset,
  backlightState,
  fanHighlight = 'NONE',
  keyboardHighlight = 'NONE',
  portHighlight = 'NONE',
  isRealGLB,
  activeSceneName = 'HERO',
  scrollProgress = 0,
  onCameraChange,
  onLightingChange,
  onBacklightChange,
}: DebugPanelProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('debug') === 'true') {
        setVisible(true);
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === 'd') {
        setVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-6 right-6 z-50 pointer-events-auto bg-nitro-card/95 backdrop-blur-md border border-nitro-border rounded-xl p-4 text-xs font-mono text-nitro-text shadow-2xl space-y-3 w-80">
      <div className="flex justify-between items-center border-b border-nitro-border pb-2">
        <span className="font-bold text-nitro-red tracking-wider uppercase">3D DEBUG INSPECTOR</span>
        <button
          onClick={() => setVisible(false)}
          className="text-nitro-muted hover:text-white px-2 py-0.5 rounded bg-nitro-border/50 text-[10px]"
        >
          [ESC / Shift+D]
        </button>
      </div>

      <div className="space-y-1.5 text-[11px]">
        <div className="flex justify-between">
          <span className="text-nitro-muted">Active Story Scene:</span>
          <span className="text-nitro-red font-bold">{activeSceneName}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-nitro-muted">Scroll Timeline Progress:</span>
          <span className="text-blue-400 font-bold">{Math.round(scrollProgress * 100)}%</span>
        </div>

        <div className="flex justify-between">
          <span className="text-nitro-muted">Fan Highlight Mode:</span>
          <span className="text-emerald-400 font-bold">{fanHighlight}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-nitro-muted">Keyboard Highlight:</span>
          <span className="text-sky-400 font-bold">{keyboardHighlight}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-nitro-muted">Port Highlight Mode:</span>
          <span className="text-purple-400 font-bold">{portHighlight}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-nitro-muted">Model Asset:</span>
          <span className={isRealGLB ? 'text-green-400 font-bold' : 'text-amber-400 font-bold'}>
            {isRealGLB ? 'GLB LOADED' : 'PROCEDURAL FALLBACK'}
          </span>
        </div>

        <div>
          <label className="text-nitro-muted block mb-1">Camera State Preset:</label>
          <select
            value={cameraPreset}
            onChange={(e) => onCameraChange?.(e.target.value as CameraPresetName)}
            className="w-full bg-nitro-bg border border-nitro-border rounded px-2 py-1 text-nitro-text focus:outline-none focus:border-nitro-red"
          >
            <option value="HERO">HERO (3/4 Angle)</option>
            <option value="FRONT">FRONT (Direct)</option>
            <option value="THREE_QUARTER">THREE_QUARTER</option>
            <option value="DISPLAY_CLOSE">DISPLAY_CLOSE (Screen)</option>
            <option value="KEYBOARD_CLOSE">KEYBOARD_CLOSE (Deck)</option>
            <option value="NUMPAD_CLOSE">NUMPAD_CLOSE</option>
            <option value="NITROSENSE_CLOSE">NITROSENSE_CLOSE</option>
            <option value="COPILOT_CLOSE">COPILOT_CLOSE</option>
            <option value="TRACKPAD_CLOSE">TRACKPAD_CLOSE</option>
            <option value="INPUT_SUMMARY">INPUT_SUMMARY</option>
            <option value="BOTTOM">BOTTOM (Dual Vents)</option>
            <option value="FAN_LEFT">FAN_LEFT (Left Fan)</option>
            <option value="FAN_RIGHT">FAN_RIGHT (Right Fan)</option>
            <option value="AIRFLOW">AIRFLOW (Dual Stream)</option>
            <option value="COOLING_SUMMARY">COOLING_SUMMARY</option>
            <option value="PORTS_INTRO">PORTS_INTRO</option>
            <option value="LEFT_PORTS">LEFT_PORTS</option>
            <option value="LEFT_POWER">LEFT_POWER</option>
            <option value="LEFT_HDMI">LEFT_HDMI</option>
            <option value="LEFT_USB_C">LEFT_USB_C</option>
            <option value="RIGHT_PORTS">RIGHT_PORTS</option>
            <option value="RIGHT_HEADPHONE">RIGHT_HEADPHONE</option>
            <option value="PORTS_SUMMARY">PORTS_SUMMARY</option>
            <option value="EXPLORER">EXPLORER</option>
          </select>
        </div>

        <div>
          <label className="text-nitro-muted block mb-1">Lighting Preset:</label>
          <select
            value={lightingPreset}
            onChange={(e) => onLightingChange?.(e.target.value as LightingPresetName)}
            className="w-full bg-nitro-bg border border-nitro-border rounded px-2 py-1 text-nitro-text focus:outline-none focus:border-nitro-red"
          >
            <option value="HERO_LIGHTING">HERO_LIGHTING (Red Rim)</option>
            <option value="DISPLAY_LIGHTING">DISPLAY_LIGHTING (Focused)</option>
            <option value="KEYBOARD_LIGHTING">KEYBOARD_LIGHTING</option>
          </select>
        </div>

        <div>
          <label className="text-nitro-muted block mb-1">Keyboard Backlight (White Only):</label>
          <select
            value={backlightState}
            onChange={(e) => onBacklightChange?.(e.target.value as KeyboardBacklightState)}
            className="w-full bg-nitro-bg border border-nitro-border rounded px-2 py-1 text-nitro-text focus:outline-none focus:border-nitro-red"
          >
            <option value="OFF">OFF (0%)</option>
            <option value="DIM">DIM (15%)</option>
            <option value="ACTIVE">ACTIVE (45% White)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
