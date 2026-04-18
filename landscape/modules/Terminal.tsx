import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Command } from 'lucide-react';

interface TerminalProps {
  onClose: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [logs, setLogs] = useState([
    { id: '1', type: 'system', content: 'Viabhron Terminal v1.0.4', timestamp: new Date() },
    { id: '2', type: 'system', content: 'Secure session established.', timestamp: new Date() }
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
    if (!input.trim()) return;

    setLogs(prev => [...prev, 
      { id: Date.now().toString(), type: 'command', content: input, timestamp: new Date() },
      { id: (Date.now() + 1).toString(), type: 'system', content: `Executing: ${input}...`, timestamp: new Date() }
    ]);
    setInput('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-24 right-4 w-[500px] h-[400px] bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl z-[150] overflow-hidden flex flex-col"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-xl">
            <TerminalIcon className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-xs font-bold text-white uppercase tracking-widest">Agent Terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-white transition-colors">
            <Minimize2 className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-red-400 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 font-mono text-[10px] space-y-2 no-scrollbar">
        {logs.map(log => (
          <div key={log.id} className="flex gap-3">
            <span className="text-gray-600 shrink-0">[{log.timestamp.toLocaleTimeString()}]</span>
            <span className={
              log.type === 'error' ? 'text-red-400' : 
              log.type === 'command' ? 'text-blue-400' : 
              'text-gray-300'
            }>
              {log.type === 'command' && <span className="mr-2 text-blue-500">$</span>}
              {log.content}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleExecute} className="p-4 bg-white/5 border-t border-white/5 flex items-center gap-3">
        <Command className="w-4 h-4 text-gray-500" />
        <input 
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command..."
          className="flex-1 bg-transparent border-none outline-none text-[10px] text-white font-mono placeholder:text-gray-700"
        />
      </form>
    </motion.div>
  );
};
