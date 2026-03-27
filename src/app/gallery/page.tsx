import type { Metadata } from "next";
import Image from "next/image";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Exhibition gallery — Mifé Art at The Convent Daylesford.",
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

      {/* Exhibition Feature */}
      <div className="mb-16">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="flex-1">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <Image
                src="/convent-gallery.jpg"
                alt="The Convent Daylesford"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <Image
              src="/convent-logo.jpg"
              alt="The Convent Daylesford"
              width={200}
              height={80}
              className="h-16 w-auto mb-4 mx-auto md:mx-0"
            />
            <h2 className="text-lg font-semibold uppercase tracking-wider mb-3">
              The Convent Daylesford
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-2">
              The Infirmary Room
            </p>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Marina&apos;s work was exhibited at The Convent Gallery in Daylesford,
              one of Australia&apos;s most iconic regional art spaces.
            </p>
            <a
              href="https://conventgallery.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm uppercase tracking-wider border-b border-foreground pb-1 hover:text-muted transition-colors"
            >
              Visit The Convent Gallery
            </a>
          </div>
        </div>
      </div>

      {/* Exhibition Photos */}
      {images.length === 0 ? (
        <p className="text-muted text-center py-20">
          Gallery coming soon.
        </p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {images.map((filename) => (
            <div key={filename} className="mb-4 break-inside-avoid">
              <div className="relative overflow-hidden group rounded-lg">
                <Image
                  src={`/gallery/${filename}`}
                  alt="Exhibition at The Convent Daylesford"
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
