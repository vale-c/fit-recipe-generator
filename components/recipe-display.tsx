import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Mock data for demonstration
const recipes = [
  {
    name: "High-Protein Omelette",
    macros: { protein: 28, carbs: 10, fats: 15, calories: 280 },
    ingredients: [
      { name: "Eggs", quantity: 3 },
      { name: "Spinach", quantity: 30 },
      { name: "Feta cheese", quantity: 30 },
    ],
    steps: [
      "Whisk eggs in a bowl",
      "Sauté spinach in a pan",
      "Pour eggs over spinach",
      "Add crumbled feta cheese",
      "Cook until set and fold",
    ],
  },
  // Add more mock recipes here
];

export default function RecipeDisplay() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Recipe Suggestions</h2>
      {recipes.map((recipe, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <CardTitle>{recipe.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Protein</TableHead>
                  <TableHead>Carbs</TableHead>
                  <TableHead>Fats</TableHead>
                  <TableHead>Calories</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{recipe.macros.protein}g</TableCell>
                  <TableCell>{recipe.macros.carbs}g</TableCell>
                  <TableCell>{recipe.macros.fats}g</TableCell>
                  <TableCell>{recipe.macros.calories}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Ingredients:</h4>
              <ul className="list-disc list-inside">
                {recipe.ingredients.map((ingredient, idx) => (
                  <li key={idx}>
                    {ingredient.name}: {ingredient.quantity}g
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Steps:</h4>
              <ol className="list-decimal list-inside">
                {recipe.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
            <Button className="mt-4" variant="secondary">
              View Full Recipe
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
