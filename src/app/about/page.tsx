import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Marina Ensor, the artist behind Mife.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Photo placeholder */}
        <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center text-muted text-sm">
          Artist Photo
        </div>

        {/* Bio */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold uppercase tracking-wider mb-8">
            About
          </h1>

          <div className="space-y-6 text-muted leading-relaxed">
            <p>
              From Southern Africa to Bendigo and now the leafy hills of Warrandyte,
              Marina&apos;s art reflects a joyful exploration of the natural world, particularly
              the vivid tones and forms found in flowers and plant life.
            </p>

            <p>
              Marina&apos;s style is characterised by her strong use of colour and willingness
              to explore bold combinations, creating works that feel energetic and expressive.
            </p>

            <p>
              Beyond her art, Marina is a dedicated educator and enjoys spending time with
              her loving family (including an overly-energetic furry friend, Douglas).
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block bg-foreground text-white text-sm uppercase tracking-wider px-8 py-3 hover:bg-foreground/90 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
