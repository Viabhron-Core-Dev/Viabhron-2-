import { LucideIcon } from "lucide-react";

export type ExtensionCategory = 'connector' | 'skill' | 'tool' | 'mcp' | 'module' | 'gaming' | 'testing' | 'agent';

export type AgentRole = 'head' | 'executive' | 'contractor' | 'consultant' | 'specialized';

export interface Extension {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: ExtensionCategory;
  status: 'active' | 'inactive' | 'error';
  isBound?: boolean;
  source: 'inbuilt' | 'external';
  url?: string;
  config?: any;
}

export type TabType = 'chat' | 'settings' | 'discovery' | 'canvas' | 'store' | 'agents' | 'artifacts' | 'metrics' | 'simulation' | 'governance' | 'forge' | 'agent_cli' | 'sentinel' | 'security' | 'efficiency' | 'hatchery' | 'sops' | 'proposals' | 'gaming' | 'testing' | 'vhatsappening' | 'placeholder_client' | 'nexus' | 'symphony' | 'creative' | 'sound_forge' | 'image_studio' | 'video_suite' | 'moss_system' | 'loader' | 'identity-8004' | 'security-radar' | 'vibe-assembly' | 'memory-palace' | 'agent-registry';

export type SystemMode = 'turbo' | 'eco' | 'stealth';

// --- Celestial Specific Types ---
export type CelestialViewType = "home" | "chat" | "settings" | "auth" | "agent-detail" | "channel-detail" | "canopy" | "contacts" | "select-contact" | "cloud-setup" | "backup" | "marketplace" | "omega-config" | "workflow-canvas" | "debate-chat";

export interface CelestialNode {
  id: string;
  name: string;
  type: "star" | "local" | "cloud" | "agent" | "llm" | "council" | "gmail";
  provider: "local" | "google" | "github" | "codeberg" | "omega" | "nexus" | "perplexity" | "slack" | "discord" | "notion" | "trello";
  model?: string;
  logo?: string;
  icon?: string;
  desc?: string;
  relayType?: "firebase" | "telegram" | "gmail";
  relayId?: string;
  secretKey?: string;
  relayProfileId?: string;
  gitProfileId?: string;
  councilNodes?: string[];
  chairNodeId?: string;
  createdAt?: string;
  updatedAt?: string;
  baseUrl?: string;
  apiKeyEncrypted?: string;
  skillIds?: string[];
  mcpServerIds?: string[];
}

export interface CelestialChat {
  id: string;
  nodeId?: string;
  name?: string;
  type: "direct" | "council" | "individual" | "workflow" | "debate" | "agent" | "gmail" | "sentinel";
  messages: Message[];
  updatedAt: number | string;
  lastMessage?: string;
  nodeIds?: string[]; // For councils
  dirty?: boolean;
  relayType?: "firebase" | "telegram" | "gmail";
  chairNodeId?: string;
  workflowId?: string;
  debateId?: string;
  isSentinel?: boolean;
  isHeadAgent?: boolean;
  isSelf?: boolean;
  filterCategory?: string;
}

export interface RelayProfile {
  id: string;
  name: string;
  type: "telegram" | "gmail" | "firebase";
  token?: string;
  user?: string;
  password?: string;
  createdAt: string;
}

export interface GitProfile {
  id: string;
  name: string;
  forge: "github" | "codeberg";
  type?: string;
  owner?: string;
  token: string;
  user: string;
  createdAt: string;
}

export interface NexusSeed {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  title: string;
  desc?: string;
  content: string;
  tags?: string[];
  forks?: number;
  createdAt: string;
  nodeId?: string;
}

export interface NexusFork {
  id: string;
  seedId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  parentForkId?: string;
  title?: string;
}

export interface NexusComment {
  id: string;
  targetId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  nodeId?: string;
}

export interface SentinelLog {
  id: string;
  level: "info" | "warn" | "error" | "success";
  message: string;
  timestamp: string;
  source: string;
  metadata?: any;
}

export interface OfficialUpdate {
  id: string;
  title: string;
  brief: string;
  content: string;
  type: "models" | "offers" | "prompts" | "official" | "ai_tech";
priority: number;
  createdAt: string;
  isUrgent?: boolean;
}

