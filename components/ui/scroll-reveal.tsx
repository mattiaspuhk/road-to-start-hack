"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade-up" | "fade-in" | "scale" | "slide-left" | "slide-right";
}

export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  animation = "fade-up",
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollAnimation();

  const animationClasses = {
    "fade-up": "translate-y-8 opacity-0",
    "fade-in": "opacity-0",
    scale: "scale-95 opacity-0",
    "slide-left": "-translate-x-8 opacity-0",
    "slide-right": "translate-x-8 opacity-0",
  };

  const visibleClasses = "translate-y-0 translate-x-0 scale-100 opacity-100";

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isVisible ? visibleClasses : animationClasses[animation]
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
