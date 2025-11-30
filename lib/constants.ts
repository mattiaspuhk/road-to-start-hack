export const industries = [
  { value: "all", label: "All Industries" },
  { value: "healthtech", label: "HealthTech" },
  { value: "fintech", label: "FinTech" },
  { value: "cleantech", label: "CleanTech" },
  { value: "deeptech", label: "DeepTech" },
  { value: "logistics", label: "Logistics" },
  { value: "agritech", label: "AgriTech" },
  { value: "edtech", label: "EdTech" },
];

export const countries = [
  { value: "all", label: "All of Europe" },
  { value: "germany", label: "Germany" },
  { value: "france", label: "France" },
  { value: "netherlands", label: "Netherlands" },
  { value: "sweden", label: "Sweden" },
  { value: "spain", label: "Spain" },
  { value: "italy", label: "Italy" },
  { value: "portugal", label: "Portugal" },
];

export const stats = [
  { value: "€47M+", label: "Capital Deployed" },
  { value: "89", label: "Companies Funded" },
  { value: "12.4k", label: "Active Investors" },
];

export const featuredStartups = [
  {
    name: "SkyMed Delivery",
    sector: "HealthTech",
    description:
      "Building autonomous drone delivery networks to bring essential medicines to underserved rural communities across Germany in under 15 minutes.",
    founders: "Dr. Maria Hoffmann (ex-DHL) & Thomas Weber (ex-Siemens)",
    color: "primary",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop&q=80",
    stats: [
      { label: "Pharmacies", value: "127" },
      { label: "Valuation", value: "€8M" },
    ],
  },
  {
    name: "CarbonLedger",
    sector: "CleanTech",
    description:
      "Enterprise carbon accounting platform using AI to automatically track, report, and reduce emissions across global supply chains.",
    founders:
      "Anna Schmidt (ex-McKinsey) & Dr. Lars Bergström (Climate Scientist)",
    color: "success",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop&q=80",
    stats: [
      { label: "Enterprises", value: "42" },
      { label: "Valuation", value: "€6M" },
    ],
  },
  {
    name: "FactoryAI",
    sector: "DeepTech",
    description:
      "Industrial automation platform using computer vision and robotics to optimize manufacturing processes across European factories.",
    founders: "Erik Karlsson (ex-ABB) & Sofia Lindqvist (ex-Spotify)",
    color: "primary",
    image:
      "https://images.unsplash.com/photo-1565514020179-026b92b2ed43?w=800&h=600&fit=crop&q=80",
    stats: [
      { label: "Factories", value: "12" },
      { label: "Valuation", value: "€5M" },
    ],
  },
];

export const thematicCollections = [
  {
    id: "all",
    name: "All Opportunities",
    description: "View all investment opportunities",
    icon: null,
  },
  {
    id: "green",
    name: "The Green Transition",
    description: "Climate technology & sustainable systems",
    icon: "leaf",
  },
  {
    id: "sovereignty",
    name: "European Sovereignty",
    description: "Critical infrastructure & security",
    icon: "shield",
  },
  {
    id: "ai",
    name: "AI for the Real World",
    description: "Healthcare & industrial automation",
    icon: "cpu",
  },
];

export const investmentOpportunities = [
  {
    id: "1",
    founderInitials: "LvdB",
    founderName: "Lars van der Berg",
    founderTitle: "CEO & Founder",
    category: "CLEANTECH",
    location: "Netherlands",
    projectName: "GreenGrid Energy",
    description:
      "AI-driven solar optimization reducing energy costs by 40% for small businesses. 340 installations across Benelux.",
    leadInvestor: "EQT Ventures",
    committed: 42,
    theme: "green",
  },
  {
    id: "2",
    founderInitials: "MH",
    founderName: "Dr. Maria Hoffmann",
    founderTitle: "CEO & Co-Founder",
    category: "HEALTHTECH",
    location: "Germany",
    projectName: "SkyMed Delivery",
    description:
      "Autonomous drone network delivering pharmaceuticals to 2,400+ rural pharmacies. Pilots active with AOK and Deutsche Post.",
    leadInvestor: "High-Tech Gründerfonds",
    committed: 65,
    theme: "ai",
  },
  {
    id: "3",
    founderInitials: "AS",
    founderName: "Anna Schmidt",
    founderTitle: "CEO & Co-Founder",
    category: "CLEANTECH",
    location: "Germany",
    projectName: "CarbonLedger",
    description:
      "Enterprise carbon accounting platform using AI to automatically track, report, and reduce emissions across global supply chains.",
    leadInvestor: "Earlybird Venture Capital",
    committed: 78,
    theme: "green",
  },
  {
    id: "4",
    founderInitials: "JP",
    founderName: "Jean-Pierre Dubois",
    founderTitle: "CEO & Founder",
    category: "DEEPTECH",
    location: "France",
    projectName: "SecureNet EU",
    description:
      "Next-generation cybersecurity platform protecting critical European infrastructure from advanced persistent threats.",
    leadInvestor: "Partech",
    committed: 55,
    theme: "sovereignty",
  },
  {
    id: "5",
    founderInitials: "EK",
    founderName: "Erik Karlsson",
    founderTitle: "CEO & Co-Founder",
    category: "AUTOMATION",
    location: "Sweden",
    projectName: "FactoryAI",
    description:
      "Industrial automation platform using computer vision and robotics to optimize manufacturing processes. Deployed in 12 factories across Scandinavia.",
    leadInvestor: "Creandum",
    committed: 38,
    theme: "ai",
  },
];
