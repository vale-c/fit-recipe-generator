"use client";

import { useState, useCallback, useTransition, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ChefHat, Sparkles } from "lucide-react";
import { RecipeDisplay } from "@/components/recipe-display";
import { generateRecipe } from "./recipe-generator-server";
import { Recipe } from "./recipe-display";
import { useToast } from "@/hooks/use-toast";
import { RecipeSkeleton } from "@/components/ui/recipe-skeleton";
import { EnhancedInput } from "./ui/enhanced-input";
import { cn } from "@/lib/utils";

export function RecipeGenerator() {
  const [userInput, setUserInput] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGenerateRecipe = useCallback(() => {
    if (!userInput.trim()) {
      toast({
        title: "Hold up!",
        description: "Please enter ingredients or a recipe request",
        variant: "destructive",
      });
      return;
    }

    setError(null); // Clear previous error

    startTransition(async () => {
      try {
        const result = await generateRecipe(userInput);
        setRecipe(result.recipe);
        toast({
          title: "Recipe Generated!",
          description: "Your custom fitness recipe is ready.",
        });
      } catch (error: unknown) {
        console.error("Error generating recipe:", error);
        setError("Failed to generate recipe. Please try again.");
        toast({
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    });
  }, [userInput, toast]);

  return (
    <div className="flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
          AI Fitness Recipe Generator
        </h1>
        <p className="text-muted-foreground max-w-[700px] mx-auto">
          Transform your ingredients into delicious, high-protein fitness meals
          with AI. Just tell us what you have or what you&apos;re craving.
        </p>
      </div>

      <div className="relative bg-gradient-to-br from-background via-background/95 to-background/90 rounded-2xl p-6 shadow-xl border border-border/50 mx-auto w-full max-w-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl" />

        <div className="relative space-y-5">
          <div className="space-y-3">
            <label
              htmlFor="recipe-input"
              className="text-lg font-medium flex items-center space-x-2"
            >
              <Sparkles className="h-5 w-5 text-primary" />
              <span>What would you like to cook today?</span>
            </label>
            <div className="space-y-2">
              <EnhancedInput
                ref={inputRef}
                id="recipe-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onSubmit={handleGenerateRecipe}
                placeholder="Enter ingredients or recipe request (e.g., high-protein breakfast with eggs and spinach)"
                className={cn(
                  "w-full transition-all duration-300",
                  isPending && "opacity-50"
                )}
                disabled={isPending}
              />
              <p className="text-xs text-muted-foreground pl-2">
                Try to be specific about dietary preferences, cooking methods,
                or desired macros
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleGenerateRecipe}
              disabled={isPending || !userInput.trim()}
              size="lg"
              className="relative overflow-hidden group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center">
                {isPending ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <ChefHat className="mr-2 h-5 w-5" />
                )}
                {isPending ? "Cooking..." : "Generate Recipe"}
              </span>
            </Button>
          </div>

          {error && (
            <div className="p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg">
              {error}
            </div>
          )}

          <div className="pt-6">
            {isPending ? (
              <RecipeSkeleton />
            ) : recipe ? (
              <RecipeDisplay recipe={recipe} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
