import React, { useState } from 'react';
import { 
  Zap, 
  Cpu, 
  Shield, 
  Activity, 
  Database, 
  RefreshCw, 
  Binary, 
  Atom, 
  Lock, 
  Layers, 
  Box
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuantumJob {
  id: string;
  mission: string;
  provider: string;
  status: 'queued' | 'simulating' | 'running' | 'completed';
  progress: number;
}

export const QuantumControl: React.FC = () => {
  const [jobs] = useState<QuantumJob[]>([
    { id: 'q-101', mission: 'Portfolio Optimization', provider: 'QCentroid Sandbox', status: 'completed', progress: 100 },
    { id: 'q-102', mission: 'Molecular Simulation', provider: 'IBM Quantum (Eagle)', status: 'running', progress: 45 },
    { id: 'q-103', mission: 'Route Optimization (Vine)', provider: 'Local Simulator', status: 'simulating', progress: 12 }
  ]);

  const [pqcStatus] = useState({
    identity8004: 'Shielded (Dilithium)',
    vineMesh: 'Shielded (Kyber)',
    soulCore: 'Legacy (AES-256)'
  });

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-slate-300 font-sans selection:bg-purple-500/30">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Atom className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight uppercase">Quantum Bridge</h2>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Advanced Compute Layer // Q-Ops v1</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Substrate:</span>
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Hybrid QPU/GPU</span>
          </div>
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <Activity className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Quantum Job Queue */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Quantum Job Queue</h3>
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">3 Active Workloads</span>
          </div>
          <div className="space-y-3">
            {jobs.map(job => (
              <div key={job.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-purple-500/10 transition-colors">
                      <Binary className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-0.5">{job.mission}</h4>
                      <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">{job.provider} // {job.id}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                    job.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 
                    job.status === 'running' ? 'bg-blue-500/10 text-blue-400 animate-pulse' : 
                    'bg-purple-500/10 text-purple-400'
                  }`}>
                    {job.status}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[8px] font-bold uppercase tracking-wider">
                    <span className="text-slate-600">Coherence Progress</span>
                    <span className="text-slate-400">{job.progress}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${job.progress}%` }}
                      className={`h-full rounded-full ${job.status === 'completed' ? 'bg-emerald-500' : 'bg-purple-500'}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PQC Shield Status */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Post-Quantum Cryptography (PQC)</h3>
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Quantum Resistant</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: '8004 Identity', status: pqcStatus.identity8004, icon: Lock },
              { label: 'Vine Mesh', status: pqcStatus.vineMesh, icon: Layers },
              { label: 'Soul Core', status: pqcStatus.soulCore, icon: Database }
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-white/5">
                    <item.icon className="w-4 h-4 text-slate-500" />
                  </div>
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">{item.label}</h4>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${item.status.includes('Shielded') ? 'text-emerald-400' : 'text-orange-400'}`}>
                    {item.status}
                  </span>
                  {!item.status.includes('Shielded') && (
                    <button className="text-[8px] font-bold text-blue-400 uppercase tracking-widest hover:underline">
                      Upgrade
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quantum Sandbox */}
        <section className="p-6 rounded-3xl bg-purple-500/[0.02] border border-purple-500/20">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Quantum Simulation Sandbox</h3>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Run quantum-ready algorithms on local Nvidia nodes</p>
            </div>
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Box className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-purple-500/30 transition-all text-left group">
              <RefreshCw className="w-4 h-4 text-slate-500 mb-3 group-hover:text-purple-400 transition-colors" />
              <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-1">Portfolio Optimizer</h4>
              <p className="text-[9px] text-slate-500 leading-relaxed italic">"Quantum-classical hybrid for financial risk analysis."</p>
            </button>
            <button className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-purple-500/30 transition-all text-left group">
              <Binary className="w-4 h-4 text-slate-500 mb-3 group-hover:text-purple-400 transition-colors" />
              <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-1">Route Optimizer</h4>
              <p className="text-[9px] text-slate-500 leading-relaxed italic">"Solving the Traveling Salesman problem for Vine nodes."</p>
            </button>
          </div>

          <button className="w-full py-3 rounded-xl bg-purple-500 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-purple-400 transition-all shadow-lg shadow-purple-500/20">
            Initialize New Simulation
          </button>
        </section>
      </div>

      {/* Footer Status */}
      <div className="px-6 py-3 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Quantum Bridge Active</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-3 h-3 text-slate-600" />
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Hybrid Sync: 99.8%</span>
          </div>
        </div>
        <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Sovereign Quantum Protocol v1.0.0</span>
      </div>
    </div>
  );
};
