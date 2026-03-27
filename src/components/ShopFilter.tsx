"use client";

import { useState } from "react";
import type { Artwork } from "@/lib/types";
import ArtworkGrid from "./ArtworkGrid";

type SoldFilter = "all" | "available" | "sold";
type PriceSort = "default" | "low-high" | "high-low";

export default function ShopFilter({ artworks }: { artworks: Artwork[] }) {
  const [soldFilter, setSoldFilter] = useState<SoldFilter>("all");
  const [priceSort, setPriceSort] = useState<PriceSort>("default");

  let filtered = [...artworks];

  // Filter by sold status
  if (soldFilter === "available") {
    filtered = filtered.filter((a) => !a.sold);
  } else if (soldFilter === "sold") {
    filtered = filtered.filter((a) => a.sold);
  }

  // Sort by price
  if (priceSort === "low-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (priceSort === "high-low") {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    // Default: available first, then sold
    filtered.sort((a, b) => Number(a.sold) - Number(b.sold));
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-10">
        {/* Sold filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-muted">Show:</span>
          <div className="flex">
            {(["all", "available", "sold"] as SoldFilter[]).map((option) => (
              <button
                key={option}
                onClick={() => setSoldFilter(option)}
                className={`px-3 py-2.5 md:py-1.5 text-xs uppercase tracking-wider border transition-colors ${
                  soldFilter === option
                    ? "bg-foreground text-white border-foreground"
                    : "bg-white text-muted border-border hover:border-foreground"
                } ${option === "all" ? "rounded-l" : ""} ${option === "sold" ? "rounded-r" : ""} -ml-px first:ml-0`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Price sort */}
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-muted">Price:</span>
          <select
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value as PriceSort)}
            className="border border-border px-3 py-2.5 md:py-1.5 text-xs uppercase tracking-wider bg-white text-foreground focus:outline-none focus:border-foreground"
          >
            <option value="default">Default</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        {/* Count */}
        <span className="text-xs text-muted ml-auto">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </span>
      </div>

      <ArtworkGrid artworks={filtered} />

      {filtered.length === 0 && (
        <p className="text-muted text-center py-20">
          No artwork matches your filters.
        </p>
      )}
    </>
  );
}
