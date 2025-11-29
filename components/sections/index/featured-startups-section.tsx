"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
                  } items-stretch gap-0 md:gap-0`}
                >
                  {/* Image with frame effect */}
                  <div className="relative shrink-0 w-full md:w-[500px]">
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
                    <div
                      className={`relative overflow-hidden rounded-2xl shadow-xl border border-border/50 bg-card ${
                        index % 2 === 0
                          ? "md:rounded-r-none md:rounded-l-2xl"
                          : "md:rounded-l-none md:rounded-r-2xl"
                      }`}
                    >
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={startup.image}
                          alt={startup.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 500px"
                        />
                        {/* Gradient overlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${
                            startup.color === "primary"
                              ? "from-primary/40 via-primary/10 to-transparent"
                              : "from-success/40 via-success/10 to-transparent"
                          } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        />
                      </div>
                      {/* Sector overlay */}
                      <div
                        className={`absolute top-4 ${
                          index % 2 === 0 ? "left-4" : "right-4"
                        } px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg z-10 ${
                          startup.color === "primary"
                            ? "bg-primary/90 text-primary-foreground"
                            : "bg-success/90 text-success-foreground"
                        }`}
                      >
                        {startup.sector}
                      </div>
                    </div>
                  </div>

                  {/* Content Card - same height as image */}
                  <div
                    className={`flex-1 bg-card/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-border/50 shadow-sm group-hover:shadow-md transition-all duration-300 flex flex-col justify-center md:h-full ${
                      index % 2 === 0
                        ? "md:rounded-l-none md:rounded-r-2xl md:border-l-0"
                        : "md:rounded-r-none md:rounded-l-2xl md:border-r-0"
                    } ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}
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
                      className={`flex items-center gap-3 text-sm mb-6 ${
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
                      className={`${index % 2 === 1 ? "md:text-right" : ""}`}
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
