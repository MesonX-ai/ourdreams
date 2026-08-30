import { Reveal } from "@/components/ui/Reveal";
import { DemoForm } from "@/components/home/DemoForm";

export function CtaBand() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid items-center gap-10 rounded-3xl bg-plum p-8 text-cream md:grid-cols-2 md:p-12">
          <Reveal>
            <p className="eyebrow text-champagne">Ready when you are</p>
            <h2 className="mt-2 text-[var(--step-3)]">Let's make gifting feel human.</h2>
            <p className="mt-4 max-w-md text-cream/75">
              Tell us about your team and we'll show you the fastest path to delightful, on-brand sends.
            </p>
          </Reveal>
          <div className="rounded-2xl bg-cream/95 p-6 text-ink">
            <DemoForm compact />
          </div>
        </div>
      </div>
    </section>
  );
}