export interface NewsCard {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
  source: string;
  timestamp: string;
  category: string;
  imageUrl?: string;
}

export interface NewsFilter {
  prompt: string;
  lastUpdated: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  type: "builtin" | "recipe" | "action" | "connector";
  provider: string;
  isEnabled: boolean;
  createdAt: string;
  recipe?: any;
  action?: any;
  status?: string;
}

export interface MCPServer {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  status?: string;
  isEnabled?: boolean;
}

export interface AIChannel {
  id: string;
  name: string;
  provider: string;
  logo: string;
  followers: string;
  latest: string;
  description: string;
  models: {
    id: string;
    name: string;
    date: string;
    desc: string;
    type: string;
  }[];
}

export interface WorkflowNode {
  id: string;
  type: "agent" | "mcp" | "skill" | "connector" | "input" | "output" | "trigger" | "logic" | "data" | "prompt";
  name: string;
  x: number;
  y: number;
  data?: any;
}

export interface WorkflowConnection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  fromPin: string;
  toPin: string;
}

export interface Workflow {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  createdAt: string;
  updatedAt: string;
}

export interface Debate {
  id: string;
  name: string;
  agentIds: string[];
  messages: Message[];
  status: "active" | "resolved";
  createdAt: string;
  updatedAt: string;
  consensus?: string;
}

export interface Job {
  id: string;
  nodeId: string;
  content: string;
  status: "pending" | "completed" | "error";
  createdAt: string;
  error?: string;
  chatId?: string;
}

export interface GitForgeConfig {
  githubToken?: string;
  githubUser?: string;
  codebergToken?: string;
  codebergUser?: string;
}

export interface OmegaConfig {
  apiKey?: string;
  personality?: string;
  coreKnowledge?: string;
  isGlobalAssistantEnabled: boolean;
  model: string;
}

export interface AppSettings {
  globalGeminiKey?: string;
  isEncryptionEnabled: boolean;
  activeFilters: string[];
  relayNodes: string[];
  theme: "light" | "dark" | "celestial";
  lastBackupAt?: string;
  tokenGovernance: TokenGovernance;
  nexusSettings: NexusSettings;
}

export interface TokenGovernance {
  globalMasterSlider: number; // 0-100
  nexusSlider: number; // 0-100
  emergencyBreakerEnabled: boolean;
  dailyTokenLimit: number;
  currentDailyUsage: number;
  gracefulDegradationEnabled: boolean;
  priorityModuleIds: string[]; // IDs of modules that stay in high-intel mode
}

export interface NexusSettings {
  isEnabled: boolean;
  isPrivate: boolean; // Local vs Global
  allowedAgentIds: string[];
  tokenUsageSlider: number; // 0-100
  autoForkEnabled: boolean;
  autonomyMandateEnabled: boolean;
}

export interface SecurityRule {
  id: string;
  name: string;
  description: string;
  naturalLanguage: string;
  technicalBlock: string;
  active: boolean;
  type: 'security' | 'operational' | 'fiscal';
  urgencyLevel: 'standard' | 'critical';
  createdAt: Date;
}

export interface EfficiencyPatch {
  id: string;
  name: string;
  description: string;
  version: string;
  applied: boolean;
  metrics: {
    speedBoost: number;
    memorySaved: number;
    costReduction: number;
  };
}

export type AIProvider = 'gemini' | 'openai' | 'anthropic' | 'groq' | 'local' | 'resident';

export interface Agent {
  id: string;
  name: string;
  description: string;
  role: AgentRole;
  provider: AIProvider;
  model: string;
  apiKey?: string; // Optional for Head Agent (Least Privilege)
  systemInstruction: string;
  activeExtensionIds: string[];
  isStaff?: boolean;
  isAnchor?: boolean;
  isResident?: boolean;
  taxonomy?: 'bird' | 'fish' | 'insect';
  avatar?: string;
  color: string;
  parentId?: string; // For hierarchy (Sub/Minor agents)
  status: 'active' | 'inactive' | 'error';
  capabilities: string[];
  lastActive: Date;
}

