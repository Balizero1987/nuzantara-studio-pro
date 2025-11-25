import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key } from '@phosphor-icons/react';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: string;
  onApiKeyChange: (apiKey: string) => void;
}

export function SettingsDialog({ open, onOpenChange, apiKey, onApiKeyChange }: SettingsDialogProps) {
  const [tempApiKey, setTempApiKey] = useState(apiKey);

  const handleSave = () => {
    onApiKeyChange(tempApiKey);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Configure your Nuzantara Studio PRO settings</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">OpenRouter API Key</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Key size={18} className="absolute left-3 top-3 text-muted-foreground" />
                <Input
                  id="api-key"
                  type="password"
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="sk-or-v1-..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <Alert>
            <AlertDescription className="text-xs">
              <p className="font-semibold mb-2">How to get your API key:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Go to <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">openrouter.ai</a></li>
                <li>Sign up or log in to your account</li>
                <li>Navigate to Keys section</li>
                <li>Create a new API key</li>
                <li>Copy and paste it here</li>
              </ol>
            </AlertDescription>
          </Alert>

          <Alert>
            <AlertDescription className="text-xs text-muted-foreground">
              Your API key is stored locally in your browser and never sent to any server except OpenRouter.
            </AlertDescription>
          </Alert>
        </div>

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
