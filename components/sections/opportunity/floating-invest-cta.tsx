"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, TrendingUp, Minus, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FloatingInvestCTAProps {
  investmentAmount: number;
  onInvestmentChange: (amount: number) => void;
  ownershipPercentage: string;
  sharesFromInvestment: number;
  pricePerShare: number;
  currency: string;
  minInvestment: number;
  maxInvestment: number;
  triggerRef: React.RefObject<HTMLElement | null>;
  hideRef: React.RefObject<HTMLElement | null>;
  companyName?: string;
  votingPremium: number;
  votingPremiumType: "percentage" | "fixed";
  totalShares: number;
}

export function FloatingInvestCTA({
  investmentAmount,
  onInvestmentChange,
  ownershipPercentage,
  sharesFromInvestment,
  pricePerShare,
  currency,
  minInvestment,
  maxInvestment,
  triggerRef,
  companyName = "Company",
  votingPremium,
  votingPremiumType,
  totalShares,
}: FloatingInvestCTAProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState(investmentAmount.toString());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withVotingRights, setWithVotingRights] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  // Calculate voting rights price
  const votingPrice =
    votingPremiumType === "percentage"
      ? pricePerShare * (1 + votingPremium)
      : pricePerShare + votingPremium;

  // Calculate shares and ownership based on selected share type
  const effectivePrice = withVotingRights ? votingPrice : pricePerShare;
  const effectiveShares = Math.floor(investmentAmount / effectivePrice);
  const effectiveOwnership = ((effectiveShares / totalShares) * 100).toFixed(4);

  useEffect(() => {
    setInputValue(investmentAmount.toString());
  }, [investmentAmount]);

  useEffect(() => {
    const triggerEl = triggerRef.current;

    if (!triggerEl) return;

    const handleScroll = () => {
      const triggerRect = triggerEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const pastTrigger = triggerRect.bottom < viewportHeight * 0.5;

      if (pastTrigger && !isVisible) {
        setIsVisible(true);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [triggerRef, isVisible]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setInputValue(value);

    const numValue = parseInt(value) || 0;
    if (numValue >= minInvestment && numValue <= maxInvestment) {
      onInvestmentChange(numValue);
    }
  };

  const handleInputBlur = () => {
    let numValue = parseInt(inputValue) || minInvestment;
    numValue = Math.max(minInvestment, Math.min(maxInvestment, numValue));
    setInputValue(numValue.toString());
    onInvestmentChange(numValue);
  };

  const adjustAmount = (delta: number) => {
    const step = 50;
    const newAmount = Math.max(
      minInvestment,
      Math.min(maxInvestment, investmentAmount + delta * step)
    );
    onInvestmentChange(newAmount);
  };

  const handleCommit = () => {
    setIsModalOpen(true);
  };

  const handleConfirmInvestment = () => {
    console.log("Investment confirmed:", {
      amount: investmentAmount,
      shares: sharesFromInvestment,
      withVotingRights,
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`fixed bottom-4 left-0 right-0 z-50 pointer-events-none transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div
          className={`flex justify-center px-4 pb-2 ${
            isVisible ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div
            ref={barRef}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            className="relative bg-foreground/95 backdrop-blur-2xl border border-border/60 rounded-2xl shadow-2xl ring-1 ring-white/10 overflow-hidden"
          >
            <div
              className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isExpanded ? "px-6 py-4" : "px-5 py-3"
              }`}
            >
              <div className="flex items-center gap-5">
                <div
                  className={`flex-shrink-0 rounded-full bg-primary flex items-center justify-center transition-all duration-500 ease-out ${
                    isExpanded ? "w-12 h-12" : "w-10 h-10"
                  }`}
                >
                  <TrendingUp
                    className={`text-primary-foreground transition-all duration-500 ${
                      isExpanded ? "w-6 h-6" : "w-5 h-5"
                    }`}
                  />
                </div>

                <div
                  className={`flex items-center gap-5 transition-all duration-500 ease-out ${
                    isExpanded
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto"
                  }`}
                >
                  <div className="min-w-[100px]">
                    <p className="text-xs text-background/60">Invest</p>
                    <p className="text-xl text-background font-semibold">
                      {currency}
                      {investmentAmount.toLocaleString()}
                    </p>
                  </div>

                  <div className="h-10 w-px bg-background/20" />

                  <div className="min-w-[80px]">
                    <p className="text-xs text-background/60">Shares</p>
                    <p className="text-xl text-background font-semibold">
                      {sharesFromInvestment.toLocaleString()}
                    </p>
                  </div>

                  <div className="h-10 w-px bg-background/20" />

                  <div className="min-w-[80px]">
                    <p className="text-xs text-background/60">Ownership</p>
                    <p className="text-xl text-background font-semibold">
                      {ownershipPercentage}%
                    </p>
                  </div>

                  <div className="text-background/40 text-sm pl-2 whitespace-nowrap">
                    Hover to invest →
                  </div>
                </div>

                <div
                  className={`flex items-center gap-5 transition-all duration-500 ease-out ${
                    isExpanded
                      ? "opacity-100 w-auto"
                      : "opacity-0 w-0 overflow-hidden"
                  }`}
                >
                  <div className={isExpanded ? "" : "hidden"}>
                    <p className="text-xs text-background/60 mb-1">
                      Investment Amount
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => adjustAmount(-1)}
                        className="w-8 h-8 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-4 h-4 text-background" />
                      </button>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-background/60 text-lg">
                          {currency}
                        </span>
                        <input
                          type="text"
                          value={inputValue}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          className="w-28 bg-background/10 border border-background/20 rounded-lg px-3 pl-7 py-2 text-xl font-semibold text-background text-center focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <button
                        onClick={() => adjustAmount(1)}
                        className="w-8 h-8 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4 text-background" />
                      </button>
                    </div>
                    <p className="text-xs text-background/40 mt-1">
                      {currency}
                      {minInvestment} - {currency}
                      {maxInvestment.toLocaleString()}
                    </p>
                  </div>

                  <div
                    className={`h-14 w-px bg-background/20 transition-opacity duration-300 ${
                      isExpanded ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <div
                    className={`text-center min-w-[90px] ${
                      isExpanded ? "" : "hidden"
                    }`}
                  >
                    <p className="text-xs text-background/60 mb-1">You Get</p>
                    <p className="text-2xl text-background font-semibold">
                      {sharesFromInvestment.toLocaleString()}
                    </p>
                    <p className="text-xs text-background/40">shares</p>
                  </div>

                  <div
                    className={`h-14 w-px bg-background/20 transition-opacity duration-300 ${
                      isExpanded ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <div
                    className={`text-center min-w-[90px] ${
                      isExpanded ? "" : "hidden"
                    }`}
                  >
                    <p className="text-xs text-background/60 mb-1">Ownership</p>
                    <p className="text-2xl text-background font-semibold">
                      {ownershipPercentage}%
                    </p>
                    <p className="text-xs text-background/40">
                      @{currency}
                      {pricePerShare}/share
                    </p>
                  </div>

                  <div
                    className={`h-14 w-px bg-background/20 transition-opacity duration-300 ${
                      isExpanded ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <Button
                    size="lg"
                    onClick={handleCommit}
                    className={`bg-background text-foreground hover:bg-background/90 text-base px-8 py-6 rounded-xl transition-all duration-300 ${
                      isExpanded
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 hidden"
                    }`}
                  >
                    Commit {currency}
                    {investmentAmount.toLocaleString()}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Confirm Investment</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <p className="text-sm font-medium">Share Type</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setWithVotingRights(false)}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  !withVotingRights
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/50"
                }`}
              >
                {!withVotingRights && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div className="text-left">
                  <p className="font-medium">Without Voting Rights</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Economic interest only
                  </p>
                  <p className="text-sm font-semibold text-primary mt-2">
                    {currency}
                    {pricePerShare.toFixed(2)}/share
                  </p>
                </div>
              </button>
              <button
                onClick={() => setWithVotingRights(true)}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  withVotingRights
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/50"
                }`}
              >
                {withVotingRights && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div className="text-left">
                  <p className="font-medium">With Voting Rights</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Participate in company decisions
                  </p>
                  <p className="text-sm font-semibold text-primary mt-2">
                    {currency}
                    {votingPrice.toFixed(2)}/share
                  </p>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-6 py-4">
            <div className="bg-muted/50 rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Company</span>
                <span className="font-medium">{companyName}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Investment</span>
                <span className="font-semibold text-lg font-mono">
                  {currency}
                  {investmentAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Shares</span>
                <span className="font-medium font-mono">
                  {effectiveShares.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Price per share</span>
                <span className="font-medium font-mono">
                  {currency}
                  {effectivePrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Ownership</span>
                <span className="font-medium font-mono">
                  {effectiveOwnership}%
                </span>
              </div>
            </div>
            <Button
              onClick={handleConfirmInvestment}
              className="w-full py-6 text-base"
              size="lg"
            >
              Confirm Investment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By confirming, you agree to the investment terms and conditions
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
