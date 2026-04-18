import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Mail, 
  Newspaper, 
  TrendingUp, 
  Settings, 
  Play, 
  Pause, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { db, auth } from '@/src/lib/firebase';
import { collection, onSnapshot, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';

export const MetabolicSecretary: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [config, setConfig] = useState({
    interval: 60,
    sources: ['email', 'news', 'market'],
    resonanceThreshold: 7
  });

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'users', auth.currentUser.uid, 'heartbeat'),
      orderBy('timestamp', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: (doc.data().timestamp as any)?.toDate() || new Date()
      }));
      setLogs(data);
      if (data.length > 0) setLastCheck(data[0].timestamp);
    });

    return () => unsubscribe();
  }, []);

  const toggleSecretary = () => setIsActive(!isActive);

  return (
    <div className="h-full bg-[#0a0a0c] text-slate-300 font-sans p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/10">
            <Coffee className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Metabolic Secretary</h1>
            <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">SOP-06 // Autonomous Background Intelligence</p>
          </div>
        </div>

        <button 
          onClick={toggleSecretary}
          className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
            isActive 
            ? 'bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30' 
            : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-600/20'
          }`}
        >
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isActive ? 'Deactivate' : 'Activate Secretary'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                Live Intelligence Stream
              </h3>
              {lastCheck && (
                <span className="text-[10px] font-mono text-slate-500">
                  Last Pulse: {lastCheck.toLocaleTimeString()}
                </span>
              )}
            </div>

            <div className="space-y-4">
              {logs.length > 0 ? logs.map((log) => (
                <motion.div 
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-4"
                >
                  <div className={`mt-1 p-2 rounded-lg ${
                    log.type === 'hatch' ? 'bg-blue-500/20 text-blue-400' : 
                    log.type === 'optimization' ? 'bg-emerald-500/20 text-emerald-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {log.type === 'hatch' ? <Zap className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-300">{log.type.toUpperCase()}</span>
                      <span className="text-[10px] font-mono text-slate-500">{log.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{log.content}</p>
                    {log.impact && (
                      <div className="mt-2 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        IMPACT: {log.impact}
                      </div>
                    )}
                  </div>
                </motion.div>
              )) : (
                <div className="py-12 text-center text-slate-600 italic">
                  No pulses detected in current cycle.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Configuration Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-6">
              <Settings className="w-4 h-4 text-slate-400" />
              Pulse Configuration
            </h3>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Pulse Interval (Minutes)</label>
                <input 
                  type="range" 
                  min="15" 
                  max="240" 
                  step="15"
                  value={config.interval}
                  onChange={(e) => setConfig({...config, interval: parseInt(e.target.value)})}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between mt-1 text-[10px] font-mono text-slate-600">
                  <span>15m</span>
                  <span className="text-amber-400 font-bold">{config.interval}m</span>
                  <span>4h</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-3">Active Data Sources</label>
                <div className="space-y-2">
                  {[
                    { id: 'email', icon: <Mail className="w-3 h-3" />, label: 'Workspace (Email)' },
                    { id: 'news', icon: <Newspaper className="w-3 h-3" />, label: 'Global News' },
                    { id: 'market', icon: <TrendingUp className="w-3 h-3" />, label: 'Market Trends' }
                  ].map((source) => (
                    <button 
                      key={source.id}
                      onClick={() => {
                        const newSources = config.sources.includes(source.id)
                          ? config.sources.filter(s => s !== source.id)
                          : [...config.sources, source.id];
                        setConfig({...config, sources: newSources});
                      }}
                      className={`w-full p-3 rounded-xl border transition-all flex items-center justify-between ${
                        config.sources.includes(source.id)
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {source.icon}
                        <span className="text-xs font-medium">{source.label}</span>
                      </div>
                      {config.sources.includes(source.id) && <CheckCircle2 className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <div className="text-[10px] text-blue-300 leading-tight">
                    Librarian Agent is monitoring for resonance threshold {config.resonanceThreshold}/10.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
            <p className="text-[10px] text-amber-500/80 leading-relaxed font-mono">
              METABOLIC WARNING: Background checks consume ~0.4% of daily token budget per pulse.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
