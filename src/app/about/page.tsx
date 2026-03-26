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
              Marina Ensor is an Australian artist working primarily with acrylics, oils, and
              mixed media on canvas. Her work explores the interplay of colour, texture, and
              emotion — each piece a reflection of an inner landscape.
            </p>

            <p>
              Drawing inspiration from nature, light, and the subtle shifts of the Australian
              environment, Marina creates works that invite viewers to slow down and connect
              with something deeper.
            </p>

            <p>
              Every painting is an original — a one-of-a-kind piece created with intention and
              care. Marina believes art should be felt as much as seen, and aims to create work
              that resonates on a personal level with each collector.
            </p>

            <p>
              When not in the studio, Marina can be found exploring the coastline, gathering
              inspiration for her next series.
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
