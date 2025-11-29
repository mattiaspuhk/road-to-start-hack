"use client";

import { useState, use, useRef } from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { mockOpportunities } from "@/lib/opportunities";
import type { OpportunityDetailData } from "@/lib/opportunity-detail-types";

import {
  HeroSection,
  StorySection,
  HowItWorksSection,
  TractionSection,
  TeamSection,
  InvestmentTimelineSection,
  AskQuestionsSection,
  FloatingInvestCTA,
  CompanyMetricsCard,
  MyPositionCard,
} from "@/components/sections/opportunity";

const companyStories: Record<string, string> = {
  "1": "In the quiet villages of rural Bavaria, elderly patients often wait days for essential medications. Dr. Maria Hoffmann witnessed this firsthand during her years at DHL—watching delivery vans struggle on narrow roads while patients went without. In 2022, she partnered with autonomous systems expert Thomas Weber to build SkyMed: a network of medical drones that bypass traffic entirely. Today, their fleet serves 127 pharmacies across Germany, delivering prescriptions in under 15 minutes. The goal isn't just faster delivery—it's ensuring no patient in rural Europe goes without the medicine they need.",
  "2": "GreenGrid Energy was born from a simple observation: small businesses across Europe were paying too much for energy while solar technology sat unused. Founder Lars van der Berg, a former energy consultant, saw that SMEs lacked the expertise to optimize their solar installations. In 2021, he built an AI platform that automatically adjusts solar panel networks based on weather, demand, and grid prices. Today, GreenGrid manages 340 installations across Benelux, reducing energy costs by an average of 40% while helping businesses achieve carbon neutrality.",
  "3": "Marie Dubois grew up on a farm in rural France, watching her family struggle with unpredictable weather and rising water costs. After studying agricultural engineering, she realized that precision sensors could transform farming. In 2020, she co-founded FarmSense to bring IoT technology to European farmers. Their sensors monitor soil moisture, nutrient levels, and crop health in real-time, reducing water usage by 35% while increasing yields. Today, FarmSense sensors cover 1,200 hectares across France, helping farmers grow more with less.",
  "4": "Thomas Weber spent years watching banks struggle with identity verification—slow processes, high costs, and privacy concerns. As a cybersecurity researcher, he knew there had to be a better way. In 2019, he founded SecureID Labs to build decentralized identity verification using blockchain technology. Their platform reduces KYC costs by 60% while giving users control over their data. Today, SecureID is integrated with Erste Bank and N26, processing thousands of verifications daily across Europe.",
  "5": "Dr. Carlos Ruiz worked in rural clinics across Andalusia for over a decade, seeing firsthand how limited resources affected patient care. When AI diagnostic tools became available, he realized they could bridge the gap between rural clinics and urban medical centers. In 2021, he founded MediBot to bring AI-powered diagnostics to underserved areas. Today, MediBot supports 45 clinics across Andalusia with 94% diagnostic accuracy, ensuring rural patients receive the same quality care as those in cities.",
  "6": "Sophie Janssen was frustrated by the mountains of cardboard boxes piling up from her online shopping. As a logistics engineer, she knew there had to be a better way. In 2020, she designed a reusable packaging system that could be returned, cleaned, and reused hundreds of times. Today, CircularPack has eliminated over 2 million single-use boxes through partnerships with Zalando and Coolblue, creating a circular economy for e-commerce packaging.",
};

function generatePriceHistory(priceHistory: number[]) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const recentPrices = priceHistory.slice(-7);
  return recentPrices.map((price, i) => ({
    month: months[i] || `Month ${i + 1}`,
    price: price,
  }));
}

