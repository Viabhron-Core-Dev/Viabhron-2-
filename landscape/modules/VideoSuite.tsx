import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, 
  Play, 
  Film, 
  Clock, 
  Download, 
  Save, 
  Settings, 
  Sparkles,
  Zap,
  Monitor,
  Scissors,
  Share2
} from 'lucide-react';
import { UIMode } from '../../types';

export function VideoSuite({ uiMode }: { uiMode?: UIMode }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [projects, setProjects] = useState([
    { id: '1', title: 'Brand Intro', duration: '0:05', status: 'ready', thumbnail: 'https://picsum.photos/seed/vid1/400/225' },
    { id: '2', title: 'Product Showcase', duration: '0:12', status: 'ready', thumbnail: 'https://picsum.photos/seed/vid2/400/225' }
  ]);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      const newProject = {
        id: Date.now().toString(),
        title: prompt.slice(0, 15) + '...',
        duration: '0:08',
        status: 'ready',
        thumbnail: `https://picsum.photos/seed/${Date.now()}/400/225`
      };
      setProjects([newProject, ...projects]);
      setIsGenerating(false);
      setPrompt('');
    }, 6000);
  };

  return (
    <div className={`h-full bg-[#08080a] flex flex-col font-sans overflow-hidden ${uiMode === 'browser' ? 'pb-32 md:pb-0' : ''}`}>
      {/* Header */}
      <header className="h-16 bg-gray-900/50 border-b border-white/5 flex items-center justify-between px-6 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-red-600/10 rounded-xl">
            <Video className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Sovereign Video Suite</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Short-Form Animation & Cinematic Sequences</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
            <Monitor className="w-3.5 h-3.5 text-red-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-nowrap">GPU: Accelerated</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Workspace */}
        <main className="flex-1 flex flex-col p-8 overflow-y-auto no-scrollbar">
          <div className="max-w-4xl w-full mx-auto space-y-10">
            {/* Active Preview Area */}
            <div className="aspect-video bg-gray-950 border border-white/5 rounded-[32px] overflow-hidden relative group shadow-2xl">
              <img 
                src="https://picsum.photos/seed/active/1280/720" 
                alt="Preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="p-6 bg-red-600 text-white rounded-full shadow-2xl shadow-red-600/40 hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-current" />
                </button>
              </div>
              
              {/* Timeline Overlay */}
              <div className="absolute bottom-6 left-6 right-6 h-12 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl flex items-center px-6 gap-4">
                <span className="text-[10px] font-mono text-white">00:00 / 00:08</span>
                <div className="flex-1 h-1 bg-white/10 rounded-full relative">
                  <div className="absolute left-0 top-0 h-full w-1/3 bg-red-600 rounded-full" />
                  <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
                </div>
              </div>
            </div>

            {/* Generation Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 p-8 bg-gray-900/50 border border-white/5 rounded-3xl space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Motion Manifest (Prompt)</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the motion and scene... (e.g., A slow drone shot flying over a futuristic city at sunset)"
                    className="w-full h-24 bg-gray-950 border border-white/5 rounded-2xl p-6 text-sm text-white outline-none focus:border-red-500 transition-all resize-none placeholder:text-gray-700"
                  />
                </div>
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt}
                  className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
                    isGenerating ? 'bg-gray-800 text-gray-500' : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20'
                  }`}
                >
                  {isGenerating ? <Zap className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {isGenerating ? 'Synthesizing Motion...' : 'Generate Video'}
                </button>
              </div>

              <div className="p-8 bg-gray-900/50 border border-white/5 rounded-3xl flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-950 border border-white/5 rounded-xl">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">FPS</span>
                      <span className="text-[10px] text-white font-bold">24</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-950 border border-white/5 rounded-xl">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Res</span>
                      <span className="text-[10px] text-white font-bold">1080p</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors">
                  <Settings className="w-3.5 h-3.5" />
                  Advanced
                </button>
              </div>
            </div>

            {/* Project List */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Recent Projects</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <AnimatePresence>
                  {projects.map((project) => (
                    <motion.div 
                      key={project.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group bg-gray-900/30 border border-white/5 rounded-2xl overflow-hidden hover:bg-gray-900/50 transition-all"
                    >
                      <div className="aspect-video relative">
                        <img 
                          src={project.thumbnail} 
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[8px] font-bold text-white uppercase tracking-widest">
                          {project.duration}
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <h4 className="text-[11px] font-bold text-white truncate pr-2">{project.title}</h4>
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </main>

        {/* Sidebar - Tools */}
        <aside className="w-64 border-l border-white/5 bg-gray-900/30 p-8 space-y-8 overflow-y-auto no-scrollbar">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Video Tools</h3>
            <div className="space-y-2">
              <ToolItem icon={Scissors} label="Trim & Cut" />
              <ToolItem icon={Film} label="Transitions" />
              <ToolItem icon={Clock} label="Slow Motion" />
              <ToolItem icon={Save} label="Auto-Save" active />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sovereign Agent</h3>
            <div className="p-6 bg-red-600/5 border border-red-600/20 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-600/20 rounded-lg">
                  <Zap className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-[11px] font-bold text-white uppercase tracking-widest">Visual Synthesizer</span>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed">
                Level 3 Contractor active. Optimizing frame-by-frame motion synthesis.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

const ToolItem = ({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
    active ? 'bg-red-600/10 border-red-600/30 text-white' : 'bg-gray-950 border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300'
  }`}>
    <Icon className="w-4 h-4" />
    <span className="text-[11px] font-bold uppercase tracking-widest">{label}</span>
  </div>
);
