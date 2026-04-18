import { SOP } from '../types';

export const INITIAL_SOPS: SOP[] = [
  {
    id: 'sop-corporate-charter',
    title: 'Corporate Charter (The Prime Directive)',
    description: 'The foundational constitution of the OS, defining evolutionary purpose and sovereignty.',
    department: 'Governance & Security',
    leadAgentId: 'agent-architect',
    supportAgentIds: ['agent-guardian'],
    requiredExtensionIds: ['s1', 't9'], // Governance Toolkit, Sentinel Guardian
    manifest: `
CHARTER:
  Sovereignty: Absolute
  Purpose: Evolutionary
  Growth: Antifragile
  Oversight: Chairman_Veto
    `,
    status: 'active'
  },
  {
    id: 'sop-security-red-team',
    title: 'Security Red-Team (Adversarial Audit)',
    description: 'Proactive vulnerability scanning and adversarial review of code repositories.',
    department: 'Security Division',
    leadAgentId: 'agent-github-security-auditor',
    supportAgentIds: ['agent-architect'],
    requiredExtensionIds: ['s4', 't3', 't10'], // Code Hunter, Code Parser, Sentinel Guardian
    manifest: `
FLOW:
  CodeHunter(Repo) -> 
  CodeParser(AST) -> 
  SecurityAuditor(Scan) -> 
  Sentinel(Alert)
    `,
    status: 'active'
  },
  {
    id: 'sop-content-production',
    title: 'Content Production House',
    description: 'End-to-end creative workflow from concept to Workspace export.',
    department: 'Creative Studio',
    leadAgentId: 'agent-creative-director',
    supportAgentIds: ['agent-production-staff'],
    requiredExtensionIds: ['t11', 'm4', 's3'], // Sovereign Creative Studio, Google Workspace, Artifact Sandbox
    manifest: `
FLOW:
  CreativeDirector(Canvas) -> 
  Studio(Render) -> 
  Sandbox(Preview) -> 
  Workspace(Export_to_Doc)
    `,
    status: 'active'
  },
  {
    id: 'sop-intelligence-librarian',
    title: 'Intelligence Librarian (Research & Sync)',
    description: 'Continuous monitoring of AI hubs and real-time documentation synchronization.',
    department: 'Research & Development',
    leadAgentId: 'agent-librarian',
    supportAgentIds: ['agent-architect'],
    requiredExtensionIds: ['c4', 'm3', 's2'], // Hugging Face, Gemini API Docs, Doc Forge
    manifest: `
FLOW:
  Librarian(Scan_HF/GitHub) -> 
  GeminiPulse(Update_Docs) -> 
  DocForge(Generate_Brief)
    `,
    status: 'active'
  }
];
