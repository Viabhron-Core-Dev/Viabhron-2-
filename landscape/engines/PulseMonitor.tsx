import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Zap, 
  Shield, 
  Cpu, 
  Globe, 
  ArrowUpRight, 
  ArrowDownRight,
  Brain,
  Database,
  Lock,
  RefreshCw,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { UIMode, Agent } from '../../src/types';

const pulseData = [
  { value: 30 }, { value: 45 }, { value: 35 }, { value: 60 }, 
  { value: 55 }, { value: 80 }, { value: 70 }, { value: 90 },
  { value: 85 }, { value: 65 }, { value: 75 }, { value: 50 },
];

export function PulseMonitor({ uiMode, mode = 'full', agents = [] }: { uiMode?: UIMode, mode?: 'full' | 'lite', agents?: Agent[] }) {
  const [metabolism, setMetabolism] = useState<'local' | 'cloud' | 'hybrid'>('hybrid');
  const [pulse, setPulse] = useState(72);
  const [view, setView] = useState<'main' | 'agents' | 'agent-detail' | 'security' | 'metabolism' | 'vine'>('main');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const vineNodes = [
    { id: 'vn-1', name: 'Seed Node Alpha', status: 'synced', load: '12%', location: 'US-West' },
    { id: 'vn-2', name: 'Relay Node Beta', status: 'active', load: '45%', location: 'EU-Central' },
    { id: 'vn-3', name: 'Edge Node Gamma', status: 'idle', load: '2%', location: 'Local' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const selectedAgent = agents.find(a => a.id === selectedAgentId);

  if (mode === 'lite') {
    return (
      <div className="h-full flex flex-col bg-white overflow-hidden">
        <AnimatePresence mode="wait">
          {view === 'main' && (
            <motion.div 
              key="main"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar"
            >
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-3xl bg-indigo-50 flex items-center justify-center mx-auto border border-indigo-100">
                  <Activity className="w-8 h-8 text-indigo-600 animate-pulse" />
                </div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Pulse Lite</h2>
                <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-bold">Vitals Check</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={() => setView('metabolism')}
                  className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:border-indigo-500/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                      <Zap className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Metabolism</div>
                      <div className="text-lg font-bold text-slate-900 capitalize">{metabolism}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </button>

                <button 
                  onClick={() => setView('security')}
                  className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:border-indigo-500/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                      <Shield className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Security</div>
                      <div className="text-lg font-bold text-slate-900">Hardened</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </button>

                <button 
                  onClick={() => setView('agents')}
                  className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:border-indigo-500/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                      <Brain className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Agents</div>
                      <div className="text-lg font-bold text-slate-900">{agents.length}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </button>

                <button 
                  onClick={() => setView('vine')}
                  className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:border-indigo-500/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                      <Globe className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Vine Nodes</div>
                      <div className="text-lg font-bold text-slate-900">{vineNodes.length}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </button>
              </div>

              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                <p className="text-[9px] text-indigo-600/60 uppercase tracking-widest text-center leading-relaxed">
                  Lite mode provides a real-time snapshot of the OS kernel. For deep telemetry, switch to the Sovereign Dashboard.
                </p>
              </div>
            </motion.div>
          )}

          {view === 'agents' && (
            <motion.div 
              key="agents"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col bg-white"
            >
              <div className="p-6 border-b border-slate-100 flex items-center gap-4">
                <button onClick={() => setView('main')} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                  <ArrowLeft className="w-5 h-5 text-slate-400" />
                </button>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Active Agents</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-3 no-scrollbar">
                {agents.map(agent => (
                  <button 
                    key={agent.id}
                    onClick={() => {
                      setSelectedAgentId(agent.id);
                      setView('agent-detail');
                    }}
                    className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:border-indigo-500/30 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: agent.color }}>
                        {agent.name.charAt(0)}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-bold text-slate-900">{agent.name}</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest">{agent.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-slate-300'}`} />
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'vine' && (
            <motion.div 
              key="vine"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col bg-white"
            >
              <div className="p-6 border-b border-slate-100 flex items-center gap-4">
                <button onClick={() => setView('main')} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                  <ArrowLeft className="w-5 h-5 text-slate-400" />
                </button>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Vine Network</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                <div className="p-4 bg-purple-50 border border-purple-100 rounded-2xl mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-black text-purple-600 uppercase tracking-widest">Global Mesh Status</span>
                  </div>
                  <p className="text-[10px] text-purple-600/70 leading-relaxed uppercase tracking-widest">
                    Vine nodes facilitate inter-instance communication and Delta synchronization across the Viabhron Nexus.
                  </p>
                </div>

                {vineNodes.map(node => (
                  <div 
                    key={node.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center">
                        <Database className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{node.name}</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest">{node.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-900">{node.load}</div>
                      <div className={`text-[9px] font-black uppercase tracking-widest ${
                        node.status === 'synced' ? 'text-green-500' : 
                        node.status === 'active' ? 'text-indigo-500' : 'text-slate-400'
                      }`}>
                        {node.status}
                      </div>
                    </div>
                  </div>
                ))}

                <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-purple-300 hover:text-purple-500 transition-all">
                  + Register New Vine Node
                </button>
              </div>
            </motion.div>
          )}

          {view === 'agent-detail' && selectedAgent && (
            <motion.div 
              key="agent-detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col bg-white"
            >
              <div className="p-6 border-b border-slate-100 flex items-center gap-4">
                <button onClick={() => setView('agents')} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                  <ArrowLeft className="w-5 h-5 text-slate-400" />
                </button>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Agent Dossier</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-[2.5rem] flex items-center justify-center text-3xl text-white font-black shadow-xl" style={{ backgroundColor: selectedAgent.color }}>
                    {selectedAgent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{selectedAgent.name}</h3>
                    <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest">{selectedAgent.role}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black px-2">Metabolic Tasks</h4>
                  <div className="space-y-3">
                    {[
                      { title: "Neural Synthesis", status: "completed", time: "2m ago" },
                      { title: "Substrate Optimization", status: "running", time: "Active" },
                      { title: "Security Audit", status: "pending", time: "Scheduled" }
                    ].map((task, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {task.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                          {task.status === 'running' && <RefreshCw className="w-4 h-4 text-indigo-500 animate-spin" />}
                          {task.status === 'pending' && <Clock className="w-4 h-4 text-slate-300" />}
                          <span className="text-sm font-bold text-slate-700">{task.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{task.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-100 space-y-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Capabilities</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgent.capabilities.map((cap, i) => (
                      <span key={i} className="px-3 py-1 bg-white rounded-lg text-[10px] font-bold text-slate-600 border border-indigo-100">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {(view === 'security' || view === 'metabolism') && (
            <motion.div 
              key="placeholder"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col bg-white"
            >
              <div className="p-6 border-b border-slate-100 flex items-center gap-4">
                <button onClick={() => setView('main')} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                  <ArrowLeft className="w-5 h-5 text-slate-400" />
                </button>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
                  {view === 'security' ? 'Security Vault' : 'Metabolic Core'}
                </h2>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center ${view === 'security' ? 'bg-teal-50' : 'bg-yellow-50'}`}>
                  {view === 'security' ? <Shield className="w-10 h-10 text-teal-600" /> : <Zap className="w-10 h-10 text-yellow-600" />}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
                    {view === 'security' ? 'Hardened Status' : 'Hybrid Metabolism'}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {view === 'security' 
                      ? 'The 8004 Identity Protocol is active. No unauthorized substrate access detected in the last 24 hours.' 
                      : 'Metabolic distribution is currently optimized for Hybrid mode, balancing local Spore and Cloud Run substrates.'}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl border border-green-100">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">System Nominal</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col bg-gray-950 overflow-hidden ${uiMode === 'browser' ? 'pb-32 md:pb-0' : ''}`}>
      <header className="px-6 py-8 border-b border-white/5 bg-gray-900/20 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center border border-blue-500/20">
              <Activity className="w-6 h-6 text-blue-400 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Viabhron Pulse</h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black">General OS Tracker</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Kernel Online</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Metabolism</div>
            <div className="flex items-center gap-2">
              <Zap className={`w-3 h-3 ${metabolism === 'local' ? 'text-yellow-400' : 'text-blue-400'}`} />
              <span className="text-xs font-bold text-white capitalize">{metabolism}</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Active Agents</div>
            <div className="flex items-center gap-2">
              <Brain className="w-3 h-3 text-purple-400" />
              <span className="text-xs font-bold text-white">12</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Security</div>
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3 text-green-400" />
              <span className="text-xs font-bold text-white">Hardened</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {/* Main Pulse Graph */}
        <div className="p-6 rounded-[2.5rem] bg-gray-900/50 border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-widest mb-1">Neural Frequency</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">{pulse}</span>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Hz</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Sync Status</div>
              <div className="flex items-center gap-2 text-green-400">
                <RefreshCw className="w-3 h-3 animate-spin-slow" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Optimal</span>
              </div>
            </div>
          </div>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pulseData}>
                <defs>
                  <linearGradient id="pulseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#pulseGradient)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Substrate Health */}
        <div className="space-y-4">
          <h3 className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black px-2">Substrate Health</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: 'Cloud Run Substrate', status: 'Healthy', load: '12%', icon: Globe, color: 'text-blue-400' },
              { label: 'Firebase Nervous System', status: 'Active', load: '4%', icon: Database, color: 'text-yellow-400' },
              { label: 'Local Spore Metabolism', status: 'Idle', load: '0%', icon: Cpu, color: 'text-purple-400' },
              { label: '8004 Identity Vault', status: 'Locked', load: 'N/A', icon: Lock, color: 'text-green-400' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-900/30 border border-white/5 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-200">{item.label}</div>
                    <div className="text-[9px] text-gray-600 uppercase tracking-widest">{item.status}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-white">{item.load}</div>
                  <div className="text-[9px] text-gray-600 uppercase tracking-widest">Load</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 rounded-3xl bg-blue-600/10 border border-blue-500/20 space-y-4">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-blue-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Metabolic Control</h3>
          </div>
          <div className="flex gap-2">
            {['eco', 'hybrid', 'turbo'].map((mode) => (
              <button
                key={mode}
                onClick={() => setMetabolism(mode as any)}
                className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                  metabolism === mode 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'bg-gray-900 text-gray-500 hover:text-gray-300'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
