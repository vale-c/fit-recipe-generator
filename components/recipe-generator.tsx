"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, ChefHat, Dumbbell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateRecipe } from "./recipe-generator-server";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientText } from "@/components/ui/gradient-text";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface Ingredient {
  ingredient: string;
  quantity: string;
}

interface Recipe {
  recipeName: string;
  ingredients: Ingredient[];
  macros: {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
  };
  steps: string[];
}

export default function RecipeGenerator() {
  const [userInput, setUserInput] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateRecipe = async () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter ingredients or a recipe request",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateRecipe(userInput);
      setRecipe(result.recipe);
      toast({
        title: "Recipe Generated!",
        description: "Your custom fitness recipe is ready.",
      });
    } catch (error: unknown) {
      console.error("Error generating recipe:", error);
      toast({
        title: "Error",
        description: "Failed to generate recipe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const MacroCard = ({
    label,
    value,
    max,
    unit,
  }: {
    label: string;
    value: number;
    max: number;
    unit: string;
  }) => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{label}</span>
            <span>
              {value}
              {unit}
            </span>
          </div>
          <Progress value={(value / max) * 100} />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{label} Information</h4>
          <p className="text-sm">
            {value}
            {unit} out of recommended {max}
            {unit} for this meal.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );

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
            <Button onClick={handleGenerateRecipe} disabled={isLoading}>
              {isLoading ? (
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

      {isLoading ? (
        <RecipeSkeleton />
      ) : (
        recipe && (
          <div className="space-y-6">
            <GlassCard>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                  <GradientText>{recipe.recipeName}</GradientText>
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Dumbbell className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Macros</h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <MacroCard
                      label="Protein"
                      value={recipe.macros.protein}
                      max={50}
                      unit="g"
                    />
                    <MacroCard
                      label="Carbs"
                      value={recipe.macros.carbs}
                      max={100}
                      unit="g"
                    />
                    <MacroCard
                      label="Fats"
                      value={recipe.macros.fats}
                      max={40}
                      unit="g"
                    />
                    <MacroCard
                      label="Calories"
                      value={recipe.macros.calories}
                      max={800}
                      unit="kcal"
                    />
                  </div>
                </div>
              </div>
            </GlassCard>

            <Tabs defaultValue="ingredients" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
              </TabsList>
              <TabsContent value="ingredients">
                <GlassCard>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      {recipe.ingredients.map((ing, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                        >
                          <span>{ing.ingredient}</span>
                          <Badge variant="secondary">{ing.quantity}</Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </GlassCard>
              </TabsContent>
              <TabsContent value="instructions">
                <GlassCard>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      {recipe.steps.map((step, index) => (
                        <div
                          key={index}
                          className="flex space-x-4 p-3 rounded-lg bg-muted/50"
                        >
                          <div className="flex-none">
                            <Badge variant="outline">{index + 1}</Badge>
                          </div>
                          <p>{step}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </GlassCard>
              </TabsContent>
            </Tabs>
          </div>
        )
      )}
    </div>
  );
}

function RecipeSkeleton() {
  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="space-y-6">
          <Skeleton className="h-8 w-3/4" />

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-6 w-1/4" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      <Tabs defaultValue="ingredients" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
        </TabsList>
        <TabsContent value="ingredients">
          <GlassCard>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                  >
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </GlassCard>
        </TabsContent>
        <TabsContent value="instructions">
          <GlassCard>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex space-x-4 p-3 rounded-lg bg-muted/50"
                  >
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