function transformToDetailData(
  opp: (typeof mockOpportunities)[0]
): OpportunityDetailData {
  const valuationNum = parseInt(opp.valuation.replace(/[€M]/g, "")) * 1000000;
  const pricePerShare = opp.sharePrice;
  const totalShares = Math.floor(valuationNum / pricePerShare);

  return {
    id: opp.id,
    company: {
      name: opp.name,
      tagline: opp.tagline,
      euDomiciled: opp.euDomiciled,
      audited: opp.audited,
      leadInvestor: opp.leadInvestor || "Index Ventures",
    },
    pitch: {
      videoThumbnail: "/placeholder.svg",
      eli5Points: [
        opp.businessHook ||
          `${opp.name} solves a critical problem in ${opp.sector}`,
        `The company has proven traction with ${opp.fundingProgress}% of funding raised`,
        `With ${opp.runwayMonths} months runway, they're positioned for growth`,
      ],
      traction: [
        { label: "Active Pharmacies", value: "127" },
        { label: "Monthly Deliveries", value: "8.2k" },
        { label: "Revenue Run Rate", value: "€1.4M" },
        { label: "Patient Waitlist", value: "12k" },
      ],
    },
    analysis: {
      bullCase: [
        `Strong market position in ${opp.sector} with growing demand`,
        `Proven traction with ${opp.fundingProgress}% funding progress`,
        opp.leadInvestor
          ? `Backed by ${opp.leadInvestor}, a reputable investor`
          : "Experienced founding team",
        `EU domiciled and ${
          opp.audited ? "audited" : "transparent"
        } operations`,
      ],
      bearCase: [
        `Early stage (${opp.stage}) with limited operating history`,
        `Runway of ${opp.runwayMonths} months requires successful fundraising`,
        `Competitive landscape in ${opp.sector} may intensify`,
        opp.audited ? "" : "Limited financial transparency - not yet audited",
      ].filter(Boolean),
    },
    deal: {
      assetType: "DIGITAL SHARE",
      pricePerShare,
      currency: "€",
      valuation: opp.valuation,
      timeline: [
        { label: "Invest", date: "Today", active: true },
        { label: "Lock Period", date: "Year 1", active: false },
        { label: "Secondary Market", date: "Year 3", active: false },
        { label: "Target Exit", date: "Year 5-7", active: false },
      ],
      runwayMonths: opp.runwayMonths,
      runwayExtension: Math.floor(opp.runwayMonths * 3),
    },
    team: {
      members: [
        {
          name: opp.founderName || "Founder Name",
          role: opp.founderTitle || "CEO & Founder",
          background: `Previously at leading ${opp.sector} companies. ${
            opp.impactHeadline ||
            "Passionate about solving real-world problems."
          }`,
        },
        {
          name: "Thomas Weber",
          role: "CTO & Co-Founder",
          background: "Ex-Siemens Mobility, PhD in Autonomous Systems",
        },
        {
          name: "Lisa Chen",
          role: "COO",
          background: "Ex-McKinsey, Built ops for 3 logistics startups",
        },
        {
          name: "Prof. Klaus Richter",
          role: "Board Advisor",
          background: "Chair of Aviation Law, TU Munich",
        },
      ],
      founderOwnership: 58,
    },
    investment: {
      minInvestment: opp.minInvestment,
      maxInvestment: 10000,
      pricePerShare,
      totalShares,
      currency: "€",
    },
    priceHistory: opp.priceHistory,
  };
}

export default function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const opportunity = mockOpportunities.find((opp) => opp.id === id);

  if (!opportunity) {
    notFound();
  }

  const data = transformToDetailData(opportunity);
  const priceHistory = generatePriceHistory(data.priceHistory);

  const [question, setQuestion] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState(
    data.investment.minInvestment
  );

  // Refs for FloatingInvestCTA visibility
  const tractionRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  const currentPrice = data.deal.pricePerShare;
  const priceChange = (
    ((currentPrice - priceHistory[0].price) / priceHistory[0].price) *
    100
  ).toFixed(1);

  const sharesFromInvestment = Math.floor(
    investmentAmount / data.investment.pricePerShare
  );
  const ownershipPercentage = (
    (sharesFromInvestment / data.investment.totalShares) *
    100
  ).toFixed(4);

  const companyStory =
    companyStories[data.id] ||
    `${
      data.company.name
    } is building the future of ${data.company.tagline.toLowerCase()}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <HeroSection
        data={data}
        priceHistory={priceHistory}
        priceChange={priceChange}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12">
          {/* Main Content Column */}
          <div>
            <StorySection story={companyStory} />

            <HowItWorksSection points={data.pitch.eli5Points} />

            <div ref={tractionRef}>
              <TractionSection items={data.pitch.traction} />
            </div>

            <TeamSection
              members={data.team.members}
              founderOwnership={data.team.founderOwnership}
            />

            <InvestmentTimelineSection timeline={data.deal.timeline} />

            <AskQuestionsSection
              companyName={data.company.name}
              question={question}
              onQuestionChange={setQuestion}
            />
          </div>

          {/* Sidebar Column */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <CompanyMetricsCard
                valuation={data.deal.valuation}
                runwayMonths={data.deal.runwayMonths}
                stage={opportunity.stage}
                sector={opportunity.sector}
                totalShares={data.investment.totalShares}
              />

              <MyPositionCard
                sharesOwned={sharesFromInvestment}
                pricePerShare={data.investment.pricePerShare}
                ownershipPercentage={ownershipPercentage}
                currency={data.investment.currency}
                companyName={data.company.name}
              />
            </div>
          </div>
        </div>
      </div>

      <FloatingInvestCTA
        investmentAmount={investmentAmount}
        onInvestmentChange={setInvestmentAmount}
        ownershipPercentage={ownershipPercentage}
        sharesFromInvestment={sharesFromInvestment}
        pricePerShare={data.investment.pricePerShare}
        currency={data.investment.currency}
        minInvestment={data.investment.minInvestment}
        maxInvestment={data.investment.maxInvestment}
        triggerRef={tractionRef}
        hideRef={calculatorRef}
      />

      <Footer />
    </div>
  );
}
