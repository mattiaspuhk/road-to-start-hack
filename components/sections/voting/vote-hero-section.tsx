"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Vote, CheckCircle, Clock } from "lucide-react";
import { VoteData } from "@/lib/voting";

interface VoteHeroSectionProps {
  data: VoteData;
  daysRemaining: number;
  children?: React.ReactNode;
}

export function VoteHeroSection({
  data,
  daysRemaining,
  children,
}: VoteHeroSectionProps) {
  const { vote, company } = data;

  return (
    <section className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/voting"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to votes
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge
                variant="outline"
                className="text-xs gap-1.5 border-white/20 text-white/80 bg-white/5"
              >
                <Vote className="w-3 h-3" />
                Shareholder Vote
              </Badge>
              {vote.status === "active" && (
                <Badge
                  variant="outline"
                  className="text-xs gap-1.5 border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                >
                  <CheckCircle className="w-3 h-3" />
                  Active
                </Badge>
              )}
              <Badge
                variant="outline"
                className="text-xs gap-1.5 border-white/20 text-white/80 bg-white/5"
              >
                <Clock className="w-3 h-3" />
                {daysRemaining} days left
              </Badge>
            </div>

            <p className="text-sm text-white/50 uppercase tracking-wider mb-2">
              {company.name}
            </p>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              {vote.title}
            </h1>

            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl mb-6">
              {vote.description}
            </p>
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}
