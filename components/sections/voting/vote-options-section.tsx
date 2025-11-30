"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Vote, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { VoteData } from "@/lib/voting";

interface VoteOptionsSectionProps {
  data: VoteData;
  selectedOption: string | null;
  setSelectedOption: (option: string | null) => void;
  hasSubmitted: boolean;
  votingPower: number;
  onSubmitVote: () => void;
}

export function VoteOptionsSection({
  data,
  selectedOption,
  setSelectedOption,
  hasSubmitted,
  votingPower,
  onSubmitVote,
}: VoteOptionsSectionProps) {
  const { vote, userHolding } = data;

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-8">
        <Vote className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-serif text-foreground">Cast Your Vote</h2>
      </div>

      {!userHolding.hasVotingRights ? (
        <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground mb-1">
              Voting Not Available
            </p>
            <p className="text-sm text-muted-foreground">
              Your share class does not include voting rights for this proposal.
            </p>
          </div>
        </div>
      ) : hasSubmitted ? (
        <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-4">
          <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground mb-1">Vote Submitted</p>
            <p className="text-sm text-muted-foreground">
              Your vote representing {userHolding.shares.toLocaleString()} shares
              ({votingPower.toFixed(4)}% voting power) has been recorded.
            </p>
          </div>
        </div>
      ) : (
        <RadioGroup
          value={selectedOption || ""}
          onValueChange={setSelectedOption}
          className="space-y-4"
        >
          {vote.options.map((option) => {
            const optionPercentage =
              (option.shares / vote.votedShares) * 100 || 0;

            return (
              <label
                key={option.id}
                className={`relative flex items-start gap-4 p-6 rounded-2xl border cursor-pointer transition-all ${
                  selectedOption === option.id
                    ? "bg-primary/5 border-primary"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value={option.id} className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">
                      {option.label}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {optionPercentage.toFixed(1)}% of votes
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {option.description}
                  </p>
                  <Progress
                    value={optionPercentage}
                    className="h-1.5 bg-muted [&>div]:bg-primary/60"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {option.shares.toLocaleString()} shares &bull; {option.votes}{" "}
                    voters
                  </p>
                </div>
              </label>
            );
          })}
        </RadioGroup>
      )}

      {!hasSubmitted && userHolding.hasVotingRights && (
        <div className="mt-8">
          <div className="p-4 bg-muted/50 rounded-xl mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">
                Your vote weight:{" "}
                <strong className="text-foreground">
                  {userHolding.shares.toLocaleString()} shares
                </strong>{" "}
                ={" "}
                <strong className="text-primary">
                  {votingPower.toFixed(4)}%
                </strong>{" "}
                of total voting power
              </span>
            </div>
          </div>

          <Button
            variant="invest"
            size="xl"
            className="w-full"
            disabled={!selectedOption}
            onClick={onSubmitVote}
          >
            Submit Vote
          </Button>
        </div>
      )}
    </section>
  );
}
