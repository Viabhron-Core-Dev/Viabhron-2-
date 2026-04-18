import { Cpu } from 'lucide-react';
import { Extension } from '../../../src/types';

export const arduinoConnector: Extension = {
  id: 'arduino',
  name: 'Sovereign I/O Bridge',
  description: 'Hardware interfacing and IoT node management (Arduino).',
  icon: Cpu,
  category: 'connector',
  status: 'active',
  source: 'inbuilt'
};
