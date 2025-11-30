"use client";

import { useState, useEffect, use } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  User,
  Calendar,
  Hash,
  Shield,
  AlertCircle,
  Users,
  RefreshCw,
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

export default function StartupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [startup, setStartup] = useState<StartupData | null>(null);
  const [capTable, setCapTable] = useState<CapTableEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStartupData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!isMetaMaskInstalled()) {
        throw new Error(
          "MetaMask is not installed. Please install MetaMask to view startup data."
        );
      }

      const { contract } = await getContract();

      // Fetch startup data
      const startupData = await contract.getStartup(id);
      setStartup({
        founder: startupData[0],
        name: startupData[1],
        createdAt: startupData[2],
        startupHash: startupData[3],
      });

      // Fetch cap table
      const capTableData = await contract.getCapTable(id);
      const holders: string[] = capTableData[0];
      const shares: bigint[] = capTableData[1];

      const entries: CapTableEntry[] = holders.map((holder, index) => ({
        holder,
        shares: shares[index].toString(),
      }));
      setCapTable(entries);
    } catch (err) {
      const error = err as Error;
      console.error("Failed to fetch startup data:", err);
      setError(error.message || "Failed to load startup data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStartupData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading startup data...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="glass-card rounded-xl p-8 text-center animate-fade-in">
            <div className="w-16 h-16 mx-auto bg-destructive/20 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Failed to Load</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={fetchStartupData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}

        {/* Startup Data */}
        {startup && !isLoading && !error && (
          <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Hash className="w-4 h-4" />
                Startup ID: {id}
              </div>
              <h1 className="text-4xl font-bold text-foreground">
                {startup.name}
              </h1>
            </div>

            {/* Startup Details Card */}
            <div className="glass-card rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Startup Details
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Founder */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <User className="w-4 h-4" />
                    Founder Address
                  </div>
                  <div className="font-mono text-sm bg-muted/50 rounded-lg p-3 break-all">
                    <a
                      href={`https://sepolia.etherscan.io/address/${startup.founder}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {startup.founder}
                    </a>
                  </div>
                </div>

                {/* Created At */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    Created At
                  </div>
                  <div className="font-medium bg-muted/50 rounded-lg p-3">
                    {formatDate(startup.createdAt)}
                  </div>
                </div>

                {/* Startup Hash */}
                <div className="sm:col-span-2 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Hash className="w-4 h-4" />
                    Startup Hash (bytes32)
                  </div>
                  <div className="font-mono text-sm bg-muted/50 rounded-lg p-3 break-all">
                    {startup.startupHash}
                  </div>
                </div>
              </div>
            </div>

            {/* Cap Table Card */}
            <div className="glass-card rounded-xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Cap Table
                </h2>
                <Button variant="outline" size="sm" onClick={fetchStartupData}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {capTable.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="font-medium mb-2">No cap table entries</p>
                  <p className="text-sm">
                    The founder can set up the cap table using the smart
                    contract.
                  </p>
                </div>
              ) : (
                <>
                  {/* Summary */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-primary/10 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">
                        Total Shareholders
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {capTable.length}
                      </p>
                    </div>
                    <div className="bg-accent/20 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">
                        Total Shares
                      </p>
                      <p className="text-2xl font-bold text-accent-foreground">
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
                                className="font-mono text-sm text-primary hover:underline"
                              >
                                <span className="hidden sm:inline">
                                  {entry.holder}
                                </span>
                                <span className="sm:hidden">
                                  {formatAddress(entry.holder)}
                                </span>
                              </a>
                            </td>
                            <td className="py-3 px-4 text-right font-medium">
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

            {/* Info Note */}
            <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="font-medium mb-1">Note:</p>
              <p>
                This data is fetched directly from the Sepolia testnet
                blockchain. The cap table can be updated by the contract owner
                using the{" "}
                <code className="bg-muted px-1 rounded">setCapTable</code>{" "}
                function.
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
