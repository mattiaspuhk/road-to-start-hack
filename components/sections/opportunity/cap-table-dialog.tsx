"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PieChart,
  Users,
  Building2,
  Coins,
  Wallet,
  Briefcase,
} from "lucide-react";

interface CapTableEntry {
  group: string;
  icon: React.ReactNode;
  votingShares: number;
  nonVotingShares: number;
  color: string;
}

interface CapTableDialogProps {
  companyName: string;
  founderOwnership?: number;
}

export function CapTableDialog({
  companyName,
  founderOwnership = 58,
}: CapTableDialogProps) {
  // Generate realistic cap table data based on founder ownership
  const remainingOwnership = 100 - founderOwnership;

  const capTableData: CapTableEntry[] = [
    {
      group: "Founder Group",
      icon: <Users className="w-4 h-4" />,
      votingShares: Math.round(founderOwnership * 0.85),
      nonVotingShares: Math.round(founderOwnership * 0.15),
      color: "bg-primary",
    },
    {
      group: "Employee Pool",
      icon: <Briefcase className="w-4 h-4" />,
      votingShares: 0,
      nonVotingShares: Math.round(remainingOwnership * 0.25),
      color: "bg-success",
    },
    {
      group: "Institutional Investors",
      icon: <Building2 className="w-4 h-4" />,
      votingShares: Math.round(remainingOwnership * 0.35),
      nonVotingShares: Math.round(remainingOwnership * 0.1),
      color: "bg-chart-1",
    },
    {
      group: "Public Token Holders",
      icon: <Coins className="w-4 h-4" />,
      votingShares: 0,
      nonVotingShares: Math.round(remainingOwnership * 0.15),
      color: "bg-accent",
    },
    {
      group: "Other Early Investors",
      icon: <Wallet className="w-4 h-4" />,
      votingShares: Math.round(remainingOwnership * 0.1),
      nonVotingShares: Math.round(remainingOwnership * 0.05),
      color: "bg-chart-4",
    },
  ];

  const totalVoting = capTableData.reduce(
    (sum, entry) => sum + entry.votingShares,
    0
  );
  const totalNonVoting = capTableData.reduce(
    (sum, entry) => sum + entry.nonVotingShares,
    0
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <PieChart className="w-4 h-4" />
          View Cap Table
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {companyName} Cap Table
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {/* Visual ownership bar */}
          <div className="mb-6">
            <div className="flex h-3 rounded-full overflow-hidden">
              {capTableData.map((entry, index) => {
                const totalOwnership =
                  entry.votingShares + entry.nonVotingShares;
                return (
                  <div
                    key={index}
                    className={`${entry.color} transition-all`}
                    style={{ width: `${totalOwnership}%` }}
                    title={`${entry.group}: ${totalOwnership}%`}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              {capTableData.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${entry.color}`} />
                  <span>{entry.group}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Shareholder Group
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Voting
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Non-Voting
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {capTableData.map((entry, index) => {
                  const total = entry.votingShares + entry.nonVotingShares;
                  return (
                    <tr
                      key={index}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${entry.color} shrink-0`}
                          />
                          <div className="flex items-center gap-2 text-muted-foreground">
                            {entry.icon}
                          </div>
                          <span className="text-sm font-medium">
                            {entry.group}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {entry.votingShares > 0 ? (
                          <span className="text-sm font-mono font-medium">
                            {entry.votingShares}%
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            —
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {entry.nonVotingShares > 0 ? (
                          <span className="text-sm font-mono font-medium">
                            {entry.nonVotingShares}%
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            —
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-sm font-mono font-semibold text-primary">
                          {total}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-muted/30 font-semibold">
                  <td className="py-3 px-4 text-sm">Total</td>
                  <td className="py-3 px-4 text-right text-sm font-mono">
                    {totalVoting}%
                  </td>
                  <td className="py-3 px-4 text-right text-sm font-mono">
                    {totalNonVoting}%
                  </td>
                  <td className="py-3 px-4 text-right text-sm font-mono text-primary">
                    {totalVoting + totalNonVoting}%
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Voting shares</span>{" "}
              grant governance rights including board votes and major decisions.{" "}
              <span className="font-medium text-foreground">
                Non-voting shares
              </span>{" "}
              provide economic participation without governance rights.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
