import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { getLanguageFromFilename } from '@/lib/api';

interface CodeEditorProps {
  filename: string;
  content: string;
  onChange: (value: string) => void;
}

export function CodeEditor({ filename, content, onChange }: CodeEditorProps) {
  const editorRef = useRef<any>(null);
  const language = getLanguageFromFilename(filename);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setValue(content);
    }
  }, [filename]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border p-3 flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-accent"></div>
        <span className="text-sm font-medium text-foreground font-mono">{filename}</span>
        <span className="text-xs text-muted-foreground ml-auto">{language}</span>
      </div>
      <div className="flex-1">
        <Editor
          language={language}
          value={content}
          onChange={(value) => onChange(value || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: 'JetBrains Mono, monospace',
            minimap: { enabled: true },
            lineNumbers: 'on',
            rulers: [80, 120],
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            tabSize: 2,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
