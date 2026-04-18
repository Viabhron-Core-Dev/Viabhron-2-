import React, { useState } from 'react';
import { 
  Layout, 
  Code2, 
  Eye, 
  Maximize2, 
  Download, 
  Share2, 
  RefreshCw,
  Layers,
  Component
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UIMode } from '../../types';

interface Artifact {
  id: string;
  title: string;
  type: 'react' | 'html' | 'markdown' | 'chart' | 'diagram';
  content: string;
  version: number;
  timestamp: Date;
}

export function Artifacts({ tabId, userId, uiMode }: { tabId: string, userId?: string, uiMode?: UIMode }) {
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [artifacts, setArtifacts] = useState<Artifact[]>([
    {
      id: '1',
      title: 'System Dashboard Prototype',
      type: 'react',
      content: '// React component code here...',
      version: 1,
      timestamp: new Date()
    }
  ]);

  return (
    <div className="h-full flex flex-col bg-gray-950 overflow-hidden">
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-gray-900/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600/20 flex items-center justify-center">
            <Component className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-tight">Generative Artifacts</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Live UI Sandbox</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-gray-950 rounded-xl p-1 border border-white/5">
            <button 
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${viewMode === 'preview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Eye className="w-3 h-3" />
              Preview
            </button>
            <button 
              onClick={() => setViewMode('code')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${viewMode === 'code' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Code2 className="w-3 h-3" />
              Code
            </button>
          </div>
          <div className="w-px h-4 bg-white/10 mx-2" />
          <button className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Artifact List */}
        <aside className="w-64 border-r border-white/5 bg-gray-900/30 overflow-y-auto no-scrollbar">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">History</h3>
              <button className="text-gray-600 hover:text-blue-400">
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {artifacts.map((art) => (
                <button 
                  key={art.id}
                  onClick={() => setActiveArtifact(art)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all group ${activeArtifact?.id === art.id ? 'bg-blue-600/10 border-blue-500/30' : 'bg-gray-950/50 border-white/5 hover:border-white/10'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${art.type === 'react' ? 'bg-blue-400' : 'bg-green-400'}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${activeArtifact?.id === art.id ? 'text-blue-400' : 'text-gray-500'}`}>
                      {art.type}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-gray-200 group-hover:text-white truncate">{art.title}</div>
                  <div className="text-[9px] text-gray-600 mt-1">v{art.version} • {art.timestamp.toLocaleTimeString()}</div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Preview Area */}
        <main className="flex-1 bg-gray-950 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {viewMode === 'preview' ? (
              <motion.div 
                key="preview"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="h-full flex items-center justify-center p-8"
              >
                <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center text-gray-400">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-gray-100 flex items-center justify-center mx-auto">
                      <Eye className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-sm font-medium">Artifact Preview Sandbox</p>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto">
                      This is where generative UI components are rendered. 
                      The Head Agent can push updates here in real-time.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="code"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full p-6"
              >
                <div className="h-full bg-gray-900 rounded-3xl border border-white/5 p-6 font-mono text-xs text-blue-300 overflow-y-auto no-scrollbar">
                  <pre>{activeArtifact?.content || '// No artifact selected'}</pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button className={`absolute ${uiMode === 'browser' ? 'bottom-32 md:bottom-6' : 'bottom-6'} right-6 w-10 h-10 rounded-2xl bg-gray-900 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-2xl`}>
            <Maximize2 className="w-4 h-4" />
          </button>
        </main>
      </div>
    </div>
  );
}
