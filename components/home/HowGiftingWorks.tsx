import { Reveal } from "@/components/ui/Reveal";
import { PipelineFlow } from "@/components/flow/PipelineFlow";

export function HowGiftingWorks() {
  return (
    <section className="section bg-plum text-cream">
      <div className="container">
        <Reveal>
          <p className="eyebrow text-champagne">How gifting works</p>
          <h2 className="mt-2 max-w-2xl text-[var(--step-3)]">
            From trigger to tracked delight — automatically.
          </h2>
          <p className="mt-4 max-w-xl text-cream/75">
            Define the moment, pick the people, choose the gift. OurDreams personalizes, sends, and
            reports — so the human touch scales.
          </p>
        </Reveal>
        <div className="mt-10">
          <PipelineFlow />
        </div>
      </div>
    </section>
  );
}
