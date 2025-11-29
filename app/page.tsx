"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/sections/index/animated-background";
import { HeroSection } from "@/components/sections/index/hero-section";
import { StatsSection } from "@/components/sections/index/stats-section";
import { FeaturedStartupsSection } from "@/components/sections/index/featured-startups-section";
import { ValuePropsSection } from "@/components/sections/index/value-props-section";
import { CTASection } from "@/components/sections/index/cta-section";

export default function Index() {
  const router = useRouter();
  const [industry, setIndustry] = useState("all");
  const [country, setCountry] = useState("all");

  const handleExplore = () => {
    router.push("/opportunities");
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <main className="relative">
        <AnimatedBackground />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroSection
            industry={industry}
            country={country}
            setIndustry={setIndustry}
            setCountry={setCountry}
            onExplore={handleExplore}
          />
          <StatsSection />
          <FeaturedStartupsSection onExplore={handleExplore} />
          <ValuePropsSection />
          <CTASection onExplore={handleExplore} />
          <Footer />
        </div>
      </main>
    </div>
  );
}
