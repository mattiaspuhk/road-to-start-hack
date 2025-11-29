import { Sparkles } from "lucide-react";

interface HowItWorksSectionProps {
  points: string[];
}

export function HowItWorksSection({ points }: HowItWorksSectionProps) {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-serif text-foreground">
          How it works (in simple terms)
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {points.map((point, i) => (
          <div
            key={i}
            className="relative p-6 bg-muted/50 rounded-2xl border border-border"
          >
            <span className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              {i + 1}
            </span>
            <p className="text-muted-foreground mt-2">{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
