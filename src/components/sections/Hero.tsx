'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { createHeroIntroTimeline } from '@/animations/timelines';

interface HeroProps {
  reducedMotion?: boolean;
}

export function Hero({ reducedMotion = false }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      createHeroIntroTimeline(containerRef.current, reducedMotion);
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section className="relative w-full h-screen flex flex-col justify-between p-8 md:p-16 pointer-events-none select-none z-10">
      {/* Top Brand Bar */}
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-nitro-red rounded-full shadow-[0_0_12px_#ff3b00]" />
          <span className="font-mono text-xs uppercase tracking-widest text-nitro-text font-bold">
            ACER NITRO
          </span>
        </div>
        <div className="font-mono text-xs text-nitro-muted tracking-widest uppercase hidden md:block">
          ANV15-41 Series
        </div>
      </div>

      {/* Main Hero Centerpiece Typography */}
      <div
        ref={containerRef}
        className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto my-auto space-y-2 md:space-y-4"
      >
        <h1 className="text-7xl sm:text-9xl md:text-[11rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 uppercase drop-shadow-2xl">
          NITRO
        </h1>

        <div className="inline-block px-4 py-1.5 bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-full text-nitro-red font-mono text-sm sm:text-lg md:text-xl font-bold tracking-widest uppercase">
          ANV15-41
        </div>

        <p className="text-sm sm:text-lg md:text-xl font-medium tracking-[0.3em] sm:tracking-[0.4em] text-slate-300 uppercase pt-4 max-w-xl">
          POWER. PRECISION. POSSIBILITY.
        </p>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="flex flex-col items-center justify-center w-full mx-auto pb-4 space-y-3">
        <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-5 h-8 border-2 border-slate-600 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-nitro-red rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
