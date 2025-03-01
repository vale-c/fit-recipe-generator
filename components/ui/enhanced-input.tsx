"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { UtensilsCrossed, X } from "lucide-react";

interface EnhancedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onSubmit?: () => void;
  className?: string;
}

export const EnhancedInput = React.forwardRef<
  HTMLInputElement,
  EnhancedInputProps
>(({ className, onSubmit, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    props.onChange?.(e);
  };

  const handleClear = () => {
    const input = ref as React.RefObject<HTMLInputElement>;
    if (input.current) {
      input.current.value = "";
      input.current.focus();
      setHasValue(false);
      // Trigger change event to update state in parent components
      const event = new Event("input", { bubbles: true });
      input.current.dispatchEvent(event);
    }
  };

  return (
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
      <div className="relative flex items-center">
        <div
          className={cn(
            "absolute left-3 text-muted-foreground/60 transition-all duration-200",
            isFocused && "text-primary"
          )}
        >
          <UtensilsCrossed className="h-5 w-5" />
        </div>
        <input
          ref={ref}
          className={cn(
            "flex h-14 w-full rounded-xl border border-input bg-background pl-10 pr-10 text-base shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
            isFocused && "border-primary shadow-md shadow-primary/10",
            hasValue && "pr-10",
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...props}
        />
        {hasValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 rounded-full p-1 text-muted-foreground/60 hover:bg-muted hover:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
});

EnhancedInput.displayName = "EnhancedInput";
