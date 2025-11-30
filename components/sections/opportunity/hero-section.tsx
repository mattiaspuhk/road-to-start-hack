"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  Building,
  MapPin,
  Globe,
  Calendar,
  Users,
  ExternalLink,
  Briefcase,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type {
  OpportunityDetailData,
  PriceHistoryPoint,
} from "@/lib/opportunity-detail-types";

type Timeframe = "1D" | "1W" | "1M" | "1Y" | "YTD";

const timeframes: Timeframe[] = ["1D", "1W", "1M", "1Y", "YTD"];

interface HeroSectionProps {
  data: OpportunityDetailData;
  rawPriceHistory: number[];
}

export function HeroSection({ data, rawPriceHistory }: HeroSectionProps) {
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
              {data.company.stage && (
                <Badge
                  variant="outline"
                  className="text-xs gap-1.5 border-white/20 text-white/80 bg-white/5"
                >
                  <Building className="w-3 h-3" />
                  {data.company.stage}
                </Badge>
              )}
              {data.company.sector && (
                <Badge
                  variant="outline"
                  className="text-xs gap-1.5 border-white/20 text-white/80 bg-white/5"
                >
                  <Briefcase className="w-3 h-3" />
                  {data.company.sector}
                </Badge>
              )}
              {data.company.headquarters && (
                <Badge
                  variant="outline"
                  className="text-xs gap-1.5 border-white/20 text-white/80 bg-white/5"
                >
                  <MapPin className="w-3 h-3" />
                  {data.company.headquarters}
                </Badge>
              )}
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              {data.company.name}
            </h1>

            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl mb-6">
              {data.company.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
              {data.company.website && (
                <a
                  href={data.company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>
                    {data.company.website.replace(/^https?:\/\//, "")}
                  </span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {data.company.founded && (
                <div className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>Founded {data.company.founded}</span>
                </div>
              )}
              {data.company.employees && (
                <div className="inline-flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  <span>{data.company.employees} employees</span>
                </div>
              )}
            </div>
          </div>

          <SharePriceCard
            currentPrice={currentPrice}
            rawPriceHistory={rawPriceHistory}
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
  rawPriceHistory: number[];
  currency: string;
  valuation: string;
  leadInvestor: string;
  minInvestment: number;
  investmentCurrency: string;
}

function generateChartData(rawPriceHistory: number[], timeframe: Timeframe) {
  const now = new Date();
  const currentMonth = now.getMonth();

  switch (timeframe) {
    case "1D": {
      const prices = rawPriceHistory.slice(-8);
      const hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM"];
      return prices.map((price, i) => ({
        label: hours[i] || `${9 + i}:00`,
        price,
      }));
    }
    case "1W": {
      const prices = rawPriceHistory.slice(-7);
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      return prices.map((price, i) => ({
        label: days[i],
        price,
      }));
    }
    case "1M": {
      const prices = rawPriceHistory.slice(-30);
      return prices.map((price, i) => ({
        label: i % 7 === 0 ? `Day ${i + 1}` : "",
        price,
      }));
    }
    case "1Y": {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const step = Math.max(1, Math.floor(rawPriceHistory.length / 12));
      const prices: number[] = [];
      for (let i = 0; i < 12 && i * step < rawPriceHistory.length; i++) {
        prices.push(rawPriceHistory[i * step]);
      }
      return prices.map((price, i) => ({
        label: months[i],
        price,
      }));
    }
    case "YTD": {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthsToShow = currentMonth + 1;
      const step = Math.max(
        1,
        Math.floor(rawPriceHistory.length / monthsToShow)
      );
      const prices: number[] = [];
      for (
        let i = 0;
        i < monthsToShow && i * step < rawPriceHistory.length;
        i++
      ) {
        prices.push(rawPriceHistory[i * step]);
      }
      return prices.map((price, i) => ({
        label: months[i],
        price,
      }));
    }
    default:
      return rawPriceHistory.slice(-7).map((price, i) => ({
        label: `Day ${i + 1}`,
        price,
      }));
  }
}

function getTimeframeLabel(timeframe: Timeframe): string {
  switch (timeframe) {
    case "1D":
      return "Today";
    case "1W":
      return "Past week";
    case "1M":
      return "Past month";
    case "1Y":
      return "Past year";
    case "YTD":
      return "Year to date";
    default:
      return "";
  }
}

function SharePriceCard({
  currentPrice,
  rawPriceHistory,
  currency,
  valuation,
  leadInvestor,
  minInvestment,
  investmentCurrency,
}: SharePriceCardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>("1M");

  const chartData = useMemo(
    () => generateChartData(rawPriceHistory, selectedTimeframe),
    [rawPriceHistory, selectedTimeframe]
  );

  const yAxisDomain = useMemo(() => {
    if (chartData.length === 0) return [0, 100];
    const prices = chartData.map((d) => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const range = maxPrice - minPrice;
    const padding = Math.max(range * 0.1, minPrice * 0.05); // 10% of range or 5% of min, whichever is larger
    return [Math.max(0, minPrice - padding), maxPrice + padding];
  }, [chartData]);

  const priceChange = useMemo(() => {
    if (chartData.length < 2) return "0.0";
    const startPrice = chartData[0].price;
    const change = ((currentPrice - startPrice) / startPrice) * 100;
    return change.toFixed(1);
  }, [chartData, currentPrice]);

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
                Number(priceChange) >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {Number(priceChange) >= 0 ? "+" : ""}
              {priceChange}%
            </span>
          </div>
          <p className="text-xs text-white/40 mt-1">
            {getTimeframeLabel(selectedTimeframe)}
          </p>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setSelectedTimeframe(tf)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedTimeframe === tf
                ? "bg-white/20 text-white"
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.15}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
            />
            <YAxis
              domain={yAxisDomain}
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
                        {payload[0].payload.label}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="linear"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              fill="url(#priceGradient)"
              dot={false}
              activeDot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
        <div>
          <p className="text-xs text-white/40 mb-1">Valuation</p>
          <p className="text-lg font-medium font-mono text-white">
            {valuation}
          </p>
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
