import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  TrendingUp,
  BarChart3,
  Calculator,
  Target,
  ClipboardCheck,
} from "lucide-react";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-2xl md:text-4xl font-bold leading-tight text-white mb-4">
            How Startup Valuation Works
          </h1>

          <p className="text-base text-white/70 leading-relaxed max-w-3xl">
            Understanding how startups are valued is essential for founders
            planning a fundraising round and for investors evaluating
            opportunities. Unlike mature companies, early-stage startups rarely
            have stable cash flows, long financial histories, or proven market
            positions. As a result, valuation focuses on potential rather than
            past performance.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <section className="group">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-2">
                  1. Comparable Company Analysis (Market Approach)
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  This method looks at how similar companies in the same
                  industry and stage are valued. Investors compare metrics like
                  revenue multiples (e.g., &ldquo;5× annual revenue&rdquo;),
                  active users, or other traction indicators. For startups, this
                  approach is fast, intuitive, and strongly market-driven: the
                  value reflects what others are willing to pay today for a
                  comparable business. It&apos;s one of the most common methods
                  in seed and Series A rounds.
                </p>
              </div>
            </div>
          </section>

          <section className="group">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-2">
                  2. Transaction Multiples (Comparable Deals)
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Instead of comparing to public companies, this method uses
                  valuation data from recent fundraising rounds or acquisitions
                  of similar startups. If early-stage fintech startups with
                  similar traction raised capital at a €10M valuation, that data
                  point anchors your own valuation range. This approach gives
                  founders a real-world benchmark of current investor appetite.
                </p>
              </div>
            </div>
          </section>

          <section className="group">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-2">
                  3. Discounted Cash Flow (DCF)
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  DCF projects a company&apos;s future revenues, margins, and
                  cash flows and then discounts them back to today&apos;s value.
                  Although powerful, it is rarely used alone for very
                  early-stage companies because long-term forecasts are highly
                  uncertain. It becomes more relevant for later-stage startups
                  with predictable revenue models (SaaS, marketplaces,
                  subscription businesses).
                </p>
              </div>
            </div>
          </section>

          <section className="group">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-2">
                  4. The Venture Capital Method
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Widely used in early-stage investing, the VC Method starts
                  with an expected exit value (e.g., an IPO or acquisition in
                  5–7 years), applies the investor&apos;s target return (often
                  5–10×), and works backwards to derive the valuation today.
                  This ensures alignment between founder expectations and
                  investor return requirements.
                </p>
              </div>
            </div>
          </section>

          <section className="group">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <ClipboardCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-2">
                  5. Scorecard & Berkus Methods (Pre-Revenue Valuation)
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  For very early ideas or pre-revenue projects, structured
                  frameworks like the <strong>Scorecard Method</strong> and{" "}
                  <strong>Berkus Method</strong> help estimate value by
                  evaluating qualitative factors: team quality, product
                  readiness, market size, traction, and competitive landscape.
                  These methods prevent unrealistically high valuations when
                  financial data is still limited.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
