'use client';

import React from 'react';

export function MemorySection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center p-8 md:p-16 pointer-events-none select-none z-10">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-block px-4 py-1.5 bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-full text-nitro-red font-mono text-xs md:text-sm font-bold tracking-widest uppercase shadow-lg">
          SYSTEM MEMORY
        </div>

        <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-2xl">
          16GB <span className="text-nitro-red">DDR5</span>
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
          <div className="bg-nitro-card/90 border border-nitro-border p-4 rounded-xl text-center min-w-[200px]">
            <span className="text-xs font-mono text-nitro-muted block uppercase tracking-widest">INSTALLED</span>
            <span className="font-bold text-lg text-nitro-text font-mono">16GB DDR5</span>
          </div>

          <div className="bg-nitro-card/90 border border-nitro-red/40 p-4 rounded-xl text-center min-w-[200px]">
            <span className="text-xs font-mono text-nitro-red block uppercase tracking-widest">UPGRADE PATH</span>
            <span className="font-bold text-lg text-nitro-text font-mono">UP TO 32GB</span>
          </div>
        </div>
      </div>
    </section>
  );
}
