import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tab, TabType } from '../types';
import { TaskBar } from './components/TaskBar';
import { CanopyMenu } from './components/CanopyMenu';
import { DesktopStage } from './components/DesktopStage';
import { WorkstationStage } from './components/WorkstationStage';
import { SystemTrayMenu } from './components/SystemTrayMenu';

interface SovereignShellProps {
  tabs: Tab[];
  activeTabId: string | null;
  onTabSelect: (id: string | null) => void;
  onAddTab: (type: TabType, title: string) => void;
  onCloseTab: (id: string) => void;
  onMinimizeTab: (id: string) => void;
  renderModule: (tab: Tab) => React.ReactNode;
}

/**
 * SovereignShell: The top-level orchestrator for the Viabhron Expert Mode.
 * Manages the transition between the desktop home and active application workbenches.
 */
export const SovereignShell: React.FC<SovereignShellProps> = ({
  tabs,
  activeTabId,
  onTabSelect,
  onAddTab,
  onCloseTab,
  onMinimizeTab,
  renderModule
}) => {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isSystemTrayOpen, setIsSystemTrayOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const activeTab = tabs.find(t => t.id === activeTabId);

  const handleOpenModule = (type: string, title: string) => {
    onAddTab(type as TabType, title);
    setIsStartOpen(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-black text-white font-sans selection:bg-primary/30">
      
      {/* Main OS Layer */}
      <div className={`flex-1 flex flex-col overflow-hidden ${isFocusMode ? 'pb-0' : 'pb-14'}`}>
        <AnimatePresence mode="wait">
          {!activeTab ? (
            <motion.div
              key="desktop"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <DesktopStage onOpenModule={handleOpenModule} />
            </motion.div>
          ) : (
            <motion.div
              key="workstation"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <WorkstationStage 
                activeTab={activeTab} 
                onCloseTab={onCloseTab}
                onMinimize={onMinimizeTab}
                onMaximize={() => setIsFocusMode(!isFocusMode)}
                onBackToDesktop={() => onTabSelect(null)}
              >
                {renderModule(activeTab)}
              </WorkstationStage>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* TaskBar Layer */}
      {!isFocusMode && (
        <TaskBar 
          tabs={tabs} 
          activeTabId={activeTabId} 
          onTabSelect={(id) => {
            onTabSelect(id);
            if (isFocusMode) setIsFocusMode(false);
          }} 
          onOpenStart={() => {
            setIsStartOpen(!isStartOpen);
            setIsSystemTrayOpen(false);
          }} 
          onOpenSystemTray={() => {
            setIsSystemTrayOpen(!isSystemTrayOpen);
            setIsStartOpen(false);
          }}
        />
      )}

      {/* Overlays */}
      <CanopyMenu 
        isOpen={isStartOpen} 
        onClose={() => setIsStartOpen(false)} 
        onOpenModule={handleOpenModule}
      />

      <SystemTrayMenu 
        isOpen={isSystemTrayOpen} 
        onClose={() => setIsSystemTrayOpen(false)} 
        onOpenModule={handleOpenModule}
      />

      {/* Interaction Ripple Layer (Optional, for tactile feel) */}
      <div className="fixed inset-0 pointer-events-none z-[300] bg-gradient-to-tr from-white/5 to-transparent opacity-20" />
    </div>
  );
};
