import React from 'react';
import { motion } from 'motion/react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  id?: string;
  allowOverflow?: boolean;
}

/**
 * The foundational "Obsidian Command" glass base.
 * Follows the DESIGN.md rules: No 1px solid borders, defined by tonal transitions.
 */
export const GlassPanel: React.FC<GlassPanelProps> = ({ 
  children, 
  className = '', 
  intensity = 'medium',
  id,
  allowOverflow = false
}) => {
  const intensities = {
    low: 'bg-slate-950/40 backdrop-blur-md',
    medium: 'bg-slate-950/60 backdrop-blur-xl',
    high: 'bg-slate-950/80 backdrop-blur-2xl'
  };

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        ${intensities[intensity]} 
        ${allowOverflow ? 'overflow-visible' : 'overflow-hidden'}
        shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
        border-t border-white/5
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};
