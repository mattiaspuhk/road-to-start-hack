import type { TractionItem } from "@/lib/opportunity-detail-types";

interface TractionSectionProps {
  items: TractionItem[];
}

export function TractionSection({ items }: TractionSectionProps) {
  return (
    <section className="mb-20">
      <h2 className="text-2xl font-serif text-foreground mb-8">
        Traction & Metrics
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div
            key={i}
            className="p-6 bg-gradient-to-br from-muted/80 to-muted/30 rounded-2xl border border-border text-center"
          >
            <div className="text-3xl md:text-4xl font-mono text-foreground mb-2">
              {item.value}
            </div>
            <div className="text-sm text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
