import React from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Maximize2, 
  Minus, 
  ChevronLeft,
  Layout
} from 'lucide-react';
import { Tab } from '../../types';

interface WorkstationStageProps {
  activeTab: Tab | null;
  onCloseTab: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onBackToDesktop: () => void;
  children: React.ReactNode;
  id?: string;
}

/**
 * WorkstationStage: The container for active modules in Expert Mode.
 * Provides the "Chrome" for the application workstation.
 */
export const WorkstationStage: React.FC<WorkstationStageProps> = ({ 
  activeTab, 
  onCloseTab, 
  onMinimize,
  onMaximize,
  onBackToDesktop,
  children,
  id
}) => {
  if (!activeTab) return null;

  return (
    <div id={id} className="flex-1 flex flex-col overflow-hidden bg-[#020202]">
      {/* Module Title Bar */}
      <div className="h-12 flex items-center justify-between px-4 bg-slate-950/80 border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBackToDesktop}
            className="p-1 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${activeTab.status === 'active' ? 'bg-emerald-500' : 'bg-gray-600'}`} />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-300">
              {activeTab.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={() => onMinimize(activeTab.id)}
            className="p-2 hover:bg-white/5 rounded text-gray-500 hover:text-gray-300 transition-colors"
          >
            <Minus size={14} />
          </button>
          <button 
            onClick={() => onMaximize(activeTab.id)}
            className="p-2 hover:bg-white/5 rounded text-gray-500 hover:text-gray-300 transition-colors"
          >
            <Maximize2 size={14} />
          </button>
          <button 
            onClick={() => onCloseTab(activeTab.id)}
            className="p-2 hover:bg-red-500/10 rounded text-gray-500 hover:text-red-400 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Module Navigation / Secondary Toolbar (Optional) */}
      <div className="h-10 flex items-center px-4 bg-slate-900/40 border-b border-white/5 gap-4">
        <div className="text-[10px] font-mono text-gray-500 flex items-center gap-2">
          <Layout size={12} />
          <span>SHELL.WS.{(activeTab.type || 'unknown').toString().toUpperCase()}</span>
        </div>
        <div className="flex-1" />
        <div className="text-[9px] font-mono text-primary/60 tracking-widest">
          SECURE_ENCLAVE_READY
        </div>
      </div>

      {/* Main Content Stage */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-[#020202]">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="min-h-full w-full"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
