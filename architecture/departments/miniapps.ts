import { Moss } from '../types';

export const INITIAL_MOSS_APPS: Moss[] = [
  {
    id: 'ma-pulse',
    name: 'Pulse Monitor',
    description: 'Real-time situational awareness of the OS kernel and metabolic state.',
    icon: 'Activity',
    enabled: true,
    type: 'local',
    category: 'core',
    status: 'active'
  },
  {
    id: 'ma-scribe',
    name: 'The Scribe',
    description: 'Private, local-first note taking with optional Sovereign Cloud backup.',
    icon: 'FileText',
    enabled: true,
    type: 'local',
    category: 'utility',
    status: 'active'
  },
  {
    id: 'ma-gatekeeper',
    name: 'The Gatekeeper',
    description: 'Mobile security dashboard for emergency lockdown and passkey management.',
    icon: 'ShieldCheck',
    enabled: true,
    type: 'sovereign',
    category: 'security',
    status: 'active'
  },
  {
    id: 'ma-forge',
    name: 'Vibe Forge',
    description: 'Mobile-native AI IDE for rapid agent prototyping and substrate coding.',
    icon: 'Hammer',
    enabled: true,
    type: 'sovereign',
    category: 'forge',
    status: 'inactive'
  },
  {
    id: 'ma-nexus',
    name: 'The Nexus',
    description: 'Relational knowledge graph of all OS data and agent findings.',
    icon: 'Brain',
    enabled: true,
    type: 'sovereign',
    category: 'intelligence',
    status: 'inactive'
  }
];
