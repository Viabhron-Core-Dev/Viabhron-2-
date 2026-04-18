import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Zap, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Power,
  Terminal as TerminalIcon,
  Search,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SecurityRule } from '../../types';

interface SecurityDivisionProps {
  rules: SecurityRule[];
  onAddRule: (rule: Omit<SecurityRule, 'id' | 'createdAt'>) => void;
  onToggleRule: (id: string) => void;
  onDeleteRule: (id: string) => void;
  onLockdown: () => void;
  isLockdownActive: boolean;
  onUnlock: () => void;
}

export const SecurityDivision: React.FC<SecurityDivisionProps> = ({
  rules,
  onAddRule,
  onToggleRule,
  onDeleteRule,
  onLockdown,
  isLockdownActive,
  onUnlock
}) => {
  const [newRuleText, setNewRuleText] = useState('');
  const [newRuleType, setNewRuleType] = useState<'security' | 'operational' | 'fiscal'>('security');
  const [newRuleUrgency, setNewRuleUrgency] = useState<'standard' | 'critical'>('standard');
  const [isLockdownConfirmOpen, setIsLockdownConfirmOpen] = useState(false);
  const [lockdownPhrase, setLockdownPhrase] = useState('');
  const LOCKDOWN_PHRASE = 'INITIATE_SOVEREIGN_LOCKDOWN';

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleText.trim()) return;

    // In a real app, this would be translated by an AI service
    onAddRule({
      name: `${newRuleType.toUpperCase()}_POLICY_${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      description: 'Chairman-defined sovereign procedure',
      naturalLanguage: newRuleText,
      technicalBlock: `BLOCK_ACCESS_IF(intent.matches("${newRuleText}"))`,
      active: true,
      type: newRuleType,
      urgencyLevel: newRuleUrgency
    });
    setNewRuleText('');
  };

  return (
    <div className="h-full bg-black text-green-500 font-mono p-8 overflow-y-auto selection:bg-green-500/30">
      {/* Industrial Header */}
      <div className="border-b border-green-900/50 pb-6 mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3 tracking-tighter">
            <Shield className="w-8 h-8" />
            SECURITY_DIVISION // MACHINE_ROOM
          </h1>
          <p className="text-xs text-green-700 mt-1 uppercase tracking-widest">
            Protected Substrate Control // Root Authority Only
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 border border-green-900 rounded text-[10px] uppercase">
            Kernel: <span className="text-green-400">Hardened</span>
          </div>
          <div className="px-3 py-1 border border-green-900 rounded text-[10px] uppercase">
            Sandbox: <span className="text-green-400">Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rule Builder */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-green-950/10 border border-green-900/30 p-6 rounded-lg">
            <h2 className="text-sm font-bold mb-4 flex items-center gap-2 uppercase tracking-widest">
              <TerminalIcon className="w-4 h-4" />
              Natural Language Rule Builder
            </h2>
            <form onSubmit={handleAddRule} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-green-900 uppercase font-bold">Procedure Type</label>
                  <select 
                    value={newRuleType}
                    onChange={(e) => setNewRuleType(e.target.value as any)}
                    className="w-full bg-black border border-green-900/50 rounded p-2 text-xs text-green-500 focus:outline-none focus:border-green-500 appearance-none"
                  >
                    <option value="security">Security Protocol</option>
                    <option value="operational">Operational SOP</option>
                    <option value="fiscal">Fiscal Policy</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-green-900 uppercase font-bold">Urgency Level</label>
                  <select 
                    value={newRuleUrgency}
                    onChange={(e) => setNewRuleUrgency(e.target.value as any)}
                    className="w-full bg-black border border-green-900/50 rounded p-2 text-xs text-green-500 focus:outline-none focus:border-green-500 appearance-none"
                  >
                    <option value="standard">Standard (Silent Block)</option>
                    <option value="critical">Critical (Sentinel Alert)</option>
                  </select>
                </div>
              </div>
              <div className="relative">
                <textarea
                  value={newRuleText}
                  onChange={(e) => setNewRuleText(e.target.value)}
                  placeholder="Describe a sovereign procedure (e.g., 'No agent can access my financial folder')..."
                  className="w-full bg-black border border-green-900/50 rounded p-4 text-sm focus:outline-none focus:border-green-500 transition-all h-32 resize-none placeholder:text-green-900"
                />
                <div className="absolute bottom-4 right-4 text-[10px] text-green-900">
                  AI Translation Engine Active
                </div>
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-green-900/20 hover:bg-green-900/40 border border-green-900 text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Ratify Sovereign Procedure
              </button>
            </form>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest">
              <Lock className="w-4 h-4" />
              Active Security Policies
            </h2>
            <div className="space-y-3">
              {rules.map(rule => (
                <div key={rule.id} className="bg-black border border-green-900/30 p-4 rounded flex items-start justify-between group hover:border-green-500/50 transition-all">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${rule.active ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                      <h3 className="text-sm font-bold text-green-400">{rule.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] px-1.5 py-0.5 bg-green-900/20 text-green-700 rounded border border-green-900/30 uppercase font-bold">
                          {rule.type}
                        </span>
                        <span className={`text-[8px] px-1.5 py-0.5 rounded border uppercase font-bold ${rule.urgencyLevel === 'critical' ? 'bg-red-900/20 text-red-700 border-red-900/30' : 'bg-blue-900/20 text-blue-700 border-blue-900/30'}`}>
                          {rule.urgencyLevel}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-green-700 italic">"{rule.naturalLanguage}"</p>
                    <div className="text-[9px] text-green-900 mt-2 font-mono bg-green-950/20 p-1 rounded">
                      BLOCK_LOGIC: {rule.technicalBlock}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onToggleRule(rule.id)}
                      className="p-2 hover:bg-green-900/20 rounded transition-all"
                    >
                      {rule.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => onDeleteRule(rule.id)}
                      className="p-2 hover:bg-red-900/20 text-red-900 hover:text-red-500 rounded transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {rules.length === 0 && (
                <div className="text-center py-12 border border-dashed border-green-900/30 rounded text-green-900 text-xs uppercase tracking-widest">
                  No custom policies active
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Danger Zone */}
        <div className="space-y-8">
          <section className="bg-red-950/10 border border-red-900/30 p-6 rounded-lg">
            <h2 className="text-sm font-bold text-red-500 mb-4 flex items-center gap-2 uppercase tracking-widest">
              <AlertTriangle className="w-4 h-4" />
              Emergency Protocols
            </h2>
            <p className="text-[10px] text-red-900 mb-6 leading-relaxed uppercase tracking-tighter">
              {isLockdownActive 
                ? 'System is currently in lockdown. All autonomous agents are terminated.' 
                : 'Immediate termination of all active agent containers and revocation of temporary tokens.'}
            </p>
            
            {isLockdownActive ? (
              <button 
                onClick={onUnlock}
                className="w-full py-4 bg-green-900/20 hover:bg-green-600 hover:text-white border border-green-900 text-green-500 text-xs font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2"
              >
                <Power className="w-5 h-5" />
                Lift Lockdown
              </button>
            ) : !isLockdownConfirmOpen ? (
              <button 
                onClick={() => setIsLockdownConfirmOpen(true)}
                className="w-full py-4 bg-red-900/20 hover:bg-red-600 hover:text-white border border-red-900 text-red-500 text-xs font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2"
              >
                <Power className="w-5 h-5" />
                Initiate Lockdown
              </button>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="text-[10px] text-red-500 font-bold uppercase mb-2">
                  Type phrase to confirm:
                </div>
                <input 
                  type="text"
                  value={lockdownPhrase}
                  onChange={(e) => setLockdownPhrase(e.target.value)}
                  placeholder={LOCKDOWN_PHRASE}
                  className="w-full bg-black border border-red-900 rounded p-3 text-xs text-red-500 focus:outline-none focus:border-red-500 transition-all"
                />
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      if (lockdownPhrase === LOCKDOWN_PHRASE) {
                        onLockdown();
                        setIsLockdownConfirmOpen(false);
                        setLockdownPhrase('');
                      }
                    }}
                    disabled={lockdownPhrase !== LOCKDOWN_PHRASE}
                    className="flex-1 py-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest disabled:opacity-50 transition-all"
                  >
                    Confirm
                  </button>
                  <button 
                    onClick={() => {
                      setIsLockdownConfirmOpen(false);
                      setLockdownPhrase('');
                    }}
                    className="px-4 py-3 border border-red-900 text-red-900 hover:text-red-500 text-[10px] font-bold uppercase tracking-widest transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </section>

          <section className="bg-green-950/5 border border-green-900/20 p-6 rounded-lg">
            <h2 className="text-sm font-bold text-green-700 mb-4 uppercase tracking-widest">System Status</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] uppercase">
                <span className="text-green-900">Uptime:</span>
                <span>142:12:04:55</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase">
                <span className="text-green-900">Active Containers:</span>
                <span>04</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase">
                <span className="text-green-900">Network Load:</span>
                <span>0.02%</span>
              </div>
              <div className="pt-4 border-t border-green-900/20">
                <div className="text-[9px] text-green-900 uppercase mb-2">Security Feed</div>
                <div className="space-y-2">
                  <div className="text-[8px] text-green-800">[02:12:01] Kernel integrity verified.</div>
                  <div className="text-[8px] text-green-800">[01:55:42] Sandbox 04 initialized.</div>
                  <div className="text-[8px] text-green-800">[01:42:10] Policy audit complete.</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
