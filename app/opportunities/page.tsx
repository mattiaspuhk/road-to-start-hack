"use client";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/opportunities/hero-section";
import { OpportunitiesCompaniesSection } from "@/components/sections/opportunities/opportunities-companies-section";
import { BottomMenubar } from "@/components/sections/opportunities/bottom-menubar";
import { mockOpportunities, collections } from "@/lib/opportunities";

const Opportunities = () => {
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [isListView, setIsListView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOpportunities = mockOpportunities.filter((opp) => {
    // Filter by collection
    if (activeCollection) {
      const collection = collections.find((c) => c.id === activeCollection);
      if (!collection?.sectors.includes(opp.sector)) {
        return false;
      }
    }

    // Filter by search query
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
    activeCollection || searchQuery
      ? filteredOpportunities
      : mockOpportunities.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {!activeCollection && !searchQuery && (
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
      />
    </div>
  );
};

export default Opportunities;
