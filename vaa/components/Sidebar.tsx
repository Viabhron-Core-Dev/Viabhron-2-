import React, { useState } from 'react';
import { 
  Cloud, 
  Settings, 
  ChevronRight,
  ChevronDown,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  Terminal as TerminalIcon,
  X,
  Puzzle,
  Zap,
  Wrench,
  Network,
  Link as LinkIcon,
  Bot,
  Component,
  Activity,
  Bug,
  Shield,
  Cpu,
  Egg,
  Book,
  FileText,
  Layout,
  FlaskConical,
  Monitor,
  Gamepad2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Extension, ExtensionCategory, SystemMode, Moss, Client, SecurityRule, EfficiencyPatch } from '../../src/types';
import { User } from 'firebase/auth';
import { Logo } from './Logo';
import * as Icons from 'lucide-react';
import { SidebarSection } from '../../src/components/Shell/Sidebar/SidebarSection';
import { MachineRoomSection } from '../../src/components/Shell/Sidebar/MachineRoomSection';
import { MossSection } from '../../src/components/Shell/Sidebar/MossSection';
import { ClientSection } from '../../src/components/Shell/Sidebar/ClientSection';
import { TestingSection } from '../../src/components/Shell/Sidebar/TestingSection';

interface SidebarProps {
  user: User | null;
  login: () => void;
  logout: () => void;
  extensions: Extension[];
  moss: Moss[];
  clients: Client[];
  securityRules: SecurityRule[];
  efficiencyPatches: EfficiencyPatch[];
  onToggleMoss: (id: string) => void;
  onToggleClient: (id: string) => void;
  onToggleRule: (id: string) => void;
  onTogglePatch: (id: string) => void;
  onConnectCloud: () => void;
  isCollapsed: boolean;
  onToggle: () => void;
  onOpenStore: () => void;
  onOpenCanvas: () => void;
  onOpenArtifacts: () => void;
  onOpenMetrics: () => void;
  onOpenSimulation: () => void;
  onOpenGovernance: () => void;
  onOpenForge: () => void;
  onOpenAgentCLI: () => void;
  onOpenSentinel: () => void;
  onOpenSecurity: () => void;
  onOpenEfficiency: () => void;
  onOpenHatchery: () => void;
  onOpenSOPs: () => void;
  onOpenProposals: () => void;
  onOpenSettings: () => void;
  onOpenLoader: () => void;
  onOpenSoundForge: () => void;
  onOpenImageStudio: () => void;
  onOpenVideoSuite: () => void;
  onOpenMossSystem: () => void;
  onOpenPlaceholderClient: () => void;
  onOpenIdentity: () => void;
  onOpenRadar: () => void;
  onOpenVibeAssembly: () => void;
  onOpenMemoryPalace: () => void;
  onOpenAgentRegistry: () => void;
  geminiApiKey?: string;
  systemMode: SystemMode;
}


