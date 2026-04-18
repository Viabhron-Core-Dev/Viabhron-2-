import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Plus, 
  Trash2, 
  Settings2, 
  Brain, 
  Cpu, 
  Zap, 
  ShieldCheck,
  ChevronRight,
  Save,
  X,
  Puzzle
} from 'lucide-react';
import { Agent, AIProvider, Extension } from '../../types';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { INITIAL_EXTENSIONS } from '../../constants/extensions';

interface AgentManagerProps {
  userId?: string;
  onSelectAgent?: (agentId: string) => void;
}

export const AgentManager: React.FC<AgentManagerProps> = ({ userId, onSelectAgent }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Partial<Agent> | null>(null);

  useEffect(() => {
    if (!userId) return;
    const agentsRef = collection(db, 'users', userId, 'agents');
    const q = query(agentsRef, orderBy('name', 'asc'));
    
    return onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Agent));
      setAgents(fetched);
    });
  }, [userId]);

  const handleSave = async () => {
    if (!userId || !editingAgent?.name) return;
    const id = editingAgent.id || Date.now().toString();
    const agentRef = doc(db, 'users', userId, 'agents', id);
    
    await setDoc(agentRef, {
      ...editingAgent,
      id,
      provider: editingAgent.provider || 'gemini',
      model: editingAgent.model || 'gemini-3-flash-preview',
      color: editingAgent.color || '#3b82f6',
      activeExtensionIds: editingAgent.activeExtensionIds || []
    }, { merge: true });
    
    setIsEditing(false);
    setEditingAgent(null);
  };

  const handleDelete = async (id: string) => {
    if (!userId || !confirm('Delete this agent?')) return;
    await deleteDoc(doc(db, 'users', userId, 'agents', id));
  };

  return (
    <div className="h-full bg-gray-950 p-6 overflow-y-auto no-scrollbar">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Bot className="w-8 h-8 text-blue-500" />
              Agent Orchestrator
            </h1>
            <p className="text-sm text-gray-500">Deploy specialized brains for different tasks</p>
          </div>
          <button 
            onClick={() => {
              setEditingAgent({ name: 'New Agent', provider: 'gemini', model: 'gemini-3-flash-preview', systemInstruction: 'You are a helpful assistant.' });
              setIsEditing(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            Create Agent
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agents.map(agent => (
            <motion.div 
              key={agent.id}
              layoutId={agent.id}
              className="bg-gray-900 border border-white/5 rounded-2xl p-5 hover:border-blue-500/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => {
                    setEditingAgent(agent);
                    setIsEditing(true);
                  }}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
                >
                  <Settings2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(agent.id)}
                  className="p-2 bg-white/5 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${agent.color}20`, color: agent.color }}
                >
                  <Brain className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    {agent.name}
                    <span className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-gray-500 uppercase tracking-widest">
                      {agent.provider}
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{agent.description || 'No description provided.'}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Puzzle className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Extensions</span>
                  </div>
                  <span className="text-[10px] text-gray-600 font-mono">{agent.activeExtensionIds.length} Loaded</span>
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {agent.activeExtensionIds.length > 0 ? (
                    agent.activeExtensionIds.map(id => {
                      const ext = INITIAL_EXTENSIONS.find(e => e.id === id);
                      if (!ext) return null;
                      const Icon = ext.icon;
                      return (
                        <div 
                          key={id} 
                          className="flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] text-gray-300 group-hover:border-blue-500/30 transition-all"
                          title={ext.description}
                        >
                          <Icon className="w-3 h-3 text-blue-400/70" />
                          <span>{ext.name}</span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-[10px] text-gray-600 italic">No extensions assigned</div>
                  )}
                </div>

                <div className="pt-3 flex items-center justify-end">
                  <button 
                    onClick={() => onSelectAgent?.(agent.id)}
                    className="flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Deploy Agent <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isEditing && editingAgent && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsEditing(false)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-xl bg-gray-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
              >
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Configure Agent Brain</h2>
                  <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Agent Name</label>
                      <input 
                        value={editingAgent.name || ''}
                        onChange={e => setEditingAgent({ ...editingAgent, name: e.target.value })}
                        className="w-full bg-gray-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 transition-all outline-none"
                        placeholder="e.g. Code Architect"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Brain Provider</label>
                      <select 
                        value={editingAgent.provider || 'gemini'}
                        onChange={e => setEditingAgent({ ...editingAgent, provider: e.target.value as AIProvider })}
                        className="w-full bg-gray-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 transition-all outline-none appearance-none"
                      >
                        <option value="gemini">Google Gemini</option>
                        <option value="openai">OpenAI</option>
                        <option value="anthropic">Anthropic</option>
                        <option value="groq">Groq (Llama 3)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">System Instruction (Persona)</label>
                    <textarea 
                      value={editingAgent.systemInstruction || ''}
                      onChange={e => setEditingAgent({ ...editingAgent, systemInstruction: e.target.value })}
                      className="w-full bg-gray-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-blue-500 transition-all outline-none h-32 resize-none"
                      placeholder="Define how this agent should behave..."
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Assigned Extensions & Tools</label>
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2 no-scrollbar">
                      {INITIAL_EXTENSIONS.map(ext => {
                        const isActive = editingAgent.activeExtensionIds?.includes(ext.id);
                        const Icon = ext.icon;
                        return (
                          <button
                            key={ext.id}
                            onClick={() => {
                              const current = editingAgent.activeExtensionIds || [];
                              const next = isActive 
                                ? current.filter(id => id !== ext.id)
                                : [...current, ext.id];
                              setEditingAgent({ ...editingAgent, activeExtensionIds: next });
                            }}
                            className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all text-left ${
                              isActive 
                                ? 'bg-blue-600/10 border-blue-500/50 text-white' 
                                : 'bg-gray-950 border-white/5 text-gray-500 hover:border-white/20'
                            }`}
                          >
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-800'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] font-bold truncate">{ext.name}</div>
                              <div className="text-[8px] uppercase tracking-tighter opacity-60">{ext.category}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-4 flex gap-4">
                    <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0" />
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest">BYO API Key Required</h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        This agent will use your personal API keys configured in System Settings. 
                        Ensure you have the correct key for the selected provider.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-950/50 border-t border-white/5 flex justify-end gap-3">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2.5 text-sm font-bold text-gray-400 hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Agent
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
