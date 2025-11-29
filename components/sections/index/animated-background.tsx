export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl animate-glow-pulse" />
      <div
        className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-accent/20 via-accent/5 to-transparent blur-3xl animate-glow-pulse"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-t from-success/10 via-success/5 to-transparent blur-3xl animate-glow-pulse"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
};
