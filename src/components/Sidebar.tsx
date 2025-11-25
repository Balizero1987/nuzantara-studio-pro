import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChatCircle, Code, Terminal, FolderOpen, Robot, Gear, PuzzlePiece } from '@phosphor-icons/react';
import { AI_PROVIDERS, getAllModels } from '@/lib/constants';
import type { PanelType, AIProvider } from '@/lib/types';

interface SidebarProps {
  currentPanel: PanelType;
  onPanelChange: (panel: PanelType) => void;
  selectedProvider: string;
  selectedModel: string;
  onProviderChange: (provider: string) => void;
  onModelChange: (model: string) => void;
  onSettingsClick: () => void;
  onExtensionsClick?: () => void;
  customProviders?: AIProvider[];
}

export function Sidebar({
  currentPanel,
  onPanelChange,
  selectedProvider,
  selectedModel,
  onProviderChange,
  onModelChange,
  onSettingsClick,
  onExtensionsClick,
  customProviders = [],
}: SidebarProps) {
  const navItems = [
    { id: 'chat' as const, icon: ChatCircle, label: 'Chat' },
    { id: 'editor' as const, icon: Code, label: 'Editor' },
    { id: 'terminal' as const, icon: Terminal, label: 'Terminal' },
    { id: 'files' as const, icon: FolderOpen, label: 'Files' },
    { id: 'agents' as const, icon: Robot, label: 'Agents' },
  ];

  const allProviders = [...AI_PROVIDERS, ...customProviders];
  const currentProvider = allProviders.find(p => p.id === selectedProvider);
  const availableModels = currentProvider?.models || [];

  return (
    <div className="w-60 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h1 className="text-lg font-semibold text-foreground mb-1">Nuzantara Studio</h1>
        <p className="text-xs text-muted-foreground">PRO Edition</p>
      </div>

      <div className="p-4 border-b border-border space-y-3">
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">AI Provider</label>
          <Select value={selectedProvider} onValueChange={onProviderChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Built-in Providers</SelectLabel>
                {AI_PROVIDERS.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    <span className="flex items-center gap-2">
                      <span>{provider.icon}</span>
                      <span>{provider.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
              {customProviders.length > 0 && (
                <SelectGroup>
                  <SelectLabel>Custom Providers</SelectLabel>
                  {customProviders.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      <span className="flex items-center gap-2">
                        <span>{provider.icon}</span>
                        <span>{provider.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground block mb-2">Model</label>
          <Select value={selectedModel} onValueChange={onModelChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableModels.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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

      <div className="p-3 border-t border-border space-y-1">
        {onExtensionsClick && (
          <Button variant="outline" className="w-full justify-start gap-3" onClick={onExtensionsClick}>
            <PuzzlePiece size={20} />
            <span>Extensions</span>
          </Button>
        )}
        <Button variant="outline" className="w-full justify-start gap-3" onClick={onSettingsClick}>
          <Gear size={20} />
          <span>Settings</span>
        </Button>
      </div>
    </div>
  );
}
