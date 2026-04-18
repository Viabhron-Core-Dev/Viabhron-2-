import React, { useState } from "react";
import { 
  Database, 
  Globe, 
  MessageSquare, 
  Zap, 
  Briefcase, 
  Cpu, 
  Brain, 
  Network, 
  Terminal, 
  Mail, 
  Layers, 
  Workflow as WorkflowIcon, 
  Egg, 
  Sparkles, 
  Layout, 
  Shield, 
  ShieldCheck, 
  ChevronRight, 
  Plus 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CloudflareKnockout, 
  GmailRelayKnockout, 
  GitHubKnockout, 
  IntelligenceHubKnockout 
} from "./Knockouts";

interface HQExtensionsVaultProps {
  onOpenWorkforce: () => void;
}

export const HQExtensionsVault: React.FC<HQExtensionsVaultProps> = ({ onOpenWorkforce }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    connectors: true,
    skills: false,
    tools: false,
    mcp: false,
    gaming: false,
    testing: false,
    extraProcessor: false,
    branches: true,
    gmailRelay: false,
    viabhronicLoader: false,
    clients: false,
    corporateKernel: true,
    hatchery: true
  });

  const [boundSections, setBoundSections] = useState<Record<string, boolean>>({
    connectors: false,
    skills: true,
    tools: true,
    mcp: true,
    intelligenceHubs: false,
    gaming: true,
    testing: true,
    extraProcessor: false,
    branches: true,
    gmailRelay: false,
    viabhronicLoader: true,
    clients: true,
    corporateKernel: false,
    hatchery: false
  });

  const [showCloudflareKnockout, setShowCloudflareKnockout] = useState(false);
  const [showGmailKnockout, setShowGmailKnockout] = useState(false);
  const [showGitHubKnockout, setShowGitHubKnockout] = useState(false);
  const [showIntelligenceHubKnockout, setShowIntelligenceHubKnockout] = useState(false);
  const [isGlasswingActive, setIsGlasswingActive] = useState(false);
  const [isMythosConfigured, setIsMythosConfigured] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const VaultSection = ({ title, icon: Icon, section, children, onAdd, isBound = true, onBind }: { title: string, icon: any, section: string, children?: React.ReactNode, onAdd?: () => void, isBound?: boolean, onBind?: () => void }) => (
    <div className={`space-y-3 transition-opacity duration-300 ${!isBound ? "opacity-50 grayscale" : ""}`}>
      <div 
        onClick={() => isBound && toggleSection(section)}
        className={`w-full flex items-center justify-between group ${isBound ? "cursor-pointer" : "cursor-not-allowed"}`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl transition-colors ${openSections[section] && isBound ? "bg-wa-header/10 text-wa-header" : "bg-slate-100 text-slate-400"}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em]">{title}</h2>
            {!isBound && <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Unbound Node</span>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!isBound ? (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (onBind) onBind();
              }}
              className="px-3 py-1.5 bg-wa-header text-white text-[8px] font-black uppercase tracking-widest rounded-lg shadow-sm hover:scale-105 transition-transform"
            >
              Bind Now
            </button>
          ) : (
            <>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (onAdd) onAdd();
                }}
                className="p-1.5 text-wa-header hover:bg-wa-header/10 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
              <ChevronRight className={`w-4 h-4 text-slate-300 transition-transform ${openSections[section] ? "rotate-90" : ""}`} />
            </>
          )}
        </div>
      </div>
      <AnimatePresence>
        {openSections[section] && isBound && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-2 pl-11"
          >
            {children || (
              <div className="py-4 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No {title} Ratified</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
      <AnimatePresence>
        {showCloudflareKnockout && (
          <CloudflareKnockout onClose={() => setShowCloudflareKnockout(false)} />
        )}
        {showGmailKnockout && (
          <GmailRelayKnockout onClose={() => setShowGmailKnockout(false)} />
        )}
        {showGitHubKnockout && (
          <GitHubKnockout onClose={() => setShowGitHubKnockout(false)} />
        )}
        {showIntelligenceHubKnockout && (
          <IntelligenceHubKnockout onClose={() => {
            setShowIntelligenceHubKnockout(false);
            setIsMythosConfigured(true); // Simulate configuration
          }} />
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">HQ Extensions Vault</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Sovereign Registry Control</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
          <Database className="w-6 h-6" />
        </div>
      </div>

      <div className="space-y-6">
        <VaultSection 
          title="Connectors" 
          icon={Globe} 
          section="connectors"
          isBound={boundSections.connectors}
          onBind={() => setShowGitHubKnockout(true)}
          onAdd={() => setShowGitHubKnockout(true)}
        >
          {[
            { name: "GitHub Manifest", status: "Active", icon: <Globe className="w-5 h-5" /> },
            { name: "Gmail Relay", status: "Active", icon: <MessageSquare className="w-5 h-5" /> }
          ].map(item => (
            <div key={item.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 border border-slate-100">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{item.name}</h3>
                  <span className="text-[8px] font-bold text-green-500 uppercase tracking-widest">{item.status}</span>
                </div>
              </div>
              <div className="w-10 h-5 bg-green-500 rounded-full relative p-1">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
          ))}
        </VaultSection>

        <VaultSection title="Skills" icon={Zap} section="skills" isBound={boundSections.skills} />
        <VaultSection title="Tools" icon={Briefcase} section="tools" isBound={boundSections.tools} />
        <VaultSection title="MCP Servers" icon={Cpu} section="mcp" isBound={boundSections.mcp} />
        
        <VaultSection 
          title="Intelligence Hubs" 
          icon={Brain} 
          section="intelligenceHubs"
          isBound={boundSections.intelligenceHubs}
          onBind={() => setShowIntelligenceHubKnockout(true)}
          onAdd={() => setShowIntelligenceHubKnockout(true)}
        >
          {[
            { name: "Hugging Face", status: "Active", icon: <Globe className="w-5 h-5" /> },
            { name: "Open Router", status: "Active", icon: <Network className="w-5 h-5" /> },
            { name: "Ollama (Local)", status: "Active", icon: <Terminal className="w-5 h-5" /> },
            { name: "Google Edge AI", status: "Active", icon: <Zap className="w-5 h-5" /> }
          ].map(item => (
            <div key={item.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 border border-slate-100">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{item.name}</h3>
                  <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-widest">{item.status}</span>
                </div>
              </div>
              <div className="w-10 h-5 bg-indigo-500 rounded-full relative p-1">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
          ))}
        </VaultSection>
        
        <VaultSection 
          title="Gmail Relay" 
          icon={Mail} 
          section="gmailRelay"
          onAdd={() => setShowGmailKnockout(true)}
          isBound={boundSections.gmailRelay}
          onBind={() => setBoundSections(prev => ({ ...prev, gmailRelay: true }))}
        >
          <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-red-500 border border-red-100">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Gmail Sovereign Node</h3>
                <span className="text-[8px] font-bold text-red-500 uppercase tracking-widest">2 Accounts Connected</span>
              </div>
            </div>
            <button 
              onClick={() => setShowGmailKnockout(true)}
              className="px-3 py-1.5 bg-red-500 text-white text-[8px] font-black uppercase tracking-widest rounded-lg"
            >
              Manage
            </button>
          </div>
        </VaultSection>

        <VaultSection 
          title="Extra Processor" 
          icon={Network} 
          section="extraProcessor"
          onAdd={() => setShowCloudflareKnockout(true)}
          isBound={boundSections.extraProcessor}
          onBind={() => setBoundSections(prev => ({ ...prev, extraProcessor: true }))}
        >
          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-orange-500 border border-orange-100">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Cloudflare Edge</h3>
                <span className="text-[8px] font-bold text-orange-500 uppercase tracking-widest">Ready for Setup</span>
              </div>
            </div>
            <button 
              onClick={() => setShowCloudflareKnockout(true)}
              className="px-3 py-1.5 bg-orange-500 text-white text-[8px] font-black uppercase tracking-widest rounded-lg"
            >
              Configure
            </button>
          </div>
        </VaultSection>

        <VaultSection 
          title="Branches & Mission" 
          icon={Layers} 
          section="branches"
          isBound={boundSections.branches}
        >
          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 border border-indigo-100">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Main Office</h3>
                <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-widest">Primary Node</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Online</span>
            </div>
          </div>
        </VaultSection>

        <VaultSection 
          title="Corporate Kernel" 
          icon={Briefcase} 
          section="corporateKernel"
          isBound={boundSections.corporateKernel}
          onBind={() => setBoundSections(prev => ({ ...prev, corporateKernel: true }))}
        >
          <div className="space-y-3">
            {[
              { name: "UiPath Orchestrator", status: "Agent-First", icon: <WorkflowIcon className="w-5 h-5" /> },
              { name: "Automation Anywhere", status: "Agentic-User", icon: <Cpu className="w-5 h-5" /> }
            ].map(item => (
              <div key={item.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 border border-slate-100">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{item.name}</h3>
                    <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-widest">{item.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Live</span>
                </div>
              </div>
            ))}
          </div>
        </VaultSection>

        <VaultSection 
          title="App Hatchery" 
          icon={Egg} 
          section="hatchery"
          isBound={boundSections.hatchery}
          onBind={() => setBoundSections(prev => ({ ...prev, hatchery: true }))}
        >
          <div className="space-y-3">
            <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Agentic Worker Synthesis</h3>
                    <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-widest">Mission Control Mode</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Finance Auditor Agent", progress: 100, status: "Deployed" },
                  { name: "Healthcare Claims Worker", progress: 45, status: "Synthesizing" }
                ].map(worker => (
                  <div key={worker.name} className="space-y-1">
                    <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-slate-500">
                      <span>{worker.name}</span>
                      <span className={worker.status === "Deployed" ? "text-green-500" : "text-indigo-500"}>{worker.status}</span>
                    </div>
                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${worker.progress}%` }}
                        className={`h-full ${worker.status === "Deployed" ? "bg-green-500" : "bg-indigo-500"}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </VaultSection>

        <VaultSection title="Viabhronic Loader" icon={Layout} section="viabhronicLoader" isBound={boundSections.viabhronicLoader} />
        <VaultSection title="Clients" icon={Terminal} section="clients" isBound={boundSections.clients} />
        <VaultSection title="Gaming Focused" icon={Zap} section="gaming" isBound={boundSections.gaming} />
        <VaultSection title="Testing" icon={Egg} section="testing" isBound={boundSections.testing} />
        
        <VaultSection 
          title="Security Division" 
          icon={Shield} 
          section="security"
          isBound={true}
        >
          <div className="space-y-3">
            <div className={`p-4 rounded-2xl border transition-all duration-500 ${isGlasswingActive ? "bg-indigo-500/5 border-indigo-500/20 shadow-lg shadow-indigo-500/10" : "bg-slate-50 border-slate-100"}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${isGlasswingActive ? "bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-500/30" : "bg-white text-slate-400 border-slate-100"}`}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Glasswing Auditor</h3>
                    <span className={`text-[8px] font-bold uppercase tracking-widest ${isGlasswingActive ? "text-indigo-500" : "text-slate-400"}`}>
                      {isGlasswingActive ? "Level 5 Frontier Mode" : "Level 4 Standard Mode"}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    if (!isMythosConfigured && !isGlasswingActive) {
                      setShowIntelligenceHubKnockout(true);
                    } else {
                      setIsGlasswingActive(!isGlasswingActive);
                    }
                  }}
                  className={`w-10 h-5 rounded-full relative p-1 transition-colors ${isGlasswingActive ? "bg-indigo-500" : "bg-slate-300"}`}
                >
                  <motion.div 
                    animate={{ x: isGlasswingActive ? 20 : 0 }}
                    className="w-3 h-3 bg-white rounded-full" 
                  />
                </button>
              </div>
              <p className="text-[9px] text-slate-500 leading-relaxed">
                {isGlasswingActive 
                  ? "Leveraging Claude Mythos for proactive vulnerability synthesis and automated patching." 
                  : "Standard adversarial auditing of shell commands and script hygiene."}
              </p>
              {!isMythosConfigured && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Frontier Substrate Unbound</span>
                  <button 
                    onClick={() => setShowIntelligenceHubKnockout(true)}
                    className="text-[8px] font-black text-indigo-600 uppercase tracking-widest hover:underline"
                  >
                    Connect Mythos
                  </button>
                </div>
              )}
              {isGlasswingActive && (
                <div className="mt-3 pt-3 border-t border-indigo-500/10 flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-indigo-500 animate-pulse" />
                  <span className="text-[8px] font-black text-indigo-500 uppercase tracking-widest">Glasswing Substrate Active</span>
                </div>
              )}
            </div>
          </div>
        </VaultSection>
      </div>
    </div>
  );
};
