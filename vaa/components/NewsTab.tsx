import React, { useState } from "react";
import { 
  RefreshCw, 
  MoreVertical, 
  Sparkles, 
  Plus, 
  Shield, 
  Share2, 
  X,
  Bookmark,
  ChevronDown,
  ExternalLink,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NewsCard } from "../../src/types";
import { toast } from "sonner";

interface NewsTabProps {
  onShowMenu: () => void;
  showMenu: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
  onOpenFilter: () => void;
  showSwipeView: boolean;
  setShowSwipeView: (show: boolean) => void;
}

export const NewsTab: React.FC<NewsTabProps> = ({ 
  onShowMenu, 
  showMenu, 
  menuRef, 
  onOpenFilter,
  showSwipeView,
  setShowSwipeView
}) => {
  const [newsCards] = useState<NewsCard[]>([
    {
      id: "1",
      title: "Sovereign Audit: Node-7 Bulkhead Warning",
      summary: "Resident Agent detected structural metadata drift in the isolated security layer.",
      fullContent: "The Sovereign Kernel detected an anomaly in Node-7. Log analysis suggests a potential collision in memory-mapped I/O. As chairman, you are advised to ratify the 'Security Patch 8004'. This affecting your local private cloud stability.",
      source: "Resident Sentinel",
      timestamp: "Now",
      category: "Critical"
    },
    {
      id: "2",
      title: "Market Metabolism: DeFi Pulse Up 12%",
      summary: "Your identified assets in the TRON substrate are showing high yield indicators.",
      fullContent: "Automated analysis of your linked DeFi wallets shows a 12.4% increase in liquidity returns. The Strategic Analyst recommends re-balancing the 'Alpha-1' portfolio to capture current metabolic peaks.",
      source: "Strategic Analyst",
      timestamp: "12m ago",
      category: "Metabolism"
    },
    {
      id: "3",
      title: "Llama 3.2: Edge Optimized Release",
      summary: "New mobile-first weights available for Spore deployment.",
      fullContent: "Meta has released Llama 3.2 1B and 3B models. These are specifically optimized for hardware like your current mobile edge device. They can be 'hatched' in the Loader tab for zero-latency local reasoning.",
      source: "GitHub Sentinel",
      timestamp: "2h ago",
      category: "Models"
    }
  ]);

  const [selectedNews, setSelectedNews] = useState<NewsCard | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCardTap = (card: NewsCard) => {
    setSelectedNews(card);
    setShowDetails(false);
  };

  const handleCloseArticle = () => {
    setSelectedNews(null);
    setShowDetails(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Layer 1: The Dispatch (Main Home View) */}
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">The Dispatch</h2>
            <p className="text-xs font-bold text-slate-900 uppercase tracking-tighter">Top Urgent Briefs</p>
          </div>
          <div className="flex items-center gap-4 relative">
            <RefreshCw className="w-4 h-4 text-indigo-600 animate-[spin_3s_linear_infinite]" />
            <button onClick={onShowMenu}>
              <MoreVertical className="w-5 h-5 text-slate-400 hover:text-indigo-600 transition-colors" />
            </button>

            <AnimatePresence>
              {showMenu && (
                <motion.div 
                  ref={menuRef}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-8 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-50"
                >
                  {[
                    { label: "Mute Briefing", action: () => {} },
                    { label: "Dispatch Filter", action: onOpenFilter },
                    { label: "Purge Archive", action: () => {} }
                  ].map(item => (
                    <button 
                      key={item.label} 
                      onClick={item.action}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Horizontal Mini-Card Dispatch */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 snap-x">
          {newsCards.map(card => (
            <div 
              key={card.id}
              onClick={() => handleCardTap(card)}
              className="flex-shrink-0 w-[160px] h-[220px] bg-white rounded-3xl p-5 flex flex-col justify-between border border-slate-100 shadow-sm active:scale-95 transition-all snap-start relative group"
            >
              <div className="space-y-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                  card.category === 'Critical' ? 'bg-red-50 border-red-100 text-red-500' : 
                  card.category === 'Metabolism' ? 'bg-green-50 border-green-100 text-green-500' :
                  'bg-indigo-50 border-indigo-100 text-indigo-500'
                }`}>
                  <Zap className="w-4 h-4 fill-current" />
                </div>
                <h3 className="text-sm font-black text-slate-900 leading-tight uppercase tracking-tight line-clamp-4">
                  {card.title}
                </h3>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] font-black text-slate-400 tracking-[0.2em] uppercase">{card.category}</span>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{card.timestamp}</p>
              </div>
            </div>
          ))}
          
          <div className="flex-shrink-0 w-[140px] h-[220px] bg-slate-50 rounded-3xl flex flex-col items-center justify-center gap-3 border border-dashed border-slate-200 text-slate-400 snap-start">
            <Plus className="w-6 h-6" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Full Archive</span>
          </div>
        </div>
      </div>

      {/* Standard Vertical Intelligence Stream (Background) */}
      {!selectedNews && (
        <div className="flex-1 overflow-y-auto px-6 space-y-8 no-scrollbar pb-20">
          <div className="pt-2">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Metabolic Stream</h3>
            <div className="space-y-8">
              {[
                { name: "Sovereign Sentinel", icon: <Shield className="w-4 h-4 text-white" />, desc: "Bulkhead stability confirmed in all containers.", time: "18:20", color: "bg-slate-900" },
                { name: "The Librarian", icon: <Bookmark className="w-4 h-4 text-white" />, desc: "5 new knowledge nodes indexed in archive.", time: "16:45", color: "bg-indigo-600" },
                { name: "Chief Editor", icon: <Share2 className="w-4 h-4 text-white" />, desc: "Drafting the morning briefing for ratification.", time: "14:30", color: "bg-wa-accent" }
              ].map(item => (
                <div key={item.name} className="flex gap-4 group">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${item.color}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 py-1 border-b border-slate-50 transition-colors group-hover:border-indigo-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{item.name}</span>
                      <span className="text-[9px] font-bold text-slate-400">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal line-clamp-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Layer 2: Immersive Intelligence Briefing (Full Screen) */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[150] flex flex-col p-8 pb-32"
          >
            <div className="max-w-xl mx-auto w-full h-full flex flex-col">
              <div className="flex-1 flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-600 text-white p-2 rounded-xl">
                      <Zap className="w-5 h-5 fill-white" />
                    </div>
                    <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em]">{selectedNews.category}</span>
                  </div>
                  <h1 className="text-4xl font-black text-slate-900 leading-[1.1] tracking-tighter uppercase">
                    {selectedNews.title}
                  </h1>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>{selectedNews.source}</span>
                    <span>•</span>
                    <span>{selectedNews.timestamp}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-xl font-bold text-slate-800 leading-relaxed uppercase tracking-tight italic">
                    "{selectedNews.summary}"
                  </p>
                  
                  {/* Layer 3 Expansion (More Details) */}
                  <AnimatePresence>
                    {showDetails && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 border-t border-slate-100 text-base text-slate-600 leading-relaxed space-y-4 pb-20">
                          {selectedNews.fullContent.split('. ').map((p, i) => (
                            <p key={i}>{p}.</p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Action Bar (Bottom Overlay) */}
              <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 p-6 z-[160]">
                <div className="max-w-xl mx-auto grid grid-cols-4 gap-4">
                  <button 
                    onClick={() => toast.success("Dispatch pinned to Neural Archive (The Librarian notified).")}
                    className="flex flex-col items-center gap-2 group active:scale-95 transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-yellow-50 group-hover:text-yellow-600 group-hover:border-yellow-200">
                      <Bookmark className="w-5 h-5" />
                    </div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Archive</span>
                  </button>
                  <button 
                    onClick={() => toast.success("Article forwarded to My Notes (Nucleus Buffer).")}
                    className="flex flex-col items-center gap-2 group active:scale-95 transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-200">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Share</span>
                  </button>
                  <button 
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex flex-col items-center gap-2 group active:scale-95 transition-all"
                  >
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
                      showDetails ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'
                    }`}>
                      <ChevronDown className={`w-5 h-5 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
                    </div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{showDetails ? 'Brief' : 'Details'}</span>
                  </button>
                  <button 
                    onClick={handleCloseArticle}
                    className="flex flex-col items-center gap-2 group active:scale-95 transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-red-500 group-hover:border-red-200">
                      <X className="w-5 h-5" />
                    </div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Close</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layer 4: Full Swipe able Intelligence Briefing (Triggered by News FAB) */}
      <AnimatePresence>
        {showSwipeView && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-slate-900 border-x border-white/10 z-[200] flex flex-col"
            style={{ top: '72px', bottom: '72px' }}
          >
            <div className="flex-1 overflow-x-auto snap-x snap-mandatory no-scrollbar flex">
              {newsCards.map(card => (
                <div key={card.id} className="h-full w-full flex-shrink-0 snap-start flex flex-col p-10 space-y-8 bg-slate-900 text-white relative">
                  <div className="space-y-4">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">{card.category}</span>
                    <h1 className="text-4xl font-black leading-tight uppercase tracking-tighter">{card.title}</h1>
                    <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
                      <span>{card.source}</span>
                      <span className="w-1 h-1 bg-white/20 rounded-full" />
                      <span>{card.timestamp}</span>
                    </div>
                  </div>
                  <div className="flex-1 text-slate-300 leading-relaxed text-lg space-y-6 overflow-y-auto no-scrollbar font-sans border-l border-white/5 pl-6">
                    <p className="font-bold text-white uppercase tracking-tight italic">"{card.summary}"</p>
                    {card.fullContent.split('. ').map((p, i) => (
                      <p key={i} className="text-base text-white/70">{p}.</p>
                    ))}
                  </div>
                  
                  {/* Action Bar for Swipe View */}
                  <div className="flex items-center gap-4 pt-8">
                    <button className="flex-1 py-5 bg-white text-slate-900 rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-transform">
                      <Share2 className="w-4 h-4" />
                      Dispatch to Agent
                    </button>
                    <button 
                      onClick={() => setShowSwipeView(false)}
                      className="w-16 h-16 bg-slate-800 text-white rounded-[2rem] flex items-center justify-center border border-white/10 active:scale-95 transition-transform"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
;
