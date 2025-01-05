"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function IngredientInput() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add Ingredients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Enter an ingredient (e.g., 'eggs')"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addIngredient()}
          />
          <Button onClick={addIngredient}>
            <PlusIcon className="h-5 w-5 mr-1" />
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ingredient) => (
            <Badge key={ingredient} variant="secondary" className="text-sm">
              {ingredient}
              <XMarkIcon
                className="h-4 w-4 ml-1 cursor-pointer"
                onClick={() => removeIngredient(ingredient)}
              />
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
