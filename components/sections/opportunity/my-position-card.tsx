import { Wallet, TrendingUp, PieChart } from "lucide-react";

interface MyPositionCardProps {
  sharesOwned: number;
  pricePerShare: number;
  ownershipPercentage: string;
  currency: string;
  companyName: string;
}

export function MyPositionCard({
  sharesOwned,
  pricePerShare,
  ownershipPercentage,
  currency,
  companyName,
}: MyPositionCardProps) {
  const totalValue = sharesOwned * pricePerShare;
  const hasPosition = sharesOwned > 0;

  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-6">
      <h3 className="text-lg font-serif text-foreground mb-6">My Position</h3>

      {hasPosition ? (
        <div className="space-y-5">
          <PositionRow
            icon={<Wallet className="w-4 h-4" />}
            label="Shares Owned"
            value={sharesOwned.toLocaleString()}
          />

          <PositionRow
            icon={<TrendingUp className="w-4 h-4" />}
            label="Current Value"
            value={`${currency}${totalValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            highlight
          />

          <PositionRow
            icon={<PieChart className="w-4 h-4" />}
            label="Ownership"
            value={`${ownershipPercentage}%`}
          />

          <div className="pt-4 border-t border-primary/20">
            <p className="text-xs text-muted-foreground">
              Your stake in {companyName}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            You don't own any shares yet
          </p>
          <p className="text-xs text-muted-foreground">
            Use the calculator below to explore investment options
          </p>
        </div>
      )}
    </div>
  );
}

interface PositionRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}

function PositionRow({ icon, label, value, highlight }: PositionRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span
        className={`text-sm font-medium ${
          highlight ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
