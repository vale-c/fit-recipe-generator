"use client";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Coffee, Soup, UtensilsCrossed, Cookie, Sandwich } from "lucide-react";

const MEAL_TYPES = [
  { id: "breakfast", label: "Breakfast", icon: Coffee },
  { id: "lunch", label: "Lunch", icon: Sandwich },
  { id: "dinner", label: "Dinner", icon: UtensilsCrossed },
  { id: "snack", label: "Snack", icon: Cookie },
  { id: "soup", label: "Soup", icon: Soup },
];

export function MealTypeSelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (type: string) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Meal Type:</p>
      <div className="grid grid-cols-5 gap-2">
        {MEAL_TYPES.map((type) => {
          const Icon = type.icon;
          return (
            <Button
              key={type.id}
              variant="outline"
              size="sm"
              onClick={() => onSelect(type.id)}
              className={cn(
                "flex-col h-auto py-3 px-1",
                selected === type.id &&
                  "border-primary bg-primary/10 text-primary"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{type.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
