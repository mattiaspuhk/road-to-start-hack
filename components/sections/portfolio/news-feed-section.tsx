"use client";

import Link from "next/link";
import {
  Newspaper,
  Rocket,
  Handshake,
  DollarSign,
  Trophy,
  BarChart3,
  ChevronRight,
} from "lucide-react";

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

interface NewsFeedSectionProps {
  news: NewsItem[];
}

const typeConfig: Record<NewsType, { icon: typeof Newspaper; color: string }> = {
  expansion: { icon: Rocket, color: "text-primary" },
  partnership: { icon: Handshake, color: "text-teal-600" },
  funding: { icon: DollarSign, color: "text-success" },
  milestone: { icon: Trophy, color: "text-amber-600" },
  financial: { icon: BarChart3, color: "text-slate-600" },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1d";
  if (diffDays < 7) return `${diffDays}d`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function NewsFeedSection({ news }: NewsFeedSectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl text-foreground">News</h2>
        <span className="text-xs text-muted-foreground">
          {news.length} updates
        </span>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden divide-y">
        {news.length === 0 ? (
          <div className="py-8 text-center">
            <Newspaper className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No news yet</p>
          </div>
        ) : (
          news.map((item) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;

            return (
              <Link
                key={item.id}
                href={`/opportunity/${item.companyId}`}
                className="flex items-start gap-3 px-4 py-3 hover:bg-muted/30 transition-colors group"
              >
                <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${config.color}`} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-medium text-primary">
                      {item.companyName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
}
