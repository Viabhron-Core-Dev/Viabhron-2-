import React, { useState } from 'react';
import { 
  MessageSquare, 
  Share2, 
  ShieldAlert, 
  Lock, 
  UserCheck, 
  Link as LinkIcon, 
  CheckCircle2,
  AlertCircle,
  Globe,
  Users,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  time: string;
  status: 'sanitized' | 'pending' | 'blocked';
  accredited: boolean;
}

interface ChannelPost {
  id: string;
  author: string;
  content: string;
  time: string;
  visibility: 'public' | 'accredited' | 'private';
}

export const SocialSandboxControl: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'channels' | 'links'>('chat');
  const [messages] = useState<ChatMessage[]>([
    { id: '1', sender: 'Viabhron-Node-X', content: 'Diplomatic handshake request: Syncing Delta-09.', time: '10:02 AM', status: 'sanitized', accredited: true },
    { id: '2', sender: 'Unknown-Peer', content: 'Check out this new x402 extension: http://malicious-link.io', time: '10:15 AM', status: 'blocked', accredited: false },
    { id: '3', sender: 'Sovereign-Liaison-Alpha', content: 'Accreditation verified. Ready for secure knowledge pulse.', time: '10:30 AM', status: 'sanitized', accredited: true }
  ]);

  const [posts] = useState<ChannelPost[]>([
    { id: 'p1', author: 'The Chairman', content: 'Ratified SOP-08: The Vine Mesh is now active. Autonomy expanded.', time: '2h ago', visibility: 'accredited' },
    { id: 'p2', author: 'The Chairman', content: 'Exploring the Sovereign Social Mesh. Embassies are being established.', time: '4h ago', visibility: 'public' }
  ]);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-slate-300 font-sans selection:bg-blue-500/30">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <ShieldAlert className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight uppercase">Social Sandbox</h2>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">External Relations // Bulkhead-01</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Air-Gapped Isolation</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-6 border-b border-white/5 bg-white/[0.01]">
        {[
          { id: 'chat', label: 'Diplomatic Chat', icon: MessageSquare },
          { id: 'channels', label: 'Sovereign Feed', icon: Share2 },
          { id: 'links', label: 'Sovereign URIs', icon: LinkIcon }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all relative ${activeTab === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="social-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'chat' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Incoming Communications</h3>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Diplomat Active</span>
            </div>
            
            {messages.map(msg => (
              <div key={msg.id} className={`p-4 rounded-2xl border transition-all ${msg.status === 'blocked' ? 'bg-red-500/[0.02] border-red-500/20 opacity-60' : 'bg-white/[0.03] border-white/10'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${msg.accredited ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">{msg.sender}</span>
                    {msg.accredited && <UserCheck className="w-3 h-3 text-emerald-400" />}
                  </div>
                  <span className="text-[9px] text-slate-600 font-mono">{msg.time}</span>
                </div>
                <p className={`text-xs leading-relaxed mb-3 ${msg.status === 'blocked' ? 'text-red-400 line-through' : 'text-slate-300'}`}>
                  {msg.content}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {msg.status === 'sanitized' ? (
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">Sanitized</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-500/10 border border-red-500/20">
                        <AlertCircle className="w-3 h-3 text-red-400" />
                        <span className="text-[8px] font-bold text-red-400 uppercase tracking-widest">Blocked</span>
                      </div>
                    )}
                  </div>
                  {msg.status === 'sanitized' && (
                    <button className="text-[9px] font-bold text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors">
                      Ratify Export
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'channels' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <textarea 
                placeholder="Broadcast to your Sovereign Channel..."
                className="w-full bg-transparent border-none resize-none text-xs text-white placeholder:text-slate-600 focus:ring-0 mb-4 outline-none"
                rows={3}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <Globe className="w-4 h-4 text-slate-500" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <Users className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
                <button className="px-4 py-2 rounded-xl bg-blue-500 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-blue-400 transition-all">
                  Broadcast
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                        {post.author[0]}
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">{post.author}</h4>
                        <p className="text-[8px] text-slate-500 font-medium uppercase tracking-widest">{post.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                      {post.visibility === 'public' ? <Globe className="w-3 h-3 text-slate-500" /> : <Users className="w-3 h-3 text-blue-400" />}
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{post.visibility}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{post.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'links' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-blue-500/[0.02] border border-blue-500/20 text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                <LinkIcon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-tight">Generate Sovereign URI</h3>
              <p className="text-[10px] text-slate-500 mb-6 max-w-[240px] mx-auto leading-relaxed uppercase tracking-wider">
                Create a cryptographic link for external Viabhrons to initiate a diplomatic handshake.
              </p>
              <button className="w-full py-3 rounded-xl bg-blue-500 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-blue-400 transition-all shadow-lg shadow-blue-500/20">
                Generate New Link
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Active Embassies</h4>
              {[
                { label: 'Public Contact', uri: 'vaa://xK92jL...', expires: '5d left' },
                { label: 'R&D Collaboration', uri: 'vaa://pP01mN...', expires: '12h left' }
              ].map((link, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div>
                    <h5 className="text-[10px] font-bold text-white uppercase tracking-wider mb-1">{link.label}</h5>
                    <p className="text-[10px] font-mono text-blue-400">{link.uri}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Expires</p>
                    <p className="text-[10px] font-bold text-slate-300">{link.expires}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Status */}
      <div className="px-6 py-3 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Bulkhead Isolated</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-slate-600" />
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Zero-Trust Active</span>
          </div>
        </div>
        <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Sovereign Social Protocol v1.0.0</span>
      </div>
    </div>
  );
};
