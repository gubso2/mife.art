import Link from "next/link";
import Image from "next/image";
import type { Artwork } from "@/lib/types";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const imageSrc = `/artwork/${artwork.images[0]}`;

  return (
    <Link href={`/shop/${artwork.slug}`} className="group block">
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <Image
          src={imageSrc}
          alt={artwork.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.5]"
        />
        {artwork.sold && (
          <div className="absolute top-3 left-3 z-10 bg-foreground text-white text-xs uppercase tracking-wider px-3 py-1">
            Sold
          </div>
        )}
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
