import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { File, FileJs, FileHtml, FileCss, Plus, Trash } from '@phosphor-icons/react';
import type { FileSystem } from '@/lib/types';

interface FilesPanelProps {
  files: FileSystem;
  currentFile: string;
  onFileSelect: (filename: string) => void;
  onFileCreate: (filename: string) => void;
  onFileDelete: (filename: string) => void;
}

export function FilesPanel({
  files,
  currentFile,
  onFileSelect,
  onFileCreate,
  onFileDelete,
}: FilesPanelProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const handleCreate = () => {
    if (newFileName.trim()) {
      onFileCreate(newFileName.trim());
      setNewFileName('');
      setShowCreateDialog(false);
    }
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return FileJs;
      case 'html':
        return FileHtml;
      case 'css':
      case 'scss':
        return FileCss;
      default:
        return File;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">File Explorer</h2>
          <p className="text-sm text-muted-foreground">Manage your project files</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowCreateDialog(true)}>
          <Plus size={16} className="mr-2" />
          New File
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-1">
          {Object.entries(files).map(([filename, node]) => {
            if (node.type !== 'file') return null;
            const Icon = getFileIcon(filename);
            const isActive = currentFile === filename;

            return (
              <div
                key={filename}
                className={`group flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-secondary border-l-2 border-accent'
                    : 'hover:bg-secondary/50'
                }`}
                onClick={() => onFileSelect(filename)}
              >
                <Icon size={18} weight={isActive ? 'fill' : 'regular'} className="text-accent" />
                <span className={`flex-1 text-sm font-mono ${isActive ? 'font-medium' : ''}`}>
                  {filename}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileDelete(filename);
                  }}
                >
                  <Trash size={14} />
                </Button>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>Enter a name for your new file</DialogDescription>
          </DialogHeader>
          <Input
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            placeholder="filename.js"
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!newFileName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
