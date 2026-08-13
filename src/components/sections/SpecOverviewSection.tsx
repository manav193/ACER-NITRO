'use client';

import React from 'react';
import { NITRO_ANV15_41_SPECS } from '@/data/nitroSpecs';

export function SpecOverviewSection() {
  const specs = NITRO_ANV15_41_SPECS;

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center p-6 sm:p-8 md:p-16 pointer-events-none select-none z-10">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 w-full">
        {/* Header */}
        <div className="text-center space-y-2.5">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 font-mono text-xs text-slate-300">
          {/* 01 / PROCESSOR */}
          <div className="bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-xl p-4 sm:p-5 space-y-1.5">
            <span className="text-nitro-red font-bold tracking-wider uppercase block text-[11px]">01 / PROCESSOR</span>
            <h3 className="text-base sm:text-lg font-bold text-white uppercase">{specs.processor.fullName}</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">High-performance processing architecture built for gaming & creation.</p>
          </div>

          {/* 02 / GRAPHICS */}
          <div className="bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-xl p-4 sm:p-5 space-y-1.5">
            <span className="text-nitro-red font-bold tracking-wider uppercase block text-[11px]">02 / GRAPHICS</span>
            <h3 className="text-base sm:text-lg font-bold text-white uppercase">{specs.graphics.fullName}</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">Dedicated ray-tracing GPU with {specs.graphics.vram} {specs.graphics.memoryType} VRAM.</p>
          </div>

          {/* 03 / DISPLAY */}
          <div className="bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-xl p-4 sm:p-5 space-y-1.5">
            <span className="text-nitro-red font-bold tracking-wider uppercase block text-[11px]">03 / DISPLAY</span>
            <h3 className="text-base sm:text-lg font-bold text-white uppercase">{specs.display.refreshRate} • {specs.display.size} {specs.display.panelType}</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">{specs.display.resolution} fluid gaming panel.</p>
          </div>

          {/* 04 / MEMORY */}
          <div className="bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-xl p-4 sm:p-5 space-y-1.5">
            <span className="text-nitro-red font-bold tracking-wider uppercase block text-[11px]">04 / MEMORY</span>
            <h3 className="text-base sm:text-lg font-bold text-white uppercase">{specs.memory.capacity} {specs.memory.type}</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">{specs.memory.expandable} (Dual-slot DDR5).</p>
          </div>

          {/* 05 / STORAGE */}
          <div className="bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-xl p-4 sm:p-5 space-y-1.5">
            <span className="text-nitro-red font-bold tracking-wider uppercase block text-[11px]">05 / STORAGE</span>
            <h3 className="text-base sm:text-lg font-bold text-white uppercase">{specs.storage.capacity} {specs.storage.type}</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">High-speed NVMe storage with expandable M.2 capacity.</p>
          </div>

          {/* 06 / INPUT & BACKLIGHT */}
          <div className="bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-xl p-4 sm:p-5 space-y-1.5">
            <span className="text-nitro-red font-bold tracking-wider uppercase block text-[11px]">06 / INPUT DECK</span>
            <h3 className="text-base sm:text-lg font-bold text-white uppercase">{specs.keyboard.type}</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">{specs.keyboard.backlightDescription} • NitroSense & Copilot keys.</p>
          </div>

          {/* 07 / CONNECTIVITY */}
          <div className="bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-xl p-4 sm:p-5 space-y-1.5 sm:col-span-2 lg:col-span-3">
            <span className="text-nitro-red font-bold tracking-wider uppercase block text-[11px]">07 / PORTS & CONNECTIVITY</span>
            <h3 className="text-base sm:text-lg font-bold text-white uppercase">FULL I/O PORTS ARRAY</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">LEFT: DC Power • RJ-45 Ethernet • HDMI • 2× USB-A • USB-C Charging  |  RIGHT: 1× USB-A • 3.5mm Headphone Jack</p>
          </div>
        </div>
      </div>
    </section>
  );
}
