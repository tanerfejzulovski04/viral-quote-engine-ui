"use client";

import { useState } from "react";
import { QuoteEditor } from "@/components/quote-editor";
import { AiRewriteDialog } from "@/components/ai-rewrite-dialog";

export default function Home() {
  const [currentText, setCurrentText] = useState("Write your viral quote here...");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Viral Quote Engine
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Create and rewrite compelling quotes with AI assistance
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <QuoteEditor 
            text={currentText} 
            onChange={setCurrentText}
            onRewrite={() => setIsDialogOpen(true)}
          />
        </div>

        <AiRewriteDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          currentText={currentText}
          onTextSelect={(newText: string) => {
            setCurrentText(newText);
            setIsDialogOpen(false);
          }}
        />
      </div>
    </div>
  );
}
