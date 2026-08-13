'use client';

import React from 'react';

export function CoolingTransitionSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center p-8 md:p-16 pointer-events-none select-none z-10">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-block px-4 py-1.5 bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-full text-nitro-red font-mono text-xs md:text-sm font-bold tracking-widest uppercase shadow-lg">
          THERMAL CONTROL
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-2xl">
          DUAL-FAN <span className="text-nitro-red">COOLING</span>
        </h2>

        <p className="text-sm sm:text-lg font-mono text-slate-400 max-w-xl mx-auto tracking-widest uppercase">
          ADVANCED THERMAL EXHAUST DESIGN
        </p>
      </div>
    </section>
  );
}
