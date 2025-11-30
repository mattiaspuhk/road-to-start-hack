"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Shield,
  Users,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Hash,
  Calendar,
  User,
} from "lucide-react";
import { getContract, isMetaMaskInstalled } from "@/lib/web3/registry";

interface StartupData {
  founder: string;
  name: string;
  createdAt: bigint;
  startupHash: string;
}

interface CapTableEntry {
  holder: string;
  shares: string;
}

interface OnChainCapTableSectionProps {
  startupId: number;
  companyName: string;
}

export function OnChainCapTableSection({
  startupId,
  companyName,
}: OnChainCapTableSectionProps) {
  const [startup, setStartup] = useState<StartupData | null>(null);
  const [capTable, setCapTable] = useState<CapTableEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!isMetaMaskInstalled()) {
        throw new Error("Connect MetaMask to view on-chain data");
      }

      const { contract } = await getContract();

      // Fetch startup data
      const startupData = await contract.getStartup(startupId);
      setStartup({
        founder: startupData[0],
        name: startupData[1],
        createdAt: startupData[2],
        startupHash: startupData[3],
      });

      // Fetch cap table
      const capTableData = await contract.getCapTable(startupId);
      const holders: string[] = capTableData[0];
      const shares: bigint[] = capTableData[1];

      const entries: CapTableEntry[] = holders.map((holder, index) => ({
        holder,
        shares: shares[index].toString(),
      }));
      setCapTable(entries);
    } catch (err) {
      const error = err as Error;
      console.error("Failed to fetch on-chain data:", err);
      setError(error.message || "Failed to load blockchain data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startupId]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateTotalShares = () => {
    return capTable
      .reduce((sum, entry) => sum + BigInt(entry.shares), BigInt(0))
      .toString();
  };

  const calculateOwnership = (shares: string) => {
    const total = capTable.reduce(
      (sum, entry) => sum + BigInt(entry.shares),
      BigInt(0)
    );
    if (total === BigInt(0)) return "0.00";
    const sharesBI = BigInt(shares);
    const percent = (sharesBI * BigInt(10000)) / total;
    const whole = percent / BigInt(100);
    const decimal = percent % BigInt(100);
    return whole.toString() + "." + decimal.toString().padStart(2, "0");
  };

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">Cap Table</h2>
          <div className="flex items-center gap-1.5 bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            On-Chain Verified
          </div>
        </div>
        {!isLoading && !error && (
          <Button variant="outline" size="sm" onClick={fetchData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="glass-card rounded-xl p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-3" />
          <p className="text-muted-foreground">Loading blockchain data...</p>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="glass-card rounded-xl p-6 border-destructive/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="font-medium mb-1">Unable to load on-chain data</p>
              <p className="text-sm text-muted-foreground mb-3">{error}</p>
              <Button size="sm" onClick={fetchData}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Data Display */}
      {startup && !isLoading && !error && (
        <div className="space-y-6">
          {/* Verification Info */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Blockchain Verification</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <User className="w-3.5 h-3.5" />
                  Founder Address
                </div>
                <a
                  href={`https://sepolia.etherscan.io/address/${startup.founder}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-primary hover:underline flex items-center gap-1"
                >
                  {formatAddress(startup.founder)}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  Registered
                </div>
                <p className="text-sm font-medium">
                  {formatDate(startup.createdAt)}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Hash className="w-3.5 h-3.5" />
                  Startup ID
                </div>
                <p className="text-sm font-mono font-medium">{startupId}</p>
              </div>
            </div>
          </div>

          {/* Cap Table */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Shareholder Registry</h3>
            </div>

            {capTable.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p className="font-medium">No shareholders registered</p>
                <p className="text-sm mt-1">
                  Cap table entries will appear here once set on-chain.
                </p>
              </div>
            ) : (
              <>
                {/* Summary Stats */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-primary/5 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      Total Shareholders
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {capTable.length}
                    </p>
                  </div>
                  <div className="bg-accent/10 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      Total Shares
                    </p>
                    <p className="text-2xl font-bold">
                      {Number(calculateTotalShares()).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          #
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Holder Address
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                          Shares
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                          Ownership
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {capTable.map((entry, index) => (
                        <tr
                          key={entry.holder}
                          className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                        >
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {index + 1}
                          </td>
                          <td className="py-3 px-4">
                            <a
                              href={`https://sepolia.etherscan.io/address/${entry.holder}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-sm text-primary hover:underline flex items-center gap-1"
                            >
                              <span className="hidden sm:inline">
                                {entry.holder}
                              </span>
                              <span className="sm:hidden">
                                {formatAddress(entry.holder)}
                              </span>
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                          </td>
                          <td className="py-3 px-4 text-right font-medium font-mono">
                            {Number(entry.shares).toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right text-muted-foreground">
                            {calculateOwnership(entry.shares)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>

          {/* Footer Note */}
          <p className="text-xs text-muted-foreground text-center">
            Data fetched from Sepolia testnet contract. Startup hash:{" "}
            <span className="font-mono">
              {startup.startupHash.slice(0, 10)}...
            </span>
          </p>
        </div>
      )}
    </section>
  );
}
