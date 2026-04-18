import React from 'react';
import { 
  X, 
  Pause, 
  Play, 
  Maximize2, 
  Minimize2,
  Snowflake
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SubstrateFrameProps {
  name: string;
  isFrozen?: boolean;
  isFullscreen?: boolean;
  onClose: () => void;
  onToggleFreeze: () => void;
  onToggleFullscreen?: () => void;
  children: React.ReactNode;
}

/**
 * MOSS Substrate Frame
 * The secure bulkhead container for running Spores.
 */
export const SubstrateFrame: React.FC<SubstrateFrameProps> = ({
  name,
  isFrozen,
  isFullscreen,
  onClose,
  onToggleFreeze,
  onToggleFullscreen,
  children
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`${isFullscreen ? 'fixed inset-0 z-[200]' : 'absolute inset-0 z-[100]'} bg-white flex flex-col`}
    >
      {/* MOSS Frame Top Bar */}
      <div className="h-12 bg-wa-header flex items-center justify-between px-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${isFrozen ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'}`} />
          <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] truncate max-w-[150px]">
            {name} {isFrozen && <span className="text-blue-300 ml-2">[ METABOLIC STASIS ]</span>}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={onToggleFreeze}
            className={`p-2 rounded-lg transition-all ${isFrozen ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
            title={isFrozen ? "Thaw Spore" : "Freeze Spore"}
          >
            {isFrozen ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
          
          <button 
            onClick={onToggleFullscreen}
            className={`p-2 rounded-lg transition-all text-white/70 hover:text-white hover:bg-white/10`}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <div className="w-px h-4 bg-white/20 mx-1" />
          <button 
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-red-500/80 rounded-lg transition-all"
            title="Purge Spore"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Spore Content */}
      <div className="flex-1 relative overflow-hidden bg-white">
        <div className={`h-full transition-all duration-500 ${isFrozen ? 'filter grayscale brightness-90 pointer-events-none' : ''}`}>
          {children}
        </div>

        {/* Moss Frost Overlay */}
        <AnimatePresence>
          {isFrozen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/10 backdrop-blur-[2px] pointer-events-none"
            >
              <div className="relative">
                <Snowflake className="w-16 h-16 text-blue-500/20 animate-pulse" />
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="bg-white/90 border border-slate-100 px-6 py-2 rounded-2xl shadow-xl">
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Metabolic Stasis</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
