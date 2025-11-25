export const AI_MODELS = [
  { value: 'openai/gpt-4o', label: 'GPT-4o' },
  { value: 'openai/gpt-4o-mini', label: 'GPT-4o Mini' },
  { value: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' },
  { value: 'anthropic/claude-3-haiku', label: 'Claude 3 Haiku' },
  { value: 'deepseek/deepseek-chat', label: 'DeepSeek Chat' },
  { value: 'google/gemini-pro', label: 'Gemini Pro' },
  { value: 'meta-llama/llama-3.1-405b-instruct', label: 'Llama 3.1 405B' },
  { value: 'meta-llama/llama-3.1-70b-instruct', label: 'Llama 3.1 70B' },
  { value: 'qwen/qwen-2.5-72b-instruct', label: 'Qwen 2.5 72B' },
];

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
