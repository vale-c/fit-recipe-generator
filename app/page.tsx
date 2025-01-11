import { RecipeGenerator } from "@/components/recipe-generator";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <RecipeGenerator />
        </div>
      </main>
    </div>
  );
}
