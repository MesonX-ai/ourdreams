import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const occasions = [
  { name: "New hires", href: "/occasions/new-hires/", img: "/placeholder-collection-1.svg" },
  { name: "Birthdays", href: "/occasions/birthdays/", img: "/placeholder-collection-2.svg" },
  { name: "Work anniversaries", href: "/occasions/work-anniversaries/", img: "/placeholder-collection-3.svg" },
  { name: "Holidays", href: "/occasions/holidays/", img: "/placeholder-collection-4.svg" },
  { name: "Life events", href: "/occasions/life-events/", img: "/placeholder-collection-1.svg" },
  { name: "Client thanks", href: "/occasions/client-thanks/", img: "/placeholder-collection-2.svg" },
  { name: "Wellbeing", href: "/occasions/wellbeing/", img: "/placeholder-collection-3.svg" },
  { name: "Milestones", href: "/occasions/milestones/", img: "/placeholder-collection-4.svg" },
];

export function OccasionsGrid() {
  return (
    <section className="section bg-blush/40">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Every occasion</p>
          <h2 className="mt-2 text-[var(--step-3)]">There's a moment for every person.</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {occasions.map((o, i) => (
            <Reveal key={o.href} delay={i * 50}>
              <Link href={o.href} className="group relative block aspect-square overflow-hidden rounded-2xl shadow-soft">
                <img src={o.img} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/60 to-transparent p-4 font-display text-lg text-cream">
                  {o.name}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
