import React from 'react';
import { Layout, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Moss } from '../../../types';
import * as Icons from 'lucide-react';

interface MossSectionProps {
  moss: Moss[];
  onToggleMoss: (id: string) => void;
  onOpenStore: () => void;
  onOpenLoader: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const MossSection: React.FC<MossSectionProps> = ({
  moss,
  onToggleMoss,
  onOpenStore,
  onOpenLoader,
  isOpen,
  onToggle
}) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-2 py-2 text-gray-500 hover:text-gray-300 transition-colors group">
        <button 
          onClick={onOpenLoader}
          className="flex items-center gap-2 flex-1 text-left"
        >
          <Layout className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Viabhronic Loader</span>
        </button>
        <button onClick={onToggle}>
          {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        </button>
      </div>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-0.5 ml-2 border-l border-white/5 pl-2"
          >
            {moss.map((app) => {
              const Icon = (Icons as any)[app.icon] || Layout;
              return (
                <div
                  key={app.id}
                  className="group flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5 transition-all"
                >
                  <div className={`p-1.5 rounded bg-gray-800/50 ${app.enabled ? 'text-blue-400' : 'text-gray-500'} transition-colors`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-medium truncate ${app.enabled ? 'text-gray-200' : 'text-gray-500'}`}>
                      {app.name}
                    </div>
                    <div className="text-[8px] text-gray-600 uppercase tracking-tighter">
                      {app.type} • {app.category}
                    </div>
                  </div>
                  <button
                    onClick={() => onToggleMoss(app.id)}
                    className={`
                      w-7 h-4 rounded-full relative transition-all duration-200
                      ${app.enabled ? 'bg-blue-600' : 'bg-gray-700'}
                    `}
                  >
                    <div className={`
                      absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-200
                      ${app.enabled ? 'left-3.5' : 'left-0.5'}
                    `} />
                  </button>
                </div>
              );
            })}
            <button 
              onClick={onOpenStore}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-[10px] text-gray-500 hover:text-gray-300 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Moss-App
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
