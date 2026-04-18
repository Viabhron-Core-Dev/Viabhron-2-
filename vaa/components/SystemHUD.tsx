import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Database, 
  Cpu, 
  Wifi, 
  Trash2, 
  Moon, 
  FileText, 
  X, 
  ChevronDown,
  HardDrive,
  Zap,
  Shield,
  Key,
  Copy,
  Check
} from 'lucide-react';

interface SystemHUDProps {
  onClearCache: () => void;
  onHibernateAll: () => void;
  isLockdown?: boolean;
}

export const SystemHUD: React.FC<SystemHUDProps> = ({ onClearCache, onHibernateAll, isLockdown }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ramUsage, setRamUsage] = useState(45);
  const [storageUsage, setStorageUsage] = useState(12);
  const [networkSpeed, setNetworkSpeed] = useState({ up: 1.2, down: 4.5 });
  const [tokenCount, setTokenCount] = useState(12450);
  const [isCopied, setIsCopied] = useState(false);

  const handleAccreditTerminal = () => {
    const config = localStorage.getItem('viabhron_firebase_config');
    if (config) {
      const key = btoa(config);
      navigator.clipboard.writeText(key);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Simulate live updates
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

  const getStatusBg = (usage: number) => {
    if (usage > 90) return 'bg-red-500';
    if (usage > 75) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col items-end gap-2">
      {/* Floating Square HUD */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${isLockdown ? 'bg-red-600 border-red-400 animate-pulse' : 'bg-gray-900/80 border-white/10'} backdrop-blur-xl border p-2 rounded-xl flex flex-col items-center gap-1.5 shadow-2xl group min-w-[44px]`}
      >
        {isLockdown ? (
          <Shield className="w-4 h-4 text-white" />
        ) : (
          <>
            <div className="flex items-center gap-1">
              <Cpu className={`w-2.5 h-2.5 ${getStatusColor(ramUsage)}`} />
              <span className={`text-[8px] font-bold ${getStatusColor(ramUsage)}`}>{Math.round(ramUsage)}%</span>
            </div>
            <div className="w-full h-px bg-white/10" />
            <div className="flex items-center gap-1">
              <HardDrive className="w-2.5 h-2.5 text-blue-400" />
              <span className="text-[8px] font-bold text-gray-400 group-hover:text-white transition-colors">{storageUsage}%</span>
            </div>
          </>
        )}
      </motion.button>

      {/* Detailed Dashboard */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="w-[320px] bg-gray-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">System Dashboard</h2>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/5 rounded-lg text-gray-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Resource Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-950/50 p-4 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Cpu className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Memory</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-xl font-bold ${getStatusColor(ramUsage)}`}>{Math.round(ramUsage)}%</span>
                    <span className="text-[9px] text-gray-600">of 3GB</span>
                  </div>
                </div>
                <div className="bg-gray-950/50 p-4 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Wifi className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Network</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono">
                      <span className="text-gray-600">UP</span>
                      <span className="text-blue-400">{networkSpeed.up} MB/s</span>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono">
                      <span className="text-gray-600">DOWN</span>
                      <span className="text-cyan-400">{networkSpeed.down} MB/s</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cloud Health */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Database className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Cloud Health</span>
                  </div>
                  <span className="text-[9px] text-green-500 font-bold uppercase">Optimal</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-gray-400">Firebase Reads</span>
                    <span className="text-white">45%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[45%] h-full bg-blue-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="text-gray-400">Token Usage</span>
                  </div>
                  <span className="text-white font-mono">{tokenCount.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button 
                  onClick={handleAccreditTerminal}
                  className="col-span-2 flex items-center justify-between px-4 py-3 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <Key className="w-3 h-3" />
                    Accredit Terminal
                  </div>
                  {isCopied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 opacity-50 group-hover:opacity-100" />}
                </button>
                <button 
                  onClick={onClearCache}
                  className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                  Purge Cache
                </button>
                <button 
                  onClick={onHibernateAll}
                  className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all"
                >
                  <Moon className="w-3 h-3" />
                  Hibernate
                </button>
              </div>

              {/* Mini Explorer */}
              <div className="pt-4 border-t border-white/5">
                <button className="w-full flex items-center justify-between p-3 bg-gray-950 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-white uppercase tracking-wider">File Explorer</span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-gray-600 -rotate-90" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
