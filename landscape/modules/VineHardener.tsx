import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Activity, 
  Cpu, 
  Network, 
  Lock, 
  RefreshCw,
  AlertCircle,
  HardDrive,
  Send,
  Terminal as TerminalIcon,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BranchStatus {
  id: string;
  name: string;
  type: 'Mobile' | 'Desktop' | 'Server';
  status: 'active' | 'optimizing' | 'standby' | 'error';
  savings: number;
  hardware: string;
  lastHandshake: string;
}

export const VineHardener: React.FC = () => {
  const [branches, setBranches] = useState<BranchStatus[]>([
    { id: 'BR-01', name: 'Chairman_iPhone', type: 'Mobile', status: 'active', savings: 1420, hardware: 'A17 Pro', lastHandshake: '2m ago' },
    { id: 'BR-02', name: 'Sovereign_MacBook', type: 'Desktop', status: 'active', savings: 5840, hardware: 'M3 Max', lastHandshake: 'Just now' },
    { id: 'BR-03', name: 'Edge_Node_Alpha', type: 'Server', status: 'optimizing', savings: 12400, hardware: 'RTX 4090', lastHandshake: '15m ago' }
  ]);

  const [isHardening, setIsHardening] = useState(false);
  const [activeDispatch, setActiveDispatch] = useState<string | null>(null);

  const handleHardening = () => {
    setIsHardening(true);
    setTimeout(() => setIsHardening(false), 3000);
  };

  const totalSavings = branches.reduce((acc, b) => acc + b.savings, 0);

  return (
    <div className="h-full bg-black text-blue-500 font-mono p-8 overflow-y-auto selection:bg-blue-500/30">
      {/* Industrial Header */}
      <div className="border-b border-blue-900/50 pb-6 mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3 tracking-tighter">
            <ShieldCheck className="w-8 h-8" />
            VINE_HARDENER // PROTOCOL_8008
          </h1>
          <p className="text-xs text-blue-700 mt-1 uppercase tracking-widest">
            Branch Autonomy & QVAC Substrate Control
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 border border-blue-900 rounded text-[10px] uppercase">
            Substrate: <span className="text-blue-400">QVAC v1.0.4</span>
          </div>
          <div className="px-3 py-1 border border-blue-900 rounded text-[10px] uppercase">
            Network: <span className="text-blue-400">Distributed Vine</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Branch Monitor */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-blue-950/10 border border-blue-900/30 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest">
                <Network className="w-4 h-4" />
                Active Vine Branches
              </h2>
              <button 
                onClick={handleHardening}
                disabled={isHardening}
                className="px-4 py-2 bg-blue-900/20 hover:bg-blue-900/40 border border-blue-900 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2"
              >
                {isHardening ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                Sync Substrate
              </button>
            </div>

            <div className="space-y-4">
              {branches.map(branch => (
                <div key={branch.id} className="bg-black border border-blue-900/30 p-4 rounded-xl group hover:border-blue-500/50 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${branch.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`} />
                      <h3 className="text-sm font-bold text-white">{branch.name}</h3>
                      <span className="text-[8px] px-1.5 py-0.5 bg-blue-900/20 text-blue-400 rounded border border-blue-900/30 uppercase font-bold">
                        {branch.type}
                      </span>
                    </div>
                    <div className="text-[10px] text-blue-900 uppercase font-bold">
                      ID: {branch.id}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="text-[8px] text-blue-900 uppercase">Hardware</div>
                      <div className="text-[10px] text-blue-400 flex items-center gap-1">
                        <Cpu className="w-3 h-3" />
                        {branch.hardware}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[8px] text-blue-900 uppercase">Metabolic Savings</div>
                      <div className="text-[10px] text-green-400 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {branch.savings.toLocaleString()} Tokens
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[8px] text-blue-900 uppercase">Last Handshake</div>
                      <div className="text-[10px] text-blue-400 flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        {branch.lastHandshake}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-blue-900/20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-[8px] text-blue-900 uppercase">
                        <Lock className="w-3 h-3" />
                        Sovereign Encrypted
                      </div>
                      <div className="flex items-center gap-1 text-[8px] text-blue-900 uppercase">
                        <HardDrive className="w-3 h-3" />
                        Local Inference Active
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setActiveDispatch(branch.id)}
                        className="text-[8px] px-3 py-1 bg-blue-900/10 border border-blue-900 hover:bg-blue-500 hover:text-black hover:border-blue-500 text-blue-400 uppercase font-bold tracking-widest transition-all flex items-center gap-2"
                      >
                        <Send className="w-2.5 h-2.5" />
                        Dispatch Agent
                      </button>
                      <button className="text-[8px] text-blue-700 hover:text-blue-400 uppercase font-bold tracking-widest transition-colors">
                        Revoke Branch
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {activeDispatch && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-950/10 border border-blue-500/30 p-6 rounded-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <button onClick={() => setActiveDispatch(null)} className="text-blue-900 hover:text-blue-500">
                  <AlertCircle className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <TerminalIcon className="w-5 h-5 text-blue-400 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-widest">Sovereign Dispatch Session</h2>
                  <p className="text-[9px] text-blue-500 uppercase font-bold">Target: {activeDispatch} // Mission: Maintenance_Audit</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-black border border-blue-900/30 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-blue-900 uppercase font-bold">Mission Mandate</span>
                      <span className="text-[8px] px-1.5 py-0.5 bg-green-900/20 text-green-400 rounded border border-green-900/30 uppercase font-bold">Verified</span>
                    </div>
                    <div className="text-[10px] text-blue-400 font-mono break-all">
                      8004_SIG: 0x7f2...a9e1
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['fs.read', 'fs.write', 'sys.audit'].map(p => (
                        <span key={p} className="text-[8px] px-1.5 py-0.5 bg-blue-900/10 text-blue-700 rounded border border-blue-900/20 uppercase">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-black border border-blue-900/30 rounded-xl p-4 h-32 overflow-y-auto no-scrollbar font-mono text-[9px] space-y-1">
                  <div className="text-blue-900">[10:32:01] Handshake initiated with {activeDispatch}...</div>
                  <div className="text-blue-900">[10:32:02] Mission Mandate verified via 8004 Protocol.</div>
                  <div className="text-blue-400">[10:32:05] Scanning local filesystem for metabolic leaks...</div>
                  <div className="text-blue-400">[10:32:10] Optimizing local KV-cache substrate...</div>
                  <div className="text-emerald-500">[10:32:15] Optimization complete. Savings: +120 tokens/hr.</div>
                  <div className="text-blue-900 animate-pulse">[10:32:20] Waiting for next instruction...</div>
                </div>
              </div>
            </motion.section>
          )}
        </div>

        {/* Metabolic Analytics */}
        <div className="space-y-8">
          <section className="bg-blue-950/10 border border-blue-900/30 p-6 rounded-lg">
            <h2 className="text-sm font-bold text-blue-400 mb-6 flex items-center gap-2 uppercase tracking-widest">
              <Activity className="w-4 h-4" />
              Metabolic Efficiency
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-black border border-blue-900/30 rounded-xl">
                <div className="text-[10px] text-blue-900 uppercase mb-1">Total Sovereign Savings</div>
                <div className="text-2xl font-bold text-green-400 tracking-tighter">
                  {totalSavings.toLocaleString()} <span className="text-xs font-normal text-green-900">Tokens</span>
                </div>
                <div className="mt-2 text-[8px] text-blue-700 uppercase leading-relaxed">
                  Tokens processed locally on branch substrate instead of cloud stem.
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase">
                    <span className="text-blue-900">Substrate Load:</span>
                    <span className="text-blue-400">42%</span>
                  </div>
                  <div className="h-1 bg-blue-900/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '42%' }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase">
                    <span className="text-blue-900">Handshake Integrity:</span>
                    <span className="text-green-400">99.9%</span>
                  </div>
                  <div className="h-1 bg-blue-900/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '99.9%' }}
                      className="h-full bg-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-blue-950/5 border border-blue-900/20 p-6 rounded-lg">
            <h2 className="text-sm font-bold text-blue-700 mb-4 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              System Alerts
            </h2>
            <div className="space-y-3">
              <div className="text-[9px] text-blue-900 uppercase border-l-2 border-blue-900 pl-3 py-1">
                [04:12:01] Branch BR-03 optimized for 4-bit quantization.
              </div>
              <div className="text-[9px] text-blue-900 uppercase border-l-2 border-blue-900 pl-3 py-1">
                [03:55:42] Handshake verified with Chairman_iPhone.
              </div>
              <div className="text-[9px] text-red-900 uppercase border-l-2 border-red-900 pl-3 py-1">
                [02:10:15] Branch BR-04 offline: Connection timeout.
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
