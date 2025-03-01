"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Dumbbell, Wheat, Droplets, Flame, Printer, Share } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

function RecipeActions({ recipe }: { recipe: Recipe }) {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${recipe.recipeName}</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { text-align: center; margin-bottom: 30px; }
          .macros { display: flex; justify-content: space-around; margin-bottom: 30px; }
          .macro-item { text-align: center; }
          h2 { margin-top: 30px; }
          .ingredient { margin-bottom: 8px; }
          .step { margin-bottom: 12px; }
        </style>
      </head>
      <body>
        <h1>${recipe.recipeName}</h1>
        
        <div class="macros">
          <div class="macro-item">
            <div>Protein</div>
            <div><strong>${recipe.macros.protein}</strong></div>
          </div>
          <div class="macro-item">
            <div>Carbs</div>
            <div><strong>${recipe.macros.carbs}</strong></div>
          </div>
          <div class="macro-item">
            <div>Fats</div>
            <div><strong>${recipe.macros.fats}</strong></div>
          </div>
          <div class="macro-item">
            <div>Calories</div>
            <div><strong>${recipe.macros.calories}</strong></div>
          </div>
        </div>
        
        <h2>Ingredients</h2>
        <div>
          ${recipe.ingredients
            .map(
              (ing) => `
            <div class="ingredient">• ${ing.ingredient} - ${ing.quantity}</div>
          `
            )
            .join("")}
        </div>
        
        <h2>Instructions</h2>
        <div>
          ${recipe.steps
            .map(
              (step, index) => `
            <div class="step">${index + 1}. ${step}</div>
          `
            )
            .join("")}
        </div>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.addEventListener("load", () => {
      printWindow.print();
    });
  };

  const handleShare = () => {
    // Format recipe details for sharing
    const ingredientsList = recipe.ingredients
      .map((ing) => `• ${ing.ingredient} - ${ing.quantity}`)
      .join("\n");

    const stepsList = recipe.steps
      .map((step, i) => `${i + 1}. ${step}`)
      .join("\n");

    const recipeText = `${recipe.recipeName}

MACROS:
• Protein: ${recipe.macros.protein}
• Carbs: ${recipe.macros.carbs}
• Fats: ${recipe.macros.fats}
• Calories: ${recipe.macros.calories}

INGREDIENTS:
${ingredientsList}

INSTRUCTIONS:
${stepsList}`;

    if (navigator.share) {
      navigator
        .share({
          title: recipe.recipeName,
          text: recipeText,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback for browsers that don't support share API
      navigator.clipboard.writeText(recipeText).then(() => {
        alert("Recipe copied to clipboard!");
      });
    }
  };

  return (
    <div className="flex justify-center gap-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
        onClick={handlePrint}
      >
        <Printer className="h-4 w-4" />
        <span>Print</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
        onClick={handleShare}
      >
        <Share className="h-4 w-4" />
        <span>Share</span>
      </Button>
    </div>
  );
}

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

      <RecipeActions recipe={recipe} />

      <Tabs defaultValue="ingredients" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
        </TabsList>
        <TabsContent value="ingredients">
          <GlassCard>
            <ScrollArea className="h-[400px] pr-4 mb-4">
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
        <TabsContent value="instructions" className="p-4">
          <GlassCard>
            <ScrollArea className="h-[400px] pr-4 mb-4">
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
