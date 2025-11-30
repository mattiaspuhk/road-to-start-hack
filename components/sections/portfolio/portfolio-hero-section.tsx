"use client";

import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  Calendar,
  Target,
  Award,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  Pie,
  PieChart,
} from "recharts";

interface PortfolioHistoryPoint {
  date: string;
  value: number;
}

interface AllocationData {
  sector: string;
  value: number;
  percentage: string;
}

interface PortfolioHeroSectionProps {
  totalValue: number;
  totalCostBasis: number;
  totalGain: number;
  totalGainPercent: string;
  holdingsCount: number;
  portfolioHistory: PortfolioHistoryPoint[];
  allocations: AllocationData[];
  bestPerformer: {
    name: string;
    gainPercent: string;
  } | null;
  worstPerformer: {
    name: string;
    gainPercent: string;
  } | null;
}

const sectorColors: Record<string, string> = {
  HealthTech: "#142952",
  CleanTech: "#0d9488",
  AgriTech: "#ffd387",
  FinTech: "#475569",
  EdTech: "#d97706",
  Default: "#6b7280",
};

export function PortfolioHeroSection({
  totalValue,
  totalCostBasis,
  totalGain,
  totalGainPercent,
  holdingsCount,
  portfolioHistory,
  allocations,
  bestPerformer,
  worstPerformer,
}: PortfolioHeroSectionProps) {
  const isPositive = totalGain >= 0;

  const pieData = allocations.map((a) => ({
    name: a.sector,
    value: a.value,
    color: sectorColors[a.sector] || sectorColors.Default,
  }));

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="font-serif text-3xl md:text-4xl text-white">
              My Portfolio
            </h1>
            <Badge
              variant="outline"
              className="text-xs gap-1.5 border-white/20 text-white/80 bg-white/5"
            >
              <Briefcase className="w-3 h-3" />
              {holdingsCount} Holdings
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-white/50">
            <Calendar className="w-4 h-4" />
            Last updated: Today
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Portfolio Value with Chart */}
          <div className="sm:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                  Portfolio Value
                </p>
                <p className="text-3xl font-mono text-white">
                  €{totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-sm font-mono ${
                      isPositive ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {isPositive ? "+" : ""}{totalGainPercent}%
                  </span>
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-rose-400" />
                  )}
                  <span className="text-xs text-white/40">all time</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/40">Invested</p>
                <p className="text-sm font-mono text-white/70">
                  €{totalCostBasis.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            <div className="h-24 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={portfolioHistory}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }}
                    interval="preserveStartEnd"
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm">
                            <p className="text-white font-medium">
                              €{Number(payload[0].value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className="text-white/50 text-xs">{payload[0].payload.date}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#portfolioGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sector Allocation with Pie Chart */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-3">
              Allocation
            </p>
            <div className="flex items-center gap-3">
              <div className="w-20 h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={22}
                      outerRadius={36}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-1.5">
                {allocations.slice(0, 3).map((a) => (
                  <div key={a.sector} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: sectorColors[a.sector] || sectorColors.Default }}
                      />
                      <span className="text-white/70">{a.sector}</span>
                    </div>
                    <span className="font-mono text-white">{a.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-3">
              Performance
            </p>
            <div className="space-y-3">
              {bestPerformer && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50">Best</p>
                      <p className="text-sm text-white truncate max-w-[100px]">
                        {bestPerformer.name}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-mono text-emerald-400">
                    +{bestPerformer.gainPercent}%
                  </span>
                </div>
              )}
              {worstPerformer && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center">
                      <Target className="w-3.5 h-3.5 text-rose-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50">Needs Attention</p>
                      <p className="text-sm text-white truncate max-w-[100px]">
                        {worstPerformer.name}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-mono text-rose-400">
                    {worstPerformer.gainPercent}%
                  </span>
                </div>
              )}
              <div className="pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50">Total Return</span>
                  <span
                    className={`text-lg font-mono font-semibold ${
                      isPositive ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {isPositive ? "+" : ""}€{totalGain.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
