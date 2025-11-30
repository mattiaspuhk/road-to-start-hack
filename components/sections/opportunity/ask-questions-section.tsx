"use client";

import { useState } from "react";
import { ArrowRight, Loader2, AlertCircle, Bot } from "lucide-react";
import type { TractionItem, TeamMember } from "@/lib/opportunity-detail-types";

const suggestedQuestions = [
  "What are the main risks?",
  "Show me the traction metrics",
  "What's the exit strategy?",
  "Who are the competitors?",
  "Explain the business model",
  "What makes this team special?",
];

export interface OpportunityContext {
  tagline: string;
  sector?: string;
  stage?: string;
  valuation: string;
  story: string;
  eli5Points: string[];
  traction: TractionItem[];
  bullCase: string[];
  bearCase: string[];
  teamMembers: TeamMember[];
}

interface AskQuestionsSectionProps {
  companyName: string;
  question: string;
  onQuestionChange: (question: string) => void;
  opportunityContext: OpportunityContext;
}

export function AskQuestionsSection({
  companyName,
  question,
  onQuestionChange,
  opportunityContext,
}: AskQuestionsSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e?: React.FormEvent, questionOverride?: string) => {
    e?.preventDefault();

    const questionToSubmit = questionOverride || question;
    if (!questionToSubmit.trim()) return;

    setIsLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const response = await fetch("/api/ask-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: questionToSubmit.trim(),
          companyName,
          opportunityContext,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get answer");
      }

      setAnswer(data.answer);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to get answer. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (q: string) => {
    onQuestionChange(q);
    handleSubmit(undefined, q);
  };

  const handleClearAnswer = () => {
    setAnswer(null);
    setError(null);
    onQuestionChange("");
  };

  return (
    <section className="mb-20 p-8 bg-muted/30 rounded-3xl border border-border">
      <h2 className="text-xl font-serif text-foreground mb-6">
        Have questions about {companyName}?
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="relative mb-6">
          <input
            type="text"
            value={question}
            onChange={(e) => onQuestionChange(e.target.value)}
            placeholder={`Ask anything about ${companyName}...`}
            disabled={isLoading}
            className="w-full px-5 py-4 pr-14 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-lg disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>

      {!answer && !isLoading && (
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSuggestedQuestion(q)}
              disabled={isLoading}
              className="text-sm px-4 py-2 bg-background border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="mt-6 p-6 bg-background rounded-xl border border-border">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Researching your question...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mt-6 p-6 bg-destructive/10 rounded-xl border border-destructive/20">
          <div className="flex items-start gap-3 text-destructive">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-sm underline mt-2 hover:no-underline"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Answer Display */}
      {answer && (
        <div className="mt-6 p-6 bg-background rounded-xl border border-border">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground mb-1">AI Answer</p>
              <div className="text-foreground/80 whitespace-pre-wrap">{answer}</div>
            </div>
          </div>

          {/* AI Disclaimer */}
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              This answer was researched and generated by AI. Always verify information before making investment decisions.
            </p>
          </div>

          {/* Ask Another Question */}
          <button
            onClick={handleClearAnswer}
            className="mt-4 text-sm text-primary hover:underline"
          >
            Ask another question
          </button>
        </div>
      )}
    </section>
  );
}
