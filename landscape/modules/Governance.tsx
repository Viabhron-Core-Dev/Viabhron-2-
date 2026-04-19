import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Fingerprint, 
  FileCheck, 
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  History,
  Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UIMode } from '../../src/types';

interface Policy {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  severity: 'low' | 'medium' | 'high';
}

interface GovernanceProps {
  uiMode?: UIMode;
}

export const Governance: React.FC<GovernanceProps> = ({ uiMode }) => {
  const [activePolicies, setActivePolicies] = useState<Policy[]>([
    { id: 'p1', name: 'Skeleton Integrity', description: 'Prevent unauthorized modifications to core OS files', status: 'active', severity: 'high' },
    { id: 'p2', name: 'PII Scrubbing', description: 'Automatically remove personal data before cloud API calls', status: 'active', severity: 'medium' },
    { id: 'p3', name: 'Identity Verification', description: 'Require cryptographic signatures for all agent actions', status: 'active', severity: 'high' },
    { id: 'p4', name: 'EU AI Act Compliance', description: 'Enforce transparency and risk management standards', status: 'inactive', severity: 'medium' },
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { id: 'l1', time: '14:42:10', agent: 'Main Head AI', action: 'Skeleton Update Request', status: 'Blocked (Gate)', severity: 'high' },
    { id: 'l2', time: '14:40:05', agent: 'Code Specialist', action: 'API Call (Gemini)', status: 'Scrubbed & Signed', severity: 'low' },
    { id: 'l3', time: '14:38:22', agent: 'System Auditor', action: 'Policy Check', status: 'Compliant', severity: 'low' },
  ]);

  return (
    <div className={`h-full bg-gray-950 p-8 ${uiMode === 'browser' ? 'pb-32 md:pb-8' : 'pb-8'} overflow-y-auto no-scrollbar`}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Agent Governance Toolkit</h1>
              <p className="text-sm text-gray-500">Microsoft-powered policy engine & cryptographic identity</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
            <ShieldCheck className="w-3 h-3 text-green-400" />
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Secure Kernel</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Policy Engine */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-gray-900 border border-white/5 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-red-400" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Policy Engine</h3>
                </div>
                <button className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest transition-colors">Add Policy</button>
              </div>

              <div className="space-y-3">
                {activePolicies.map((policy) => (
                  <div key={policy.id} className="flex items-center justify-between p-4 bg-gray-950 border border-white/5 rounded-xl group hover:border-white/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${policy.status === 'active' ? 'bg-green-500' : 'bg-gray-700'}`} />
                      <div>
                        <div className="text-sm font-bold text-white">{policy.name}</div>
                        <div className="text-[10px] text-gray-500">{policy.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border uppercase ${
                        policy.severity === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {policy.severity}
                      </span>
                      <button className={`w-10 h-5 rounded-full relative transition-all ${policy.status === 'active' ? 'bg-blue-600' : 'bg-gray-800'}`}>
                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${policy.status === 'active' ? 'left-6' : 'left-1'}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Logs */}
            <div className="bg-gray-900 border border-white/5 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-3">
                <History className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Governance Audit Logs</h3>
              </div>
              <div className="space-y-2">
                {auditLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 bg-gray-950/50 rounded-lg border border-white/5 text-[10px] font-mono">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">{log.time}</span>
                      <span className="text-blue-400">[{log.agent}]</span>
                      <span className="text-gray-300">{log.action}</span>
                    </div>
                    <span className={log.status.includes('Blocked') ? 'text-red-400' : 'text-green-400'}>{log.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Identity & Compliance */}
          <div className="space-y-6">
            {/* Cryptographic Identity */}
            <div className="bg-gray-900 border border-white/5 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-3">
                <Fingerprint className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Agent Identity</h3>
              </div>
              <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                    <Key className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Root Identity Key</div>
                    <div className="text-[8px] text-gray-500 font-mono">ED25519_SIG_0x7F...</div>
                  </div>
                </div>
                <button className="w-full py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all">
                  Rotate Keys
                </button>
              </div>
            </div>

            {/* Compliance Modules */}
            <div className="bg-gray-900 border border-white/5 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-3">
                <FileCheck className="w-4 h-4 text-green-400" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Compliance Modules</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'HIPAA (Healthcare)', status: 'Ready' },
                  { name: 'SOC2 (Enterprise)', status: 'Ready' },
                  { name: 'GDPR (Privacy)', status: 'Ready' },
                ].map((mod) => (
                  <div key={mod.name} className="flex items-center justify-between p-3 bg-gray-950 border border-white/5 rounded-xl group cursor-pointer hover:border-green-500/30 transition-all">
                    <div className="text-[10px] font-bold text-white uppercase tracking-tight">{mod.name}</div>
                    <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-green-400 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Skeleton Guard */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-red-400">Skeleton Guard</h3>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-tighter">
                Confirmation Gate is strictly enforced for all core OS modifications. Unauthorized skeleton changes will trigger a system-wide lockdown.
              </p>
              <div className="flex items-center gap-2 text-[8px] font-bold text-red-400 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Active Monitoring
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
