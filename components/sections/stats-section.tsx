"use client";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { stats } from "@/lib/constants";

export const StatsSection = () => {
  return (
    <ScrollReveal>
      <div className="py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

        <div className="relative">
          <p className="text-center text-sm text-muted-foreground uppercase tracking-widest mb-10">
            Trusted by investors across Europe
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <ScrollReveal
                key={stat.label}
                delay={index * 100}
                animation="fade-up"
              >
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative glass-card rounded-2xl p-8 text-center border border-border hover:border-primary/30 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="text-4xl md:text-5xl font-serif gradient-text mb-2 group-hover:scale-105 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-1/2 transition-all duration-300" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};
