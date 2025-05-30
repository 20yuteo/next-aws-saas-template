import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

export default function FeatureCard({ 
  title, 
  description, 
  icon,
  className 
}: FeatureCardProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-md",
      className
    )}>
      <div className="flex items-center gap-4 mb-3">
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-medium">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}