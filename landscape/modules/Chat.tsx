import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Terminal, 
  Bot, 
  User, 
  Sparkles, 
  Cpu, 
  Box, 
  Shield, 
  Activity,
  ChevronRight,
  ChevronLeft,
  Puzzle,
  Zap,
  Wrench,
  Network,
  Mic,
  Database,
  X,
  Brain,
  History,
  MoreVertical,
  Settings2,
  ExternalLink as ExternalLinkIcon,
  ToggleLeft,
  ToggleRight,
  Key,
  Eye,
  EyeOff,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Message, Extension, Agent, ExternalPlugin, UIMode, Tab } from '../../types';
import { db } from '../../lib/firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  query, 
  orderBy, 
  serverTimestamp,
  doc,
  getDoc
} from 'firebase/firestore';
import { AIService } from '../../lib/aiService';
import { getSystemContext } from '../../lib/systemContext';

interface ChatProps {
  tabId: string;
  userId?: string;
  agentId?: string;
  isBridged?: boolean;
  geminiApiKey?: string;
  availableExtensions: Extension[];
  activeExtensionIds: string[];
  externalPlugins?: ExternalPlugin[];
  onUpdateExternalPlugins?: (plugins: ExternalPlugin[]) => void;
  onUpdateExtensions: (ids: string[]) => void;
  isLockdown?: boolean;
  checkSovereignProcedures?: (action: string, metadata?: any) => { allowed: boolean; message?: string };
  uiMode?: UIMode;
  tabs?: Tab[];
}

