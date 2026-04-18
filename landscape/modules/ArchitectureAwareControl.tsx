import React, { useState } from 'react';
import { Cpu, Zap, Shield, Check, Info, Activity, Server, Smartphone, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NodeProfile {
  id: string;
  label: string;
  arch: 'arm' | 'x86' | 'nvidia';
  load: number;
  status: 'online' | 'offline' | 'busy';
}

interface RoutingProposal {
  id: string;
  mission: string;
  options: {
    nodeId: string;
    label: string;
    time: string;
    cost: string;
    reason: string;
  }[];
}

export const ArchitectureAwareControl: React.FC = () => {
  const [nodes] = useState<NodeProfile[]>([
    { id: 'anchor-01', label: 'Sovereign Anchor', arch: 'x86', load: 12, status: 'online' },
    { id: 'mobile-vaa-01', label: 'Celestial VAA', arch: 'arm', load: 38, status: 'online' },
    { id: 'gpu-node-01', label: 'Nvidia Edge Node', arch: 'nvidia', load: 4, status: 'online' }
  ]);

  const [proposals] = useState<RoutingProposal[]>([
    {
      id: 'm-882',
      mission: '4K Visual Synthesis (Creative Director)',
      options: [
        { nodeId: 'gpu-node-01', label: 'Nvidia Edge Node', time: '45s', cost: '0.05 MU', reason: 'GPU-Accelerated' },
        { nodeId: 'anchor-01', label: 'Sovereign Anchor', time: '8m', cost: '0.15 MU', reason: 'CPU Fallback' }
      ]
    }
  ]);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const getArchIcon = (arch: string) => {
    switch (arch) {
      case 'arm': return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case 'nvidia': return <Zap className="w-4 h-4 text-orange-400" />;
      default: return <Server className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-slate-300 font-sans selection:bg-orange-500/30">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <Cpu className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight uppercase">Architecture-Aware Scheduler</h2>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Sovereign Routing Mesh // AAS-v1</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Strategy:</span>
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Manual Ratification</span>
          </div>
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <Activity className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Hardware Mesh Status */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Hardware Mesh Status</h3>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">3 Nodes Accredited</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nodes.map(node => (
              <div key={node.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-orange-500/30 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-orange-500/10 transition-colors">
                    {getArchIcon(node.arch)}
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${node.status === 'online' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {node.status}
                  </div>
                </div>
                <h4 className="text-xs font-bold text-white mb-1">{node.label}</h4>
                <p className="text-[10px] text-slate-500 font-mono mb-4 uppercase">{node.arch} Architecture</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider">
                    <span className="text-slate-500">Metabolic Load</span>
                    <span className={node.load > 70 ? 'text-red-400' : 'text-slate-300'}>{node.load}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${node.load}%` }}
                      className={`h-full rounded-full ${node.load > 70 ? 'bg-red-500' : 'bg-orange-500'}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pending Routing Proposals */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Pending Routing Proposals</h3>
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3 text-orange-400" />
              <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Ratification Required</span>
            </div>
          </div>
          
          <AnimatePresence>
            {proposals.map(proposal => (
              <motion.div 
                key={proposal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 rounded-3xl bg-orange-500/[0.02] border border-orange-500/20"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-400 text-[8px] font-bold uppercase tracking-widest">Mission {proposal.id}</span>
                      <span className="text-xs font-bold text-white">{proposal.mission}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Select optimal hardware substrate for mission dispatch</p>
                  </div>
                  <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
                    <Info className="w-4 h-4 text-slate-500" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {proposal.options.map(option => (
                    <button
                      key={option.nodeId}
                      onClick={() => setSelectedOption(option.nodeId)}
                      className={`p-4 rounded-2xl border text-left transition-all ${selectedOption === option.nodeId ? 'bg-orange-500/10 border-orange-500' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">{option.label}</span>
                        {selectedOption === option.nodeId && <Check className="w-3 h-3 text-orange-400" />}
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Est. Time</p>
                          <p className="text-xs font-mono text-white">{option.time}</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Metabolic Cost</p>
                          <p className="text-xs font-mono text-orange-400">{option.cost}</p>
                        </div>
                      </div>
                      <p className="text-[9px] text-slate-400 italic leading-relaxed">"{option.reason}"</p>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
                    Dismiss
                  </button>
                  <button 
                    disabled={!selectedOption}
                    className="px-6 py-2 rounded-xl bg-orange-500 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-orange-500/20"
                  >
                    Ratify & Dispatch
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </div>

      {/* Footer Status */}
      <div className="px-6 py-3 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Vine Mesh Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Database className="w-3 h-3 text-slate-600" />
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Knowledge Pulse: Synced</span>
          </div>
        </div>
        <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Sovereign Routing Protocol v1.0.4</span>
      </div>
    </div>
  );
};
