import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Circle, 
  Menu, 
  Square, 
  Clock, 
  Wifi, 
  Battery,
  ShieldCheck
} from 'lucide-react';
import { Tab } from '../../types';
import { GlassPanel } from './common/GlassPanel';
import { SystemTrayMenu } from './SystemTrayMenu';

interface TaskBarProps {
  tabs: Tab[];
  activeTabId: string | null;
  onTabSelect: (id: string | null) => void;
  onOpenStart: () => void;
  onOpenSystemTray: () => void;
  id?: string;
}

/**
 * FloorBar / TaskBar: The "Sovereign Strip" of the OS.
 * Handles primary navigation and application switching.
 */
export const TaskBar: React.FC<TaskBarProps> = ({ 
  tabs, 
  activeTabId, 
  onTabSelect, 
  onOpenStart,
  onOpenSystemTray,
  id 
}) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <GlassPanel 
      id={id}
      className="fixed bottom-0 left-0 right-0 h-14 flex items-center justify-between px-4 z-[100] border-t border-white/10"
      intensity="high"
    >
      {/* Start Button & Primary Navigation */}
      <div className="flex items-center gap-2">
        <button 
          onClick={onOpenStart}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 hover:bg-primary/20 transition-all group border border-primary/20"
        >
          <div className="relative">
            <div className="w-1.5 h-1.5 bg-primary rounded-full absolute -top-1 -right-1 group-hover:scale-150 transition-transform" />
            <Menu size={20} className="text-primary" />
          </div>
        </button>

        {/* Separator */}
        <div className="w-[1px] h-6 bg-white/10 mx-2" />

        {/* Active Tabs / Running Apps */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-[50vw]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabSelect(tab.id)}
              className={`
                h-10 px-3 flex items-center gap-2 rounded-lg transition-all border
                ${tab.id === activeTabId 
                  ? 'bg-white/10 border-white/20 text-white shadow-lg' 
                  : 'bg-transparent border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'}
              `}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${tab.id === activeTabId ? 'bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-gray-600'}`} />
              <span className="text-[10px] font-mono uppercase tracking-widest truncate max-w-[80px]">
                {tab.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* System Tray */}
      <div 
        className="flex items-center gap-4 text-gray-500 cursor-pointer hover:bg-white/5 px-2 py-1 rounded-xl transition-colors relative h-10"
        onClick={onOpenSystemTray}
      >
        <div className="hidden sm:flex items-center gap-3 pr-3 border-r border-white/10">
          <ShieldCheck size={14} className="text-emerald-500/60" />
          <Wifi size={14} />
          <Battery size={14} />
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-tighter">
            {time}
          </span>
          <span className="text-[8px] font-mono text-primary animate-pulse">
            ECO_PULSE_ACTIVE
          </span>
        </div>
      </div>
    </GlassPanel>
  );
};
