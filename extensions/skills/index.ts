import { Activity, FileText, Box, Search, Shield, Github, Palette } from 'lucide-react';
import { Extension } from '../../src/types';

export const globalPulseSkill: Extension = {
  id: 'global-pulse',
  name: 'Global Pulse',
  description: 'Real-time monitoring of global trends and events.',
  icon: Activity,
  category: 'skill',
  status: 'active',
  source: 'inbuilt'
};

export const docForgeSkill: Extension = {
  id: 'doc-forge',
  name: 'Doc Forge',
  description: 'Automated document generation and formatting.',
  icon: FileText,
  category: 'skill',
  status: 'active',
  source: 'inbuilt'
};

export const artifactSandboxSkill: Extension = {
  id: 'artifact-sandbox',
  name: 'Artifact Sandbox',
  description: 'Isolated environment for testing and refining artifacts.',
  icon: Box,
  category: 'skill',
  status: 'active',
  source: 'inbuilt'
};

export const codeHunterSkill: Extension = {
  id: 'code-hunter',
  name: 'Code Hunter',
  description: 'Advanced code search and vulnerability detection.',
  icon: Search,
  category: 'skill',
  status: 'active',
  source: 'inbuilt'
};

export const socialSentinelSkill: Extension = {
  id: 'social-sentinel',
  name: 'Social Sentinel',
  description: 'Monitoring and analysis of social media footprints.',
  icon: Shield,
  category: 'skill',
  status: 'active',
  source: 'inbuilt'
};

export const githubSecurityAuditorSkill: Extension = {
  id: 'github-auditor',
  name: 'GitHub Security Auditor',
  description: 'Automated security auditing for GitHub repositories.',
  icon: Github,
  category: 'skill',
  status: 'active',
  source: 'inbuilt'
};

export const creativeDirectorSkill: Extension = {
  id: 'creative-director-skill',
  name: 'Creative Director Skill',
  description: 'High-level visual orchestration and creative guidance.',
  icon: Palette,
  category: 'skill',
  status: 'active',
  source: 'inbuilt'
};
