import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden max-h-[300px] md:max-h-[500px]">
      {/* Background image */}
      <img
        src="/hero-banner.png"
        alt=""
        className="w-full h-auto block"
      />

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 md:px-6">
        <h1 className="text-xl sm:text-3xl md:text-5xl font-bold uppercase tracking-wide text-foreground drop-shadow-md">
          Original Artwork by Marina Ensor
        </h1>
        <Link
          href="/shop"
          className="mt-4 md:mt-8 inline-block bg-foreground text-white text-xs sm:text-sm uppercase tracking-wider px-5 sm:px-8 py-2 sm:py-3 hover:bg-foreground/90 transition-colors shadow-lg"
        >
          View Available Work
        </Link>
      </div>
    </section>
  );
}
