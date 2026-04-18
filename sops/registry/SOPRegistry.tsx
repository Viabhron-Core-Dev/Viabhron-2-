import React from 'react';
import { motion } from 'motion/react';
import { Book, Play, Shield, Palette, Search, Activity, Terminal, Plus } from 'lucide-react';
import { SOP, UIMode } from '../../types';

interface SOPRegistryProps {
  sops: SOP[];
  onExecute: (sop: SOP) => void;
  uiMode?: UIMode;
}

export const SOPRegistry: React.FC<SOPRegistryProps> = ({ sops, onExecute, uiMode }) => {
  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'Security Division': return <Shield className="w-5 h-5 text-red-400" />;
      case 'Creative Studio': return <Palette className="w-5 h-5 text-purple-400" />;
      case 'Research & Development': return <Activity className="w-5 h-5 text-blue-400" />;
      default: return <Book className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className={`h-full overflow-y-auto p-8 bg-[#0a0a0a] text-gray-300 font-sans ${uiMode === 'browser' ? 'pb-32 md:pb-8' : 'pb-8'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Book className="w-8 h-8 text-amber-500" />
              Sovereign SOP Registry
            </h1>
            <p className="text-gray-500 mt-2">Standard Operating Procedures for the Corporate Kernel</p>
          </div>
          <div className="bg-[#111] border border-white/5 px-4 py-2 rounded-lg flex items-center gap-3">
            <Search className="w-4 h-4 text-gray-600" />
            <input 
              type="text" 
              placeholder="Search procedures..." 
              className="bg-transparent border-none outline-none text-sm w-48"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sops.map((sop) => (
            <motion.div
              key={sop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111] border border-white/5 rounded-xl p-6 hover:border-amber-500/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  {getDepartmentIcon(sop.department)}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gray-600 font-mono bg-white/5 px-2 py-1 rounded">
                  {sop.department}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                {sop.title}
              </h3>
              <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                {sop.description}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3 h-3 text-gray-600" />
                  <span className="text-[10px] text-gray-400 font-mono">MANIFEST: SOVEREIGN-SCRIPT</span>
                </div>
                <pre className="text-[10px] font-mono bg-black/40 p-3 rounded-lg text-amber-500/80 border border-amber-500/10 overflow-x-auto">
                  {sop.manifest.trim()}
                </pre>
              </div>

              <button
                onClick={() => onExecute(sop)}
                className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                Execute SOP
              </button>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-2 border-dashed border-white/5 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-white/10 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-all">
              <Plus className="w-6 h-6 text-gray-600 group-hover:text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-400 group-hover:text-gray-300">Draft New SOP</h3>
            <p className="text-xs text-gray-600 mt-1">Formalize a new departmental capability</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
