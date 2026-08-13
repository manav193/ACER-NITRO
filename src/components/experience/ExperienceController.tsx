'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { isWebGLAvailable, prefersReducedMotion } from '@/lib/performance';
import { ExperienceState } from '@/types';

const ExperienceContext = createContext<ExperienceState>({
  isLoaded: false,
  reducedMotion: false,
  webglSupported: true,
  deviceTier: 'desktop',
  modelAvailable: false,
  activeSection: 'hero',
  scrollProgress: 0,
});

export const useExperience = () => useContext(ExperienceContext);

interface ExperienceControllerProps {
  children: React.ReactNode;
}

export function ExperienceController({ children }: ExperienceControllerProps) {
  const [state, setState] = useState<ExperienceState>({
    isLoaded: false,
    reducedMotion: false,
    webglSupported: true,
    deviceTier: 'desktop',
    modelAvailable: false,
    activeSection: 'hero',
    scrollProgress: 0,
  });

  useEffect(() => {
    const webgl = isWebGLAvailable();
    const reduced = prefersReducedMotion();

    setState((prev) => ({
      ...prev,
      isLoaded: true,
      webglSupported: webgl,
      reducedMotion: reduced,
    }));
  }, []);

  return (
    <ExperienceContext.Provider value={state}>
      {children}
    </ExperienceContext.Provider>
  );
}
