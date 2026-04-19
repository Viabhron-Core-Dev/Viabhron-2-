import React, { useState } from 'react';
import { 
  Activity, 
  Zap, 
  Shield, 
  Briefcase, 
  TrendingUp, 
  RefreshCw, 
  Clock, 
  Settings,
  Share2,
  ArrowUpRight,
  Mic2,
  Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PulseItem {
  id: string;
  category: 'workspace' | 'security' | 'metabolic' | 'finance';
  title: string;
  summary: string;
  resonanceScore: number;
  actionable: boolean;
  time: string;
}

export const PulseFeedControl: React.FC = () => {
  const [pulseItems] = useState<PulseItem[]>([
    {
      id: 'p-01',
      category: 'security',
      title: 'High Resonance Threat',
      summary: 'ATLAS-T1566 detected. Recommended SOP-09 patch pending ratification.',
      resonanceScore: 9,
      actionable: true,
      time: '12m ago'
    },
    {
      id: 'p-02',
      category: 'workspace',
      title: 'Strategic Meeting',
      summary: 'Review of "Quantum Bridge" roadmap at 14:00. 3 related documents found.',
      resonanceScore: 8,
      actionable: false,
      time: '1h ago'
    },
    {
      id: 'p-03',
      category: 'finance',
      title: 'Metabolic Status',
      summary: 'Daily x402 spend at 42%. Budget health: OPTIMAL.',
      resonanceScore: 7,
      actionable: false,
      time: '2h ago'
    }
  ]);

  const [isGenerating] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return <Shield className="w-4 h-4" />;
      case 'workspace': return <Briefcase className="w-4 h-4" />;
      case 'finance': return <TrendingUp className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'security': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'workspace': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'finance': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0b0d] text-slate-300 font-sans selection:bg-amber-500/30">
      {/* Hardware Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/[0.01]">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <Zap className="w-5 h-5 text-amber-500 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight uppercase">Sovereign Pulse Feed</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Unified Intelligence Stream</span>
              <div className="w-1 h-1 rounded-full bg-amber-500" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            Sync Pulse
          </button>
          <button className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <Settings className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Overall Vibe / Summary */}
        <section className="p-6 rounded-[2rem] bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Activity className="w-32 h-32 text-amber-500" />
          </div>
          <div className="relative z-10">
            <h3 className="text-[10px] font-bold text-amber-500/80 uppercase tracking-[0.2em] mb-4">Chairman's Briefing</h3>
            <p className="text-lg font-medium text-white leading-relaxed mb-6">
              The OS is secure and metabolically healthy. Focus on the <span className="text-amber-400 underline decoration-amber-500/30 underline-offset-4 cursor-pointer hover:text-amber-300 transition-colors">Quantum Bridge roadmap</span> today.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Metabolic Optimal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">1 Security Alert</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pulse Items */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Active Pulses</h3>
            <span className="text-[10px] text-slate-600 font-medium uppercase tracking-widest">{pulseItems.length} Fragments Synced</span>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {pulseItems.map(item => (
              <motion.div 
                key={item.id}
                whileHover={{ scale: 1.01 }}
                className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl border ${getCategoryColor(item.category)}`}>
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{item.category}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                        <span className="text-[9px] font-bold text-amber-500/80 uppercase tracking-widest">Resonance: {item.resonanceScore}/10</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[9px] text-slate-600 font-medium uppercase tracking-widest">{item.time}</span>
                    {item.actionable && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 font-bold uppercase tracking-widest border border-red-500/20">
                        Action Required
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-xs text-slate-400 leading-relaxed mb-4 pl-14">{item.summary}</p>
                
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-500 hover:text-white transition-all">
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500/20 transition-all">
                    Open Fragment
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Distribution Channels */}
        <section className="p-6 rounded-[2.5rem] bg-white/[0.01] border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Pulse Distribution</h3>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Broadcast intelligence to other OS substrates</p>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <Layout className="w-5 h-5 text-slate-500" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: 'UI Dashboard', icon: <Layout className="w-4 h-4" />, status: 'active' },
              { name: 'Ambient Voice', icon: <Mic2 className="w-4 h-4" />, status: 'active' },
              { name: 'Agent Mesh', icon: <RefreshCw className="w-4 h-4" />, status: 'standby' }
            ].map(channel => (
              <button key={channel.name} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/5 transition-all flex flex-col items-center gap-3 group">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  channel.status === 'active' ? 'bg-amber-500/10 text-amber-500' : 'bg-white/5 text-slate-600'
                }`}>
                  {channel.icon}
                </div>
                <div className="text-center">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{channel.name}</span>
                  <span className={`text-[8px] font-bold uppercase tracking-widest ${
                    channel.status === 'active' ? 'text-emerald-500' : 'text-slate-600'
                  }`}>{channel.status}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Hardware Status Bar */}
      <div className="px-6 py-3 border-t border-white/5 bg-black flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[8px] font-bold text-amber-500/80 uppercase tracking-[0.2em]">Pulse Stream: Online</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-slate-600" />
            <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em]">Last Sync: 12:44:48</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em]">SOP-15 Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};
