'use client';

import React from 'react';
import { NITRO_ANV15_41_SPECS } from '@/data/nitroSpecs';

export function Fallback2D() {
  return (
    <div className="relative min-h-screen bg-nitro-bg text-nitro-text flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="inline-block px-3 py-1 bg-nitro-red/10 border border-nitro-red/30 rounded-full text-nitro-red text-xs font-mono tracking-widest uppercase">
          Static 2D Mode (WebGL Unavailable)
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter uppercase">
          NITRO <span className="text-nitro-red">{NITRO_ANV15_41_SPECS.model.fullCode}</span>
        </h1>

        <p className="text-xl md:text-2xl font-light tracking-widest text-nitro-muted uppercase">
          {NITRO_ANV15_41_SPECS.model.tagline}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
          <div className="bg-nitro-card border border-nitro-border p-4 rounded-lg text-left">
            <span className="text-xs font-mono text-nitro-muted block">CPU</span>
            <span className="font-bold text-nitro-text">{NITRO_ANV15_41_SPECS.processor.model}</span>
          </div>
          <div className="bg-nitro-card border border-nitro-border p-4 rounded-lg text-left">
            <span className="text-xs font-mono text-nitro-muted block">GPU</span>
            <span className="font-bold text-nitro-text">{NITRO_ANV15_41_SPECS.graphics.model}</span>
          </div>
          <div className="bg-nitro-card border border-nitro-border p-4 rounded-lg text-left">
            <span className="text-xs font-mono text-nitro-muted block">RAM</span>
            <span className="font-bold text-nitro-text">{NITRO_ANV15_41_SPECS.memory.capacity} DDR5</span>
          </div>
          <div className="bg-nitro-card border border-nitro-border p-4 rounded-lg text-left">
            <span className="text-xs font-mono text-nitro-muted block">DISPLAY</span>
            <span className="font-bold text-nitro-text">{NITRO_ANV15_41_SPECS.display.refreshRate} IPS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
