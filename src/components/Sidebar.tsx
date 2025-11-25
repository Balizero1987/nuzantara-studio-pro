import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChatCircle, Code, Terminal, FolderOpen, Robot, Gear } from '@phosphor-icons/react';
import { AI_MODELS } from '@/lib/constants';
import type { PanelType } from '@/lib/types';

interface SidebarProps {
  currentPanel: PanelType;
  onPanelChange: (panel: PanelType) => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
  onSettingsClick: () => void;
}

export function Sidebar({
  currentPanel,
  onPanelChange,
  selectedModel,
  onModelChange,
  onSettingsClick,
}: SidebarProps) {
  const navItems = [
    { id: 'chat' as const, icon: ChatCircle, label: 'Chat' },
    { id: 'editor' as const, icon: Code, label: 'Editor' },
    { id: 'terminal' as const, icon: Terminal, label: 'Terminal' },
    { id: 'files' as const, icon: FolderOpen, label: 'Files' },
    { id: 'agents' as const, icon: Robot, label: 'Agents' },
  ];

  return (
    <div className="w-60 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h1 className="text-lg font-semibold text-foreground mb-1">Nuzantara Studio</h1>
        <p className="text-xs text-muted-foreground">PRO Edition</p>
      </div>

      <div className="p-4 border-b border-border">
        <label className="text-sm font-medium text-foreground block mb-2">AI Model</label>
        <Select value={selectedModel} onValueChange={onModelChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AI_MODELS.map((model) => (
              <SelectItem key={model.value} value={model.value}>
                {model.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPanel === item.id;
          return (
            <Button
              key={item.id}
              variant={isActive ? 'secondary' : 'ghost'}
              className={`w-full justify-start gap-3 ${
                isActive ? 'bg-secondary border-l-2 border-accent' : ''
              }`}
              onClick={() => onPanelChange(item.id)}
            >
              <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <Button variant="outline" className="w-full justify-start gap-3" onClick={onSettingsClick}>
          <Gear size={20} />
          <span>Settings</span>
        </Button>
      </div>
    </div>
  );
}
