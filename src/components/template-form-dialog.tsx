"use client";

import React, { useState } from "react";
import { Template } from "@/types/template";
import { templateStore } from "@/lib/data/templates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";

interface TemplateFormDialogProps {
  template?: Template;
  onSuccess: () => void;
}

export default function TemplateFormDialog({
  template,
  onSuccess,
}: TemplateFormDialogProps) {
  const [name, setName] = useState(template?.name || "");
  const [configText, setConfigText] = useState(
    template ? JSON.stringify(template.config, null, 2) : "{}"
  );
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateJSON = (text: string): object | null => {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!name.trim()) {
      setError("Name is required");
      setIsSubmitting(false);
      return;
    }

    const config = validateJSON(configText);
    if (!config) {
      setError("Invalid JSON configuration. Please check your syntax.");
      setIsSubmitting(false);
      return;
    }

    try {
      if (template) {
        // Update existing template
        templateStore.updateTemplate(template.id, {
          name: name.trim(),
          config,
        });
      } else {
        // Create new template
        templateStore.createTemplate({
          name: name.trim(),
          config,
        });
      }
      onSuccess();
    } catch {
      setError("Failed to save template. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfigChange = (value: string) => {
    setConfigText(value);
    // Clear JSON validation error when user starts typing
    if (error && error.includes("Invalid JSON")) {
      setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter template name"
          className={error && !name.trim() ? "border-red-500" : ""}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="config">Configuration (JSON)</Label>
        <Textarea
          id="config"
          value={configText}
          onChange={(e) => handleConfigChange(e.target.value)}
          placeholder="Enter JSON configuration"
          rows={8}
          className={`font-mono ${
            error && error.includes("Invalid JSON") ? "border-red-500" : ""
          }`}
        />
        <p className="text-xs text-muted-foreground">
          Enter a valid JSON object for the template configuration
        </p>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : template ? "Update" : "Create"}
        </Button>
      </DialogFooter>
    </form>
  );
}