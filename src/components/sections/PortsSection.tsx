'use client';

import React from 'react';
import { PortHighlightMode } from '@/components/3d/LaptopModel';

interface PortsSectionProps {
  portHighlight?: PortHighlightMode;
}

export function PortsSection({ portHighlight = 'NONE' }: PortsSectionProps) {
  let badge = 'COMPREHENSIVE I/O ARRAY';
  let title = 'CONNECT. CREATE. PLAY.';
  let subtitle = 'FULL CONNECTIVITY FOR EVERY WORKFLOW';
  let detail = 'DC POWER • ETHERNET • HDMI • 3× USB-A • USB-C • 3.5MM';

  if (portHighlight === 'LEFT_ALL') {
    badge = 'LEFT CHASSIS EDGE';
    title = 'LEFT SIDE PORTS';
    subtitle = 'POWER. NETWORK. DISPLAY. EXPANSION.';
    detail = 'DC POWER • RJ-45 ETHERNET • HDMI • 2× USB-A • USB-C';
  } else if (portHighlight === 'POWER_ETHERNET') {
    badge = 'PRIMARY POWER & NETWORK';
    title = 'DC POWER & ETHERNET';
    subtitle = 'DEDICATED POWER INPUT & RJ-45 NETWORK';
    detail = 'RELIABLE DIRECT POWER AND LOW-LATENCY WIRED INTERNET';
  } else if (portHighlight === 'HDMI') {
    badge = 'EXTERNAL DISPLAY';
    title = 'HDMI PORT';
    subtitle = 'EXTERNAL DISPLAY OUTPUT CONNECTION';
    detail = 'EXPAND YOUR WORKSPACE TO EXTERNAL MONITORS';
  } else if (portHighlight === 'USB_C') {
    badge = 'VERSATILE EXPANSION';
    title = 'USB-C CHARGING';
    subtitle = 'CHARGE. CONNECT. CREATE.';
    detail = 'USB-C CHARGING SUPPORT FOR MOBILE POWER & DATA';
  } else if (portHighlight === 'RIGHT_ALL') {
    badge = 'RIGHT CHASSIS EDGE';
    title = 'RIGHT SIDE PORTS';
    subtitle = 'ACCESS. AUDIO. CONVENIENCE.';
    detail = '1× USB-A • 3.5MM HEADPHONE JACK';
  } else if (portHighlight === 'RIGHT_USB_A') {
    badge = 'PERIPHERAL CONNECTIVITY';
    title = 'RIGHT USB-A';
    subtitle = 'CONVENIENT PERIPHERAL CONNECTION';
    detail = 'INSTANT ACCESS FOR MOUSE & ACCESSORIES';
  } else if (portHighlight === 'HEADPHONE') {
    badge = 'ANALOG AUDIO';
    title = '3.5MM HEADPHONE JACK';
    subtitle = 'HEADPHONE & AUDIO COMBO JACK';
    detail = 'HIGH-FIDELITY DIRECT ANALOG AUDIO OUTPUT';
  } else if (portHighlight === 'ALL_PORTS') {
    badge = 'COMPLETE I/O ARRAY';
    title = 'CONNECT WITHOUT COMPROMISE';
    subtitle = '3× USB-A • USB-C • HDMI • RJ-45 • DC POWER • 3.5MM';
    detail = 'NO DONGLES REQUIRED. EVERYTHING BUILT IN.';
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
