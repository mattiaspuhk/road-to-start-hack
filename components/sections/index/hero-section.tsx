"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight, Sparkles } from "lucide-react";
import { industries, countries } from "@/lib/constants";

interface HeroSectionProps {
  industry: string;
  country: string;
  setIndustry: (value: string) => void;
  setCountry: (value: string) => void;
  onExplore: () => void;
}

export const HeroSection = ({
  industry,
  country,
  setIndustry,
  setCountry,
  onExplore,
}: HeroSectionProps) => {
  return (
    <div className="pt-20 pb-16 md:pt-32 md:pb-24 relative">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <ScrollReveal animation="fade-in" delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-accent/10">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">
              Regulated by BaFin • EU Domiciled
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={100}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground mb-6">
            Invest in Europe&apos;s
            <span className="block gradient-text">Next Generation</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal animation="fade-in" delay={200}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Access institutional-grade startup investments through Digital
            Shares. Start with as little as €100.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal animation="scale" delay={300}>
        <div className="max-w-3xl mx-auto px-4">
          <div className="glass-card rounded-2xl md:rounded-full p-3 md:p-2 shadow-xl shadow-primary/5 border border-border/50">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2">
              <div className="flex-1 w-full md:w-auto">
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger className="h-14 md:h-14 border-0 bg-transparent shadow-none text-base font-medium pl-4 md:pl-5 pr-4 focus:ring-0 focus:ring-offset-0 min-h-[44px]">
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-muted-foreground text-sm hidden md:inline">
                        Industry:
                      </span>
                      <SelectValue
                        placeholder="All Industries"
                        className="text-left"
                      />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((ind) => (
                      <SelectItem key={ind.value} value={ind.value}>
                        {ind.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="hidden md:block w-px h-8 bg-border" />

              <div className="flex-1 w-full md:w-auto">
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="h-14 md:h-14 border-0 bg-transparent shadow-none text-base font-medium pl-4 md:pl-5 pr-4 focus:ring-0 focus:ring-offset-0 min-h-[44px]">
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-muted-foreground text-sm hidden md:inline">
                        Market:
                      </span>
                      <SelectValue
                        placeholder="All of Europe"
                        className="text-left"
                      />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={onExplore}
                size="lg"
                className="w-full md:w-auto rounded-full px-6 md:px-8 h-14 md:h-14 min-h-[44px] group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-base font-medium"
              >
                <span className="md:inline">Explore</span>
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <p className="text-center text-xs md:text-sm text-muted-foreground mt-4 px-2">
            No account required to browse • Invest when you&apos;re ready
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
};
