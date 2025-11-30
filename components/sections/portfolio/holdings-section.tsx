"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import type { Opportunity } from "@/lib/opportunities";

interface Holding {
  opportunityId: string;
  sharesOwned: number;
  purchasePrice: number;
  purchaseDate: string;
  opportunity: Opportunity;
  currentValue: number;
  costBasis: number;
  gain: number;
  gainPercent: string;
}

interface HoldingsSectionProps {
  holdings: (Holding | null)[];
}

export function HoldingsSection({ holdings }: HoldingsSectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl text-foreground">Holdings</h2>
        <span className="text-xs text-muted-foreground">
          {holdings.filter(Boolean).length} positions
        </span>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[1fr_80px_80px_90px_100px_80px] gap-4 px-4 py-2 bg-muted/50 text-xs text-muted-foreground uppercase tracking-wider border-b">
          <div>Company</div>
          <div className="text-right">Shares</div>
          <div className="text-right">Cost</div>
          <div className="text-right">Price</div>
          <div className="text-right">Value</div>
          <div className="text-right">Return</div>
        </div>

        {/* Rows */}
        <div className="divide-y">
          {holdings.filter(Boolean).map((holding) => {
            if (!holding) return null;
            const isPositive = holding.gain >= 0;

            return (
              <div
                key={holding.opportunityId}
                className="grid grid-cols-2 md:grid-cols-[1fr_80px_80px_90px_100px_80px] gap-2 md:gap-4 px-4 py-3 hover:bg-muted/30 transition-colors"
              >
                {/* Company */}
                <div className="col-span-2 md:col-span-1 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-serif font-bold text-sm">
                      {holding.opportunity.name.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/opportunity/${holding.opportunity.id}`}
                      className="group flex items-center gap-1"
                    >
                      <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
                        {holding.opportunity.name}
                      </span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {holding.opportunity.sector} · {holding.opportunity.stage}
                    </p>
                  </div>
                </div>

                {/* Mobile: show all stats in a row */}
                <div className="col-span-2 md:hidden flex justify-between text-xs text-muted-foreground">
                  <span>{holding.sharesOwned} shares @ €{holding.purchasePrice.toFixed(2)}</span>
                  <span className={isPositive ? "text-emerald-600" : "text-rose-600"}>
                    {isPositive ? "+" : ""}{holding.gainPercent}%
                  </span>
                </div>

                {/* Desktop columns */}
                <div className="hidden md:block text-right text-sm font-mono">
                  {holding.sharesOwned}
                </div>
                <div className="hidden md:block text-right text-sm font-mono text-muted-foreground">
                  €{holding.purchasePrice.toFixed(2)}
                </div>
                <div className="hidden md:block text-right text-sm font-mono">
                  €{holding.opportunity.sharePrice.toFixed(2)}
                </div>
                <div className="hidden md:block text-right text-sm font-mono font-medium">
                  €{holding.currentValue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
                <div className="hidden md:flex items-center justify-end gap-1">
                  <span
                    className={`text-sm font-mono font-medium ${
                      isPositive ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {isPositive ? "+" : ""}{holding.gainPercent}%
                  </span>
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-rose-600" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
