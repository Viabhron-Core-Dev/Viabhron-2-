import { Star } from 'lucide-react';
import { Extension } from '../../../src/types';

export const trustpilotConnector: Extension = {
  id: 'trustpilot',
  name: 'Trustpilot AI Visibility',
  description: 'Passive brand monitoring and AI search visibility.',
  icon: Star,
  category: 'connector',
  status: 'active',
  source: 'inbuilt'
};
