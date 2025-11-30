"use client";
import { Search, List, X } from "lucide-react";
import { collections } from "@/lib/opportunities";
import { useState, useEffect, useRef } from "react";

interface BottomMenubarProps {
  activeCollection: string | null;
  setActiveCollection: (collectionId: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onListViewToggle?: () => void;
  isListView?: boolean;
}

export const BottomMenubar = ({
  activeCollection,
  setActiveCollection,
  searchQuery,
  setSearchQuery,
  onListViewToggle,
  isListView = false,
}: BottomMenubarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const hasBeenVisibleRef = useRef(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const checkInitialScroll = () => {
      const scrollY = window.scrollY;
      lastScrollYRef.current = scrollY;
      if (scrollY > 200) {
        setIsVisible(true);
        hasBeenVisibleRef.current = true;
      }
    };

    checkInitialScroll();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollDelta = scrollY - lastScrollYRef.current;
      lastScrollYRef.current = scrollY;

      if (scrollY > 200) {
        hasBeenVisibleRef.current = true;
        setIsVisible(true);
      } else if (
        scrollY < 50 &&
        hasBeenVisibleRef.current &&
        scrollDelta < -10
      ) {
        setIsVisible(false);
        hasBeenVisibleRef.current = false;
      } else if (hasBeenVisibleRef.current) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (hasBeenVisibleRef.current) {
      const checkVisibility = () => {
        if (hasBeenVisibleRef.current) {
          setIsVisible(true);
        }
      };
      requestAnimationFrame(checkVisibility);
    }
  }, [activeCollection, searchQuery]);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <div
      className={`fixed bottom-4 left-0 right-0 z-50 pointer-events-none transition-all duration-500 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="flex justify-center px-4 pb-2 pointer-events-auto">
        <div className="relative bg-background/95 backdrop-blur-2xl border border-border/60 rounded-full shadow-2xl ring-1 ring-border/20 px-6 py-3 inline-flex items-center gap-3 overflow-x-auto transform transition-transform duration-500 ease-out">
          <button
            onClick={() => setActiveCollection(null)}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCollection === null
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>

          {collections.map((collection) => {
            const isActive = activeCollection === collection.id;
            return (
              <button
                key={collection.id}
                onClick={() => setActiveCollection(collection.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="w-4 h-4">{collection.icon}</span>
                <span className="hidden sm:inline">{collection.title}</span>
              </button>
            );
          })}

          <div className="flex-shrink-0 w-px h-6 bg-border/60 mx-1" />

          {isSearchOpen ? (
            <div className="flex items-center gap-2 min-w-[200px]">
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search opportunities..."
                className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
                autoFocus
              />
              <button
                onClick={handleSearchClose}
                className="flex-shrink-0 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSearchClick}
              className="flex-shrink-0 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onListViewToggle}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isListView
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Toggle list view"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List View</span>
          </button>
        </div>
      </div>
    </div>
  );
};
