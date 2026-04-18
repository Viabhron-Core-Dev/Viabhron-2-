import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, 
  Database, 
  Zap, 
  Shield, 
  Terminal, 
  RefreshCw, 
  Plus, 
  ExternalLink,
  Search,
  Activity,
  Cpu,
  Lock,
  ChevronRight
} from 'lucide-react';

export const CloudflareControl: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workers' | 'storage' | 'network'>('workers');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSimulationMode, setIsSimulationMode] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState('personal-01');

  const accounts = [
    { id: 'personal-01', label: 'Personal (Free)', type: 'personal' },
    { id: 'business-v-02', label: 'Viabhron Corp (Pro)', type: 'business' },
    { id: 'research-03', label: 'R&D Sandbox', type: 'research' }
  ];

  const mockWorkers = [
    { id: '1', name: `gateway-${selectedAccount}`, routes: ['api.viabhron.io/*'], status: 'active', requests: '1.2M' },
    { id: '2', name: 'identity-8004-resolver', routes: ['auth.viabhron.io/*'], status: 'active', requests: '450K' },
    { id: '3', name: 'metabolic-monitor', routes: ['billing.viabhron.io/*'], status: 'error', requests: '12K' }
  ];

  const mockStorage = [
    { id: '1', name: 'sovereign-assets', type: 'R2 Bucket', size: '4.2 GB', objects: '1,240' },
    { id: '2', name: 'nexus-relational-core', type: 'D1 Database', size: '156 MB', objects: '45 Tables' },
    { id: '3', name: 'agent-memory-kv', type: 'KV Namespace', size: '12 MB', objects: '8,400 Keys' }
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="h-full bg-[#0a0a0c] text-slate-300 font-sans p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center shadow-lg shadow-orange-500/10">
            <Cloud className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Cloudflare Sovereign Bridge</h1>
            <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">Connector // Global Edge Orchestration</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Account:</span>
            <select 
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="bg-transparent text-[10px] font-bold text-orange-400 uppercase tracking-widest outline-none cursor-pointer"
            >
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id} className="bg-[#0a0a0c]">{acc.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Mode:</span>
            <button 
              onClick={() => setIsSimulationMode(!isSimulationMode)}
              className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded transition-all ${
                isSimulationMode ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}
            >
              {isSimulationMode ? 'Simulation' : 'Live Edge'}
            </button>
          </div>
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-slate-400"
          >
            <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin text-orange-400' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="space-y-2">
          <button 
            onClick={() => setActiveTab('workers')}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border ${
              activeTab === 'workers' ? 'bg-orange-600/10 border-orange-500/30 text-white' : 'bg-transparent border-transparent text-slate-500 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Cpu className="w-4 h-4" />
              <span className="text-sm font-medium">Workers & Pages</span>
            </div>
            <span className="text-[10px] font-mono bg-white/5 px-1.5 rounded">3</span>
          </button>
          <button 
            onClick={() => setActiveTab('storage')}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border ${
              activeTab === 'storage' ? 'bg-orange-600/10 border-orange-500/30 text-white' : 'bg-transparent border-transparent text-slate-500 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Database className="w-4 h-4" />
              <span className="text-sm font-medium">Storage (R2/D1/KV)</span>
            </div>
            <span className="text-[10px] font-mono bg-white/5 px-1.5 rounded">3</span>
          </button>
          <button 
            onClick={() => setActiveTab('network')}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border ${
              activeTab === 'network' ? 'bg-orange-600/10 border-orange-500/30 text-white' : 'bg-transparent border-transparent text-slate-500 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Security & DNS</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-30" />
          </button>

          <div className="pt-6">
            <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-3 h-3 text-orange-400" />
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">cf CLI Active</span>
              </div>
              <p className="text-[10px] text-orange-300/60 leading-relaxed">
                Schema-enforced commands are being routed through the Sovereign Bridge.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'workers' ? (
              <motion.div 
                key="workers"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-white uppercase tracking-widest">Compute Instances</h2>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-bold hover:bg-orange-500 transition-all shadow-lg shadow-orange-600/20">
                    <Plus className="w-3 h-3" />
                    Deploy New Worker
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockWorkers.map((worker) => (
                    <div key={worker.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-orange-500/30 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Zap className={`w-3 h-3 ${worker.status === 'active' ? 'text-orange-400' : 'text-red-400'}`} />
                          <span className="text-sm font-bold text-white">{worker.name}</span>
                        </div>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          worker.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                          {worker.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-slate-500">ROUTES</span>
                          <span className="text-slate-300">{worker.routes[0]}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-slate-500">REQUESTS (24H)</span>
                          <span className="text-slate-300">{worker.requests}</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded bg-white/5 text-slate-500 hover:text-white transition-all">
                          <Terminal className="w-3 h-3" />
                        </button>
                        <button className="p-1.5 rounded bg-white/5 text-slate-500 hover:text-white transition-all">
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="storage"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-white uppercase tracking-widest">Storage Resources</h2>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-bold hover:bg-white/10 transition-all">
                    <Search className="w-3 h-3" />
                    Resource Explorer
                  </button>
                </div>

                <div className="space-y-3">
                  {mockStorage.map((item) => (
                    <div key={item.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between group hover:bg-white/[0.05] transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                          <Database className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{item.name}</h4>
                          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{item.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="text-[10px] font-mono text-slate-500 uppercase">Size</p>
                          <p className="text-xs font-bold text-slate-300">{item.size}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-mono text-slate-500 uppercase">Objects</p>
                          <p className="text-xs font-bold text-slate-300">{item.objects}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-orange-400 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Global Metrics Footer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Health</span>
              </div>
              <p className="text-lg font-bold text-white">99.99%</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Avg Latency</span>
              </div>
              <p className="text-lg font-bold text-white">24ms</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-3 h-3 text-blue-400" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Security Events</span>
              </div>
              <p className="text-lg font-bold text-white">0 Threats</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
