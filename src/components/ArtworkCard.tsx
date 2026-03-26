import Link from "next/link";
import type { Artwork } from "@/lib/types";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <Link href={`/shop/${artwork.slug}`} className="group block">
      {/* Image placeholder - replace with next/image when real images are added */}
      <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-muted text-sm">
          {artwork.title}
        </div>
        {artwork.sold && (
          <div className="absolute top-3 left-3 bg-foreground text-white text-xs uppercase tracking-wider px-3 py-1">
            Sold
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium group-hover:underline">{artwork.title}</h3>
        <p className="text-xs text-muted">{artwork.medium}</p>
        <p className="text-xs text-muted">{artwork.dimensions}</p>
        <p className="text-sm font-medium mt-1">
          {artwork.sold ? (
            <span className="text-muted">Sold</span>
          ) : (
            `$${artwork.price.toLocaleString()} ${artwork.currency}`
          )}
        </p>
      </div>
    </Link>
  );
}
