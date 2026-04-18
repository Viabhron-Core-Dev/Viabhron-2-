import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Image as ImageIcon, 
  Sparkles, 
  Download, 
  Save, 
  Maximize2, 
  Layers, 
  Palette,
  Eye,
  Zap,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { UIMode } from '../../types';

export function ImageStudio({ uiMode }: { uiMode?: UIMode }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([
    { id: '1', url: 'https://picsum.photos/seed/viabhron1/800/800', prompt: 'Cyberpunk office in the clouds', status: 'ready' },
    { id: '2', url: 'https://picsum.photos/seed/viabhron2/800/800', prompt: 'Ethereal star node interface', status: 'ready' }
  ]);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      const newImage = {
        id: Date.now().toString(),
        url: `https://picsum.photos/seed/${Date.now()}/800/800`,
        prompt: prompt,
        status: 'ready'
      };
      setImages([newImage, ...images]);
      setIsGenerating(false);
      setPrompt('');
    }, 4000);
  };

  return (
    <div className={`h-full bg-[#08080a] flex flex-col font-sans overflow-hidden ${uiMode === 'browser' ? 'pb-32 md:pb-0' : ''}`}>
      {/* Header */}
      <header className="h-16 bg-gray-900/50 border-b border-white/5 flex items-center justify-between px-6 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-purple-600/10 rounded-xl">
            <ImageIcon className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Sovereign Image Studio</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Rapid Visual Synthesis & Asset Creation</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-nowrap">NPU: Optimized</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Workspace */}
        <main className="flex-1 flex flex-col p-8 overflow-y-auto no-scrollbar">
          <div className="max-w-5xl w-full mx-auto space-y-12">
            {/* Generation Input */}
            <div className="p-8 bg-gray-900/50 border border-white/5 rounded-3xl space-y-6 backdrop-blur-sm">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Visual Manifest (Prompt)</label>
                <div className="relative">
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the visual scene... (e.g., A futuristic command center with holographic displays and neon lighting)"
                    className="w-full h-24 bg-gray-950 border border-white/5 rounded-2xl p-6 pr-16 text-sm text-white outline-none focus:border-purple-500 transition-all resize-none placeholder:text-gray-700"
                  />
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt}
                    className={`absolute right-4 bottom-4 p-4 rounded-xl transition-all ${
                      isGenerating ? 'bg-gray-800 text-gray-600' : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20'
                    }`}
                  >
                    {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl">
                  <Palette className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Style: Cinematic</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl">
                  <Maximize2 className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Aspect: 16:9</span>
                </div>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {images.map((img) => (
                  <motion.div 
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative aspect-square bg-gray-900 rounded-3xl overflow-hidden border border-white/5"
                  >
                    <img 
                      src={img.url} 
                      alt={img.prompt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                      <p className="text-[10px] text-white font-medium leading-relaxed mb-4 line-clamp-2">
                        {img.prompt}
                      </p>
                      <div className="flex items-center gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-[10px] font-bold text-white uppercase tracking-widest transition-all">
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </button>
                        <button className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white transition-all">
                          <Save className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </main>

        {/* Sidebar - Visual Controls */}
        <aside className="w-72 border-l border-white/5 bg-gray-900/30 p-8 space-y-8 overflow-y-auto no-scrollbar">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Synthesis Engine</h3>
            <div className="space-y-2">
              <div className="p-4 bg-gray-950 border border-white/5 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-purple-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-[11px] text-gray-300">Magic Upscale</span>
                </div>
                <div className="w-8 h-4 bg-gray-800 rounded-full relative">
                  <div className="absolute right-1 top-1 w-2 h-2 bg-purple-500 rounded-full" />
                </div>
              </div>
              <div className="p-4 bg-gray-950 border border-white/5 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-purple-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span className="text-[11px] text-gray-300">Layer Separation</span>
                </div>
                <div className="w-8 h-4 bg-gray-800 rounded-full relative">
                  <div className="absolute left-1 top-1 w-2 h-2 bg-gray-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sovereign Agent</h3>
            <div className="p-6 bg-purple-600/5 border border-purple-600/20 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <Eye className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-[11px] font-bold text-white uppercase tracking-widest">Visual Synthesizer</span>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed">
                Level 3 Contractor active. Maintaining brand consistency across all visual assets.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
