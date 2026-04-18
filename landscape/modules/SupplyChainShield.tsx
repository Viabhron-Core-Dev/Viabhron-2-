import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { UIMode } from '@/src/types';

interface SupplyChainShieldProps {
  uiMode?: UIMode;
}

export const SupplyChainShield: React.FC<SupplyChainShieldProps> = ({ uiMode }) => (
  <div className={`h-full bg-gray-950 flex flex-col items-center justify-center p-12 text-center ${uiMode === 'browser' ? 'pb-32 md:pb-12' : 'pb-12'}`}>
    <div className="w-24 h-24 bg-amber-500/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-amber-500/20">
      <ShieldCheck className="w-10 h-10 text-amber-400" />
    </div>
    <h2 className="text-2xl font-black text-white uppercase tracking-[0.2em] mb-4">Supply Chain Shield</h2>
    <p className="text-gray-500 max-w-md leading-relaxed mb-8">
      Sovereign supply chain auditing and dependency verification substrate.
    </p>
  </div>
);
