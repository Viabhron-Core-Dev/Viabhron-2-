import { RatificationProposal } from '../types';

export const INITIAL_PROPOSALS: RatificationProposal[] = [
  {
    id: 'prop-treasury-module',
    title: 'Activate Pooled Treasury',
    description: 'Enables task-based credit allocation. Replaces per-agent fees with a unified "Pooled Treasury" for dynamic intelligence funding.',
    type: 'infrastructure',
    impact: {
      tokenCost: '+5% reasoning overhead',
      computeCost: '+50MB RAM',
      benefit: 'Eliminates per-seat waste; funds are allocated only to active, high-priority agent tasks.'
    },
    status: 'pending',
    shadowModeAvailable: true,
    createdAt: new Date()
  },
  {
    id: 'prop-judicial-oversight',
    title: 'Establish Judicial Oversight',
    description: 'Activates the Guardian as a constitutional auditor to ensure all agent actions are Charter-compliant.',
    type: 'governance',
    impact: {
      tokenCost: '+15% reasoning overhead',
      computeCost: '+100MB RAM',
      benefit: 'Reduces hallucination-driven security risks by 40%.'
    },
    status: 'pending',
    shadowModeAvailable: true,
    sunsetClause: {
      reviewIntervalDays: 30
    },
    createdAt: new Date()
  },
  {
    id: 'prop-intelligence-division',
    title: 'Hatch Intelligence Division',
    description: 'Formalizes the Librarian and Global Pulse into a dedicated recon unit for OSINT.',
    type: 'department',
    impact: {
      tokenCost: '+10% reasoning overhead',
      computeCost: '+200MB RAM',
      benefit: 'Provides the Chairman with a Daily Intelligence Briefing on AI ecosystem changes.'
    },
    status: 'pending',
    isUnfolded: false,
    shadowModeAvailable: false,
    createdAt: new Date()
  },
  {
    id: 'prop-mistral-forge',
    title: 'Mistral Sovereign Forge',
    description: 'Enables fine-tuning of frontier-grade AI models using your private business data from the Neural Archive.',
    type: 'infrastructure',
    impact: {
      tokenCost: 'High (Training API costs)',
      computeCost: '+500MB Staging RAM',
      benefit: 'Builds proprietary intelligence that knows your business perfectly.'
    },
    status: 'pending',
    shadowModeAvailable: false,
    createdAt: new Date()
  },
  {
    id: 'prop-turboquant-patch',
    title: 'TurboQuant Substrate Patch',
    description: 'Implements 3-bit KV cache compression for 8x faster attention scoring and 60% reduced memory footprint.',
    type: 'infrastructure',
    impact: {
      tokenCost: 'Neutral (Lossless)',
      computeCost: '-60% RAM usage',
      benefit: 'Enables massive context windows and near-instant inference speeds.'
    },
    status: 'pending',
    shadowModeAvailable: true,
    createdAt: new Date()
  },
  {
    id: 'prop-device-intelligence',
    title: 'Activate Device Intelligence',
    description: 'Integrates Fingerprint MCP for device-level fraud prevention and hardware-verified access control.',
    type: 'infrastructure',
    impact: {
      tokenCost: 'Minimal (Per-action verification)',
      computeCost: '+10MB RAM (MCP Proxy)',
      benefit: 'Prevents session hijacking and unauthorized agentic transactions by verifying the Chairman\'s physical hardware.'
    },
    status: 'pending',
    shadowModeAvailable: true,
    createdAt: new Date()
  },
  {
    id: 'prop-project-void',
    title: 'Project VOID: Physics-Aware Video Forge',
    description: 'Implements Netflix\'s VOID framework for physics-accurate object erasure and scene manipulation in video.',
    type: 'infrastructure',
    impact: {
      tokenCost: 'High (Gemini 3 Pro reasoning)',
      computeCost: 'Extreme (40GB+ VRAM / GPU-on-demand)',
      benefit: 'Professional-grade video manipulation that respects physical interactions (collisions, splashes).'
    },
    status: 'pending',
    shadowModeAvailable: false,
    createdAt: new Date()
  },
  {
    id: 'prop-visual-navigation',
    title: 'Activate Visual Web Navigation',
    description: 'Integrates Ai2\'s MolmoWeb for human-like web navigation via screenshots, bypassing fragile HTML parsing.',
    type: 'infrastructure',
    impact: {
      tokenCost: 'Zero (Self-hosted on private GPU)',
      computeCost: 'Moderate (Requires GPU for visual reasoning)',
      benefit: '100% success rate on dynamic web apps and zero reliance on HTML selectors; total privacy for sensitive dashboards.'
    },
    status: 'pending',
    shadowModeAvailable: true,
    createdAt: new Date()
  },
  {
    id: 'prop-mobile-command',
    title: 'Activate Mobile Command (Intercom Bridge)',
    description: 'Enables private Telegram/Discord integration for 24/7 command over the OS and live Forge sessions from any mobile device.',
    type: 'governance',
    impact: {
      tokenCost: 'Minimal (Message translation overhead)',
      computeCost: '+20MB RAM (Sovereign Webhook Receiver)',
      benefit: 'Maintains "Mobile Command" over the OS; allows the Chairman to ratify Forge decisions on the go via encrypted intercom.'
    },
    status: 'pending',
    shadowModeAvailable: true,
    createdAt: new Date()
  },
  {
    id: 'prop-multi-client-substrate',
    title: 'Activate Multi-Client Substrate',
    description: 'Formalizes a Sovereign API Gateway to allow multiple accredited clients (Mobile, Desktop, CLI, Background Apps) to connect to the OS.',
    type: 'infrastructure',
    impact: {
      tokenCost: 'Neutral (Same reasoning, different windows)',
      computeCost: '+50MB RAM (API Gateway & Client Management)',
      benefit: 'Turns Viabhron into a system-wide intelligence layer that follows the Chairman across every device and application.'
    },
    status: 'pending',
    shadowModeAvailable: true,
    createdAt: new Date()
  },
  {
    id: 'prop-pwa-launcher',
    title: 'Hatch Sovereign PWA (Mobile Desk)',
    description: 'Enables a lightweight PWA launcher for "Mini-Apps" (Notes, Auditor, Pulse) with hybrid Local/Sovereign sync capabilities.',
    type: 'infrastructure',
    impact: {
      tokenCost: 'Minimal (UI interactions only)',
      computeCost: '+10MB RAM (Service Worker & Manifest)',
      benefit: 'Provides a frictionless mobile entry point to the OS; allows for private, offline-first data capture with optional cloud backup.'
    },
    status: 'pending',
    shadowModeAvailable: true,
    createdAt: new Date()
  },
  {
    id: 'prop-multi-terminal',
    title: 'Activate Sovereign Multi-Terminal Substrate',
    description: 'Enables deep-system accreditation for Native Desktop, CLI, and Browser Extension clients, allowing for hardware-verified access and granular permission scoping.',
    type: 'infrastructure',
    impact: {
      tokenCost: 'Neutral (Shared reasoning)',
      computeCost: '+100MB RAM (Enhanced API Gateway & Session Management)',
      benefit: 'Turns the OS into a "Headless Nexus" that follows you across every device; enables local file indexing and system-level automation from accredited terminals.'
    },
    status: 'pending',
    shadowModeAvailable: true,
    createdAt: new Date()
  }
];
