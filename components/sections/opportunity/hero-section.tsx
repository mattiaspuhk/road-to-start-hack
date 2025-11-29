"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  Building,
  MapPin,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { OpportunityDetailData, PriceHistoryPoint } from "@/lib/opportunity-detail-types";

interface HeroSectionProps {
  data: OpportunityDetailData;
  priceHistory: PriceHistoryPoint[];
  priceChange: string;
}

export function HeroSection({ data, priceHistory, priceChange }: HeroSectionProps) {
  const currentPrice = data.deal.pricePerShare;

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to opportunities
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {data.company.euDomiciled && (
                <Badge
                  variant="outline"
                  className="text-xs gap-1.5 border-white/20 text-white/80 bg-white/5"
                >
                  <Shield className="w-3 h-3" />
                  EU Domiciled
                </Badge>
              )}
              {data.company.audited && (
                <Badge
                  variant="outline"
                  className="text-xs gap-1.5 border-white/20 text-white/80 bg-white/5"
                >
                  <CheckCircle className="w-3 h-3" />
                  Audited
                </Badge>
              )}
              <Badge
                variant="outline"
                className="text-xs gap-1.5 border-white/20 text-white/80 bg-white/5"
              >
                <Building className="w-3 h-3" />
                Seed Stage
              </Badge>
              <Badge
                variant="outline"
                className="text-xs gap-1.5 border-white/20 text-white/80 bg-white/5"
              >
                <MapPin className="w-3 h-3" />
                Germany
              </Badge>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              {data.company.name}
            </h1>

            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              {data.company.tagline}
            </p>
          </div>

          <SharePriceCard
            currentPrice={currentPrice}
            priceChange={priceChange}
            priceHistory={priceHistory}
            currency={data.deal.currency}
            valuation={data.deal.valuation}
            leadInvestor={data.company.leadInvestor}
            minInvestment={data.investment.minInvestment}
            investmentCurrency={data.investment.currency}
          />
        </div>
      </div>
    </section>
  );
}

interface SharePriceCardProps {
  currentPrice: number;
  priceChange: string;
  priceHistory: PriceHistoryPoint[];
  currency: string;
  valuation: string;
  leadInvestor: string;
  minInvestment: number;
  investmentCurrency: string;
}

function SharePriceCard({
  currentPrice,
  priceChange,
  priceHistory,
  currency,
  valuation,
  leadInvestor,
  minInvestment,
  investmentCurrency,
}: SharePriceCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-white/50 uppercase tracking-wider mb-1">
            Digital Share Price
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl md:text-5xl font-mono text-white">
              {currency}
              {currentPrice.toFixed(2)}
            </span>
            <span
              className={`text-sm font-medium font-mono ${
                Number(priceChange) >= 0
                  ? "text-emerald-400"
                  : "text-rose-400"
              }`}
            >
              {Number(priceChange) >= 0 ? "+" : ""}
              {priceChange}%
            </span>
          </div>
          <p className="text-xs text-white/40 mt-1">Since initial offering</p>
        </div>
      </div>

      <div className="h-40 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={priceHistory}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="priceGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.4}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
            />
            <YAxis
              domain={["dataMin - 0.2", "dataMax + 0.2"]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              tickFormatter={(value) => `€${value.toFixed(2)}`}
              width={50}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm">
                      <p className="text-white font-medium">
                        €{Number(payload[0].value).toFixed(2)}
                      </p>
                      <p className="text-white/50 text-xs">
                        {payload[0].payload.month}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#priceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
        <div>
          <p className="text-xs text-white/40 mb-1">Valuation</p>
          <p className="text-lg font-medium font-mono text-white">{valuation}</p>
        </div>
        <div>
          <p className="text-xs text-white/40 mb-1">Lead Investor</p>
          <p className="text-sm font-medium text-white truncate">
            {leadInvestor}
          </p>
        </div>
        <div>
          <p className="text-xs text-white/40 mb-1">Min. Investment</p>
          <p className="text-lg font-medium font-mono text-white">
            {investmentCurrency}
            {minInvestment}
          </p>
        </div>
      </div>
    </div>
  );
}
