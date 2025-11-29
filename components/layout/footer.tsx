export const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>© 2024 Verdant. Regulated by BaFin. All investments carry risk.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">
            Legal
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Risk Disclosure
          </a>
        </div>
      </div>
    </footer>
  );
};
