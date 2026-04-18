import React from 'react';
import { Shield, Cpu, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SecurityRule, EfficiencyPatch } from '../../../types';

interface MachineRoomSectionProps {
  securityRules: SecurityRule[];
  efficiencyPatches: EfficiencyPatch[];
  onToggleRule: (id: string) => void;
  onTogglePatch: (id: string) => void;
  onOpenSecurity: () => void;
  onOpenEfficiency: () => void;
  isOpenSecurity: boolean;
  isOpenEfficiency: boolean;
  onToggleSecurity: () => void;
  onToggleEfficiency: () => void;
}

export const MachineRoomSection: React.FC<MachineRoomSectionProps> = ({
  securityRules,
  efficiencyPatches,
  onToggleRule,
  onTogglePatch,
  onOpenSecurity,
  onOpenEfficiency,
  isOpenSecurity,
  isOpenEfficiency,
  onToggleSecurity,
  onToggleEfficiency
}) => {
  return (
    <>
      <div className="px-3 py-2 mb-2">
        <div className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.3em]">Protected Divisions</div>
      </div>

      {/* Security Division Section */}
      <div className="space-y-1">
        <button 
          onClick={onToggleSecurity}
          className="w-full flex items-center justify-between px-2 py-2 text-gray-500 hover:text-gray-300 transition-colors group"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Security Division</span>
          </div>
          {isOpenSecurity ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        </button>
        
        <AnimatePresence initial={false}>
          {isOpenSecurity && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-0.5 ml-2 border-l border-white/5 pl-2"
            >
              {securityRules.map((rule) => (
                <div
                  key={rule.id}
                  className="group flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5 transition-all"
                >
                  <div className={`p-1.5 rounded bg-gray-800/50 ${rule.active ? 'text-green-400' : 'text-gray-500'} transition-colors`}>
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-medium truncate ${rule.active ? 'text-gray-200' : 'text-gray-500'}`}>
                      {rule.name}
                    </div>
                    <div className="text-[8px] text-gray-600 uppercase tracking-tighter">
                      {rule.type} • {rule.urgencyLevel}
                    </div>
                  </div>
                  <button
                    onClick={() => onToggleRule(rule.id)}
                    className={`
                      w-7 h-4 rounded-full relative transition-all duration-200
                      ${rule.active ? 'bg-green-600' : 'bg-gray-700'}
                    `}
                  >
                    <div className={`
                      absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-200
                      ${rule.active ? 'left-3.5' : 'left-0.5'}
                    `} />
                  </button>
                </div>
              ))}
              <button 
                onClick={onOpenSecurity}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-[10px] text-gray-500 hover:text-gray-300 transition-colors"
              >
                <Plus className="w-3 h-3" />
                Manage Rules
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Efficiency Division Section */}
      <div className="space-y-1">
        <button 
          onClick={onToggleEfficiency}
          className="w-full flex items-center justify-between px-2 py-2 text-gray-500 hover:text-gray-300 transition-colors group"
        >
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Efficiency Patches</span>
          </div>
          {isOpenEfficiency ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        </button>
        
        <AnimatePresence initial={false}>
          {isOpenEfficiency && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-0.5 ml-2 border-l border-white/5 pl-2"
            >
              {efficiencyPatches.map((patch) => (
                <div
                  key={patch.id}
                  className="group flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5 transition-all"
                >
                  <div className={`p-1.5 rounded bg-gray-800/50 ${patch.applied ? 'text-blue-400' : 'text-gray-500'} transition-colors`}>
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-medium truncate ${patch.applied ? 'text-gray-200' : 'text-gray-500'}`}>
                      {patch.name}
                    </div>
                    <div className="text-[8px] text-gray-600 uppercase tracking-tighter">
                      v{patch.version} • +{patch.metrics.speedBoost}%
                    </div>
                  </div>
                  <button
                    onClick={() => onTogglePatch(patch.id)}
                    className={`
                      w-7 h-4 rounded-full relative transition-all duration-200
                      ${patch.applied ? 'bg-blue-600' : 'bg-gray-700'}
                    `}
                  >
                    <div className={`
                      absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-200
                      ${patch.applied ? 'left-3.5' : 'left-0.5'}
                    `} />
                  </button>
                </div>
              ))}
              <button 
                onClick={onOpenEfficiency}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-[10px] text-gray-500 hover:text-gray-300 transition-colors"
              >
                <Plus className="w-3 h-3" />
                Optimize Engine
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
