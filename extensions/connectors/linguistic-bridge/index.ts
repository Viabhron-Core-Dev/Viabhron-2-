/**
 * 🌉 LINGUISTIC BRIDGE: Local & OpenAI-Compatible Connector
 * 
 * This connector allows the Viabhron OS to utilize local LLM engines
 * (Ollama, LM Studio) and third-party OpenAI-compatible APIs.
 */

export interface BridgeRequest {
  model: string;
  messages: { role: string; content: string }[];
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface BridgeResponse {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export class LinguisticBridge {
  private endpoint: string;
  private apiKey: string;

  constructor(endpoint: string, apiKey: string = 'sk-no-key-required') {
    this.endpoint = endpoint;
    this.apiKey = apiKey;
  }

  /**
   * Generates a response from the connected LLM engine.
   */
  async generateResponse(request: BridgeRequest): Promise<BridgeResponse> {
    try {
      const response = await fetch(`${this.endpoint}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: request.model,
          messages: request.messages,
          temperature: request.temperature ?? 0.7,
          max_tokens: request.maxTokens ?? 2048,
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Bridge Error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const choice = data.choices[0];

      return {
        content: choice.message.content,
        usage: {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
          totalTokens: data.usage.total_tokens
        }
      };
    } catch (error) {
      console.error('Linguistic Bridge Failure:', error);
      throw error;
    }
  }

  /**
   * Lists available models from the provider.
   */
  async listModels(): Promise<string[]> {
    try {
      const response = await fetch(`${this.endpoint}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      const data = await response.json();
      return data.data.map((m: any) => m.id);
    } catch (error) {
      console.error('Linguistic Bridge Model List Failure:', error);
      return [];
    }
  }
}

import { MessageSquare } from 'lucide-react';
import { Extension } from '../../../src/types';

export const linguisticBridgeConnector: Extension = {
  id: 'linguistic-bridge',
  name: 'Linguistic Bridge',
  description: 'Connects to local and OpenAI-compatible LLM engines.',
  icon: MessageSquare,
  category: 'connector',
  status: 'active',
  source: 'inbuilt'
};

export default LinguisticBridge;
