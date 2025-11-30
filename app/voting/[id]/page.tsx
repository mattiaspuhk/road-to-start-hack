"use client";

import { useState, use } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  VoteHeroSection,
  VotingPowerCard,
  VoteOptionsSection,
  VoteDetailsCard,
  VoteDocumentsCard,
} from "@/components/sections/voting";
import { mockVoteData } from "@/lib/voting";

interface VoteDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function VoteDetailPage({ params }: VoteDetailPageProps) {
  const { id } = use(params);
  const data = mockVoteData[id as keyof typeof mockVoteData] || mockVoteData["1"];

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(data.userHolding.hasVoted);

  const { vote, userHolding } = data;

  const votingPower = (userHolding.shares / vote.totalShares) * 100;
  const participationRate = (vote.votedShares / vote.totalShares) * 100;

  const endsAt = new Date(vote.endsAt);
  const now = new Date();
  const daysRemaining = Math.max(
    0,
    Math.ceil((endsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  );

  const handleSubmitVote = () => {
    if (!selectedOption) return;
    setHasSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <VoteHeroSection data={data} daysRemaining={daysRemaining}>
        <VotingPowerCard
          data={data}
          votingPower={votingPower}
          participationRate={participationRate}
          daysRemaining={daysRemaining}
        />
      </VoteHeroSection>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12">
          <div>
            <VoteOptionsSection
              data={data}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              hasSubmitted={hasSubmitted}
              votingPower={votingPower}
              onSubmitVote={handleSubmitVote}
            />
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <VoteDetailsCard data={data} />
              <VoteDocumentsCard data={data} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
