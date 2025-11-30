"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface PortfolioPerformanceCardProps {
  totalValue: number;
  totalGain: number;
  totalGainPercent: string;
}

export function PortfolioPerformanceCard({
  totalValue,
  totalGain,
  totalGainPercent,
}: PortfolioPerformanceCardProps) {
  const isPositive = totalGain >= 0;

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Wallet className="w-4 h-4 text-primary" />
          Portfolio Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Total Value
          </p>
          <p className="text-2xl font-mono font-semibold">
            €{totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className="h-px bg-border" />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Total Gain
            </p>
            <div className="flex items-center gap-1">
              <p
                className={`text-lg font-mono font-medium ${
                  isPositive ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {isPositive ? "+" : ""}€{Math.abs(totalGain).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Return
            </p>
            <div className="flex items-center gap-1">
              <p
                className={`text-lg font-mono font-medium ${
                  isPositive ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {isPositive ? "+" : ""}{totalGainPercent}%
              </p>
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rose-600" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
