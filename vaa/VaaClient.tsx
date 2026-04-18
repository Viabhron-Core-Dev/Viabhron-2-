import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  Users, 
  Globe, 
  Settings, 
  Plus, 
  Search, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Mic, 
  ArrowLeft,
  Sparkles,
  Zap,
  Layout,
  Store,
  Shield,
  Cpu,
  Workflow as WorkflowIcon,
  MessageCircle,
  QrCode,
  Camera,
  AlertCircle,
  Video,
  Phone,
  Smile,
  Share2,
  ChevronRight,
  RefreshCw,
  Database,
  Briefcase,
  User,
  History,
  LogOut,
  Terminal,
  Egg,
  Activity,
  HardDrive,
  Wifi,
  Trash2,
  Moon,
  FileText,
  X,
  ChevronDown,
  Clock,
  CheckCircle2,
  Play,
  HelpCircle,
  Bot,
  Network,
  Layers,
  Mail,
  ShieldCheck,
  Brain
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { localDb } from "../src/lib/db";
import { 
  CelestialNode, 
  CelestialChat, 
  Message, 
  CelestialViewType,
  Agent,
  CanvasNode,
  CanvasEdge,
  NewsCard,
  Extension,
  Moss,
  Secret
} from "../src/types";
import { Toaster, toast } from "sonner";
import { Canvas } from "../landscape/modules/Canvas";

import { useClickOutside } from "../src/hooks/useClickOutside";

// --- Extracted Components ---
import { SovereignCheck } from "./components/SovereignCheck";
import { WorkflowBuilder } from "./components/WorkflowBuilder";
import { NewsTab } from "./components/NewsTab";
import { ChatList } from "./components/ChatList";
import { ChatView } from "./components/ChatView";
import { VaaSettings } from "./components/VaaSettings";
import { HQExtensionsVault } from "./components/HQExtensionsVault";
import { SearchAndFilters, WorkflowTab } from "./components/Misc";
import { CameraCapture, QRScanner } from "./components/MediaTools";
import { ContactList } from "./components/ContactList";
import { MossLoader } from "../moss/MossLoader";

// --- Sub-components ---

// Components moved to ./components/




// WorkflowTab moved to ./components/




















interface VaaClientProps {
  agents?: Agent[];
  extensions?: Extension[];
  moss?: Moss[];
  secrets?: Secret[];
  onCreateAgent?: (agent: Partial<Agent>) => void;
  onAddSecret?: (secret: Omit<Secret, 'id' | 'createdAt'>) => void;
  onDeleteSecret?: (id: string) => void;
  onUpdateSecret?: (id: string, updates: Partial<Secret>) => void;
  onToggleMoss?: (id: string) => void;
  onToggleFreeze?: (id: string) => void;
  onCloseApp?: (id: string) => void;
  onOpenStore?: () => void;
  lastOpenedAppId?: string | null;
  onAppOpen?: (id: string) => void;
}

const TABS: ("chats" | "news" | "workflow" | "loader")[] = ["chats", "news", "workflow", "loader"];

