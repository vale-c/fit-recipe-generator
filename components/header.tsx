"use client";

import { MoonIcon, SunIcon, UtensilsCrossed } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="py-6 px-4 border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <UtensilsCrossed className="h-6 w-6" />
          <h1 className="text-2xl font-bold">
            <GradientText>AI Fitness Recipe Generator</GradientText>
          </h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
}
