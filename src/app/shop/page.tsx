import type { Metadata } from "next";
import ShopFilter from "@/components/ShopFilter";
import artworkData from "@/data/artwork.json";
import type { Artwork } from "@/lib/types";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse and purchase original artwork by Marina Ensor.",
};

const artworks = artworkData as Artwork[];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { success } = await searchParams;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      {success && (
        <div className="mb-8 bg-green-50 border border-green-200 text-green-800 px-6 py-4 text-sm">
          Thank you for your purchase! You&apos;ll receive a confirmation email shortly.
        </div>
      )}

      <h1 className="text-2xl md:text-3xl font-semibold uppercase tracking-wider mb-10">
        Shop
      </h1>

      <ShopFilter artworks={artworks} />
    </div>
  );
}
