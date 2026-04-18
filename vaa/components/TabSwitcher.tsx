import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Plus, 
  MessageSquare, 
  Zap, 
  Search, 
  Layout, 
  Settings,
  Moon,
  Trash2
} from 'lucide-react';
import { Tab, TabType } from '../../src/types';

interface TabSwitcherProps {
  tabs: Tab[];
  activeTabId: string;
  onTabSelect: (id: string) => void;
  onTabClose: (id: string) => void;
  onAddTab: (type?: TabType) => void;
  onClose: () => void;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({ 
  tabs, 
  activeTabId, 
  onTabSelect, 
  onTabClose, 
  onAddTab, 
  onClose 
}) => {
  const getTabIcon = (type: TabType) => {
    switch (type) {
      case 'chat': return <MessageSquare className="w-5 h-5 text-blue-400" />;
      case 'canvas': return <Zap className="w-5 h-5 text-cyan-400" />;
      case 'discovery': return <Search className="w-5 h-5 text-purple-400" />;
      case 'settings': return <Settings className="w-5 h-5 text-gray-400" />;
      default: return <Layout className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-[200] bg-[#050508] flex flex-col"
    >
      {/* Header */}
      <div className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-gray-900/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
            {tabs.length}
          </div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white">Open Sessions</h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onAddTab()}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button 
            onClick={onClose}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {tabs.map(tab => (
            <motion.div
              key={tab.id}
              layoutId={`tab-card-${tab.id}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                aspect-[3/4] bg-gray-900 rounded-3xl border overflow-hidden flex flex-col relative group
                ${tab.id === activeTabId ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'border-white/10'}
                ${tab.status === 'shelved' ? 'opacity-60 grayscale' : ''}
              `}
            >
              {/* Card Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-gray-950/50">
                <div className="flex items-center gap-2 min-w-0">
                  {getTabIcon(tab.type)}
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider truncate">{tab.title}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabClose(tab.id);
                  }}
                  className="p-1.5 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-lg text-gray-500 transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Thumbnail Content */}
              <div 
                onClick={() => {
                  onTabSelect(tab.id);
                  onClose();
                }}
                className="flex-1 bg-[#050508] p-4 flex flex-col items-center justify-center cursor-pointer relative"
              >
                {tab.status === 'shelved' && (
                  <div className="absolute inset-0 bg-gray-950/40 flex flex-col items-center justify-center gap-2 z-10">
                    <Moon className="w-8 h-8 text-gray-600" />
                    <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Shelved</span>
                  </div>
                )}
                
                {/* Mock Visual Content */}
                <div className="w-full h-full opacity-20 flex flex-col gap-2">
                  <div className="h-2 w-3/4 bg-gray-800 rounded-full" />
                  <div className="h-2 w-1/2 bg-gray-800 rounded-full" />
                  <div className="flex-1 border border-dashed border-gray-800 rounded-xl" />
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-3 bg-gray-950/80 border-t border-white/5 flex items-center justify-between">
                <span className="text-[8px] text-gray-600 font-mono uppercase tracking-tighter">
                  {tab.type} / {tab.status}
                </span>
                {tab.status === 'active' && (
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                )}
              </div>
            </motion.div>
          ))}

          {/* Add New Tab Card */}
          <button
            onClick={() => onAddTab()}
            className="aspect-[3/4] bg-gray-950 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-3 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-all">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-white">New Session</span>
          </button>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-white/10 bg-gray-900/50 flex items-center justify-center gap-4">
        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-gray-400 transition-all">
          <Trash2 className="w-4 h-4" />
          Close All
        </button>
      </div>
    </motion.div>
  );
};
