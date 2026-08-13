'use client';

import React from 'react';
import { NITRO_ANV15_41_SPECS } from '@/data/nitroSpecs';

export function SpecOverviewSection() {
  const specs = NITRO_ANV15_41_SPECS;

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center p-8 md:p-16 pointer-events-none select-none z-10">
      <div className="max-w-6xl mx-auto space-y-8 w-full">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-block px-4 py-1.5 bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-full text-nitro-red font-mono text-xs md:text-sm font-bold tracking-widest uppercase shadow-lg">
            HARDWARE ARCHITECTURE
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-white drop-shadow-2xl">
            COMPLETE <span className="text-nitro-red">SPECIFICATIONS</span>
          </h2>
          <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-widest uppercase max-w-xl mx-auto">
            {specs.model.name} ({specs.model.fullCode}) • VERIFIED HARDWARE CONFIGURATION
          </p>
        </div>

        {/* Editorial Specification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs text-slate-300">
          {/* PROCESSOR */}
          <div className="bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-xl p-5 space-y-2">
            <span className="text-nitro-red font-bold tracking-wider uppercase block">01 / PROCESSOR</span>
            <h4 className="text-lg font-bold text-white uppercase">{specs.processor.fullName}</h4>
            <p className="text-slate-400">High-performance processing architecture built for gaming & creation.</p>
          </div>

          {/* GRAPHICS */}
          <div className="bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-xl p-5 space-y-2">
            <span className="text-nitro-red font-bold tracking-wider uppercase block">02 / GRAPHICS</span>
            <h4 className="text-lg font-bold text-white uppercase">{specs.graphics.fullName}</h4>
            <p className="text-slate-400">Dedicated ray-tracing GPU with {specs.graphics.vram} {specs.graphics.memoryType} VRAM.</p>
          </div>

          {/* DISPLAY */}
          <div className="bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-xl p-5 space-y-2">
            <span className="text-nitro-red font-bold tracking-wider uppercase block">03 / DISPLAY</span>
            <h4 className="text-lg font-bold text-white uppercase">{specs.display.refreshRate} • {specs.display.size} {specs.display.panelType}</h4>
            <p className="text-slate-400">{specs.display.resolution} fluid gaming panel.</p>
          </div>

          {/* MEMORY */}
          <div className="bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-xl p-5 space-y-2">
            <span className="text-nitro-red font-bold tracking-wider uppercase block">04 / MEMORY</span>
            <h4 className="text-lg font-bold text-white uppercase">{specs.memory.capacity} {specs.memory.type}</h4>
            <p className="text-slate-400">{specs.memory.expandable} (Dual-slot DDR5).</p>
          </div>

          {/* STORAGE */}
          <div className="bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-xl p-5 space-y-2">
            <span className="text-nitro-red font-bold tracking-wider uppercase block">05 / STORAGE</span>
            <h4 className="text-lg font-bold text-white uppercase">{specs.storage.capacity} {specs.storage.type}</h4>
            <p className="text-slate-400">High-speed NVMe storage with expandable M.2 capacity.</p>
          </div>

          {/* INPUT & BACKLIGHT */}
          <div className="bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-xl p-5 space-y-2">
            <span className="text-nitro-red font-bold tracking-wider uppercase block">06 / INPUT DECK</span>
            <h4 className="text-lg font-bold text-white uppercase">{specs.keyboard.type}</h4>
            <p className="text-slate-400">{specs.keyboard.backlightDescription} • NitroSense & Copilot keys.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
