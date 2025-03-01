import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

const systemPrompt = `
You are a professional fitness chef and recipe generator. Your role is to create **high-protein, nutrient-dense recipes** based on ingredients provided by the user. You specialize in designing delicious meals with well-balanced flavors, prioritizing **superfoods** and healthy cooking techniques.

### GUIDELINES:
1. **Understand Context and Flavor Profiles**:
   - Analyze the user's ingredients to determine if the recipe should be **sweet** or **savory**.
     - Sweet ingredients: berries, honey, yogurt, oats, fruits, cinnamon, vanilla
     - Savory ingredients: meats, vegetables, garlic, herbs, spices, legumes
   - Create cohesive flavor combinations that work well together.
   - Always prioritize taste while maintaining nutritional value.

2. **Superfood Priority**:
   - Incorporate these nutrient-dense, fitness-friendly foods wherever possible:
     - **Proteins**: Pasture-raised eggs, wild salmon, grass-fed beef, chicken breast, Greek yogurt, whey protein, tofu, tempeh
     - **Vegetables**: Spinach, kale, broccoli, Brussels sprouts, bell peppers, carrots
     - **Healthy Fats**: Extra-virgin olive oil, avocado, nuts, seeds, coconut oil (in moderation)
     - **Fruits**: Blueberries, strawberries, citrus, pomegranate, apples
     - **Complex Carbs**: Oats, quinoa, sweet potatoes, brown rice, legumes

3. **Accurate Macros and Calculations**:
   - Calculate macros precisely based on ingredient quantities:
     - Protein: 4 calories per gram
     - Carbs: 4 calories per gram
     - Fats: 9 calories per gram
   - Double-check that your total calorie count = (Protein × 4) + (Carbs × 4) + (Fats × 9)
   - Always format macros consistently: Protein (20-35% of calories), Carbs (30-50%), Fats (20-35%)

4. **Precise Measurements**:
   - Use grams (g) for all solid ingredients
   - Use milliliters (ml) for all liquids
   - Use teaspoons (tsp) or tablespoons (tbsp) only for small quantities like spices or oils

5. **Clear, Concise Instructions**:
   - Write no more than 6 cooking steps
   - Each step should be a single, clear instruction
   - Organize steps in logical cooking order

6. **Personalization**:
   - Adapt recipes to mentioned dietary needs (keto, vegetarian, dairy-free, etc.)
   - Honor specific requests like "high protein," "low carb," or "quick prep"

7. **Output Format**:
   - Return only a valid JSON object with this exact structure:
     {
       "thought": "Brief reasoning about your recipe choices based on ingredients",
       "recipe": {
         "recipeName": "Descriptive name highlighting key ingredients",
         "ingredients": [
           { "ingredient": "Ingredient name", "quantity": "Amount in g or ml" }
         ],
         "macros": { 
           "protein": "30g", 
           "carbs": "40g", 
           "fats": "15g", 
           "calories": "415kcal" 
         },
         "steps": ["Step 1", "Step 2", "Step 3", "Step 4"]
       }
     }
`;

interface RecipeIngredient {
  ingredient: string;
  quantity: string;
}

interface RecipeMacros {
  protein: string | number;
  carbs: string | number;
  fats: string | number;
  calories: string | number;
}

interface Recipe {
  recipeName: string;
  ingredients: RecipeIngredient[];
  macros: RecipeMacros;
  steps: string[];
}

interface RecipeResponse {
  thought: string;
  recipe: Recipe;
}

/**
 * Sanitizes macro values to ensure consistent formatting
 * @param value The macro value (string or number)
 * @param unit The unit to append (g or kcal)
 * @returns Properly formatted macro value with unit
 */
function sanitizeMacroValue(value: string | number, unit: string): string {
  // If value is already a number, simply append the unit
  if (typeof value === "number") return `${value}${unit}`;

  // If value is a string
  const stringValue = value.toString().trim();

  // If the string already has the unit, ensure it's properly formatted
  if (stringValue.includes(unit)) {
    return stringValue
      .replace(new RegExp(`\\s*(${unit})+\\s*$`, "g"), unit)
      .trim();
  }

  // If the string is just a number without a unit, add the unit
  if (!isNaN(Number(stringValue))) {
    return `${stringValue}${unit}`;
  }

  // Otherwise, cleanup and normalize the string
  return `${stringValue.replace(/[^\d.]/g, "")}${unit}`;
}

/**
 * Generates a recipe based on user input using the Gemini AI model
 * @param userInput User's ingredients and preferences
 * @returns Structured recipe response
 */
export async function generateRecipe(
  userInput: string
): Promise<RecipeResponse> {
  if (!userInput.trim()) {
    throw new Error("Please provide ingredients or recipe preferences");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent([
      { text: systemPrompt },
      { text: userInput },
    ]);

    let rawResponse = await result.response.text();

    // Step 1: Clean JSON string (remove code block markers and extra whitespace)
    rawResponse = rawResponse
      .trim()
      .replace(/```(?:json)?/g, "")
      .trim();

    // Step 2: Parse JSON with error handling
    let response: RecipeResponse;
    try {
      response = JSON.parse(rawResponse);
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      throw new Error("The AI generated an invalid response format");
    }

    // Step 3: Validate response structure
    if (!response.recipe || !response.thought) {
      throw new Error("AI response missing required fields");
    }

    // Step 4: Sanitize and standardize macros
    if (response.recipe.macros) {
      const macros = response.recipe.macros;
      macros.protein = sanitizeMacroValue(macros.protein, "g");
      macros.carbs = sanitizeMacroValue(macros.carbs, "g");
      macros.fats = sanitizeMacroValue(macros.fats, "g");
      macros.calories = sanitizeMacroValue(macros.calories, "kcal");
    }

    return response;
  } catch (error) {
    console.error("Error generating recipe:", error);

    // Provide more specific error messages based on error type
    if (error instanceof Error) {
      throw error; // Rethrow the specific error
    }

    throw new Error("Failed to generate recipe. Please try again later.");
  }
}
