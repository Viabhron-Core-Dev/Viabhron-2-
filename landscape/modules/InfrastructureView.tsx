import React from 'react';
import { motion } from 'motion/react';
import { 
  Fingerprint, 
  Radar, 
  Zap, 
  Database, 
  List,
  Shield,
  Activity,
  Lock,
  Network,
  Cpu
} from 'lucide-react';
import { TabType, UIMode, Agent } from '../../types';

interface InfrastructureViewProps {
  type: TabType;
  uiMode?: UIMode;
  agents?: Agent[];
}

export const InfrastructureView: React.FC<InfrastructureViewProps> = ({ type, uiMode, agents = [] }) => {
  const getDetails = () => {
    switch (type) {
      case 'identity-8004':
        return {
          title: 'Identity-8004',
          description: 'Sovereign Identity Protocol & Digital Passport Management',
          icon: Fingerprint,
          color: 'text-blue-400',
          bgColor: 'bg-blue-500/10',
          borderColor: 'border-blue-500/20',
          metrics: [
            { label: 'Accredited Agents', value: agents.length.toString(), icon: Lock },
            { label: 'Passport Status', value: 'Active', icon: Shield },
            { label: 'Trust Score', value: '99.8', icon: Activity }
          ]
        };
      case 'security-radar':
        return {
          title: 'Security-Radar',
          description: 'Global Threat Detection & Real-time Anomaly Monitoring',
          icon: Radar,
          color: 'text-red-400',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/20',
          metrics: [
            { label: 'Threats Blocked', value: '1,245', icon: Shield },
            { label: 'System Integrity', value: '100%', icon: Activity },
            { label: 'Active Scans', value: '4', icon: Radar }
          ]
        };
      case 'vibe-assembly':
        return {
          title: 'Vibe-Assembly',
          description: 'Artisanal UI Generation & Style Synthesis Engine',
          icon: Zap,
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/20',
          metrics: [
            { label: 'Active Styles', value: '8', icon: Zap },
            { label: 'UI Components', value: '156', icon: Network },
            { label: 'Synthesis Rate', value: '0.8s', icon: Activity }
          ]
        };
      case 'memory-palace':
        return {
          title: 'Memory-Palace',
          description: 'Persistent Relational Knowledge Graph & OS Memory',
          icon: Database,
          color: 'text-green-400',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/20',
          metrics: [
            { label: 'Nodes', value: '45,201', icon: Network },
            { label: 'Edges', value: '120,450', icon: Activity },
            { label: 'Memory Usage', value: '1.2GB', icon: Database }
          ]
        };
      case 'agent-registry':
        return {
          title: 'Agent-Registry',
          description: 'Governed Catalog of Accredited Agents & Capabilities',
          icon: List,
          color: 'text-purple-400',
          bgColor: 'bg-purple-500/10',
          borderColor: 'border-purple-500/20',
          metrics: [
            { label: 'Total Agents', value: agents.length.toString(), icon: List },
            { label: 'Active Missions', value: '3', icon: Activity },
            { label: 'Registry Status', value: 'Synced', icon: Network }
          ]
        };
      default:
        return {
          title: 'Infrastructure Module',
          description: 'Sovereign System Component',
          icon: Cpu,
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/10',
          borderColor: 'border-gray-500/20',
          metrics: []
        };
    }
  };

  const details = getDetails();
  const Icon = details.icon;

  return (
    <div className={`h-full flex flex-col ${uiMode === 'vaa' ? 'p-8' : 'p-4'} bg-gray-950 overflow-y-auto`}>
      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex items-start gap-6">
          <div className={`p-4 rounded-3xl ${details.bgColor} border ${details.borderColor}`}>
            <Icon className={`w-8 h-8 ${details.color}`} />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">{details.title}</h1>
            <p className="text-gray-400 text-lg leading-relaxed">{details.description}</p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {details.metrics.map((metric, idx) => {
            const MetricIcon = metric.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-900/50 border border-white/5 p-6 rounded-3xl space-y-3"
              >
                <div className="flex items-center gap-2 text-gray-500">
                  <MetricIcon className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">{metric.label}</span>
                </div>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Area */}
        {type === 'agent-registry' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Accredited Agents</h3>
              <button className="text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors">
                Add New Agent
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {agents.map((agent) => (
                <div 
                  key={agent.id}
                  className="bg-gray-900/50 border border-white/5 p-4 rounded-2xl flex items-center gap-4 hover:border-white/10 transition-all group"
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: agent.color }}
                  >
                    {agent.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{agent.name}</span>
                      <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400 uppercase font-bold tracking-tighter">
                        {agent.role}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{agent.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-gray-600'}`} />
                    <span className="text-[10px] font-bold text-gray-500 uppercase">{agent.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gray-900/30 border border-dashed border-white/10 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className={`p-6 rounded-full ${details.bgColor} opacity-50`}>
              <Icon className={`w-12 h-12 ${details.color}`} />
            </div>
            <div className="space-y-2 max-w-md">
              <h3 className="text-xl font-bold text-white">Kernel Integration Active</h3>
              <p className="text-gray-500 text-sm">
                The {details.title} module is fully integrated into the Sovereign Kernel. 
                Real-time data streams are currently being established from your private Cloud Run substrate.
              </p>
            </div>
            <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white uppercase tracking-widest transition-all">
              Open Advanced Console
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
