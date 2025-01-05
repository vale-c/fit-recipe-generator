import Header from "@/components/header";
import RecipeGenerator from "@/components/recipe-generator";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <RecipeGenerator />
        </div>
      </main>
      <Footer />
    </div>
  );
}
