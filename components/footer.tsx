import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-8 py-4">
      <Separator />
      <div className="py-4 text-center text-sm text-muted-foreground">
        <p>
          Built with ❤️ by{" "}
          <Link
            href="https://valentinacalabrese.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          >
            Vale
          </Link>{" "}
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
