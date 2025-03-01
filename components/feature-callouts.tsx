"use client";

import { Card, CardContent } from "./ui/card";
import { Database, Salad, Clock, RefreshCw } from "lucide-react";

export function FeatureCallouts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 mb-12">
      <FeatureCard
        icon={<Database className="h-5 w-5 text-blue-500" />}
        title="Macro Optimized"
        description="Precise protein, carbs, and fats to match your fitness goals"
      />
      <FeatureCard
        icon={<Salad className="h-5 w-5 text-green-500" />}
        title="Nutrient Dense"
        description="Packed with superfoods for optimal health and performance"
      />
      <FeatureCard
        icon={<Clock className="h-5 w-5 text-amber-500" />}
        title="Quick & Simple"
        description="Easy-to-follow recipes for busy fitness enthusiasts"
      />
      <FeatureCard
        icon={<RefreshCw className="h-5 w-5 text-purple-500" />}
        title="Adaptable"
        description="Works with your ingredients and dietary restrictions"
      />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-border/40 hover:border-primary/40 transition-colors duration-300">
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="rounded-full bg-muted/50 p-3 mb-3">{icon}</div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
