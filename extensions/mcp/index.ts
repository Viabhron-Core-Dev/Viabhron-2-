import { Database, Activity, Book, Cloud, Zap } from 'lucide-react';
import { Extension } from '../../src/types';

export const localDatabaseMcp: Extension = {
  id: 'local-db-mcp',
  name: 'Local Database MCP',
  description: 'Standardized access to local data storage.',
  icon: Database,
  category: 'mcp',
  status: 'active',
  source: 'inbuilt'
};

export const systemMetricsMcp: Extension = {
  id: 'system-metrics-mcp',
  name: 'System Metrics MCP',
  description: 'Standardized telemetry and performance monitoring.',
  icon: Activity,
  category: 'mcp',
  status: 'active',
  source: 'inbuilt'
};

export const geminiApiDocsMcp: Extension = {
  id: 'gemini-docs-mcp',
  name: 'Gemini API Docs MCP',
  description: 'Standardized access to Gemini API documentation.',
  icon: Book,
  category: 'mcp',
  status: 'active',
  source: 'inbuilt'
};

export const googleWorkspaceMcp: Extension = {
  id: 'google-workspace-mcp',
  name: 'Google Workspace MCP',
  description: 'Standardized integration with Google Workspace services.',
  icon: Cloud,
  category: 'mcp',
  status: 'active',
  source: 'inbuilt'
};

export const openClawProtocol: Extension = {
  id: 'openclaw-protocol',
  name: 'OpenClaw Protocol',
  description: 'Self-building substrate for autonomous OS evolution.',
  icon: Zap,
  category: 'mcp',
  status: 'active',
  source: 'inbuilt'
};
