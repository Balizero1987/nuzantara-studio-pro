import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Trash } from '@phosphor-icons/react';
import type { TerminalEntry } from '@/lib/types';
import { safeEval, formatTimestamp } from '@/lib/api';

interface TerminalPanelProps {
  entries: TerminalEntry[];
  onAddEntry: (entry: TerminalEntry) => void;
  onClear: () => void;
}

export function TerminalPanel({ entries, onAddEntry, onClear }: TerminalPanelProps) {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  const handleExecute = () => {
    if (!input.trim()) return;

    const commandEntry: TerminalEntry = {
      id: Date.now().toString(),
      type: 'command',
      content: input,
      timestamp: Date.now(),
    };

    onAddEntry(commandEntry);

    const { result, error } = safeEval(input);

    const outputEntry: TerminalEntry = {
      id: (Date.now() + 1).toString(),
      type: error ? 'error' : 'output',
      content: error || String(result),
      timestamp: Date.now(),
    };

    onAddEntry(outputEntry);
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleExecute();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">JavaScript Terminal</h2>
          <p className="text-sm text-muted-foreground">Execute JavaScript expressions</p>
        </div>
        <Button variant="outline" size="sm" onClick={onClear}>
          <Trash size={16} className="mr-2" />
          Clear
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4 bg-black/50" ref={scrollRef}>
        <div className="font-mono text-sm space-y-2">
          {entries.length === 0 && (
            <div className="text-muted-foreground">
              <p>Welcome to Nuzantara Terminal</p>
              <p className="mt-2">Type JavaScript expressions to execute them.</p>
              <p className="mt-1 text-xs">Example: 2 + 2, Math.random(), new Date()</p>
            </div>
          )}
          {entries.map((entry) => (
            <div key={entry.id} className="group">
              {entry.type === 'command' && (
                <div className="flex items-start gap-2">
                  <span className="text-accent select-none">$</span>
                  <span className="text-foreground">{entry.content}</span>
                  <span className="text-muted-foreground text-xs ml-auto opacity-0 group-hover:opacity-100">
                    {formatTimestamp(entry.timestamp)}
                  </span>
                </div>
              )}
              {entry.type === 'output' && (
                <div className="text-green-400 pl-4">{entry.content}</div>
              )}
              {entry.type === 'error' && (
                <div className="text-red-400 pl-4">{entry.content}</div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <span className="text-accent font-mono text-sm pt-2">$</span>
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter JavaScript expression..."
            className="font-mono"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
