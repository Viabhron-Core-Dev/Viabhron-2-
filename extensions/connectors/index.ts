export * from './x402';
export * from './trustpilot';
export * from './arduino';
export * from './flowise';
export * from './substack';
export * from './luma-uni-1';

// Gamma Sovereign Extensions
export * from './cloudflare-cf-bridge';
export * from './framework-adapter-bridge';
export * from './linguistic-bridge';
export * from './quantum-ops-bridge';
export * from './sovereign-academy-bridge';
export * from './sovereign-agent-forge';
export * from './sovereign-interaction-substrate';
export * from './sovereign-payment-shield';
export * from './sovereign-pulse-feed';
export * from './sovereign-social-sandbox';
export * from './sovereign-threat-intel';
export * from './workspace-bridge';
export * from './sovereign-news-bridge';
export * from './sovereign-supply-chain-shield';
export * from './sovereign-mcp-shield';
export * from './sovereign-mesh-connector';

// Placeholders for missing connectors to fix build errors
import { Github, Link, Zap, Cloud, Mail, MessageSquare } from 'lucide-react';
import { Extension } from '../../src/types';

export const githubConnector: Extension = {
  id: 'github',
  name: 'GitHub Connector',
  description: 'Secure bridge to GitHub repositories and workflows.',
  icon: Github,
  category: 'connector',
  status: 'active',
  source: 'inbuilt'
};

export const linearConnector: Extension = {
  id: 'linear',
  name: 'Linear Connector',
  description: 'Syncs tickets from Linear to trigger autonomous Symphony runs.',
  icon: Link,
  category: 'connector',
  status: 'active',
  source: 'inbuilt'
};

export const cqConnector: Extension = {
  id: 'cq',
  name: 'Collective Intelligence (cq)',
  description: 'Knowledge-sharing system to prevent redundant AI processing.',
  icon: Zap,
  category: 'connector',
  status: 'active',
  source: 'inbuilt'
};

export const huggingFaceConnector: Extension = {
  id: 'huggingface',
  name: 'Hugging Face Connector',
  description: 'Access to models, datasets, and Spaces on Hugging Face Hub.',
  icon: Cloud,
  category: 'connector',
  status: 'active',
  source: 'inbuilt'
};

export const gmailConnector: Extension = {
  id: 'gmail',
  name: 'Gmail Connector',
  description: 'Secure bridge to Gmail for automated email management.',
  icon: Mail,
  category: 'connector',
  status: 'active',
  source: 'inbuilt'
};

export const slackConnector: Extension = {
  id: 'slack',
  name: 'Slack Connector',
  description: 'Integration with Slack workspaces for agent communication.',
  icon: MessageSquare,
  category: 'connector',
  status: 'active',
  source: 'inbuilt'
};
