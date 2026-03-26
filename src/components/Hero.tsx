import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-36 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight uppercase">
          Mife
        </h1>
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
