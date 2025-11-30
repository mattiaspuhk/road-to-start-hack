"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Vote,
  CheckCircle,
  Clock,
  ChevronRight,
  Scale,
  Users,
} from "lucide-react";
import { mockVoteList, VoteData } from "@/lib/voting";

function VoteCard({ data }: { data: VoteData }) {
  const { vote, company, userHolding } = data;

  const participationRate = (vote.votedShares / vote.totalShares) * 100;
  const votingPower = (userHolding.shares / vote.totalShares) * 100;

  const endsAt = new Date(vote.endsAt);
  const now = new Date();
  const daysRemaining = Math.max(
    0,
    Math.ceil((endsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  );

  const leadingOption = vote.options.reduce((prev, current) =>
    prev.shares > current.shares ? prev : current
  );

  return (
    <Link
      href={`/voting/${data.id}`}
      className="group block p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {vote.status === "active" && (
              <Badge
                variant="outline"
                className="text-xs gap-1.5 border-emerald-500/30 text-emerald-600 bg-emerald-500/10"
              >
                <CheckCircle className="w-3 h-3" />
                Active
              </Badge>
            )}
            {userHolding.hasVoted && (
              <Badge
                variant="outline"
                className="text-xs gap-1.5 border-primary/30 text-primary bg-primary/10"
              >
                <Vote className="w-3 h-3" />
                Voted
              </Badge>
            )}
            <Badge
              variant="outline"
              className="text-xs gap-1.5 border-border text-muted-foreground"
            >
              <Clock className="w-3 h-3" />
              {daysRemaining} days left
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {company.name}
          </p>
          <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">
            {vote.title}
          </h3>
        </div>

        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {vote.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-muted/50 rounded-xl">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Your Power</p>
            <p className="text-sm font-medium text-foreground">
              {votingPower.toFixed(4)}%
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Participation</p>
            <p className="text-sm font-medium text-foreground">
              {participationRate.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Leading: {leadingOption.label}
          </span>
          <span className="font-medium text-foreground">
            {((leadingOption.shares / vote.votedShares) * 100).toFixed(1)}%
          </span>
        </div>
        <Progress
          value={(leadingOption.shares / vote.votedShares) * 100}
          className="h-1.5 bg-muted [&>div]:bg-primary"
        />
      </div>
    </Link>
  );
}

export default function VotingPage() {
  const activeVotes = mockVoteList.filter((v) => v.vote.status === "active");
  const pendingVotes = activeVotes.filter((v) => !v.userHolding.hasVoted);
  const completedVotes = activeVotes.filter((v) => v.userHolding.hasVoted);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Shareholder Voting
          </h1>

          <p className="text-lg text-white/70 max-w-2xl mb-8">
            Exercise your voting rights as a shareholder. Review proposals from
            companies in your portfolio and cast your votes.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-serif text-white">
                {activeVotes.length}
              </p>
              <p className="text-sm text-white/50">Active Votes</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-serif text-white">
                {pendingVotes.length}
              </p>
              <p className="text-sm text-white/50">Pending Action</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-serif text-white">
                {completedVotes.length}
              </p>
              <p className="text-sm text-white/50">Votes Cast</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-serif text-white">3</p>
              <p className="text-sm text-white/50">Companies</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {pendingVotes.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <h2 className="text-xl font-serif text-foreground">
                Pending Your Vote
              </h2>
              <Badge variant="outline" className="text-xs">
                {pendingVotes.length}
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {pendingVotes.map((vote) => (
                <VoteCard key={vote.id} data={vote} />
              ))}
            </div>
          </section>
        )}

        {completedVotes.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <h2 className="text-xl font-serif text-foreground">Votes Cast</h2>
              <Badge variant="outline" className="text-xs">
                {completedVotes.length}
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {completedVotes.map((vote) => (
                <VoteCard key={vote.id} data={vote} />
              ))}
            </div>
          </section>
        )}

        {activeVotes.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Vote className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-xl text-foreground mb-2">
              No Active Votes
            </h3>
            <p className="text-muted-foreground">
              There are currently no active shareholder votes for companies in
              your portfolio.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
