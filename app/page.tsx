import { RecipeGenerator } from "@/components/recipe-generator";
import { FeatureCallouts } from "@/components/feature-callouts";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <FeatureCallouts />
          <RecipeGenerator />
        </div>
      </main>
    </div>
  );
}
