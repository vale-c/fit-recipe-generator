"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, ChefHat } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { RecipeDisplay } from "@/components/recipe-display";
import { generateRecipe } from "./recipe-generator-server";
import { Recipe } from "./recipe-display";
import { useToast } from "@/hooks/use-toast";
import { RecipeSkeleton } from "@/components/ui/recipe-skeleton";

export function RecipeGenerator() {
  const [userInput, setUserInput] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateRecipe = useCallback(async () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter ingredients or a recipe request",
        variant: "destructive",
      });
      return;
    }

    setStatus("loading");
    setError(null); // Clear any previous error

    try {
      const result = await generateRecipe(userInput);
      setRecipe(result.recipe);
      setStatus("success");
      toast({
        title: "Recipe Generated!",
        description: "Your custom fitness recipe is ready.",
      });
    } catch (error: unknown) {
      console.error("Error generating recipe:", error);
      setError("Failed to generate recipe. Please try again.");
      setStatus("error");
    }
  }, [userInput, toast]);

  return (
    <div className="space-y-8">
      <GlassCard>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-medium">
              What would you like to cook?
            </h2>
          </div>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter ingredients or recipe request (e.g., 'I have eggs, spinach, and avocado')"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-grow"
            />
            <Button
              onClick={handleGenerateRecipe}
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
      </GlassCard>
      {status === "loading" && <RecipeSkeleton />}
      {status === "error" && (
        <GlassCard>
          <p className="text-red-500">{error}</p>
        </GlassCard>
      )}
      {status === "success" && recipe && <RecipeDisplay recipe={recipe} />}
    </div>
  );
}
