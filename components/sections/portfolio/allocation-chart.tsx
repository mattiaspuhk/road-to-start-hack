"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";

interface Allocation {
  sector: string;
  value: number;
  percentage: string;
}

interface AllocationChartProps {
  allocations: Allocation[];
}

const sectorColors: Record<string, string> = {
  HealthTech: "bg-primary",
  CleanTech: "bg-teal-600",
  AgriTech: "bg-accent",
  FinTech: "bg-slate-600",
  EdTech: "bg-amber-600",
  Default: "bg-muted-foreground",
};

export function AllocationChart({ allocations }: AllocationChartProps) {
  const sortedAllocations = [...allocations].sort((a, b) => b.value - a.value);

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <PieChart className="w-4 h-4 text-primary" />
          Sector Allocation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-4 rounded-full overflow-hidden flex bg-muted">
          {sortedAllocations.map((allocation) => {
            const color =
              sectorColors[allocation.sector] || sectorColors.Default;
            return (
              <div
                key={allocation.sector}
                className={`${color} h-full transition-all`}
                style={{ width: `${allocation.percentage}%` }}
                title={`${allocation.sector}: ${allocation.percentage}%`}
              />
            );
          })}
        </div>

        <div className="space-y-3">
          {sortedAllocations.map((allocation) => {
            const color =
              sectorColors[allocation.sector] || sectorColors.Default;
            return (
              <div
                key={allocation.sector}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${color}`} />
                  <span className="text-sm text-foreground">
                    {allocation.sector}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-medium">
                    {allocation.percentage}%
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    €
                    {allocation.value.toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
