"use client";

import { useState, useEffect } from "react";
import { mockOpportunities, type Opportunity } from "@/lib/opportunities";
import {
  getAllStartups,
  type BlockchainStartup,
} from "@/lib/web3/registry";

/**
 * Convert a blockchain startup to an Opportunity format
 */
function blockchainToOpportunity(startup: BlockchainStartup): Opportunity {
  return {
    // Use blockchain ID prefixed to distinguish from mock IDs
    id: `chain-${startup.id}`,
    name: startup.name,
    tagline: "Registered on blockchain",
    sector: "Blockchain",
    vertical: "On-Chain Startup",
    stage: "Registered",
    location: "Decentralized",
    foundingYear: startup.createdAt.getFullYear(),
    sharesAvailablePercent: 0,
    valuation: "TBD",
    minInvestment: 0,
    runwayMonths: 0,
    fundingProgress: 0,
    euDomiciled: true,
    audited: false,
    founderName: `${startup.founder.slice(0, 6)}...${startup.founder.slice(-4)}`,
    founderTitle: "Founder",
    sharePrice: 0,
    priceHistory: [],
    votingPremium: 0,
    votingPremiumType: "percentage",
    startupId: startup.id, // Link to blockchain
  };
}

interface UseOpportunitiesResult {
  opportunities: Opportunity[];
  blockchainStartups: BlockchainStartup[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Hook to fetch and combine mock opportunities with blockchain startups
 */
export function useOpportunities(): UseOpportunitiesResult {
  const [blockchainStartups, setBlockchainStartups] = useState<BlockchainStartup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlockchainData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const startups = await getAllStartups();
      setBlockchainStartups(startups);
    } catch (err) {
      const error = err as Error;
      console.error("Failed to fetch blockchain startups:", error);
      setError(error.message || "Failed to load blockchain data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockchainData();
  }, []);

  // Combine mock opportunities with blockchain startups
  // Blockchain startups appear first (newest registrations)
  const blockchainOpportunities = blockchainStartups.map(blockchainToOpportunity);
  const opportunities = [...blockchainOpportunities, ...mockOpportunities];

  return {
    opportunities,
    blockchainStartups,
    isLoading,
    error,
    refresh: fetchBlockchainData,
  };
}

/**
 * Hook to fetch only blockchain startups (without mock data)
 */
export function useBlockchainStartups() {
  const [startups, setStartups] = useState<BlockchainStartup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getAllStartups();
      setStartups(data);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Failed to load");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { startups, isLoading, error, refresh: fetch };
}
