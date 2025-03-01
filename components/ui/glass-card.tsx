import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface GlassCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function GlassCard({
  children,
  title,
  className,
  ...props
}: GlassCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border border-border/40 backdrop-blur-sm bg-card/50 shadow-xl",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      {title && (
        <CardHeader className="relative">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn("relative", !title && "pt-6")}>
        {children}
      </CardContent>
    </Card>
  );
}
