import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, ArrowsClockwise, Flask, ListChecks } from '@phosphor-icons/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { AgentType } from '@/lib/types';

interface AgentsPanelProps {
  onRunAgent: (type: AgentType) => void;
  agentOutput: string;
  isRunning: boolean;
}

export function AgentsPanel({ onRunAgent, agentOutput, isRunning }: AgentsPanelProps) {
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);

  const agents = [
    {
      type: 'explain' as const,
      icon: Lightbulb,
      title: 'Explain Code',
      description: 'Get detailed explanations of what your code does and how it works',
      color: 'text-yellow-400',
    },
    {
      type: 'refactor' as const,
      icon: ArrowsClockwise,
      title: 'Refactor',
      description: 'Improve code quality, readability, and performance',
      color: 'text-blue-400',
    },
    {
      type: 'tests' as const,
      icon: Flask,
      title: 'Generate Tests',
      description: 'Create comprehensive unit tests for your code',
      color: 'text-green-400',
    },
    {
      type: 'plan' as const,
      icon: ListChecks,
      title: 'Implementation Plan',
      description: 'Get a detailed roadmap for implementing features',
      color: 'text-purple-400',
    },
  ];

  const handleRunAgent = (type: AgentType) => {
    setSelectedAgent(type);
    onRunAgent(type);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border p-4">
        <h2 className="text-lg font-semibold text-foreground">AI Agents</h2>
        <p className="text-sm text-muted-foreground">Specialized AI tools for code analysis and generation</p>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border p-4 space-y-3">
          {agents.map((agent) => {
            const Icon = agent.icon;
            return (
              <Card
                key={agent.type}
                className={`p-4 cursor-pointer transition-all hover:border-accent ${
                  selectedAgent === agent.type ? 'border-accent bg-accent/5' : ''
                }`}
                onClick={() => handleRunAgent(agent.type)}
              >
                <div className="flex items-start gap-3">
                  <Icon size={24} className={agent.color} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1">{agent.title}</h3>
                    <p className="text-xs text-muted-foreground">{agent.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <ScrollArea className="flex-1 p-4">
          {!agentOutput && !isRunning && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center max-w-md">
                <Robot size={64} className="mx-auto mb-4 opacity-50" />
                <p className="mb-2">Select an agent to analyze your code</p>
                <p className="text-sm">Make sure you have code in the editor, then click one of the agents above</p>
              </div>
            </div>
          )}

          {isRunning && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                <p className="text-muted-foreground">Agent is analyzing your code...</p>
              </div>
            </div>
          )}

          {agentOutput && !isRunning && (
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="text-xs">
                  {agents.find((a) => a.type === selectedAgent)?.title}
                </Badge>
              </div>
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    code: ({ node, inline, className, children, ...props }: any) => {
                      return inline ? (
                        <code className="bg-muted px-1 py-0.5 rounded text-accent font-mono text-sm" {...props}>
                          {children}
                        </code>
                      ) : (
                        <code className={`${className} font-mono text-sm`} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {agentOutput}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

function Robot({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      className={className}
      fill="currentColor"
    >
      <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48ZM172,152a12,12,0,1,1,12-12A12,12,0,0,1,172,152Zm-88,0a12,12,0,1,1,12-12A12,12,0,0,1,84,152Z" />
    </svg>
  );
}
