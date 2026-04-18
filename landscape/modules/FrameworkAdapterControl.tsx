import React, { useState } from 'react';
import { 
  Plus, 
  RefreshCw, 
  FileJson, 
  Code, 
  Link as LinkIcon, 
  Workflow,
  CheckCircle2,
  Zap,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Deployment {
  id: string;
  name: string;
  framework: 'LangChain' | 'CrewAI' | 'AutoGen';
  status: 'active' | 'translating' | 'failed';
  blocks: string[];
  lastSync: string;
}

export const FrameworkAdapterControl: React.FC = () => {
  const [deployments] = useState<Deployment[]>([
    { id: 'dep-01', name: 'Market Research Chain', framework: 'LangChain', status: 'active', blocks: ['workspace-bridge', 'linguistic-bridge'], lastSync: '2m ago' },
    { id: 'dep-02', name: 'Content Crew', framework: 'CrewAI', status: 'translating', blocks: ['linguistic-bridge'], lastSync: 'Just now' }
  ]);

  const [isImporting, setIsImporting] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-slate-300 font-sans selection:bg-orange-500/30">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <Workflow className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight uppercase">Framework Bridge</h2>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Ecosystem Interop // Adapter v1</p>
          </div>
        </div>
        <button 
          onClick={() => setIsImporting(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/20"
        >
          <Plus className="w-3.5 h-3.5" />
          Import Framework Logic
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Active Deployments */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Sovereign Framework Deployments</h3>
            <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">{deployments.length} Active Adapters</span>
          </div>
          <div className="space-y-3">
            {deployments.map(dep => (
              <div key={dep.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-orange-500/30 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-orange-500/10 transition-colors">
                      <FileJson className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-0.5">{dep.name}</h4>
                      <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">{dep.framework} // {dep.id}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                    dep.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 
                    dep.status === 'translating' ? 'bg-orange-500/10 text-orange-400 animate-pulse' : 
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {dep.status}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {dep.blocks.map(block => (
                      <div key={block} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                        {block}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <RefreshCw className="w-3 h-3 text-slate-600" />
                      <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">{dep.lastSync}</span>
                    </div>
                    <button className="text-[8px] font-bold text-blue-400 uppercase tracking-widest hover:underline">
                      View SS Manifest
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Translation Engine Status */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'LangChain Translator', status: 'Operational', icon: Code },
            { label: 'CrewAI Orchestrator', status: 'Operational', icon: LinkIcon },
            { label: 'AutoGen Adapter', status: 'Beta', icon: Zap }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-white/5">
                  <item.icon className="w-4 h-4 text-slate-500" />
                </div>
                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">{item.label}</h4>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">{item.status}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
            </div>
          ))}
        </section>

        {/* Import Sandbox */}
        <section className="p-6 rounded-3xl bg-orange-500/[0.02] border border-orange-500/20">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Ecosystem Import Sandbox</h3>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Transpile external framework logic into Sovereign-Script</p>
            </div>
            <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <LinkIcon className="w-5 h-5 text-orange-400" />
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-white/5 rounded-2xl bg-white/[0.01] group hover:border-orange-500/30 transition-all cursor-pointer">
            <FileJson className="w-8 h-8 text-slate-700 mb-4 group-hover:text-orange-400 transition-colors" />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Drop Framework Manifest Here</p>
            <p className="text-[8px] text-slate-600 font-medium uppercase tracking-widest">Supports .json, .yaml, .py (CrewAI)</p>
          </div>
        </section>
      </div>

      {/* Footer Status */}
      <div className="px-6 py-3 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Framework Bridge Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-slate-600" />
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Zero-Trust Translation</span>
          </div>
        </div>
        <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Sovereign Interop Protocol v1.0.0</span>
      </div>
    </div>
  );
};
