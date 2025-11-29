interface StorySectionProps {
  story: string;
}

export function StorySection({ story }: StorySectionProps) {
  return (
    <section className="mb-20">
      <h2 className="text-2xl font-serif text-foreground mb-6">The Story</h2>
      <div className="max-w-3xl">
        <p className="text-lg text-muted-foreground leading-relaxed">{story}</p>
      </div>
    </section>
  );
}
