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
        "py-2 backdrop-blur-xl bg-background/30 border-muted/20 shadow-2xl shadow-violet-500/20",
        className
      )}
      {...props}
    >
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
