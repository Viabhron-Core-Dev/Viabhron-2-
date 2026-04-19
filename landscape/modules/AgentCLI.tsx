import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { UIMode } from '../../src/types';
import { 
  Terminal as TerminalIcon, 
  Play, 
  Trash2, 
  Cpu, 
  Network, 
  Shield,
  Bot,
  Command
} from 'lucide-react';

interface LogEntry {
  id: string;
  type: 'command' | 'output' | 'error' | 'system';
  content: string;
  timestamp: Date;
  agent?: string;
}

interface AgentCLIProps {
  isLockdown?: boolean;
  checkSovereignProcedures?: (action: string, metadata?: any) => { allowed: boolean; message?: string };
  uiMode?: UIMode;
}

export const AgentCLI: React.FC<AgentCLIProps> = ({ isLockdown, checkSovereignProcedures, uiMode }) => {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', type: 'system', content: 'Viabhron Agent Execution Environment (v1.0.4) initialized.', timestamp: new Date() },
    { id: '2', type: 'system', content: 'Connected to Cloud Run Office (us-central1).', timestamp: new Date() },
    { id: '3', type: 'command', content: 'npm run test:governance', timestamp: new Date(), agent: 'Architect' },
    { id: '4', type: 'output', content: 'Running 9,500 tests across 5 languages...', timestamp: new Date() },
    { id: '5', type: 'output', content: 'All tests passed. Compliance score: 100%.', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLockdown) return;

    const command = input;
    
    if (checkSovereignProcedures) {
      const check = checkSovereignProcedures(`Execute CLI command: ${command}`, { type: 'cli' });
      if (!check.allowed) {
        setLogs(prev => [...prev, {
          id: Date.now().toString(),
          type: 'error',
          content: check.message || 'Command blocked by Sovereign Procedure.',
          timestamp: new Date()
        }]);
        setInput('');
        return;
      }
    }

    const newLog: LogEntry = {
      id: Date.now().toString(),
      type: 'command',
      content: command,
      timestamp: new Date(),
      agent: 'User'
    };

    setLogs(prev => [...prev, newLog]);
    setInput('');

    // Simulate agent response
    setTimeout(() => {
      setLogs(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: `Executing: ${input}...`,
        timestamp: new Date()
      }]);
    }, 500);
  };

  return (
    <div className={`h-full bg-[#050508] flex flex-col font-mono ${uiMode === 'browser' ? 'pb-32 md:pb-0' : ''}`}>
      {/* Header HUD */}
      <div className="h-14 bg-gray-900/50 border-b border-white/5 flex items-center justify-between px-6 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-widest">Agent CLI</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3 h-3" />
              <span>4 vCPU</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Network className="w-3 h-3" />
              <span>1.2 Gbps</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setLogs([])}
            disabled={isLockdown}
            className={`p-2 text-gray-500 hover:text-red-400 transition-colors ${isLockdown ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Clear Logs"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button 
            disabled={isLockdown}
            className={`flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 ${isLockdown ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Play className="w-3.5 h-3.5" />
            Force Sync
          </button>
        </div>
      </div>

      {/* Terminal Output */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-3 no-scrollbar"
      >
        {logs.map((log) => (
          <div key={log.id} className="flex gap-4 group">
            <div className="text-[10px] text-gray-700 w-16 shrink-0 pt-1">
              {log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="flex-1 min-w-0">
              {log.type === 'command' ? (
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 font-bold">❯</span>
                  <span className="text-white font-bold">{log.content}</span>
                  {log.agent && (
                    <span className="text-[8px] px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20 uppercase font-bold">
                      {log.agent}
                    </span>
                  )}
                </div>
              ) : log.type === 'error' ? (
                <div className="text-red-400 flex gap-2">
                  <span className="font-bold">!</span>
                  <span>{log.content}</span>
                </div>
              ) : log.type === 'system' ? (
                <div className="text-gray-500 italic text-[11px]">
                  {log.content}
                </div>
              ) : (
                <div className="text-gray-400 leading-relaxed whitespace-pre-wrap">
                  {log.content}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form 
        onSubmit={handleExecute}
        className={`p-4 bg-gray-900/50 border-t border-white/5 flex items-center gap-3 ${isLockdown ? 'opacity-50' : ''}`}
      >
        <div className={`p-2 bg-white/5 rounded-lg ${isLockdown ? 'text-red-500' : 'text-blue-500'}`}>
          <Command className="w-4 h-4" />
        </div>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLockdown}
          placeholder={isLockdown ? "COMMANDS BLOCKED BY LOCKDOWN..." : "Enter command for agent cluster..."}
          className={`flex-1 bg-transparent border-none text-sm ${isLockdown ? 'text-red-500 placeholder:text-red-900' : 'text-white placeholder:text-gray-700'} focus:outline-none`}
        />
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
          <Bot className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Architect</span>
        </div>
      </form>
    </div>
  );
};
