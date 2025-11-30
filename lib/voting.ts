export interface VoteOption {
  id: string;
  label: string;
  description: string;
  votes: number;
  shares: number;
}

export interface VoteDocument {
  name: string;
  type: string;
}

export interface Vote {
  title: string;
  description: string;
  status: "active" | "closed" | "upcoming";
  endsAt: string;
  totalVotes: number;
  totalShares: number;
  votedShares: number;
  options: VoteOption[];
  documents: VoteDocument[];
}

export interface UserHolding {
  shares: number;
  hasVotingRights: boolean;
  hasVoted: boolean;
  votedOption: string | null;
}

export interface Company {
  name: string;
  logo: string | null;
}

export interface VoteData {
  id: string;
  company: Company;
  vote: Vote;
  userHolding: UserHolding;
}

export const mockVoteData: Record<string, VoteData> = {
  "1": {
    id: "1",
    company: {
      name: "SkyMed Delivery",
      logo: null,
    },
    vote: {
      title: "Series A Funding Round Approval",
      description:
        "The board is proposing to raise a Series A round at a €25M pre-money valuation. This would dilute existing shareholders by approximately 20% but provide 18 months of runway for European expansion.",
      status: "active",
      endsAt: "2024-02-15T23:59:59Z",
      totalVotes: 847,
      totalShares: 1600000,
      votedShares: 523400,
      options: [
        {
          id: "approve",
          label: "Approve Series A",
          description:
            "Accept the proposed €25M valuation and 20% dilution",
          votes: 612,
          shares: 412300,
        },
        {
          id: "reject",
          label: "Reject Proposal",
          description: "Decline the Series A round at current terms",
          votes: 189,
          shares: 87600,
        },
        {
          id: "abstain",
          label: "Abstain",
          description: "Neither approve nor reject",
          votes: 46,
          shares: 23500,
        },
      ],
      documents: [
        { name: "Series A Term Sheet", type: "PDF" },
        { name: "Dilution Analysis", type: "PDF" },
        { name: "Use of Funds Breakdown", type: "PDF" },
      ],
    },
    userHolding: {
      shares: 2500,
      hasVotingRights: true,
      hasVoted: false,
      votedOption: null,
    },
  },
  "2": {
    id: "2",
    company: {
      name: "CarbonLedger",
      logo: null,
    },
    vote: {
      title: "Board Member Election",
      description:
        "Following the resignation of Dr. Hans Mueller, shareholders are asked to elect a new independent board member from the nominated candidates.",
      status: "active",
      endsAt: "2024-02-20T23:59:59Z",
      totalVotes: 234,
      totalShares: 2000000,
      votedShares: 890000,
      options: [
        {
          id: "candidate-a",
          label: "Sarah Chen",
          description:
            "Former CFO at Stripe, 15 years fintech experience",
          votes: 145,
          shares: 567000,
        },
        {
          id: "candidate-b",
          label: "Marcus Weber",
          description:
            "Partner at Sequoia Capital, deep climate-tech expertise",
          votes: 78,
          shares: 298000,
        },
        {
          id: "abstain",
          label: "Abstain",
          description: "Neither approve nor reject",
          votes: 11,
          shares: 25000,
        },
      ],
      documents: [
        { name: "Candidate Profiles", type: "PDF" },
        { name: "Board Composition Overview", type: "PDF" },
      ],
    },
    userHolding: {
      shares: 5000,
      hasVotingRights: true,
      hasVoted: false,
      votedOption: null,
    },
  },
  "3": {
    id: "3",
    company: {
      name: "GreenGrid Energy",
      logo: null,
    },
    vote: {
      title: "Executive Compensation Package",
      description:
        "Shareholders are asked to approve the revised executive compensation package for the CEO and CFO, including stock options vesting over 4 years.",
      status: "active",
      endsAt: "2024-02-25T23:59:59Z",
      totalVotes: 156,
      totalShares: 1800000,
      votedShares: 420000,
      options: [
        {
          id: "approve",
          label: "Approve Package",
          description: "Accept the proposed compensation structure",
          votes: 98,
          shares: 280000,
        },
        {
          id: "reject",
          label: "Reject Package",
          description: "Request revised compensation terms",
          votes: 45,
          shares: 120000,
        },
        {
          id: "abstain",
          label: "Abstain",
          description: "Neither approve nor reject",
          votes: 13,
          shares: 20000,
        },
      ],
      documents: [
        { name: "Compensation Details", type: "PDF" },
        { name: "Industry Benchmark Analysis", type: "PDF" },
      ],
    },
    userHolding: {
      shares: 3200,
      hasVotingRights: true,
      hasVoted: true,
      votedOption: "approve",
    },
  },
};

export const mockVoteList = Object.values(mockVoteData);
