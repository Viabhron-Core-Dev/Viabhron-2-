import React, { useState, useEffect } from 'react';
import { 
  Box, 
  MessageSquare, 
  Move, 
  Database, 
  Fingerprint, 
  Terminal, 
  Play, 
  Cpu, 
  Layers, 
  Activity, 
  Zap,
  Code2,
  ChevronRight,
  ShieldCheck,
  Atom,
  Workflow
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Kernel {
  id: string;
  name: string;
  icon: any;
  status: 'idle' | 'active' | 'error';
  load: number;
  description: string;
}

export const InteractionSubstrateControl: React.FC = () => {
  const [kernels, setKernels] = useState<Kernel[]>([
    { id: 'narrative', name: 'Narrative Kernel', icon: MessageSquare, status: 'idle', load: 12, description: 'Dialogue & Logic Engine' },
    { id: 'spatial', name: 'Spatial Kernel', icon: Move, status: 'idle', load: 45, description: '3D Rendering & Physics' },
    { id: 'systems', name: 'Systems Kernel', icon: Database, status: 'idle', load: 28, description: 'Economy & Data Sync' },
    { id: 'sensory', name: 'Sensory Kernel', icon: Fingerprint, status: 'idle', load: 5, description: 'Input & Biometrics' }
  ]);

  const [activeScript, setActiveScript] = useState<string>(JSON.stringify({
    kernel: "spatial",
    action: "render_3d_object",
    params: { asset_id: "mitochondria_model", interactive: true }
  }, null, 2));

  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = () => {
    setIsExecuting(true);
    // Simulate execution on the spatial kernel
    setKernels(prev => prev.map(k => k.id === 'spatial' ? { ...k, status: 'active' } : k));
    
    setTimeout(() => {
      setIsExecuting(false);
      setKernels(prev => prev.map(k => k.id === 'spatial' ? { ...k, status: 'idle' } : k));
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[#0b0c10] text-slate-300 font-sans selection:bg-cyan-500/30">
      {/* SIS Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/[0.01]">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <Layers className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight uppercase">Interaction Substrate</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Atomic Kernel Management</span>
              <div className="w-1 h-1 rounded-full bg-cyan-500" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <Cpu className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Load: 22%</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-[9px] font-bold text-cyan-500/80 uppercase tracking-widest animate-pulse">Substrate Ready</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Kernel Grid */}
        <div className="w-1/2 overflow-y-auto p-6 border-r border-white/5 space-y-4">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-6 px-2">Active Kernels</h3>
          {kernels.map(kernel => (
            <div key={kernel.id} className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl transition-colors ${kernel.status === 'active' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-slate-500'}`}>
                    <kernel.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">{kernel.name}</h4>
                    <span className="text-[9px] font-medium text-slate-500 uppercase tracking-widest">{kernel.description}</span>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-md text-[8px] font-bold uppercase tracking-widest ${kernel.status === 'active' ? 'bg-cyan-500/10 text-cyan-400 animate-pulse' : 'bg-white/5 text-slate-600'}`}>
                  {kernel.status}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[8px] font-bold uppercase tracking-widest text-slate-600">
                  <span>Resource Load</span>
                  <span>{kernel.load}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${kernel.load}%` }}
                    className={`h-full ${kernel.status === 'active' ? 'bg-cyan-400' : 'bg-slate-700'}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Script Console */}
        <div className="w-1/2 flex flex-col bg-black/20">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-500" />
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sovereign Script Console</h3>
            </div>
            <button 
              onClick={handleExecute}
              disabled={isExecuting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-500/20 transition-all disabled:opacity-50"
            >
              <Play className={`w-3 h-3 ${isExecuting ? 'animate-pulse' : ''}`} />
              Execute Block
            </button>
          </div>
          <div className="flex-1 p-6 font-mono text-xs">
            <div className="h-full rounded-2xl bg-black/40 border border-white/5 p-4 relative group">
              <div className="absolute top-4 right-4 text-[8px] font-bold text-slate-700 uppercase tracking-widest">JSON / SS-BLOCK</div>
              <textarea 
                value={activeScript}
                onChange={(e) => setActiveScript(e.target.value)}
                className="w-full h-full bg-transparent border-none focus:ring-0 text-cyan-500/80 resize-none"
                spellCheck={false}
              />
            </div>
          </div>
          <div className="p-6 border-t border-white/5 space-y-4">
            <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Substrate Logs</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              <div className="flex items-center gap-3 text-[9px] font-mono">
                <span className="text-slate-700">[12:44:01]</span>
                <span className="text-cyan-500/60">SIS_KERNEL_INIT: Narrative, Spatial, Systems, Sensory</span>
              </div>
              <div className="flex items-center gap-3 text-[9px] font-mono">
                <span className="text-slate-700">[12:44:05]</span>
                <span className="text-emerald-500/60">HANDSHAKE_SUCCESS: 8004_PROTOCOL_VERIFIED</span>
              </div>
              {isExecuting && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 text-[9px] font-mono"
                >
                  <span className="text-slate-700">[12:48:12]</span>
                  <span className="text-cyan-400">EXECUTING_BLOCK: spatial::render_3d_object</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="px-6 py-3 border-t border-white/5 bg-black flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Atom className="w-3.5 h-3.5 text-cyan-500" />
            <span className="text-[8px] font-bold text-cyan-500/80 uppercase tracking-[0.2em]">SIS Substrate: Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Workflow className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em]">Orchestration: Synthesis Architect</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em]">Bulkhead Isolation: Verified</span>
        </div>
      </div>
    </div>
  );
};
