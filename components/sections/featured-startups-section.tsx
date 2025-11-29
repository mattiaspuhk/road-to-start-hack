"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight, Users } from "lucide-react";
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
      <div className="py-16 md:py-20 relative">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-2">
              Live on the Platform
            </h2>
            <p className="text-muted-foreground text-sm">
              Opportunities currently raising
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={onExplore}
            className="text-primary hover:text-primary/80 group"
          >
            View all
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Editorial Magazine Layout */}
        <div className="space-y-20">
          {featuredStartups.map((startup, index) => (
            <ScrollReveal
              key={startup.name}
              delay={index * 150}
              animation="fade-up"
            >
              <div
                className={`group cursor-pointer relative ${
                  index % 2 === 1 ? "md:ml-auto md:mr-0" : ""
                }`}
                onClick={() => handleStartupClick("1")}
                style={{ maxWidth: "900px" }}
              >
                {/* Large number background */}
                <div
                  className={`absolute -top-8 ${
                    index % 2 === 0
                      ? "-left-4 md:-left-8"
                      : "-right-4 md:-right-8"
                  } text-[120px] md:text-[180px] font-serif font-bold text-primary/[0.06] select-none pointer-events-none leading-none`}
                >
                  0{index + 1}
                </div>

                <div
                  className={`relative flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-6 md:gap-10`}
                >
                  {/* Image with frame effect */}
                  <div className="relative shrink-0 w-full md:w-auto">
                    <div
                      className={`absolute inset-0 ${
                        startup.color === "primary"
                          ? "bg-primary/20"
                          : "bg-success/20"
                      } rounded-2xl transform ${
                        index % 2 === 0
                          ? "rotate-3 translate-x-2 translate-y-2"
                          : "-rotate-3 -translate-x-2 translate-y-2"
                      } transition-transform group-hover:rotate-0 group-hover:translate-x-0 group-hover:translate-y-0`}
                    />
                    <div className="relative overflow-hidden rounded-2xl">
                      {/* Sector overlay */}
                      <div
                        className={`absolute top-4 ${
                          index % 2 === 0 ? "left-4" : "right-4"
                        } px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md ${
                          startup.color === "primary"
                            ? "bg-primary/80 text-primary-foreground"
                            : "bg-success/80 text-success-foreground"
                        }`}
                      >
                        {startup.sector}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? "md:text-left" : "md:text-right"
                    }`}
                  >
                    <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-3 group-hover:text-primary transition-colors">
                      {startup.name}
                    </h3>

                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 max-w-lg">
                      {startup.description}
                    </p>

                    {/* Stats inline */}
                    <div
                      className={`flex items-center gap-8 mb-6 ${
                        index % 2 === 1 ? "md:justify-end" : ""
                      }`}
                    >
                      {startup.stats.map((stat, i) => (
                        <div
                          key={stat.label}
                          className={`relative ${
                            i > 0
                              ? "pl-8 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-px before:h-8 before:bg-border"
                              : ""
                          }`}
                        >
                          <div className="text-2xl md:text-3xl font-serif gradient-text">
                            {stat.value}
                          </div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wider">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Founders */}
                    <div
                      className={`flex items-center gap-3 text-sm ${
                        index % 2 === 1 ? "md:justify-end" : ""
                      }`}
                    >
                      <div className="flex -space-x-2">
                        <div
                          className={`w-8 h-8 rounded-full ${
                            startup.color === "primary"
                              ? "bg-primary/20"
                              : "bg-success/20"
                          } flex items-center justify-center ring-2 ring-background`}
                        >
                          <Users className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                      <span className="text-muted-foreground">
                        {startup.founders}
                      </span>
                    </div>

                    {/* CTA */}
                    <div
                      className={`mt-6 ${
                        index % 2 === 1 ? "md:text-right" : ""
                      }`}
                    >
                      <span
                        className={`inline-flex items-center gap-2 text-sm font-medium ${
                          startup.color === "primary"
                            ? "text-primary"
                            : "text-success"
                        } group-hover:gap-3 transition-all`}
                      >
                        Explore opportunity
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
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
