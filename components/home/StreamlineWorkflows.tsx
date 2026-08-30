import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const rows = [
  { n: "01", title: "One vendor of record", body: "Procurement, fulfilment, and invoicing through a single partner — no juggling suppliers.", href: "/what-we-offer/marketplace/" },
  { n: "02", title: "Approvals without the chase", body: "Budget caps and approver flows keep spend on rails and teammates unblocked.", href: "/what-we-offer/insights-reporting/" },
  { n: "03", title: "Integrations that just connect", body: "HRIS, CRM, and Slack triggers fire sends the moment life happens.", href: "/what-we-offer/seamless-integrations/" },
];

export function StreamlineWorkflows() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Streamline workflows</p>
          <h2 className="mt-2 text-[var(--step-3)]">Less admin. More delight.</h2>
        </Reveal>
        <div className="mt-10 space-y-6">
          {rows.map((r, i) => (
            <Reveal key={r.n} delay={i * 80}>
              <Link
                href={r.href}
                className="grid items-center gap-6 rounded-3xl border border-ink/10 bg-white/60 p-6 md:grid-cols-[auto_1fr_auto] md:gap-10"
              >
                <span className="font-display text-3xl text-gold">{r.n}</span>
                <div>
                  <h3 className="font-display text-2xl">{r.title}</h3>
                  <p className="mt-1 text-ink/70">{r.body}</p>
                </div>
                <span className="hidden text-sm text-ink/50 md:inline">Learn more →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
