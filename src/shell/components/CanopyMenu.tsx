import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ChevronDown, 
  Bird, 
  Waves, 
  Bug, 
  Database,
  Terminal,
  Cpu,
  Shield,
  FileText,
  Activity,
  Zap,
  FlaskConical,
  LayoutGrid,
  Settings
} from 'lucide-react';
import { GlassPanel } from './common/GlassPanel';

interface CanopySectionProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const CanopySection: React.FC<CanopySectionProps> = ({ title, icon, isOpen, onToggle, children }) => {
  return (
    <div className="border-b border-white/5">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="text-secondary group-hover:text-primary transition-colors">
            {icon}
          </div>
          <span className="font-sans font-medium text-sm tracking-wide text-gray-300 uppercase">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-500"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-black/20"
          >
            <div className="p-4 grid grid-cols-2 gap-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface CanopyAppIconProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const CanopyAppIcon: React.FC<CanopyAppIconProps> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-start p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/5 group"
  >
    <div className="p-2 bg-slate-900 rounded-md mb-2 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <span className="text-xs font-mono text-gray-400 truncate w-full text-left">
      {label}
    </span>
  </button>
);

interface CanopyMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModule: (type: string, title: string) => void;
  id?: string;
}

/**
 * Canopy (Start Menu): The sliding hub for Viabhron OS.
 * Sections are based on the Forest Taxonomy and are foldable by default.
 */
export const CanopyMenu: React.FC<CanopyMenuProps> = ({ isOpen, onClose, onOpenModule, id }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuVariants = {
    closed: { y: '100%', opacity: 0 },
    open: { y: 0, opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id={id} className="fixed inset-0 z-[300] flex flex-col justify-end p-4 pb-20 pointer-events-none">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <GlassPanel 
            intensity="high" 
            className="w-full max-w-lg mx-auto h-[70vh] max-h-[70vh] rounded-t-2xl flex flex-col pointer-events-auto shadow-2xl relative z-10"
          >
            {/* Search Bar (Omnibox) */}
            <div className="shrink-0 p-4 border-b border-white/10 bg-slate-950/40">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text"
                  placeholder="Ask Viabhron or search system..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/60 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm font-sans focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0 overscroll-contain touch-pan-y flex flex-col pb-16">
              {/* Birds: Sovereigns */}
              <CanopySection 
                title="Birds (Sovereigns)" 
                icon={<Bird size={20} />}
                isOpen={!!openSections.birds}
                onToggle={() => toggleSection('birds')}
              >
                <CanopyAppIcon icon={<Shield size={18} className="text-blue-400" />} label="Identity-8004" onClick={() => onOpenModule('identity-8004', 'Identity Manager')} />
                <CanopyAppIcon icon={<Shield size={18} className="text-emerald-400" />} label="Sentinel" onClick={() => onOpenModule('sentinel', 'System Sentinel')} />
                <CanopyAppIcon icon={<LayoutGrid size={18} className="text-indigo-400" />} label="Nexus" onClick={() => onOpenModule('nexus', 'Viabhron Nexus')} />
              </CanopySection>

              {/* Streams: Creative & Data */}
              <CanopySection 
                title="Streams (Synthesis)" 
                icon={<Waves size={20} />}
                isOpen={!!openSections.streams}
                onToggle={() => toggleSection('streams')}
              >
                <CanopyAppIcon icon={<Cpu size={18} className="text-purple-400" />} label="Forge" onClick={() => onOpenModule('forge', 'Agent Forge')} />
                <CanopyAppIcon icon={<Zap size={18} className="text-amber-400" />} label="Creative" onClick={() => onOpenModule('creative', 'Creative Studio')} />
                <CanopyAppIcon icon={<FlaskConical size={18} className="text-pink-400" />} label="Workflow" onClick={() => onOpenModule('simulation', 'Workflow Lab')} />
              </CanopySection>

              {/* Insects: Tools & Workers */}
              <CanopySection 
                title="Insects (Tools)" 
                icon={<Bug size={20} />}
                isOpen={!!openSections.insects}
                onToggle={() => toggleSection('insects')}
              >
                <CanopyAppIcon icon={<Terminal size={18} className="text-emerald-500" />} label="CLI" onClick={() => onOpenModule('agent_cli', 'Agent CLI')} />
                <CanopyAppIcon icon={<Activity size={18} className="text-red-400" />} label="Metrics" onClick={() => onOpenModule('metrics', 'System Metrics')} />
                <CanopyAppIcon icon={<FileText size={18} className="text-sky-400" />} label="Artifacts" onClick={() => onOpenModule('artifacts', 'Artifacts Viewer')} />
              </CanopySection>

              {/* Deep Soil: Governance */}
              <CanopySection 
                title="Deep Soil (Substrate)" 
                icon={<Database size={20} />}
                isOpen={!!openSections.deepSoil}
                onToggle={() => toggleSection('deepSoil')}
              >
                <CanopyAppIcon icon={<FileText size={18} className="text-gray-400" />} label="SOPs" onClick={() => onOpenModule('sops', 'SOP Registry')} />
                <CanopyAppIcon icon={<Shield size={18} className="text-orange-400" />} label="Governance" onClick={() => onOpenModule('governance', 'Governance Protocol')} />
                <CanopyAppIcon icon={<Settings size={18} className="text-slate-500" />} label="Settings" onClick={() => onOpenModule('settings', 'System Settings')} />
              </CanopySection>
            </div>

            {/* Quick Actions Footer */}
            <div className="shrink-0 p-4 bg-slate-950/60 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold ring-1 ring-primary/30">
                  V
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold">Chairman</span>
                  <span className="text-[10px] text-emerald-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Resident Active
                  </span>
                </div>
              </div>
              <button 
                className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                title="Power Off"
              >
                <Zap size={18} />
              </button>
            </div>
          </GlassPanel>
        </div>
      )}
    </AnimatePresence>
  );
};
