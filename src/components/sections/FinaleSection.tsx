'use client';

import React from 'react';
import { NITRO_ANV15_41_SPECS } from '@/data/nitroSpecs';

export function FinaleSection() {
  const handleReplayClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-8 md:p-16 pointer-events-none select-none z-10">
      {/* Top Brand Bar */}
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-nitro-red rounded-full shadow-[0_0_12px_#ff3b00]" />
          <span className="font-mono text-xs uppercase tracking-widest text-nitro-text font-bold">
            ACER NITRO
          </span>
        </div>
        <div className="font-mono text-[10px] sm:text-xs text-nitro-muted tracking-widest uppercase">
          ANV15-41 SERIES
        </div>
      </div>

      {/* Main Finale Hero Centerpiece */}
      <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto my-auto space-y-5 px-4 pointer-events-auto">
        <div className="inline-block px-4 py-1.5 bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-full text-nitro-muted font-mono text-[10px] sm:text-xs tracking-widest uppercase">
          CINEMATIC PRODUCT EXPERIENCE • INDEPENDENT PORTFOLIO SHOWCASE
        </div>

        <h2 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 uppercase drop-shadow-2xl">
          NITRO <span className="text-nitro-red">ANV15-41</span>
        </h2>

        <p className="text-sm sm:text-lg md:text-2xl font-light tracking-[0.25em] sm:tracking-[0.35em] text-slate-300 uppercase max-w-2xl">
          {NITRO_ANV15_41_SPECS.model.tagline}
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest">
          <span className="px-3 py-1 bg-nitro-card/80 border border-nitro-border rounded-full">
            AMD RYZEN 5 6600H
          </span>
          <span className="px-3 py-1 bg-nitro-card/80 border border-nitro-border rounded-full">
            NVIDIA RTX 3050 (6GB GDDR6)
          </span>
          <span className="px-3 py-1 bg-nitro-card/80 border border-nitro-border rounded-full">
            165Hz FHD IPS
          </span>
        </div>

        <div className="pt-4">
          <button
            onClick={handleReplayClick}
            aria-label="Replay cinematic story experience"
            className="px-6 py-2.5 rounded-full bg-nitro-red text-white font-mono text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,59,0,0.4)] hover:bg-red-600 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nitro-red focus-visible:ring-offset-2 focus-visible:ring-offset-nitro-bg"
          >
            REPLAY CINEMATIC STORY ↑
          </button>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-7xl mx-auto pt-6 border-t border-nitro-border/40 font-mono text-[10px] text-slate-400 uppercase tracking-widest gap-2">
        <span>ACER NITRO ANV15-41 CINEMATIC PRODUCT EXPERIENCE</span>
        <span>DESIGNED FOR PERFORMANCE</span>
      </div>
    </section>
  );
}
