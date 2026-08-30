import type { Metadata } from "next";
import { AutomationBuilder } from "@/components/flow/AutomationBuilder";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Gift automation",
  description: "Build trigger-based gifting campaigns on a visual canvas — triggers, audiences, gifts, budgets, approvals, and sends.",
};

export default function GiftAutomationPage() {
  return (
    <div className="container pb-24 pt-[calc(var(--header-h)+3rem)]">
      <header className="mb-8 max-w-3xl">
        <p className="eyebrow">What we offer</p>
        <h1 className="mt-2 text-[var(--step-3)]">Gift automation, on a canvas.</h1>
        <p className="mt-3 text-ink/70">
          Drag nodes to compose a campaign: a trigger fires, an audience is targeted, a gift is chosen, budgets and
          approvals gate the spend, then it ships. Connections are validated as you draw them — no invalid edges.
        </p>
      </header>

      <Reveal>
        <AutomationBuilder />
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          { t: "Typed nodes", b: "Nine node kinds model the real gifting lifecycle." },
          { t: "Validated edges", b: "Only sensible connections are allowed, so campaigns stay coherent." },
          { t: "Dry-run + export", b: "Project recipients and cost, then export JSON or save to WordPress." },
        ].map((f) => (
          <div key={f.t} className="card p-5">
            <p className="font-display text-lg">{f.t}</p>
            <p className="mt-1 text-sm text-ink/70">{f.b}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
