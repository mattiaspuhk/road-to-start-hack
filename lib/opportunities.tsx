import { Leaf, Shield, Cpu } from "lucide-react";

export interface Opportunity {
  id: string;
  name: string;
  tagline: string;
  sector: string;
  stage: string;
  location: string;
  valuation: string;
  minInvestment: number;
  runwayMonths: number;
  fundingProgress: number;
  euDomiciled: boolean;
  audited: boolean;
  founderName?: string;
  founderTitle?: string;
  leadInvestor?: string;
  impactHeadline?: string;
  businessHook?: string;
  sharePrice: number;
  priceHistory: number[];
  votingPremium: number;
  votingPremiumType: "percentage" | "fixed";
}

export interface ThematicCollection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  sectors: string[];
}

export const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    name: "SkyMed Delivery",
    tagline: "Autonomous drone delivery for rural pharmacies",
    sector: "HealthTech",
    stage: "Seed",
    location: "Germany",
    valuation: "€8M",
    minInvestment: 100,
    runwayMonths: 6,
    fundingProgress: 65,
    euDomiciled: true,
    audited: true,
    founderName: "Dr. Anna Müller",
    founderTitle: "CEO & Co-founder",
    leadInvestor: "High-Tech Gründerfonds",
    impactHeadline: "Bringing Essential Medicine to Rural Germany",
    businessHook:
      "Autonomous drone network delivering pharmaceuticals to 2,400+ rural pharmacies. Pilots active with AOK and Deutsche Post.",
    sharePrice: 12.45,
    priceHistory: [
      10.2, 10.5, 10.1, 10.8, 11.2, 10.9, 11.5, 11.8, 11.2, 11.6, 12.0, 11.4,
      11.8, 12.2, 11.9, 12.5, 12.1, 12.4, 12.0, 12.3, 12.6, 12.2, 12.5, 12.3,
      12.1, 12.4, 12.6, 12.3, 12.45, 12.4,
    ],
    votingPremium: 0.15,
    votingPremiumType: "percentage",
  },
  {
    id: "2",
    name: "GreenGrid Energy",
    tagline: "AI-optimized solar panel networks for SMEs",
    sector: "CleanTech",
    stage: "Series A",
    location: "Netherlands",
    valuation: "€22M",
    minInvestment: 250,
    runwayMonths: 14,
    fundingProgress: 42,
    euDomiciled: true,
    audited: true,
    founderName: "Lars van der Berg",
    founderTitle: "CEO & Founder",
    leadInvestor: "EQT Ventures",
    impactHeadline: "Democratizing Solar Energy for European SMEs",
    businessHook:
      "AI-driven solar optimization reducing energy costs by 40% for small businesses. 340 installations across Benelux.",
    sharePrice: 18.75,
    priceHistory: [
      19.2, 19.0, 18.5, 18.2, 18.4, 18.1, 17.8, 18.0, 18.3, 18.1, 18.4, 18.6,
      18.3, 18.5, 18.7, 18.4, 18.6, 18.8, 18.5, 18.7, 18.9, 18.6, 18.8, 18.7,
      18.5, 18.7, 18.9, 18.8, 18.75, 18.7,
    ],
    votingPremium: 0.12,
    votingPremiumType: "percentage",
  },
  {
    id: "3",
    name: "FarmSense",
    tagline: "Precision agriculture sensors for European farmers",
    sector: "AgriTech",
    stage: "Seed",
    location: "France",
    valuation: "€5M",
    minInvestment: 50,
    runwayMonths: 9,
    fundingProgress: 78,
    euDomiciled: true,
    audited: false,
    founderName: "Marie Dubois",
    founderTitle: "CEO & Co-founder",
    leadInvestor: "Partech Partners",
    impactHeadline: "Feeding Europe with Precision Agriculture",
    businessHook:
      "IoT sensors reducing water usage by 35% and increasing crop yields. Deployed across 1,200 hectares in France.",
    sharePrice: 8.2,
    priceHistory: [
      7.5, 7.8, 7.6, 7.9, 8.1, 7.8, 8.0, 7.7, 7.9, 8.2, 8.0, 8.3, 8.1, 8.4, 8.2,
      8.0, 8.3, 8.1, 8.0, 8.2, 8.4, 8.2, 8.1, 8.3, 8.1, 8.2, 8.0, 8.1, 8.2,
      8.15,
    ],
    votingPremium: 1.5,
    votingPremiumType: "fixed",
  },
  {
    id: "4",
    name: "SecureID Labs",
    tagline: "Decentralized identity verification for banks",
    sector: "FinTech",
    stage: "Series A",
    location: "Austria",
    valuation: "€15M",
    minInvestment: 500,
    runwayMonths: 18,
    fundingProgress: 31,
    euDomiciled: true,
    audited: true,
    founderName: "Thomas Weber",
    founderTitle: "CEO & CTO",
    leadInvestor: "Speedinvest",
    impactHeadline: "Building Trust in European Digital Banking",
    businessHook:
      "Privacy-first identity verification reducing KYC costs by 60%. Integrated with Erste Bank and N26.",
    sharePrice: 15.3,
    priceHistory: [
      14.0, 14.3, 14.5, 14.2, 14.6, 14.8, 14.5, 14.9, 15.1, 14.8, 15.0, 15.2,
      14.9, 15.1, 15.3, 15.0, 15.2, 15.4, 15.1, 15.3, 15.5, 15.2, 15.4, 15.3,
      15.1, 15.3, 15.2, 15.4, 15.3, 15.25,
    ],
    votingPremium: 0.18,
    votingPremiumType: "percentage",
  },
  {
    id: "5",
    name: "MediBot",
    tagline: "AI diagnostic assistant for rural clinics",
    sector: "HealthTech",
    stage: "Pre-Seed",
    location: "Spain",
    valuation: "€3M",
    minInvestment: 100,
    runwayMonths: 4,
    fundingProgress: 89,
    euDomiciled: true,
    audited: false,
    founderName: "Dr. Carlos Ruiz",
    founderTitle: "CEO & Chief Medical Officer",
    leadInvestor: "Kibo Ventures",
    impactHeadline: "Closing the Rural Healthcare Gap in Spain",
    businessHook:
      "AI-powered diagnostics supporting rural doctors with 94% accuracy. Active in 45 clinics across Andalusia.",
    sharePrice: 5.85,
    priceHistory: [
      5.0, 5.2, 5.4, 5.1, 5.3, 5.5, 5.2, 5.4, 5.6, 5.3, 5.5, 5.7, 5.4, 5.6, 5.8,
      5.5, 5.7, 5.9, 5.6, 5.8, 5.7, 5.9, 5.8, 5.7, 5.9, 5.8, 5.85, 5.8, 5.85,
      5.82,
    ],
    votingPremium: 0.1,
    votingPremiumType: "percentage",
  },
  {
    id: "6",
    name: "CircularPack",
    tagline: "Reusable packaging logistics for e-commerce",
    sector: "CleanTech",
    stage: "Seed",
    location: "Belgium",
    valuation: "€6M",
    minInvestment: 150,
    runwayMonths: 11,
    fundingProgress: 55,
    euDomiciled: true,
    audited: true,
    founderName: "Sophie Janssen",
    founderTitle: "CEO & Founder",
    leadInvestor: "Fortino Capital",
    impactHeadline: "Eliminating E-commerce Packaging Waste",
    businessHook:
      "Reusable packaging system eliminating 2M+ single-use boxes annually. Partnerships with Zalando and Coolblue.",
    sharePrice: 9.6,
    priceHistory: [
      9.8, 9.6, 9.4, 9.2, 9.0, 9.3, 9.1, 9.4, 9.2, 9.5, 9.3, 9.6, 9.4, 9.7, 9.5,
      9.8, 9.6, 9.4, 9.7, 9.5, 9.6, 9.4, 9.6, 9.5, 9.7, 9.6, 9.5, 9.6, 9.55,
      9.6,
    ],
    votingPremium: 2.0,
    votingPremiumType: "fixed",
  },
];

export const collections: ThematicCollection[] = [
  {
    id: "green",
    title: "The Green Transition",
    description: "Climate technology & sustainable systems",
    icon: <Leaf className="w-5 h-5" />,
    sectors: ["CleanTech", "AgriTech"],
  },
  {
    id: "sovereignty",
    title: "European Sovereignty",
    description: "Critical infrastructure & security",
    icon: <Shield className="w-5 h-5" />,
    sectors: ["FinTech"],
  },
  {
    id: "ai",
    title: "AI for the Real World",
    description: "Healthcare & industrial automation",
    icon: <Cpu className="w-5 h-5" />,
    sectors: ["HealthTech"],
  },
];
