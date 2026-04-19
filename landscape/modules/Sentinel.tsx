import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Search, 
  Settings, 
  Activity, 
  Zap, 
  Clock, 
  AlertTriangle,
  FileWarning,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Bell,
  Eye,
  EyeOff,
  Trash2,
  Filter
} from 'lucide-react';
import { Notification, BackgroundTask, LogEntry, UIMode } from '../../src/types';

interface SentinelProps {
  backgroundTasks?: BackgroundTask[];
  onRescue?: (taskId: string) => void;
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onAction?: (id: string, status: 'approved' | 'rejected') => void;
  logs?: LogEntry[];
  uiMode?: UIMode;
}

export const Sentinel: React.FC<SentinelProps> = ({ 
  backgroundTasks = [], 
  onRescue, 
  notifications,
  onMarkRead,
  onDelete,
  onClearAll,
  onAction,
  logs = [],
  uiMode
}) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'logs'>('feed');
  const [isScanning, setIsScanning] = useState(false);
  const [scanInterval, setScanInterval] = useState(6); // hours
  const [scanDepth, setScanDepth] = useState<'quick' | 'deep' | 'paranoid'>('deep');
  const [filter, setFilter] = useState<'all' | 'security' | 'warning' | 'info' | 'system'>('all');

  const handleStartScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  const filteredNotifications = notifications.filter(n => filter === 'all' || n.type === filter);

  const getTypeStyles = (type: Notification['type']) => {
    switch (type) {
      case 'security': return 'bg-red-500/10 border-red-500/20 text-red-400';
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
      case 'info': return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
      case 'error': return 'bg-red-600/10 border-red-600/20 text-red-500';
      case 'system': return 'bg-purple-500/10 border-purple-500/20 text-purple-400';
    }
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'security': return <ShieldAlert className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'info': return <Bell className="w-4 h-4" />;
      case 'error': return <FileWarning className="w-4 h-4" />;
      case 'system': return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className={`h-full bg-[#050508] flex flex-col font-sans overflow-hidden ${uiMode === 'browser' ? 'pb-32 md:pb-0' : ''}`}>
      {/* Header HUD */}
      <div className="h-16 bg-gray-900/50 border-b border-white/5 flex items-center justify-between px-6 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-600/10 rounded-xl">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-widest">Sentinel Guardian</h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Security Hub & System Logs</p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-gray-950/50 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setActiveTab('feed')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'feed' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Feed
            </button>
            <button 
              onClick={() => setActiveTab('logs')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'logs' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-gray-300'}`}
            >
              System Logs
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest">Active Protection</span>
          </div>
          <button 
            onClick={handleStartScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20"
          >
            {isScanning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
            {isScanning ? 'Scanning...' : 'System Audit'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Main Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          {activeTab === 'feed' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard icon={Activity} label="Events Logged" value={notifications.length.toString()} color="text-blue-400" />
                <StatCard icon={ShieldAlert} label="Blocks (24h)" value="12" color="text-red-400" />
                <StatCard icon={Zap} label="System Integrity" value="100%" color="text-green-400" />
              </div>

              {backgroundTasks.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Active Background Tasks</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {backgroundTasks.map(task => (
                      <div key={task.id} className="bg-gray-900/50 border border-white/10 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${task.status === 'running' ? 'animate-spin' : ''}`} />
                            <span className="text-xs font-bold text-white uppercase tracking-tight">{task.name}</span>
                          </div>
                          <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                            task.status === 'running' ? 'border-blue-500/20 text-blue-400' : 
                            task.status === 'completed' ? 'border-green-500/20 text-green-400' : 
                            'border-red-500/20 text-red-400'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${task.progress}%` }}
                            className="h-full bg-blue-500"
                          />
                        </div>
                        {task.status === 'failed' && onRescue && (
                          <button 
                            onClick={() => onRescue(task.id)}
                            className="w-full py-2 bg-red-900/20 hover:bg-red-900/40 border border-red-900/50 text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all"
                          >
                            Initiate Codex Rescue
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-4">
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sentinel Feed</h3>
                    <div className="flex items-center gap-2 bg-gray-900/50 border border-white/5 rounded-lg px-2 py-1">
                      <Filter className="w-3 h-3 text-gray-500" />
                      <select 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
                        className="bg-transparent text-[9px] font-bold text-gray-400 uppercase tracking-widest outline-none border-none cursor-pointer"
                      >
                        <option value="all">All Events</option>
                        <option value="security">Security Only</option>
                        <option value="warning">Warnings</option>
                        <option value="info">Info</option>
                        <option value="system">External Pulses</option>
                      </select>
                    </div>
                  </div>
                  <button 
                    onClick={onClearAll}
                    className="text-[9px] text-gray-500 hover:text-red-400 font-bold uppercase tracking-widest transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-2">
                  <AnimatePresence mode="popLayout">
                    {filteredNotifications.map((n) => (
                      <motion.div 
                        key={n.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`bg-gray-900/50 border rounded-2xl p-4 flex flex-col gap-3 group transition-all ${n.read ? 'border-white/5 opacity-70' : 'border-white/10 shadow-lg shadow-white/5'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-xl border ${getTypeStyles(n.type)}`}>
                              {getTypeIcon(n.type)}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white mb-0.5 flex items-center gap-2">
                                {n.title}
                                {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                              </div>
                              <div className="flex items-center gap-3 text-[9px] text-gray-500 uppercase tracking-widest font-bold">
                                <span>{n.timestamp.toLocaleTimeString()}</span>
                                {(n.agentId || n.metadata?.agentId) && (
                                  <>
                                    <span className="w-1 h-1 rounded-full bg-gray-700" />
                                    <span className="text-blue-400">Agent: {n.agentId || n.metadata?.agentId}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => onMarkRead(n.id)}
                              className="p-2 text-gray-500 hover:text-blue-400 transition-colors"
                              title={n.read ? "Mark as unread" : "Mark as read"}
                            >
                              {n.read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button 
                              onClick={() => onDelete(n.id)}
                              className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-relaxed pl-11">
                          {n.message}
                        </p>

                        {n.action && (
                          <div className="pl-11 pt-2 flex items-center gap-3">
                            {n.action.status === 'pending' ? (
                              <>
                                <button 
                                  onClick={() => onAction?.(n.id, 'approved')}
                                  className="px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-green-600/20"
                                >
                                  Approve
                                </button>
                                <button 
                                  onClick={() => onAction?.(n.id, 'rejected')}
                                  className="px-4 py-1.5 bg-red-900/20 hover:bg-red-900/40 border border-red-900/50 text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all"
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-[9px] font-bold uppercase tracking-widest ${
                                n.action.status === 'approved' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                              }`}>
                                {n.action.status === 'approved' ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                                {n.action.status} by Chairman
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {filteredNotifications.length === 0 && (
                    <div className="py-20 flex flex-col items-center justify-center text-gray-600 space-y-4">
                      <ShieldCheck className="w-12 h-12 opacity-20" />
                      <p className="text-xs font-bold uppercase tracking-widest opacity-40">No events to display</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">System Log Keeper</h3>
                <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest">Format: [LEVEL] [SOURCE] MESSAGE &#123;METADATA&#125;</span>
              </div>
              <div className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden font-mono text-[11px]">
                <div className="max-h-[600px] overflow-y-auto p-4 space-y-2 no-scrollbar">
                  {logs.map((log) => (
                    <div key={log.id} className="group flex flex-col gap-1 py-1 border-b border-white/5 last:border-0">
                      <div className="flex items-start gap-3">
                        <span className="text-gray-600 shrink-0">{log.timestamp.toLocaleTimeString()}</span>
                        <span className={`font-bold shrink-0 w-16 ${
                          log.level === 'ERROR' || log.level === 'CRITICAL' ? 'text-red-500' :
                          log.level === 'WARN' ? 'text-yellow-500' :
                          log.level === 'INFO' ? 'text-blue-400' : 'text-gray-500'
                        }`}>[{log.level}]</span>
                        <span className="text-purple-400 shrink-0 w-24">[{log.source}]</span>
                        <span className="text-gray-300 flex-1">{log.message}</span>
                        {log.traceId && <span className="text-gray-600 text-[9px] uppercase tracking-tighter">ID: {log.traceId}</span>}
                      </div>
                      {log.metadata && (
                        <div className="ml-44 pl-3 border-l border-white/10 text-[10px] text-gray-500 bg-white/5 p-2 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity">
                          <pre className="whitespace-pre-wrap">{JSON.stringify(log.metadata, null, 2)}</pre>
                        </div>
                      )}
                    </div>
                  ))}
                  {logs.length === 0 && (
                    <div className="py-20 text-center text-gray-700 uppercase tracking-widest text-[10px]">No logs recorded</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Configuration Sidebar */}
        <div className="w-full md:w-72 bg-gray-900/30 border-l border-white/5 p-6 space-y-8 shrink-0 overflow-y-auto no-scrollbar">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Settings className="w-3.5 h-3.5" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest">Guardian Config</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-gray-500">Scan Interval</span>
                  <span className="text-blue-400">{scanInterval} Hours</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="24" 
                  value={scanInterval}
                  onChange={(e) => setScanInterval(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Policy Enforcement</label>
                <div className="grid grid-cols-1 gap-2">
                  <DepthOption 
                    active={true} 
                    label="Silent Block + Notify" 
                    desc="Default Viabhron Policy" 
                    onClick={() => {}} 
                  />
                  <DepthOption 
                    active={false} 
                    label="Confirmation Gate" 
                    desc="Ask for every action" 
                    onClick={() => {}} 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest">Security Status</h3>
            </div>
            <div className="p-4 bg-gray-950 border border-white/5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Kernel Integrity</span>
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Vault Encryption</span>
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Network Sandbox</span>
                <div className="w-2 h-2 rounded-full bg-green-500" />
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

const DepthOption = ({ active, label, desc, onClick }: { active: boolean, label: string, desc: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full p-3 rounded-xl border text-left transition-all ${active ? 'bg-blue-600/10 border-blue-500/40 text-white' : 'bg-gray-950 border-white/5 text-gray-500 hover:border-white/10'}`}
  >
    <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5">{label}</div>
    <div className="text-[8px] uppercase tracking-tighter opacity-60">{desc}</div>
  </button>
);
