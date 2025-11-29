import { collections } from "@/lib/opportunities";

interface CollectionsSectionProps {
  activeCollection: string | null;
  setActiveCollection: (collectionId: string | null) => void;
}

export const CollectionsSection = ({
  activeCollection,
  setActiveCollection,
}: CollectionsSectionProps) => {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
          Thematic Collections
        </h2>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveCollection(null)}
            className={`flex items-center gap-3 px-5 py-3 rounded-lg border transition-all ${
              activeCollection === null
                ? "bg-foreground text-background border-foreground"
                : "bg-background border-border hover:border-foreground/30"
            }`}
          >
            <span className="text-sm font-medium">All Opportunities</span>
          </button>

          {collections.map((collection) => (
            <button
              key={collection.id}
              onClick={() => setActiveCollection(collection.id)}
              className={`flex items-center gap-3 px-5 py-3 rounded-lg border transition-all ${
                activeCollection === collection.id
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background border-border hover:border-foreground/30"
              }`}
            >
              {collection.icon}
              <div className="text-left">
                <span className="text-sm font-medium block">
                  {collection.title}
                </span>
                <span className="text-xs opacity-60 hidden sm:block">
                  {collection.description}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
