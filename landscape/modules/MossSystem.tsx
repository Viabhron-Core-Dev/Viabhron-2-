import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, 
  Github, 
  Download, 
  Database, 
  ShieldCheck, 
  Zap, 
  Archive, 
  RefreshCw,
  Search,
  ExternalLink,
  Trash2,
  Settings,
  AlertCircle
} from 'lucide-react';

interface MossApp {
  id: string;
  name: string;
  source: string;
  status: 'active' | 'dormant' | 'transmuting';
  lastUsed: string;
  size: string;
  description: string;
  category: string;
}

export const MossSystem: React.FC<{ uiMode: 'browser' | 'desktop' }> = ({ uiMode }) => {
  const [mossApps, setMossApps] = useState<MossApp[]>([
    {
      id: 'm1',
      name: 'Celestial Calculator',
      source: 'github.com/viabhron/calc-moss',
      status: 'active',
      lastUsed: '2 hours ago',
      size: '1.2MB',
      description: 'A high-precision mathematical engine for planetary calculations.',
      category: 'Utility'
    },
    {
      id: 'm2',
      name: 'Nexus Scraper',
      source: 'github.com/viabhron/nexus-scrape',
      status: 'dormant',
      lastUsed: '3 days ago',
      size: '4.5MB',
      description: 'Distributed data harvester for the Viabhron Nexus.',
      category: 'Data'
    }
  ]);

  const [importUrl, setImportUrl] = useState('');
  const [isTransmuting, setIsTransmuting] = useState(false);

  const handleImport = () => {
    if (!importUrl) return;
    setIsTransmuting(true);
    
    // Simulate Transmutation process
    setTimeout(() => {
      const newMoss: MossApp = {
        id: `m-${Date.now()}`,
        name: importUrl.split('/').pop() || 'New Moss',
        source: importUrl,
        status: 'active',
        lastUsed: 'Just now',
        size: '2.8MB',
        description: 'Transmuted from external source. Sovereign Script verified.',
        category: 'Imported'
      };
      setMossApps(prev => [newMoss, ...prev]);
      setIsTransmuting(false);
      setImportUrl('');
    }, 3000);
  };

  const toggleStatus = (id: string) => {
    setMossApps(prev => prev.map(app => {
      if (app.id === id) {
        return { ...app, status: app.status === 'active' ? 'dormant' : 'active' };
      }
      return app;
    }));
  };

  return (
    <div className="flex flex-col h-full bg-gray-950 text-white font-sans">
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-gray-900/50 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-2xl border border-green-500/20">
              <Sprout className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Moss System</h1>
              <p className="text-sm text-gray-400 uppercase tracking-widest font-medium">Sovereign App Transmutation & Lifecycle</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold">Vault: 12.4GB Free</span>
            </div>
            <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Transmuter Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Github className="w-5 h-5 text-gray-500 group-focus-within:text-green-400 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Paste GitHub URL or Web App link to seed new Moss..."
            value={importUrl}
            onChange={(e) => setImportUrl(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-32 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all text-sm"
          />
          <button 
            onClick={handleImport}
            disabled={isTransmuting || !importUrl}
            className="absolute right-2 top-2 bottom-2 px-6 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:hover:bg-green-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2"
          >
            {isTransmuting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Transmuting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Seed Moss
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
        {/* Active Moss Colonies */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              Active Moss Colonies
            </h2>
            <span className="text-[10px] text-gray-600 font-mono">ROOTED IN SUBSTRATE</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mossApps.filter(a => a.status === 'active').map(app => (
              <motion.div 
                layoutId={app.id}
                key={app.id}
                className="group bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-green-500/30 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                    <Sprout className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white truncate">{app.name}</h3>
                    <p className="text-[10px] text-gray-500 font-mono truncate">{app.source}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mb-6 line-clamp-2 leading-relaxed">
                  {app.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                      Size: <span className="text-gray-300">{app.size}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-700" />
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                      {app.category}
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleStatus(app.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all"
                  >
                    <Archive className="w-3 h-3" />
                    Shelve
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Dormant Seeds (GDrive Vault) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Archive className="w-4 h-4 text-blue-400" />
              Dormant Seeds (GDrive Vault)
            </h2>
            <span className="text-[10px] text-gray-600 font-mono">HIBERNATING IN CLOUD</span>
          </div>

          <div className="space-y-2">
            {mossApps.filter(a => a.status === 'dormant').map(app => (
              <motion.div 
                layoutId={app.id}
                key={app.id}
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group"
              >
                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <Archive className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-300">{app.name}</h3>
                    <span className="text-[8px] px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-gray-500 uppercase font-bold tracking-widest">Dormant</span>
                  </div>
                  <p className="text-[10px] text-gray-500 truncate">{app.source}</p>
                </div>
                <div className="text-[10px] font-mono text-gray-600 px-4">
                  Last active: {app.lastUsed}
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => toggleStatus(app.id)}
                    className="p-2 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors"
                    title="Re-hydrate Moss"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title="Purge Seed">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Transmutation Logs */}
        <section className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Transmutation Audit Trail
            </h2>
          </div>
          <div className="space-y-3 font-mono text-[10px]">
            <div className="flex items-center gap-3 text-cyan-400/80">
              <span className="text-gray-600">[22:48:12]</span>
              <span>ALCHEMICAL_FILTER: Auditing "Celestial Calculator"...</span>
            </div>
            <div className="flex items-center gap-3 text-green-400/80">
              <span className="text-gray-600">[22:48:14]</span>
              <span>VERIFIED: No telemetry detected. Sovereign Script conversion successful.</span>
            </div>
            <div className="flex items-center gap-3 text-yellow-400/80">
              <span className="text-gray-600">[22:48:15]</span>
              <span>ROOTING: Moss "Celestial Calculator" seeded in Substrate.</span>
            </div>
          </div>
        </section>
      </div>

      {/* Footer / Status */}
      <div className="p-4 bg-gray-900/80 border-t border-white/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>Transmuter Online</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span>Zero-Trust Protocol Active</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-3 h-3" />
          <span>Planetary Health: Optimal</span>
        </div>
      </div>
    </div>
  );
};
