import React, { useState } from 'react';
import { 
  Plus, 
  Cpu, 
  Shield, 
  Activity, 
  Wand2, 
  Settings,
  Trash2,
  Briefcase,
  Cloud
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Agent {
  id: string;
  name: string;
  intent: string;
  status: 'active' | 'draft' | 'folded';
  blocks: string[];
  metabolism: string;
}

export const AgentForgeControl: React.FC = () => {
  const [agents] = useState<Agent[]>([
    { id: 'a-01', name: 'Metabolic Secretary', intent: 'Monitor news and trends.', status: 'active', blocks: ['linguistic-bridge', 'workspace-bridge'], metabolism: '$0.45/day' },
    { id: 'a-02', name: 'Recruiter Alpha', intent: 'Scan LinkedIn for Rust devs.', status: 'draft', blocks: ['linguistic-bridge', 'linkedin-connector'], metabolism: '$2.00/day' }
  ]);

  const [isForging, setIsForging] = useState(false);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentIntent, setNewAgentIntent] = useState('');

  const availableBlocks = [
    { id: 'linguistic-bridge', name: 'Linguistic Bridge', icon: Wand2, color: 'text-purple-400' },
    { id: 'workspace-bridge', name: 'Workspace Bridge', icon: Briefcase, color: 'text-blue-400' },
    { id: 'cloudflare-cf-bridge', name: 'Cloudflare Bridge', icon: Cloud, color: 'text-orange-400' }
  ];

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-slate-300 font-sans selection:bg-blue-500/30">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <Wand2 className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight uppercase">Sovereign Agent Forge</h2>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Agentic Synthesis // SS-Compiler v1</p>
          </div>
        </div>
        <button 
          onClick={() => setIsForging(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-blue-400 transition-all shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-3.5 h-3.5" />
          Forge New Agent
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Active Agents */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Resident Agent Fleet</h3>
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">{agents.filter(a => a.status === 'active').length} Active</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map(agent => (
              <div key={agent.id} className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-blue-500/30 transition-all group relative overflow-hidden">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-blue-500/10 transition-colors">
                      <Cpu className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-0.5">{agent.name}</h4>
                      <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">{agent.id}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                    agent.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-500'
                  }`}>
                    {agent.status}
                  </div>
                </div>
                
                <p className="text-[10px] text-slate-400 leading-relaxed mb-4 italic">"{agent.intent}"</p>
                
                <div className="flex items-center gap-2 mb-4">
                  {agent.blocks.map(blockId => {
                    const block = availableBlocks.find(b => b.id === blockId);
                    return block ? (
                      <div key={blockId} className="p-1.5 rounded-lg bg-white/5 border border-white/10" title={block.name}>
                        <block.icon className={`w-3 h-3 ${block.color}`} />
                      </div>
                    ) : null;
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-slate-600" />
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{agent.metabolism}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-colors">
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hardened Block Library */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Hardened Block Library</h3>
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">v1.0.4 Ratified</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availableBlocks.map(block => (
              <div key={block.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all cursor-default text-center">
                <block.icon className={`w-5 h-5 ${block.color} mb-3 mx-auto`} />
                <h4 className="text-[9px] font-bold text-white uppercase tracking-wider mb-1">{block.name}</h4>
                <p className="text-[8px] text-slate-600 font-medium uppercase tracking-widest">Substrate Ready</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Forging Overlay */}
      <AnimatePresence>
        {isForging && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-lg bg-[#0d0d0f] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wand2 className="w-5 h-5 text-blue-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-tight">Agentic Synthesis</h3>
                </div>
                <button onClick={() => setIsForging(false)} className="text-slate-500 hover:text-white transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Agent Name</label>
                  <input 
                    type="text"
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    placeholder="e.g. Recruiter Alpha"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500/50 focus:ring-0 transition-all outline-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mission Intent (Plain English)</label>
                  <textarea 
                    value={newAgentIntent}
                    onChange={(e) => setNewAgentIntent(e.target.value)}
                    placeholder="Describe what the agent should do..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500/50 focus:ring-0 transition-all resize-none outline-none"
                    rows={4}
                  />
                </div>
              </div>

              <div className="px-8 py-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-end gap-4">
                <button 
                  onClick={() => setIsForging(false)}
                  className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-3 rounded-xl bg-blue-500 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-blue-400 transition-all outline-none"
                >
                  Synthesize & Ratify
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Status */}
      <div className="px-6 py-3 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Forge Substrate Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-slate-600" />
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Hardened Blocks: 3 Active</span>
          </div>
        </div>
        <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Sovereign Synthesis Protocol v1.0.0</span>
      </div>
    </div>
  );
};
