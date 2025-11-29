import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Opportunity } from "@/lib/opportunities";

interface HeroSectionProps {
  opportunity: Opportunity;
}

export const HeroSection = ({ opportunity }: HeroSectionProps) => {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `url('/lovable-uploads/drone-hero.jpg'), linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)`,
          backgroundColor: "hsl(222, 47%, 11%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl">
          <span className="inline-block text-xs uppercase tracking-widest text-slate-400 mb-4">
            Editors Pick • {opportunity.stage}
          </span>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            {opportunity.impactHeadline}
          </h1>

          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            {opportunity.businessHook}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-10">
            <span>Backed by {opportunity.leadInvestor}</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>{opportunity.stage}</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>{opportunity.fundingProgress}% Committed</span>
          </div>

          <Link
            href={`/opportunity/${opportunity.id}`}
            className="inline-flex items-center gap-3 text-white border-b border-white/30 pb-1 hover:border-white transition-colors group"
          >
            <span className="font-medium">Read the Investment Memo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
