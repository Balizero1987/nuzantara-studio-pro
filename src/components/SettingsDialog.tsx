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
import { Key, Link } from '@phosphor-icons/react';
import { AI_PROVIDERS } from '@/lib/constants';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKeys: Record<string, string>;
  onApiKeysChange: (keys: Record<string, string>) => void;
}

export function SettingsDialog({ open, onOpenChange, apiKeys, onApiKeysChange }: SettingsDialogProps) {
  const [tempApiKeys, setTempApiKeys] = useState<Record<string, string>>(apiKeys);

  const handleSave = () => {
    onApiKeysChange(tempApiKeys);
    onOpenChange(false);
  };

  const updateApiKey = (providerId: string, key: string) => {
    setTempApiKeys(prev => ({ ...prev, [providerId]: key }));
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
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI Provider Settings</DialogTitle>
          <DialogDescription>Configure API keys for different AI providers</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={AI_PROVIDERS[0].id} className="w-full">
          <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${AI_PROVIDERS.length}, 1fr)` }}>
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
