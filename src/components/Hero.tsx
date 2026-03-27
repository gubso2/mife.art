import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden max-h-[500px]">
      {/* Background image */}
      <img
        src="/hero-banner.png"
        alt=""
        className="w-full h-auto block"
      />

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <Image
          src="/mife-logo.png"
          alt="Mifé Art"
          width={400}
          height={260}
          className="h-28 md:h-40 w-auto drop-shadow-lg"
          priority
        />
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-xl font-medium drop-shadow-sm">
          Original artwork by Marina Ensor
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block bg-foreground text-white text-sm uppercase tracking-wider px-8 py-3 hover:bg-foreground/90 transition-colors shadow-lg"
        >
          View Available Work
        </Link>
      </div>
    </section>
  );
}
