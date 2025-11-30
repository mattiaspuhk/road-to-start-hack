"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight } from "lucide-react";
import { featuredStartups } from "@/lib/constants";

interface FeaturedStartupsSectionProps {
  onExplore: () => void;
  onStartupClick?: (id: string) => void;
}

export const FeaturedStartupsSection = ({
  onExplore,
  onStartupClick,
}: FeaturedStartupsSectionProps) => {
  const router = useRouter();

  const handleStartupClick = (id: string) => {
    if (onStartupClick) {
      onStartupClick(id);
    } else {
      router.push(`/opportunity/${id}`);
    }
  };

  return (
    <ScrollReveal>
      <div className="py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-foreground mb-1">
              Live on the Platform
            </h2>
            <p className="text-muted-foreground text-sm">
              Opportunities currently raising
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={onExplore}
            className="text-primary hover:text-primary/80 group text-sm"
          >
            View all
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredStartups.map((startup, index) => (
            <ScrollReveal
              key={startup.name}
              delay={index * 100}
              animation="fade-up"
            >
              <div
                className="group cursor-pointer bg-card border border-border/50 rounded-lg overflow-hidden hover:border-border transition-colors"
                onClick={() => handleStartupClick("1")}
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={startup.image}
                    alt={startup.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-background/90 text-foreground backdrop-blur-sm">
                      {startup.sector}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                    {startup.name}
                  </h3>

                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {startup.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm">
                    {startup.stats.slice(0, 2).map((stat) => (
                      <div key={stat.label}>
                        <span className="font-medium text-foreground">
                          {stat.value}
                        </span>
                        <span className="text-muted-foreground ml-1 text-xs">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};
