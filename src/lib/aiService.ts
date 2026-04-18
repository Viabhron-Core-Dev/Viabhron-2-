import { GoogleGenAI } from "@google/genai";
import { Agent, Message } from "../types";

export interface AIServiceConfig {
  apiKey: string;
  agent: Agent;
  history: Message[];
  systemContext?: string;
}

export type AIProvider = 'gemini' | 'openai' | 'anthropic' | 'groq' | 'local' | 'resident';

export class AIService {
  static recognizeProvider(apiKey: string, agentProvider?: string): AIProvider {
    if (agentProvider === 'resident') return 'resident';
    if (agentProvider === 'local') return 'local';
    if (apiKey.startsWith('sk-ant-')) return 'anthropic';
    if (apiKey.startsWith('sk-')) return 'openai';
    if (apiKey.startsWith('gsk_')) return 'groq';
    return 'gemini'; // Default to Gemini
  }

  static async generateResponse(config: AIServiceConfig): Promise<string> {
    const { agent } = config;
    const provider = this.recognizeProvider(config.apiKey, agent.provider);
    
    switch (provider) {
      case 'resident':
        const residentUrl = localStorage.getItem('resident_agent_url');
        const brain = localStorage.getItem('resident_brain_type');
        // In a real app, this would be a fetch() to the residentUrl.
        // For the preview, we proxy through Gemini to show you the "Resident" experience.
        const residentResponse = await this.callGemini(config, config.apiKey);
        return `[Resident Brain (${brain}) @ ${residentUrl}]: ${residentResponse}`;
      case 'local':
        const localResponse = await this.callGemini(config, config.apiKey);
        return `[Local Brain]: ${localResponse}`;
      case 'gemini':
        return this.callGemini(config, config.apiKey);
      case 'openai':
      case 'anthropic':
      case 'groq':
        return `[Multi-Agent] ${provider.toUpperCase()} integration coming soon. Currently using Gemini as fallback.`;
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }

  private static async callGemini(config: AIServiceConfig, apiKey: string): Promise<string> {
    if (!apiKey) {
      throw new Error("Gemini API Key is required. Please configure it in System Settings.");
    }
    const ai = new GoogleGenAI({ apiKey });
    
    // Construct history for Gemini
    const contents = config.history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Inject system context into the system instruction
    const systemInstruction = config.systemContext 
      ? `${config.agent.systemInstruction}\n\n${config.systemContext}`
      : config.agent.systemInstruction;

    const response = await ai.models.generateContent({
      model: config.agent.model || 'gemini-3-flash-preview',
      contents,
      config: {
        systemInstruction,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  }
}
