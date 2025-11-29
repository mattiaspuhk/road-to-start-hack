"use client";

import { ArrowRight } from "lucide-react";

const suggestedQuestions = [
  "What are the main risks?",
  "Show me the traction metrics",
  "What's the exit strategy?",
  "Who are the competitors?",
  "Explain the business model",
  "What makes this team special?",
];

interface AskQuestionsSectionProps {
  companyName: string;
  question: string;
  onQuestionChange: (question: string) => void;
}

export function AskQuestionsSection({
  companyName,
  question,
  onQuestionChange,
}: AskQuestionsSectionProps) {
  return (
    <section className="mb-20 p-8 bg-muted/30 rounded-3xl border border-border">
      <h2 className="text-xl font-serif text-foreground mb-6">
        Have questions about {companyName}?
      </h2>

      <div className="relative mb-6">
        <input
          type="text"
          value={question}
          onChange={(e) => onQuestionChange(e.target.value)}
          placeholder={`Ask anything about ${companyName}...`}
          className="w-full px-5 py-4 pr-14 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-lg"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestedQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => onQuestionChange(q)}
            className="text-sm px-4 py-2 bg-background border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>
    </section>
  );
}
