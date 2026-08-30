import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const tiers = [
  { name: "Team", price: "From $499/mo", features: ["Up to 250 recipients", "Marketplace + multi-send", "Standard reporting"], cta: "/pricing/", highlight: false },
  { name: "Business", price: "From $1,499/mo", features: ["Unlimited recipients", "Gift automation builder", "Integrations + budgets", "Dedicated CSM"], cta: "/pricing/", highlight: true },
  { name: "Enterprise", price: "Custom", features: ["Global fulfilment", "SSO + audit logs", "Custom CPT workflows"], cta: "/contact-us/", highlight: false },
];

export function PricingTeaser() {
  return (
    <section className="section bg-blush/40">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Simple, human pricing</p>
          <h2 className="mt-2 text-[var(--step-3)]">Plans that scale with care.</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 70}>
              <div className={`flex h-full flex-col rounded-3xl border p-7 ${t.highlight ? "border-gold bg-cream shadow-glow" : "border-ink/10 bg-white/60"}`}>
                <p className="font-display text-2xl">{t.name}</p>
                <p className="mt-2 text-lg font-medium text-ink/100">{t.price}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href={t.cta} className={`mt-7 ${t.highlight ? "btn-primary" : "btn-secondary"}`}>
                  Choose {t.name}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
