import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Mail, 
  Calendar, 
  RefreshCw, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ChevronRight,
  Inbox,
  Plus
} from 'lucide-react';

export const WorkspaceControl: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'email' | 'calendar'>('email');
  const [isSyncing, setIsSyncing] = useState(false);

  const mockEmails = [
    { id: '1', from: 'Sovereign Registrar', subject: 'Agent Accreditation Success', time: '10:45 AM', snippet: 'The Sentinel agent has been successfully accredited for Level 2 operations.' },
    { id: '2', from: 'Fiscal Comptroller', subject: 'Metabolic Budget Update', time: '09:12 AM', snippet: 'Daily token allocation has been adjusted to 120% for the Gamma R&D cycle.' },
    { id: '3', from: 'Vine Node Alpha', subject: 'Handshake Request', time: 'Yesterday', snippet: 'Requesting secure tunnel for encrypted delta exchange.' }
  ];

  const mockEvents = [
    { id: '1', title: 'Gamma R&D Sync', time: '14:00 - 15:30', type: 'Internal' },
    { id: '2', title: 'Sovereign Identity Audit', time: '16:00 - 17:00', type: 'Security' },
    { id: '3', title: 'Metabolic Review', time: 'Tomorrow, 10:00', type: 'Fiscal' }
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  };

  return (
    <div className="h-full bg-[#0a0a0c] text-slate-300 font-sans p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shadow-lg shadow-blue-500/10">
            <Briefcase className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Workspace Bridge</h1>
            <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">Connector // Unified Productivity Substrate</p>
          </div>
        </div>

        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-slate-400"
        >
          <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin text-blue-400' : ''}`} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-xl border border-white/10 w-fit">
        <button 
          onClick={() => setActiveTab('email')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
            activeTab === 'email' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Mail className="w-3 h-3" />
          Email
        </button>
        <button 
          onClick={() => setActiveTab('calendar')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
            activeTab === 'calendar' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Calendar className="w-3 h-3" />
          Calendar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="wait">
            {activeTab === 'email' ? (
              <motion.div 
                key="email"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                {mockEmails.map((email) => (
                  <div key={email.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-blue-500/30 transition-all group cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{email.from}</span>
                      <span className="text-[10px] font-mono text-slate-500">{email.time}</span>
                    </div>
                    <h4 className="text-sm font-medium text-slate-300 mb-1">{email.subject}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{email.snippet}</p>
                  </div>
                ))}
                <button className="w-full py-3 rounded-xl border border-dashed border-white/10 text-slate-500 text-xs hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                  <Plus className="w-3 h-3" />
                  Compose New Message
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="calendar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                {mockEvents.map((event) => (
                  <div key={event.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex flex-col items-center justify-center border border-blue-500/20">
                        <span className="text-[10px] font-bold text-blue-400 uppercase">Apr</span>
                        <span className="text-sm font-bold text-white leading-none">14</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">{event.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span className="text-[10px] font-mono text-slate-500">{event.time}</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400">
                      {event.type}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-6">
              <Inbox className="w-4 h-4 text-slate-400" />
              Connection Status
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-medium text-emerald-400">Google Workspace</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 opacity-50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-slate-500" />
                  <span className="text-xs font-medium text-slate-400">Microsoft 365</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-blue-400" />
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Sovereign Note</span>
                  </div>
                  <p className="text-[10px] text-blue-300 leading-relaxed">
                    All workspace data is processed locally within your private cloud. No data is shared with the LLM provider unless explicitly requested.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <ExternalLink className="w-3 h-3" />
            Manage OAuth Permissions
          </button>
        </div>
      </div>
    </div>
  );
};
