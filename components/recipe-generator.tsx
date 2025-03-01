"use client";

import { useState, useCallback, useTransition, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ChefHat, Sparkles, Info } from "lucide-react";
import { RecipeDisplay } from "@/components/recipe-display";
import { generateRecipe } from "./recipe-generator-server";
import { Recipe } from "./recipe-display";
import { useToast } from "@/hooks/use-toast";
import { RecipeSkeleton } from "@/components/ui/recipe-skeleton";
import { RecipeInput } from "./ui/recipe-input";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RecipeHistory } from "./recipe-history";

const DIET_TYPES = [
  { id: "any", label: "Any" },
  { id: "high-protein", label: "High Protein" },
  { id: "keto", label: "Keto" },
  { id: "vegan", label: "Vegan" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "paleo", label: "Paleo" },
  { id: "gluten-free", label: "Gluten Free" },
  { id: "low-carb", label: "Low Carb" },
];

export function RecipeGenerator() {
  const [userInput, setUserInput] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [history, setHistory] = useState<Recipe[]>([]);
  const [selectedDiet, setSelectedDiet] = useState("any");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [justGenerated, setJustGenerated] = useState(false);
  const { toast } = useToast();
  const recipeRef = useRef<HTMLDivElement>(null);

  // Scroll to recipe when generated
  useEffect(() => {
    if (justGenerated && recipe && recipeRef.current) {
      recipeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setJustGenerated(false);
    }
  }, [justGenerated, recipe]);

  const handleGenerateRecipe = useCallback(() => {
    if (!userInput.trim()) {
      toast({
        title: "Hold up!",
        description: "Please enter ingredients or a recipe request",
        variant: "destructive",
      });
      return;
    }

    setError(null);

    // Construct final prompt with diet preference
    const finalPrompt =
      selectedDiet !== "any"
        ? `${userInput} Make it ${selectedDiet}.`
        : userInput;

    startTransition(async () => {
      try {
        const result = await generateRecipe(finalPrompt);
        setRecipe(result.recipe);
        setJustGenerated(true);

        // Add to history (only if not already in history)
        setHistory((prev) => {
          const exists = prev.some(
            (r) => r.recipeName === result.recipe.recipeName
          );
          if (!exists) {
            // Add timestamp to recipe
            const recipeWithTime = {
              ...result.recipe,
              timestamp: Date.now(),
            };
            return [recipeWithTime, ...prev].slice(0, 5); // Keep last 5 recipes
          }
          return prev;
        });

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
  }, [userInput, selectedDiet, toast]);

  // Add more detailed examples to better showcase Gemini's capabilities
  const getDetailedExamples = (diet: string) => {
    const allExamples = [
      "Mediterranean bowl with grilled chicken, quinoa, roasted vegetables, and a lemon tahini dressing (30g protein)",
      "Post-workout smoothie with frozen berries, banana, Greek yogurt, and vanilla protein powder (25g protein)",
      "Asian-inspired stir-fry with tofu, broccoli, bell peppers, and brown rice in a ginger garlic sauce",
      "Mexican-inspired breakfast with scrambled eggs, black beans, avocado, and salsa on corn tortillas",
      "Sheet pan dinner with salmon, asparagus, and sweet potatoes with lemon herb seasoning",
      "Quick no-bake energy balls using oats, peanut butter, honey, chia seeds, and dark chocolate",
      "Breakfast parfait with layers of Greek yogurt, homemade granola, berries, and a drizzle of honey",
      "Meal-prep friendly chicken and vegetable soup that's freezer-friendly and under 400 calories",
    ];

    const veganExamples = [
      "High-protein vegan Buddha bowl with quinoa, chickpeas, roasted vegetables, and tahini dressing",
      "Creamy vegan pasta with cashew sauce, nutritional yeast, and sautéed mushrooms (20g protein)",
      "Plant-based protein smoothie with pea protein, banana, almond butter, and oat milk",
      "Spicy tofu scramble with bell peppers, spinach, and nutritional yeast on whole grain toast",
      "Lentil and vegetable curry with coconut milk, served with brown rice (25g protein)",
      "High-protein vegan breakfast oatmeal with chia seeds, hemp hearts, and nut butter (15g protein)",
    ];

    const ketoExamples = [
      "Keto breakfast with avocado, poached eggs, and smoked salmon (2g net carbs)",
      "Low-carb chicken alfredo with zucchini noodles and rich cream sauce (5g net carbs)",
      "Keto-friendly beef and vegetable stir-fry with coconut aminos (3g net carbs)",
      "High-fat snack with macadamia nuts, cheese cubes, and olives for sustained energy",
      "Creamy garlic butter shrimp with cauliflower rice (4g net carbs, 40g fat)",
    ];

    if (diet === "vegan") return veganExamples;
    if (diet === "vegetarian")
      return [...veganExamples.slice(0, 3), allExamples[2], allExamples[5]];
    if (diet === "keto") return ketoExamples;
    if (diet === "low-carb")
      return [
        ...ketoExamples.slice(0, 3),
        "Low-carb turkey and vegetable lettuce wraps with spicy mayo",
      ];

    return allExamples;
  };

  // Add a handle remove function
  const handleRemoveRecipe = (index: number) => {
    setHistory((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col space-y-6 pb-20">
      {/* Title and Description */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
          AI Fitness Recipe Generator
        </h1>
        <p className="text-muted-foreground max-w-[700px] mx-auto">
          Transform your ingredients into delicious, high-protein fitness meals
          with AI. Just tell us what you have or what you&apos;re craving.
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="md:col-span-2">
          <div className="relative bg-gradient-to-br from-background via-background/95 to-background/90 rounded-2xl p-6 shadow-xl border border-border/50">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl" />

            <div className="relative space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-medium">Create Your Recipe</h2>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[300px]">
                      <p>
                        Describe the meal you want to make with any ingredients
                        you have on hand. Be specific about your dietary
                        preferences.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <RecipeInput
                value={userInput}
                onChange={setUserInput}
                onSubmit={handleGenerateRecipe}
                disabled={isPending}
                examples={getDetailedExamples(selectedDiet)}
              />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Dietary Preference:</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {DIET_TYPES.map((diet) => (
                    <Button
                      key={diet.id}
                      size="sm"
                      variant={selectedDiet === diet.id ? "default" : "outline"}
                      onClick={() => setSelectedDiet(diet.id)}
                      className={cn(
                        "rounded-full",
                        selectedDiet === diet.id && "bg-primary"
                      )}
                    >
                      {diet.label}
                    </Button>
                  ))}
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
            </div>
          </div>
        </div>

        {/* Recipe History Panel */}
        <div className="md:col-span-1">
          <RecipeHistory
            recipes={history}
            onSelect={(recipe) => setRecipe(recipe)}
            onRemove={handleRemoveRecipe}
          />
        </div>
      </div>

      {/* Recipe Display Section */}
      {(isPending || recipe) && (
        <div
          ref={recipeRef}
          className={cn(
            "pt-6 transition-all duration-500",
            justGenerated &&
              "bg-primary/5 rounded-2xl p-6 border border-primary/20"
          )}
        >
          {isPending ? (
            <RecipeSkeleton />
          ) : recipe ? (
            <RecipeDisplay recipe={recipe} />
          ) : null}
        </div>
      )}
    </div>
  );
}
