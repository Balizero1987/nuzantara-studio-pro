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
