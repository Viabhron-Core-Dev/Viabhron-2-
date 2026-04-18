import { MCPTool, MCPSandbox } from '@/src/types';

class MCPShieldService {
  private tools: MCPTool[] = [
    { id: 'tool-01', name: 'fs_read', server: 'local-filesystem', status: 'active', usageCount: 142, lastUsed: '2m ago' },
    { id: 'tool-02', name: 'http_request', server: 'unauthorized-proxy', status: 'shadow', usageCount: 0, lastUsed: 'Never' },
    { id: 'tool-03', name: 'db_query', server: 'production-db', status: 'active', usageCount: 89, lastUsed: '15m ago' },
    { id: 'tool-04', name: 'shell_exec', server: 'system-core', status: 'blocked', usageCount: 0, lastUsed: 'Never' }
  ];

  private sandboxes: MCPSandbox[] = [
    { id: 'sb-01', agentId: 'head-agent', status: 'running', networkAccess: false, tokenEfficiency: 81, startTime: '2026-04-15T10:00:00Z' },
    { id: 'sb-02', agentId: 'creative-director', status: 'idle', networkAccess: false, tokenEfficiency: 75, startTime: '2026-04-15T09:30:00Z' }
  ];

  async getTools(): Promise<MCPTool[]> {
    return this.tools;
  }

  async getSandboxes(): Promise<MCPSandbox[]> {
    return this.sandboxes;
  }

  async blockTool(toolId: string): Promise<void> {
    const tool = this.tools.find(t => t.id === toolId);
    if (tool) {
      tool.status = 'blocked';
    }
  }

  async terminateSandbox(sandboxId: string): Promise<void> {
    const sb = this.sandboxes.find(s => s.id === sandboxId);
    if (sb) {
      sb.status = 'terminated';
    }
  }

  async toggleCodeMode(): Promise<boolean> {
    // Logic to toggle tool collapsing
    return true;
  }
}

export const mcpShieldService = new MCPShieldService();
