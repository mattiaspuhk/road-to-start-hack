import { Calendar, CheckCircle } from "lucide-react";
import type { TimelineStep } from "@/lib/opportunity-detail-types";

interface InvestmentTimelineSectionProps {
  timeline: TimelineStep[];
}

export function InvestmentTimelineSection({
  timeline,
}: InvestmentTimelineSectionProps) {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <Calendar className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-serif text-foreground">
          Investment Timeline
        </h2>
      </div>

      <div className="relative mb-12">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
        <div className="relative flex justify-between">
          {timeline.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-3 ${
                  step.active
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-background border-border text-muted-foreground"
                }`}
              >
                {step.active && <CheckCircle className="w-4 h-4" />}
              </div>
              <span className="text-sm font-medium text-foreground">
                {step.label}
              </span>
              <span className="text-xs text-muted-foreground">{step.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
