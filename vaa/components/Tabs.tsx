import React from 'react';
import { Plus, X, MessageSquare, Zap, Search, Settings, Layout, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tab, TabType } from '../../src/types';

interface TabsProps {
  tabs: Tab[];
  activeTabId: string;
  onAddTab: () => void;
  onCloseTab: (id: string) => void;
  onSwitchTab: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTabId, onAddTab, onCloseTab, onSwitchTab }) => {
  const getTabIcon = (type: TabType) => {
    switch (type) {
      case 'chat': return <MessageSquare className="w-3 h-3" />;
      case 'canvas': return <Zap className="w-3 h-3" />;
      case 'discovery': return <Search className="w-3 h-3" />;
      case 'settings': return <Settings className="w-3 h-3" />;
      case 'store': return <Globe className="w-3 h-3" />;
      default: return <Layout className="w-3 h-3" />;
    }
  };

  return (
    <div className="flex items-end bg-gray-950 px-2 h-10 select-none overflow-hidden border-b border-white/5">
      <div className="flex items-end gap-0 overflow-x-auto no-scrollbar flex-1 h-full pt-1.5">
        <AnimatePresence mode="popLayout">
          {tabs.map((tab) => (
            <motion.div
              key={tab.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => onSwitchTab(tab.id)}
              className={`
                group relative flex items-center gap-2 px-4 py-2 min-w-[140px] max-w-[220px] 
                text-[11px] font-medium cursor-pointer transition-all duration-200 h-[34px]
                ${tab.id === activeTabId 
                  ? 'bg-gray-900 text-white rounded-t-xl z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.3)]' 
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 rounded-t-lg mx-0.5'}
              `}
            >
              {/* Slanted edge effect for active tab */}
              {tab.id === activeTabId && (
                <>
                  <div className="absolute -left-2 bottom-0 w-2 h-2 bg-gray-900 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-950 rounded-br-full" />
                  </div>
                  <div className="absolute -right-2 bottom-0 w-2 h-2 bg-gray-900 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-950 rounded-bl-full" />
                  </div>
                </>
              )}

              <span className={`shrink-0 ${tab.id === activeTabId ? 'text-blue-400' : 'text-gray-600'}`}>
                {getTabIcon(tab.type)}
              </span>
              <span className="truncate flex-1">{tab.title}</span>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tab.id);
                }}
                className={`
                  p-0.5 rounded-md transition-all
                  ${tab.id === activeTabId 
                    ? 'opacity-100 hover:bg-white/10 text-gray-400 hover:text-white' 
                    : 'opacity-0 group-hover:opacity-100 text-gray-600 hover:text-white hover:bg-white/10'}
                `}
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex items-center h-full px-2">
        <button
          onClick={onAddTab}
          className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition-all"
          title="New Tab"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
