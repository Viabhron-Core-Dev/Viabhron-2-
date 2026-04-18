import React from 'react';
import { Network } from 'lucide-react';

import { UIMode } from '@/src/types';

interface SovereignMeshProps {
  uiMode?: UIMode;
}

export const SovereignMesh: React.FC<SovereignMeshProps> = ({ uiMode }) => (
  <div className={`h-full bg-gray-950 flex flex-col items-center justify-center p-12 text-center ${uiMode === 'browser' ? 'pb-32 md:pb-12' : 'pb-12'}`}>
    <div className="w-24 h-24 bg-cyan-500/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-cyan-500/20">
      <Network className="w-10 h-10 text-cyan-400" />
    </div>
    <h2 className="text-2xl font-black text-white uppercase tracking-[0.2em] mb-4">Sovereign Mesh</h2>
    <p className="text-gray-500 max-w-md leading-relaxed mb-8">
      Distributed resident AI management and cross-branch synchronization.
    </p>
  </div>
);
