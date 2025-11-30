"use client";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Shield, TrendingUp, Users } from "lucide-react";

export const ValuePropsSection = () => {
  return (
    <div className="py-16 md:py-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary/5 via-accent/5 to-success/5 rounded-full blur-3xl opacity-50" />

      <div className="relative">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Why Choose <span className="gradient-text">Verdant</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built for the modern investor who values transparency, security,
              and long-term growth
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <ScrollReveal delay={0} animation="fade-up">
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative h-full glass-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative">
                  <div
                    className="absolute inset-0 rounded-2xl bg-primary/10 animate-ping opacity-0 group-hover:opacity-75"
                    style={{ animationDuration: "2s" }}
                  />
                  <Shield className="w-8 h-8 text-primary relative z-10" />
                </div>

                <h3 className="font-serif text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  Regulatory Clarity
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every opportunity is EU-domiciled with full BaFin oversight.
                  Smart contracts audited by leading security firms.
                </p>

                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex items-center gap-2 text-xs text-primary font-medium">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    Fully Compliant
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150} animation="fade-up">
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative h-full glass-card rounded-2xl p-8 border border-border hover:border-accent/30 transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent/50 to-transparent" />

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative">
                  <div
                    className="absolute inset-0 rounded-2xl bg-accent/10 animate-ping opacity-0 group-hover:opacity-75"
                    style={{ animationDuration: "2s" }}
                  />
                  <TrendingUp className="w-8 h-8 text-accent relative z-10" />
                </div>

                <h3 className="font-serif text-2xl text-foreground mb-3 group-hover:text-accent transition-colors">
                  Long-Term Ownership
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Think like an owner, not a trader. Plant seeds today for 5-7
                  year growth horizons with real equity.
                </p>

                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex items-center gap-2 text-xs text-accent font-medium">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    5-7 Year Horizon
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300} animation="fade-up">
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-success/20 to-success/5 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative h-full glass-card rounded-2xl p-8 border border-border hover:border-success/30 transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success via-success/50 to-transparent" />

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative">
                  <div
                    className="absolute inset-0 rounded-2xl bg-success/10 animate-ping opacity-0 group-hover:opacity-75"
                    style={{ animationDuration: "2s" }}
                  />
                  <Users className="w-8 h-8 text-success relative z-10" />
                </div>

                <h3 className="font-serif text-2xl text-foreground mb-3 group-hover:text-success transition-colors">
                  Aligned Incentives
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Co-invest alongside top European VCs. Same terms, same upside
                  potential, same commitment.
                </p>

                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex items-center gap-2 text-xs text-success font-medium">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    VC-Backed Deals
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};
