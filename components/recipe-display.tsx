"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Dumbbell, Wheat, Droplets, Flame } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}) => {
  const colorClasses = {
    blue: "border-blue-200/30 bg-blue-50/30 dark:bg-blue-950/30",
    green: "border-green-200/30 bg-green-50/30 dark:bg-green-950/30",
    amber: "border-amber-200/30 bg-amber-50/30 dark:bg-amber-950/30",
    red: "border-red-200/30 bg-red-50/30 dark:bg-red-950/30",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border p-2 shadow-sm",
        colorClasses[color as keyof typeof colorClasses]
      )}
    >
      <div className="flex items-center space-x-1 text-sm font-medium text-muted-foreground">
        {icon}
        <span>{title}</span>
      </div>
      <p className="font-semibold">{value}</p>
    </div>
  );
};

export function RecipeDisplay({ recipe }: { recipe: Recipe }) {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
          {recipe.recipeName}
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
            <MacroCard
              title="Protein"
              value={recipe.macros.protein}
              icon={<Dumbbell className="h-4 w-4 text-blue-500" />}
              color="blue"
            />
            <MacroCard
              title="Carbs"
              value={recipe.macros.carbs}
              icon={<Wheat className="h-4 w-4 text-amber-500" />}
              color="amber"
            />
            <MacroCard
              title="Fats"
              value={recipe.macros.fats}
              icon={<Droplets className="h-4 w-4 text-green-500" />}
              color="green"
            />
            <MacroCard
              title="Calories"
              value={recipe.macros.calories}
              icon={<Flame className="h-4 w-4 text-red-500" />}
              color="red"
            />
          </div>
        </div>
      </div>

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
