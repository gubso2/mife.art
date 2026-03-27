import Link from "next/link";
import Image from "next/image";
import type { Artwork } from "@/lib/types";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const farSrc = `/artwork/${artwork.images[0]}`;
  const closeSrc = artwork.closeImage ? `/artwork/${artwork.closeImage}` : null;

  return (
    <Link href={`/shop/${artwork.slug}`} className="group block">
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {/* Far image (default) */}
        <Image
          src={farSrc}
          alt={artwork.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-500 ${closeSrc ? "group-hover:opacity-0" : ""}`}
        />
        {/* Close image (on hover) */}
        {closeSrc && (
          <Image
            src={closeSrc}
            alt={`${artwork.title} detail`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        {artwork.sold && (
          <div className="absolute top-3 left-3 z-10 bg-foreground text-white text-xs uppercase tracking-wider px-3 py-1">
            Sold
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
  );
}
