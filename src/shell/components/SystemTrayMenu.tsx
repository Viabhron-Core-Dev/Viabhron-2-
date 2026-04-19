import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  FolderOpen, 
  Terminal, 
  Settings, 
  Cpu, 
  ShieldCheck,
  X
} from 'lucide-react';
import { GlassPanel } from './common/GlassPanel';

interface SystemTrayMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModule: (type: string, title: string) => void;
}

export const SystemTrayMenu: React.FC<SystemTrayMenuProps> = ({ 
  isOpen, 
  onClose, 
  onOpenModule 
}) => {
  const menuItems = [
    { 
      id: 'metrics', 
      label: 'Pulse Monitor', 
      icon: <Activity size={16} />, 
      color: 'text-primary',
      type: 'metrics',
      title: 'System Metrics'
    },
    { 
      id: 'artifacts', 
      label: 'File Explorer', 
      icon: <FolderOpen size={16} />, 
      color: 'text-indigo-400',
      type: 'artifacts',
      title: 'Artifacts Vault'
    },
    { 
      id: 'cli', 
      label: 'Terminal (CLI)', 
      icon: <Terminal size={16} />, 
      color: 'text-emerald-400',
      type: 'agent_cli',
      title: 'Agent CLI'
    },
    { 
      id: 'task', 
      label: 'Task Manager', 
      icon: <Cpu size={16} />, 
      color: 'text-amber-400',
      type: 'loader', // Linked to Moss Loader/Task Manager
      title: 'Task Manager'
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for closing */}
          <div 
            className="fixed inset-0 z-[350] bg-transparent" 
            onClick={onClose} 
          />
          
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 right-4 z-[400] w-64"
          >
            <GlassPanel intensity="high" className="rounded-2xl border border-white/10 shadow-2xl p-2 flex flex-col gap-1">
              <div className="px-3 py-2 flex items-center justify-between border-b border-white/5 mb-1">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">System_Hub</span>
                <ShieldCheck size={12} className="text-emerald-500/60" />
              </div>

              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onOpenModule(item.type, item.title);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className={`${item.color} group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <span className="text-xs font-sans text-gray-300 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </button>
              ))}

              <div className="h-[1px] bg-white/5 my-1" />
              
              <button
                onClick={() => {
                  onOpenModule('settings', 'System Settings');
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="text-gray-500 group-hover:text-white transition-colors">
                  <Settings size={16} />
                </div>
                <span className="text-xs font-sans text-gray-500 group-hover:text-white transition-colors">
                  Shell Settings
                </span>
              </button>
            </GlassPanel>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
