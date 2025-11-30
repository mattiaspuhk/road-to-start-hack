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
    const params = new URLSearchParams();

    // Map industry filter value to sector name
    if (industry !== "all") {
      const sectorMap: Record<string, string> = {
        healthtech: "HealthTech",
        fintech: "FinTech",
        cleantech: "CleanTech",
        deeptech: "DeepTech",
        agritech: "AgriTech",
        edtech: "EdTech",
        logistics: "Logistics",
      };
      if (sectorMap[industry]) {
        params.set("sector", sectorMap[industry]);
      }
    }

    // Map country filter value to location name
    if (country !== "all") {
      const locationMap: Record<string, string> = {
        germany: "Germany",
        france: "France",
        netherlands: "Netherlands",
        sweden: "Sweden",
        spain: "Spain",
        italy: "Italy",
        portugal: "Portugal",
        austria: "Austria",
        belgium: "Belgium",
      };
      if (locationMap[country]) {
        params.set("location", locationMap[country]);
      }
    }

    const queryString = params.toString();
    router.push(`/opportunities${queryString ? `?${queryString}` : ""}`);
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
