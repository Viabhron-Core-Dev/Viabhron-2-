import React from 'react';
import { motion } from 'motion/react';
import { FileText, CheckCircle, XCircle, Clock, Shield, Activity, Cpu, Zap } from 'lucide-react';
import { RatificationProposal, UIMode } from '../../types';

interface RatificationRegistryProps {
  proposals: RatificationProposal[];
  onRatify: (id: string) => void;
  onShelve: (id: string) => void;
  onVeto: (id: string) => void;
  uiMode?: UIMode;
}

export const RatificationRegistry: React.FC<RatificationRegistryProps> = ({ proposals, onRatify, onShelve, onVeto, uiMode }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'governance': return <Shield className="w-5 h-5 text-blue-400" />;
      case 'infrastructure': return <Cpu className="w-5 h-5 text-green-400" />;
      case 'department': return <Activity className="w-5 h-5 text-purple-400" />;
      default: return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className={`h-full overflow-y-auto p-8 bg-[#0a0a0a] text-gray-300 font-sans ${uiMode === 'browser' ? 'pb-32 md:pb-8' : 'pb-8'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-500" />
              Modular Ratification Registry
            </h1>
            <p className="text-gray-500 mt-2">Chairman's Ballot for System Expansion & Governance</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-lg flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Lean Startup Mode</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {proposals.map((prop) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111] border border-white/5 rounded-xl p-6 hover:border-blue-500/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  {getTypeIcon(prop.type)}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gray-600 font-mono bg-white/5 px-2 py-1 rounded">
                  {prop.type}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {prop.title}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {prop.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                  <div className="text-[8px] text-gray-600 uppercase tracking-widest mb-1">Token Cost</div>
                  <div className="text-[10px] font-mono text-red-400">{prop.impact.tokenCost}</div>
                </div>
                <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                  <div className="text-[8px] text-gray-600 uppercase tracking-widest mb-1">Compute</div>
                  <div className="text-[10px] font-mono text-orange-400">{prop.impact.computeCost}</div>
                </div>
                <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                  <div className="text-[8px] text-gray-600 uppercase tracking-widest mb-1">Benefit</div>
                  <div className="text-[10px] font-mono text-green-400">{prop.impact.benefit}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onRatify(prop.id)}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <CheckCircle className="w-4 h-4" />
                  Ratify
                </button>
                <button
                  onClick={() => onShelve(prop.id)}
                  className="px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg font-medium flex items-center justify-center transition-all"
                  title="Shelve for later"
                >
                  <Clock className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onVeto(prop.id)}
                  className="px-4 py-3 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg font-medium flex items-center justify-center transition-all"
                  title="Veto (Reject)"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
