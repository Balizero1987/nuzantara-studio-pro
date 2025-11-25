import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Package, Download, Trash, PuzzlePiece } from '@phosphor-icons/react';

export interface Extension {
  id: string;
  name: string;
  description: string;
  version: string;
  enabled: boolean;
  author?: string;
  icon?: string;
  type: 'tool' | 'theme' | 'language' | 'integration';
}

interface ExtensionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  extensions: Extension[];
  onExtensionsChange: (extensions: Extension[]) => void;
}

const AVAILABLE_EXTENSIONS: Extension[] = [
  {
    id: 'prettier-format',
    name: 'Prettier Formatter',
    description: 'Auto-format code with Prettier on save',
    version: '1.0.0',
    enabled: false,
    author: 'Nuzantara',
    icon: '✨',
    type: 'tool',
  },
  {
    id: 'ai-autocomplete',
    name: 'AI Autocomplete',
    description: 'Get intelligent code suggestions while typing',
    version: '1.0.0',
    enabled: false,
    author: 'Nuzantara',
    icon: '🤖',
    type: 'tool',
  },
  {
    id: 'git-integration',
    name: 'Git Integration',
    description: 'Basic git operations support',
    version: '1.0.0',
    enabled: false,
    author: 'Nuzantara',
    icon: '🔀',
    type: 'integration',
  },
  {
    id: 'markdown-preview',
    name: 'Markdown Preview',
    description: 'Live preview for markdown files',
    version: '1.0.0',
    enabled: false,
    author: 'Nuzantara',
    icon: '📝',
    type: 'tool',
  },
  {
    id: 'tokyo-night-theme',
    name: 'Tokyo Night Theme',
    description: 'Popular dark theme for the editor',
    version: '1.0.0',
    enabled: false,
    author: 'Community',
    icon: '🌃',
    type: 'theme',
  },
  {
    id: 'python-support',
    name: 'Python Support',
    description: 'Enhanced Python development features',
    version: '1.0.0',
    enabled: false,
    author: 'Nuzantara',
    icon: '🐍',
    type: 'language',
  },
];

export function ExtensionsDialog({
  open,
  onOpenChange,
  extensions,
  onExtensionsChange,
}: ExtensionsDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | Extension['type']>('all');

  const installedExtensions = extensions.filter(ext => 
    AVAILABLE_EXTENSIONS.find(ae => ae.id === ext.id)
  );

  const availableForInstall = AVAILABLE_EXTENSIONS.filter(
    ext => !extensions.find(installed => installed.id === ext.id)
  );

  const filteredAvailable = availableForInstall.filter(ext => {
    const matchesSearch = ext.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ext.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || ext.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleInstall = (extension: Extension) => {
    onExtensionsChange([...extensions, { ...extension, enabled: true }]);
  };

  const handleUninstall = (extensionId: string) => {
    onExtensionsChange(extensions.filter(ext => ext.id !== extensionId));
  };

  const handleToggle = (extensionId: string, enabled: boolean) => {
    onExtensionsChange(
      extensions.map(ext =>
        ext.id === extensionId ? { ...ext, enabled } : ext
      )
    );
  };

  const getTypeColor = (type: Extension['type']) => {
    switch (type) {
      case 'tool':
        return 'bg-accent/20 text-accent-foreground';
      case 'theme':
        return 'bg-primary/20 text-primary-foreground';
      case 'language':
        return 'bg-secondary text-secondary-foreground';
      case 'integration':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PuzzlePiece size={24} />
            Extensions
          </DialogTitle>
          <DialogDescription>
            Extend Nuzantara Studio with additional features and integrations
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="installed" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="installed">Installed ({installedExtensions.length})</TabsTrigger>
            <TabsTrigger value="available">Available ({availableForInstall.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="installed" className="space-y-4 mt-4">
            {installedExtensions.length === 0 ? (
              <Alert>
                <AlertDescription className="text-center py-8">
                  <Package size={48} className="mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm font-medium">No extensions installed</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Browse available extensions to enhance your IDE
                  </p>
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-2">
                {installedExtensions.map((ext) => (
                  <Card key={ext.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{ext.icon}</span>
                          <div className="flex-1">
                            <CardTitle className="text-base flex items-center gap-2">
                              {ext.name}
                              <span className={`text-xs px-2 py-0.5 rounded ${getTypeColor(ext.type)}`}>
                                {ext.type}
                              </span>
                            </CardTitle>
                            <CardDescription className="text-xs mt-1">
                              {ext.description}
                            </CardDescription>
                            <p className="text-xs text-muted-foreground mt-1">
                              v{ext.version} {ext.author && `• by ${ext.author}`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={ext.enabled}
                            onCheckedChange={(enabled) => handleToggle(ext.id, enabled)}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUninstall(ext.id)}
                          >
                            <Trash size={16} className="text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="available" className="space-y-4 mt-4">
            <div className="space-y-3">
              <Input
                placeholder="Search extensions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              <div className="flex gap-2">
                <Button
                  variant={selectedType === 'all' ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('all')}
                >
                  All
                </Button>
                <Button
                  variant={selectedType === 'tool' ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('tool')}
                >
                  Tools
                </Button>
                <Button
                  variant={selectedType === 'theme' ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('theme')}
                >
                  Themes
                </Button>
                <Button
                  variant={selectedType === 'language' ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('language')}
                >
                  Languages
                </Button>
                <Button
                  variant={selectedType === 'integration' ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('integration')}
                >
                  Integrations
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {filteredAvailable.length === 0 ? (
                <Alert>
                  <AlertDescription className="text-center py-4">
                    <p className="text-sm text-muted-foreground">No extensions found</p>
                  </AlertDescription>
                </Alert>
              ) : (
                filteredAvailable.map((ext) => (
                  <Card key={ext.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <span className="text-2xl">{ext.icon}</span>
                          <div className="flex-1">
                            <CardTitle className="text-base flex items-center gap-2">
                              {ext.name}
                              <span className={`text-xs px-2 py-0.5 rounded ${getTypeColor(ext.type)}`}>
                                {ext.type}
                              </span>
                            </CardTitle>
                            <CardDescription className="text-xs mt-1">
                              {ext.description}
                            </CardDescription>
                            <p className="text-xs text-muted-foreground mt-1">
                              v{ext.version} {ext.author && `• by ${ext.author}`}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleInstall(ext)}
                        >
                          <Download size={16} className="mr-1" />
                          Install
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        <Alert>
          <AlertDescription className="text-xs text-muted-foreground">
            Extensions are stored locally and run in your browser. More extensions coming soon!
          </AlertDescription>
        </Alert>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