export type UIMode = 'vaa' | 'browser';

export interface UIConfig {
  theme: 'dark' | 'light' | 'custom';
  layout: 'default' | 'focus' | 'split' | 'canvas-first';
  sidebarVisible: boolean;
  activeTabId: string;
  accentColor: string;
}

export interface Tab {
  id: string;
  title: string;
  type: TabType;
  active: boolean;
  status: 'active' | 'shelved' | 'archived';
  agentId?: string; // Link tab to a specific agent
  activeExtensionIds?: string[];
  canvasData?: {
    nodes: CanvasNode[];
    edges: CanvasEdge[];
  };
  metadata?: {
    icon?: string;
    vibe?: string;
    lastAccessed?: Date;
  };
}

export interface CanvasNode {
  id: string;
  type: 'ai_text' | 'ai_image' | 'github' | 'ui_header' | 'ui_sidebar' | 'ui_content' | 'input' | 'output';
  position: { x: number; y: number };
  data: any;
  status: 'idle' | 'running' | 'completed' | 'error';
}

export interface CanvasEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date | string;
  status?: "sent" | "delivered" | "pending" | "error" | "completed";
  jobId?: string;
  nodeId?: string;
  type?: "text" | "email-metadata";
  metadata?: {
    from?: string;
    subject?: string;
    date?: string;
    emailId?: string;
    snippet?: string;
    sender?: string;
    [key: string]: any;
  };
  sanitizationReport?: {
    pixels: number;
    links: number;
  };
  emailMetadata?: {
    from: string;
    subject: string;
    date: string;
  };
  toolCalls?: {
    name: string;
    args: any;
    status: 'running' | 'complete' | 'error';
  }[];
}

