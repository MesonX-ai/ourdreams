import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Sparkles, Users, Boxes, Workflow, Heart, BarChart3 } from "lucide-react";

const cards = [
  { icon: Sparkles, title: "Marketplace", body: "Thousands of gifts from one vendor of record.", href: "/what-we-offer/marketplace/", span: "md:col-span-2 md:row-span-2", tone: "bg-cream" },
  { icon: Users, title: "Multi-recipient sending", body: "One cart, many doors — personalized per person.", href: "/what-we-offer/multi-recipient-sending/", span: "md:col-span-2", tone: "bg-blush" },
  { icon: Boxes, title: "Virtual swag closet", body: "A self-serve company store, on brand.", href: "/what-we-offer/virtual-swag-closet/", span: "md:col-span-1", tone: "bg-white" },
  { icon: Workflow, title: "Gift automation", body: "Trigger-based campaigns, hands-free.", href: "/what-we-offer/gift-automation/", span: "md:col-span-1", tone: "bg-plum text-cream" },
  { icon: Heart, title: "Personal touches", body: "Notes, branding, and moments that matter.", href: "/what-we-offer/personal-touches/", span: "md:col-span-3", tone: "bg-champagne/30" },
  { icon: BarChart3, title: "Insights & reporting", body: "See engagement across every send.", href: "/what-we-offer/insights-reporting/", span: "md:col-span-3", tone: "bg-sage/20" },
];

export function BentoGrid() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">The platform</p>
          <h2 className="mt-2 text-[var(--step-3)]">Everything gifting, in one calm place.</h2>
        </Reveal>
        <div className="mt-10 grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-6">
          {cards.map((c, i) => (
            <Reveal key={c.href} delay={i * 60} className={`${c.span}`}>
              <Link
                href={c.href}
                className={`group flex h-full flex-col justify-between rounded-2xl border border-ink/10 p-6 shadow-soft transition-transform hover:-translate-y-1 ${c.tone}`}
              >
                <c.icon className="h-7 w-7 text-gold" />
                <div>
                  <p className="font-display text-xl">{c.title}</p>
                  <p className="mt-1 text-sm opacity-75">{c.body}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
