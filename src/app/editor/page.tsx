"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { templateStore } from "@/lib/data/templates";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function EditorContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("templateId");
  
  const template = templateId 
    ? templateStore.getAllTemplates().find(t => t.id === templateId)
    : null;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Quote Editor</h1>
      
      {template ? (
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              Using Template: {template.name}
            </h2>
            <p className="text-muted-foreground mb-4">
              Template loaded successfully! This is where you would implement the quote editor.
            </p>
            <div className="bg-background p-4 rounded border">
              <h3 className="font-medium mb-2">Template Configuration:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(template.config, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-2">No Template Selected</h2>
          <p className="text-muted-foreground">
            {templateId 
              ? `Template with ID "${templateId}" not found.` 
              : "Please select a template from the gallery to start editing."}
          </p>
        </div>
      )}
    </div>
  );
}

export default function EditorPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline">← Back to Templates</Button>
        </Link>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <EditorContent />
      </Suspense>
    </div>
  );
}