import { CreditCard } from 'lucide-react';
import { Extension } from '../../../src/types';

export const x402Connector: Extension = {
  id: 'x402',
  name: 'Sovereign x402 Gateway',
  description: 'Autonomous, consumption-based billing for AI services.',
  icon: CreditCard,
  category: 'connector',
  status: 'active',
  source: 'inbuilt'
};
