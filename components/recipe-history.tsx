"use client";

import { Recipe } from "./recipe-display";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { History, ChevronRight, X, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";

interface RecipeWithTimestamp extends Recipe {
  timestamp?: number;
}

export function RecipeHistory({
  recipes,
  onSelect,
  onRemove,
}: {
  recipes: RecipeWithTimestamp[];
  onSelect: (recipe: Recipe) => void;
  onRemove: (recipeIndex: number) => void;
}) {
  const [formattedTimes, setFormattedTimes] = useState<string[]>([]);

  // Update the relative timestamps every minute
  useEffect(() => {
    const formatTimes = () => {
      return recipes.map((recipe) =>
        recipe.timestamp
          ? formatDistanceToNow(recipe.timestamp, { addSuffix: true })
          : "recently"
      );
    };

    setFormattedTimes(formatTimes());

    const interval = setInterval(() => {
      setFormattedTimes(formatTimes());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [recipes]);

  if (recipes.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <History className="h-5 w-5 mr-2 text-muted-foreground" />
            Recipe History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-[200px] text-center text-muted-foreground">
            <p>No recipes generated yet</p>
            <p className="text-sm mt-1">Your recent recipes will appear here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <History className="h-5 w-5 mr-2 text-muted-foreground" />
          Recent Recipes
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {" "}
        {/* Remove padding for better scroll area */}
        <ScrollArea className="h-[400px] px-4">
          <ul className="space-y-2 py-2">
            {recipes.map((recipe, index) => (
              <li key={index} className="relative group">
                <Button
                  variant="ghost"
                  className="w-full justify-between h-auto py-3 px-4 hover:bg-muted/50 pr-8"
                  onClick={() => onSelect(recipe)}
                >
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center">
                      <p className="font-medium">{recipe.recipeName}</p>
                    </div>
                    <div className="flex flex-wrap gap-x-2 text-xs text-muted-foreground mt-1">
                      <span>{recipe.macros.protein} protein</span>
                      <span>{recipe.macros.calories}</span>
                      {formattedTimes[index] && (
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 inline" />
                          {formattedTimes[index]}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(index);
                  }}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
