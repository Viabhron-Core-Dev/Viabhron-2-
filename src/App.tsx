import React, { useState } from 'react';
import { VaaClient } from '../vaa/VaaClient';
import { INITIAL_EXTENSIONS } from '../extensions/registry';
import { Agent, Extension, Moss, Secret } from './types';

const App: React.FC = () => {
  // --- Global State ---
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 'cloud-manager',
      name: 'Cloud Manager',
      description: 'Primary Sovereign Kernel Manager.',
      role: 'head',
      provider: 'gemini',
      model: 'gemini-2.0-flash',
      status: 'active',
      isAnchor: true,
      isResident: true,
      color: '#3B82F6',
      capabilities: ['orchestration', 'resource-management'],
      systemInstruction: 'You are the primary Sovereign Kernel Manager of Viabhron.',
      lastActive: new Date()
    }
  ]);

  const [extensions, setExtensions] = useState<Extension[]>(INITIAL_EXTENSIONS);
  const [moss, setMoss] = useState<Moss[]>([
    {
      id: 'ma-pulse',
      name: 'Pulse Monitor',
      description: 'Metabolic & Security Monitoring',
      icon: 'Activity',
      enabled: true,
      type: 'sovereign',
      category: 'core',
      status: 'active'
    },
    {
      id: 'ma-scribe',
      name: 'The Scribe',
      description: 'Linguistic Engineering & Documentation',
      icon: 'FileText',
      enabled: true,
      type: 'sovereign',
      category: 'intelligence',
      status: 'active'
    },
    {
      id: 'ma-gatekeeper',
      name: 'The Gatekeeper',
      description: 'Compliance & Safety Sentinel',
      icon: 'Shield',
      enabled: true,
      type: 'sovereign',
      category: 'security',
      status: 'active'
    },
    {
      id: 'hatchery',
      name: 'The Hatchery',
      description: 'Agent Onboarding & Development',
      icon: 'Egg',
      enabled: true,
      type: 'sovereign',
      category: 'forge',
      status: 'active'
    }
  ]);
  const [secrets, setSecrets] = useState<Secret[]>([]);

  // --- Handlers ---
  const handleCreateAgent = (newAgent: Partial<Agent>) => {
    const agent: Agent = {
      id: `agent-${Date.now()}`,
      name: newAgent.name || 'New Agent',
      description: newAgent.description || '',
      role: newAgent.role || 'contractor',
      provider: newAgent.provider || 'gemini',
      model: newAgent.model || 'gemini-2.0-flash',
      status: 'active',
      color: newAgent.color || '#6366F1',
      systemInstruction: newAgent.systemInstruction || '',
      capabilities: newAgent.capabilities || [],
      activeExtensionIds: [],
      lastActive: new Date()
    };
    setAgents(prev => [...prev, agent]);
  };

  const handleToggleMoss = (id: string) => {
    setMoss(prev => prev.map(app => 
      app.id === id ? { ...app, enabled: !app.enabled } : app
    ));
  };

  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      <VaaClient 
        agents={agents}
        extensions={extensions}
        moss={moss}
        secrets={secrets}
        onCreateAgent={handleCreateAgent}
        onToggleMoss={handleToggleMoss}
      />
    </div>
  );
};

export default App;
