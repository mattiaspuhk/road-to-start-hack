"use client";

import { Badge } from "@/components/ui/badge";
import { VoteData } from "@/lib/voting";

interface VoteDocumentsCardProps {
  data: VoteData;
}

export function VoteDocumentsCard({ data }: VoteDocumentsCardProps) {
  const { vote } = data;

  return (
    <div className="p-6 bg-card rounded-2xl border border-border">
      <h3 className="font-serif text-lg text-foreground mb-4">
        Related Documents
      </h3>

      <div className="space-y-3">
        {vote.documents.map((doc, i) => (
          <button
            key={i}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left"
          >
            <span className="text-sm text-foreground">{doc.name}</span>
            <Badge variant="outline" className="text-xs">
              {doc.type}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
}
