import React from 'react';
import { Plus, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Extension } from '../../../types';

interface SectionProps {
  title: string;
  icon: React.ElementType;
  items: Extension[];
  isCollapsed: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onAdd?: () => void;
}

export const SidebarSection: React.FC<SectionProps> = ({ title, icon: Icon, items, isCollapsed, isOpen, onToggle, onAdd }) => {
  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center gap-4 py-2">
        <div className="p-2 text-gray-500" title={title}>
          <Icon className="w-5 h-5" />
        </div>
        {items.map(item => (
          <div 
            key={item.id} 
            className="p-2 rounded-md hover:bg-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
            title={item.name}
          >
            <item.icon className="w-4 h-4" />
          </div>
        ))}
        {onAdd && (
          <button 
            onClick={onAdd}
            className="p-2 rounded-md hover:bg-white/5 text-gray-500 hover:text-white transition-all cursor-pointer"
            title={`Add ${title}`}
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between px-2 py-2 text-gray-500 hover:text-gray-300 transition-colors group"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">{title}</span>
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
            {items.map((item) => (
              <div
                key={item.id}
                className="group flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5 cursor-pointer transition-all"
              >
                <div className={`p-1.5 rounded bg-gray-800/50 text-gray-400 group-hover:text-blue-400 transition-colors`}>
                  <item.icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-300 truncate">{item.name}</div>
                  <div className="text-[9px] text-gray-500 flex items-center gap-1">
                    <div className={`w-1 h-1 rounded-full ${item.status === 'active' ? 'bg-green-500' : 'bg-gray-600'}`} />
                    {item.status}
                  </div>
                </div>
              </div>
            ))}
            {onAdd && (
              <button 
                onClick={onAdd}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-[10px] text-gray-500 hover:text-gray-300 transition-colors"
              >
                <Plus className="w-3 h-3" />
                Add Extension
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
