'use client';

import React from 'react';

export function CpuSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center p-8 md:p-16 pointer-events-none select-none z-10">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-block px-4 py-1.5 bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-full text-nitro-red font-mono text-xs md:text-sm font-bold tracking-widest uppercase shadow-lg">
          PROCESSOR PERFORMANCE
        </div>

        <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-2xl">
          RYZEN 5 <span className="text-nitro-red">6600H</span>
        </h2>

        <p className="text-xl sm:text-2xl md:text-3xl font-light text-slate-300 tracking-wider max-w-2xl mx-auto uppercase">
          AMD RYZEN™ 5 6600H PROCESSOR
        </p>

        <p className="text-xs sm:text-sm md:text-base font-mono text-slate-400 max-w-xl mx-auto tracking-widest pt-2 uppercase">
          HIGH-PERFORMANCE ARCHITECTURE • SPEED & EFFICIENCY
        </p>
      </div>
    </section>
  );
}
