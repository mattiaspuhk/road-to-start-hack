import { TrendingUp, Clock, Users } from "lucide-react";

interface CompanyMetricsCardProps {
  valuation: string;
  runwayMonths: number;
  stage: string;
  sector: string;
  totalShares: number;
}

export function CompanyMetricsCard({
  valuation,
  runwayMonths,
  stage,
  sector,
  totalShares,
}: CompanyMetricsCardProps) {
  return (
    <div className="bg-gradient-to-br from-muted/80 to-muted/30 rounded-2xl border border-border p-6">
      <h3 className="text-lg font-serif text-foreground mb-6">
        Company Metrics
      </h3>

      <div className="space-y-5">
        <MetricRow
          icon={<TrendingUp className="w-4 h-4" />}
          label="Valuation"
          value={valuation}
        />

        <MetricRow
          icon={<Clock className="w-4 h-4" />}
          label="Runway"
          value={`${runwayMonths} months`}
        />

        <MetricRow
          icon={<Users className="w-4 h-4" />}
          label="Total Shares"
          value={totalShares.toLocaleString()}
        />

        <div className="pt-4 border-t border-border grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Stage</p>
            <p className="text-sm font-medium text-foreground">{stage}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Sector</p>
            <p className="text-sm font-medium text-foreground">{sector}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  showProgress?: boolean;
  progress?: number;
}

function MetricRow({
  icon,
  label,
  value,
  showProgress,
  progress,
}: MetricRowProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 text-muted-foreground">
          {icon}
          <span className="text-sm">{label}</span>
        </div>
        <span className="text-sm font-medium text-foreground">{value}</span>
      </div>
      {showProgress && progress !== undefined && (
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
