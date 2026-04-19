import React, { useState, useEffect, useRef } from 'react';
import { VaaClient } from '../vaa/VaaClient';
import { INITIAL_EXTENSIONS } from '../extensions/registry';
import { Agent, Extension, Moss, Secret, UIMode, SystemMode, SecurityRule, EfficiencyPatch, Client, TabType } from './types';
import { useAuth } from './hooks/useAuth';
import { useTabs } from './hooks/useTabs';
import { Sidebar } from '../vaa/components/Sidebar';
import { Tabs } from '../vaa/components/Tabs';
import { TabSwitcher } from '../vaa/components/TabSwitcher';
import { AnimatePresence, motion } from 'motion/react';
import { Toaster, toast } from 'sonner';

// Import Landscape Modules
import { Nexus } from '../landscape/modules/Nexus';
import { Terminal } from '../landscape/modules/Terminal';
import { Artifacts } from '../landscape/modules/Artifacts';
import { SystemMetrics } from '../landscape/modules/SystemMetrics';
import { Simulation } from '../landscape/modules/Simulation';
import { Governance } from '../landscape/modules/Governance';
import { Forge } from '../landscape/modules/Forge';
import { AgentCLI } from '../landscape/modules/AgentCLI';
import { Sentinel } from '../landscape/modules/Sentinel';
import { Symphony } from '../landscape/modules/Symphony';
import { Creative } from '../landscape/modules/Creative';
import { SoundForge } from '../landscape/modules/SoundForge';
import { ImageStudio } from '../landscape/modules/ImageStudio';
import { VideoSuite } from '../landscape/modules/VideoSuite';
import { MossSystem } from '../landscape/modules/MossSystem';
import { ExtensionStore } from '../landscape/modules/ExtensionStore';
import { Canvas } from '../landscape/modules/Canvas';

