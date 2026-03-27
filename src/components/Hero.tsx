import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-36 flex flex-col items-center text-center">
        <Image
          src="/mife-logo.png"
          alt="Mifé Art"
          width={400}
          height={260}
          className="h-32 md:h-48 w-auto"
          priority
        />
        <p className="mt-4 text-lg md:text-xl text-muted max-w-xl">
          Original artwork by Marina Ensor
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block bg-foreground text-white text-sm uppercase tracking-wider px-8 py-3 hover:bg-foreground/90 transition-colors"
        >
          View Available Work
        </Link>
      </div>
    </section>
  );
}
