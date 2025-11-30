export const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-serif text-foreground">EdgeAngel</span>
            <span className="text-muted-foreground/40">•</span>
            <span>Regulated by BaFin</span>
          </div>
          <p className="text-center md:text-left">
            All investments carry risk. Capital at risk. Past performance is not
            indicative of future results.
          </p>
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
      </div>
    </footer>
  );
};