const App: React.FC = () => {
  const { user, isAuthReady, login, logout } = useAuth();
  const [extensions, setExtensions] = useState<Extension[]>(INITIAL_EXTENSIONS);
  
  const { 
    tabs, 
    activeTabId, 
    setActiveTabId, 
    handleAddTab, 
    handleCloseTab, 
    handleWakeTab, 
    handleShelveTab 
  } = useTabs(user, extensions);

  // --- Global State ---
  const [uiMode, setUiMode] = useState<UIMode>('vaa');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isTabSwitcherOpen, setIsTabSwitcherOpen] = useState(false);
  const [systemMode, setSystemMode] = useState<SystemMode>('eco');
  
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 'cloud-manager',
      name: 'Cloud Manager',
      description: 'Primary Sovereign Kernel Manager.',
      role: 'head',
      provider: 'gemini',
      model: 'gemini-2.0-flash',
      status: 'active',
      isAnchor: true,
      isResident: true,
      color: '#3B82F6',
      capabilities: ['orchestration', 'resource-management'],
      systemInstruction: 'You are the primary Sovereign Kernel Manager of Viabhron.',
      lastActive: new Date()
    }
  ]);

  const [moss, setMoss] = useState<Moss[]>([
    {
      id: 'ma-pulse',
      name: 'Pulse Monitor',
      description: 'Metabolic & Security Monitoring',
      icon: 'Activity',
      enabled: true,
      type: 'sovereign',
      category: 'core',
      status: 'active'
    },
    {
      id: 'ma-scribe',
      name: 'The Scribe',
      description: 'Linguistic Engineering & Documentation',
      icon: 'FileText',
      enabled: true,
      type: 'sovereign',
      category: 'intelligence',
      status: 'active'
    },
    {
      id: 'ma-gatekeeper',
      name: 'The Gatekeeper',
      description: 'Compliance & Safety Sentinel',
      icon: 'Shield',
      enabled: true,
      type: 'sovereign',
      category: 'security',
      status: 'active'
    },
    {
      id: 'hatchery',
      name: 'Hatchery',
      description: 'Agent Onboarding & Development',
      icon: 'Egg',
      enabled: true,
      type: 'sovereign',
      category: 'forge',
      status: 'active'
    }
  ]);
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [securityRules, setSecurityRules] = useState<SecurityRule[]>([]);
  const [efficiencyPatches, setEfficiencyPatches] = useState<EfficiencyPatch[]>([]);

  // --- Toggling Logic ---
  useEffect(() => {
    const handleToggleUI = () => {
      setUiMode(prev => {
        const next = prev === 'vaa' ? 'browser' : 'vaa';
        // Auto-switch tabs if needed
        if (next === 'vaa') {
          // Find or create VAA tab if in browser? Actually just switch mode.
        } else if (next === 'browser' && tabs.length > 0) {
          // If first tab is VhatsAppening, maybe switch to something else?
          const currentTab = tabs.find(t => t.id === activeTabId);
          if (currentTab?.type === 'vhatsappening') {
            const other = tabs.find(t => t.type !== 'vhatsappening');
            if (other) setActiveTabId(other.id);
            else handleAddTab('nexus', 'Viabhron Nexus');
          }
        }
        return next;
      });
    };

    window.addEventListener('viabhron:toggle-ui', handleToggleUI);
    return () => window.removeEventListener('viabhron:toggle-ui', handleToggleUI);
  }, [tabs, activeTabId]);

  // --- Handlers ---
  const handleCreateAgent = (newAgent: Partial<Agent>) => {
    const agent: Agent = {
      id: `agent-${Date.now()}`,
      name: newAgent.name || 'New Agent',
      description: newAgent.description || '',
      role: newAgent.role || 'contractor',
      provider: newAgent.provider || 'gemini',
      model: newAgent.model || 'gemini-2.0-flash',
      status: 'active',
      color: newAgent.color || '#6366F1',
      systemInstruction: newAgent.systemInstruction || '',
      capabilities: newAgent.capabilities || [],
      activeExtensionIds: [],
      lastActive: new Date()
    };
    setAgents(prev => [...prev, agent]);
  };

  const handleToggleMoss = (id: string) => {
    setMoss(prev => prev.map(app => 
      app.id === id ? { ...app, enabled: !app.enabled } : app
    ));
  };

  const renderActiveModule = () => {
    const activeTab = tabs.find(t => t.id === activeTabId);
    if (!activeTab) return <div className="p-8 text-gray-500">No active module selected.</div>;

    switch (activeTab.type) {
      case 'nexus': return <Nexus uiMode={uiMode} />;
      case 'terminal': return <Terminal uiMode={uiMode} onClose={() => handleCloseTab(activeTab.id)} />;
      case 'artifacts': return <Artifacts tabId={activeTab.id} userId={user?.id} uiMode={uiMode} />;
      case 'metrics': return <SystemMetrics uiMode={uiMode} />;
      case 'simulation': return <Simulation uiMode={uiMode} />;
      case 'governance': return <Governance uiMode={uiMode} />;
      case 'forge': return <Forge uiMode={uiMode} />;
      case 'agent_cli': return <AgentCLI uiMode={uiMode} />;
      case 'sentinel': return <Sentinel uiMode={uiMode} />;
      case 'symphony': return <Symphony uiMode={uiMode} />;
      case 'creative': return <Creative uiMode={uiMode} />;
      case 'sound_forge': return <SoundForge uiMode={uiMode} />;
      case 'image_studio': return <ImageStudio uiMode={uiMode} />;
      case 'video_suite': return <VideoSuite uiMode={uiMode} />;
      case 'moss_system': return <MossSystem uiMode={uiMode} />;
      case 'store': return (
        <ExtensionStore 
          uiMode={uiMode} 
          installedIds={extensions.filter(e => e.status === 'active').map(e => e.id)}
          onInstall={(ext) => {
            setExtensions(prev => [...prev, ext]);
            toast.success(`Installed ${ext.name}`);
          }}
        />
      );
      case 'canvas': return (
        <Canvas 
          tabId={activeTab.id} 
          onUpdate={(data) => {
            // Potential for saving state to a persistent store or backend
            console.log(`Canvas ${activeTab.id} updated:`, data);
          }} 
          uiMode={uiMode}
        />
      );
      case 'vhatsappening': 
        // Special case: if user tries to view VAA in Expert Mode, just show help or revert?
        return (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-500">
            <VaaClient 
              agents={agents}
              extensions={extensions}
              moss={moss}
              secrets={secrets}
              onCreateAgent={handleCreateAgent}
              onToggleMoss={handleToggleMoss}
            />
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">{activeTab.title}</h2>
            <p className="text-gray-500">Module integration pending (Type: {activeTab.type})</p>
          </div>
        );
    }
  };

  if (!isAuthReady) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-t-2 border-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className={`h-screen w-screen bg-black overflow-hidden flex flex-col font-mono text-white selection:bg-blue-500/30`}>
      <Toaster position="top-right" theme="dark" />
      
      <AnimatePresence mode="wait">
        {uiMode === 'vaa' ? (
          <motion.div 
            key="vaa"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="flex-1 overflow-hidden"
          >
            <VaaClient 
              agents={agents}
              extensions={extensions}
              moss={moss}
              secrets={secrets}
              onCreateAgent={handleCreateAgent}
              onToggleMoss={handleToggleMoss}
            />
          </motion.div>
        ) : (
          <motion.div 
            key="browser"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="flex-1 flex overflow-hidden relative"
          >
            <Sidebar 
              user={user}
              login={login}
              logout={logout}
              extensions={extensions}
              moss={moss}
              clients={clients}
              securityRules={securityRules}
              efficiencyPatches={efficiencyPatches}
              onToggleMoss={handleToggleMoss}
              onToggleClient={() => {}}
              onToggleRule={() => {}}
              onTogglePatch={() => {}}
              onConnectCloud={() => window.dispatchEvent(new CustomEvent('viabhron:connect-cloud'))}
              isCollapsed={isSidebarCollapsed}
              onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              onOpenStore={() => handleAddTab('store', 'Extension Store')}
              onOpenCanvas={() => handleAddTab('canvas', 'Logic Canvas')}
              onOpenArtifacts={() => handleAddTab('artifacts', 'Artifacts Viewer')}
              onOpenMetrics={() => handleAddTab('metrics', 'System Metrics')}
              onOpenSimulation={() => handleAddTab('simulation', 'Simulation Engine')}
              onOpenGovernance={() => handleAddTab('governance', 'Governance Protocol')}
              onOpenForge={() => handleAddTab('forge', 'Vibe Forge')}
              onOpenAgentCLI={() => handleAddTab('agent_cli', 'Agent CLI')}
              onOpenSentinel={() => handleAddTab('sentinel', 'Sentinel Guardian')}
              onOpenSecurity={() => handleAddTab('security', 'Security Division')}
              onOpenEfficiency={() => handleAddTab('efficiency', 'Efficiency Division')}
              onOpenHatchery={() => handleAddTab('hatchery', 'The Hatchery')}
              onOpenSOPs={() => handleAddTab('sops', 'SOP Registry')}
              onOpenProposals={() => handleAddTab('proposals', 'Ratification Proposals')}
              onOpenSettings={() => handleAddTab('settings', 'System Settings')}
              onOpenLoader={() => handleAddTab('loader', 'Moss Loader')}
              onOpenSoundForge={() => handleAddTab('sound_forge', 'Sound Forge')}
              onOpenImageStudio={() => handleAddTab('image_studio', 'Image Studio')}
              onOpenVideoSuite={() => handleAddTab('video_suite', 'Video Suite')}
              onOpenMossSystem={() => handleAddTab('moss_system', 'Moss System')}
              onOpenPlaceholderClient={() => handleAddTab('placeholder_client', 'Flagship Client')}
              onOpenIdentity={() => handleAddTab('identity-8004', 'Identity-8004')}
              onOpenRadar={() => handleAddTab('security-radar', 'Security-Radar')}
              onOpenVibeAssembly={() => handleAddTab('vibe-assembly', 'Vibe-Assembly')}
              onOpenMemoryPalace={() => handleAddTab('memory-palace', 'Memory-Palace')}
              onOpenAgentRegistry={() => handleAddTab('agent-registry', 'Agent-Registry')}
              systemMode={systemMode}
            />

            <div className="flex-1 flex flex-col min-w-0 bg-[#020202] relative overflow-hidden">
              <Tabs 
                tabs={tabs} 
                activeTabId={activeTabId || ''} 
                onAddTab={() => setIsTabSwitcherOpen(true)}
                onCloseTab={handleCloseTab}
                onSwitchTab={setActiveTabId}
              />
              
              <div className="flex-1 overflow-hidden relative">
                {renderActiveModule()}
              </div>

              {isTabSwitcherOpen && (
                <TabSwitcher 
                  tabs={tabs}
                  activeTabId={activeTabId || ''}
                  onTabSelect={setActiveTabId}
                  onTabClose={handleCloseTab}
                  onAddTab={(type) => {
                    handleAddTab(type || 'chat', 'New Session');
                    setIsTabSwitcherOpen(false);
                  }}
                  onClose={() => setIsTabSwitcherOpen(false)}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
