'use client';

import React from 'react';
import { FanHighlightMode } from '@/components/3d/LaptopModel';

interface CoolingSectionProps {
  fanHighlight?: FanHighlightMode;
  showAirflow?: boolean;
}

export function CoolingSection({ fanHighlight = 'NONE', showAirflow = false }: CoolingSectionProps) {
  let title = 'DUAL-FAN COOLING';
  let badge = 'THERMAL ARCHITECTURE';
  let subtitle = 'DUAL-FAN THERMAL CONTROL SYSTEM';
  let detail = 'DUAL INTAKE & QUAD EXHAUST VENTILATION CONTROL';

  if (fanHighlight === 'LEFT') {
    title = 'LEFT FAN';
    badge = 'PRIMARY EXHAUST VENTILATION';
    subtitle = 'DEDICATED THERMAL EXHAUST ZONE';
    detail = 'ENGINEERED TO MOVE AIR THROUGH THE CHASSIS';
  } else if (fanHighlight === 'RIGHT') {
    title = 'RIGHT FAN';
    badge = 'SECONDARY EXHAUST VENTILATION';
    subtitle = 'BALANCED THERMAL DISSIPATION';
    detail = 'STABILIZES CHASSIS TEMPERATURES UNDER LOAD';
  } else if (showAirflow) {
    title = 'AIRFLOW STREAM';
    badge = 'DIRECTED THERMAL DISSIPATION';
    subtitle = 'OPTIMIZED CHASSIS VENTILATION';
    detail = 'COOL INTAKE & WARM EXHAUST FLOW CONTROL';
  }

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center p-8 md:p-16 pointer-events-none select-none z-10">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-block px-4 py-1.5 bg-nitro-card/80 backdrop-blur-md border border-nitro-border rounded-full text-nitro-red font-mono text-xs md:text-sm font-bold tracking-widest uppercase shadow-lg">
          {badge}
        </div>

        <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-2xl">
          {title.split(' ')[0]} <span className="text-nitro-red">{title.split(' ').slice(1).join(' ')}</span>
        </h2>

        <p className="text-xl sm:text-2xl md:text-3xl font-light text-slate-300 tracking-wider max-w-2xl mx-auto uppercase">
          {subtitle}
        </p>

        <p className="text-xs sm:text-sm md:text-base font-mono text-slate-400 max-w-xl mx-auto tracking-widest pt-2 uppercase">
          {detail}
        </p>
      </div>
    </section>
  );
}
