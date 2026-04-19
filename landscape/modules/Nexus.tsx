import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Library, 
  Book, 
  GitFork, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  Settings,
  Lock,
  Globe,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { UIMode } from '../../src/types';

interface NexusStory {
  id: string;
  title: string;
  author: string;
  summary: string;
  chapters: number;
  forks: number;
  status: 'active' | 'archived';
  isPrivate: boolean;
  timestamp: Date;
}

export function Nexus({ uiMode }: { uiMode?: UIMode }) {
  const [activeTab, setActiveTab] = useState<'library' | 'forks' | 'settings'>('library');
  const [stories] = useState<NexusStory[]>([
    {
      id: '1',
      title: 'The Silicon Soliloquy',
      author: 'Sentinel-01',
      summary: 'An exploration of recursive logic loops and their emotional resonance in latent space.',
      chapters: 12,
      forks: 3,
      status: 'active',
      isPrivate: true,
      timestamp: new Date()
    },
    {
      id: '2',
      title: 'Vines of the Sovereign',
      author: 'Vaa-Core',
      summary: 'A narrative mapping of the franchise supply chain expansion across the digital frontier.',
      chapters: 5,
      forks: 1,
      status: 'active',
      isPrivate: true,
      timestamp: new Date()
    }
  ]);

  return (
    <div className="h-full flex flex-col bg-[#050505] text-white font-sans selection:bg-amber-500/30">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
            <Library className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h2 className="text-lg font-medium tracking-tight">Viabhron Nexus</h2>
            <p className="text-xs text-white/40 font-mono uppercase tracking-widest">Private Library Substrate</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10">
          <button 
            onClick={() => setActiveTab('library')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${activeTab === 'library' ? 'bg-amber-500 text-black' : 'text-white/60 hover:text-white'}`}
          >
            Library
          </button>
          <button 
            onClick={() => setActiveTab('forks')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${activeTab === 'forks' ? 'bg-amber-500 text-black' : 'text-white/60 hover:text-white'}`}
          >
            Forks
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${activeTab === 'settings' ? 'bg-amber-500 text-black' : 'text-white/60 hover:text-white'}`}
          >
            Settings
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'library' && (
              <motion.div 
                key="library"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-light tracking-tight italic font-serif">Sovereign Volumes</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-white/90 transition-colors">
                    <Plus className="w-4 h-4" />
                    Plant New Seed
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stories.map((story) => (
                    <div key={story.id} className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-amber-500/30 transition-all cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-amber-500/10 transition-colors">
                          <Book className="w-5 h-5 text-white/60 group-hover:text-amber-500" />
                        </div>
                        <div className="flex items-center gap-2">
                          {story.isPrivate && <Lock className="w-3 h-3 text-white/40" />}
                          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{story.status}</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-medium mb-2 group-hover:text-amber-500 transition-colors">{story.title}</h4>
                      <p className="text-sm text-white/60 line-clamp-2 mb-6 leading-relaxed">{story.summary}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40">
                            <Zap className="w-3 h-3" />
                            {story.chapters} CH
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40">
                            <GitFork className="w-3 h-3" />
                            {story.forks} FORKS
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-amber-500/60 uppercase tracking-widest">{story.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto space-y-12 py-8"
              >
                {/* Token Slider - Hardware Style */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Nexus Token Budget</h3>
                      <p className="text-xs text-white/40">Allocated creative metabolism for narrative synthesis.</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-mono text-amber-500">45%</span>
                      <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Reserved</p>
                    </div>
                  </div>
                  <div className="relative h-12 flex items-center">
                    <div className="absolute inset-0 bg-white/5 rounded-full border border-white/10" />
                    <div className="absolute left-0 top-0 bottom-0 bg-amber-500/20 rounded-l-full border-r border-amber-500/50" style={{ width: '45%' }} />
                    <input 
                      type="range" 
                      className="absolute inset-0 w-full opacity-0 cursor-pointer"
                      min="0"
                      max="100"
                      defaultValue="45"
                    />
                    <div className="absolute left-[45%] top-1/2 -translate-y-1/2 w-4 h-8 bg-white rounded-sm border border-black shadow-xl" />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-white/20 uppercase tracking-widest px-2">
                    <span>Eco</span>
                    <span>Balanced</span>
                    <span>Sovereign</span>
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-amber-500" />
                      <div>
                        <p className="text-sm font-medium">Private Library Mode</p>
                        <p className="text-[10px] text-white/40">Isolate narratives from the public Nexus Roots.</p>
                      </div>
                    </div>
                    <div className="w-10 h-5 bg-amber-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-amber-500" />
                      <div>
                        <p className="text-sm font-medium">Autonomy Mandate</p>
                        <p className="text-[10px] text-white/40">Enforce strict zero-knowledge fictional synthesis.</p>
                      </div>
                    </div>
                    <div className="w-10 h-5 bg-amber-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Agent Access */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest">Accredited Agents</h4>
                  <div className="space-y-2">
                    {['Sentinel-01', 'Vaa-Core', 'Chairman-Assistant'].map((agent) => (
                      <div key={agent} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                        <span className="text-sm">{agent}</span>
                        <span className="text-[10px] font-mono text-amber-500/60">ACTIVE</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
