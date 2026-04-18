import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  Terminal, 
  Video, 
  Phone, 
  MoreVertical, 
  ShieldCheck, 
  Share2, 
  Smile, 
  Paperclip, 
  Zap, 
  Camera, 
  Mic,
  Mail,
  User,
  Send,
  X,
  Bell,
  Trash2,
  Download,
  Info,
  Shield,
  Cpu,
  Globe,
  ChevronRight,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CelestialChat } from "../../src/types";
import { toast } from "sonner";

interface ChatViewProps {
  chat: CelestialChat;
  onBack: () => void;
  onShowMenu: () => void;
  onOpenCommandCenter: () => void;
  onSendMessage: (content: string) => void;
  showMenu: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
}

export const ChatView: React.FC<ChatViewProps> = ({ 
  chat, 
  onBack, 
  onShowMenu, 
  onOpenCommandCenter,
  onSendMessage,
  showMenu, 
  menuRef 
}) => {
  const [input, setInput] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const isSentinel = chat.isSentinel || chat.type === 'sentinel';
  const isOmega = chat.isHeadAgent;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  const menuItems = [
    ...(isSentinel || isOmega ? [{ label: "Command Center", action: onOpenCommandCenter, highlight: true }] : []),
    { label: "Media, Links, and Docs", action: () => toast.info("Opening Media Archive...") },
    { label: "Search", action: () => setIsSearchMode(true) },
    { label: "Add to List", action: () => toast.info("Select Category to add...") },
    { label: "Export Chat", action: () => toast.success("Manifest generated and ready for download.") },
    { label: "Mute Notifications", action: () => toast.info("Notifications muted for this agent.") },
    { label: "Wallpaper", action: () => toast.info("Opening Wallpaper Gallery...") },
    { label: "More", action: () => toast.info("Loading extended agent settings...") }
  ];

  const filteredMessages = chat.messages.filter(m => 
    m.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      {/* Chat Header */}
      <div className="bg-indigo-600 text-white p-4 flex items-center gap-3 shadow-md z-[100]">
        {isSearchMode ? (
          <div className="flex-1 flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-white/70" />
            <input 
              autoFocus
              type="text"
              placeholder="Search in chat..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => { setIsSearchMode(false); setSearchQuery(""); }}>
              <X className="w-4 h-4 text-white/70 hover:text-white" />
            </button>
          </div>
        ) : (
          <>
            <button onClick={onBack} className="hover:bg-white/10 p-1 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <div 
              className="flex-1 flex items-center gap-3 cursor-pointer hover:bg-white/5 p-1 -m-1 rounded-xl transition-colors min-w-0"
              onClick={() => setShowProfile(true)}
            >
              <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold border border-white/10 overflow-hidden flex-shrink-0">
                {chat.type === 'gmail' ? <Mail className="w-5 h-5" /> : isSentinel ? <Terminal className="w-5 h-5" /> : isOmega ? "Ω" : <User className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate text-lg leading-tight">{chat.name}</h3>
                <p className="text-[9px] font-bold text-white/70 uppercase tracking-widest">
                  {chat.isSelf ? "Private Scratchpad (Nucleus Buffer)" : isSentinel ? "System Monitoring Active" : isOmega ? "Sovereign Brain Active" : "Celestial Engine Active"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 relative">
              {!isSentinel && !chat.isSelf && (
                <>
                  <Video className="w-6 h-6 text-white/90 cursor-pointer hover:text-white transition-colors" />
                  <button onClick={() => setIsCalling(true)}>
                    <Phone className="w-5 h-5 text-white/90 cursor-pointer hover:text-white transition-colors" />
                  </button>
                </>
              )}
              <button onClick={onShowMenu}>
                <MoreVertical className="w-6 h-6 text-white/90" />
              </button>

              <AnimatePresence>
                {showMenu && (
                  <motion.div 
                    ref={menuRef}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-10 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-[110]"
                  >
                    {menuItems.map((item, i) => (
                      <button 
                        key={i} 
                        onClick={() => {
                          item.action();
                          onShowMenu(); // Close menu
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl transition-colors ${
                          item.highlight ? "text-indigo-600 bg-indigo-50 hover:bg-indigo-100 mb-1" : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#e5ddd5] relative z-0">
        {/* WhatsApp Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")' }}></div>
        
        <div className="flex justify-center relative z-10 mb-4">
          <span className="bg-white/70 backdrop-blur-sm text-slate-600 text-[10px] font-bold px-4 py-1 rounded-lg uppercase tracking-widest shadow-sm">
            {isSentinel ? "Live System Logs" : "Solar Cycle 2024.05"}
          </span>
        </div>

        {(isSearchMode ? filteredMessages : chat.messages).map((msg, idx) => (
          <div 
            key={idx}
            className={`flex relative z-10 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-2.5 rounded-xl text-sm shadow-sm relative group ${
              msg.role === 'user' 
                ? 'bg-[#dcf8c6] text-slate-800 rounded-tr-none' 
                : 'bg-white text-slate-800 rounded-tl-none'
            }`}>
              {/* Bubble Tail */}
              <div className={`absolute top-0 w-2 h-3 ${
                msg.role === 'user' 
                  ? '-right-2 bg-[#dcf8c6]' 
                  : '-left-2 bg-white'
              }`} style={{ clipPath: msg.role === 'user' ? 'polygon(0 0, 0 100%, 100% 0)' : 'polygon(100% 0, 100% 100%, 0 0)' }}></div>

              <div className="pr-12">
                {msg.content}
              </div>
              
              {msg.sanitizationReport && (
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-2">
                  <div className="p-1 bg-green-50 text-green-600 rounded-md">
                    <ShieldCheck className="w-3 h-3" />
                  </div>
                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                    Sanitized: {msg.sanitizationReport.pixels} Pixels • {msg.sanitizationReport.links} Links
                  </div>
                </div>
              )}

              <div className={`text-[9px] absolute bottom-1.5 right-2 ${msg.role === 'user' ? 'text-slate-500' : 'text-slate-400'}`}>
                12:46 PM
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-[#f0f2f5] flex items-end gap-2">
        {isSentinel ? (
          <div className="flex-1 bg-white border border-slate-200 rounded-2xl px-6 py-3 flex items-center justify-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Sentinel Feed: Read Only</span>
          </div>
        ) : (
          <>
            <div className="flex-1 bg-white rounded-2xl px-3 py-2 flex items-end gap-2 shadow-sm">
              <Smile className="w-6 h-6 text-slate-500 mb-1 cursor-pointer" />
              <textarea 
                ref={textareaRef}
                rows={1}
                placeholder="Type a message"
                className="flex-1 bg-transparent outline-none text-[15px] text-slate-800 py-1 resize-none max-h-[150px]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <div className="flex items-center gap-3 mb-1">
                <Paperclip className="w-5 h-5 text-slate-500 cursor-pointer -rotate-45" />
                <Zap className="w-5 h-5 text-indigo-600 cursor-pointer" />
                <Camera className="w-5 h-5 text-slate-500 cursor-pointer" />
              </div>
            </div>
            <button 
              onClick={handleSend}
              className="w-12 h-12 bg-indigo-600 text-white rounded-full shadow-md flex items-center justify-center flex-shrink-0 hover:bg-indigo-700 transition-colors"
            >
              {input.trim() ? <Send className="w-5 h-5 ml-0.5" /> : <Mic className="w-6 h-6" />}
            </button>
          </>
        )}
      </div>

      {/* Voice AI Overlay */}
      <AnimatePresence>
        {isCalling && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-indigo-900/95 z-50 flex flex-col items-center justify-center text-white p-8"
          >
            <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center mb-8 relative">
              <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-ping"></div>
              <div className="text-4xl font-bold">{isOmega ? "Ω" : chat.name[0]}</div>
            </div>
            <h2 className="text-2xl font-bold mb-2">{chat.name}</h2>
            <p className="text-indigo-300 font-medium mb-12">Sovereign Voice Link Active...</p>
            
            {/* Visualizer Placeholder */}
            <div className="flex items-center gap-1 h-12 mb-24">
              {[1,2,3,4,5,6,7,8].map(i => (
                <motion.div 
                  key={i}
                  animate={{ height: [10, 40, 10] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                  className="w-1.5 bg-white rounded-full"
                />
              ))}
            </div>

            <button 
              onClick={() => setIsCalling(false)}
              className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-red-600 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Agent Profile View */}
      <AnimatePresence>
        {showProfile && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 bg-slate-50 z-[60] flex flex-col overflow-y-auto no-scrollbar"
          >
            {/* Profile Header */}
            <div className="bg-indigo-600 text-white p-4 flex items-center gap-4 sticky top-0 z-10">
              <button onClick={() => setShowProfile(false)} className="hover:bg-white/10 p-1 rounded-full transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="font-bold text-lg">Agent Profile</h2>
            </div>

            {/* Hero Section */}
            <div className="bg-white p-8 flex flex-col items-center shadow-sm mb-3">
              <div className="w-32 h-32 rounded-full bg-indigo-50 flex items-center justify-center text-5xl font-bold text-indigo-600 border-4 border-white shadow-lg mb-4 overflow-hidden">
                {chat.type === 'gmail' ? <Mail className="w-12 h-12" /> : isSentinel ? <Terminal className="w-12 h-12" /> : isOmega ? "Ω" : <User className="w-12 h-12" />}
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">{chat.name}</h1>
              <p className="text-slate-500 font-medium text-sm">
                {isSentinel ? "System Monitoring Active" : isOmega ? "Sovereign Brain Active" : "Celestial Engine Active"}
              </p>
            </div>

            {/* Details Section */}
            <div className="bg-white p-6 shadow-sm mb-3">
              <h3 className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Mission Description</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                {isOmega 
                  ? "Primary Resident Intelligence. Oversees system health, node orchestration, and treasury management. Authorized for high-level OS commands and ratification oversight."
                  : isSentinel 
                  ? "Automated security sentinel. Monitors kernel logs, network bulkheads, and adversarial patterns. Reports directly to the Chairman and Cloud Manager."
                  : chat.lastMessage || "Celestial agent assigned to specific departmental workflows. Operating under standard Sovereign protocols."}
              </p>
            </div>

            {/* Technical Metadata */}
            <div className="bg-white shadow-sm mb-3">
              <div className="p-4 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Node ID</p>
                    <p className="text-[10px] font-mono text-slate-500">{chat.id.toUpperCase()}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
              <div className="p-4 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Clearance Level</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{isOmega ? "Sovereign (L1)" : "Specialized (L3)"}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Network Scoping</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Encrypted Sovereign Link</p>
                  </div>
                </div>
                <ShieldCheck className="w-4 h-4 text-green-500" />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow-sm mb-8">
              <button className="w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors border-b border-slate-50">
                <Bell className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-bold text-slate-700">Mute Notifications</span>
              </button>
              <button className="w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors border-b border-slate-50">
                <Download className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-bold text-slate-700">Export Manifest</span>
              </button>
              <button className="w-full p-4 flex items-center gap-4 hover:bg-red-50 transition-colors text-red-500">
                <Trash2 className="w-5 h-5" />
                <span className="text-sm font-bold">Clear Chat History</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