export const Sidebar: React.FC<SidebarProps> = ({ 
  user, 
  login, 
  logout, 
  extensions, 
  moss,
  clients,
  securityRules,
  efficiencyPatches,
  onToggleMoss,
  onToggleClient,
  onToggleRule,
  onTogglePatch,
  onConnectCloud, 
  isCollapsed, 
  onToggle, 
  onOpenStore, 
  onOpenCanvas, 
  onOpenArtifacts, 
  onOpenMetrics, 
  onOpenSimulation, 
  onOpenGovernance, 
  onOpenForge, 
  onOpenAgentCLI, 
  onOpenSentinel, 
  onOpenSecurity, 
  onOpenEfficiency, 
  onOpenHatchery, 
  onOpenSOPs, 
  onOpenProposals, 
  onOpenSettings,
  onOpenLoader,
  onOpenSoundForge,
  onOpenImageStudio,
  onOpenVideoSuite,
  onOpenMossSystem,
  onOpenPlaceholderClient,
  onOpenIdentity,
  onOpenRadar,
  onOpenVibeAssembly,
  onOpenMemoryPalace,
  onOpenAgentRegistry,
  geminiApiKey, 
  systemMode 
}) => {
  const [openSections, setOpenSections] = useState<Record<ExtensionCategory | 'moss' | 'client' | 'security' | 'efficiency' | 'testing', boolean>>({
    connector: false,
    skill: false,
    tool: false,
    mcp: false,
    module: false,
    gaming: false,
    testing: false,
    moss: false,
    client: false,
    security: false,
    efficiency: false,
    testing_debug: false
  });

  const toggleSection = (category: ExtensionCategory | 'moss' | 'client' | 'security' | 'efficiency' | 'testing_debug') => {
    setOpenSections(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const connectors = extensions.filter(e => e.category === 'connector');
  const skills = extensions.filter(e => e.category === 'skill');
  const tools = extensions.filter(e => e.category === 'tool');
  const mcpServers = extensions.filter(e => e.category === 'mcp');
  const gamingExtensions = extensions.filter(e => e.category === 'gaming');
  const testingExtensions = extensions.filter(e => e.category === 'testing');

  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? 12 : 256 }}
      className="bg-gray-900 border-r border-white/10 flex flex-col h-full overflow-hidden relative group/sidebar"
    >
      {/* Toggle Button / Handle */}
      <button
        onClick={onToggle}
        className={`
          absolute top-1/2 -translate-y-1/2 right-0 p-1 text-gray-500 hover:text-white hover:bg-white/5 rounded-l-md transition-all z-20
          ${isCollapsed ? 'opacity-0 group-hover/sidebar:opacity-100' : 'opacity-100'}
        `}
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <PanelLeftClose className="w-4 h-4" />}
      </button>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full w-[256px]"
          >
            {/* BYOI Header */}
            <div className="p-4 border-b border-white/10 space-y-3">
              <div 
                className="flex items-center gap-3 mb-2 px-1 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => window.dispatchEvent(new CustomEvent('viabhron:toggle-ui'))}
              >
                <Logo className="w-8 h-8" apiKey={geminiApiKey} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white tracking-tight truncate">Viabhron</div>
                  <div className="flex items-center gap-1.5">
                    <div className="text-[8px] text-gray-500 uppercase tracking-widest font-medium">Core OS</div>
                    <div className="w-1 h-1 rounded-full bg-gray-700" />
                    <div className={`text-[8px] font-bold uppercase tracking-widest ${
                      systemMode === 'turbo' ? 'text-blue-400' :
                      systemMode === 'eco' ? 'text-green-400' : 'text-purple-400'
                    }`}>
                      {systemMode}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={onConnectCloud}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-2 text-sm font-medium transition-all shadow-lg shadow-blue-500/20"
                title="Connect My Cloud"
              >
                <Cloud className="w-4 h-4" />
                <span>Connect My Cloud</span>
              </button>

              <button
                onClick={() => onOpenSettings()}
                className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white rounded-lg px-4 py-2 text-sm font-medium transition-all border border-white/10"
                title="Agent Orchestrator"
              >
                <Bot className="w-4 h-4 text-blue-400" />
                <span>Agent Orchestrator</span>
              </button>

              {/* Main Terminal Placeholder */}
              <button
                onClick={() => {}}
                className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white rounded-lg px-4 py-2 text-sm font-medium transition-all border border-white/10"
                title="Main Terminal"
              >
                <TerminalIcon className="w-4 h-4 text-cyan-400" />
                <span>Main Terminal</span>
              </button>

              {/* Celestial Client: VhatsAppeningAi */}
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('viabhron:toggle-ui'))}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 rounded-lg px-4 py-2 text-sm font-bold transition-all border border-indigo-500/20 shadow-lg shadow-indigo-500/5"
                title="VhatsAppeningAi"
              >
                <Sparkles className="w-4 h-4" />
                <span>VhatsAppeningAi</span>
              </button>

              {/* Future Flagship Client Placeholder */}
              <button
                onClick={() => onOpenPlaceholderClient()}
                className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-500 rounded-lg px-4 py-2 text-sm font-medium transition-all border border-white/5 opacity-60"
                title="Flagship Client (Coming Soon)"
              >
                <Monitor className="w-4 h-4" />
                <span>Flagship Client</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2 no-scrollbar">
              {/* Basic Infrastructure Section */}
              <div className="mb-6 px-2">
                <div className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3 px-1">Basic Infrastructure</div>
                <div className="space-y-1">
                  <button 
                    onClick={onOpenIdentity}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all group"
                  >
                    <Icons.Fingerprint className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-white uppercase tracking-wider">Identity-8004</span>
                  </button>
                  <button 
                    onClick={onOpenRadar}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all group"
                  >
                    <Icons.Radar className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-white uppercase tracking-wider">Security-Radar</span>
                  </button>
                  <button 
                    onClick={onOpenVibeAssembly}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all group"
                  >
                    <Icons.Zap className="w-3.5 h-3.5 text-yellow-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-white uppercase tracking-wider">Vibe-Assembly</span>
                  </button>
                  <button 
                    onClick={onOpenMemoryPalace}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all group"
                  >
                    <Icons.Database className="w-3.5 h-3.5 text-green-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-white uppercase tracking-wider">Memory-Palace</span>
                  </button>
                  <button 
                    onClick={onOpenAgentRegistry}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all group"
                  >
                    <Icons.List className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-white uppercase tracking-wider">Agent-Registry</span>
                  </button>
                </div>
              </div>

              {/* Canvas Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenCanvas}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all group"
                >
                  <Zap className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Visual Canvas</div>
                    <div className="text-[8px] text-blue-400/60 font-medium uppercase tracking-tighter">Workflow Orchestrator</div>
                  </div>
                </button>
              </div>

              {/* Artifacts Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenArtifacts}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-500/40 transition-all group"
                >
                  <Component className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Artifacts</div>
                    <div className="text-[8px] text-purple-400/60 font-medium uppercase tracking-tighter">Generative UI Sandbox</div>
                  </div>
                </button>
              </div>

              {/* Sound Forge Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenSoundForge}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all group"
                >
                  <Icons.Music className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Sound Forge</div>
                    <div className="text-[8px] text-blue-400/60 font-medium uppercase tracking-tighter">Audio Synthesis</div>
                  </div>
                </button>
              </div>

              {/* Image Studio Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenImageStudio}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-500/40 transition-all group"
                >
                  <Icons.Image className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Image Studio</div>
                    <div className="text-[8px] text-purple-400/60 font-medium uppercase tracking-tighter">Visual Synthesis</div>
                  </div>
                </button>
              </div>

              {/* Video Suite Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenVideoSuite}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/40 transition-all group"
                >
                  <Icons.Video className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Video Suite</div>
                    <div className="text-[8px] text-red-400/60 font-medium uppercase tracking-tighter">Motion Synthesis</div>
                  </div>
                </button>
              </div>

              {/* Moss System Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenMossSystem}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/40 transition-all group"
                >
                  <Icons.Sprout className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Moss System</div>
                    <div className="text-[8px] text-green-400/60 font-medium uppercase tracking-tighter">App Transmutation</div>
                  </div>
                </button>
              </div>

              {/* Metrics Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenMetrics}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/40 transition-all group"
                >
                  <Activity className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">System Metrics</div>
                    <div className="text-[8px] text-green-400/60 font-medium uppercase tracking-tighter">Performance Monitor</div>
                  </div>
                </button>
              </div>

              {/* Simulation Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenSimulation}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/40 transition-all group"
                >
                  <Bug className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Simulation Engine</div>
                    <div className="text-[8px] text-red-400/60 font-medium uppercase tracking-tighter">Debug & Test Suite</div>
                  </div>
                </button>
              </div>

              {/* Governance Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenGovernance}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/40 transition-all group"
                >
                  <Shield className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Governance & Security</div>
                    <div className="text-[8px] text-red-400/60 font-medium uppercase tracking-tighter">Microsoft Policy Engine</div>
                  </div>
                </button>
              </div>

              {/* Forge Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenForge}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 hover:border-orange-500/40 transition-all group"
                >
                  <Plus className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Vibe Forge</div>
                    <div className="text-[8px] text-orange-400/60 font-medium uppercase tracking-tighter">AI Code Staging</div>
                  </div>
                </button>
              </div>

              {/* Agent CLI Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenAgentCLI}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all group"
                >
                  <TerminalIcon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Agent CLI</div>
                    <div className="text-[8px] text-cyan-400/60 font-medium uppercase tracking-tighter">System Execution</div>
                  </div>
                </button>
              </div>

              {/* Sentinel Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenSentinel}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all group"
                >
                  <Shield className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Sentinel Guardian</div>
                    <div className="text-[8px] text-blue-400/60 font-medium uppercase tracking-tighter">Threat Detection</div>
                  </div>
                </button>
              </div>

              <MachineRoomSection 
                securityRules={securityRules}
                efficiencyPatches={efficiencyPatches}
                onToggleRule={onToggleRule}
                onTogglePatch={onTogglePatch}
                onOpenSecurity={onOpenSecurity}
                onOpenEfficiency={onOpenEfficiency}
                isOpenSecurity={openSections.security}
                isOpenEfficiency={openSections.efficiency}
                onToggleSecurity={() => toggleSection('security')}
                onToggleEfficiency={() => toggleSection('efficiency')}
              />

              {/* Hatchery Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenHatchery}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 hover:border-orange-500/40 transition-all group"
                >
                  <Egg className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">The Hatchery</div>
                    <div className="text-[8px] text-orange-400/60 font-medium uppercase tracking-tighter">Agent Onboarding</div>
                  </div>
                </button>
              </div>

              {/* SOP Registry Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenSOPs}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-500/40 transition-all group"
                >
                  <Book className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">SOP Registry</div>
                    <div className="text-[8px] text-amber-400/60 font-medium uppercase tracking-tighter">Corporate Kernel SOPs</div>
                  </div>
                </button>
              </div>

              {/* Ratification Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenProposals}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all group"
                >
                  <FileText className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Ratification Registry</div>
                    <div className="text-[8px] text-blue-400/60 font-medium uppercase tracking-tighter">System Expansion Ballot</div>
                  </div>
                </button>
              </div>

              <SidebarSection 
                title="Connectors" 
                icon={LinkIcon} 
                items={connectors} 
                isCollapsed={false} 
                isOpen={openSections.connector}
                onToggle={() => toggleSection('connector')}
                onAdd={onOpenStore}
              />
              <SidebarSection 
                title="Skills" 
                icon={Zap} 
                items={skills} 
                isCollapsed={false} 
                isOpen={openSections.skill}
                onToggle={() => toggleSection('skill')}
                onAdd={onOpenStore}
              />
              <SidebarSection 
                title="Tools" 
                icon={Wrench} 
                items={tools} 
                isCollapsed={false} 
                isOpen={openSections.tool}
                onToggle={() => toggleSection('tool')}
                onAdd={onOpenStore}
              />
              <SidebarSection 
                title="MCP Servers" 
                icon={Network} 
                items={mcpServers} 
                isCollapsed={false} 
                isOpen={openSections.mcp}
                onToggle={() => toggleSection('mcp')}
                onAdd={onOpenStore}
              />

              <MossSection 
                moss={moss}
                onToggleMoss={onToggleMoss}
                onOpenStore={onOpenStore}
                onOpenLoader={onOpenLoader}
                isOpen={openSections.moss}
                onToggle={() => toggleSection('moss')}
              />

              <ClientSection 
                clients={clients}
                onToggleClient={onToggleClient}
                onOpenStore={onOpenStore}
                isOpen={openSections.client}
                onToggle={() => toggleSection('client')}
              />

              <SidebarSection 
                title="Gaming Focused Extensions" 
                icon={Gamepad2} 
                items={gamingExtensions} 
                isCollapsed={false} 
                isOpen={openSections.gaming}
                onToggle={() => toggleSection('gaming')}
                onAdd={onOpenStore}
              />

              <SidebarSection 
                title="Testing Extensions" 
                icon={Egg} 
                items={testingExtensions} 
                isCollapsed={false} 
                isOpen={openSections.testing}
                onToggle={() => toggleSection('testing')}
                onAdd={onOpenStore}
              />

              <TestingSection 
                isOpen={openSections.testing_debug}
                onToggle={() => toggleSection('testing_debug')}
              />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-gray-900/50 space-y-2">
              {user ? (
                <div className="flex items-center justify-between px-2 py-1.5 bg-white/5 rounded-xl border border-white/5 mb-1">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img 
                      src={user.photoURL || ''} 
                      className="w-7 h-7 rounded-full border border-white/10" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-white truncate leading-tight">{user.displayName}</div>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">Online</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                    title="Sign Out"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={login}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all mb-1 shadow-lg shadow-blue-600/20"
                >
                  Sign In
                </button>
              )}
              <div 
                onClick={onOpenSettings}
                className="flex items-center gap-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all text-gray-400 hover:text-white px-3 py-2"
              >
                <Settings className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">System Settings</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
