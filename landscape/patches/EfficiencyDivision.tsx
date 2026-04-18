import React from 'react';
import { 
  Zap, 
  Activity, 
  Cpu, 
  HardDrive, 
  DollarSign, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown,
  Clock,
  Gauge,
  BarChart3,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { SystemMode, EfficiencyPatch, UIMode } from '../../types';

interface EfficiencyDivisionProps {
  mode: SystemMode;
  onModeChange: (mode: SystemMode) => void;
  patches: EfficiencyPatch[];
  onApplyPatch: (id: string) => void;
  uiMode?: UIMode;
}

export const EfficiencyDivision: React.FC<EfficiencyDivisionProps> = ({
  mode,
  onModeChange,
  patches,
  onApplyPatch,
  uiMode
}) => {
  const modes = [
    { 
      id: 'turbo', 
      name: 'Turbo Mode', 
      icon: Zap, 
      description: 'Maximum speed and reasoning depth. Uses largest available models.',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30'
    },
    { 
      id: 'eco', 
      name: 'Eco Mode', 
      icon: RefreshCw, 
      description: 'Maximum cost-efficiency. Switches to smallest possible models.',
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30'
    },
    { 
      id: 'stealth', 
      name: 'Stealth Mode', 
      icon: Activity, 
      description: 'Minimal footprint and maximum privacy. Disables non-essential logging.',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30'
    }
  ];

  return (
    <div className={`h-full bg-black text-blue-500 font-mono p-8 overflow-y-auto selection:bg-blue-500/30 ${uiMode === 'browser' ? 'pb-32 md:pb-8' : 'pb-8'}`}>
      {/* Industrial Header */}
      <div className="border-b border-blue-900/50 pb-6 mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3 tracking-tighter">
            <Cpu className="w-8 h-8" />
            EFFICIENCY_PATCHES // MACHINE_ROOM
          </h1>
          <p className="text-xs text-blue-700 mt-1 uppercase tracking-widest">
            Engine Optimization // Performance Control
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 border border-blue-900 rounded text-[10px] uppercase">
            Engine: <span className="text-blue-400">Optimized</span>
          </div>
          <div className="px-3 py-1 border border-blue-900 rounded text-[10px] uppercase">
            Latency: <span className="text-blue-400">12ms</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Vibe-Modes */}
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest">
              <Gauge className="w-4 h-4" />
              Engine Vibe-Modes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {modes.map(m => (
                <button
                  key={m.id}
                  onClick={() => onModeChange(m.id as SystemMode)}
                  className={`p-6 rounded-lg border transition-all text-left space-y-4 group ${
                    mode === m.id ? `${m.bg} ${m.border} ${m.color}` : 'bg-black border-blue-900/20 text-blue-900 grayscale hover:grayscale-0 hover:border-blue-500/30'
                  }`}
                >
                  <m.icon className={`w-8 h-8 ${mode === m.id ? 'animate-pulse' : ''}`} />
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest">{m.name}</h3>
                    <p className="text-[10px] mt-2 leading-relaxed opacity-60">{m.description}</p>
                  </div>
                  {mode === m.id && (
                    <div className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Active
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest">
              <RefreshCw className="w-4 h-4" />
              Available Efficiency Patches
            </h2>
            <div className="space-y-3">
              {patches.map(patch => (
                <div key={patch.id} className="bg-black border border-blue-900/30 p-6 rounded flex items-center justify-between group hover:border-blue-500/50 transition-all">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest">{patch.name}</h3>
                      <span className="text-[9px] px-2 py-0.5 bg-blue-950/30 border border-blue-900 rounded text-blue-700">v{patch.version}</span>
                    </div>
                    <p className="text-xs text-blue-700">{patch.description}</p>
                    <div className="flex gap-6 mt-4">
                      <div className="flex items-center gap-2 text-[10px] text-blue-400">
                        <TrendingUp className="w-3 h-3" />
                        Speed: +{patch.metrics.speedBoost}%
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-blue-400">
                        <Cpu className="w-3 h-3" />
                        Memory: -{patch.metrics.memorySaved}%
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-blue-400">
                        <DollarSign className="w-3 h-3" />
                        Cost: -{patch.metrics.costReduction}%
                      </div>
                    </div>
                  </div>
                  <button 
                    disabled={patch.applied}
                    onClick={() => onApplyPatch(patch.id)}
                    className={`px-6 py-2 rounded border font-bold text-[10px] uppercase tracking-widest transition-all ${
                      patch.applied 
                        ? 'bg-blue-900/20 border-blue-900 text-blue-900 cursor-default' 
                        : 'bg-blue-900/10 border-blue-900 hover:bg-blue-500 hover:text-black hover:border-blue-500'
                    }`}
                  >
                    {patch.applied ? 'Applied' : 'Hatch Patch'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Performance Dashboard */}
        <div className="space-y-8">
          <section className="bg-blue-950/10 border border-blue-900/30 p-6 rounded-lg">
            <h2 className="text-sm font-bold text-blue-500 mb-6 flex items-center gap-2 uppercase tracking-widest">
              <BarChart3 className="w-4 h-4" />
              Performance Dashboard
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase">
                  <span className="text-blue-900">Inference Speed</span>
                  <span>42 tok/s</span>
                </div>
                <div className="h-1 bg-blue-900/20 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[75%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase">
                  <span className="text-blue-900">Memory Pressure</span>
                  <span>1.2 GB / 4.0 GB</span>
                </div>
                <div className="h-1 bg-blue-900/20 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[30%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase">
                  <span className="text-blue-900">Cloud Burn Rate</span>
                  <span>$0.12 / hr</span>
                </div>
                <div className="h-1 bg-blue-900/20 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[15%]" />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-blue-950/5 border border-blue-900/20 p-6 rounded-lg">
            <h2 className="text-sm font-bold text-blue-700 mb-4 uppercase tracking-widest">Engine Diagnostics</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] uppercase">
                <span className="text-blue-900">Substrate:</span>
                <span>Cloud Run v2</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase">
                <span className="text-blue-900">Orchestrator:</span>
                <span>Viabhron_Core_v1</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase">
                <span className="text-blue-900">Active Threads:</span>
                <span>12</span>
              </div>
              <div className="pt-4 border-t border-blue-900/20">
                <div className="text-[9px] text-blue-900 uppercase mb-2">Recent Optimizations</div>
                <div className="space-y-2">
                  <div className="text-[8px] text-blue-800">[02:12:01] Context window expanded.</div>
                  <div className="text-[8px] text-blue-800">[01:55:42] Token cache optimized.</div>
                  <div className="text-[8px] text-blue-800">[01:42:10] KV-Cache compression active.</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
