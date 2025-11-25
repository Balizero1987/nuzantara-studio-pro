# Nuzantara Studio PRO 🚀

A fully client-side web-based IDE with AI-powered development tools. Inspired by Cursor, Claude Code, and Replit, but running entirely in your browser.

![Nuzantara Studio PRO](https://img.shields.io/badge/Nuzantara-Studio%20PRO-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🤖 Multi-Provider AI Support
- **Multiple AI Providers**: OpenRouter, OpenAI, Anthropic, Groq, and easily add custom providers
- **20+ AI Models**: GPT-4, Claude, DeepSeek, Llama, Gemini, Qwen, and more
- **Easy Provider Management**: Switch between providers seamlessly
- **Streaming Responses**: Real-time markdown rendering
- **Extensible Architecture**: Add new providers in minutes (see [AI_PROVIDERS.md](./AI_PROVIDERS.md))

### 📝 Monaco Code Editor
- Full VS Code editor engine
- Syntax highlighting for all major languages
- IntelliSense and autocomplete
- Minimap and rulers
- Auto-save to virtual file system

### 🖥️ JavaScript Terminal
- Safe eval sandbox for JavaScript execution
- Command history
- Color-coded output (success/error)
- Persistent terminal entries

### 📁 Virtual File System
- JSON-based file storage in browser
- Create, edit, and delete files
- File type icons and syntax detection
- All files persist across sessions

### 🔧 AI Agent Suite
- **Explain Code**: Get detailed code explanations
- **Refactor**: Improve code quality and performance
- **Generate Tests**: Create comprehensive unit tests
- **Implementation Plan**: Get architecture and roadmap suggestions

### 🎨 Modern UI
- Dark theme optimized for coding
- Responsive design
- Smooth panel transitions
- Professional IDE-like interface

## 🚀 Getting Started

### Prerequisites

Choose one or more AI providers and get an API key:

1. **OpenRouter** (recommended - access to all models with one key)
   - Go to [openrouter.ai](https://openrouter.ai)
   - Sign up and create an API key

2. **OpenAI**
   - Go to [platform.openai.com](https://platform.openai.com/api-keys)
   - Create an API key

3. **Anthropic**
   - Go to [console.anthropic.com](https://console.anthropic.com/settings/keys)
   - Create an API key

4. **Groq** (free tier available!)
   - Go to [console.groq.com](https://console.groq.com/keys)
   - Create an API key

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd nuzantara-studio-pro

# Install dependencies
npm install

# Start development server
npm run dev
```

### Configuration

1. Launch the application
2. Click the Settings button in the sidebar
3. Choose your AI provider tab
4. Enter your API key for that provider
5. Start coding!

Your API keys are stored locally in your browser and only sent to their respective providers.

## 🎯 Supported AI Providers

### 🔀 OpenRouter
Access to 20+ models from multiple providers with a single API key:
- GPT-4o, GPT-4o Mini
- Claude 3.5 Sonnet, Claude 3 Haiku
- DeepSeek Chat
- Gemini Pro
- Llama 3.1 (405B, 70B)
- Qwen 2.5 72B

### 🤖 OpenAI
Direct access to OpenAI models:
- GPT-4o, GPT-4o Mini
- GPT-4 Turbo
- GPT-3.5 Turbo

### 🧠 Anthropic
Claude models directly from Anthropic:
- Claude 3.5 Sonnet
- Claude 3 Opus
- Claude 3 Sonnet
- Claude 3 Haiku

### ⚡ Groq
Ultra-fast inference:
- Llama 3.1 70B
- Llama 3.1 8B
- Mixtral 8x7B
- Gemma 2 9B

## ➕ Adding Custom Providers

Want to add more providers? It's easy! See our [AI Providers Guide](./AI_PROVIDERS.md) for detailed instructions.

Quick example:
```typescript
// Add to src/lib/constants.ts
{
  id: 'ollama',
  name: 'Ollama (Local)',
  type: 'custom',
  baseUrl: 'http://localhost:11434/v1',
  requiresApiKey: false,
  icon: '🦙',
  models: [
    { value: 'llama3.1', label: 'Llama 3.1', provider: 'ollama' }
  ]
}
```

Supports any OpenAI-compatible API!

## 📦 Deployment

### Deploy to GitHub Pages

1. Build the application:
```bash
npm run build
```

2. The build output will be in the `dist` directory

3. Deploy to GitHub Pages:
   - Push the `dist` folder to a `gh-pages` branch
   - Or use GitHub Actions for automatic deployment
   - Enable GitHub Pages in repository settings

### Deploy to Other Platforms

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy
```

**Static Hosting:**
Simply upload the contents of the `dist` folder to any static hosting service.

## 🎯 Usage

### Provider Selection
- Choose your AI provider from the dropdown in the sidebar
- Select a model from that provider
- Each provider's API key is configured separately in Settings

### Chat Panel
- Type your question or request
- Get streaming responses with markdown formatting
- Chat history is automatically saved

### Code Editor
- Open the Files panel to select a file
- Edit code with full syntax highlighting
- Changes auto-save to browser storage
- Create new files with any extension

### Terminal
- Execute JavaScript expressions
- Test code snippets quickly
- View output and errors
- Clear terminal as needed

### AI Agents
- Open the Agents panel
- Ensure you have code in the editor
- Click an agent to analyze your code
- Review suggestions and insights

## 🛠️ Technology Stack

- **Framework**: React 19 with TypeScript
- **Editor**: Monaco Editor (VS Code engine)
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI v4
- **Icons**: Phosphor Icons
- **Markdown**: React Markdown with syntax highlighting
- **AI**: Multi-provider support (OpenRouter, OpenAI, Anthropic, Groq)
- **Storage**: Browser localStorage via Spark KV
- **Build**: Vite 6

## 🔐 Privacy & Security

- **100% Client-Side**: No backend server, all processing in your browser
- **Local Storage**: Files and settings stored in your browser only
- **API Key Security**: Your API keys never leave your browser except for direct API calls to their providers
- **No Tracking**: No analytics, no data collection
- **Open Source**: Review the code yourself

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🙏 Acknowledgments

- Inspired by Cursor, Claude Code, and Replit
- Built with Spark template by GitHub
- UI components from Shadcn UI
- Monaco Editor from Microsoft

## 🐛 Known Limitations

- Terminal only supports JavaScript eval (no shell commands)
- File system limited by browser localStorage size (~5-10MB)
- No file folders/directories (flat structure only)
- Streaming responses depend on provider support

## 📞 Support

If you encounter issues:
1. Check that your API key is valid for the selected provider
2. Ensure you have credits on your provider account
3. Try clearing browser cache and localStorage
4. Check browser console for error messages

## 🔮 Roadmap

Future enhancements planned:
- [ ] More built-in providers (Cohere, Together AI, etc.)
- [ ] Custom provider configuration UI
- [ ] Folder/directory support
- [ ] File import/export
- [ ] Multiple terminal tabs
- [ ] Theme customization
- [ ] Collaborative editing
- [ ] Git integration
- [ ] Package manager integration
- [ ] More AI agent types

---

**Built with ❤️ using Spark**

Start coding smarter with AI-powered development tools from multiple providers!
