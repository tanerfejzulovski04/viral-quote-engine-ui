"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { X, Check, Loader2 } from "lucide-react";

type RewriteStyle = "shorter" | "punchier" | "motivational";

interface RewriteVariant {
  id: string;
  text: string;
}

interface AiRewriteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentText: string;
  onTextSelect: (text: string) => void;
}

export function AiRewriteDialog({
  open,
  onOpenChange,
  currentText,
  onTextSelect,
}: AiRewriteDialogProps) {
  const [selectedStyle, setSelectedStyle] = useState<RewriteStyle>("punchier");
  const [isLoading, setIsLoading] = useState(false);
  const [variants, setVariants] = useState<RewriteVariant[]>([]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setVariants([]);

    try {
      const response = await fetch("/api/ai/rewrite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: currentText,
          style: selectedStyle,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setVariants(data.variants || []);
    } catch (error) {
      console.error("Failed to fetch AI rewrites:", error);
      // For demo purposes, provide fallback variants
      setVariants([
        {
          id: "1",
          text: `${selectedStyle === "shorter" ? "Short version: " : selectedStyle === "punchier" ? "Punchy: " : "Motivational: "}${currentText}`,
        },
        {
          id: "2",
          text: `${selectedStyle === "shorter" ? "Brief: " : selectedStyle === "punchier" ? "Impact: " : "Inspiring: "}${currentText}`,
        },
        {
          id: "3",
          text: `${selectedStyle === "shorter" ? "Concise: " : selectedStyle === "punchier" ? "Bold: " : "Uplifting: "}${currentText}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-2xl font-semibold text-gray-800 dark:text-white">
              AI Rewrite
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-6">
            {/* Current Text Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Text
              </label>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border text-gray-800 dark:text-gray-200">
                {currentText}
              </div>
            </div>

            {/* Style Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Rewrite Style
              </label>
              <RadioGroup.Root
                value={selectedStyle}
                onValueChange={(value) => setSelectedStyle(value as RewriteStyle)}
                className="flex gap-4"
              >
                {(["shorter", "punchier", "motivational"] as const).map((style) => (
                  <div key={style} className="flex items-center space-x-2">
                    <RadioGroup.Item
                      value={style}
                      id={style}
                      className="w-5 h-5 rounded-full border-2 border-blue-500 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:w-2 after:h-2 after:bg-white after:rounded-full" />
                    </RadioGroup.Item>
                    <label
                      htmlFor={style}
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize cursor-pointer"
                    >
                      {style}
                    </label>
                  </div>
                ))}
              </RadioGroup.Root>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating variants...
                </>
              ) : (
                "Generate Rewrite Variants"
              )}
            </button>

            {/* Results */}
            {isLoading && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Generating variants...
                </h3>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  </div>
                ))}
              </div>
            )}

            {variants.length > 0 && !isLoading && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Choose a variant:
                </h3>
                <div className="space-y-3">
                  {variants.map((variant) => (
                    <div
                      key={variant.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border hover:border-blue-500 transition-colors"
                    >
                      <p className="text-gray-800 dark:text-gray-200 mb-3">
                        {variant.text}
                      </p>
                      <button
                        onClick={() => onTextSelect(variant.text)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                      >
                        <Check className="w-4 h-4" />
                        Use this
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}