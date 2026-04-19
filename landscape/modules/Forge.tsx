import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UIMode } from '../../src/types';
import { 
  FileCode, 
  Save, 
  Play, 
  Github, 
  ChevronRight, 
  FileText, 
  Plus,
  Terminal,
  Search,
  Shield
} from 'lucide-react';

interface FileEntry {
  name: string;
  content: string;
  language: string;
}

interface ForgeProps {
  isLockdown?: boolean;
  checkSovereignProcedures?: (action: string, metadata?: any) => { allowed: boolean; message?: string };
  uiMode?: UIMode;
}

export const Forge: React.FC<ForgeProps> = ({ isLockdown, checkSovereignProcedures, uiMode }) => {
  const [files, setFiles] = useState<FileEntry[]>([
    { name: 'main.py', content: 'print("Hello from Viabhron Forge")', language: 'python' },
    { name: 'utils.js', content: 'export const add = (a, b) => a + b;', language: 'javascript' }
  ]);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [blockMessage, setBlockMessage] = useState<string | null>(null);

  const activeFile = files[activeFileIndex];

  const handleAction = (actionName: string) => {
    if (isLockdown) return;
    if (checkSovereignProcedures) {
      const check = checkSovereignProcedures(`${actionName}: ${activeFile.name}`, { fileName: activeFile.name });
      if (!check.allowed) {
        setBlockMessage(check.message || 'Action blocked by Sovereign Procedure.');
        setTimeout(() => setBlockMessage(null), 3000);
        return;
      }
    }
    // Proceed with action (simulated)
    console.log(`Executing ${actionName} on ${activeFile.name}`);
  };

  return (
    <div className={`h-full bg-gray-950 flex flex-col md:flex-row overflow-hidden font-mono ${uiMode === 'browser' ? 'pb-32 md:pb-0' : ''}`}>
      {/* File Explorer Sidebar */}
      <div className="w-full md:w-64 bg-gray-900 border-r border-white/5 flex flex-col shrink-0">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Workspace</span>
          <button className="p-1 hover:bg-white/5 rounded text-gray-400">
            <Plus className="w-3 h-3" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar">
          {files.map((file, idx) => (
            <button
              key={file.name}
              onClick={() => setActiveFileIndex(idx)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-all ${idx === activeFileIndex ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent'}`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span className="truncate">{file.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-12 bg-gray-900/50 border-b border-white/5 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs font-bold text-white">{activeFile.name}</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-gray-500 uppercase tracking-widest">{activeFile.language}</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleAction('Save File')}
              disabled={isLockdown}
              className={`flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg text-[10px] font-bold transition-all ${isLockdown ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Save className="w-3 h-3" />
              Save
            </button>
            <button 
              onClick={() => handleAction('Run Test')}
              disabled={isLockdown}
              className={`flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-bold transition-all shadow-lg shadow-blue-600/20 ${isLockdown ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Play className="w-3 h-3" />
              Run Test
            </button>
          </div>
        </div>

        <div className="flex-1 relative overflow-hidden">
          <textarea
            value={activeFile.content}
            onChange={(e) => {
              if (isLockdown) return;
              const newFiles = [...files];
              newFiles[activeFileIndex].content = e.target.value;
              setFiles(newFiles);
            }}
            readOnly={isLockdown}
            className={`absolute inset-0 w-full h-full bg-transparent p-6 text-sm ${isLockdown ? 'text-red-900' : 'text-gray-300'} focus:outline-none resize-none selection:bg-blue-500/30 no-scrollbar`}
            spellCheck={false}
          />
          {isLockdown && (
            <div className="absolute inset-0 bg-red-950/10 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
              <div className="bg-red-600 text-white px-4 py-1 rounded text-[10px] font-bold uppercase tracking-widest">Read-Only Mode</div>
            </div>
          )}
          {blockMessage && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-gray-900 border border-red-900/50 p-6 rounded-2xl shadow-2xl text-center space-y-4 max-w-xs">
                <Shield className="w-12 h-12 text-red-500 mx-auto animate-pulse" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Sovereign Block</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed">{blockMessage}</p>
              </div>
            </div>
          )}
        </div>

        {/* Console / Output Area */}
        <div className="h-32 bg-black border-t border-white/5 p-4 overflow-y-auto no-scrollbar">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-3 h-3 text-green-500" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Agent Console</span>
          </div>
          <div className="text-[11px] text-gray-400 space-y-1">
            <div className="flex gap-2">
              <span className="text-blue-500">viabhron@office:~$</span>
              <span>python main.py</span>
            </div>
            <div className="text-green-400">Hello from Viabhron Forge</div>
            <div className="flex gap-2 pt-2">
              <span className="text-blue-500">viabhron@office:~$</span>
              <span className="animate-pulse">_</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Sidebar */}
      <div className="w-full md:w-48 bg-gray-900 border-l border-white/5 p-4 space-y-6 shrink-0">
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Deployment</h3>
          <button className="w-full flex items-center justify-between p-2.5 bg-gray-950 border border-white/5 rounded-xl hover:border-blue-500/30 transition-all group">
            <div className="flex items-center gap-2">
              <Github className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
              <span className="text-[10px] font-bold text-gray-400 group-hover:text-white uppercase tracking-wider">Push to GH</span>
            </div>
            <ChevronRight className="w-3 h-3 text-gray-600" />
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">AI Tools</h3>
          <button className="w-full flex items-center gap-2 p-2.5 bg-blue-600/5 border border-blue-500/20 rounded-xl text-blue-400 text-[10px] font-bold uppercase tracking-wider hover:bg-blue-600/10 transition-all">
            <Search className="w-3.5 h-3.5" />
            Refactor Code
          </button>
        </div>
      </div>
    </div>
  );
};
