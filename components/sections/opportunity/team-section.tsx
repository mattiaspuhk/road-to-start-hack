import { Users, TrendingUp } from "lucide-react";
import type { TeamMember } from "@/lib/opportunity-detail-types";

interface TeamSectionProps {
  members: TeamMember[];
  founderOwnership: number;
}

export function TeamSection({ members, founderOwnership }: TeamSectionProps) {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <Users className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-serif text-foreground">The Team</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {members.map((member, i) => (
          <div
            key={i}
            className="flex items-start gap-5 p-6 bg-card rounded-2xl border border-border"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
              <span className="font-serif text-xl text-primary">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">
                {member.name}
              </p>
              <p className="text-sm text-primary mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">
                {member.background}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <TrendingUp className="w-4 h-4" />
        Founders retain {founderOwnership}% ownership
      </div>
    </section>
  );
}
