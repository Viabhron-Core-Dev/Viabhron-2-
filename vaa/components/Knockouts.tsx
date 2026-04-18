import React, { useState } from "react";
import { 
  Network, 
  HelpCircle, 
  X, 
  Zap, 
  Database, 
  Shield, 
  Bot, 
  Send, 
  Mail, 
  User, 
  Settings, 
  Plus, 
  ShieldCheck, 
  Globe, 
  Brain, 
  Terminal, 
  Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface KnockoutProps {
  onClose: () => void;
}

export const CloudflareKnockout: React.FC<KnockoutProps> = ({ onClose }) => {
  const [showOracle, setShowOracle] = useState(false);
  const [oracleInput, setOracleInput] = useState("");
  const [oracleMessages, setOracleMessages] = useState([
    { role: 'assistant', content: "I am the Resident AI Oracle. I have mapped your OS substrate. How can I help you configure your Cloudflare Extra Processor?" }
  ]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-4 z-[150] bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-800 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">Cloudflare Extra Processor</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Edge Intelligence Substrate</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowOracle(!showOracle)}
            className={`p-3 rounded-2xl transition-all ${showOracle ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "bg-slate-800 text-slate-400 hover:text-white"}`}
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button onClick={onClose} className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-2xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Config Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-800/50 rounded-3xl border border-slate-700/50 space-y-4">
              <div className="flex items-center gap-3 text-orange-500">
                <Zap className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Edge Workers</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">Offload heavy compute tasks to Cloudflare's global edge network.</p>
              <div className="pt-4">
                <button className="w-full py-3 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-orange-600 transition-colors">
                  Deploy New Worker
                </button>
              </div>
            </div>
            <div className="p-6 bg-slate-800/50 rounded-3xl border border-slate-700/50 space-y-4">
              <div className="flex items-center gap-3 text-blue-400">
                <Database className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-widest">R2 Storage</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">S3-compatible object storage with zero egress fees for your Neural Archive.</p>
              <div className="pt-4">
                <button className="w-full py-3 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-colors">
                  Configure Bucket
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-950 rounded-[2rem] border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Late-Binding Key Injection</h3>
              <div className="px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-[8px] font-black uppercase tracking-widest border border-orange-500/20">
                Security Division Active
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Cloudflare API Token</label>
                <div className="relative">
                  <input 
                    type="password" 
                    placeholder="••••••••••••••••••••••••••••••••"
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-orange-500/50 transition-colors"
                  />
                  <Shield className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                </div>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed italic">
                * Tokens are only injected into the protected substrate after the Resident AI has audited the deployment code.
              </p>
            </div>
          </div>
        </div>

        {/* Oracle Sidebar */}
        <AnimatePresence>
          {showOracle && (
            <motion.div 
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="w-96 border-l border-slate-800 bg-slate-900 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">Resident Oracle</h3>
                  <p className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Context: Cloudflare Substrate</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                {oracleMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] p-4 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-slate-800">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Ask the Oracle..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-xs text-white outline-none focus:border-indigo-500/50 transition-colors"
                    value={oracleInput}
                    onChange={(e) => setOracleInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && oracleInput.trim()) {
                        setOracleMessages([...oracleMessages, { role: 'user', content: oracleInput }]);
                        setOracleInput("");
                        // Mock response
                        setTimeout(() => {
                          setOracleMessages(prev => [...prev, { role: 'assistant', content: "I am analyzing your request against the Sovereign Charter. I will generate the required manifest shortly." }]);
                        }, 1000);
                      }
                    }}
                  />
                  <Send className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const GmailRelayKnockout: React.FC<KnockoutProps> = ({ onClose }) => {
  const [showOracle, setShowOracle] = useState(false);
  const [oracleInput, setOracleInput] = useState("");
  const [oracleMessages, setOracleMessages] = useState([
    { role: 'assistant', content: "I am the Resident AI Oracle. I can help you connect multiple Gmail accounts with granular permissions. Which account should we configure first?" }
  ]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-4 z-[150] bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-800 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">Gmail Sovereign Relay</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Multi-Account Comms Substrate</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowOracle(!showOracle)}
            className={`p-3 rounded-2xl transition-all ${showOracle ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "bg-slate-800 text-slate-400 hover:text-white"}`}
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button onClick={onClose} className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-2xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Config Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
          <div className="space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Connected Identities</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { email: "elvilewis40@gmail.com", mode: "Executive (R/W)", status: "Active" },
                { email: "vianney.l@gmail.com", mode: "Sentinel (Read-Only)", status: "Pending Key" }
              ].map(acc => (
                <div key={acc.email} className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-500 border border-slate-800">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{acc.email}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">{acc.mode}</span>
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">•</span>
                        <span className={`text-[8px] font-black uppercase tracking-widest ${acc.status === 'Active' ? 'text-green-500' : 'text-orange-500'}`}>{acc.status}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-white transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button className="p-5 border-2 border-dashed border-slate-800 rounded-2xl flex items-center justify-center gap-3 text-slate-500 hover:text-slate-300 hover:border-slate-700 transition-all group">
                <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Add Sovereign Identity</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Sovereign Sanitization Briefing</h3>
            <div className="p-6 bg-slate-900 rounded-[2rem] border border-slate-800 space-y-4">
              <div className="flex items-center gap-3 text-green-400">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Active Protection: elvilewis40@gmail.com</span>
              </div>
              <div className="space-y-3">
                {[
                  { type: "Tracking Pixel", count: 12, action: "Stripped", color: "text-red-400" },
                  { type: "Suspicious Link", count: 3, action: "Neutralized", color: "text-orange-400" },
                  { type: "Data Leak Pattern", count: 0, action: "Clean", color: "text-green-400" }
                ].map(item => (
                  <div key={item.type} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-slate-800/50">
                    <span className="text-[10px] font-bold text-slate-300">{item.type}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-white">{item.count}</span>
                      <span className={`text-[8px] font-black uppercase tracking-widest ${item.color}`}>{item.action}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[9px] font-medium text-slate-500 italic">"The Resident AI has sanitized your incoming comms. No tracking data was leaked to external servers."</p>
            </div>
          </div>

          <div className="p-8 bg-slate-950 rounded-[2rem] border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Late-Binding OAuth Injection</h3>
              <div className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-[8px] font-black uppercase tracking-widest border border-red-500/20">
                Security Division Active
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Client ID</label>
                  <input 
                    type="password" 
                    placeholder="••••••••••••"
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-red-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Client Secret</label>
                  <input 
                    type="password" 
                    placeholder="••••••••••••"
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-red-500/50 transition-colors"
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed italic">
                * OAuth credentials are only injected into the protected substrate after the Resident AI has audited the "Relay" manifest.
              </p>
            </div>
          </div>
        </div>

        {/* Oracle Sidebar */}
        <AnimatePresence>
          {showOracle && (
            <motion.div 
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="w-96 border-l border-slate-800 bg-slate-900 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">Resident Oracle</h3>
                  <p className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Context: Gmail Substrate</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                {oracleMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] p-4 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-slate-800">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Ask the Oracle..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-xs text-white outline-none focus:border-indigo-500/50 transition-colors"
                    value={oracleInput}
                    onChange={(e) => setOracleInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && oracleInput.trim()) {
                        setOracleMessages([...oracleMessages, { role: 'user', content: oracleInput }]);
                        setOracleInput("");
                        setTimeout(() => {
                          setOracleMessages(prev => [...prev, { role: 'assistant', content: "I am drafting the OAuth manifest for your secondary account. I will ensure only 'Sentinel' permissions are requested." }]);
                        }, 1000);
                      }
                    }}
                  />
                  <Send className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const GitHubKnockout: React.FC<KnockoutProps> = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[150] flex items-center justify-center p-6"
    >
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-900 shadow-lg">
              <Globe className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">GitHub Hatchery Ignition</h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Late-Binding Substrate Connection</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>
        
        <div className="p-8 space-y-8 overflow-y-auto no-scrollbar">
          <div className="p-6 bg-indigo-500/10 rounded-3xl border border-indigo-500/20 space-y-3">
            <div className="flex items-center gap-3 text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Security Protocol: Manifest Audit</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The Resident AI will audit all incoming GitHub repositories before they are "Hatched" into the OS. This ensures no malicious code or telemetry leaks from external modules.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Personal Access Token (PAT)</label>
              <input 
                type="password" 
                placeholder="ghp_••••••••••••••••••••••••••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-white outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-3xl space-y-2">
                <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Auto-Sync</h4>
                <p className="text-[9px] text-slate-500">Keep extensions updated with the Hatchery repo.</p>
                <div className="w-10 h-5 bg-indigo-500 rounded-full relative p-1 mt-2">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-3xl space-y-2">
                <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Audit Level</h4>
                <p className="text-[9px] text-slate-500">Strict adversarial review of all imports.</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-bold text-indigo-400">Level 4</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-950/50 border-t border-slate-800">
          <button 
            onClick={onClose}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98]"
          >
            Ignite Connection
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const IntelligenceHubKnockout: React.FC<KnockoutProps> = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[150] flex items-center justify-center p-6"
    >
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shadow-lg border border-indigo-500/20">
              <Brain className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">Intelligence Hubs Setup</h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Frontier Model Gateway Configuration</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>
        
        <div className="p-8 space-y-8 overflow-y-auto no-scrollbar">
          <div className="space-y-4">
            {[
              { name: "Hugging Face", icon: <Globe className="w-4 h-4" />, placeholder: "hf_••••••••••••••••" },
              { name: "Open Router", icon: <Network className="w-4 h-4" />, placeholder: "sk-or-••••••••••••" },
              { name: "Ollama (Local)", icon: <Terminal className="w-4 h-4" />, placeholder: "http://localhost:11434" },
              { name: "Claude Mythos (Optional)", icon: <Sparkles className="w-4 h-4" />, placeholder: "Frontier Access Key" }
            ].map(hub => (
              <div key={hub.name} className="p-6 bg-slate-950 border border-slate-800 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-slate-400">{hub.icon}</div>
                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest">{hub.name}</h4>
                  </div>
                  <div className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded text-[8px] font-bold uppercase tracking-widest border border-indigo-500/20">
                    Ready
                  </div>
                </div>
                <input 
                  type="password" 
                  placeholder={hub.placeholder}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500/50 transition-colors"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-slate-950/50 border-t border-slate-800">
          <button 
            onClick={onClose}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98]"
          >
            Ratify Intelligence Hubs
          </button>
        </div>
      </div>
    </motion.div>
  );
};
