import { 
  User, 
  Wallet, 
  Fingerprint, 
  Shield, 
  Search,
  Users,
  MessageSquare,
  PenTool,
  Music,
  Video,
  Image,
  Globe,
  Zap,
  Cpu,
  Database,
  Share2,
  Lock,
  Eye,
  Activity
} from 'lucide-react';
import { Extension } from '../../src/types';

export const cloudManagerAgent: Extension = {
  id: 'cloud-manager',
  name: 'The Cloud Manager',
  description: 'High-level strategy, mission ratification, cross-agent orchestration, and root authority.',
  icon: User,
  category: 'agent',
  status: 'active',
  source: 'inbuilt'
};

export const fiscalComptrollerAgent: Extension = {
  id: 'fiscal-comptroller',
  name: 'The Fiscal Comptroller',
  description: 'Autonomous budget management, x402 payment processing, and metabolic monitoring.',
  icon: Wallet,
  category: 'agent',
  status: 'active',
  source: 'inbuilt'
};

export const identityRegistrarAgent: Extension = {
  id: 'identity-registrar',
  name: 'The Sovereign Identity Registrar',
  description: 'Management of the 8004 Identity Protocol and agent accreditation.',
  icon: Fingerprint,
  category: 'agent',
  status: 'active',
  source: 'inbuilt'
};

export const sentinelAgent: Extension = {
  id: 'sentinel-agent',
  name: 'The Sentinel',
  description: 'Threat detection and system log auditing.',
  icon: Shield,
  category: 'agent',
  status: 'active',
  source: 'inbuilt'
};

export const adversarialAuditorAgent: Extension = {
  id: 'adversarial-auditor',
  name: 'The Adversarial Auditor',
  description: 'Vulnerability detection and zero-trust security audits.',
  icon: Search,
  category: 'agent',
  status: 'active',
  source: 'inbuilt'
};

export const swarmArchitectAgent: Extension = {
  id: 'swarm-architect',
  name: 'The Swarm Architect',
  description: 'Orchestration of large-scale multi-agent swarms and collective behavior.',
  icon: Users,
  category: 'agent',
  status: 'active',
  source: 'inbuilt'
};

export const linguisticEngineerAgent: Extension = {
  id: 'linguistic-engineer',
  name: 'The Linguistic Engineer',
  description: 'Optimization of agent communication, prompt engineering, and semantic alignment.',
  icon: MessageSquare,
  category: 'agent',
  status: 'active',
  source: 'inbuilt'
};

export const chiefEditorAgent: Extension = {
  id: 'chief-editor',
  name: 'The Chief Editor',
  description: 'Content management and newsletter publishing.',
  icon: PenTool,
  category: 'agent',
  status: 'active',
  source: 'inbuilt'
};

export const soundEngineerAgent: Extension = {
  id: 'sound-engineer',
  name: 'The Sound Engineer',
  description: 'Music theory, arrangement, and audio synthesis.',
  icon: Music,
  category: 'agent',
  status: 'active',
  source: 'inbuilt'
};

export const visualSynthesizerAgent: Extension = {
  id: 'visual-synthesizer',
  name: 'The Visual Synthesizer',
  description: 'Prompt engineering and visual composition for image and video assets.',
  icon: Image,
  category: 'agent',
  status: 'active',
  source: 'inbuilt'
};
