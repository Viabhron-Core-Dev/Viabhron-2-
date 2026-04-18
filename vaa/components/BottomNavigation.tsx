import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Search, 
  Share2, 
  Square, 
  MoreVertical, 
  Plus, 
  ChevronUp,
  MessageSquare,
  Zap,
  Layout,
  X,
  Shield,
  Component,
  Activity,
  Bug,
  Terminal as TerminalIcon
} from 'lucide-react';
import { Tab, TabType } from '../../src/types';

interface BottomNavigationProps {
  tabs: Tab[];
  activeTabId: string;
  isSidebarOpen: boolean;
  onTabSelect: (id: string) => void;
  onTabClose: (id: string) => void;
  onAddTab: (type?: TabType) => void;
  onToggleSidebar: () => void;
  onToggleUIMode: () => void;
  onOpenTabSwitcher: () => void;
  onOpenSystemMenu: () => void;
  onEditTab: (tab: Tab) => void;
  onShareTab: (tab: Tab) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  tabs, 
  activeTabId, 
  isSidebarOpen,
  onTabSelect, 
  onTabClose,
  onAddTab,
  onToggleSidebar,
  onToggleUIMode,
  onOpenTabSwitcher,
  onOpenSystemMenu,
  onEditTab,
  onShareTab
}) => {
  const activeTab = tabs.find(t => t.id === activeTabId);

  const getTabIcon = (type: TabType) => {
    switch (type) {
      case 'chat': return <MessageSquare className="w-3.5 h-3.5" />;
      case 'canvas': return <Zap className="w-3.5 h-3.5" />;
      case 'artifacts': return <Component className="w-3.5 h-3.5" />;
      case 'metrics': return <Activity className="w-3.5 h-3.5" />;
      case 'simulation': return <Bug className="w-3.5 h-3.5" />;
      case 'governance': return <Shield className="w-3.5 h-3.5" />;
      case 'sentinel': return <Shield className="w-3.5 h-3.5" />;
      case 'forge': return <Plus className="w-3.5 h-3.5" />;
      case 'agent_cli': return <TerminalIcon className="w-3.5 h-3.5" />;
      case 'discovery': return <Search className="w-3.5 h-3.5" />;
      case 'settings': return <Home className="w-3.5 h-3.5" />;
      default: return <Layout className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] flex flex-col pointer-events-none">
      {/* Tab Strip (Upper Row) - Thinner and Black */}
      <div className="flex items-center gap-2 px-3 py-1 pointer-events-auto bg-black/95 backdrop-blur-xl border-t border-white/5">
        <button 
          onClick={onToggleSidebar}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isSidebarOpen ? 'bg-blue-600 text-white' : 'bg-gray-900/80 border border-white/10 text-gray-500 hover:text-white'}`}
        >
          <ChevronUp className={`w-3.5 h-3.5 transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} />
        </button>

        <div className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {tabs.map(tab => (
            <motion.div
              key={tab.id}
              layoutId={`tab-${tab.id}`}
              className="relative group shrink-0"
            >
              <button
                onClick={() => onTabSelect(tab.id)}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-all relative shrink-0
                  ${tab.id === activeTabId 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 border border-white/20' 
                    : 'bg-gray-900/80 border border-white/10 text-gray-500 hover:text-gray-300'
                  }
                  ${tab.status === 'shelved' ? 'opacity-50 grayscale' : ''}
                `}
              >
                {getTabIcon(tab.type)}
                {tab.status === 'shelved' && (
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gray-400 rounded-full border border-gray-900" />
                )}
              </button>
              
              {tab.id === activeTabId && tabs.length > 1 && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabClose(tab.id);
                  }}
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gray-900 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors z-10"
                >
                  <X className="w-2 h-2" />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <button 
          onClick={() => onAddTab()}
          className="w-8 h-8 rounded-full bg-gray-900/80 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Toolbar (Lower Row) */}
      <div className="bg-gray-900/95 backdrop-blur-2xl border-t border-white/10 px-4 py-2 pointer-events-auto flex items-center gap-4">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onToggleUIMode}
          className="p-1.5 text-gray-500 hover:text-white transition-colors"
          title="Switch to VAA"
        >
          <Home className="w-4.5 h-4.5" />
        </motion.button>

        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 px-3 py-0.5 bg-white/5 rounded-full border border-white/5">
            <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Active</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => activeTab && onShareTab(activeTab)}
            className="p-1.5 text-gray-500 hover:text-white transition-colors"
          >
            <Share2 className="w-4.5 h-4.5" />
          </motion.button>
          
          <button 
            onClick={onOpenTabSwitcher}
            className="p-1.5 text-gray-500 hover:text-white transition-colors relative"
          >
            <Square className="w-4.5 h-4.5" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-bold text-white">
              {tabs.length}
            </span>
          </button>

          <button 
            onClick={onOpenSystemMenu}
            className="p-1.5 text-gray-500 hover:text-white transition-colors"
          >
            <MoreVertical className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
