import { BookOpen } from 'lucide-react';
import { Extension } from '../../../src/types';

export const substackConnector: Extension = {
  id: 'substack',
  name: 'Sovereign Publishing Hub',
  description: 'Automated content management and newsletter publishing.',
  icon: BookOpen,
  category: 'connector',
  status: 'active',
  source: 'inbuilt'
};