export const VaaClient: React.FC<VaaClientProps> = ({ 
  agents = [], 
  extensions = [], 
  moss = [], 
  secrets = [],
  onCreateAgent,
  onAddSecret,
  onDeleteSecret,
  onUpdateSecret,
  onToggleMoss,
  onToggleFreeze,
  onCloseApp,
  onOpenStore,
  lastOpenedAppId,
  onAppOpen
}) => {
  const [activeTab, setActiveTab] = useState<"chats" | "news" | "workflow" | "loader">("chats");
  const [lastOpenedAppIdState, setLastOpenedAppIdState] = useState<string | null>('ma-pulse');
  const [isAppFullscreen, setIsAppFullscreen] = useState(() => {
    return localStorage.getItem('viabhron:vaa:app-fullscreen') === 'true';
  });
  const [isAnyAppActive, setIsAnyAppActive] = useState(false);

  const handleToggleFullscreen = () => {
    const newState = !isAppFullscreen;
    setIsAppFullscreen(newState);
    localStorage.setItem('viabhron:vaa:app-fullscreen', String(newState));
  };
  const [selectedChat, setSelectedChat] = useState<CelestialChat | null>(null);
  const [view, setView] = useState<"main" | "workflow">("main");
  const [workflowData, setWorkflowData] = useState<{ nodes: CanvasNode[]; edges: CanvasEdge[] }>({ nodes: [], edges: [] });
  const [showMenu, setShowMenu] = useState(false);
  const [showVaaSettings, setShowVaaSettings] = useState(false);
  const [showNewsMenu, setShowNewsMenu] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [newsFilter, setNewsFilter] = useState<string>("");
  const [showNewsFilterModal, setShowNewsFilterModal] = useState(false);
  const [showSovereignCheck, setShowSovereignCheck] = useState(false);
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false);
  const [showWorkflowSpeedDial, setShowWorkflowSpeedDial] = useState(false);
  const [showSwipeView, setShowSwipeView] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showContactList, setShowContactList] = useState(false);
  const [activeChatFilter, setActiveChatFilter] = useState("All");
  const [chatSearchQuery, setChatSearchQuery] = useState("");
  const [availableChatFilters, setAvailableChatFilters] = useState(["All", "Semi Local", "Cloudflare", "GitHub", "Gmail", "Corporate", "Hatchery"]);
  const [activeChatFilters, setActiveChatFilters] = useState(["All", "Semi Local", "Cloudflare", "GitHub", "Gmail"]);
  const [chats, setChats] = useState<CelestialChat[]>([]);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const newsMenuRef = useRef<HTMLDivElement>(null);
  const chatMenuRef = useRef<HTMLDivElement>(null);
  const plusMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setShowMenu(false));
  useClickOutside(newsMenuRef, () => setShowNewsMenu(false));
  useClickOutside(chatMenuRef, () => setShowChatMenu(false));
  useClickOutside(plusMenuRef, () => setShowPlusMenu(false));

  const displayTabs = [TABS[TABS.length - 1], ...TABS, TABS[0]];

  useEffect(() => {
    // Initialize chats
    const residentAgent = agents.find(a => a.isResident && a.role === 'head');
    
    const agentNodes: CelestialChat[] = agents
      .filter(agent => (!agent.isStaff || agent.isResident) && agent.id !== residentAgent?.id)
      .map(agent => ({
        id: `agent-${agent.id}`,
        nodeId: agent.id,
        name: agent.name,
        lastMessage: agent.description || "System Agent ready for deployment.",
        messages: [],
        type: "agent",
        updatedAt: Date.now(),
        isHeadAgent: agent.role === 'head',
        filterCategory: agent.isResident ? "Semi Local" : "Corporate"
      }));

    const initialChats: CelestialChat[] = [
      {
        id: "my-notes",
        nodeId: "user-self",
        name: "My Notes (Nucleus Buffer)",
        lastMessage: "Chairman's private scratchpad initiated.",
        messages: [],
        type: "agent",
        updatedAt: Date.now(),
        filterCategory: "Semi Local",
        isSelf: true
      },
      {
        id: residentAgent ? `agent-${residentAgent.id}` : "cloud-manager-resident",
        nodeId: residentAgent?.id || "cloud-manager",
        name: "Cloud Manager",
        lastMessage: residentAgent?.description || "Sovereign Brain Initialized. Awaiting Chairman's command.",
        messages: [
          {
            id: "cm1",
            role: "assistant",
            content: "Welcome back, Chairman. The Sovereign Kernel is stable. I am your Resident Agent, managing the private cloud substrate. How shall we proceed?",
            timestamp: new Date().toISOString()
          }
        ],
        type: "agent",
        isHeadAgent: true,
        updatedAt: Date.now(),
        filterCategory: "Semi Local"
      },
      {
        id: "sentinel-feed",
        name: "Sentinel Feed",
        lastMessage: "System Monitoring Active: All bulkheads secure.",
        messages: [
          {
            id: "s1",
            role: "assistant",
            content: "[INFO] Viabhron Kernel initialized successfully.",
            timestamp: new Date().toISOString()
          },
          {
            id: "s2",
            role: "assistant",
            content: "[SUCCESS] Sovereign Listener Bridge connected.",
            timestamp: new Date().toISOString()
          },
          {
            id: "s3",
            role: "assistant",
            content: "[WARN] High memory usage detected in Node-7.",
            timestamp: new Date().toISOString()
          }
        ],
        type: "sentinel",
        isSentinel: true,
        updatedAt: Date.now(),
        filterCategory: "Semi Local"
      },
      {
        id: "glasswing-auditor",
        name: "Glasswing Auditor",
        lastMessage: "Chairman, I have synthesized a new vulnerability in Node-7.",
        messages: [
          { 
            id: "gw1", 
            role: "assistant", 
            content: "[GLASSWING BRIEFING] I have identified a potential privilege escalation flaw in the 'Extra Processor' node manifest. This flaw is similar to the 27-year-old OpenBSD bug recently disclosed. I have a Sovereign Patch ready for ratification.", 
            timestamp: new Date().toISOString(),
            metadata: { type: "security-alert", severity: "high" }
          }
        ],
        type: "agent",
        updatedAt: Date.now(),
        filterCategory: "Cloudflare"
      },
      {
        id: "mission-control",
        name: "Mission Control",
        lastMessage: "Finance Auditor Agent: 1,240 claims processed.",
        messages: [
          { 
            id: "mc1", 
            role: "assistant", 
            content: "[MISSION LOG] Finance Auditor Agent has successfully connected to the UiPath Orchestrator substrate. Primary User status confirmed.", 
            timestamp: new Date().toISOString()
          },
          { 
            id: "mc2", 
            role: "assistant", 
            content: "[STATUS] Healthcare Claims Worker synthesis at 45%. Adversarial Auditor is currently vetting the automation manifest.", 
            timestamp: new Date().toISOString()
          }
        ],
        type: "agent",
        updatedAt: Date.now(),
        filterCategory: "Corporate"
      },
      ...agentNodes
    ];

    setChats(initialChats);
  }, [agents]);

  const handleTabClick = (tabId: "chats" | "news" | "workflow" | "loader") => {
    if (showContactList) setShowContactList(false);
    const realIndex = TABS.indexOf(tabId);
    const displayIndex = realIndex + 1;
    setActiveTab(tabId);
    if (contentRef.current) {
      contentRef.current.scrollTo({
        left: displayIndex * contentRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleSwipe = (direction: number) => {
    const currentIndex = TABS.indexOf(activeTab);
    let nextIndex = currentIndex + direction;
    
    if (nextIndex < 0) nextIndex = TABS.length - 1;
    if (nextIndex >= TABS.length) nextIndex = 0;
    
    handleTabClick(TABS[nextIndex]);
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    // Initial position: start at the first real tab (index 1)
    el.scrollLeft = el.clientWidth;

    let isTeleporting = false;

    const handleScroll = () => {
      if (isTeleporting) return;

      const scrollWidth = el.clientWidth;
      const scrollLeft = el.scrollLeft;
      
      // Instant update of activeTab for the bottom nav highlight
      const index = Math.round(scrollLeft / scrollWidth);
      
      // Determine the logical active tab based on scroll position
      let logicalIndex = index - 1;
      if (logicalIndex < 0) logicalIndex = TABS.length - 1;
      if (logicalIndex >= TABS.length) logicalIndex = 0;
      
      const newActiveTab = TABS[logicalIndex];
      
      setActiveTab(prev => {
        if (prev !== newActiveTab) return newActiveTab;
        return prev;
      });

      // Teleportation logic: Check if we've landed on a clone
      const isAtStartClone = scrollLeft <= 5;
      const isAtEndClone = scrollLeft >= (TABS.length + 1) * scrollWidth - 5;

      if (isAtStartClone || isAtEndClone) {
        isTeleporting = true;
        // Instant teleport without smooth behavior
        if (isAtStartClone) {
          el.scrollLeft = TABS.length * scrollWidth;
        } else if (isAtEndClone) {
          el.scrollLeft = scrollWidth;
        }
        
        // Small delay before re-enabling scroll logic to prevent feedback loops
        setTimeout(() => {
          isTeleporting = false;
        }, 50);
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case "chats":
        return (
          <>
            <SearchAndFilters 
              filters={activeChatFilters} 
              activeFilter={activeChatFilter}
              onFilterChange={setActiveChatFilter}
              searchQuery={chatSearchQuery}
              onSearchChange={setChatSearchQuery}
            />
            <ChatList chats={filteredChats} onSelectChat={setSelectedChat} />
          </>
        );
      case "news":
        return (
          <NewsTab 
            onShowMenu={() => setShowNewsMenu(!showNewsMenu)} 
            showMenu={showNewsMenu}
            menuRef={newsMenuRef}
            onOpenFilter={() => setShowNewsFilterModal(true)}
            showSwipeView={showSwipeView}
            setShowSwipeView={setShowSwipeView}
          />
        );
      case "workflow":
        return <WorkflowTab onOpenWorkflow={() => setView("workflow")} />;
      case "loader":
        return (
          <MossLoader 
            moss={moss} 
            agents={agents}
            onToggleMoss={onToggleMoss || (() => {})}
            onToggleFreeze={onToggleFreeze || (() => {})}
            onCloseApp={onCloseApp || (() => {})}
            onInstall={onOpenStore || (() => {})}
            onAppOpen={(id) => {
              setLastOpenedAppIdState(id);
              onAppOpen?.(id);
            }}
            uiMode="vaa"
            isFullscreen={isAppFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
            onAppActiveChange={setIsAnyAppActive}
          />
        );
      default:
        return null;
    }
  };

  // Map system agents to Celestial nodes (only if they have messages or are not staff)
  const agentNodes: CelestialChat[] = agents
    .filter(agent => !agent.isStaff) // Staff only in contact list
    .map(agent => ({
      id: `agent-${agent.id}`,
      nodeId: agent.id,
      name: agent.name,
      lastMessage: agent.description || "System Agent ready for deployment.",
      messages: [],
      type: "agent",
      updatedAt: Date.now(),
      isHeadAgent: agent.name.toLowerCase().includes("architect") || 
                   agent.name.toLowerCase().includes("omega") || 
                   agent.name.toLowerCase().includes("cloud manager")
    }));

  const allChats: CelestialChat[] = [
    {
      id: "sentinel-feed",
      name: "Sentinel Feed",
      lastMessage: "System monitoring active...",
      messages: [
        { id: "s1", role: "assistant", content: "[INFO] Viabhron Kernel initialized successfully.", timestamp: new Date().toISOString() },
        { id: "s2", role: "assistant", content: "[SUCCESS] Sovereign Listener Bridge connected.", timestamp: new Date().toISOString() },
        { id: "s3", role: "assistant", content: "[WARN] High memory usage detected in Node-7.", timestamp: new Date().toISOString() }
      ],
      type: "sentinel",
      updatedAt: Date.now(),
      isSentinel: true,
      filterCategory: "Semi Local"
    },
    {
      id: "gmail-relay",
      name: "Gmail Relay",
      lastMessage: "Chairman, I have sanitized 3 new emails for you.",
      messages: [
        { 
          id: "g1", 
          role: "assistant", 
          content: "I have processed your incoming streams. I removed 2 tracking pixels and 1 suspicious redirect from the elvilewis40@gmail.com thread.", 
          timestamp: new Date().toISOString(),
          sanitizationReport: { pixels: 2, links: 1 }
        }
      ],
      type: "gmail",
      updatedAt: Date.now(),
      filterCategory: "Gmail"
    },
    {
      id: "gmail-personal",
      name: "[PERSONAL] vianney.l",
      lastMessage: "No new sanitized messages.",
      messages: [],
      type: "gmail",
      updatedAt: Date.now(),
      filterCategory: "Gmail"
    },
    {
      id: "gmail-work",
      name: "[WORK] elvilewis40",
      lastMessage: "Draft: Re: Q2 Planning Docs",
      messages: [],
      type: "gmail",
      updatedAt: Date.now(),
      filterCategory: "Gmail"
    },
    {
      id: "sentinel-logs",
      name: "Sentinel Logs",
      lastMessage: "Sentinel: No new activity.",
      messages: [],
      type: "sentinel",
      updatedAt: Date.now(),
      filterCategory: "Semi Local"
    },
    {
      id: "glasswing-auditor",
      name: "Glasswing Auditor",
      lastMessage: "Chairman, I have synthesized a new vulnerability in Node-7.",
      messages: [
        { 
          id: "gw1", 
          role: "assistant", 
          content: "[GLASSWING BRIEFING] I have identified a potential privilege escalation flaw in the 'Extra Processor' node manifest. This flaw is similar to the 27-year-old OpenBSD bug recently disclosed. I have a Sovereign Patch ready for ratification.", 
          timestamp: new Date().toISOString(),
          metadata: { type: "security-alert", severity: "high" }
        }
      ],
      type: "agent",
      updatedAt: Date.now(),
      filterCategory: "Cloudflare"
    },
    {
      id: "mission-control",
      name: "Mission Control",
      lastMessage: "Finance Auditor Agent: 1,240 claims processed.",
      messages: [
        { 
          id: "mc1", 
          role: "assistant", 
          content: "[MISSION LOG] Finance Auditor Agent has successfully connected to the UiPath Orchestrator substrate. Primary User status confirmed.", 
          timestamp: new Date().toISOString()
        },
        { 
          id: "mc2", 
          role: "assistant", 
          content: "[STATUS] Healthcare Claims Worker synthesis at 45%. Adversarial Auditor is currently vetting the automation manifest.", 
          timestamp: new Date().toISOString()
        }
      ],
      type: "agent",
      updatedAt: Date.now(),
      filterCategory: "Corporate"
    },
    {
      id: "github-manifest",
      name: "GitHub Manifest",
      lastMessage: "New PR in Viabhron-OS: 'Sovereign Kernel Refactor'",
      messages: [],
      type: "agent",
      updatedAt: Date.now(),
      filterCategory: "GitHub"
    },
    {
      id: "hatchery-lab",
      name: "Hatchery Lab",
      lastMessage: "Synthesis of 'Legal Research Agent' complete.",
      messages: [],
      type: "agent",
      updatedAt: Date.now(),
      filterCategory: "Hatchery"
    },
    ...agentNodes
  ];

  const filteredChats = chats.filter(chat => {
    const matchesFilter = activeChatFilter === "All" || chat.filterCategory === activeChatFilter;
    const matchesSearch = chat.name.toLowerCase().includes(chatSearchQuery.toLowerCase()) || 
                         chat.lastMessage.toLowerCase().includes(chatSearchQuery.toLowerCase()) ||
                         chat.messages.some(m => m.content.toLowerCase().includes(chatSearchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const headAgentChat = chats.find(c => c.isHeadAgent) || chats[0];

  const handleSelectContact = (agent: Agent) => {
    // Check if chat already exists
    const existingChat = chats.find(c => c.nodeId === agent.id);
    if (existingChat) {
      setSelectedChat(existingChat);
    } else {
      // Create a new chat thread
      const newChat: CelestialChat = {
        id: `chat-${Date.now()}`,
        nodeId: agent.id,
        name: agent.name,
        type: "agent",
        messages: [],
        updatedAt: Date.now(),
        lastMessage: "Mission initiated."
      };
      setChats(prev => [newChat, ...prev]);
      setSelectedChat(newChat);
    }
    setShowContactList(false);
    setShowPlusMenu(false);
  };

  const handleSendMessage = (content: string) => {
    if (!selectedChat || !content.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: content.trim(),
      timestamp: new Date().toISOString()
    };

    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage],
      lastMessage: content.trim(),
      updatedAt: Date.now()
    };

    setChats(prev => prev.map(c => c.id === selectedChat.id ? updatedChat : c));
    setSelectedChat(updatedChat);

    // Skip AI simulation for self-chats
    if (updatedChat.isSelf) return;

    // Simulate agent response
    setTimeout(() => {
      const response: Message = {
        id: `resp-${Date.now()}`,
        role: "assistant",
        content: `I have received your command: "${content.trim()}". Processing via Sovereign Kernel...`,
        timestamp: new Date().toISOString()
      };

      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, response],
        lastMessage: response.content,
        updatedAt: Date.now()
      };

      setChats(prev => prev.map(c => c.id === selectedChat.id ? finalChat : c));
      if (selectedChat?.id === finalChat.id) {
        setSelectedChat(finalChat);
      }
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-white relative overflow-hidden font-sans selection:bg-wa-header/10">
      <Toaster position="top-center" richColors />
      
      <AnimatePresence mode="wait">
        {view === "workflow" ? (
          <motion.div 
            key="workflow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="h-full flex flex-col"
          >
            <div className="bg-wa-header text-white p-4 flex items-center justify-between shadow-md z-50">
              <div className="flex items-center gap-3">
                <button onClick={() => setView("main")}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex flex-col">
                  <h2 className="font-bold uppercase tracking-widest text-sm">Workflow 1</h2>
                  <span className="text-[8px] font-bold text-white/50 uppercase tracking-[0.2em]">Workflow Lab</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-6 py-2 bg-indigo-500 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  <Zap className="w-4 h-4 fill-white" />
                  Run
                </button>
                <button className="p-2.5 bg-white/10 rounded-xl">
                  <Database className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              <Canvas 
                tabId="celestial-workflow"
                initialData={workflowData}
                onUpdate={setWorkflowData}
              />
            </div>
          </motion.div>
        ) : showContactList ? (
          <motion.div
            key="contacts"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="h-full"
          >
            <ContactList 
              agents={agents} 
              extensions={extensions}
              secrets={secrets}
              onSelect={handleSelectContact} 
              onBack={() => setShowContactList(false)}
              onCreateAgent={(agent) => {
                onCreateAgent?.(agent);
                setShowContactList(false);
              }}
            />
          </motion.div>
        ) : !selectedChat ? (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full"
          >
            {/* Header */}
            {!(isAppFullscreen && isAnyAppActive) && (
              <div className="bg-wa-header text-white p-5 flex flex-col gap-4 shadow-lg z-20">
                <div className="flex justify-between items-center">
                  <h1 
                    className="text-2xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                      // This is a bit tricky since we don't have direct access to setActiveTabId here
                      // But we can trigger a custom event or use a prop if we pass it down.
                      // For now, I'll assume the user wants to switch to the "Expert" view (Browser UI)
                      // which in our case means switching to a non-vhatsappening tab.
                      window.dispatchEvent(new CustomEvent('viabhron:toggle-ui'));
                    }}
                  >
                    VhatsAppeningAi
                  </h1>
                  <div className="flex items-center gap-6 relative">
                    <QrCode 
                      className="w-6 h-6 text-white/90 cursor-pointer hover:text-white transition-colors" 
                      onClick={() => setShowQRScanner(true)}
                    />
                    <Camera 
                      className="w-6 h-6 text-white/90 cursor-pointer hover:text-white transition-colors" 
                      onClick={() => setShowCamera(true)}
                    />
                    <button onClick={() => setShowMenu(!showMenu)}>
                      <MoreVertical className="w-6 h-6 text-white/90" />
                    </button>

                    <AnimatePresence>
                      {showMenu && (
                        <motion.div 
                          ref={menuRef}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 top-10 w-56 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 z-50"
                        >
                          {[
                            { label: "Settings", icon: <Settings className="w-5 h-5" />, action: () => { setShowVaaSettings(true); setShowMenu(false); } },
                            { label: "Contacts", icon: <Users className="w-5 h-5" />, action: () => { setShowContactList(true); setShowMenu(false); } },
                            { label: "Backup/Restore", icon: <History className="w-5 h-5" />, action: () => setShowMenu(false) },
                            { label: "Logout", icon: <LogOut className="w-5 h-5" />, action: () => setShowMenu(false), color: "text-red-500" }
                          ].map((item, i) => (
                            <button 
                              key={item.label}
                              onClick={item.action}
                              className={`w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors ${item.color || "text-slate-700"}`}
                            >
                              {item.icon}
                              <span className="text-sm font-bold">{item.label}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}

            {/* Content Area */}
            <div className={`flex-1 flex flex-col overflow-hidden relative z-10 bg-white`}>
              <div 
                ref={contentRef}
                className="flex-1 flex overflow-x-auto snap-x snap-mandatory no-scrollbar w-full h-full"
              >
                {displayTabs.map((tabId, index) => (
                  <div key={`${tabId}-${index}`} className="flex-shrink-0 w-full h-full snap-start snap-always flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto no-scrollbar">
                      {renderTabContent(tabId)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Global Sovereign Action Stack (Omega + FAB) */}
              {!(isAppFullscreen && isAnyAppActive) && (
                <div className="absolute bottom-8 right-6 flex flex-col gap-4 items-center z-50">
                  <button 
                    onClick={() => {
                      // Direct Connect to Cloud Manager (Resident Agent)
                      setSelectedChat(headAgentChat);
                    }}
                    className="w-14 h-14 bg-wa-accent text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-30 ring-4 ring-white"
                  >
                    <span className="text-2xl font-bold">Ω</span>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">3</div>
                  </button>
                  <div className="relative">
                    {/* Speed Dial for Workflow */}
                    <AnimatePresence>
                      {showWorkflowSpeedDial && activeTab === 'workflow' && (
                        <div className="absolute bottom-20 right-0 flex flex-col gap-3 items-end">
                          <motion.button
                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: 20 }}
                            onClick={() => {
                              setShowWorkflowBuilder(true);
                              setShowWorkflowSpeedDial(false);
                            }}
                            className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-3 rounded-2xl shadow-xl whitespace-nowrap"
                          >
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Pipeline Builder</span>
                            <div className="w-10 h-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center">
                              <Zap className="w-5 h-5" />
                            </div>
                          </motion.button>
                          <motion.button
                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: 20 }}
                            transition={{ delay: 0.05 }}
                            onClick={() => {
                              setView("workflow");
                              setShowWorkflowSpeedDial(false);
                            }}
                            className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-3 rounded-2xl shadow-xl whitespace-nowrap"
                          >
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Visual Lab</span>
                            <div className="w-10 h-10 bg-wa-header text-white rounded-xl flex items-center justify-center">
                              <WorkflowIcon className="w-5 h-5" />
                            </div>
                          </motion.button>
                        </div>
                      )}
                    </AnimatePresence>

                    <button 
                      onClick={() => {
                        if (activeTab === 'chats') setShowPlusMenu(!showPlusMenu);
                        if (activeTab === 'news') setShowSwipeView(true);
                        if (activeTab === 'workflow') setShowWorkflowSpeedDial(!showWorkflowSpeedDial);
                        if (activeTab === 'loader' && lastOpenedAppIdState) {
                          // Trigger opening the last app
                          const event = new CustomEvent('viabhron:open-mini-app', { detail: { id: lastOpenedAppIdState } });
                          window.dispatchEvent(event);
                        }
                      }}
                      className="w-16 h-16 bg-indigo-500 text-white rounded-3xl shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-30"
                    >
                      {activeTab === 'chats' && <Plus className={`w-8 h-8 transition-transform ${showPlusMenu ? 'rotate-45' : ''}`} />}
                      {activeTab === 'news' && <Sparkles className="w-8 h-8" />}
                      {activeTab === 'workflow' && <Plus className={`w-8 h-8 transition-transform ${showWorkflowSpeedDial ? 'rotate-45' : ''}`} />}
                      {activeTab === 'loader' && <Play className="w-8 h-8" />}
                    </button>

                    <AnimatePresence>
                      {showPlusMenu && activeTab === 'chats' && (
                        <motion.div
                          ref={plusMenuRef}
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 10 }}
                          className="absolute bottom-20 right-0 w-56 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 z-50"
                        >
                          {[
                            { label: "Normal Chat", icon: <MessageCircle className="w-5 h-5" />, action: () => setShowContactList(true) },
                            { label: "Group Chat", icon: <Users className="w-5 h-5" />, action: () => setShowContactList(true) },
                            { label: "Debate (Parallel)", icon: <Layout className="w-5 h-5" />, action: () => setShowContactList(true) },
                            { label: "Debate (Interagent)", icon: <Zap className="w-5 h-5" />, action: () => setShowContactList(true) },
                          ].map((item) => (
                            <button 
                              key={item.label}
                              onClick={item.action}
                              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors text-slate-700"
                            >
                              {item.icon}
                              <span className="text-sm font-bold">{item.label}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigation */}
            {!(isAppFullscreen && isAnyAppActive) && (
              <div className="bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center z-40">
                {[
                  { id: "chats", label: "CHATS", icon: <Sparkles className="w-7 h-7" /> },
                  { id: "news", label: "NEWS", icon: <Globe className="w-7 h-7" /> },
                  { id: "workflow", label: "WORKFLOW", icon: <WorkflowIcon className="w-7 h-7" /> },
                  { id: "loader", label: "LOADER", icon: <Cpu className="w-7 h-7" /> }
                ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id as any)}
                    className={`flex flex-col items-center gap-1 transition-all ${
                      activeTab === tab.id ? "text-wa-header scale-110" : "text-slate-400"
                    }`}
                  >
                    <div className={`p-1 rounded-xl transition-colors ${activeTab === tab.id ? "bg-indigo-50" : "bg-transparent"}`}>
                      {tab.icon}
                    </div>
                    <span className="text-[9px] font-black tracking-[0.15em]">{tab.label}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="h-full"
          >
            <ChatView 
              chat={selectedChat} 
              onBack={() => setSelectedChat(null)} 
              onShowMenu={() => setShowChatMenu(!showChatMenu)}
              onOpenCommandCenter={() => window.dispatchEvent(new CustomEvent('viabhron:toggle-ui'))}
              onSendMessage={handleSendMessage}
              showMenu={showChatMenu}
              menuRef={chatMenuRef}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* News Filter Modal */}
      <AnimatePresence>
        {showNewsFilterModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-slate-900">Intelligence Filter</h2>
                <button onClick={() => setShowNewsFilterModal(false)} className="p-2 hover:bg-slate-100 rounded-full">
                  <ArrowLeft className="w-6 h-6 rotate-90" />
                </button>
              </div>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Set your "Editorial Mandate." The Resident AI will prioritize news based on this prompt.
              </p>
              <div className="space-y-4">
                <textarea 
                  value={newsFilter}
                  onChange={(e) => setNewsFilter(e.target.value)}
                  placeholder="e.g. Prioritize news on AI security vulnerabilities and Ethereum gas price spikes."
                  className="w-full h-32 bg-slate-50 border-2 border-slate-100 rounded-3xl p-4 text-sm focus:ring-2 focus:ring-wa-header/20 outline-none resize-none"
                />
                <button 
                  onClick={() => {
                    toast.success("Intelligence filter updated");
                    setShowNewsFilterModal(false);
                  }}
                  className="w-full py-4 bg-wa-header text-white rounded-2xl font-bold shadow-lg shadow-wa-header/20 uppercase tracking-widest text-xs"
                >
                  Apply Mandate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sovereign Check (Task Manager) */}
      <AnimatePresence>
        {showSovereignCheck && <SovereignCheck onClose={() => setShowSovereignCheck(false)} />}
      </AnimatePresence>

      {/* Workflow Builder */}
      <AnimatePresence>
        {showWorkflowBuilder && <WorkflowBuilder onClose={() => setShowWorkflowBuilder(false)} />}
      </AnimatePresence>

      {/* Vaa Settings */}
      <AnimatePresence>
        {showVaaSettings && (
          <VaaSettings 
            onClose={() => setShowVaaSettings(false)} 
            availableFilters={availableChatFilters}
            activeFilters={activeChatFilters}
            onToggleFilter={(filter) => {
              setActiveChatFilters(prev => 
                prev.includes(filter) 
                  ? prev.filter(f => f !== filter) 
                  : [...prev, filter]
              );
            }}
            onReorderFilters={setAvailableChatFilters}
            secrets={secrets}
            onAddSecret={onAddSecret!}
            onDeleteSecret={onDeleteSecret!}
            onUpdateSecret={onUpdateSecret!}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCamera && (
          <CameraCapture 
            onClose={() => setShowCamera(false)}
            agents={agents}
            onSend={(agentId, image) => {
              const agent = agents.find(a => a.id === agentId);
              toast.success(`Image sent to ${agent?.name || 'Agent'}`);
              setShowCamera(false);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showQRScanner && (
          <QRScanner 
            onClose={() => setShowQRScanner(false)}
            onScan={(data) => {
              toast.info(`QR Scanned: ${data}`);
              setShowQRScanner(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
