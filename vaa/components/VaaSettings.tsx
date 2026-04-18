import React, { useState } from "react";
import { 
  ArrowLeft, 
  Moon, 
  Layers, 
  Zap, 
  ShieldCheck, 
  User, 
  ChevronRight,
  Sparkles,
  Key,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Check,
  X
} from "lucide-react";
import * as Icons from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Secret } from "../../src/types";

interface VaaSettingsProps {
  onClose: () => void;
  availableFilters: string[];
  activeFilters: string[];
  onToggleFilter: (filter: string) => void;
  onReorderFilters: (filters: string[]) => void;
  secrets: Secret[];
  onAddSecret: (secret: Omit<Secret, 'id' | 'createdAt'>) => void;
  onDeleteSecret: (id: string) => void;
  onUpdateSecret: (id: string, updates: Partial<Secret>) => void;
}

export const VaaSettings: React.FC<VaaSettingsProps> = ({ 
  onClose, 
  availableFilters, 
  activeFilters, 
  onToggleFilter,
  onReorderFilters,
  secrets,
  onAddSecret,
  onDeleteSecret,
  onUpdateSecret
}) => {
  const [subPage, setSubPage] = useState<"main" | "filters" | "secrets">("main");
  const [showAddSecret, setShowAddSecret] = useState(false);
  const [newSecret, setNewSecret] = useState({ label: '', value: '', type: 'api_key' as const });
  const [editingSecretId, setEditingSecretId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [visibleSecrets, setVisibleSecrets] = useState<Set<string>>(new Set());

  const moveFilter = (index: number, direction: 'up' | 'down') => {
    const newFilters = [...availableFilters];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newFilters.length) return;
    
    const [movedItem] = newFilters.splice(index, 1);
    newFilters.splice(targetIndex, 0, movedItem);
    onReorderFilters(newFilters);
  };

  if (subPage === "filters") {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="absolute inset-0 bg-slate-50 z-[100] flex flex-col"
      >
        <div className="p-6 bg-white border-b border-slate-100 flex items-center gap-4">
          <button onClick={() => setSubPage("main")} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <h2 className="text-xl font-bold text-slate-800">Manage Filters</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-6 px-2">Active Filter Pills</p>
            <div className="space-y-2">
              {availableFilters.map((filter, index) => (
                <div 
                  key={filter} 
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <button 
                        onClick={() => moveFilter(index, 'up')}
                        disabled={index === 0}
                        className={`p-0.5 transition-colors ${index === 0 ? "text-slate-200 cursor-not-allowed" : "text-slate-300 hover:text-wa-header"}`}
                      >
                        <ChevronRight className="w-4 h-4 -rotate-90" />
                      </button>
                      <button 
                        onClick={() => moveFilter(index, 'down')}
                        disabled={index === availableFilters.length - 1}
                        className={`p-0.5 transition-colors ${index === availableFilters.length - 1 ? "text-slate-200 cursor-not-allowed" : "text-slate-300 hover:text-wa-header"}`}
                      >
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeFilters.includes(filter) ? "bg-wa-header/10 text-wa-header" : "bg-white text-slate-300 border border-slate-100"}`}>
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{filter}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onToggleFilter(filter)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${activeFilters.includes(filter) ? "bg-wa-header" : "bg-slate-200"}`}
                  >
                    <motion.div 
                      animate={{ x: activeFilters.includes(filter) ? 24 : 4 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" 
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">Use arrows to adjust order</p>
        </div>
      </motion.div>
    );
  }

  if (subPage === "secrets") {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="absolute inset-0 bg-slate-50 z-[100] flex flex-col"
      >
        <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSubPage("main")} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <h2 className="text-xl font-bold text-slate-800">Sovereign Secrets</h2>
          </div>
          <button 
            onClick={() => setShowAddSecret(true)}
            className="w-10 h-10 rounded-full bg-wa-header text-white flex items-center justify-center shadow-lg shadow-wa-header/20 hover:scale-110 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <p className="text-[10px] text-blue-700 font-bold uppercase tracking-tight leading-relaxed">
              Secrets are stored in your private cloud. Once added, the actual values are hidden from view for maximum sovereignty.
            </p>
          </div>

          <div className="space-y-3">
            {secrets.map(secret => (
              <div key={secret.id} className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-3 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center">
                      <Key className="w-5 h-5 text-slate-400" />
                    </div>
                    {editingSecretId === secret.id ? (
                      <div className="flex items-center gap-2">
                        <input 
                          autoFocus
                          value={editLabel}
                          onChange={(e) => setEditLabel(e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-wa-header"
                        />
                        <button 
                          onClick={() => {
                            onUpdateSecret(secret.id, { label: editLabel });
                            setEditingSecretId(null);
                          }}
                          className="p-1 text-green-600 hover:bg-green-50 rounded-lg"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="text-sm font-bold text-slate-700">{secret.label}</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black">{secret.type.replace('_', ' ')}</div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => {
                        setEditingSecretId(secret.id);
                        setEditLabel(secret.label);
                      }}
                      className="p-2 text-slate-400 hover:text-wa-header hover:bg-slate-50 rounded-xl transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDeleteSecret(secret.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-3 border border-slate-100">
                  <div className="font-mono text-xs text-slate-500 tracking-widest">
                    {visibleSecrets.has(secret.id) ? secret.value : "••••••••••••••••"}
                  </div>
                  <button 
                    onClick={() => {
                      const newVisible = new Set(visibleSecrets);
                      if (newVisible.has(secret.id)) newVisible.delete(secret.id);
                      else newVisible.add(secret.id);
                      setVisibleSecrets(newVisible);
                    }}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    {visibleSecrets.has(secret.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}

            {secrets.length === 0 && (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                  <Key className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-sm text-slate-400 font-bold">No secrets stored yet</p>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showAddSecret && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110] flex items-end sm:items-center justify-center p-4"
            >
              <motion.div 
                initial={{ y: 100, scale: 0.95 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 100, scale: 0.95 }}
                className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden p-6 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">New Secret</h3>
                  <button onClick={() => setShowAddSecret(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Label</label>
                    <input 
                      value={newSecret.label}
                      onChange={(e) => setNewSecret({...newSecret, label: e.target.value})}
                      placeholder="e.g. Gemini API Key"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-wa-header outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Value</label>
                    <input 
                      type="password"
                      value={newSecret.value}
                      onChange={(e) => setNewSecret({...newSecret, value: e.target.value})}
                      placeholder="Paste your secret here..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-wa-header outline-none transition-all"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => {
                    onAddSecret(newSecret);
                    setShowAddSecret(false);
                    setNewSecret({ label: '', value: '', type: 'api_key' });
                  }}
                  disabled={!newSecret.label || !newSecret.value}
                  className="w-full bg-wa-header text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  Secure Secret
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-slate-50 z-[100] flex flex-col"
    >
      <div className="p-6 bg-white border-b border-slate-100 flex items-center gap-4">
        <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </button>
        <h2 className="text-xl font-bold text-slate-800">Vaa Settings</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Chat Filters</h3>
          <div className="bg-white rounded-3xl p-4 border border-slate-100 space-y-4">
            <button 
              onClick={() => setSubPage("filters")}
              className="w-full flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-700">Manage Filter Pills</div>
                  <div className="text-[10px] text-slate-400">Order and visibility of chat filters</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400">{activeFilters.length} Active</span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
              </div>
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Aesthetics</h3>
          <div className="bg-white rounded-3xl p-4 border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-700">Celestial Dark Mode</div>
                  <div className="text-[10px] text-slate-400">Deep space theme for Vaa</div>
                </div>
              </div>
              <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-700">Glassmorphism</div>
                  <div className="text-[10px] text-slate-400">Frosted glass UI effects</div>
                </div>
              </div>
              <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-700">Hybrid Lens</div>
                  <div className="text-[10px] text-slate-400">Overlay system telemetry in Vaa</div>
                </div>
              </div>
              <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Passive Services</h3>
          <div className="bg-white rounded-3xl p-4 border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center">
                  <Icons.Languages className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-700">Auto-Translation</div>
                  <div className="text-[10px] text-slate-400">Real-time message translation</div>
                </div>
              </div>
              <div className="w-12 h-6 bg-orange-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center">
                  <Icons.Mic className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-700">Speech to Text</div>
                  <div className="text-[10px] text-slate-400">Voice command recognition</div>
                </div>
              </div>
              <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center">
                  <Icons.Lock className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-700">End-to-End Encryption</div>
                  <div className="text-[10px] text-slate-400">Sovereign tunnel security</div>
                </div>
              </div>
              <div className="w-12 h-6 bg-rose-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sovereignty</h3>
          <div className="bg-white rounded-3xl p-4 border border-slate-100 space-y-4">
            <button 
              onClick={() => setSubPage("secrets")}
              className="w-full flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Key className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-700">Sovereign Secrets</div>
                  <div className="text-[10px] text-slate-400">Manage encrypted API keys</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400">{secrets.length} Stored</span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
              </div>
            </button>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-700">Private Mode</div>
                  <div className="text-[10px] text-slate-400">Local-first data processing</div>
                </div>
              </div>
              <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account</h3>
          <div className="bg-white rounded-3xl p-4 border border-slate-100 space-y-4">
            <button className="w-full flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-600" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-700">Profile Identity</div>
                  <div className="text-[10px] text-slate-400">Manage your Vaa persona</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
            </button>
          </div>
        </section>
      </div>
    </motion.div>
  );
};
