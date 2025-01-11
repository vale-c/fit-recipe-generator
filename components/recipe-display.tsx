"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { GradientText } from "@/components/ui/gradient-text";
import { Dumbbell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";

interface Ingredient {
  ingredient: string;
  quantity: string;
}

export interface Recipe {
  recipeName: string;
  ingredients: Ingredient[];
  macros: {
    protein: string | number;
    carbs: string | number;
    fats: string | number;
    calories: string | number;
  };
  steps: string[];
}

const MacroCard = ({
  label,
  value,
  unit,
  max,
}: {
  label: string;
  max: number;
  value: string | number;
  unit: string;
}) => {
  // Ensure value includes the unit and format it properly
  const displayValue =
    typeof value === "number" ? `${value}${unit}` : value.toString();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{label}</span>
            <span className="font-semibold">{displayValue}</span>
          </div>
          <Progress value={(parseFloat(value as string) / max) * 100} />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{label} Information</h4>
          <p className="text-sm">
            {displayValue} out of recommended {max}
            {unit} for this meal.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export function RecipeDisplay({ recipe }: { recipe: Recipe }) {
  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">
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
                unit="g"
                max={100}
              />
              <MacroCard
                label="Carbs"
                value={recipe.macros.carbs}
                unit="g"
                max={80}
              />
              <MacroCard
                label="Fats"
                value={recipe.macros.fats}
                unit="g"
                max={40}
              />
              <MacroCard
                label="Calories"
                value={recipe.macros.calories}
                unit="kcal"
                max={600}
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
  );
}
