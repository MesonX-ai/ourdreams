const awards = [
  { name: "Gifting Excellence", year: "2026" },
  { name: "People-First Platform", year: "2026" },
  { name: "Sustainable Fulfilment", year: "2025" },
  { name: "Best Onboarding Program", year: "2025" },
];

export function AwardsRow() {
  return (
    <section className="border-y border-ink/10 bg-white/40 py-10">
      <div className="container flex flex-wrap items-center justify-center gap-6">
        {awards.map((a) => (
          <div key={a.name} className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-cream px-5 py-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-champagne/30 font-display text-gold">★</span>
            <div>
              <p className="text-sm font-medium">{a.name}</p>
              <p className="text-xs text-ink/50">OurDreams · {a.year}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
