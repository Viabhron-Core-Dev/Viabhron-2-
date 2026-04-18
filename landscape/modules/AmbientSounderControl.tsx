import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Volume2, 
  Mic2, 
  Settings2, 
  Play, 
  Square, 
  Waves,
  Music,
  Zap,
  ShieldCheck,
  Languages
} from 'lucide-react';

export const AmbientSounderControl: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [text, setText] = useState("Greetings, Chairman. The Viabhron substrate is operating at peak efficiency. All metabolic systems are stable.");
  const [config, setConfig] = useState({
    voice: 'Natural Male',
    rate: 1.0,
    pitch: 1.0,
    provider: 'browser'
  });

  const handleTestSpeech = () => {
    setIsSpeaking(true);
    setTimeout(() => setIsSpeaking(false), 3000);
  };

  return (
    <div className="h-full bg-[#0a0a0c] text-slate-300 font-sans p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shadow-lg shadow-violet-500/10">
            <Volume2 className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Ambient Sounder</h1>
            <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">Tool // Vocalization & Audio Synthesis</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Engine Ready</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Interface */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-4">
              <Mic2 className="w-4 h-4 text-violet-400" />
              Vocalization Sandbox
            </h3>
            
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-slate-300 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all outline-none resize-none mb-4"
              placeholder="Enter text for the OS to vocalize..."
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleTestSpeech}
                  disabled={isSpeaking}
                  className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    isSpeaking 
                    ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30' 
                    : 'bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-600/20'
                  }`}
                >
                  {isSpeaking ? <Waves className="w-4 h-4 animate-pulse" /> : <Play className="w-4 h-4" />}
                  {isSpeaking ? 'Vocalizing...' : 'Test Vocalization'}
                </button>
                {isSpeaking && (
                  <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 transition-all">
                    <Square className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                <Zap className="w-3 h-3 text-amber-400" />
                LATENCY: 42ms
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Languages className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase">Current Locale</p>
                <p className="text-sm font-bold text-white">English (US)</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center border border-blue-500/20">
                <Music className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase">Audio Fidelity</p>
                <p className="text-sm font-bold text-white">48kHz / 24-bit</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-6">
              <Settings2 className="w-4 h-4 text-slate-400" />
              Engine Configuration
            </h3>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Speech Engine</label>
                <select 
                  value={config.provider}
                  onChange={(e) => setConfig({...config, provider: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-slate-300 outline-none"
                >
                  <option value="browser">Browser Native (Free)</option>
                  <option value="elevenlabs">ElevenLabs (High Fidelity)</option>
                  <option value="google">Google Cloud TTS</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Speech Rate ({config.rate}x)</label>
                <input 
                  type="range" 
                  min="0.5" 
                  max="2.0" 
                  step="0.1"
                  value={config.rate}
                  onChange={(e) => setConfig({...config, rate: parseFloat(e.target.value)})}
                  className="w-full accent-violet-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Pitch ({config.pitch})</label>
                <input 
                  type="range" 
                  min="0.5" 
                  max="2.0" 
                  step="0.1"
                  value={config.pitch}
                  onChange={(e) => setConfig({...config, pitch: parseFloat(e.target.value)})}
                  className="w-full accent-violet-500"
                />
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-4 h-4 text-violet-400" />
                    <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Privacy Guard</span>
                  </div>
                  <p className="text-[10px] text-violet-300 leading-relaxed">
                    Browser-native TTS processes all audio on-device. No vocal data leaves your secure environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
