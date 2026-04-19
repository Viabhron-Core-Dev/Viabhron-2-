import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  Database, 
  Globe, 
  Zap, 
  Shield, 
  Server,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UIMode } from '../../src/types';

const data = [
  { time: '00:00', cpu: 12, mem: 45, tokens: 1200 },
  { time: '04:00', cpu: 25, mem: 52, tokens: 2500 },
  { time: '08:00', cpu: 45, mem: 68, tokens: 5800 },
  { time: '12:00', cpu: 85, mem: 82, tokens: 12000 },
  { time: '16:00', cpu: 65, mem: 75, tokens: 8500 },
  { time: '20:00', cpu: 35, mem: 60, tokens: 4200 },
  { time: '23:59', cpu: 15, mem: 48, tokens: 1500 },
];

export function SystemMetrics({ uiMode }: { uiMode?: UIMode }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'cloud'>('overview');

  return (
    <div className={`h-full flex flex-col bg-gray-950 overflow-hidden ${uiMode === 'browser' ? 'pb-32 md:pb-0' : ''}`}>
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-gray-900/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-green-600/20 flex items-center justify-center">
            <Activity className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-tight">System Metrics</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Office Performance Monitor</p>
          </div>
        </div>

        <div className="flex bg-gray-950 rounded-xl p-1 border border-white/5">
          {['overview', 'agents', 'cloud'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === tab ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Head Agent Load', value: '42%', icon: Cpu, color: 'text-blue-400', trend: '+5%', up: true },
            { label: 'Token Usage', value: '1.2M', icon: Zap, color: 'text-yellow-400', trend: '-12%', up: false },
            { label: 'Active MCPs', value: '8', icon: Database, color: 'text-purple-400', trend: 'Stable', up: null },
            { label: 'Cloud Uptime', value: '99.9%', icon: Globe, color: 'text-green-400', trend: '+0.1%', up: true },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 bg-gray-900/50 border border-white/5 rounded-2xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon className="w-4 h-4" />
                </div>
                {stat.up !== null && (
                  <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.trend}
                  </div>
                )}
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-900/50 border border-white/5 rounded-3xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                Agent Resource Usage
              </h3>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="time" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '10px', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCpu)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 bg-gray-900/50 border border-white/5 rounded-3xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                Token Consumption
              </h3>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="time" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '10px', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="tokens" stroke="#eab308" fillOpacity={1} fill="url(#colorTokens)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Cloud Run Status */}
        <div className="p-6 bg-gray-900/50 border border-white/5 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Server className="w-4 h-4 text-green-400" />
              Cloud Run Instances
            </h3>
            <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-bold text-green-400 uppercase tracking-widest">
              Healthy
            </div>
          </div>
          <div className="space-y-3">
            {[
              { name: 'viabhron-engine-prod', status: 'Running', region: 'us-west2', load: '12%' },
              { name: 'viabhron-mcp-gateway', status: 'Running', region: 'us-west2', load: '4%' },
              { name: 'viabhron-sandbox-v1', status: 'Idle', region: 'us-west2', load: '0%' },
            ].map((instance, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-950/50 border border-white/5 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-200">{instance.name}</div>
                    <div className="text-[9px] text-gray-600 uppercase tracking-widest">{instance.region}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-green-400">{instance.status}</div>
                  <div className="text-[9px] text-gray-600 uppercase tracking-widest">Load: {instance.load}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
