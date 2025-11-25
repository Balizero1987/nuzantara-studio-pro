import type { AIProvider, AIModel } from './types';

export const AI_PROVIDERS: AIProvider[] = [
  {
    id: 'openrouter',
    name: 'OpenRouter',
    type: 'openrouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    requiresApiKey: true,
    icon: '🔀',
    models: [
      { value: 'openai/gpt-4o', label: 'GPT-4o', provider: 'openrouter', description: 'Most capable OpenAI model' },
      { value: 'openai/gpt-4o-mini', label: 'GPT-4o Mini', provider: 'openrouter', description: 'Fast and affordable' },
      { value: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet', provider: 'openrouter', description: 'Best for coding' },
      { value: 'anthropic/claude-3-haiku', label: 'Claude 3 Haiku', provider: 'openrouter', description: 'Fast and efficient' },
      { value: 'deepseek/deepseek-chat', label: 'DeepSeek Chat', provider: 'openrouter', description: 'Strong reasoning' },
      { value: 'google/gemini-pro', label: 'Gemini Pro', provider: 'openrouter', description: 'Google\'s flagship model' },
      { value: 'meta-llama/llama-3.1-405b-instruct', label: 'Llama 3.1 405B', provider: 'openrouter', description: 'Most capable open model' },
      { value: 'meta-llama/llama-3.1-70b-instruct', label: 'Llama 3.1 70B', provider: 'openrouter', description: 'Balanced performance' },
      { value: 'qwen/qwen-2.5-72b-instruct', label: 'Qwen 2.5 72B', provider: 'openrouter', description: 'Excellent multilingual' },
    ],
  },
  {
    id: 'openai',
    name: 'OpenAI',
    type: 'openai',
    baseUrl: 'https://api.openai.com/v1',
    requiresApiKey: true,
    icon: '🤖',
    models: [
      { value: 'gpt-4o', label: 'GPT-4o', provider: 'openai', description: 'Most capable model' },
      { value: 'gpt-4o-mini', label: 'GPT-4o Mini', provider: 'openai', description: 'Fast and affordable' },
      { value: 'gpt-4-turbo', label: 'GPT-4 Turbo', provider: 'openai', description: 'Previous generation' },
      { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', provider: 'openai', description: 'Fast and economical' },
    ],
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    type: 'anthropic',
    baseUrl: 'https://api.anthropic.com/v1',
    requiresApiKey: true,
    icon: '🧠',
    models: [
      { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet', provider: 'anthropic', description: 'Best for coding' },
      { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus', provider: 'anthropic', description: 'Most capable' },
      { value: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet', provider: 'anthropic', description: 'Balanced' },
      { value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku', provider: 'anthropic', description: 'Fast and efficient' },
    ],
  },
  {
    id: 'groq',
    name: 'Groq',
    type: 'groq',
    baseUrl: 'https://api.groq.com/openai/v1',
    requiresApiKey: true,
    icon: '⚡',
    models: [
      { value: 'llama-3.1-70b-versatile', label: 'Llama 3.1 70B', provider: 'groq', description: 'Fast inference' },
      { value: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B', provider: 'groq', description: 'Ultra-fast' },
      { value: 'mixtral-8x7b-32768', label: 'Mixtral 8x7B', provider: 'groq', description: 'Large context' },
      { value: 'gemma2-9b-it', label: 'Gemma 2 9B', provider: 'groq', description: 'Google\'s open model' },
    ],
  },
  {
    id: 'google',
    name: 'Google AI',
    type: 'google',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    requiresApiKey: true,
    icon: '🔮',
    models: [
      { value: 'gemini-2.0-flash-exp', label: 'Gemini 2.0 Flash', provider: 'google', description: 'Experimental multimodal' },
      { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', provider: 'google', description: 'Most capable' },
      { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash', provider: 'google', description: 'Fast and efficient' },
      { value: 'gemini-1.0-pro', label: 'Gemini 1.0 Pro', provider: 'google', description: 'Legacy model' },
    ],
  },
];

export const getAllModels = (): AIModel[] => {
  return AI_PROVIDERS.flatMap(provider => provider.models);
};

export const getProviderById = (id: string): AIProvider | undefined => {
  return AI_PROVIDERS.find(provider => provider.id === id);
};

export const getModelsByProvider = (providerId: string): AIModel[] => {
  const provider = getProviderById(providerId);
  return provider?.models || [];
};

export const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

export const DEFAULT_FILE_SYSTEM = {
  'README.md': {
    type: 'file' as const,
    name: 'README.md',
    content: `# Welcome to Nuzantara Studio PRO

A fully client-side web IDE with AI-powered development tools.

## Features
- Multi-model AI chat (GPT-4, Claude, DeepSeek, Llama, etc.)
- Monaco Editor with syntax highlighting
- Virtual file system
- JavaScript terminal
- AI Agents for code analysis

## Getting Started
1. Add your OpenRouter API key in the settings
2. Start chatting or create a new file
3. Use AI agents to analyze and improve your code

Happy coding! 🚀`,
  },
  'index.js': {
    type: 'file' as const,
    name: 'index.js',
    content: `// Welcome to Nuzantara Studio PRO
console.log('Hello, World!');

function greet(name) {
  return \`Hello, \${name}!\`;
}

greet('Developer');`,
  },
  'styles.css': {
    type: 'file' as const,
    name: 'styles.css',
    content: `body {
  margin: 0;
  padding: 0;
  font-family: system-ui, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}`,
  },
};

export const AGENT_PROMPTS = {
  explain: (code: string) =>
    `You are a code explanation expert. Analyze the following code and provide a clear, comprehensive explanation of what it does, how it works, and any notable patterns or techniques used.\n\n\`\`\`\n${code}\n\`\`\``,
  refactor: (code: string) =>
    `You are a code refactoring expert. Review the following code and suggest improvements for readability, performance, maintainability, and best practices. Provide the refactored code with explanations.\n\n\`\`\`\n${code}\n\`\`\``,
  tests: (code: string) =>
    `You are a test generation expert. Write comprehensive unit tests for the following code. Include edge cases, error handling, and use appropriate testing frameworks.\n\n\`\`\`\n${code}\n\`\`\``,
  plan: (code: string) =>
    `You are a software architect. Based on the following code or requirements, create a detailed implementation plan with clear steps, architecture decisions, and recommendations.\n\n\`\`\`\n${code}\n\`\`\``,
};
