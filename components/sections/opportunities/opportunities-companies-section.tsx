import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { PriceGraph } from "@/components/ui/price-graph";
import { Opportunity } from "@/lib/opportunities";
import { collections } from "@/lib/opportunities";

const getCompanyImage = (opp: Opportunity) => {
  const imageMap: Record<string, string> = {
    "1": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=200&fit=crop&crop=center", // SkyMed - drone
    "2": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=200&h=200&fit=crop&crop=center", // GreenGrid - solar
    "3": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=200&h=200&fit=crop&crop=center", // FarmSense - agriculture
    "4": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop&crop=center", // SecureID - security
    "5": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop&crop=center", // MediBot - medical
    "6": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop&crop=center", // CircularPack - packaging
    "7": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=200&fit=crop&crop=center", // Mistral AI - AI/tech
    "8": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop&crop=center", // EduFlow - education
    "9": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop&crop=center", // PropTech - building
    "10": "https://images.unsplash.com/photo-1556910103-2c027eb7e2cf?w=200&h=200&fit=crop&crop=center", // FoodWaste AI - restaurant
    "11": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=200&fit=crop&crop=center", // MobilityHub - transport
    "12": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=200&fit=crop&crop=center", // CarbonLedger - data/tech
    "13": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=200&h=200&fit=crop&crop=center", // BioPharm - lab
    "14": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&h=200&fit=crop&crop=center", // QuantumSecure - tech
    "15": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=200&h=200&fit=crop&crop=center", // AgriData - farming
    "16": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop&crop=center", // FinFlow - finance
    "17": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=200&fit=crop&crop=center", // HealthMonitor - medical device
    "18": "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=200&h=200&fit=crop&crop=center", // WindOpt - wind energy
    "19": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=200&fit=crop&crop=center", // BlockchainPay - crypto
    "20": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=200&fit=crop&crop=center", // RoboCare - robot
    "21": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&crop=center", // WaterSense - water
    "22": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop&crop=center", // LearnAI - education
    "23": "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=200&h=200&fit=crop&crop=center", // SmartGrid - energy grid
    "24": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=200&h=200&fit=crop&crop=center", // MedSupply - pharma
    "25": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop&crop=center", // InsurTech - insurance
    "26": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=200&h=200&fit=crop&crop=center", // AgriRobotics - farming robot
    "27": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&h=200&fit=crop&crop=center", // DeepCode - coding
    "28": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&crop=center", // RecycleAI - recycling
    "29": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=200&fit=crop&crop=center", // TeleHealth - telemedicine
    "30": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&h=200&fit=crop&crop=center", // NeuralLink - brain tech
  };
  return (
    imageMap[opp.id] ||
    `https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&h=200&fit=crop&crop=center`
  );
};

interface OpportunitiesCompaniesProps {
  opportunities: Opportunity[];
  activeCollection: string | null;
  setActiveCollection: (collectionId: string | null) => void;
  isListView?: boolean;
}

export const OpportunitiesCompaniesSection = ({
  opportunities,
  activeCollection,
  setActiveCollection,
  isListView = false,
}: OpportunitiesCompaniesProps) => {
  const collectionTitle = activeCollection
    ? collections.find((c) => c.id === activeCollection)?.title
    : "Investment Briefs";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-foreground">
          {collectionTitle}
        </h2>
        <span className="text-sm text-muted-foreground">
          {opportunities.length}{" "}
          {opportunities.length === 1 ? "opportunity" : "opportunities"}
        </span>
      </div>

      {isListView ? (
        <div className="space-y-3">
          {opportunities.map((opp) => {
            const isUpward = opp.sharePrice > opp.priceHistory[0];
            const priceChange =
              ((opp.sharePrice - opp.priceHistory[0]) / opp.priceHistory[0]) *
              100;

            return (
              <article
                key={opp.id}
                className="group bg-card hover:bg-muted/30 border border-border rounded-lg transition-all duration-300 hover:shadow-md"
              >
                <Link
                  href={`/opportunity/${opp.id}`}
                  className="flex items-center gap-4 p-4"
                >
                  <div className="w-14 h-14 rounded-lg bg-muted shrink-0 overflow-hidden relative ring-1 ring-border/50">
                    <Image
                      src={getCompanyImage(opp)}
                      alt={opp.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                          {opp.sector}
                        </span>
                        <span className="text-muted-foreground/40">•</span>
                        <span className="text-xs text-muted-foreground">
                          {opp.location}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {opp.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {opp.tagline}
                      </p>
                    </div>
                    <div className="hidden md:block text-center">
                      <div className="text-sm font-bold text-foreground mb-1">
                        {opp.valuation}
                      </div>
                      <div className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-foreground inline-block">
                        {opp.stage}
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-lg font-extrabold text-foreground">
                          €{opp.sharePrice.toFixed(2)}
                        </span>
                        {isUpward ? (
                          <TrendingUp className="w-4 h-4 text-foreground/60" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-foreground/60" />
                        )}
                      </div>
                      <span className="text-sm font-semibold text-foreground/70">
                        {isUpward ? "+" : ""}
                        {priceChange.toFixed(1)}%
                      </span>
                    </div>
                    <div className="hidden md:block w-24">
                      <PriceGraph
                        priceHistory={opp.priceHistory}
                        currentPrice={opp.sharePrice}
                      />
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {opportunities.map((opp) => {
            const isUpward = opp.sharePrice > opp.priceHistory[0];
            const priceChange =
              ((opp.sharePrice - opp.priceHistory[0]) / opp.priceHistory[0]) *
              100;

            return (
              <article
                key={opp.id}
                className="group bg-card hover:bg-muted/20 border border-border rounded-lg transition-all duration-300 hover:shadow-md hover:border-primary/20 overflow-hidden"
              >
                <Link href={`/opportunity/${opp.id}`} className="block p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-lg bg-muted shrink-0 overflow-hidden relative ring-1 ring-border/50">
                        <Image
                          src={getCompanyImage(opp)}
                          alt={opp.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                            {opp.sector}
                          </span>
                          <span className="text-muted-foreground/40">•</span>
                          <span className="text-xs text-muted-foreground">
                            {opp.location}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors leading-tight">
                          {opp.name}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-foreground">
                            {opp.valuation}
                          </span>
                          <span className="text-muted-foreground/40">•</span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-foreground">
                            {opp.stage}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {opp.businessHook || opp.tagline}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted/30 rounded-lg p-3 border border-border/50">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-2xl font-extrabold text-foreground">
                          €{opp.sharePrice.toFixed(2)}
                        </span>
                        {isUpward ? (
                          <TrendingUp className="w-5 h-5 text-foreground/60" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-foreground/60" />
                        )}
                      </div>
                      <span className="text-sm font-semibold text-foreground/70">
                        {isUpward ? "+" : ""}
                        {priceChange.toFixed(1)}% (30d)
                      </span>
                    </div>
                    <div className="h-[80px]">
                      <PriceGraph
                        priceHistory={opp.priceHistory}
                        currentPrice={opp.sharePrice}
                        className="h-full"
                      />
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      )}

      {opportunities.length === 0 && (
        <div className="text-center py-16 bg-card rounded-lg border border-border">
          <p className="text-muted-foreground mb-2">
            No opportunities in this collection
          </p>
          <button
            onClick={() => setActiveCollection(null)}
            className="text-sm text-primary hover:underline"
          >
            View all opportunities
          </button>
        </div>
      )}
    </section>
  );
};
