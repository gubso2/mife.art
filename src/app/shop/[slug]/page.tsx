import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import artworkData from "@/data/artwork.json";
import type { Artwork } from "@/lib/types";

const artworks = artworkData as Artwork[];

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artwork = artworks.find((a) => a.slug === slug);
  if (!artwork) return {};
  return {
    title: artwork.title,
    description: artwork.description,
  };
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = artworks.find((a) => a.slug === slug);

  if (!artwork) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-20">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-6 md:mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
            <Image
              src={`/artwork/${artwork.images[0]}`}
              alt={artwork.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          {artwork.closeImage && (
            <div className="aspect-square bg-gray-100 relative overflow-hidden">
              <Image
                src={`/artwork/${artwork.closeImage}`}
                alt={`${artwork.title} — detail`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-semibold">{artwork.title}</h1>

          <div className="mt-4 space-y-2 text-sm text-muted">
            <p>{artwork.medium}</p>
            <p>{artwork.dimensions}</p>
            <p>{artwork.year}</p>
          </div>

          <p className="mt-6 leading-relaxed text-muted">{artwork.description}</p>

          <div className="mt-8">
            {artwork.sold ? (
              <div className="inline-block bg-gray-100 text-muted text-sm uppercase tracking-wider px-8 py-3">
                Sold
              </div>
            ) : (
              <>
                <p className="text-xl font-semibold mb-4">
                  ${artwork.price.toLocaleString()} {artwork.currency}
                </p>
                <form action="/api/checkout" method="POST">
                  <input type="hidden" name="slug" value={artwork.slug} />
                  <button
                    type="submit"
                    className="bg-foreground text-white text-sm uppercase tracking-wider px-8 py-3 hover:bg-foreground/90 transition-colors"
                  >
                    Purchase
                  </button>
                </form>
              </>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-xs text-muted">
              Free shipping within Australia. International shipping available on request.
              <br />
              <Link href="/contact" className="underline hover:text-foreground transition-colors">
                Contact us
              </Link>{" "}
              for enquiries or commissions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
