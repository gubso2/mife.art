import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/hero-banner.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-44 flex flex-col items-center text-center">
        <Image
          src="/mife-logo.png"
          alt="Mifé Art"
          width={400}
          height={260}
          className="h-32 md:h-48 w-auto drop-shadow-lg"
          priority
        />
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-xl font-medium drop-shadow-sm">
          Original artwork by Marina Ensor
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block bg-foreground text-white text-sm uppercase tracking-wider px-8 py-3 hover:bg-foreground/90 transition-colors shadow-lg"
        >
          View Available Work
        </Link>
      </div>
    </section>
  );
}