export const Chat: React.FC<ChatProps> = ({ 
  tabId, 
  userId, 
  agentId,
  isBridged,
  geminiApiKey,
  availableExtensions, 
  activeExtensionIds,
  externalPlugins = [],
  onUpdateExternalPlugins,
  onUpdateExtensions,
  isLockdown,
  checkSovereignProcedures,
  uiMode,
  tabs = []
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSandboxPanelOpen, setIsSandboxPanelOpen] = useState(true);
  const [isAgentSettingsOpen, setIsAgentSettingsOpen] = useState(false);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userId || !agentId) return;
    const agentRef = doc(db, 'users', userId, 'agents', agentId);
    getDoc(agentRef).then(snap => {
      if (snap.exists()) setAgent(snap.data() as Agent);
    });
  }, [userId, agentId]);

  const activeExtensions = availableExtensions.filter(e => activeExtensionIds.includes(e.id));

  const toggleExtension = (id: string) => {
    if (activeExtensionIds.includes(id)) {
      onUpdateExtensions(activeExtensionIds.filter(extId => extId !== id));
    } else {
      onUpdateExtensions([...activeExtensionIds, id]);
    }
  };

  useEffect(() => {
    if (!userId) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: "I'm your AI Computer. Please sign in to save your sessions and connect your Google Cloud.",
          timestamp: new Date()
        }
      ]);
      return;
    }

    const messagesRef = collection(db, 'users', userId, 'tabs', tabId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        timestamp: doc.data().timestamp?.toDate() || new Date()
      } as Message));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [userId, tabId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping || isLockdown) return;
    
    const content = input;
    
    if (checkSovereignProcedures) {
      const check = checkSovereignProcedures(`Send message: ${content}`, { tabId, agentId });
      if (!check.allowed) {
        const messagesRef = collection(db, 'users', userId!, 'tabs', tabId, 'messages');
        await addDoc(messagesRef, {
          role: 'system',
          content: check.message || 'Action blocked by Sovereign Procedure.',
          timestamp: serverTimestamp()
        });
        setInput('');
        return;
      }
    }

    setInput('');

    if (!userId) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      return;
    }

    const messagesRef = collection(db, 'users', userId, 'tabs', tabId, 'messages');
    try {
      await addDoc(messagesRef, {
        role: 'user',
        content,
        timestamp: serverTimestamp()
      });

      setIsTyping(true);

      // Get API Key for the agent's provider
      const keysRef = doc(db, 'users', userId, 'settings', 'api_keys');
      const keysSnap = await getDoc(keysRef);
      const keys = keysSnap.data() || {};
      const provider = agent?.provider || 'gemini';
      const apiKey = provider === 'gemini' ? geminiApiKey : keys[provider];

      const systemContext = getSystemContext(tabs, agent || undefined);

      if (provider === 'local' || provider === 'gemini') {
        // Use user-provided Gemini API key
        const response = await AIService.generateResponse({
          apiKey: geminiApiKey || '',
          agent: agent || {
            id: 'default',
            name: 'Viabhron Assistant',
            provider: 'gemini',
            model: 'gemini-3-flash-preview',
            systemInstruction: 'You are a helpful assistant.',
            activeExtensionIds: [],
            color: '#3b82f6'
          },
          history: [...messages, { id: 'temp', role: 'user', content, timestamp: new Date() }],
          systemContext
        });

        await addDoc(messagesRef, {
          role: 'assistant',
          content: response,
          timestamp: serverTimestamp()
        });
      } else if (!apiKey) {
        await addDoc(messagesRef, {
          role: 'assistant',
          content: `Please provide an API key for ${provider.toUpperCase()} in System Settings to use this agent.`,
          timestamp: serverTimestamp()
        });
      } else {
        const response = await AIService.generateResponse({
          apiKey,
          agent: agent!,
          history: [...messages, { id: 'temp', role: 'user', content, timestamp: new Date() }],
          systemContext
        });

        await addDoc(messagesRef, {
          role: 'assistant',
          content: response,
          timestamp: serverTimestamp()
        });
      }
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsTyping(false);
    }
  };

  if (!userId || !agentId || !isBridged || !geminiApiKey) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-950 p-8 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-blue-600/10 flex items-center justify-center mb-4">
          <Brain className="w-10 h-10 text-blue-500 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Sovereign Setup Required</h2>
        <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
          To activate your private **Tiny LLM Head Agent**, you must bridge Viabhron to your infrastructure and provide your own Gemini API Key.
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          {!isBridged && (
            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent('viabhron:connect-cloud'));
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20"
            >
              Connect My Cloud
            </button>
          )}
          {!geminiApiKey && (
            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent('viabhron:open-settings'));
              }}
              className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white border border-white/10 rounded-2xl font-bold transition-all"
            >
              Configure API Key
            </button>
          )}
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">
            This ensures your data and costs stay entirely yours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-gray-950 text-gray-100 overflow-hidden relative">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Chat Header */}
        <div className="h-14 bg-gray-900/50 border-b border-white/5 flex items-center justify-between px-6 backdrop-blur-xl shrink-0 z-30">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20`}>
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest">{agent?.name || 'Viabhron Assistant'}</h2>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Active Session</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsAgentSettingsOpen(true)}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              title="Agent Settings"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 md:px-8 py-12 space-y-12 no-scrollbar"
        >
          {messages.length === 0 ? (
            <div className="max-w-3xl mx-auto h-full flex flex-col items-start justify-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <h1 className="text-4xl md:text-6xl font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight leading-tight">
                  Hello, how can I help you?
                </h1>
                <p className="text-gray-500 text-xl font-light">I'm your Viabhron AI assistant, ready to build and explore with you.</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {[
                  { icon: Zap, label: "Create a visual workflow", sub: "Design complex logic visually" },
                  { icon: Database, label: "Explore my cloud", sub: "Connect and manage your infrastructure" },
                  { icon: Puzzle, label: "Install new skills", sub: "Expand my capabilities" },
                  { icon: Bot, label: "Analyze this project", sub: "Get insights and suggestions" }
                ].map((item, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="p-5 bg-gray-900/30 border border-white/5 rounded-3xl hover:bg-white/5 hover:border-white/10 transition-all text-left group"
                  >
                    <item.icon className="w-6 h-6 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-sm font-bold text-gray-200 mb-1">{item.label}</div>
                    <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{item.sub}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-12">
              <AnimatePresence mode="popLayout">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1
                      ${msg.role === 'assistant' ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20' : 'bg-gray-800'}
                    `}>
                      {msg.role === 'assistant' ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-gray-400" />}
                    </div>
                    <div className={`
                      flex-1 space-y-2
                      ${msg.role === 'user' ? 'text-right' : 'text-left'}
                    `}>
                      <div className={`
                        text-sm leading-relaxed inline-block
                        ${msg.role === 'user' 
                          ? 'bg-gray-900 px-5 py-3.5 rounded-3xl border border-white/5 text-gray-200' 
                          : 'text-gray-200'}
                      `}>
                        {msg.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-6"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center animate-pulse">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center gap-1 px-4 py-2 bg-gray-900 rounded-2xl border border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className={`p-4 md:p-8 ${uiMode === 'browser' ? 'pb-32 md:pb-12' : 'pb-12'} bg-gradient-to-t from-gray-950 via-gray-950 to-transparent z-20`}>
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[32px] blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
              <div className="flex items-end gap-2 p-2">
                <div className="flex-1 min-h-[48px] flex items-center px-4">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    disabled={isLockdown}
                    placeholder={isLockdown ? "SYSTEM LOCKDOWN ACTIVE..." : "Ask anything..."}
                    className={`w-full bg-transparent border-none focus:ring-0 text-sm ${isLockdown ? 'text-red-500 placeholder-red-900' : 'text-gray-200 placeholder-gray-500'} resize-none py-3 max-h-32 no-scrollbar`}
                    rows={1}
                  />
                </div>
                
                <div className="flex items-center gap-1 p-1">
                  <button className="p-2.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition-all">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition-all">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isLockdown}
                    className={`
                      p-3 rounded-full transition-all
                      ${isLockdown ? 'bg-red-900/20 text-red-900 cursor-not-allowed' : input.trim() ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-600 bg-white/5'}
                    `}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                  {agent?.name || 'Viabhron Assistant'} ({agent?.provider || 'Gemini'})
                </span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-2">
                <History className="w-3 h-3 text-blue-400" />
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                  Memory: {messages.length} Turns
                </span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-2">
                <Terminal className="w-3 h-3 text-gray-600" />
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Sandbox Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Settings Modal */}
      <AnimatePresence>
        {isAgentSettingsOpen && (
          <div className="absolute inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAgentSettingsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gray-900/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600/10 rounded-xl">
                    <Settings2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-widest">Agent Settings</h2>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Configure External Plugins & Logic</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAgentSettingsOpen(false)}
                  className="p-2 text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-8 max-h-[60vh] overflow-y-auto no-scrollbar">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Puzzle className="w-3.5 h-3.5" />
                    <h3 className="text-[10px] font-bold uppercase tracking-widest">External Plugins</h3>
                  </div>

                  <div className="space-y-3">
                    {externalPlugins.map(plugin => (
                      <div key={plugin.id} className="p-4 bg-gray-900/30 border border-white/5 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-lg">
                              <Sparkles className="w-4 h-4 text-purple-400" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white">{plugin.name}</div>
                              <div className="text-[9px] text-gray-500 uppercase tracking-tight">{plugin.id}</div>
                            </div>
                          </div>
                          <button 
                            onClick={() => {
                              if (onUpdateExternalPlugins) {
                                onUpdateExternalPlugins(externalPlugins.map(p => 
                                  p.id === plugin.id ? { ...p, enabled: !p.enabled } : p
                                ));
                              }
                            }}
                            className={`p-1 rounded-lg transition-all ${plugin.enabled ? 'text-blue-400' : 'text-gray-600'}`}
                          >
                            {plugin.enabled ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                          </button>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-relaxed">
                          {plugin.description}
                        </p>

                        {plugin.enabled && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="pt-3 border-t border-white/5 space-y-3"
                          >
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">API Key / Auth</label>
                              <div className="relative">
                                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                                <input 
                                  type="password"
                                  value={plugin.config.apiKey || ''}
                                  onChange={(e) => {
                                    if (onUpdateExternalPlugins) {
                                      onUpdateExternalPlugins(externalPlugins.map(p => 
                                        p.id === plugin.id ? { ...p, config: { ...p.config, apiKey: e.target.value } } : p
                                      ));
                                    }
                                  }}
                                  placeholder="Enter OpenAI API Key..."
                                  className="w-full bg-gray-950 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-gray-700 focus:border-blue-500/50 outline-none transition-all"
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-2 bg-gray-950/50 rounded-xl border border-white/5">
                              <div className="flex items-center gap-2">
                                <Shield className="w-3.5 h-3.5 text-blue-400" />
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Review Gate</span>
                              </div>
                              <button 
                                onClick={() => {
                                  if (onUpdateExternalPlugins) {
                                    onUpdateExternalPlugins(externalPlugins.map(p => 
                                      p.id === plugin.id ? { ...p, config: { ...p.config, reviewGate: !p.config.reviewGate } } : p
                                    ));
                                  }
                                }}
                                className={`p-1 rounded-lg transition-all ${plugin.config.reviewGate ? 'text-blue-400' : 'text-gray-600'}`}
                              >
                                {plugin.config.reviewGate ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-blue-600/5 border border-blue-500/10 rounded-2xl flex items-start gap-3">
                  <Activity className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    External plugins run in a <span className="text-blue-400 font-bold">Hardened Sandbox</span>. All actions are monitored by the Sentinel Guardian and subject to Security Division policies.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-gray-900/30 border-t border-white/5 flex justify-end">
                <button 
                  onClick={() => setIsAgentSettingsOpen(false)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20"
                >
                  Save Configuration
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sandbox Context Panel */}
      <motion.div 
        initial={false}
        animate={{ width: isSandboxPanelOpen ? 280 : 0 }}
        className="bg-gray-900 border-l border-white/10 flex flex-col relative overflow-hidden"
      >
        <button 
          onClick={() => setIsSandboxPanelOpen(!isSandboxPanelOpen)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-1 bg-gray-900 border border-white/10 rounded-full text-gray-500 hover:text-white z-20"
        >
          {isSandboxPanelOpen ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

        <div className="w-[280px] flex flex-col h-full">
          <div className="p-4 border-b border-white/10 bg-gray-900/50">
            <div className="flex items-center gap-2 mb-1">
              <Box className="w-4 h-4 text-blue-500" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-white">Sandbox Context</h2>
            </div>
            <p className="text-[10px] text-gray-500">Isolated environment for this session.</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
            {/* Status Metrics */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                <span>Environment</span>
                <Activity className="w-3 h-3" />
              </div>
              <div className="space-y-2">
                <div className="bg-gray-950/50 border border-white/5 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-gray-400">Sandbox ID</span>
                    <span className="text-[10px] font-mono text-blue-400">{tabId.slice(-8)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Security Level</span>
                    <div className="flex items-center gap-1 text-green-500">
                      <Shield className="w-3 h-3" />
                      <span className="text-[10px] font-bold">Hardened</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tool Management */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                <span>Active Tools</span>
                <Puzzle className="w-3 h-3" />
              </div>
              <div className="space-y-1.5">
                {availableExtensions.map((ext) => (
                  <button
                    key={ext.id}
                    onClick={() => toggleExtension(ext.id)}
                    className={`
                      w-full flex items-center gap-3 p-2 rounded-lg border transition-all text-left
                      ${activeExtensionIds.includes(ext.id) 
                        ? 'bg-blue-600/10 border-blue-500/30 text-white' 
                        : 'bg-gray-950/30 border-white/5 text-gray-500 hover:border-white/10'}
                    `}
                  >
                    <ext.icon className={`w-3.5 h-3.5 ${activeExtensionIds.includes(ext.id) ? 'text-blue-400' : ''}`} />
                    <span className="text-xs font-medium flex-1 truncate">{ext.name}</span>
                    {activeExtensionIds.includes(ext.id) && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Context Footer */}
          <div className="p-4 border-t border-white/10 bg-gray-900/50">
            <div className="flex items-center gap-2 text-gray-500">
              <Cpu className="w-3 h-3" />
              <span className="text-[10px] font-medium">Memory: 128MB / 512MB</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
