'use client';

import React from 'react';
import { MODEL_PATH } from '@/lib/constants';

interface DevModelNoticeProps {
  isRealGLB: boolean;
}

export function DevModelNotice({ isRealGLB }: DevModelNoticeProps) {
  if (isRealGLB) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      <div className="bg-nitro-card/90 backdrop-blur-md border border-nitro-red/30 rounded-lg p-3 text-xs font-mono text-nitro-muted shadow-2xl flex items-center gap-3 max-w-sm">
        <span className="w-2 h-2 rounded-full bg-nitro-red animate-pulse flex-shrink-0" />
        <div>
          <p className="font-semibold text-nitro-text tracking-wide">
            3D MODEL ASSET REQUIRED
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Place production GLB file at: <code className="text-nitro-red">{MODEL_PATH}</code>
          </p>
        </div>
      </div>
    </div>
  );
}
