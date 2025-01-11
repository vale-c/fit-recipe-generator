import { Metadata } from "next";
import { AboutContent } from "@/components/about-content";

export const metadata: Metadata = {
  title: "About AI Fitness Recipe Generator",
  description:
    "Learn about our AI-powered fitness recipe generator and how to use it effectively.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AboutContent />
    </div>
  );
}
