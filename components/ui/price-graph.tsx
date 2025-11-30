"use client";

import { Area, AreaChart, CartesianGrid, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PriceGraphProps {
  priceHistory: number[];
  currentPrice: number;
  className?: string;
}

export function PriceGraph({
  priceHistory,
  currentPrice,
  className,
}: PriceGraphProps) {
  const isUpward = currentPrice > priceHistory[0];
  const color = "var(--primary)";

  const minPrice = Math.min(...priceHistory);
  const maxPrice = Math.max(...priceHistory);
  const avgPrice =
    priceHistory.reduce((a, b) => a + b, 0) / priceHistory.length;
  const priceRange = maxPrice - minPrice;
  const volatility = (priceRange / avgPrice) * 100;

  // Calculate Y-axis domain with dynamic padding for better visibility
  const yAxisPadding = Math.max(priceRange * 0.1, minPrice * 0.05);
  const yAxisDomain = [
    Math.max(0, minPrice - yAxisPadding),
    maxPrice + yAxisPadding,
  ];

  const chartData = priceHistory.map((price, index) => ({
    day: index + 1,
    price: price,
    min: minPrice,
    max: maxPrice,
    avg: avgPrice,
  }));

  const chartConfig = {
    price: {
      label: "Price",
      color: color,
    },
    min: {
      label: "Min",
      color: "#94a3b8",
    },
    max: {
      label: "Max",
      color: "#94a3b8",
    },
    avg: {
      label: "Average",
      color: "#64748b",
    },
  } satisfies ChartConfig;

  return (
    <div className={className}>
      <ChartContainer config={chartConfig} className="h-full w-full">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 12, right: 12, bottom: 12, left: 12 }}
        >
          <YAxis domain={yAxisDomain} hide />
          <defs>
            <linearGradient
              id={`gradient-${isUpward ? "up" : "down"}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={color} stopOpacity={0.7} />
              <stop offset="95%" stopColor={color} stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="2 2"
            vertical={false}
            stroke="hsl(var(--border))"
            opacity={0.2}
          />
          <ChartTooltip
            cursor={{ stroke: color, strokeWidth: 2 }}
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value, name) => {
                  if (name === "price") {
                    return `€${Number(value).toFixed(2)}`;
                  }
                  return null;
                }}
                labelFormatter={(value) => `Day ${value}`}
              />
            }
          />
          <Area
            type="linear"
            dataKey="price"
            stroke={color}
            strokeWidth={2.5}
            fill={`url(#gradient-${isUpward ? "up" : "down"})`}
            fillOpacity={1}
            dot={false}
            activeDot={{ r: 5, fill: color, strokeWidth: 2 }}
          />
        </AreaChart>
      </ChartContainer>
      {className?.includes("h-full") && (
        <div className="flex items-center justify-between mt-1.5 text-[10px] text-muted-foreground px-1">
          <span>
            €{minPrice.toFixed(2)}-€{maxPrice.toFixed(2)}
          </span>
          <span>{volatility.toFixed(1)}% vol</span>
        </div>
      )}
    </div>
  );
}
