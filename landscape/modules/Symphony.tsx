import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Music, 
  GitBranch, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Terminal, 
  Settings, 
  RefreshCw,
  ExternalLink,
  Cpu,
  Zap,
  ShieldCheck,
  ListTodo
} from 'lucide-react';
import { UIMode, BackgroundTask, LogEntry } from '../../types';

interface SymphonyRun {
  id: string;
  ticketId: string;
  title: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  startTime: Date;
  agentId: string;
}

interface SymphonyProps {
  uiMode?: UIMode;
  backgroundTasks?: BackgroundTask[];
  logs?: LogEntry[];
}

export const Symphony: React.FC<SymphonyProps> = ({ uiMode, backgroundTasks = [], logs = [] }) => {
  const [activeTab, setActiveTab] = useState<'orchestration' | 'logs' | 'config'>('orchestration');
  const [runs, setRuns] = useState<SymphonyRun[]>([
    {
      id: 'run-1',
      ticketId: 'VIAB-124',
      title: 'Implement OAuth Bridge',
      status: 'running',
      progress: 42,
      startTime: new Date(Date.now() - 1000 * 60 * 15),
      agentId: 'Symphony-Agent-Alpha'
    },
    {
      id: 'run-2',
      ticketId: 'VIAB-125',
      title: 'Refactor Kernel Memory',
      status: 'completed',
      progress: 100,
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
      agentId: 'Symphony-Agent-Beta'
    }
  ]);

  const symphonyLogs = logs.filter(l => l.source === 'Symphony-Agent' || l.source === 'Orchestrator');

  return (
    <div className={`h-full bg-[#050508] flex flex-col font-sans overflow-hidden ${uiMode === 'browser' ? 'pb-32 md:pb-0' : ''}`}>
      {/* Header HUD */}
      <div className="h-16 bg-gray-900/50 border-b border-white/5 flex items-center justify-between px-6 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-600/10 rounded-xl">
              <Music className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-widest">Symphony Orchestrator</h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Autonomous Implementation Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-gray-950/50 p-1 rounded-xl border border-white/5">
            {['orchestration', 'logs', 'config'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-gray-500 hover:text-gray-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest">Engine Active</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border border-white/10">
            <ListTodo className="w-3.5 h-3.5" />
            Linear Sync
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          {activeTab === 'orchestration' ? (
            <>
              {/* Stats HUD */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard icon={Zap} label="Active Runs" value={runs.filter(r => r.status === 'running').length.toString()} color="text-purple-400" />
                <StatCard icon={CheckCircle2} label="Completed (24h)" value="8" color="text-green-400" />
                <StatCard icon={Cpu} label="Agent Metabolism" value="64%" color="text-blue-400" />
              </div>

              {/* Active Implementation Runs */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Implementation Queue</h3>
                <div className="grid grid-cols-1 gap-4">
                  <AnimatePresence mode="popLayout">
                    {runs.map((run) => (
                      <motion.div 
                        key={run.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-900/50 border border-white/10 rounded-2xl p-5 space-y-4 group hover:border-purple-500/30 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-xl border ${
                              run.status === 'running' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 
                              run.status === 'completed' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 
                              'bg-red-500/10 border-red-500/20 text-red-400'
                            }`}>
                              {run.status === 'running' ? <RefreshCw className="w-4 h-4 animate-spin" /> : 
                               run.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : 
                               <AlertCircle className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-purple-400 font-bold">{run.ticketId}</span>
                                <h4 className="text-sm font-bold text-white tracking-tight">{run.title}</h4>
                              </div>
                              <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">
                                Agent: {run.agentId} • Started {run.startTime.toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {run.status === 'completed' ? (
                              <button className="px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-green-600/20">
                                Ratify & Merge
                              </button>
                            ) : (
                              <button className="p-2 text-gray-500 hover:text-white transition-colors">
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
                            <span className="text-gray-500">Implementation Progress</span>
                            <span className="text-purple-400">{run.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${run.progress}%` }}
                              className={`h-full ${run.status === 'failed' ? 'bg-red-500' : 'bg-purple-500'}`}
                            />
                          </div>
                        </div>

                        {run.status === 'running' && (
                          <div className="flex items-center gap-2 p-2 bg-black/40 rounded-lg border border-white/5 font-mono text-[10px] text-gray-400">
                            <Terminal className="w-3 h-3 text-purple-500" />
                            <span className="animate-pulse">Executing: npm run test:security ...</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </>
          ) : activeTab === 'logs' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Orchestration Audit Logs</h3>
                <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest">Source: Symphony-Agent</span>
              </div>
              <div className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden font-mono text-[11px]">
                <div className="max-h-[600px] overflow-y-auto p-4 space-y-2 no-scrollbar">
                  {symphonyLogs.map((log) => (
                    <div key={log.id} className="group flex flex-col gap-1 py-1 border-b border-white/5 last:border-0">
                      <div className="flex items-start gap-3">
                        <span className="text-gray-600 shrink-0">{log.timestamp.toLocaleTimeString()}</span>
                        <span className={`font-bold shrink-0 w-16 ${
                          log.level === 'ERROR' || log.level === 'CRITICAL' ? 'text-red-500' :
                          log.level === 'WARN' ? 'text-yellow-500' :
                          log.level === 'INFO' ? 'text-purple-400' : 'text-gray-500'
                        }`}>[{log.level}]</span>
                        <span className="text-gray-300 flex-1">{log.message}</span>
                      </div>
                      {log.metadata && (
                        <div className="ml-24 pl-3 border-l border-white/10 text-[10px] text-gray-500 bg-white/5 p-2 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity">
                          <pre className="whitespace-pre-wrap">{JSON.stringify(log.metadata, null, 2)}</pre>
                        </div>
                      )}
                    </div>
                  ))}
                  {symphonyLogs.length === 0 && (
                    <div className="py-20 text-center text-gray-700 uppercase tracking-widest text-[10px]">No orchestration logs recorded</div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-8 py-4">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Settings className="w-4 h-4 text-purple-400" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Engine Configuration</h3>
                </div>
                
                <div className="space-y-4">
                  <ConfigToggle 
                    label="Auto-Approve Minor Fixes" 
                    description="Allow agents to merge non-breaking changes without ratification."
                    enabled={false}
                  />
                  <ConfigToggle 
                    label="Isolated Forge Sandboxes" 
                    description="Run implementation in a fresh Cloud Run container for every ticket."
                    enabled={true}
                  />
                  <ConfigToggle 
                    label="Linear Webhook Sync" 
                    description="Automatically spawn runs when tickets are moved to 'In Progress'."
                    enabled={true}
                  />
                </div>
              </div>

              <div className="p-6 bg-purple-500/5 border border-purple-500/20 rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight">Sovereign Safety Gate</h4>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-tight">
                  Symphony is restricted to the "Forge" substrate. It cannot modify the "Skeleton" or "Soul Core" without explicit Chairman ratification.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar HUD */}
        <div className="w-full md:w-72 bg-gray-900/30 border-l border-white/5 p-6 space-y-8 shrink-0 overflow-y-auto no-scrollbar">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <GitBranch className="w-3.5 h-3.5" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest">Branch Status</h3>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-gray-950 border border-white/5 rounded-xl flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">main</span>
                <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest">Protected</span>
              </div>
              <div className="p-3 bg-gray-950 border border-white/5 rounded-xl flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">sym/viab-124</span>
                <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest">Active</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <RefreshCw className="w-3.5 h-3.5" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest">Metabolism</h3>
            </div>
            <div className="p-4 bg-gray-950 border border-white/5 rounded-2xl space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
                  <span className="text-gray-500">Token Burn</span>
                  <span className="text-white">1.2k / min</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 w-[60%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
                  <span className="text-gray-500">Compute Load</span>
                  <span className="text-white">42%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[42%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-4 space-y-2">
    <div className="flex items-center gap-2 text-gray-500">
      <Icon className="w-3.5 h-3.5" />
      <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
    </div>
    <div className={`text-xl font-bold ${color}`}>{value}</div>
  </div>
);

const ConfigToggle = ({ label, description, enabled }: { label: string, description: string, enabled: boolean }) => (
  <div className="flex items-center justify-between p-4 bg-gray-950 border border-white/5 rounded-xl group hover:border-purple-500/20 transition-all">
    <div className="space-y-1">
      <div className="text-sm font-bold text-white">{label}</div>
      <div className="text-[10px] text-gray-500 uppercase tracking-tight">{description}</div>
    </div>
    <button className={`w-10 h-5 rounded-full relative transition-all ${enabled ? 'bg-purple-600' : 'bg-gray-800'}`}>
      <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${enabled ? 'left-6' : 'left-1'}`} />
    </button>
  </div>
);
