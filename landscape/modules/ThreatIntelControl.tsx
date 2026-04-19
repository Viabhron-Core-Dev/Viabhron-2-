import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Radar, 
  RefreshCw, 
  Activity, 
  Globe,
  Database,
  Lock,
  Zap,
  Shield,
  Info,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Advisory {
  id: string;
  title: string;
  framework: 'ATT&CK' | 'ATLAS';
  severity: 'low' | 'medium' | 'high' | 'critical';
  resonanceScore: number;
  description: string;
  affectedComponents: string[];
  recommendedAction: string;
  time: string;
}

export const ThreatIntelControl: React.FC = () => {
  const [advisories] = useState<Advisory[]>([
    { 
      id: 'adv-01', 
      title: 'ATLAS-T1566: Prompt Injection', 
      framework: 'ATLAS', 
      severity: 'high', 
      resonanceScore: 9, 
      description: 'New technique detected for bypassing agentic bulkheads using recursive semantic nesting.',
      affectedComponents: ['Social Sandbox', 'Diplomat Agent'],
      recommendedAction: 'Update SOP-09 to include secondary semantic sanitization.',
      time: '12m ago'
    },
    { 
      id: 'adv-02', 
      title: 'ATT&CK-T1059: Command Execution', 
      framework: 'ATT&CK', 
      severity: 'medium', 
      resonanceScore: 6, 
      description: 'Vulnerability in specific Node.js runtimes used for edge orchestration.',
      affectedComponents: ['Cloudflare Bridge'],
      recommendedAction: 'Verify Cloudflare Worker runtime versions.',
      time: '1h ago'
    }
  ]);

  const [isScanning] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#08080a] text-slate-300 font-sans selection:bg-red-500/30">
      {/* Header - Intelligence Style */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20">
            <Radar className="w-5 h-5 text-red-400 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight uppercase">Threat Intel Bridge</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">MITRE ATT&CK // ATLAS Matrix</span>
              <div className="w-1 h-1 rounded-full bg-red-500" />
            </div>
          </div>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          Initiate Resonance Scan
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Intelligence Feeds */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Globe className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">MITRE ATT&CK Feed</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-white font-medium">Classical Substrate Threats</span>
                <span className="text-emerald-400 font-bold">ACTIVE</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <div className="bg-emerald-500 w-full h-full" />
              </div>
              <p className="text-[9px] text-slate-600 uppercase tracking-widest">Monitoring: Cloudflare, Firebase, Node.js</p>
            </div>
          </div>
          <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">MITRE ATLAS Feed</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-white font-medium">Adversarial AI Threats</span>
                <span className="text-red-400 font-bold">HIGH RISK</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <div className="bg-red-500 w-3/4 h-full" />
              </div>
              <p className="text-[9px] text-slate-600 uppercase tracking-widest">Monitoring: LLM Injection, Data Poisoning</p>
            </div>
          </div>
        </section>

        {/* Sentinel Advisories */}
        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Sentinel Advisories</h3>
            <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest">{advisories.length} High Resonance Alerts</span>
          </div>
          <div className="space-y-4">
            {advisories.map(adv => (
              <div key={adv.id} className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-red-500/30 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${
                      adv.severity === 'high' ? 'bg-red-500/10 text-red-400' : 'bg-orange-500/10 text-orange-400'
                    }`}>
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{adv.title}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{adv.framework}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                        <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest">Resonance: {adv.resonanceScore}/10</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-600 font-medium uppercase tracking-widest">{adv.time}</span>
                </div>
                
                <p className="text-xs text-slate-400 leading-relaxed mb-6">{adv.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Affected Components</h5>
                    <div className="flex flex-wrap gap-2">
                      {adv.affectedComponents.map(comp => (
                        <span key={comp} className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Recommended Action</h5>
                    <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10 flex items-start gap-3">
                      <Info className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-red-400/80 font-medium leading-relaxed">{adv.recommendedAction}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* External Account Sync */}
        <section className="p-6 rounded-[2.5rem] bg-white/[0.01] border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Security Account Sync</h3>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Connect external telemetry providers for advanced defense</p>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <Lock className="w-5 h-5 text-slate-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Shodan', 'VirusTotal', 'Snyk', 'GitHub Sec'].map(provider => (
              <button key={provider} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/5 transition-all flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{provider}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Footer Status */}
      <div className="px-6 py-3 border-t border-white/5 bg-black flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-red-500" />
            <span className="text-[8px] font-bold text-red-500/80 uppercase tracking-[0.2em]">Sentinel Monitoring: Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Database className="w-3 h-3 text-slate-600" />
            <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em]">Threat Database: Synced</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-3 h-3 text-slate-600" />
          <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em]">Zero-Trust Advisory Mode</span>
        </div>
      </div>
    </div>
  );
};
