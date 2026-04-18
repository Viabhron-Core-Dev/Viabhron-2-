import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Github, 
  Globe, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  Puzzle,
  Zap,
  Wrench,
  Network,
  ExternalLink,
  BookOpen,
  Layout,
  Terminal as TerminalIcon,
  Activity,
  Bug,
  Shield,
  RefreshCw
} from 'lucide-react';
import { motion } from 'motion/react';
import { Extension, ExtensionCategory, UIMode } from '../../types';

interface ExtensionStoreProps {
  onInstall: (extension: Extension) => void;
  installedIds: string[];
  uiMode?: UIMode;
}

export const ExtensionStore: React.FC<ExtensionStoreProps> = ({ onInstall, installedIds, uiMode }) => {
  const [importUrl, setImportUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const featuredExtensions: Extension[] = [
    { id: 'mcp-sqlite', name: 'SQLite MCP', category: 'mcp', icon: Network, status: 'inactive', source: 'inbuilt', description: 'Local database for structured data storage' },
    { id: 'mcp-gemini-docs', name: 'Gemini API Docs', category: 'mcp', icon: BookOpen, status: 'active', source: 'inbuilt', description: 'Default knowledge base for Gemini API development' },
    { id: 'module-terminal', name: 'Agent Terminal', category: 'module', icon: TerminalIcon, status: 'active', source: 'inbuilt', description: 'Real-time log and command output for AI agents' },
    { id: 'module-metrics', name: 'System Metrics', category: 'module', icon: Activity, status: 'active', source: 'inbuilt', description: 'Real-time performance and resource monitoring' },
    { id: 'module-simulation', name: 'Simulation Engine', category: 'module', icon: Bug, status: 'active', source: 'inbuilt', description: 'Developer suite for agent simulation and testing' },
    { id: 'module-governance', name: 'Governance Toolkit', category: 'module', icon: Shield, status: 'active', source: 'inbuilt', description: 'Microsoft-powered agent policy and identity engine' },
    { id: 'module-charts', name: 'Interactive Artifacts', category: 'module', icon: Layout, status: 'inactive', source: 'inbuilt', description: 'Claude-style interactive charts and visual data artifacts' },
    { id: 'module-ui-demo', name: 'UI Prototype Engine', category: 'module', icon: Globe, status: 'inactive', source: 'inbuilt', description: 'Lovable-style rapid UI prototyping and live demos' },
    { id: 'module-code-viz', name: 'Code-to-Image', category: 'module', icon: Zap, status: 'inactive', source: 'inbuilt', description: 'Generate high-quality diagrams and images directly from code' },
  ];

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importUrl) return;

    setIsImporting(true);
    // Simulate fetching metadata from GitHub/URL
    setTimeout(() => {
      const newExt: Extension = {
        id: `ext-${Date.now()}`,
        name: importUrl.split('/').pop() || 'New Extension',
        category: 'tool',
        icon: Puzzle,
        status: 'active',
        source: 'external',
        url: importUrl,
        description: `Imported from ${importUrl}`
      };
      onInstall(newExt);
      setImportUrl('');
      setIsImporting(false);
    }, 1500);
  };

  return (
    <div className={`h-full bg-gray-950 p-8 ${uiMode === 'browser' ? 'pb-32 md:pb-8' : 'pb-8'} overflow-y-auto no-scrollbar`}>
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Puzzle className="w-8 h-8 text-blue-500" />
            Universal AI Port
          </h1>
          <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
            Enhance your Sovereign OS with modular extensions. Import external capabilities from Claude, GitHub, Hugging Face, or any MCP-compliant server. All external tools are proxied through the <span className="text-blue-400 font-bold">Sovereign Bridge</span> for your privacy.
          </p>
        </div>

        {/* Import Section */}
        <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-8 space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Network className="w-32 h-32 text-blue-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-widest">
              <Download className="w-5 h-5 text-blue-400" />
              Import External Capability
            </h2>
            <p className="text-xs text-gray-500 uppercase tracking-tighter font-bold">Supports Claude Skills, GitHub Repos, Hugging Face Hub, and MCP Endpoints</p>
          </div>
          <form onSubmit={handleImport} className="flex flex-col md:flex-row gap-3 relative z-10">
            <div className="flex-1 relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                value={importUrl}
                onChange={(e) => setImportUrl(e.target.value)}
                placeholder="https://github.com/user/repo or MCP URL..."
                className="w-full bg-gray-950 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-all shadow-inner"
              />
            </div>
            <button 
              disabled={isImporting || !importUrl}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              {isImporting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {isImporting ? 'Linking...' : 'Hatch Extension'}
            </button>
          </form>
          <div className="flex items-center gap-4 text-[9px] font-bold text-gray-600 uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-green-500" />
              Sovereign Bridge Active
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-yellow-500" />
              Artisanal Wrapper Enabled
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Available Extensions</h2>
            <div className="flex gap-2">
              {['All', 'Connectors', 'Skills', 'Tools', 'MCP', 'Modules'].map(cat => (
                <button key={cat} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-[9px] font-bold text-gray-400 uppercase tracking-widest transition-all">
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredExtensions.map((ext) => {
              const isInstalled = installedIds.includes(ext.id);
              return (
                <div 
                  key={ext.id}
                  className="bg-gray-900/30 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 bg-gray-800 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                      <ext.icon className="w-6 h-6" />
                    </div>
                    {isInstalled ? (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 uppercase tracking-wider">
                        <CheckCircle2 className="w-3 h-3" />
                        Installed
                      </div>
                    ) : (
                      <button 
                        onClick={() => onInstall(ext)}
                        className="p-1.5 bg-white/5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{ext.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-4">{ext.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-gray-800 text-gray-400 rounded uppercase tracking-wider">
                      {ext.category}
                    </span>
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-blue-900/30 text-blue-400 rounded uppercase tracking-wider">
                      {ext.source}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
