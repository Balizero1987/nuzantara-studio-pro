export interface FileSystemNode {
  type: 'file' | 'folder';
  name: string;
  content?: string;
  children?: Record<string, FileSystemNode>;
}

export interface FileSystem {
  [key: string]: FileSystemNode;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface TerminalEntry {
  id: string;
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: number;
}

export type PanelType = 'chat' | 'editor' | 'terminal' | 'files' | 'agents';

export type AgentType = 'explain' | 'refactor' | 'tests' | 'plan';

export interface OpenRouterConfig {
  apiKey: string;
  model: string;
  baseUrl: string;
}

export type AIProviderType = 'openrouter' | 'openai' | 'anthropic' | 'groq' | 'google' | 'custom';

export interface AIProvider {
  id: string;
  name: string;
  type: AIProviderType;
  baseUrl: string;
  requiresApiKey: boolean;
  icon?: string;
  models: AIModel[];
  isCustom?: boolean;
  headers?: Record<string, string>;
}

export interface AIModel {
  value: string;
  label: string;
  provider: string;
  description?: string;
}

export interface AIConfig {
  provider: string;
  model: string;
  apiKey: string;
  customProviders?: AIProvider[];
}

export interface StreamingCallbacks {
  onChunk?: (chunk: string) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}