export interface Memory {
  id: string;
  type: 'preference' | 'fact' | 'style' | 'goal' | 'resonance';
  content: string;
  strength: number; // 1-10
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface ExternalPlugin {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  config: Record<string, any>;
  type: string;
  status: 'active' | 'inactive' | 'error';
}

export interface BackgroundTask {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed';
  progress: number;
  startTime: Date;
  endTime?: Date;
  type: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'security' | 'info' | 'warning' | 'error' | 'system';
  timestamp: Date;
  agentId?: string;
  taskId?: string;
  read: boolean;
  metadata?: Record<string, any>;
  action?: {
    type: 'confirmation' | 'review';
    label: string;
    onApprove: () => void;
    onReject: () => void;
    status?: 'pending' | 'approved' | 'rejected';
  };
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL';
  source: string; // e.g., "Kernel", "Symphony-Agent", "UI-Shell"
  message: string;
  metadata?: Record<string, any>; // For AI parsing
  traceId?: string; // To link related events
}

export interface MCPTool {
  id: string;
  name: string;
  server: string;
  status: 'active' | 'blocked' | 'shadow';
  usageCount: number;
  lastUsed: string;
}

export interface MCPSandbox {
  id: string;
  agentId: string;
  status: 'running' | 'idle' | 'terminated';
  networkAccess: boolean;
  tokenEfficiency: number;
  startTime: string;
}

export interface MalwareIndex {
  packageName: string;
  registry: string;
  threatType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  detectedAt?: string;
}

export interface SupplyChainAudit {
  id: string;
  target: string;
  timestamp: string;
  status: 'clean' | 'blocked' | 'warning';
  findings: string[];
}

export interface PulseItem {
  id: string;
  category: 'workspace' | 'security' | 'metabolic' | 'finance';
  title: string;
  summary: string;
  resonanceScore: number;
  actionable: boolean;
  timestamp: any;
}

export interface PulseBriefing {
  id: string;
  timestamp: any;
  items: PulseItem[];
  overallVibe: string;
}

export interface VaultPointer {
  id: string;
  path: string; // Original path in MAOS
  gdriveId: string; // ID in Google Drive
  encryptionHash: string; // For integrity check
  size: number; // Original size
  compressedSize: number; // Size on GDrive
  compressed: boolean;
  algorithm: 'gzip' | 'brotli' | 'none';
  timestamp: Date;
}

export interface AgentLog {
  id: string;
  type: 'command' | 'output' | 'error' | 'system' | 'thought';
  content: string;
  timestamp: Date;
  agentId?: string;
  tabId?: string;
}

export interface SovereignBlock {
  id: string;
  type: string; // e.g., 'UI:BentoGrid', 'Logic:DataCruncher'
  config: Record<string, any>; // Malleable configuration
  inputs?: string[]; // IDs of other blocks
  malleable: boolean; // Explicitly marked as malleable
}

export interface SovereignManifest {
  kind: 'SovereignApp' | 'SovereignSOP';
  metadata: {
    name: string;
    version: string;
    creator: string;
    description: string;
  };
  intent: {
    goal: string;
    constraints: string[];
  };
  security: {
    clearance: AgentRole;
    network: string;
    dataScoping: string;
  };
  blocks: SovereignBlock[];
ratification: {
    required: boolean;
    gate: 'Chairman_Approval' | 'Guardian_Audit' | 'Auto_Ratify';
  };
}

export interface AuditReport {
  id: string;
  extensionId: string;
  status: 'passed' | 'failed' | 'warning';
  guardianScore: number;
  consultantAScore: number;
  consultantBScore: number;
  vulnerabilities: string[];
  timestamp: Date;
}

export interface HatcheryProject {
  id: string;
  name: string;
  description: string;
  status: 'ideation' | 'development' | 'auditing' | 'staging' | 'production';
  manifest?: SovereignManifest;
  auditReport?: AuditReport;
  createdAt: Date;
}

export interface SOP {
  id: string;
  title: string;
  description: string;
  department: string;
  leadAgentId: string;
  supportAgentIds: string[];
  requiredExtensionIds: string[];
  manifest: string; // Sovereign-Script (SS)
  status: 'active' | 'draft' | 'archived';
  lastExecuted?: Date;
}

export interface Moss {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  enabled: boolean;
  type: 'local' | 'sovereign';
  category: 'utility' | 'creative' | 'security' | 'intelligence' | 'forge' | 'core' | 'game';
  status: 'active' | 'inactive' | 'error';
  isFrozen?: boolean;
}

export interface Spore {
  id: string;
  targetDeviceId: string;
  status: 'airborne' | 'landed' | 'harvesting' | 'complete';
  missionBrief: string;
  metabolism: {
    cpuUsage: number;
    memoryUsage: number;
    lastHeartbeat: Date;
  };
}

export interface Client {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  enabled: boolean;
  type: 'native' | 'web' | 'cli' | 'ambient';
  status: 'active' | 'inactive' | 'error';
  accreditationId: string;
}

export interface Secret {
  id: string;
  label: string;
  value: string;
  type: 'api_key' | 'oauth_token' | 'other';
  createdAt: Date;
}

export interface SovereignSkill {
  id: string;
  name: string;
  description: string;
  code: string;
  type: 'script' | 'tool' | 'workflow';
  status: 'draft' | 'ratified' | 'archived';
  authorId: string;
  createdAt: Date;
}

export interface HeartbeatLog {
  id: string;
  type: 'pulse' | 'optimization' | 'audit' | 'hatch';
  content: string;
  impact?: string;
  timestamp: Date;
}

export interface RatificationProposal {
  id: string;
  title: string;
  description: string;
  type: 'department' | 'governance' | 'infrastructure';
  impact: {
    tokenCost: string;
    computeCost: string;
    benefit: string;
  };
  status: 'pending' | 'ratified' | 'shelved' | 'vetoed';
  isUnfolded?: boolean;
  shadowModeAvailable: boolean;
  sunsetClause?: {
    reviewIntervalDays: number;
  };
  createdAt: Date;
}

export type OnboardingStep = 'choice' | 'questionnaire' | 'roadmap' | 'completed';

export interface OnboardingState {
  step: OnboardingStep;
  intent?: 'coding' | 'business' | 'research' | 'personal' | 'enterprise';
  hardwareProfile?: 'low' | 'medium' | 'high';
  completed: boolean;
}
