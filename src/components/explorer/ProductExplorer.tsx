'use client';

import React, { useState, useRef } from 'react';
import { CameraPresetName } from '@/lib/cameraPresets';
import { globalLaptopController } from '@/animations/laptopController';

export type ExplorerCategory =
  | 'PERFORMANCE'
  | 'DISPLAY'
  | 'MEMORY'
  | 'STORAGE'
  | 'COOLING'
  | 'INPUT'
  | 'PORTS';

interface ProductExplorerProps {
  onCategorySelect?: (category: ExplorerCategory, preset: CameraPresetName) => void;
}

export function ProductExplorer({ onCategorySelect }: ProductExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<ExplorerCategory>('PERFORMANCE');
  const [isManualDrag, setIsManualDrag] = useState(false);
  const isDraggingRef = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const categoryMap: Record<ExplorerCategory, { preset: CameraPresetName; label: string; desc: string }> = {
    PERFORMANCE: { preset: 'THREE_QUARTER', label: 'PERFORMANCE', desc: 'AMD Ryzen 5 6600H & RTX 3050 (6GB GDDR6)' },
    DISPLAY: { preset: 'DISPLAY_CLOSE', label: 'DISPLAY', desc: '15.6" Full HD IPS • 165Hz Speed' },
    MEMORY: { preset: 'KEYBOARD_CLOSE', label: 'MEMORY', desc: '16GB DDR5 Installed • Expandable to 32GB' },
    STORAGE: { preset: 'FRONT', label: 'STORAGE', desc: '512GB NVMe SSD • Expandable Storage' },
    COOLING: { preset: 'COOLING_SUMMARY', label: 'COOLING', desc: 'Dual-Fan Intake & Exhaust System' },
    INPUT: { preset: 'KEYBOARD_CLOSE', label: 'INPUT', desc: 'Full-size Keyboard • NUMPAD • White Backlight' },
    PORTS: { preset: 'PORTS_SUMMARY', label: 'PORTS', desc: 'DC Power, RJ-45, HDMI, 3× USB-A, USB-C, 3.5mm' },
  };

  const handleCategoryClick = (cat: ExplorerCategory) => {
    setActiveCategory(cat);
    setIsManualDrag(false);
    onCategorySelect?.(cat, categoryMap[cat].preset);
  };

  // Controlled manual pointer drag rotation with clamped angles
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setIsManualDrag(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    const group = globalLaptopController.getGroup();
    if (group) {
      // Clamped rotation to prevent flipping or disappearing behind camera
      const newRy = THREE_Math_clamp(group.rotation.y + deltaX * 0.005, -0.8, 0.8);
      const newRx = THREE_Math_clamp(group.rotation.x + deltaY * 0.005, -0.5, 0.5);
      group.rotation.y = newRy;
      group.rotation.x = newRx;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 md:p-12 pointer-events-none select-none z-20 overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-7xl mx-auto pointer-events-auto gap-3">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-nitro-red rounded-full shadow-[0_0_12px_#ff3b00]" />
          <span className="font-mono text-xs uppercase tracking-widest text-nitro-text font-bold">
            INTERACTIVE EXPLORER
          </span>
        </div>

        {/* Manual Drag Indicator */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`cursor-grab active:cursor-grabbing px-4 py-2 rounded-full border text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
            isManualDrag
              ? 'bg-nitro-red/20 border-nitro-red text-nitro-red shadow-[0_0_15px_rgba(255,59,0,0.3)]'
              : 'bg-nitro-card/80 border-nitro-border text-slate-400 hover:text-white'
          }`}
        >
          {isManualDrag ? 'MANUAL ROTATION ACTIVE (DRAG TO ROTATE)' : 'CLICK & DRAG TO ROTATE 3D MODEL'}
        </div>
      </div>

      {/* Center Description */}
      <div className="max-w-xl mx-auto text-center space-y-2 pointer-events-none my-auto px-4">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-white drop-shadow-xl">
          {categoryMap[activeCategory].label}
        </h3>
        <p className="text-xs sm:text-sm font-mono text-slate-300 tracking-widest uppercase">
          {categoryMap[activeCategory].desc}
        </p>
      </div>

      {/* Bottom Category Navigation Tabs */}
      <div className="w-full max-w-5xl mx-auto pointer-events-auto px-2">
        <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 md:gap-3 bg-nitro-card/90 backdrop-blur-md border border-nitro-border rounded-2xl p-2.5 shadow-2xl overflow-x-auto max-w-full">
          {(Object.keys(categoryMap) as ExplorerCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              aria-label={`Explore ${cat} features`}
              className={`px-3.5 sm:px-4 py-2 rounded-xl font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nitro-red focus-visible:ring-offset-2 focus-visible:ring-offset-nitro-bg ${
                activeCategory === cat
                  ? 'bg-nitro-red text-white shadow-[0_0_15px_rgba(255,59,0,0.4)] scale-105'
                  : 'bg-nitro-bg/60 text-slate-400 hover:text-white hover:bg-nitro-border/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function THREE_Math_clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}
