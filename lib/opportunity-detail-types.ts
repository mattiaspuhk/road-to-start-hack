export interface TractionItem {
  label: string;
  value: string;
}

export interface TimelineStep {
  label: string;
  date: string;
  active: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  background: string;
}

export interface OpportunityDetailData {
  id: string;
  company: {
    name: string;
    tagline: string;
    euDomiciled: boolean;
    audited: boolean;
    leadInvestor: string;
    images?: { src: string; caption: string }[];
    website?: string;
    founded?: number;
    employees?: string;
    headquarters?: string;
    sector?: string;
    stage?: string;
  };
  pitch: {
    videoThumbnail: string;
    eli5Points: string[];
    traction: TractionItem[];
  };
  analysis: {
    bullCase: string[];
    bearCase: string[];
  };
  deal: {
    assetType: string;
    pricePerShare: number;
    currency: string;
    valuation: string;
    timeline: TimelineStep[];
    runwayMonths: number;
    runwayExtension: number;
  };
  team: {
    members: TeamMember[];
    founderOwnership: number;
  };
  investment: {
    minInvestment: number;
    maxInvestment: number;
    pricePerShare: number;
    totalShares: number;
    currency: string;
  };
  priceHistory: number[];
}

export interface PriceHistoryPoint {
  month: string;
  price: number;
}
