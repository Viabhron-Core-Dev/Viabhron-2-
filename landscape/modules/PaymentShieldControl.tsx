import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Fingerprint, 
  QrCode, 
  Lock, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck,
  CreditCard,
  Zap,
  Info,
  ChevronRight,
  Terminal,
  Cpu,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'secure' | 'verifying' | 'flagged';
  type: 'QR' | 'Biometric' | 'Hybrid';
  timestamp: string;
}

export const PaymentShieldControl: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'tx-882', amount: 1250.00, currency: 'INR', status: 'secure', type: 'Hybrid', timestamp: '2m ago' },
    { id: 'tx-881', amount: 45.00, currency: 'USD', status: 'secure', type: 'QR', timestamp: '15m ago' }
  ]);

  const [isScanning, setIsScanning] = useState(false);
  const [isRatifying, setIsRatifying] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#0d0d0f] text-slate-300 font-mono selection:bg-emerald-500/30">
      {/* Header - Hardware Style */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">Sovereign Payment Shield</h2>
            <div className="flex items-center gap-2">
              <span className="text-[8px] text-slate-500 uppercase tracking-widest">BIS-2026 // RBI-2FA Compliant</span>
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10 flex items-center gap-2">
            <Cpu className="w-3 h-3 text-slate-500" />
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">8004-Active</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Real-time Monitoring Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between h-32">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">QR Encryption</span>
              <QrCode className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white tracking-tighter">AES-256-GCM</p>
              <p className="text-[8px] text-emerald-400/60 uppercase tracking-widest">Hardened Signature Active</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between h-32">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Biometric 2FA</span>
              <Fingerprint className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white tracking-tighter">RATIFIED</p>
              <p className="text-[8px] text-blue-400/60 uppercase tracking-widest">Threshold: $50.00</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between h-32">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Fraud Sentinel</span>
              <Activity className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white tracking-tighter">0 THREATS</p>
              <p className="text-[8px] text-orange-400/60 uppercase tracking-widest">Real-time Audit Active</p>
            </div>
          </div>
        </section>

        {/* Transaction Ledger */}
        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Shielded Transaction Ledger</h3>
            <button className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest hover:underline flex items-center gap-1">
              <RefreshCw className="w-3 h-3" /> Sync Ledger
            </button>
          </div>
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest">TX_ID</th>
                  <th className="px-6 py-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Value</th>
                  <th className="px-6 py-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Protocol</th>
                  <th className="px-6 py-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 text-[10px] font-bold text-white">{tx.id}</td>
                    <td className="px-6 py-4 text-[10px] font-bold text-slate-300">{tx.amount.toFixed(2)} {tx.currency}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {tx.type === 'Hybrid' && <Zap className="w-3 h-3 text-orange-400" />}
                        {tx.type === 'QR' && <QrCode className="w-3 h-3 text-emerald-400" />}
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{tx.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">{tx.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[9px] text-slate-600 font-medium uppercase tracking-widest">{tx.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Action Controls */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => setIsScanning(true)}
            className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 hover:bg-emerald-500/10 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <QrCode className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-white uppercase tracking-tight">Scan BIS QR</h4>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest">Encrypted Verification</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>

          <button 
            onClick={() => setIsRatifying(true)}
            className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/20 hover:bg-blue-500/10 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 group-hover:scale-110 transition-transform">
                <Fingerprint className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-white uppercase tracking-tight">8004 Handshake</h4>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest">Biometric Ratification</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </section>
      </div>

      {/* Footer Status - Terminal Style */}
      <div className="px-6 py-3 border-t border-white/5 bg-black flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-3 h-3 text-emerald-500" />
            <span className="text-[8px] font-bold text-emerald-500/80 uppercase tracking-[0.2em]">Shield Substrate: Operational</span>
          </div>
          <div className="flex items-center gap-2">
            <Database className="w-3 h-3 text-slate-600" />
            <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em]">Ledger Sync: 100%</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-3 h-3 text-slate-600" />
          <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em]">PQC-Shield Active</span>
        </div>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {(isScanning || isRatifying) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <div className="w-full max-w-sm p-8 rounded-[2.5rem] bg-[#151619] border border-white/10 text-center relative overflow-hidden">
              {/* Hardware Scan Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div 
                  animate={{ y: [0, 300, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="h-px w-full bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                />
              </div>

              {isScanning ? (
                <>
                  <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Scanning BIS QR</h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed">Align encrypted code within the viewfinder for 8004 validation.</p>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Fingerprint className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2">8004 Handshake</h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed">Place finger on sensor or align face for RBI-standard ratification.</p>
                </>
              )}

              <button 
                onClick={() => { setIsScanning(false); setIsRatifying(false); }}
                className="mt-8 px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
              >
                Abort Mission
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
