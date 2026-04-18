import React, { useState } from 'react';
import { 
  Play, 
  Square, 
  Bug, 
  Zap, 
  Terminal as TerminalIcon, 
  Component,
  UserPlus,
  MessageSquare,
  ShieldAlert,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UIMode } from '@/src/types';

interface SimulationAgent {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'running' | 'error';
  logs: string[];
}

export function Simulation({ uiMode }: { uiMode?: UIMode }) {
  const [isRunning, setIsRunning] = useState(false);
  const [agents] = useState<SimulationAgent[]>([
    { id: 'sa1', name: 'UI Critic', role: 'Design Auditor', status: 'idle', logs: [] },
    { id: 'sa2', name: 'Logic Probe', role: 'Security Tester', status: 'idle', logs: [] },
  ]);
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);

  const startSimulation = () => {
    setIsRunning(true);
  };

  const stopSimulation = () => {
    setIsRunning(false);
  };

  return (
    <div className={`h-full flex flex-col bg-gray-950 overflow-hidden ${uiMode === 'browser' ? 'pb-32 md:pb-0' : ''}`}>
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-gray-900/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-600/20 flex items-center justify-center">
            <Bug className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-tight">Simulation Engine</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Developer Debugging Suite</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={isRunning ? stopSimulation : startSimulation}
            className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${isRunning ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'}`}
          >
            {isRunning ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isRunning ? 'Stop Simulation' : 'Run Simulation'}
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Agent List */}
        <aside className="w-64 border-r border-white/5 bg-gray-900/30 overflow-y-auto no-scrollbar">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Test Agents</h3>
              <button className="text-gray-600 hover:text-purple-400">
                <UserPlus className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {agents.map((agent) => (
                <button 
                  key={agent.id}
                  onClick={() => setActiveAgentId(agent.id)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all group ${activeAgentId === agent.id ? 'bg-purple-600/10 border-purple-500/30' : 'bg-gray-950/50 border-white/5 hover:border-white/10'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'running' ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${activeAgentId === agent.id ? 'text-purple-400' : 'text-gray-500'}`}>
                      {agent.role}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-gray-200 group-hover:text-white truncate">{agent.name}</div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Simulation Console */}
        <main className="flex-1 bg-gray-950 flex flex-col overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto no-scrollbar space-y-4">
            {activeAgentId ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-tight">
                        {agents.find(a => a.id === activeAgentId)?.name}
                      </h3>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">Agent Activity Log</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/5 rounded-xl text-gray-500">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-gray-900 rounded-3xl border border-white/5 p-4 font-mono text-[11px] text-gray-400 space-y-1 min-h-[300px]">
                  <div className="flex gap-3">
                    <span className="text-gray-600 shrink-0">1</span>
                    <span>[10:45:00] Simulation environment initialized.</span>
                  </div>
                  {isRunning && (
                    <div className="flex gap-3 animate-pulse text-purple-400">
                      <span className="text-gray-600 shrink-0">2</span>
                      <span>Agent is processing system state...</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-tight">Select an Agent</h3>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Select a test agent to view its simulation logs and system interactions.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-white/5 bg-gray-900/30 flex items-center gap-4">
            <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-2xl text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2">
              <TerminalIcon className="w-4 h-4" />
              Inject Log
            </button>
            <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-2xl text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2">
              <Component className="w-4 h-4" />
              Push Artifact
            </button>
            <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-2xl text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              Trigger Gate
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
