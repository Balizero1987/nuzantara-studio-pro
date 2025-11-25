import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, Link, Plus, Trash } from '@phosphor-icons/react';
import { AI_PROVIDERS } from '@/lib/constants';
import type { AIProvider } from '@/lib/types';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKeys: Record<string, string>;
  onApiKeysChange: (keys: Record<string, string>) => void;
  customProviders?: AIProvider[];
  onCustomProvidersChange?: (providers: AIProvider[]) => void;
}

export function SettingsDialog({ 
  open, 
  onOpenChange, 
  apiKeys, 
  onApiKeysChange,
  customProviders = [],
  onCustomProvidersChange 
}: SettingsDialogProps) {
  const [tempApiKeys, setTempApiKeys] = useState<Record<string, string>>(apiKeys);
  const [showAddProvider, setShowAddProvider] = useState(false);
  const [newProvider, setNewProvider] = useState({
    id: '',
    name: '',
    baseUrl: '',
    icon: '🔧',
    models: '',
  });

  const handleSave = () => {
    onApiKeysChange(tempApiKeys);
    onOpenChange(false);
  };

  const updateApiKey = (providerId: string, key: string) => {
    setTempApiKeys(prev => ({ ...prev, [providerId]: key }));
  };

  const handleAddCustomProvider = () => {
    if (!newProvider.id || !newProvider.name || !newProvider.baseUrl) {
      return;
    }

    const models = newProvider.models.split(',').map(m => {
      const trimmed = m.trim();
      return {
        value: trimmed,
        label: trimmed,
        provider: newProvider.id,
        description: 'Custom model',
      };
    }).filter(m => m.value);

    const provider: AIProvider = {
      id: newProvider.id,
      name: newProvider.name,
      type: 'custom',
      baseUrl: newProvider.baseUrl,
      requiresApiKey: true,
      icon: newProvider.icon,
      models,
      isCustom: true,
    };

    if (onCustomProvidersChange) {
      onCustomProvidersChange([...customProviders, provider]);
    }

    setNewProvider({ id: '', name: '', baseUrl: '', icon: '🔧', models: '' });
    setShowAddProvider(false);
  };

  const handleDeleteCustomProvider = (providerId: string) => {
    if (onCustomProvidersChange) {
      onCustomProvidersChange(customProviders.filter(p => p.id !== providerId));
    }
  };

  const providerInstructions = {
    openrouter: {
      url: 'https://openrouter.ai',
      steps: [
        'Go to openrouter.ai',
        'Sign up or log in to your account',
        'Navigate to Keys section',
        'Create a new API key',
        'Copy and paste it here',
      ],
      placeholder: 'sk-or-v1-...',
    },
    openai: {
      url: 'https://platform.openai.com/api-keys',
      steps: [
        'Go to platform.openai.com',
        'Sign up or log in to your account',
        'Navigate to API Keys',
        'Create a new secret key',
        'Copy and paste it here',
      ],
      placeholder: 'sk-...',
    },
    anthropic: {
      url: 'https://console.anthropic.com/settings/keys',
      steps: [
        'Go to console.anthropic.com',
        'Sign up or log in to your account',
        'Navigate to API Keys',
        'Create a new API key',
        'Copy and paste it here',
      ],
      placeholder: 'sk-ant-...',
    },
    groq: {
      url: 'https://console.groq.com/keys',
      steps: [
        'Go to console.groq.com',
        'Sign up or log in to your account',
        'Navigate to API Keys',
        'Create a new API key',
        'Copy and paste it here',
      ],
      placeholder: 'gsk_...',
    },
    google: {
      url: 'https://makersuite.google.com/app/apikey',
      steps: [
        'Go to makersuite.google.com',
        'Sign in with your Google account',
        'Click "Get API key"',
        'Create a new API key',
        'Copy and paste it here',
      ],
      placeholder: 'AIza...',
    },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI Provider Settings</DialogTitle>
          <DialogDescription>Configure API keys and manage custom providers</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="providers" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="providers">API Keys</TabsTrigger>
            <TabsTrigger value="custom">Custom Providers</TabsTrigger>
          </TabsList>

          <TabsContent value="providers" className="space-y-4 mt-4">
            <Tabs defaultValue={AI_PROVIDERS[0].id}>
              <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${Math.min(AI_PROVIDERS.length, 5)}, 1fr)` }}>
                {AI_PROVIDERS.map((provider) => (
                  <TabsTrigger key={provider.id} value={provider.id} className="text-xs">
                    <span className="mr-1">{provider.icon}</span>
                    {provider.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {AI_PROVIDERS.map((provider) => {
                const instructions = providerInstructions[provider.type as keyof typeof providerInstructions];
                
                return (
                  <TabsContent key={provider.id} value={provider.id} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor={`api-key-${provider.id}`}>{provider.name} API Key</Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Key size={18} className="absolute left-3 top-3 text-muted-foreground" />
                          <Input
                            id={`api-key-${provider.id}`}
                            type="password"
                            value={tempApiKeys[provider.id] || ''}
                            onChange={(e) => updateApiKey(provider.id, e.target.value)}
                            placeholder={instructions?.placeholder || 'Enter API key...'}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    {instructions && (
                      <>
                        <Alert>
                          <AlertDescription className="text-xs">
                            <p className="font-semibold mb-2">How to get your API key:</p>
                            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                              {instructions.steps.map((step, i) => (
                                <li key={i}>{step}</li>
                              ))}
                            </ol>
                          </AlertDescription>
                        </Alert>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => window.open(instructions.url, '_blank')}
                        >
                          <Link size={16} className="mr-2" />
                          Open {provider.name} Dashboard
                        </Button>
                      </>
                    )}

                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-xs font-medium mb-2">Available Models:</p>
                      <div className="flex flex-wrap gap-1">
                        {provider.models.slice(0, 4).map((model) => (
                          <span key={model.value} className="text-xs bg-secondary px-2 py-1 rounded">
                            {model.label}
                          </span>
                        ))}
                        {provider.models.length > 4 && (
                          <span className="text-xs text-muted-foreground px-2 py-1">
                            +{provider.models.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4 mt-4">
            <div className="space-y-4">
              {customProviders.length > 0 && (
                <div className="space-y-2">
                  {customProviders.map((provider) => (
                    <Card key={provider.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{provider.icon}</span>
                            <div>
                              <CardTitle className="text-base">{provider.name}</CardTitle>
                              <CardDescription className="text-xs">{provider.baseUrl}</CardDescription>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCustomProvider(provider.id)}
                          >
                            <Trash size={16} className="text-destructive" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="space-y-2">
                          <Label htmlFor={`custom-key-${provider.id}`}>API Key</Label>
                          <div className="relative">
                            <Key size={18} className="absolute left-3 top-3 text-muted-foreground" />
                            <Input
                              id={`custom-key-${provider.id}`}
                              type="password"
                              value={tempApiKeys[provider.id] || ''}
                              onChange={(e) => updateApiKey(provider.id, e.target.value)}
                              placeholder="Enter API key..."
                              className="pl-10"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {provider.models.length} model{provider.models.length !== 1 ? 's' : ''} available
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {!showAddProvider ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowAddProvider(true)}
                >
                  <Plus size={16} className="mr-2" />
                  Add Custom Provider
                </Button>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Add Custom Provider</CardTitle>
                    <CardDescription className="text-xs">
                      Add any OpenAI-compatible API provider
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="provider-id">Provider ID</Label>
                      <Input
                        id="provider-id"
                        value={newProvider.id}
                        onChange={(e) => setNewProvider({ ...newProvider, id: e.target.value })}
                        placeholder="my-provider"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="provider-name">Display Name</Label>
                      <Input
                        id="provider-name"
                        value={newProvider.name}
                        onChange={(e) => setNewProvider({ ...newProvider, name: e.target.value })}
                        placeholder="My Custom Provider"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="provider-url">Base URL</Label>
                      <Input
                        id="provider-url"
                        value={newProvider.baseUrl}
                        onChange={(e) => setNewProvider({ ...newProvider, baseUrl: e.target.value })}
                        placeholder="https://api.example.com/v1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="provider-icon">Icon (emoji)</Label>
                      <Input
                        id="provider-icon"
                        value={newProvider.icon}
                        onChange={(e) => setNewProvider({ ...newProvider, icon: e.target.value })}
                        placeholder="🔧"
                        maxLength={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="provider-models">Models (comma-separated)</Label>
                      <Input
                        id="provider-models"
                        value={newProvider.models}
                        onChange={(e) => setNewProvider({ ...newProvider, models: e.target.value })}
                        placeholder="model-1, model-2, model-3"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setShowAddProvider(false);
                          setNewProvider({ id: '', name: '', baseUrl: '', icon: '🔧', models: '' });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={handleAddCustomProvider}
                        disabled={!newProvider.id || !newProvider.name || !newProvider.baseUrl || !newProvider.models}
                      >
                        Add Provider
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Alert>
                <AlertDescription className="text-xs text-muted-foreground">
                  Custom providers must be OpenAI-compatible (same API format). Popular options include Together AI, Fireworks AI, and self-hosted models.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>

        <Alert>
          <AlertDescription className="text-xs text-muted-foreground">
            Your API keys are stored locally in your browser and only sent to their respective providers.
          </AlertDescription>
        </Alert>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
