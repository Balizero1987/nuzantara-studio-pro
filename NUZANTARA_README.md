# Nuzantara Studio PRO 🚀

A fully client-side web-based IDE with AI-powered development tools. Inspired by Cursor, Claude Code, and Replit, but running entirely in your browser.

![Nuzantara Studio PRO](https://img.shields.io/badge/Nuzantara-Studio%20PRO-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🤖 Multi-Model AI Chat
- Support for multiple AI models via OpenRouter API
- GPT-4, Claude, DeepSeek, Llama, Qwen, and more
- Streaming responses with real-time markdown rendering
- Code syntax highlighting in chat messages
- Conversation history persists across sessions

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

1. **OpenRouter API Key** (required for AI features)
   - Go to [openrouter.ai](https://openrouter.ai)
   - Sign up or log in
   - Navigate to Keys section
   - Create a new API key

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
3. Enter your OpenRouter API key
4. Start coding!

Your API key is stored locally in your browser and never sent anywhere except OpenRouter.

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

### Chat Panel
- Select your preferred AI model from the sidebar
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
- **AI**: OpenRouter API
- **Storage**: Browser localStorage via Spark KV
- **Build**: Vite 6

## 📝 Available AI Models

- OpenAI GPT-4o & GPT-4o Mini
- Anthropic Claude 3.5 Sonnet & Claude 3 Haiku
- DeepSeek Chat
- Google Gemini Pro
- Meta Llama 3.1 (405B & 70B)
- Qwen 2.5 72B

## 🔐 Privacy & Security

- **100% Client-Side**: No backend server, all processing in your browser
- **Local Storage**: Files and settings stored in your browser only
- **API Key Security**: Your OpenRouter key never leaves your browser except for API calls
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
- Streaming responses require OpenRouter streaming support

## 📞 Support

If you encounter issues:
1. Check that your OpenRouter API key is valid
2. Ensure you have credits on your OpenRouter account
3. Try clearing browser cache and localStorage
4. Check browser console for error messages

## 🔮 Roadmap

Future enhancements planned:
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

Start coding smarter with AI-powered development tools!
