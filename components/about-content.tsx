import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChefHat, Dumbbell, Zap, Lightbulb, Heart } from "lucide-react";
import Link from "next/link";
import { GradientText } from "./ui/gradient-text";

export default function AboutContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          <GradientText>About AI Fitness Recipe Generator</GradientText>
        </h1>
        <p className="text-xl text-muted-foreground">
          Empowering your fitness journey with delicious, nutrient-packed meals
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
          <CardDescription>
            Revolutionizing fitness nutrition through AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            At AI Fitness Recipe Generator, we believe that achieving your
            fitness goals shouldn't mean sacrificing flavor or spending hours in
            the kitchen. Our mission is to empower fitness enthusiasts,
            athletes, and health-conscious individuals with an AI-powered tool
            that creates delicious, nutrient-dense recipes tailored to their
            specific needs and preferences.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Key Features</TabsTrigger>
          <TabsTrigger value="how-to-use">How to Use</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
        </TabsList>
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <ul className="space-y-4">
                  <FeatureItem
                    icon={<ChefHat className="h-5 w-5" />}
                    title="AI-Powered Recipe Generation"
                    description="Our advanced AI creates unique, tasty recipes based on your ingredients and preferences."
                  />
                  <FeatureItem
                    icon={<Dumbbell className="h-5 w-5" />}
                    title="Macro-Nutrient Focused"
                    description="Each recipe comes with detailed macro information to support your fitness goals."
                  />
                  <FeatureItem
                    icon={<Zap className="h-5 w-5" />}
                    title="Quick and Easy"
                    description="Generate recipes in seconds, saving you time and effort in meal planning."
                  />
                  <FeatureItem
                    icon={<Lightbulb className="h-5 w-5" />}
                    title="Customizable Options"
                    description="Tailor recipes to your dietary preferences, restrictions, or fitness objectives."
                  />
                  <FeatureItem
                    icon={<Heart className="h-5 w-5" />}
                    title="Health-Optimized"
                    description="Recipes prioritize nutrient-dense superfoods for optimal health and fitness."
                  />
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="how-to-use">
          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <ol className="space-y-4 list-decimal list-inside">
                  <li className="font-semibold">
                    Enter Your Ingredients or Preferences
                    <p className="ml-6 text-muted-foreground">
                      Type in the ingredients you have on hand or specify your
                      dietary preferences (e.g., "high-protein vegetarian meal"
                      or "low-carb dinner with chicken").
                    </p>
                  </li>
                  <li className="font-semibold">
                    Click "Generate"
                    <p className="ml-6 text-muted-foreground">
                      Our AI will process your input and create a custom recipe
                      tailored to your needs.
                    </p>
                  </li>
                  <li className="font-semibold">
                    Review Your Recipe
                    <p className="ml-6 text-muted-foreground">
                      Examine the generated recipe, including ingredients,
                      instructions, and macro-nutrient information.
                    </p>
                  </li>
                  <li className="font-semibold">
                    Customize If Needed
                    <p className="ml-6 text-muted-foreground">
                      If you want to adjust the recipe, simply modify your input
                      and generate a new version.
                    </p>
                  </li>
                  <li className="font-semibold">
                    Cook and Enjoy
                    <p className="ml-6 text-muted-foreground">
                      Follow the recipe instructions to prepare your delicious,
                      fitness-friendly meal!
                    </p>
                  </li>
                </ol>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="benefits">
          <Card>
            <CardHeader>
              <CardTitle>Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <ul className="space-y-4">
                  <BenefitItem
                    title="Time-Saving"
                    description="Quickly generate recipes without spending hours searching cookbooks or websites."
                  />
                  <BenefitItem
                    title="Nutritionally Balanced"
                    description="Each recipe is designed to support your fitness goals with optimal macro-nutrient ratios."
                  />
                  <BenefitItem
                    title="Reduce Food Waste"
                    description="Use ingredients you already have to create delicious meals and minimize waste."
                  />
                  <BenefitItem
                    title="Expand Your Culinary Skills"
                    description="Discover new recipe ideas and cooking techniques to broaden your culinary horizons."
                  />
                  <BenefitItem
                    title="Personalized Nutrition"
                    description="Tailor recipes to your specific dietary needs, preferences, and fitness objectives."
                  />
                  <BenefitItem
                    title="Consistency in Your Fitness Journey"
                    description="Easily maintain a consistent, healthy diet that aligns with your workout routine."
                  />
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Ready to Get Started?</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-muted-foreground">
            Experience the power of AI-generated fitness recipes and transform
            your meal planning today!
          </p>
          <Button asChild>
            <Link href="/">Try It Now</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <li className="flex items-start space-x-3">
      <div className="flex-shrink-0 w-5 h-5 mt-1 text-primary">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </li>
  );
}

function BenefitItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <li className="space-y-1">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </li>
  );
}
