import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Opportunity } from "@/lib/opportunities";

interface HeroSectionProps {
  opportunity: Opportunity;
}

export const HeroSection = ({ opportunity }: HeroSectionProps) => {
  return (
    <section className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-2xl">
          <span className="inline-block text-xs uppercase tracking-widest text-white/50 mb-3">
            Editors Pick • {opportunity.stage}
          </span>

          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
            {opportunity.impactHeadline}
          </h1>

          <p className="text-white/70 text-base mb-6 leading-relaxed">
            {opportunity.businessHook}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mb-6">
            <span>Backed by {opportunity.leadInvestor}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>{opportunity.stage}</span>
          </div>

          <Link
            href={`/opportunity/${opportunity.id}`}
            className="inline-flex items-center gap-3 text-white border-b border-white/30 pb-1 hover:border-white transition-colors group"
          >
            <span className="font-medium">
              Read more about this opportunity
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
