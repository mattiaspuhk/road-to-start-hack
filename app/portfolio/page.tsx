"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { mockOpportunities } from "@/lib/opportunities";
import {
  PortfolioHeroSection,
  HoldingsSection,
  CompanyUpdatesSection,
  PortfolioPerformanceCard,
  AllocationChart,
} from "@/components/sections/portfolio";

// Mock portfolio data - in real app this would come from a database/API
const mockPortfolioHoldings = [
  {
    opportunityId: "1",
    sharesOwned: 150,
    purchasePrice: 10.5,
    purchaseDate: "2024-06-15",
  },
  {
    opportunityId: "2",
    sharesOwned: 80,
    purchasePrice: 17.2,
    purchaseDate: "2024-08-22",
  },
  {
    opportunityId: "3",
    sharesOwned: 200,
    purchasePrice: 7.8,
    purchaseDate: "2024-09-10",
  },
];

// Mock news feed data
const mockNewsFeed = [
  {
    id: "1",
    companyId: "1",
    companyName: "SkyMed Delivery",
    title: "SkyMed Expands Drone Network to 150 Pharmacies",
    summary: "SkyMed Delivery has successfully expanded its autonomous drone delivery network to cover 150 rural pharmacies across Bavaria, marking a 20% increase from the previous quarter.",
    date: "2024-11-28",
    type: "expansion" as const,
  },
  {
    id: "2",
    companyId: "2",
    companyName: "GreenGrid Energy",
    title: "GreenGrid Secures Major Partnership with Dutch Government",
    summary: "GreenGrid Energy announced a strategic partnership with the Netherlands Ministry of Economic Affairs to deploy AI-optimized solar solutions for 500 public buildings.",
    date: "2024-11-25",
    type: "partnership" as const,
  },
  {
    id: "3",
    companyId: "3",
    companyName: "FarmSense",
    title: "FarmSense Raises Additional €2M in Bridge Round",
    summary: "FarmSense has closed a €2M bridge financing round led by Partech Partners, bringing total funding to €7M ahead of their planned Series A.",
    date: "2024-11-22",
    type: "funding" as const,
  },
  {
    id: "4",
    companyId: "1",
    companyName: "SkyMed Delivery",
    title: "SkyMed Receives European Aviation Safety Agency Certification",
    summary: "The company has received full EASA certification for beyond-visual-line-of-sight operations, enabling nationwide drone delivery services.",
    date: "2024-11-18",
    type: "milestone" as const,
  },
  {
    id: "5",
    companyId: "2",
    companyName: "GreenGrid Energy",
    title: "GreenGrid Reports 45% Revenue Growth in Q3",
    summary: "Strong quarter for GreenGrid with installation capacity reaching 15MW and customer satisfaction scores exceeding 95%.",
    date: "2024-11-15",
    type: "financial" as const,
  },
];

export default function PortfolioPage() {
  // Transform holdings with opportunity data
  const holdingsWithData = mockPortfolioHoldings.map((holding) => {
    const opportunity = mockOpportunities.find(
      (opp) => opp.id === holding.opportunityId
    );
    if (!opportunity) return null;

    const currentValue = holding.sharesOwned * opportunity.sharePrice;
    const costBasis = holding.sharesOwned * holding.purchasePrice;
    const gain = currentValue - costBasis;
    const gainPercent = ((gain / costBasis) * 100).toFixed(2);

    return {
      ...holding,
      opportunity,
      currentValue,
      costBasis,
      gain,
      gainPercent,
    };
  }).filter(Boolean);

  // Calculate portfolio totals
  const totalValue = holdingsWithData.reduce(
    (sum, h) => sum + (h?.currentValue || 0),
    0
  );
  const totalCostBasis = holdingsWithData.reduce(
    (sum, h) => sum + (h?.costBasis || 0),
    0
  );
  const totalGain = totalValue - totalCostBasis;
  const totalGainPercent = ((totalGain / totalCostBasis) * 100).toFixed(2);

  // Calculate allocation by sector
  const allocationBySector = holdingsWithData.reduce((acc, h) => {
    if (!h) return acc;
    const sector = h.opportunity.sector;
    if (!acc[sector]) {
      acc[sector] = 0;
    }
    acc[sector] += h.currentValue;
    return acc;
  }, {} as Record<string, number>);

  const allocations = Object.entries(allocationBySector).map(([sector, value]) => ({
    sector,
    value,
    percentage: ((value / totalValue) * 100).toFixed(1),
  }));

  // Filter news for owned companies only
  const ownedCompanyIds = mockPortfolioHoldings.map((h) => h.opportunityId);
  const relevantNews = mockNewsFeed.filter((news) =>
    ownedCompanyIds.includes(news.companyId)
  );

  // Generate mock portfolio history (simulating value changes over time)
  const portfolioHistory = (() => {
    const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
    const baseValue = totalCostBasis;
    return months.map((date, i) => ({
      date,
      value: baseValue * (0.95 + Math.random() * 0.1 + i * 0.02),
    }));
  })();
  // Make sure last value is actual totalValue
  portfolioHistory[portfolioHistory.length - 1] = { date: "Nov", value: totalValue };

  // Find best and worst performers
  const validHoldings = holdingsWithData.filter(Boolean) as NonNullable<typeof holdingsWithData[0]>[];
  const sortedByPerformance = [...validHoldings].sort(
    (a, b) => parseFloat(b.gainPercent) - parseFloat(a.gainPercent)
  );
  const bestPerformer = sortedByPerformance[0]
    ? { name: sortedByPerformance[0].opportunity.name, gainPercent: sortedByPerformance[0].gainPercent }
    : null;
  const worstPerformer = sortedByPerformance[sortedByPerformance.length - 1]
    ? {
        name: sortedByPerformance[sortedByPerformance.length - 1].opportunity.name,
        gainPercent: sortedByPerformance[sortedByPerformance.length - 1].gainPercent,
      }
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <PortfolioHeroSection
        totalValue={totalValue}
        totalCostBasis={totalCostBasis}
        totalGain={totalGain}
        totalGainPercent={totalGainPercent}
        holdingsCount={holdingsWithData.length}
        portfolioHistory={portfolioHistory}
        allocations={allocations}
        bestPerformer={bestPerformer}
        worstPerformer={worstPerformer}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12">
          {/* Main Content Column */}
          <div className="space-y-12">
            <HoldingsSection holdings={holdingsWithData} />
            <CompanyUpdatesSection
              holdings={validHoldings.map(h => ({
                opportunityId: h.opportunityId,
                opportunity: h.opportunity,
                currentValue: h.currentValue,
                gainPercent: h.gainPercent,
              }))}
              news={relevantNews}
            />
          </div>

          {/* Sidebar Column */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <PortfolioPerformanceCard
                totalValue={totalValue}
                totalGain={totalGain}
                totalGainPercent={totalGainPercent}
              />
              <AllocationChart allocations={allocations} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
