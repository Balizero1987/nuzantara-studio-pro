# Adding AI Providers to Nuzantara Studio PRO

This guide explains how to easily add new AI providers to the IDE.

## Quick Start

To add a new AI provider, edit `/src/lib/constants.ts` and add a new provider to the `AI_PROVIDERS` array:

```typescript
{
  id: 'your-provider-id',
  name: 'Your Provider Name',
  type: 'custom', // or one of: 'openrouter' | 'openai' | 'anthropic' | 'groq'
  baseUrl: 'https://api.yourprovider.com/v1',
  requiresApiKey: true,
  icon: '🤖', // Any emoji or icon
  models: [
    { 
      value: 'model-id', 
      label: 'Model Display Name', 
      provider: 'your-provider-id',
      description: 'Brief model description'
    },
    // Add more models...
  ],
}
```

## Supported Provider Types

### 1. OpenAI-Compatible (`type: 'openai'` or `type: 'custom'`)

For providers that use the OpenAI API format:

```typescript
{
  id: 'my-openai-compatible',
  name: 'My Provider',
  type: 'custom',
  baseUrl: 'https://api.myprovider.com/v1',
  requiresApiKey: true,
  icon: '⚡',
  models: [
    { value: 'my-model', label: 'My Model', provider: 'my-openai-compatible' }
  ],
}
```

**API Format Expected:**
- Endpoint: `{baseUrl}/chat/completions`
- Headers: `Authorization: Bearer {apiKey}`
- Body: Standard OpenAI chat completions format

### 2. Anthropic-Compatible (`type: 'anthropic'`)

For providers using Anthropic's API format:

```typescript
{
  id: 'my-anthropic-compatible',
  name: 'Anthropic Clone',
  type: 'anthropic',
  baseUrl: 'https://api.myprovider.com/v1',
  requiresApiKey: true,
  icon: '🧠',
  models: [
    { value: 'claude-model', label: 'Claude Model', provider: 'my-anthropic-compatible' }
  ],
}
```

**API Format Expected:**
- Endpoint: `{baseUrl}/messages`
- Headers: `x-api-key: {apiKey}`, `anthropic-version: 2023-06-01`

### 3. Groq-Compatible (`type: 'groq'`)

For Groq or similar fast inference providers:

```typescript
{
  id: 'my-groq-compatible',
  name: 'Fast Inference',
  type: 'groq',
  baseUrl: 'https://api.myprovider.com/openai/v1',
  requiresApiKey: true,
  icon: '⚡',
  models: [
    { value: 'fast-model', label: 'Fast Model', provider: 'my-groq-compatible' }
  ],
}
```

### 4. OpenRouter (`type: 'openrouter'`)

OpenRouter aggregates multiple providers:

```typescript
{
  id: 'openrouter',
  name: 'OpenRouter',
  type: 'openrouter',
  baseUrl: 'https://openrouter.ai/api/v1',
  requiresApiKey: true,
  icon: '🔀',
  models: [
    { value: 'openai/gpt-4o', label: 'GPT-4o', provider: 'openrouter' },
    { value: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5', provider: 'openrouter' },
  ],
}
```

## Examples

### Adding Ollama (Local)

```typescript
{
  id: 'ollama',
  name: 'Ollama (Local)',
  type: 'custom',
  baseUrl: 'http://localhost:11434/v1',
  requiresApiKey: false,
  icon: '🦙',
  models: [
    { value: 'llama3.1', label: 'Llama 3.1', provider: 'ollama' },
    { value: 'codellama', label: 'Code Llama', provider: 'ollama' },
    { value: 'mistral', label: 'Mistral', provider: 'ollama' },
  ],
}
```

### Adding Cohere

```typescript
{
  id: 'cohere',
  name: 'Cohere',
  type: 'custom',
  baseUrl: 'https://api.cohere.ai/v1',
  requiresApiKey: true,
  icon: '🌊',
  models: [
    { value: 'command-r-plus', label: 'Command R+', provider: 'cohere' },
    { value: 'command-r', label: 'Command R', provider: 'cohere' },
  ],
}
```

### Adding Together AI

```typescript
{
  id: 'together',
  name: 'Together AI',
  type: 'custom',
  baseUrl: 'https://api.together.xyz/v1',
  requiresApiKey: true,
  icon: '🤝',
  models: [
    { value: 'meta-llama/Llama-3-70b-chat-hf', label: 'Llama 3 70B', provider: 'together' },
    { value: 'mistralai/Mixtral-8x7B-Instruct-v0.1', label: 'Mixtral 8x7B', provider: 'together' },
  ],
}
```

### Adding Hugging Face

```typescript
{
  id: 'huggingface',
  name: 'Hugging Face',
  type: 'custom',
  baseUrl: 'https://api-inference.huggingface.co/models',
  requiresApiKey: true,
  icon: '🤗',
  models: [
    { value: 'meta-llama/Meta-Llama-3-70B-Instruct', label: 'Llama 3 70B', provider: 'huggingface' },
    { value: 'mistralai/Mixtral-8x7B-Instruct-v0.1', label: 'Mixtral 8x7B', provider: 'huggingface' },
  ],
}
```

## Advanced: Custom API Integration

If your provider has a completely different API format, you can extend the `callAI` function in `/src/lib/api.ts`:

1. Add a new case to the switch statement:

```typescript
case 'your-custom-type':
  return callYourCustomProvider(config, messages, callbacks);
```

2. Implement the custom function:

```typescript
async function callYourCustomProvider(
  config: AIConfig,
  messages: Array<{ role: string; content: string }>,
  callbacks?: StreamingCallbacks
): Promise<string> {
  // Your custom implementation
  const provider = getProviderById(config.provider);
  if (!provider) throw new Error('Provider not found');

  const response = await fetch(`${provider.baseUrl}/your-endpoint`, {
    method: 'POST',
    headers: {
      'Your-Custom-Header': config.apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // Your custom request format
      prompt: messages[messages.length - 1].content,
      // ... other params
    }),
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const data = await response.json();
  return data.response; // Your custom response format
}
```

## Settings Dialog

The settings dialog automatically displays a tab for each provider. To customize the instructions:

Edit `/src/components/SettingsDialog.tsx` and add your provider to `providerInstructions`:

```typescript
const providerInstructions = {
  // ... existing providers
  'your-provider-id': {
    url: 'https://your-provider.com/dashboard',
    steps: [
      'Step 1',
      'Step 2',
      'Step 3',
    ],
    placeholder: 'your-api-key-format...',
  },
};
```

## Testing Your Provider

1. Add the provider configuration to `AI_PROVIDERS` in `/src/lib/constants.ts`
2. Reload the application
3. Select your provider from the sidebar dropdown
4. Add your API key in Settings
5. Test with a chat message or agent

## Notes

- **API Keys**: All API keys are stored locally in browser storage and only sent to their respective providers
- **CORS**: Make sure your provider's API supports CORS for browser requests
- **Streaming**: Streaming is optional. If your provider doesn't support it, just return the full response
- **Model IDs**: Use the exact model ID required by the provider's API
