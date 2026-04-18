import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Music, 
  Play, 
  Pause, 
  Save, 
  Download, 
  Sliders, 
  Waves, 
  Volume2,
  Mic2,
  Sparkles,
  Zap
} from 'lucide-react';
import { UIMode } from '../../types';

export function SoundForge({ uiMode }: { uiMode?: UIMode }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [tracks, setTracks] = useState([
    { id: '1', title: 'Celestial Ambient', duration: '0:45', mood: 'Ethereal', status: 'ready' },
    { id: '2', title: 'Industrial Pulse', duration: '1:20', mood: 'Aggressive', status: 'ready' }
  ]);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      const newTrack = {
        id: Date.now().toString(),
        title: prompt.slice(0, 20) + '...',
        duration: '0:30',
        mood: 'Custom',
        status: 'ready'
      };
      setTracks([newTrack, ...tracks]);
      setIsGenerating(false);
      setPrompt('');
    }, 3000);
  };

  return (
    <div className={`h-full bg-[#08080a] flex flex-col font-sans overflow-hidden ${uiMode === 'browser' ? 'pb-32 md:pb-0' : ''}`}>
      {/* Header */}
      <header className="h-16 bg-gray-900/50 border-b border-white/5 flex items-center justify-between px-6 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-600/10 rounded-xl">
            <Music className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Sovereign Sound Forge</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">High-Fidelity Audio Synthesis</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-nowrap">Substrate: Online</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Workspace */}
        <main className="flex-1 flex flex-col p-8 overflow-y-auto no-scrollbar">
          {/* Generation Input */}
          <div className="max-w-3xl w-full mx-auto space-y-6">
            <div className="p-8 bg-gray-900/50 border border-white/5 rounded-3xl space-y-6 backdrop-blur-sm">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Vibe Manifest (Prompt)</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the mood, instruments, and tempo... (e.g., Dark cinematic techno with heavy bass and ethereal pads)"
                  className="w-full h-32 bg-gray-950 border border-white/5 rounded-2xl p-6 text-sm text-white outline-none focus:border-blue-500 transition-all resize-none placeholder:text-gray-700"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl">
                    <Sliders className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Advanced Settings</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl">
                    <Waves className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">44.1kHz / 24-bit</span>
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-2xl ${
                    isGenerating ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <Zap className="w-4 h-4 animate-spin" />
                      Forging...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Audio
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Recent Tracks */}
            <div className="space-y-4 pt-8">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Recent Synthesis</h3>
              <div className="grid grid-cols-1 gap-3">
                <AnimatePresence>
                  {tracks.map((track) => (
                    <motion.div 
                      key={track.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group flex items-center justify-between p-4 bg-gray-900/30 border border-white/5 rounded-2xl hover:bg-gray-900/50 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <button className="p-3 bg-blue-600/10 text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                          <Play className="w-4 h-4" />
                        </button>
                        <div>
                          <h4 className="text-xs font-bold text-white">{track.title}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">{track.duration}</span>
                            <div className="w-1 h-1 rounded-full bg-gray-800" />
                            <span className="text-[9px] text-blue-500 uppercase tracking-widest font-bold">{track.mood}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-500 hover:text-white transition-colors">
                          <Save className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-white transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </main>

        {/* Sidebar - Audio Profile */}
        <aside className="w-80 border-l border-white/5 bg-gray-900/30 p-8 space-y-8 overflow-y-auto no-scrollbar">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Mastering Profile</h3>
            <div className="p-6 bg-gray-950 border border-white/5 rounded-3xl space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Gain</span>
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">0.0 dB</span>
                </div>
                <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-blue-600" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Reverb</span>
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">45%</span>
                </div>
                <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                  <div className="h-full w-[45%] bg-blue-600" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Width</span>
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">100%</span>
                </div>
                <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sovereign Agent</h3>
            <div className="p-6 bg-blue-600/5 border border-blue-600/20 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Mic2 className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-[11px] font-bold text-white uppercase tracking-widest">The Sound Engineer</span>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed">
                Level 3 Contractor active. Ready to manifest your vibe into high-fidelity audio.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
