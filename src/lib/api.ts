import type { OpenRouterConfig, AIConfig, AIProviderType, StreamingCallbacks } from './types';
import { getProviderById } from './constants';

export async function callAI(
  config: AIConfig,
  messages: Array<{ role: string; content: string }>,
  callbacks?: StreamingCallbacks
): Promise<string> {
  const provider = getProviderById(config.provider);
  
  if (!provider) {
    throw new Error(`Unknown provider: ${config.provider}`);
  }

  switch (provider.type) {
    case 'openrouter':
      return callOpenRouterAPI(
        {
          apiKey: config.apiKey,
          model: config.model,
          baseUrl: provider.baseUrl,
        },
        messages,
        callbacks?.onChunk
      );
    
    case 'openai':
      return callOpenAI(config, messages, callbacks);
    
    case 'anthropic':
      return callAnthropic(config, messages, callbacks);
    
    case 'groq':
      return callGroq(config, messages, callbacks);
    
    default:
      return callOpenRouterCompatible(provider.baseUrl, config, messages, callbacks);
  }
}

async function callOpenRouterAPI(
  config: OpenRouterConfig,
  messages: Array<{ role: string; content: string }>,
  onChunk?: (chunk: string) => void
): Promise<string> {
  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Nuzantara Studio PRO',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      stream: !!onChunk,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'API request failed');
  }

  if (onChunk) {
    return streamOpenAICompatible(response, onChunk);
  } else {
    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }
}

async function callOpenAI(
  config: AIConfig,
  messages: Array<{ role: string; content: string }>,
  callbacks?: StreamingCallbacks
): Promise<string> {
  const provider = getProviderById(config.provider);
  if (!provider) throw new Error('Provider not found');

  const response = await fetch(`${provider.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      stream: !!callbacks?.onChunk,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'OpenAI API request failed');
  }

  if (callbacks?.onChunk) {
    return streamOpenAICompatible(response, callbacks.onChunk);
  } else {
    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }
}

async function callAnthropic(
  config: AIConfig,
  messages: Array<{ role: string; content: string }>,
  callbacks?: StreamingCallbacks
): Promise<string> {
  const provider = getProviderById(config.provider);
  if (!provider) throw new Error('Provider not found');

  const response = await fetch(`${provider.baseUrl}/messages`, {
    method: 'POST',
    headers: {
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      max_tokens: 4096,
      stream: !!callbacks?.onChunk,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Anthropic API request failed');
  }

  if (callbacks?.onChunk) {
    return streamAnthropic(response, callbacks.onChunk);
  } else {
    const data = await response.json();
    return data.content[0]?.text || '';
  }
}

async function callGroq(
  config: AIConfig,
  messages: Array<{ role: string; content: string }>,
  callbacks?: StreamingCallbacks
): Promise<string> {
  const provider = getProviderById(config.provider);
  if (!provider) throw new Error('Provider not found');

  const response = await fetch(`${provider.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      stream: !!callbacks?.onChunk,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Groq API request failed');
  }

  if (callbacks?.onChunk) {
    return streamOpenAICompatible(response, callbacks.onChunk);
  } else {
    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }
}

async function callOpenRouterCompatible(
  baseUrl: string,
  config: AIConfig,
  messages: Array<{ role: string; content: string }>,
  callbacks?: StreamingCallbacks
): Promise<string> {
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      stream: !!callbacks?.onChunk,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'API request failed');
  }

  if (callbacks?.onChunk) {
    return streamOpenAICompatible(response, callbacks.onChunk);
  } else {
    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }
}

async function streamOpenAICompatible(response: Response, onChunk: (chunk: string) => void): Promise<string> {
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let fullContent = '';

  if (!reader) throw new Error('Response body is not readable');

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter((line) => line.trim() !== '');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices[0]?.delta?.content;
          if (content) {
            fullContent += content;
            onChunk(content);
          }
        } catch (e) {
        }
      }
    }
  }

  return fullContent;
}

async function streamAnthropic(response: Response, onChunk: (chunk: string) => void): Promise<string> {
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let fullContent = '';

  if (!reader) throw new Error('Response body is not readable');

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter((line) => line.trim() !== '');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        
        try {
          const parsed = JSON.parse(data);
          if (parsed.type === 'content_block_delta') {
            const content = parsed.delta?.text;
            if (content) {
              fullContent += content;
              onChunk(content);
            }
          }
        } catch (e) {
        }
      }
    }
  }

  return fullContent;
}

export async function callOpenRouter(
  config: OpenRouterConfig,
  messages: Array<{ role: string; content: string }>,
  onChunk?: (chunk: string) => void
): Promise<string> {
  return callOpenRouterAPI(config, messages, onChunk);
}

export function safeEval(code: string): { result?: any; error?: string } {
  try {
    const result = eval(code);
    return { result };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1] : '';
}

export function getLanguageFromFilename(filename: string): string {
  const ext = getFileExtension(filename).toLowerCase();
  const languageMap: Record<string, string> = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    json: 'json',
    html: 'html',
    css: 'css',
    scss: 'scss',
    md: 'markdown',
    py: 'python',
    rb: 'ruby',
    go: 'go',
    rs: 'rust',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    sh: 'shell',
    yml: 'yaml',
    yaml: 'yaml',
    xml: 'xml',
    sql: 'sql',
    txt: 'plaintext',
  };
  return languageMap[ext] || 'plaintext';
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
