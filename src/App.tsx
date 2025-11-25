import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Toaster, toast } from 'sonner';
import { Sidebar } from '@/components/Sidebar';
import { ChatPanel } from '@/components/ChatPanel';
import { CodeEditor } from '@/components/CodeEditor';
import { TerminalPanel } from '@/components/TerminalPanel';
import { FilesPanel } from '@/components/FilesPanel';
import { AgentsPanel } from '@/components/AgentsPanel';
import { SettingsDialog } from '@/components/SettingsDialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { callAI } from '@/lib/api';
import { AI_PROVIDERS, DEFAULT_FILE_SYSTEM, AGENT_PROMPTS } from '@/lib/constants';
import type { PanelType, ChatMessage, TerminalEntry, FileSystem, AgentType } from '@/lib/types';

function App() {
  const [currentPanel, setCurrentPanel] = useState<PanelType>('chat');
  const [selectedProvider, setSelectedProvider] = useKV('selected-provider', AI_PROVIDERS[0].id);
  const [selectedModel, setSelectedModel] = useKV('selected-model', AI_PROVIDERS[0].models[0].value);
  const [apiKeys, setApiKeys] = useKV<Record<string, string>>('ai-api-keys', {});
  const [chatMessages, setChatMessages] = useKV<ChatMessage[]>('chat-messages', []);
  const [terminalEntries, setTerminalEntries] = useKV<TerminalEntry[]>('terminal-entries', []);
  const [fileSystem, setFileSystem] = useKV<FileSystem>('file-system', DEFAULT_FILE_SYSTEM);
  const [currentFile, setCurrentFile] = useKV('current-file', 'index.js');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [agentOutput, setAgentOutput] = useState('');
  const [isAgentRunning, setIsAgentRunning] = useState(false);

  const currentProvider = AI_PROVIDERS.find(p => p.id === selectedProvider) || AI_PROVIDERS[0];
  const currentApiKey = apiKeys?.[currentProvider.id] || '';

  useEffect(() => {
    if (!currentApiKey && currentProvider.requiresApiKey) {
      setShowSettings(true);
    }
  }, [currentProvider.id]);

  const handleProviderChange = (providerId: string) => {
    setSelectedProvider(providerId);
    const provider = AI_PROVIDERS.find(p => p.id === providerId);
    if (provider && provider.models.length > 0) {
      setSelectedModel(provider.models[0].value);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!currentApiKey && currentProvider.requiresApiKey) {
      toast.error(`Please add your ${currentProvider.name} API key in settings`);
      setShowSettings(true);
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setChatMessages((prev) => [...(prev || []), userMessage]);
    setIsStreaming(true);

    let assistantContent = '';
    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };

    setChatMessages((prev) => [...(prev || []), assistantMessage]);

    try {
      await callAI(
        {
          provider: currentProvider.id,
          model: selectedModel || currentProvider.models[0].value,
          apiKey: currentApiKey,
        },
        [{ role: 'user', content }],
        {
          onChunk: (chunk) => {
            assistantContent += chunk;
            setChatMessages((prev) =>
              (prev || []).map((msg) =>
                msg.id === assistantMessage.id ? { ...msg, content: assistantContent } : msg
              )
            );
          },
        }
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send message');
      setChatMessages((prev) => (prev || []).filter((msg) => msg.id !== assistantMessage.id));
    } finally {
      setIsStreaming(false);
    }
  };

  const handleFileChange = (content: string) => {
    setFileSystem((prev) => {
      const files = prev || DEFAULT_FILE_SYSTEM;
      const file = currentFile || 'index.js';
      return {
        ...files,
        [file]: {
          ...files[file],
          content,
        },
      };
    });
  };

  const handleFileSelect = (filename: string) => {
    setCurrentFile(filename);
    setCurrentPanel('editor');
  };

  const handleFileCreate = (filename: string) => {
    const files = fileSystem || DEFAULT_FILE_SYSTEM;
    if (files[filename]) {
      toast.error('File already exists');
      return;
    }

    setFileSystem((prev) => ({
      ...(prev || {}),
      [filename]: {
        type: 'file',
        name: filename,
        content: '',
      },
    }));

    setCurrentFile(filename);
    setCurrentPanel('editor');
    toast.success(`Created ${filename}`);
  };

  const handleFileDelete = (filename: string) => {
    const files = fileSystem || DEFAULT_FILE_SYSTEM;
    if (Object.keys(files).length === 1) {
      toast.error('Cannot delete the last file');
      return;
    }

    setFileSystem((prev) => {
      const newFiles = { ...(prev || {}) };
      delete newFiles[filename];
      return newFiles;
    });

    if (currentFile === filename) {
      const files = fileSystem || DEFAULT_FILE_SYSTEM;
      setCurrentFile(Object.keys(files).find((f) => f !== filename) || 'index.js');
    }

    toast.success(`Deleted ${filename}`);
  };

  const handleRunAgent = async (type: AgentType) => {
    if (!currentApiKey && currentProvider.requiresApiKey) {
      toast.error(`Please add your ${currentProvider.name} API key in settings`);
      setShowSettings(true);
      return;
    }

    const files = fileSystem || DEFAULT_FILE_SYSTEM;
    const file = currentFile || 'index.js';
    const currentFileContent = files[file]?.content || '';
    
    if (!currentFileContent.trim()) {
      toast.error('No code in the editor to analyze');
      return;
    }

    setIsAgentRunning(true);
    setAgentOutput('');

    try {
      const prompt = AGENT_PROMPTS[type](currentFileContent);
      const response = await callAI(
        {
          provider: currentProvider.id,
          model: selectedModel || currentProvider.models[0].value,
          apiKey: currentApiKey,
        },
        [{ role: 'user', content: prompt }]
      );

      setAgentOutput(response);
      toast.success('Agent completed analysis');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Agent failed');
    } finally {
      setIsAgentRunning(false);
    }
  };

  const files = fileSystem || DEFAULT_FILE_SYSTEM;
  const file = currentFile || 'index.js';
  const currentFileNode = files[file];
  const hasApiKey = !!currentApiKey || !currentProvider.requiresApiKey;

  return (
    <div className="h-screen flex overflow-hidden bg-background text-foreground">
      <Toaster position="top-right" />
      
      <Sidebar
        currentPanel={currentPanel}
        onPanelChange={setCurrentPanel}
        selectedProvider={selectedProvider || AI_PROVIDERS[0].id}
        selectedModel={selectedModel || AI_PROVIDERS[0].models[0].value}
        onProviderChange={handleProviderChange}
        onModelChange={setSelectedModel}
        onSettingsClick={() => setShowSettings(true)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {!hasApiKey && (
          <Alert className="m-4 border-accent">
            <AlertDescription className="flex items-center justify-between">
              <span>Add your {currentProvider.name} API key to start using AI features</span>
              <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                Add API Key
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {currentPanel === 'chat' && (
          <ChatPanel
            messages={chatMessages || []}
            onSendMessage={handleSendMessage}
            isStreaming={isStreaming}
          />
        )}

        {currentPanel === 'editor' && currentFileNode && (
          <CodeEditor
            filename={file}
            content={currentFileNode.content || ''}
            onChange={handleFileChange}
          />
        )}

        {currentPanel === 'terminal' && (
          <TerminalPanel
            entries={terminalEntries || []}
            onAddEntry={(entry) => setTerminalEntries((prev) => [...(prev || []), entry])}
            onClear={() => setTerminalEntries([])}
          />
        )}

        {currentPanel === 'files' && (
          <FilesPanel
            files={files}
            currentFile={file}
            onFileSelect={handleFileSelect}
            onFileCreate={handleFileCreate}
            onFileDelete={handleFileDelete}
          />
        )}

        {currentPanel === 'agents' && (
          <AgentsPanel
            onRunAgent={handleRunAgent}
            agentOutput={agentOutput}
            isRunning={isAgentRunning}
          />
        )}
      </div>

      <SettingsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
        apiKeys={apiKeys || {}}
        onApiKeysChange={setApiKeys}
      />
    </div>
  );
}

export default App;