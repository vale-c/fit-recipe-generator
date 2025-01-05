import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="py-6 px-4 border-t border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Built with AI for fitness enthusiasts.
        </p>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Button variant="link" asChild>
                <Link href="/about">About</Link>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <Link href="/contact">Contact</Link>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <Link href="/privacy">Privacy</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
