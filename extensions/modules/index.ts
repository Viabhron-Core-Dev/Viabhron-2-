import { 
  Terminal, 
  Activity, 
  Cpu, 
  Shield, 
  Zap, 
  Command, 
  Eye, 
  Palette, 
  Share2, 
  Music, 
  Image, 
  Video, 
  Box,
  Layers,
  Lock,
  Radar,
  List,
  Activity as Pulse,
  MessageSquare,
  Network,
  Database,
  RefreshCw,
  Bus,
  Send,
  Brain,
  Scale,
  Globe,
  Zap as Vibe,
  Fingerprint,
  GitBranch,
  Settings2,
  Key,
  Users,
  MessageCircle,
  ShieldAlert,
  Dna,
  Workflow,
  History,
  Coins,
  Building2,
  Search,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { Extension } from '../../src/types';

export const agentTerminalModule: Extension = {
  id: 'terminal',
  name: 'Agent Terminal',
  description: 'Secure shell execution and system command interface.',
  icon: Terminal,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const systemMetricsModule: Extension = {
  id: 'metrics',
  name: 'System Metrics',
  description: 'Real-time telemetry and resource monitoring.',
  icon: Activity,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const simulationEngineModule: Extension = {
  id: 'simulation',
  name: 'Simulation Engine',
  description: 'Multi-agent scenario testing and digital twin simulations.',
  icon: Cpu,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const governanceToolkitModule: Extension = {
  id: 'governance',
  name: 'Governance Toolkit',
  description: 'Management of system policies, SOPs, and ratifications.',
  icon: Shield,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const vibeForgeModule: Extension = {
  id: 'forge',
  name: 'Vibe Forge',
  description: 'Autonomous implementation and code generation sandbox.',
  icon: Zap,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const agentCliModule: Extension = {
  id: 'agent-cli',
  name: 'Agent CLI',
  description: 'Command-line interface for direct agent interaction.',
  icon: Command,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const sentinelGuardianModule: Extension = {
  id: 'sentinel',
  name: 'Sentinel Guardian',
  description: 'Real-time threat detection and security auditing.',
  icon: Eye,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const sovereignCreativeStudioModule: Extension = {
  id: 'creative',
  name: 'Creative Studio',
  description: 'Visual orchestration and multi-step creative workflows.',
  icon: Palette,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const viabhronNexusModule: Extension = {
  id: 'nexus',
  name: 'Viabhron Nexus',
  description: 'Relational knowledge graph and persistent OS memory.',
  icon: Share2,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const symphonyModule: Extension = {
  id: 'symphony',
  name: 'Symphony Orchestration',
  description: 'Autonomous project implementation and workflow management.',
  icon: Layers,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const soundForgeModule: Extension = {
  id: 'sound-forge',
  name: 'Sound Forge',
  description: 'Audio synthesis and music theory arrangement.',
  icon: Music,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const imageStudioModule: Extension = {
  id: 'image-studio',
  name: 'Image Studio',
  description: 'Advanced image analysis and visual reasoning.',
  icon: Image,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const videoSuiteModule: Extension = {
  id: 'video-suite',
  name: 'Video Suite',
  description: 'Video processing and motion synthesis.',
  icon: Video,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const mossSystemModule: Extension = {
  id: 'moss',
  name: 'MOSS System',
  description: 'Modular Operating Substrate System for edge deployment.',
  icon: Box,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

// Additional modules from the new hierarchy
export const identity8004Module: Extension = {
  id: 'identity-8004',
  name: 'Sovereign Identity & 8004',
  description: 'Management of the 8004 Sovereign Identity Protocol.',
  icon: Lock,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const securityRadarModule: Extension = {
  id: 'security-radar',
  name: 'Global Security Radar',
  description: 'Real-time monitoring of global security threats and anomalies.',
  icon: Radar,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const agentRegistryModule: Extension = {
  id: 'agent-registry',
  name: 'Governed Agent Catalog',
  description: 'Registry of all accredited agents and their capabilities.',
  icon: List,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const smonitorProtocolModule: Extension = {
  id: 'smonitor-protocol',
  name: 'Sovereign Monitor Protocol (SMP)',
  description: 'Distributed telemetry and pulse-checking substrate.',
  icon: Pulse,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const linguisticBridgeModule: Extension = {
  id: 'linguistic-bridge',
  name: 'Linguistic Bridge',
  description: 'Cross-model semantic mapping and prompt hardening.',
  icon: MessageSquare,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const memoryPalaceModule: Extension = {
  id: 'memory-palace',
  name: 'Sovereign Memory Palace',
  description: 'Persistent relational knowledge graph and OS memory.',
  icon: Database,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const verificationLoopModule: Extension = {
  id: 'svl',
  name: 'Sovereign Verification Loop (SVL)',
  description: 'Automated validation and fact-checking of agent outputs.',
  icon: RefreshCw,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const eventBusModule: Extension = {
  id: 'seb',
  name: 'Sovereign Event Bus (SEB)',
  description: 'High-speed asynchronous communication layer for agents.',
  icon: Bus,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const dispatchModule: Extension = {
  id: 'sd',
  name: 'Sovereign Dispatch (SD)',
  description: 'Mission routing and task allocation engine.',
  icon: Send,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const deepExecutionModule: Extension = {
  id: 'deep-execution',
  name: 'Deep Execution Substrate',
  description: 'Low-level compute optimization for complex reasoning.',
  icon: Brain,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const ethicalSentinelModule: Extension = {
  id: 'ethical-sentinel',
  name: 'Ethical Sentinel',
  description: 'Alignment auditing and safety-by-design enforcement.',
  icon: Scale,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const webReconShieldModule: Extension = {
  id: 'web-recon-shield',
  name: 'Web Reconnaissance Shield',
  description: 'Secure browsing and information gathering substrate.',
  icon: Globe,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const vibeAssemblyModule: Extension = {
  id: 'vibe-assembly',
  name: 'Vibe-Assembly',
  description: 'Artisanal UI generation and style synthesis.',
  icon: Vibe,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const deviceIntelligenceModule: Extension = {
  id: 'device-intelligence',
  name: 'Device Intelligence',
  description: 'Hardware-level device verification and biometric passkeys.',
  icon: Fingerprint,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const parallelTaskModule: Extension = {
  id: 'parallel-task',
  name: 'Parallel Task Orchestration',
  description: 'Management of multiple concurrent agentic workflows.',
  icon: GitBranch,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const cqModule: Extension = {
  id: 'cq',
  name: 'Collective Intelligence (cq)',
  description: 'Privacy-first knowledge sharing protocol.',
  icon: Network,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const mistralForgeModule: Extension = {
  id: 'mistral-forge',
  name: 'Mistral Sovereign Forge',
  description: 'Specialized substrate for Mistral model fine-tuning.',
  icon: Settings2,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const substrateDeploymentModule: Extension = {
  id: 'substrate-deployment',
  name: 'Substrate Deployment',
  description: 'Standardized deployment manifests for diverse environments.',
  icon: HardDrive,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const symphonyConductorModule: Extension = {
  id: 'symphony-conductor',
  name: 'The Symphony Conductor',
  description: 'Master agent for orchestrating Symphony implementation runs.',
  icon: Workflow,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const franchiseSeedModule: Extension = {
  id: 'franchise-seed',
  name: 'Franchise Seed',
  description: 'One-click deployment manifest for new instances.',
  icon: Send,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const ghostImplementationModule: Extension = {
  id: 'ghost-implementation',
  name: 'Ghost Implementation',
  description: 'Shadow workflows with Merge to Reality gates.',
  icon: Eye,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const workflowChronosModule: Extension = {
  id: 'workflow-chronos',
  name: 'Workflow Chronos',
  description: 'Time-travel debugging for autonomous actions.',
  icon: History,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const tokenGovernanceModule: Extension = {
  id: 'token-governance',
  name: 'Token Governance Substrate',
  description: 'Metabolic rate and budget management for the OS.',
  icon: Coins,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const corporateGovernanceModule: Extension = {
  id: 'corporate-governance',
  name: 'Corporate Governance Hub',
  description: 'Strategic roadmap management and multi-cloud token treasury.',
  icon: Building2,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const svhModule: Extension = {
  id: 'svh',
  name: 'Sovereign Vine Hardener (SVH)',
  description: 'Security hardening for distributed Vine nodes.',
  icon: Shield,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const sfrModule: Extension = {
  id: 'sfr',
  name: 'Sovereign Federated Registry (SFR)',
  description: 'Cross-instance agent accreditation.',
  icon: Users,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const sstModule: Extension = {
  id: 'sst',
  name: 'Sovereign Substrate Tuner (SST)',
  description: 'Performance optimization and resource allocation.',
  icon: Settings2,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const swcModule: Extension = {
  id: 'swc',
  name: 'Sovereign Weight-Check (SWC)',
  description: 'Auditing model weights and checking for bias.',
  icon: Search,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const sppModule: Extension = {
  id: 'spp',
  name: 'Sovereign Privacy Proxy (SPP)',
  description: 'Zero-knowledge data handling for external API calls.',
  icon: Lock,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const swmModule: Extension = {
  id: 'swm',
  name: 'Sovereign Workforce Manager (SWM)',
  description: 'Fleet-scale agent orchestration.',
  icon: Users,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const sleModule: Extension = {
  id: 'sle',
  name: 'Sovereign Linguistic Evolution (SLE)',
  description: 'Context-aware adaptation of agent communication.',
  icon: MessageCircle,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const swsModule: Extension = {
  id: 'sws',
  name: 'Sovereign Web Shield (SWS)',
  description: 'Advanced protection against web-based AI attacks.',
  icon: ShieldAlert,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const sssModule: Extension = {
  id: 'sss',
  name: 'Sovereign Swarm Simulator (SSS)',
  description: 'Multi-agent scenario testing in Digital Twin environments.',
  icon: Dna,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};

export const sqsModule: Extension = {
  id: 'sqs',
  name: 'Sovereign Quantum Substrate (SQS)',
  description: 'High-performance compute layer for complex simulations.',
  icon: Zap,
  category: 'module',
  status: 'active',
  source: 'inbuilt'
};
