import React from 'react';
import { motion } from 'motion/react';
import { 
  Bot, 
  FlaskConical, 
  FileText, 
  Activity, 
  Terminal, 
  Layers,
  Search,
  Plus
} from 'lucide-react';
import { Atmosphere } from './common/Atmosphere';

interface DesktopShortcutProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color: string;
}

const DesktopShortcut: React.FC<DesktopShortcutProps> = ({ icon, label, onClick, color }) => (
  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-colors group w-20"
  >
    <div className={`p-4 rounded-2xl bg-slate-900 border border-white/5 shadow-2xl relative group-hover:border-${color}/40 transition-colors`}>
      <div className={`absolute inset-0 bg-${color}/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`} />
      <div className={`text-${color} relative z-10`}>
        {icon}
      </div>
    </div>
    <span className="text-[10px] font-mono text-gray-400 text-center uppercase tracking-widest px-1 truncate w-full">
      {label}
    </span>
  </motion.button>
);

interface DesktopStageProps {
  onOpenModule: (type: string, title: string) => void;
  id?: string;
}

/**
 * DesktopStage: The main workspace for the Sovereign OS "Expert Mode".
 * Renders the background, shortcut grid, and top status area.
 */
export const DesktopStage: React.FC<DesktopStageProps> = ({ onOpenModule, id }) => {
  const shortcuts = [
    { id: 'forge', label: 'Forge', icon: <Bot size={24} />, color: 'primary', type: 'forge', title: 'Agent Forge' },
    { id: 'workflow', label: 'Lab', icon: <FlaskConical size={24} />, color: 'pink-500', type: 'simulation', title: 'Workflow Lab' },
    { id: 'sops', label: 'SOPs', icon: <FileText size={24} />, color: 'emerald-500', type: 'sops', title: 'SOP Registry' },
    { id: 'nexus', label: 'Nexus', icon: <Layers size={24} />, color: 'indigo-500', type: 'nexus', title: 'Viabhron Nexus' },
    { id: 'metrics', label: 'Metrics', icon: <Activity size={24} />, color: 'red-500', type: 'metrics', title: 'System Metrics' },
    { id: 'cli', label: 'Terminal', icon: <Terminal size={24} />, color: 'emerald-400', type: 'agent_cli', title: 'Agent CLI' },
  ];

  return (
    <div id={id} className="relative flex-1 flex flex-col overflow-hidden">
      <Atmosphere variant="forest" />
      
      {/* Top Header Portal Trigger Area */}
      <div className="h-16 flex items-center justify-between px-6 bg-gradient-to-b from-black/40 to-transparent relative z-10">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-primary font-bold tracking-[0.2em] uppercase">Viabhron Sovereign</span>
          <span className="text-xl font-sans font-bold text-white tracking-tight">Expert_Shell_v2</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-white/5 rounded-full text-gray-400 transition-colors">
            <Search size={18} />
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10" />
        </div>
      </div>

      {/* Main Desktop Canvas */}
      <div className="flex-1 p-6 relative z-10 overflow-y-auto custom-scrollbar overscroll-contain touch-pan-y">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-y-8 gap-x-4">
          {shortcuts.map((shortcut) => (
            <DesktopShortcut 
              key={shortcut.id}
              icon={shortcut.icon}
              label={shortcut.label}
              color={shortcut.color}
              onClick={() => onOpenModule(shortcut.type, shortcut.title)}
            />
          ))}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-colors group w-20"
          >
            <div className="p-4 rounded-2xl bg-black/40 border border-dashed border-white/10 transition-colors">
              <Plus size={24} className="text-gray-600" />
            </div>
            <span className="text-[10px] font-mono text-gray-600 text-center uppercase tracking-widest px-1">
              Add Item
            </span>
          </motion.button>
        </div>
      </div>

      {/* Decorative Branding */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
        <h1 className="text-[20vw] font-sans font-black uppercase tracking-tighter leading-none">Viabhron</h1>
      </div>
    </div>
  );
};
