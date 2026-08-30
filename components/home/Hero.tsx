import Link from "next/link";
import { Play } from "lucide-react";

const HEADLINE = ["Gifting", "that", "feels", "human."];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-[calc(var(--header-h)+2rem)]">
      {/* Aurora mesh — CSS only, GPU-cheap */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-20%] h-[60vh] w-[60vh] animate-aurora rounded-full bg-champagne/40 blur-3xl" />
        <div className="absolute right-[-10%] top-[10%] h-[50vh] w-[50vh] animate-aurora rounded-full bg-plum/30 blur-3xl [animation-delay:-6s]" />
        <div className="absolute bottom-[-20%] left-[30%] h-[40vh] w-[40vh] animate-aurora rounded-full bg-blush/50 blur-3xl [animation-delay:-12s]" />
      </div>

      <div className="container grid items-center gap-12 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-7">
          <p className="eyebrow mb-4">Corporate gifting, reimagined</p>
          <h1 className="text-[var(--step-4)]">
            {HEADLINE.map((w, i) => (
              <span
                key={w}
                className="me-3 inline-block animate-fade-up"
                style={{ animationDelay: `${i * 110}ms` }}
              >
                {w}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/70">
            One vendor of record for marketplace, multi-recipient sending, and hands-free automation —
            so every gift lands like it was chosen by a person who cares.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/what-we-offer/" className="btn-primary">
              Explore the platform
            </Link>
            <Link href="/request-demo/" className="btn-secondary">
              <Play className="h-4 w-4" /> Watch the tour
            </Link>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm text-ink/70 shadow-soft">
            <span className="h-2 w-2 rounded-full bg-sage" /> Trusted by people teams at growing companies
          </p>
        </div>

        <div className="md:col-span-5">
          <div className="card relative aspect-[4/5] overflow-hidden p-0">
            <img
              src="/placeholder-collection-1.svg"
              alt="A curated OurDreams welcome gift"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-5 text-cream">
              <p className="font-display text-lg">New Hire Welcome</p>
              <p className="text-sm text-cream/80">A first-day send that earns a smile.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
