'use client';

import React from 'react';
import { KeyboardHighlightMode } from '@/components/3d/LaptopModel';

interface KeyboardSectionProps {
  keyboardHighlight?: KeyboardHighlightMode;
}

export function KeyboardSection({ keyboardHighlight = 'NONE' }: KeyboardSectionProps) {
  let badge = 'FULL-SIZE INPUT DECK';
  let title = 'FULL-SIZE KEYBOARD';
  let subtitle = 'FULL-SIZE INPUT. BUILT FOR WORK AND PLAY.';
  let detail = 'CLEAN WHITE BACKLIGHT (NON-RGB) • NUMPAD INCLUDED';

  if (keyboardHighlight === 'NUMPAD') {
    badge = 'NUMERIC KEYPAD';
    title = 'NUMPAD';
    subtitle = 'FULL NUMERIC KEYPAD BUILT INTO CHASSIS';
    detail = 'RAPID DATA ENTRY AND CUSTOM GAME BINDINGS';
  } else if (keyboardHighlight === 'BACKLIGHT') {
    badge = 'WHITE ILLUMINATION';
    title = 'WHITE BACKLIGHT';
    subtitle = 'CLEAN. CONTROLLED. VISIBLE.';
    detail = 'PURE WHITE KEYCAP BACKLIGHTING FOR NIGHTTIME FOCUS';
  } else if (keyboardHighlight === 'NITROSENSE') {
    badge = 'SYSTEM CONTROL';
    title = 'NITROSENSE KEY';
    subtitle = 'DEDICATED THERMAL & FAN CONTROL KEY';
    detail = 'ONE-TOUCH ACCESS TO HARDWARE CONTROL UTILITY';
  } else if (keyboardHighlight === 'COPILOT') {
    badge = 'AI ASSISTANT';
    title = 'COPILOT KEY';
    subtitle = 'DEDICATED AI COPILOT KEY';
    detail = 'INSTANT SYSTEM & PRODUCTIVITY ASSISTANCE';
  } else if (keyboardHighlight === 'TRACKPAD') {
    badge = 'PRECISION NAVIGATION';
    title = 'PRECISION TRACKPAD';
    subtitle = 'SMOOTH MULTI-GESTURE CONTROL';
    detail = 'RESPONSIVE TACTILE TOUCH SURFACE';
  } else if (keyboardHighlight === 'FULL_INPUT') {
    badge = 'INTEGRATED SURFACE';
    title = 'FULL INPUT EXPERIENCE';
    subtitle = 'KEYBOARD. NUMPAD. CONTROL. FOCUS.';
    detail = 'FULL DECK DESIGNED FOR MAXIMUM EFFICIENCY';
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
