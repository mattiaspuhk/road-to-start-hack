"use client";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  onExplore: () => void;
}

export const CTASection = ({ onExplore }: CTASectionProps) => {
  return (
    <ScrollReveal animation="scale">
      <div className="py-16 md:py-20 relative">
        <div className="gradient-border p-[1px] rounded-3xl">
          <div className="bg-card rounded-3xl p-10 md:p-16 text-center relative overflow-hidden border border-transparent">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-3xl" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
                Ready to Build Your Portfolio?
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                Join thousands of investors backing Europe&apos;s most promising
                startups
              </p>
              <Button
                onClick={onExplore}
                size="lg"
                className="group bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                Browse All Opportunities
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};
