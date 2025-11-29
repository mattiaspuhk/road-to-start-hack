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
    stats: [
      { label: "Enterprises", value: "42" },
      { label: "Valuation", value: "€6M" },
    ],
  },
];
