"use client";

import { Calendar, Users, Scale } from "lucide-react";
import { VoteData } from "@/lib/voting";

interface VoteDetailsCardProps {
  data: VoteData;
}

export function VoteDetailsCard({ data }: VoteDetailsCardProps) {
  const { vote } = data;
  const endsAt = new Date(vote.endsAt);

  const participationRate = (vote.votedShares / vote.totalShares) * 100;

  return (
    <div className="bg-gradient-to-br from-muted/80 to-muted/30 rounded-2xl border border-border p-6">
      <h3 className="text-lg font-serif text-foreground mb-6">Vote Details</h3>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Deadline</span>
          </div>
          <span className="text-sm font-medium text-foreground">
            {endsAt.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-sm">Voters</span>
          </div>
          <span className="text-sm font-medium text-foreground">
            {vote.totalVotes.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Scale className="w-4 h-4" />
            <span className="text-sm">Quorum</span>
          </div>
          <span className="text-sm font-medium text-foreground">50%</span>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Participation</span>
            <span className="text-xs font-medium text-foreground">
              {participationRate.toFixed(1)}%
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${participationRate}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
