import React, { useState } from 'react';
import { 
  Egg, 
  Github, 
  Globe, 
  Zap, 
  Shield, 
  Cpu, 
  Network, 
  ChevronRight, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Terminal,
  Key,
  Lock,
  Eye,
  EyeOff,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AgentRole, UIMode } from '../../types';

interface HatcheryProps {
  onHatch: (data: any) => void;
  uiMode?: UIMode;
}

export const Hatchery: React.FC<HatcheryProps> = ({ onHatch, uiMode }) => {
  const [mode, setMode] = useState<'hatch' | 'accredit' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>('');
  
  // Form State
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [role, setRole] = useState<AgentRole>('consultant');
  const [clearance, setClearance] = useState('standard');

  const handleHatch = async () => {
    setIsProcessing(true);
    setProgress(0);
    
    const steps = [
      "Cloning repository into Forge Sandbox...",
      "Validating Sovereign Manifest (.md)...",
      "Analyzing dependencies and requirements...",
      "Building private Docker container on Cloud Run...",
      "Applying Artisanal Wrapper (Sovereign Prompt)...",
      "Onboarding Agent to Staff Hierarchy..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setStatus(steps[i]);
      await new Promise(r => setTimeout(r, 1500));
      setProgress(((i + 1) / steps.length) * 100);
    }

    onHatch({
      type: 'hatch',
      url,
      role,
      clearance
    });
    
    setIsProcessing(false);
    setMode(null);
    setUrl('');
  };

  const handleAccredit = async () => {
    setIsProcessing(true);
    setStatus("Establishing Ambassador Bridge...");
    await new Promise(r => setTimeout(r, 2000));
    
    setStatus("Assigning Secure Intercom (Webhook Receiver)...");
    await new Promise(r => setTimeout(r, 1500));

    onHatch({
      type: 'accredit',
      url,
      apiKey,
      role,
      clearance
    });

    setIsProcessing(false);
    setMode(null);
    setUrl('');
    setApiKey('');
  };

  return (
    <div className={`h-full flex flex-col bg-gray-950 overflow-hidden ${uiMode === 'browser' ? 'pb-32 md:pb-0' : ''}`}>
      {/* Header */}
      <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-gray-900/50 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
            <Egg className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">The Hatchery</h1>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Agent Onboarding & Accreditation</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Intro */}
          <div className="space-y-4">
            <h2 className="text-3xl font-medium text-white tracking-tight">Expand your Staff Hierarchy</h2>
            <p className="text-gray-400 max-w-2xl leading-relaxed">
              The Hatchery is where you bring new intelligence into your Sovereign OS. 
              Whether it's an open-source "Egg" from GitHub or a cloud-hosted "Consultant," 
              Viabhron ensures every agent is onboarded with strict security and artisanal style.
            </p>
          </div>

          {!mode && !isProcessing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hatch Card */}
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => setMode('hatch')}
                className="group relative bg-gray-900/40 border border-white/5 rounded-3xl p-8 text-left transition-all hover:border-blue-500/30 hover:bg-blue-600/5"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Github className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Hatch from Source</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Clone a GitHub repository or upload source code. Viabhron will containerize it 
                  on your private Cloud Run instance. 100% Sovereign.
                </p>
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest">
                  <span>Start Hatching</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.button>

              {/* Accredit Card */}
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => setMode('accredit')}
                className="group relative bg-gray-900/40 border border-white/5 rounded-3xl p-8 text-left transition-all hover:border-purple-500/30 hover:bg-purple-600/5"
              >
                <div className="w-14 h-14 rounded-2xl bg-purple-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-7 h-7 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Accredit Connection</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Connect to cloud-hosted agents (OpenAI, Genspark, Mistral). 
                  Established via an Ambassador Bridge with a Secure Intercom.
                </p>
                <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-widest">
                  <span>Start Accreditation</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.button>
            </div>
          )}

          {/* Form Area */}
          <AnimatePresence mode="wait">
            {mode && !isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-900/40 border border-white/5 rounded-3xl p-8 space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {mode === 'hatch' ? <Github className="text-blue-500" /> : <Globe className="text-purple-500" />}
                    <h3 className="text-xl font-bold text-white">
                      {mode === 'hatch' ? 'Hatch New Internal Agent' : 'Accredit External Consultant'}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setMode(null)}
                    className="p-2 text-gray-500 hover:text-white transition-colors"
                  >
                    <Plus className="w-6 h-6 rotate-45" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {/* URL Input */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                        {mode === 'hatch' ? 'Repository URL' : 'API Endpoint / Webhook'}
                      </label>
                      <div className="relative">
                        <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="text"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder={mode === 'hatch' ? 'https://github.com/user/agent-repo' : 'https://api.external-agent.com/v1'}
                          className="w-full bg-gray-950 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                      </div>
                    </div>

                    {/* API Key (Accredit Only) */}
                    {mode === 'accredit' && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Secret Key / Token</label>
                        <div className="relative">
                          <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input 
                            type={showApiKey ? "text" : "password"}
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="sk-..."
                            className="w-full bg-gray-950 border border-white/5 rounded-xl py-3 pl-12 pr-12 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all"
                          />
                          <button 
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                          >
                            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Role Selection */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Assigned Role</label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['contractor', 'consultant', 'specialized'] as AgentRole[]).map((r) => (
                          <button
                            key={r}
                            onClick={() => setRole(r)}
                            className={`
                              py-2 px-4 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border
                              ${role === r 
                                ? 'bg-blue-600/10 border-blue-500/50 text-blue-400' 
                                : 'bg-gray-950 border-white/5 text-gray-500 hover:border-white/10'}
                            `}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Clearance Level */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Clearance Level</label>
                      <div className="space-y-2">
                        {[
                          { id: 'restricted', name: 'Restricted', desc: 'No Vault access. Only current task context.' },
                          { id: 'standard', name: 'Standard', desc: 'Read access to project-specific Vault folders.' },
                          { id: 'elevated', name: 'Elevated', desc: 'Full Read/Write access to project resources.' }
                        ].map((c) => (
                          <button
                            key={c.id}
                            onClick={() => setClearance(c.id)}
                            className={`
                              w-full p-4 rounded-2xl text-left transition-all border
                              ${clearance === c.id 
                                ? 'bg-blue-600/10 border-blue-500/50' 
                                : 'bg-gray-950 border-white/5 hover:border-white/10'}
                            `}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-xs font-bold uppercase tracking-wider ${clearance === c.id ? 'text-blue-400' : 'text-gray-400'}`}>
                                {c.name}
                              </span>
                              {clearance === c.id && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                            </div>
                            <p className="text-[10px] text-gray-500 leading-relaxed">{c.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/5">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 italic">
                    <Shield className="w-3 h-3" />
                    <span>All external connections are routed through the Sovereign Bridge.</span>
                  </div>
                  <button
                    onClick={mode === 'hatch' ? handleHatch : handleAccredit}
                    disabled={!url || (mode === 'accredit' && !apiKey)}
                    className={`
                      px-8 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg
                      ${mode === 'hatch' 
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20' 
                        : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/20'}
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    {mode === 'hatch' ? 'Hatch Agent' : 'Accredit Consultant'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Processing State */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-900/40 border border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-8"
              >
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Egg className="w-8 h-8 text-blue-500 animate-pulse" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{status}</h3>
                  <div className="w-64 h-1.5 bg-gray-950 rounded-full overflow-hidden mx-auto">
                    <motion.div 
                      className="h-full bg-blue-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{Math.round(progress)}% Complete</p>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                  {[
                    { icon: Lock, label: 'Hardened' },
                    { icon: Shield, label: 'Audited' },
                    { icon: Zap, label: 'Optimized' }
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-950/50 rounded-xl p-3 flex flex-col items-center gap-1 border border-white/5">
                      <item.icon className="w-4 h-4 text-gray-600" />
                      <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Guidelines */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Sovereign Sandbox",
                desc: "Every hatched agent runs in a physically isolated container. They cannot see your host machine or other agents."
              },
              {
                icon: Network,
                title: "Ambassador Bridge",
                desc: "External connections are encrypted and proxied. Your real IP and local data are never exposed to cloud agents."
              },
              {
                icon: Cpu,
                title: "Resource Quotas",
                desc: "You control the compute. Set limits on RAM, CPU, and API spend for every member of your staff."
              }
            ].map((item, i) => (
              <div key={i} className="bg-gray-900/20 border border-white/5 rounded-2xl p-6 space-y-3">
                <item.icon className="w-5 h-5 text-gray-500" />
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
