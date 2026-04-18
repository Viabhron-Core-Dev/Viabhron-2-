import { Agent, Message, Tab } from "../types";

export interface SystemContext {
  activeTabs: Tab[];
  activeAgent?: Agent;
  systemMetrics: {
    cpu: number;
    memory: number;
    latency: number;
  };
  provisionedAt?: string;
  officeName?: string;
  focus?: string;
}

export function getSystemContext(tabs: Tab[], activeAgent?: Agent): string {
  const officeName = localStorage.getItem('viabhron_office_name') || 'Unknown';
  const focus = localStorage.getItem('viabhron_focus') || 'General';
  const provisionedAt = localStorage.getItem('viabhron_provisioned_at') || 'Unknown';
  
  const activeTabNames = tabs.map(t => t.title).join(', ');
  
  return `
[SYSTEM CONTEXT]
Office Name: ${officeName}
Focus: ${focus}
Provisioned At: ${provisionedAt}
Active Tabs: ${activeTabNames}
Current Agent: ${activeAgent?.name || 'None'}
Status: Sovereign Kernel Active
  `.trim();
}
