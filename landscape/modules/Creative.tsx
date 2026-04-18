import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Layers, 
  Workflow, 
  Play, 
  Save, 
  Share2, 
  Plus, 
  Trash2, 
  Settings,
  Sparkles,
  Zap,
  Cpu,
  MousePointer2
} from 'lucide-react';
import { UIMode } from '../../types';

interface WorkflowNode {
  id: string;
  title: string;
  type: 'generation' | 'refinement' | 'orchestration' | 'export';
  status: 'idle' | 'running' | 'completed' | 'error';
  agentId: string;
}

export function Creative({ uiMode }: { uiMode?: UIMode }) {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: '1', title: 'Narrative Seed', type: 'generation', status: 'completed', agentId: 'Nexus-Architect' },
    { id: '2', title: 'Visual Synthesis', type: 'generation', status: 'running', agentId: 'Creative-Specialist' },
    { id: '3', title: 'Sovereign Audit', type: 'orchestration', status: 'idle', agentId: 'Guardian' }
  ]);

  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  return (
    <div className={`h-full bg-[#08080a] flex flex-col font-sans overflow-hidden ${uiMode === 'browser' ? 'pb-32 md:pb-0' : ''}`}>
      {/* Header */}
      <header className="h-16 bg-gray-900/50 border-b border-white/5 flex items-center justify-between px-6 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-pink-600/10 rounded-xl">
            <Palette className="w-5 h-5 text-pink-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Sovereign Creative Studio</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Multi-Step Workflow Orchestration</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-pink-600/20">
            <Play className="w-3.5 h-3.5" />
            Run Workflow
          </button>
          <div className="w-px h-6 bg-white/10 mx-2" />
          <button className="p-2 text-gray-500 hover:text-white transition-colors">
            <Save className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-500 hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Tools */}
        <aside className="w-64 border-r border-white/5 bg-gray-900/30 p-6 space-y-8 overflow-y-auto no-scrollbar">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Workflow Blocks</h3>
            <div className="grid grid-cols-1 gap-2">
              <BlockTemplate icon={Sparkles} label="Generation" color="text-pink-400" />
              <BlockTemplate icon={Layers} label="Refinement" color="text-blue-400" />
              <BlockTemplate icon={Workflow} label="Orchestration" color="text-purple-400" />
              <BlockTemplate icon={Zap} label="Export" color="text-orange-400" />
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t border-white/5">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Agents</h3>
            <div className="space-y-2">
              {['Creative-Specialist', 'Nexus-Architect', 'Guardian'].map(agent => (
                <div key={agent} className="flex items-center justify-between p-3 bg-gray-950 border border-white/5 rounded-xl">
                  <span className="text-[11px] text-gray-300">{agent}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Canvas Area */}
        <main className="flex-1 relative bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:24px_24px] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full p-12">
              <AnimatePresence>
                {nodes.map((node, index) => (
                  <motion.div 
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`absolute p-5 bg-gray-900 border rounded-2xl shadow-2xl cursor-move group transition-all ${activeNodeId === node.id ? 'border-pink-500 ring-4 ring-pink-500/10' : 'border-white/10 hover:border-white/20'}`}
                    style={{ 
                      left: `${100 + index * 250}px`, 
                      top: `${150 + (index % 2) * 100}px`,
                      width: '220px'
                    }}
                    onClick={() => setActiveNodeId(node.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-1.5 rounded-lg bg-white/5 ${
                        node.type === 'generation' ? 'text-pink-400' : 
                        node.type === 'orchestration' ? 'text-purple-400' : 'text-blue-400'
                      }`}>
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="flex items-center gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          node.status === 'completed' ? 'bg-green-500' : 
                          node.status === 'running' ? 'bg-blue-500 animate-pulse' : 'bg-gray-600'
                        }`} />
                        <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">{node.status}</span>
                      </div>
                    </div>
                    
                    <h4 className="text-xs font-bold text-white mb-1">{node.title}</h4>
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-4">Agent: {node.agentId}</p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <button className="p-1.5 text-gray-600 hover:text-white transition-colors">
                        <Settings className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 text-gray-600 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Connection Points */}
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 border border-white/20 rounded-full" />
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 border border-white/20 rounded-full" />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* SVG Connections (Simulated) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <path d="M 320 200 L 350 200 L 350 250 L 380 250" stroke="white" strokeWidth="1" fill="none" />
                <path d="M 570 250 L 600 250 L 600 200 L 630 200" stroke="white" strokeWidth="1" fill="none" />
              </svg>
            </div>
          </div>

          {/* Canvas Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gray-900/80 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl">
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
              <MousePointer2 className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
              <Plus className="w-4 h-4" />
            </button>
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
              <Layers className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <div className="px-4 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Zoom: 100%
            </div>
          </div>
        </main>

        {/* Properties Panel */}
        <aside className="w-72 border-l border-white/5 bg-gray-900/30 p-6 space-y-6 overflow-y-auto no-scrollbar">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Node Properties</h3>
            {activeNodeId ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Title</label>
                  <input 
                    type="text" 
                    value={nodes.find(n => n.id === activeNodeId)?.title}
                    className="w-full bg-gray-950 border border-white/5 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-pink-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Assigned Agent</label>
                  <select className="w-full bg-gray-950 border border-white/5 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-pink-500 transition-all appearance-none">
                    <option>Creative-Specialist</option>
                    <option>Nexus-Architect</option>
                    <option>Guardian</option>
                  </select>
                </div>
                <div className="p-4 bg-pink-500/5 border border-pink-500/20 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-pink-400">
                    <Cpu className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Compute Profile</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    This node requires high-intel mode. Estimated token burn: 4.2k.
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-gray-700 uppercase tracking-widest text-[10px]">Select a node to edit properties</div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

const BlockTemplate = ({ icon: Icon, label, color }: { icon: any, label: string, color: string }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-950 border border-white/5 rounded-xl cursor-grab active:cursor-grabbing hover:border-white/10 transition-all group">
    <Icon className={`w-4 h-4 ${color}`} />
    <span className="text-[11px] text-gray-400 group-hover:text-white transition-colors">{label}</span>
  </div>
);
