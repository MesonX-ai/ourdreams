const clients = ["northwind", "lumen", "atlas", "meridian", "harbor", "cedar"];

export function ClientMarquee() {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {clients.map((c) => (
        <img
          key={c}
          src={`/placeholder-client-${c}.svg`}
          alt=""
          className="h-9 w-auto opacity-60"
          width={160}
          height={48}
        />
      ))}
    </div>
  );
  return (
    <section aria-label="Customers" className="border-y border-ink/10 bg-white/40 py-8">
      <p className="container eyebrow mb-4">People teams who send with heart</p>
      <div className="relative flex overflow-hidden" aria-hidden>
        <div className="flex animate-marquee">{row}</div>
        <div className="flex animate-marquee">{row}</div>
      </div>
      <div className="relative mt-4 flex overflow-hidden" aria-hidden>
        <div className="flex animate-marquee-rev">{row}</div>
        <div className="flex animate-marquee-rev">{row}</div>
      </div>
    </section>
  );
}
