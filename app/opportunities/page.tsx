"use client";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/opportunities/hero-section";
import { OpportunitiesCompaniesSection } from "@/components/sections/opportunities/opportunities-companies-section";
import { BottomMenubar } from "@/components/sections/opportunities/bottom-menubar";
import {
  mockOpportunities,
  collections,
  OpportunityFilters,
  defaultFilters,
} from "@/lib/opportunities";

const Opportunities = () => {
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [isListView, setIsListView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<OpportunityFilters>(defaultFilters);

  const hasActiveFilters = Object.values(filters).some((v) => v !== null);

  const filteredOpportunities = mockOpportunities.filter((opp) => {
    if (activeCollection) {
      const collection = collections.find((c) => c.id === activeCollection);
      if (!collection?.sectors.includes(opp.sector)) {
        return false;
      }
    }

    // Apply filters
    if (filters.location && opp.location !== filters.location) return false;
    if (filters.sector && opp.sector !== filters.sector) return false;
    if (filters.vertical && opp.vertical !== filters.vertical) return false;
    if (filters.foundingYear && opp.foundingYear !== filters.foundingYear) return false;
    if (filters.stage && opp.stage !== filters.stage) return false;
    if (filters.sharesAvailableMin && opp.sharesAvailablePercent < filters.sharesAvailableMin) return false;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        opp.name.toLowerCase().includes(query) ||
        opp.tagline.toLowerCase().includes(query) ||
        opp.sector.toLowerCase().includes(query) ||
        opp.location.toLowerCase().includes(query) ||
        opp.businessHook?.toLowerCase().includes(query) ||
        opp.founderName?.toLowerCase().includes(query) ||
        opp.leadInvestor?.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const featuredOpportunity = mockOpportunities[0];
  const dossierOpportunities =
    activeCollection || searchQuery || hasActiveFilters
      ? filteredOpportunities
      : mockOpportunities.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {!activeCollection && !searchQuery && !hasActiveFilters && (
          <HeroSection opportunity={featuredOpportunity} />
        )}

        <OpportunitiesCompaniesSection
          opportunities={dossierOpportunities}
          activeCollection={activeCollection}
          setActiveCollection={setActiveCollection}
          isListView={isListView}
        />
      </main>

      <Footer />

      <BottomMenubar
        activeCollection={activeCollection}
        setActiveCollection={setActiveCollection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onListViewToggle={() => setIsListView(!isListView)}
        isListView={isListView}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default Opportunities;
