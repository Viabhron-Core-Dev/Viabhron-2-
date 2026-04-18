import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Shield, 
  Brain, 
  Cpu, 
  Search,
  ArrowLeft,
  Star,
  MoreVertical,
  Plus,
  Filter,
  SortAsc,
  X,
  Check,
  ChevronDown,
  Key
} from 'lucide-react';
import { Agent, Extension, Secret } from '../../src/types';

interface ContactListProps {
  agents: Agent[];
  extensions: Extension[];
  secrets: Secret[];
  onSelect: (agent: Agent) => void;
  onBack: () => void;
  onCreateAgent: (agent: Partial<Agent>) => void;
}

export const ContactList: React.FC<ContactListProps> = ({ 
  agents, 
  extensions,
  secrets,
  onSelect, 
  onBack,
  onCreateAgent
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'recent'>('name');

  // Create Agent Form State
  const [newAgent, setNewAgent] = useState({
    name: '',
    description: '',
    role: 'specialized' as any,
    provider: 'gemini' as any,
    model: 'gemini-3-flash-preview',
    systemInstruction: '',
    activeExtensionIds: [] as string[],
    apiKeyId: '',
    color: '#6366f1'
  });

  const filteredAgents = useMemo(() => {
    let result = agents.filter(a => 
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterRole) {
      result = result.filter(a => a.role === filterRole);
    }

    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());
    }

    return result;
  }, [agents, searchQuery, filterRole, sortBy]);

  const staffAgents = filteredAgents.filter(a => a.isStaff);
  const otherAgents = filteredAgents.filter(a => !a.isStaff);

  const handleCreate = () => {
    onCreateAgent({
      ...newAgent,
      id: `agent-${Date.now()}`,
      status: 'active',
      lastActive: new Date(),
      capabilities: []
    });
    setShowCreateModal(false);
    setNewAgent({
      name: '',
      description: '',
      role: 'specialized',
      provider: 'gemini',
      model: 'gemini-3-flash-preview',
      systemInstruction: '',
      activeExtensionIds: [],
      apiKeyId: '',
      color: '#6366f1'
    });
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="bg-wa-header text-white p-5 flex items-center gap-4 shadow-lg z-20">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        {!showSearch ? (
          <>
            <h2 className="text-xl font-bold tracking-tight">Select Contact</h2>
            <div className="ml-auto flex items-center gap-4">
              <button onClick={() => setShowSearch(true)}>
                <Search className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity" />
              </button>
              <div className="relative">
                <button onClick={() => setShowMenu(!showMenu)}>
                  <MoreVertical className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity" />
                </button>
                <AnimatePresence>
                  {showMenu && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 overflow-hidden"
                    >
                      <button 
                        onClick={() => { setShowCreateModal(true); setShowMenu(false); }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 text-sm font-bold"
                      >
                        <Plus className="w-4 h-4" />
                        Build New Agent
                      </button>
                      <div className="h-px bg-slate-100 my-1" />
                      <div className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort By</div>
                      <button 
                        onClick={() => { setSortBy('name'); setShowMenu(false); }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-sm font-bold ${sortBy === 'name' ? 'text-wa-header' : 'text-slate-700'}`}
                      >
                        <div className="flex items-center gap-3">
                          <SortAsc className="w-4 h-4" />
                          Name
                        </div>
                        {sortBy === 'name' && <Check className="w-4 h-4" />}
                      </button>
                      <div className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Filter Role</div>
                      {['head', 'executive', 'specialized', 'contractor'].map(role => (
                        <button 
                          key={role}
                          onClick={() => { setFilterRole(filterRole === role ? null : role); setShowMenu(false); }}
                          className={`w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-sm font-bold capitalize ${filterRole === role ? 'text-wa-header' : 'text-slate-700'}`}
                        >
                          <div className="flex items-center gap-3">
                            <Filter className="w-4 h-4" />
                            {role}
                          </div>
                          {filterRole === role && <Check className="w-4 h-4" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center gap-3 bg-white/10 rounded-xl px-3 py-1">
            <Search className="w-4 h-4 opacity-60" />
            <input 
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-white/50"
            />
            <button onClick={() => { setShowSearch(false); setSearchQuery(''); }}>
              <X className="w-4 h-4 opacity-60" />
            </button>
          </div>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="p-4 space-y-6">
          {staffAgents.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sovereign Staff</span>
              </div>
              <div className="space-y-1">
                {staffAgents.map(agent => (
                  <button
                    key={agent.id}
                    onClick={() => onSelect(agent)}
                    className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors text-left"
                  >
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md flex-shrink-0"
                      style={{ backgroundColor: agent.color }}
                    >
                      {agent.role === 'head' ? <Shield size={24} /> : <Brain size={24} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-800 truncate">{agent.name}</div>
                      <div className="text-xs text-slate-500 truncate">{agent.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {otherAgents.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-2">
                <User className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Accredited Consultants</span>
              </div>
              <div className="space-y-1">
                {otherAgents.map(agent => (
                  <button
                    key={agent.id}
                    onClick={() => onSelect(agent)}
                    className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors text-left"
                  >
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm flex-shrink-0"
                      style={{ backgroundColor: agent.color }}
                    >
                      <Cpu size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-800 truncate">{agent.name}</div>
                      <div className="text-xs text-slate-500 truncate">{agent.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredAgents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
              <Search className="w-12 h-12 opacity-20" />
              <p className="text-sm font-medium">No agents found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Build New Agent Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-4"
          >
            <motion.div 
              initial={{ y: 100, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 100, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Build New Agent</h3>
                <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                {/* Avatar Placeholder */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 rounded-[2rem] bg-indigo-500 flex items-center justify-center text-white shadow-xl relative group">
                    <Brain size={48} />
                    <div className="absolute inset-0 bg-black/20 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Plus className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Agent Persona</span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Name</label>
                    <input 
                      value={newAgent.name}
                      onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                      placeholder="e.g. The Strategist"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-wa-header outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Description</label>
                    <input 
                      value={newAgent.description}
                      onChange={(e) => setNewAgent({...newAgent, description: e.target.value})}
                      placeholder="Briefly describe their role..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-wa-header outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Personality (System Instruction)</label>
                    <textarea 
                      value={newAgent.systemInstruction}
                      onChange={(e) => setNewAgent({...newAgent, systemInstruction: e.target.value})}
                      placeholder="Define their behavior, constraints, and core logic..."
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-wa-header outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Role</label>
                      <div className="relative">
                        <select 
                          value={newAgent.role}
                          onChange={(e) => setNewAgent({...newAgent, role: e.target.value as any})}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 appearance-none focus:ring-2 focus:ring-wa-header outline-none transition-all"
                        >
                          <option value="specialized">Specialized</option>
                          <option value="executive">Executive</option>
                          <option value="contractor">Contractor</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">API Key</label>
                      <div className="relative">
                        <select 
                          value={newAgent.apiKeyId}
                          onChange={(e) => setNewAgent({...newAgent, apiKeyId: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 appearance-none focus:ring-2 focus:ring-wa-header outline-none transition-all"
                        >
                          <option value="">No Key (Local Only)</option>
                          {secrets.filter(s => s.type === 'api_key').map(secret => (
                            <option key={secret.id} value={secret.id}>{secret.label}</option>
                          ))}
                        </select>
                        <Key className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Extensions</label>
                    <div className="flex flex-wrap gap-2">
                      {extensions.map(ext => (
                        <button
                          key={ext.id}
                          onClick={() => {
                            const ids = newAgent.activeExtensionIds.includes(ext.id)
                              ? newAgent.activeExtensionIds.filter(id => id !== ext.id)
                              : [...newAgent.activeExtensionIds, ext.id];
                            setNewAgent({...newAgent, activeExtensionIds: ids});
                          }}
                          className={`px-3 py-2 rounded-xl text-[10px] font-bold transition-all border ${
                            newAgent.activeExtensionIds.includes(ext.id)
                              ? 'bg-wa-header border-wa-header text-white shadow-md'
                              : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'
                          }`}
                        >
                          {ext.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50/50 border-t border-slate-100">
                <button 
                  onClick={handleCreate}
                  disabled={!newAgent.name}
                  className="w-full bg-wa-header text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  Hatch Agent
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
