# Planning Guide

A fully client-side web-based IDE inspired by Cursor, Claude Code, and Replit that runs entirely in the browser with multi-model AI support via OpenRouter API.

**Experience Qualities**:
1. **Professional** - A production-grade development environment that feels as capable as desktop IDEs
2. **Intelligent** - AI agents seamlessly integrated into the workflow for code analysis, refactoring, and generation
3. **Fluid** - Smooth transitions between chat, coding, terminal, and file management with no friction

**Complexity Level**: Complex Application (advanced functionality, accounts)
  - Multiple integrated panels (chat, editor, terminal, file system, agents), real-time AI streaming, virtual file system with persistence, code execution sandbox, multi-model selection

## Essential Features

### Multi-Model Chat Interface
- **Functionality**: Chat with various AI models (GPT-4, Claude, DeepSeek, Llama, etc.) via OpenRouter API with streaming responses
- **Purpose**: Enables developers to get coding help, explanations, and generate code using their preferred AI model
- **Trigger**: User selects model from dropdown and types message
- **Progression**: Select model → Type message → Send → Stream response with markdown rendering → Auto-scroll to latest message → Continue conversation
- **Success criteria**: Messages stream smoothly, markdown renders correctly (code blocks, lists, formatting), model switching works instantly

### Monaco Code Editor
- **Functionality**: VS Code's editor engine with syntax highlighting, IntelliSense, and multi-language support
- **Purpose**: Provides professional-grade code editing experience directly in browser
- **Trigger**: User switches to editor panel or clicks file in tree
- **Progression**: Open editor panel → Type/edit code → Syntax highlights in real-time → Save to virtual file system → Switch between files
- **Success criteria**: Syntax highlighting works for all major languages, editor feels responsive, code persists across sessions

### Virtual File System
- **Functionality**: JSON-based file tree that persists in browser storage with create/edit/delete operations
- **Purpose**: Organize multiple files and projects without requiring a backend server
- **Trigger**: User opens files panel or clicks file in tree
- **Progression**: View file tree → Click file to open in editor → Create new file → Edit in Monaco → Changes auto-save → Files persist on reload
- **Success criteria**: File tree renders hierarchically, files persist across sessions, creating/deleting works instantly

### JavaScript Execution Terminal
- **Functionality**: Safe eval sandbox for running JavaScript code with output display
- **Purpose**: Quick code testing and experimentation without leaving the IDE
- **Trigger**: User switches to terminal panel and enters command
- **Progression**: Open terminal → Type JS expression → Press Enter → Eval executes → Output displays (success in green, errors in red) → History persists
- **Success criteria**: Code executes safely, errors caught gracefully, output formatted clearly, scroll works

### AI Agent Suite
- **Functionality**: Specialized AI agents for code explanation, refactoring, test generation, and implementation planning
- **Purpose**: Accelerate development with AI-powered code analysis and generation
- **Trigger**: User opens agents panel and clicks agent button
- **Progression**: Open agents panel → Select agent type → Agent reads current editor code → Sends to AI with specialized prompt → Displays result → User can apply suggestions
- **Success criteria**: Agents provide contextually relevant output, results are actionable, agent responses use current editor content

## Edge Case Handling

- **API Key Missing**: Display prominent setup banner with instructions to add OpenRouter API key in settings
- **API Rate Limits**: Show friendly error message with retry suggestion when rate limited
- **Large Files**: Warn users when file exceeds 1MB and may cause performance issues
- **Invalid JSON in File System**: Gracefully handle corrupted localStorage with reset option
- **Network Failures**: Retry mechanism with exponential backoff for API calls
- **Empty Editor State**: Show welcome message with quick start tips when no file is open
- **Concurrent Streaming**: Queue requests to prevent UI corruption from multiple simultaneous streams

## Design Direction

The design should feel cutting-edge and professional—a dark, focused workspace that gets out of the way while coding but elegantly surfaces powerful AI capabilities. A minimal interface with purposeful information density serves developers who want tools at their fingertips without clutter.

## Color Selection

Custom palette - A sophisticated dark theme optimized for long coding sessions with vibrant accent colors that highlight interactive elements and AI features.

