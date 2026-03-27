"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Artwork } from "@/lib/types";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const farSrc = `/artwork/${artwork.images[0]}`;
  const closeSrc = artwork.closeImage ? `/artwork/${artwork.closeImage}` : null;
  const [showClose, setShowClose] = useState(false);
  const touchStartX = useRef(0);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (!closeSrc) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      setShowClose(deltaX < 0 ? true : false);
    }
  }

  return (
    <div className="group">
      <Link href={`/shop/${artwork.slug}`} className="block">
        <div
          className="aspect-square bg-gray-100 relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Far image (default) */}
          <Image
            src={farSrc}
            alt={artwork.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-500 ${
              closeSrc ? "group-hover:opacity-0" : ""
            } ${showClose ? "opacity-0" : ""}`}
          />
          {/* Close image (on hover / swipe) */}
          {closeSrc && (
            <Image
              src={closeSrc}
              alt={`${artwork.title} detail`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover transition-opacity duration-500 group-hover:opacity-100 ${
                showClose ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
          {artwork.sold && (
            <div className="absolute top-3 left-3 z-10 bg-foreground text-white text-xs uppercase tracking-wider px-3 py-1">
              Sold
            </div>
          )}
          {/* Swipe indicator dots (mobile only) */}
          {closeSrc && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 md:hidden">
              <div className={`w-1.5 h-1.5 rounded-full transition-colors ${!showClose ? "bg-white" : "bg-white/40"}`} />
              <div className={`w-1.5 h-1.5 rounded-full transition-colors ${showClose ? "bg-white" : "bg-white/40"}`} />
            </div>
          )}
        </div>

        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-medium group-hover:underline">{artwork.title}</h3>
          <p className="text-xs text-muted">{artwork.medium}</p>
          {artwork.dimensions && <p className="text-xs text-muted">{artwork.dimensions}</p>}
          {artwork.price > 0 && (
            <p className="text-sm font-medium mt-1">
              {artwork.sold ? (
                <span className="text-muted">Sold</span>
              ) : (
                `$${artwork.price.toLocaleString()} ${artwork.currency}`
              )}
            </p>
          )}
        </div>
      </Link>

      {artwork.sold ? (
        <div className="mt-3 w-full bg-gray-200 text-muted text-xs uppercase tracking-wider px-4 py-2.5 text-center">
          Sold
        </div>
      ) : artwork.price > 0 ? (
        <form action="/api/checkout" method="POST" className="mt-3">
          <input type="hidden" name="slug" value={artwork.slug} />
          <button
            type="submit"
            className="w-full bg-foreground text-white text-xs uppercase tracking-wider px-4 py-2.5 hover:bg-foreground/90 transition-colors"
          >
            Purchase — ${artwork.price.toLocaleString()}
          </button>
        </form>
      ) : null}
    </div>
  );
}
