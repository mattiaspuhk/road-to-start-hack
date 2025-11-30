"use client";

import { Scale } from "lucide-react";
import { VoteData } from "@/lib/voting";

interface VotingPowerCardProps {
  data: VoteData;
  votingPower: number;
  participationRate: number;
  daysRemaining: number;
}

export function VotingPowerCard({
  data,
  votingPower,
  participationRate,
  daysRemaining,
}: VotingPowerCardProps) {
  const { vote, userHolding } = data;

  // Find the leading option
  const sortedOptions = [...vote.options].sort((a, b) => b.shares - a.shares);
  const leadingOption = sortedOptions[0];
  const leadingPercentage =
    vote.votedShares > 0 ? (leadingOption.shares / vote.votedShares) * 100 : 0;

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-white/50 uppercase tracking-wider mb-1">
            Current Leading
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl md:text-4xl font-serif text-white">
              {leadingOption.label}
            </span>
            <span className="text-sm font-medium font-mono text-emerald-400">
              {leadingPercentage.toFixed(1)}%
            </span>
          </div>
          <p className="text-xs text-white/40 mt-1">
            {leadingOption.shares.toLocaleString()} shares voted
          </p>
        </div>
      </div>

      {/* Vote Distribution Visualization */}
      <div className="mt-6 space-y-3">
        <p className="text-xs text-white/50 uppercase tracking-wider">
          Vote Distribution
        </p>
        {sortedOptions.map((option) => {
          const percentage =
            vote.votedShares > 0 ? (option.shares / vote.votedShares) * 100 : 0;
          const isLeading = option.id === leadingOption.id;

          return (
            <div key={option.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span
                  className={
                    isLeading ? "text-white font-medium" : "text-white/70"
                  }
                >
                  {option.label}
                </span>
                <span
                  className={`font-mono text-xs ${
                    isLeading ? "text-emerald-400" : "text-white/50"
                  }`}
                >
                  {percentage.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    isLeading ? "bg-primary" : "bg-white/30"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
        <div>
          <p className="text-xs text-white/40 mb-1">Time Left</p>
          <p className="text-lg font-medium font-mono text-white">
            {daysRemaining}d
          </p>
        </div>
        <div>
          <p className="text-xs text-white/40 mb-1">Voters</p>
          <p className="text-lg font-medium font-mono text-white">
            {vote.totalVotes.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-white/40 mb-1">Participation</p>
          <p className="text-lg font-medium font-mono text-white">
            {participationRate.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Your Voting Power */}
      <div className="mt-6 p-4 bg-white/5 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Scale className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-white/50">Your Voting Power</p>
            <p className="text-xl font-mono text-white font-medium">
              {votingPower.toFixed(4)}%
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/50">
            {userHolding.shares.toLocaleString()} shares
          </span>
          <span
            className={
              userHolding.hasVotingRights ? "text-emerald-400" : "text-rose-400"
            }
          >
            {userHolding.hasVotingRights ? "Eligible to vote" : "Not eligible"}
          </span>
        </div>
      </div>
    </div>
  );
}