- **Primary Color**: Deep Blue `oklch(0.45 0.15 250)` - Represents code/technology and provides calming focus for long sessions
- **Secondary Colors**: Dark Charcoal `oklch(0.18 0.01 250)` for panels and surfaces, Medium Gray `oklch(0.35 0.01 250)` for borders and dividers
- **Accent Color**: Electric Cyan `oklch(0.70 0.18 195)` - Attention-grabbing for CTAs, AI responses, and active states
- **Foreground/Background Pairings**: 
  - Background (Dark Black oklch(0.12 0.01 250)): Light Gray text (oklch(0.92 0.01 250)) - Ratio 15.8:1 ✓
  - Card (Dark Charcoal oklch(0.18 0.01 250)): Light Gray text (oklch(0.92 0.01 250)) - Ratio 11.2:1 ✓
  - Primary (Deep Blue oklch(0.45 0.15 250)): White text (oklch(0.99 0 0)) - Ratio 5.2:1 ✓
  - Accent (Electric Cyan oklch(0.70 0.18 195)): Dark text (oklch(0.12 0.01 250)) - Ratio 9.8:1 ✓
  - Muted (Medium Gray oklch(0.25 0.01 250)): Light Gray text (oklch(0.85 0.01 250)) - Ratio 8.1:1 ✓

## Font Selection

The typeface should be developer-focused with excellent code readability—monospace fonts that are crisp at small sizes, and clean sans-serif for UI elements that feel modern and technical.

- **Typographic Hierarchy**:
  - H1 (Panel Titles): Inter SemiBold/20px/tight tracking - Clear section headers
  - H2 (Section Headers): Inter Medium/16px/normal tracking - Subsection organization  
  - Body (UI Text): Inter Regular/14px/normal leading - Standard interface text
  - Code (Editor/Terminal): JetBrains Mono Regular/14px/1.5 leading - Monospace for code
  - Small (Metadata): Inter Regular/12px/relaxed tracking - File sizes, timestamps

## Animations

Animations should feel instantaneous and purposeful—just enough motion to guide attention and confirm actions without slowing down developer workflow. Micro-transitions on panel switches and subtle feedback on interactions maintain the professional feel.

- **Purposeful Meaning**: Panel transitions slide/fade to maintain spatial awareness; AI streaming text appears character-by-character to show real-time generation; button presses have subtle scale feedback
- **Hierarchy of Movement**: Panel switches (300ms ease) are primary motion; hover states (150ms) provide immediate feedback; streaming text and syntax highlighting happen instantly without animation

## Component Selection

- **Components**: 
  - Sidebar navigation with Button components for panel switching
  - Select dropdown for model selection with search capability
  - ScrollArea for chat messages, terminal output, and file tree
  - Tabs for switching between different file contexts in editor
  - Card components for agent output display
  - Dialog for file creation/settings modals
  - Textarea for chat input with auto-resize
  - Separator for visual panel divisions
  - Badge components for file type indicators and model labels
  
- **Customizations**: 
  - Custom Monaco Editor wrapper component with dark theme integration
  - Custom terminal component with command history and eval sandbox
  - Custom file tree component with collapsible folders and drag-drop
  - Custom chat message component with markdown rendering and code block syntax highlighting
  - Custom streaming text component with typing effect
  
- **States**: 
  - Buttons: Default dark gray, hover cyan border, active cyan background, disabled reduced opacity
  - Inputs: Focus state with cyan ring, error state with red border
  - File tree items: Hover background highlight, selected blue background, icon changes on expand/collapse
  - Panel indicators: Active panel has cyan accent bar on left edge
  
- **Icon Selection**: 
  - Chat: ChatCircle, Terminal: Terminal, Files: FolderOpen, Editor: Code, Settings: Gear
  - Agent actions: Lightbulb (explain), ArrowsClockwise (refactor), Flask (tests), ListChecks (plan)
  - File types: FileJs, FileHtml, FileCss, File (generic)
  - Actions: Plus (create), Trash (delete), Play (execute), Stop (cancel stream)
  
- **Spacing**: 
  - Panel padding: 4 (16px) for breathing room
  - Button gaps: 2 (8px) for compact toolbars  
  - Section spacing: 6 (24px) between major areas
  - Inline elements: 3 (12px) for related items
  
- **Mobile**: 
  - Stack sidebar above main content with hamburger menu toggle
  - Full-width panels with bottom tab bar for switching
  - Reduce editor font size to 12px for better code density
  - Collapsible sections in file tree for vertical space
  - Fixed position chat input at bottom of viewport
