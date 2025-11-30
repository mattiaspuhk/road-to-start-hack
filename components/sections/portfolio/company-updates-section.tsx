"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Newspaper,
  Rocket,
  Handshake,
  DollarSign,
  Trophy,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { Opportunity } from "@/lib/opportunities";

type NewsType = "expansion" | "partnership" | "funding" | "milestone" | "financial";

interface NewsItem {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  summary: string;
  date: string;
  type: NewsType;
}

interface CompanyUpdatesSectionProps {
  holdings: Array<{
    opportunityId: string;
    opportunity: Opportunity;
    currentValue: number;
    gainPercent: string;
  }>;
  news: NewsItem[];
}

const typeConfig: Record<NewsType, { icon: typeof Newspaper; color: string; label: string }> = {
  expansion: { icon: Rocket, color: "text-primary", label: "Expansion" },
  partnership: { icon: Handshake, color: "text-teal-600", label: "Partnership" },
  funding: { icon: DollarSign, color: "text-success", label: "Funding" },
  milestone: { icon: Trophy, color: "text-amber-600", label: "Milestone" },
  financial: { icon: BarChart3, color: "text-slate-600", label: "Financial" },
};

const getCompanyImage = (id: string) => {
  const imageMap: Record<string, string> = {
    "1": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=200&fit=crop&crop=center",
    "2": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=200&h=200&fit=crop&crop=center",
    "3": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=200&h=200&fit=crop&crop=center",
    "4": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop&crop=center",
    "5": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop&crop=center",
    "6": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop&crop=center",
  };
  return imageMap[id] || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&h=200&fit=crop&crop=center";
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function CompanyUpdatesSection({ holdings, news }: CompanyUpdatesSectionProps) {
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  const toggleCompany = (companyId: string) => {
    setExpandedCompany(expandedCompany === companyId ? null : companyId);
  };

  const newsByCompany = news.reduce((acc, item) => {
    if (!acc[item.companyId]) {
      acc[item.companyId] = [];
    }
    acc[item.companyId].push(item);
    return acc;
  }, {} as Record<string, NewsItem[]>);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl text-foreground">Company Updates</h2>
        <span className="text-xs text-muted-foreground">
          {holdings.length} companies
        </span>
      </div>

      <div className="space-y-3">
        {holdings.map((holding) => {
          const companyNews = newsByCompany[holding.opportunityId] || [];
          const isExpanded = expandedCompany === holding.opportunityId;
          const hasNews = companyNews.length > 0;

          return (
            <div
              key={holding.opportunityId}
              className="bg-card border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => hasNews && toggleCompany(holding.opportunityId)}
                className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
                  hasNews ? "hover:bg-muted/30 cursor-pointer" : "cursor-default"
                }`}
                disabled={!hasNews}
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex-shrink-0 overflow-hidden relative ring-1 ring-border/50">
                  <Image
                    src={getCompanyImage(holding.opportunityId)}
                    alt={holding.opportunity.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">
                      {holding.opportunity.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {holding.opportunity.sector}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{companyNews.length} update{companyNews.length !== 1 ? "s" : ""}</span>
                    {companyNews.length > 0 && (
                      <>
                        <span className="text-muted-foreground/40">•</span>
                        <span>Latest: {formatDate(companyNews[0].date)}</span>
                      </>
                    )}
                  </div>
                </div>

                {hasNews && (
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {isExpanded && hasNews && (
                <div className="border-t divide-y">
                  {companyNews.map((item) => {
                    const config = typeConfig[item.type];
                    const Icon = config.icon;

                    return (
                      <div
                        key={item.id}
                        className="px-4 py-3 bg-muted/10"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-1.5 rounded-md bg-muted/50 ${config.color}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-medium ${config.color}`}>
                                {config.label}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(item.date)}
                              </span>
                            </div>
                            <h4 className="text-sm font-medium text-foreground mb-1">
                              {item.title}
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {item.summary}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <Link
                    href={`/opportunity/${holding.opportunityId}`}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-primary hover:bg-muted/30 transition-colors"
                  >
                    View company details
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
