"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { UtensilsCrossed, X } from "lucide-react";
import { Button } from "./button";

const DEFAULT_EXAMPLES = [
  "High-protein breakfast with eggs and spinach",
  "Keto dinner with chicken and avocado",
  "Quick post-workout protein smoothie",
  "Vegan lunch with 30g protein",
  "Low-carb meal with salmon",
];

export function RecipeInput({
  onSubmit,
  value,
  onChange,
  disabled,
  examples = DEFAULT_EXAMPLES,
}: {
  onSubmit: (value: string) => void;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  examples?: string[];
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = React.useState(0);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Reset currentPlaceholder when examples change
  React.useEffect(() => {
    setCurrentPlaceholder(0);
  }, [examples]);

  // Rotate placeholders every 5 seconds
  React.useEffect(() => {
    if (examples.length === 0) return;

    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % examples.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [examples]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(value);
    }
  };

  const handleClear = () => {
    onChange("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleExampleClick = (example: string) => {
    onChange(example);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "relative transition-all duration-200 group",
          isFocused && "scale-[1.01]"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            isFocused && "opacity-100"
          )}
        />
        <div className="relative">
          <div
            className={cn(
              "absolute left-3 top-3 text-muted-foreground/60 transition-all duration-200",
              isFocused && "text-primary"
            )}
          >
            <UtensilsCrossed className="h-5 w-5" />
          </div>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={
              examples.length > 0
                ? `Try: "${examples[currentPlaceholder]}"`
                : "Describe your meal..."
            }
            className={cn(
              "flex w-full min-h-[100px] rounded-xl border border-input bg-background pl-10 pr-10 py-3 text-base shadow-sm transition-all focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
              isFocused && "border-primary shadow-md shadow-primary/10"
            )}
            disabled={disabled}
          />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground/60 hover:bg-muted hover:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {examples.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <p className="text-xs text-muted-foreground w-full mb-1">
            Try one of these examples:
          </p>
          {examples.map((example, i) => (
            <Button
              key={i}
              variant="outline"
              size="sm"
              className="text-xs h-7 rounded-full bg-background hover:bg-primary/10 hover:text-primary"
              onClick={() => handleExampleClick(example)}
            >
              {example}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
