import Link from "next/link";
import Hero from "@/components/Hero";
import ArtworkGrid from "@/components/ArtworkGrid";
import artworkData from "@/data/artwork.json";
import type { Artwork } from "@/lib/types";

const artworks = artworkData as Artwork[];

export default function Home() {
  const featured = artworks.filter((a) => a.featured && !a.sold);

  return (
    <>
      <Hero />

      {/* Featured Work */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-wider">
            Available Work
          </h2>
          <Link
            href="/shop"
            className="text-sm uppercase tracking-wider text-muted hover:text-foreground transition-colors"
          >
            View All
          </Link>
        </div>
        <ArtworkGrid artworks={featured} />
      </section>

      {/* About Teaser */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-wider mb-6">
              About the Artist
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              From Southern Africa to the leafy hills of Warrandyte, Marina&apos;s art reflects
              a joyful exploration of the natural world — vivid tones, bold colour combinations,
              and energetic, expressive works inspired by flowers and plant life.
            </p>
            <Link
              href="/about"
              className="inline-block text-sm uppercase tracking-wider border-b border-foreground pb-1 hover:text-muted transition-colors"
            >
              Learn More
            </Link>
          </div>
          <div className="flex-1 aspect-[4/3] bg-gray-200 w-full flex items-center justify-center text-muted text-sm">
            Artist Photo
          </div>
        </div>
      </section>
    </>
  );
}
