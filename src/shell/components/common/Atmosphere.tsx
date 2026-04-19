import React from 'react';

interface AtmosphereProps {
  variant?: 'forest' | 'deep' | 'vibrant';
  className?: string;
  id?: string;
}

/**
 * Atmospheric background using layered gradients.
 * Reinforces the "Retro-Future" and organic vibe of Viabhron.
 */
export const Atmosphere: React.FC<AtmosphereProps> = ({ 
  variant = 'forest', 
  className = '',
  id 
}) => {
  const variants = {
    forest: 'bg-[#020402] from-green-900/10 via-black to-emerald-950/20',
    deep: 'bg-[#020202] from-slate-950 via-black to-indigo-950/10',
    vibrant: 'bg-[#010101] from-blue-900/10 via-black to-purple-900/10'
  };

  return (
    <div 
      id={id}
      className={`fixed inset-0 pointer-events-none z-[-1] overflow-hidden ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${variants[variant]}`} />
      
      {/* Dynamic blurred orbs for depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full" />
      
      {/* Noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />
    </div>
  );
};
