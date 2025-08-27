"use client";

import { Wand2 } from "lucide-react";

interface QuoteEditorProps {
  text: string;
  onChange: (text: string) => void;
  onRewrite: () => void;
}

export function QuoteEditor({ text, onChange, onRewrite }: QuoteEditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Quote Editor
        </h2>
        <button
          onClick={onRewrite}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Wand2 className="w-4 h-4" />
          AI Rewrite
        </button>
      </div>
      
      <textarea
        value={text}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your viral quote here..."
        className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
      />
      
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Character count: {text.length}
      </div>
    </div>
  );
}