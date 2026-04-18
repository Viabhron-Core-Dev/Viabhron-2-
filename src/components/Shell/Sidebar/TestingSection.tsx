import React from 'react';
import { FlaskConical, ChevronDown, ChevronRight, Code, Monitor, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TestingSectionProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const TestingSection: React.FC<TestingSectionProps> = ({
  isOpen,
  onToggle
}) => {
  return (
    <div className="space-y-1">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between px-2 py-2 text-gray-500 hover:text-gray-300 transition-colors group"
      >
        <div className="flex items-center gap-2">
          <FlaskConical className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Testing & Debugging</span>
        </div>
        {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-0.5 ml-2 border-l border-white/5 pl-2"
          >
            <div className="group flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5 transition-all">
              <div className="p-1.5 rounded bg-gray-800/50 text-orange-400">
                <Code className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate text-gray-200">
                  Sovereign Script (SS)
                </div>
                <div className="text-[8px] text-gray-600 uppercase tracking-tighter">
                  DSL Testing • Debug Mode
                </div>
              </div>
              <div className="px-1.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-[8px] text-orange-400 font-bold uppercase">
                Beta
              </div>
            </div>
            <div className="group flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5 transition-all">
              <div className="p-1.5 rounded bg-gray-800/50 text-purple-400">
                <Monitor className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate text-gray-200">
                  SS-Studio (Forge IDE)
                </div>
                <div className="text-[8px] text-gray-600 uppercase tracking-tighter">
                  Intent-Based IDE • Manifest Editor
                </div>
              </div>
              <div className="px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[8px] text-purple-400 font-bold uppercase">
                Alpha
              </div>
            </div>
            <div className="group flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5 transition-all">
              <div className="p-1.5 rounded bg-gray-800/50 text-green-400">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate text-gray-200">
                  Deep Execution
                </div>
                <div className="text-[8px] text-gray-600 uppercase tracking-tighter">
                  Goose-Substrate • Shell Sandbox
                </div>
              </div>
              <div className="px-1.5 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-[8px] text-green-400 font-bold uppercase">
                Beta
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
