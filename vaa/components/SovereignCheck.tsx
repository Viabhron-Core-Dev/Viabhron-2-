import React, { useState, useEffect } from "react";
import { 
  Shield, 
  X, 
  Cpu, 
  Wifi, 
  Zap, 
  CheckCircle2, 
  RefreshCw 
} from "lucide-react";
import { motion } from "motion/react";

interface SovereignCheckProps {
  onClose: () => void;
}

export const SovereignCheck: React.FC<SovereignCheckProps> = ({ onClose }) => {
  const [ramUsage, setRamUsage] = useState(45);
  const [storageUsage, setStorageUsage] = useState(12);
  const [networkSpeed, setNetworkSpeed] = useState({ up: 1.2, down: 4.5 });
  const [tokenCount, setTokenCount] = useState(12450);

  useEffect(() => {
    const interval = setInterval(() => {
      setRamUsage(prev => Math.min(95, Math.max(30, prev + (Math.random() * 4 - 2))));
      setNetworkSpeed({ 
        up: Number((Math.random() * 2 + 0.5).toFixed(1)), 
        down: Number((Math.random() * 10 + 2).toFixed(1)) 
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (usage: number) => {
    if (usage > 90) return 'text-red-500';
    if (usage > 75) return 'text-orange-500';
    return 'text-green-500';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      className="fixed inset-0 bg-slate-900/95 backdrop-blur-2xl z-[120] flex flex-col p-6 text-white"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
            <Shield className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-lg font-black uppercase tracking-widest">Sovereign Check</h2>
            <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">System Heartbeat Diagnostic</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-8">
        {/* Resource Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem] space-y-3">
            <div className="flex items-center gap-2 text-gray-400">
              <Cpu className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Memory</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-black ${getStatusColor(ramUsage)}`}>{Math.round(ramUsage)}%</span>
              <span className="text-[10px] text-gray-500">of 3GB</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem] space-y-3">
            <div className="flex items-center gap-2 text-gray-500">
              <Wifi className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Network</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-gray-500">UP</span>
                <span className="text-blue-400">{networkSpeed.up} MB/s</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-gray-500">DOWN</span>
                <span className="text-cyan-400">{networkSpeed.down} MB/s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Token Ledger */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-[11px] font-black uppercase tracking-widest">Token Ledger</span>
            </div>
            <span className="text-xs font-mono text-white">{tokenCount.toLocaleString()}</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              className="h-full bg-yellow-400"
            />
          </div>
          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Daily Quota: 65% Consumed</p>
        </div>

        {/* Running Tasks */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Active Sovereign Tasks</h3>
          <div className="space-y-3">
            {[
              { name: "GitHub Hatchery Sync", progress: 85, status: "Indexing" },
              { name: "Sentinel Log Analysis", progress: 40, status: "Processing" },
              { name: "News Pulse Scraper", progress: 100, status: "Idle" }
            ].map(task => (
              <div key={task.name} className="bg-white/5 border border-white/10 p-4 rounded-3xl flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${task.progress === 100 ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"}`}>
                  {task.progress === 100 ? <CheckCircle2 className="w-5 h-5" /> : <RefreshCw className="w-5 h-5 animate-spin" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-xs font-bold truncate">{task.name}</h4>
                    <span className="text-[9px] font-mono text-gray-500">{task.progress}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${task.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 flex gap-3">
        <button className="flex-1 py-4 bg-indigo-600 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-600/20">
          Optimize System
        </button>
        <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-[10px]">
          Purge Cache
        </button>
      </div>
    </motion.div>
  );
};
