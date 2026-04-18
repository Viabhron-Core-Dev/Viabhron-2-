import { Client } from '../types';

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cl-desktop',
    name: 'Desktop Terminal',
    description: 'Deep-system access for local file indexing and hardware monitoring.',
    icon: 'Monitor',
    enabled: false,
    type: 'native',
    status: 'inactive',
    accreditationId: 'ac-001'
  },
  {
    id: 'cl-cli',
    name: 'Ghost CLI',
    description: 'Command-line interface for headless OS control and Forge automation.',
    icon: 'Terminal',
    enabled: true,
    type: 'cli',
    status: 'active',
    accreditationId: 'ac-002'
  },
  {
    id: 'cl-browser',
    name: 'Intelligence Overlay',
    description: 'Browser extension for real-time web context and agentic navigation.',
    icon: 'Chrome',
    enabled: false,
    type: 'web',
    status: 'inactive',
    accreditationId: 'ac-003'
  }
];
