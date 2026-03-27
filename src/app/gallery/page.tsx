import type { Metadata } from "next";
import Image from "next/image";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse the gallery of works by Marina Ensor.",
};

function getGalleryImages() {
  const galleryDir = path.join(process.cwd(), "public/gallery");
  if (!fs.existsSync(galleryDir)) return [];
  return fs
    .readdirSync(galleryDir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();
}

export default function GalleryPage() {
  const images = getGalleryImages();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <h1 className="text-2xl md:text-3xl font-semibold uppercase tracking-wider mb-10">
        Gallery
      </h1>

      {images.length === 0 ? (
        <p className="text-muted text-center py-20">
          Gallery coming soon.
        </p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {images.map((filename) => (
            <div key={filename} className="mb-4 break-inside-avoid">
              <div className="relative overflow-hidden group">
                <Image
                  src={`/gallery/${filename}`}
                  alt={filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ")}
                  width={800}
                  height={800}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
