"use client";
import { Search, List, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import {
  collections,
  OpportunityFilters,
  filterOptions,
  defaultFilters,
} from "@/lib/opportunities";
import { useState, useEffect, useRef } from "react";

interface BottomMenubarProps {
  activeCollection: string | null;
  setActiveCollection: (collectionId: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onListViewToggle?: () => void;
  isListView?: boolean;
  filters: OpportunityFilters;
  setFilters: (filters: OpportunityFilters) => void;
}

export const BottomMenubar = ({
  activeCollection,
  setActiveCollection,
  searchQuery,
  setSearchQuery,
  onListViewToggle,
  isListView = false,
  filters,
  setFilters,
}: BottomMenubarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const filterPanelRef = useRef<HTMLDivElement>(null);

  const activeFilterCount = Object.values(filters).filter((v) => v !== null).length;

  // Close filter panel on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target as Node)) {
        setIsFiltersOpen(false);
      }
    };

    if (isFiltersOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFiltersOpen]);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setIsFiltersOpen(false);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const handleFilterToggle = () => {
    setIsFiltersOpen(!isFiltersOpen);
    setIsSearchOpen(false);
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
  };

  const updateFilter = <K extends keyof OpportunityFilters>(
    key: K,
    value: OpportunityFilters[K]
  ) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 pointer-events-none">
      <div className="flex flex-col items-center px-4 pb-2 pointer-events-auto" ref={filterPanelRef}>
        {/* Filter Panel */}
        <div
          className={`mb-3 bg-background/95 backdrop-blur-2xl border border-border/60 rounded-2xl shadow-2xl ring-1 ring-border/20 p-4 transition-all duration-300 ${
            isFiltersOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-foreground">Filters</span>
            {activeFilterCount > 0 && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {/* Location Filter */}
            <div className="relative">
              <select
                value={filters.location || ""}
                onChange={(e) => updateFilter("location", e.target.value || null)}
                className="w-full appearance-none bg-muted/50 border border-border/40 rounded-lg px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Location</option>
                {filterOptions.locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Sector Filter */}
            <div className="relative">
              <select
                value={filters.sector || ""}
                onChange={(e) => updateFilter("sector", e.target.value || null)}
                className="w-full appearance-none bg-muted/50 border border-border/40 rounded-lg px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Sector</option>
                {filterOptions.sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Vertical Filter */}
            <div className="relative">
              <select
                value={filters.vertical || ""}
                onChange={(e) => updateFilter("vertical", e.target.value || null)}
                className="w-full appearance-none bg-muted/50 border border-border/40 rounded-lg px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Vertical</option>
                {filterOptions.verticals.map((vertical) => (
                  <option key={vertical} value={vertical}>
                    {vertical}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Founding Year Filter */}
            <div className="relative">
              <select
                value={filters.foundingYear || ""}
                onChange={(e) =>
                  updateFilter("foundingYear", e.target.value ? parseInt(e.target.value) : null)
                }
                className="w-full appearance-none bg-muted/50 border border-border/40 rounded-lg px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Founded</option>
                {filterOptions.foundingYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Stage Filter */}
            <div className="relative">
              <select
                value={filters.stage || ""}
                onChange={(e) => updateFilter("stage", e.target.value || null)}
                className="w-full appearance-none bg-muted/50 border border-border/40 rounded-lg px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Stage</option>
                {filterOptions.stages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Shares Available Filter */}
            <div className="relative">
              <select
                value={filters.sharesAvailableMin ?? ""}
                onChange={(e) =>
                  updateFilter("sharesAvailableMin", e.target.value ? parseInt(e.target.value) : null)
                }
                className="w-full appearance-none bg-muted/50 border border-border/40 rounded-lg px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Shares %</option>
                {filterOptions.sharesRanges.slice(1).map((range) => (
                  <option key={range.value} value={range.value ?? ""}>
                    {range.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Menubar */}
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

          {/* Filters Button */}
          <button
            onClick={handleFilterToggle}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isFiltersOpen || activeFilterCount > 0
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 bg-primary-foreground/20 text-primary-foreground px-1.5 py-0.5 rounded-full text-xs">
                {activeFilterCount}
              </span>
            )}
          </button>

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
