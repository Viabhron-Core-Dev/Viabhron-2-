import React from 'react';
import { Shield, Check, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConfirmationGateProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  agentName: string;
}

export function ConfirmationGate({ 
  isOpen, 
  title, 
  description, 
  onConfirm, 
  onCancel, 
  agentName 
}: ConfirmationGateProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-md bg-gray-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">System Confirmation</h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Requested by {agentName}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-950 border border-white/5 rounded-2xl space-y-2">
                <div className="text-sm font-bold text-gray-200">{title}</div>
                <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
              </div>

              <div className="flex items-center gap-3 p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-xl">
                <AlertTriangle className={`w-4 h-4 shrink-0 ${title.toLowerCase().includes('skeleton') || title.toLowerCase().includes('core') ? 'text-red-500' : 'text-yellow-500'}`} />
                <p className={`text-[10px] font-medium leading-tight ${title.toLowerCase().includes('skeleton') || title.toLowerCase().includes('core') ? 'text-red-500/80' : 'text-yellow-500/80'}`}>
                  {title.toLowerCase().includes('skeleton') || title.toLowerCase().includes('core') 
                    ? 'CRITICAL: This action modifies the system skeleton. Proceed with extreme caution.'
                    : 'Only the Head Agent can propose system changes. Review carefully before proceeding.'}
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={onCancel}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Reject
                </button>
                <button 
                  onClick={onConfirm}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                >
                  <Check className="w-4 h-4" />
                  Approve
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
