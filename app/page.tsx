import { CgHero } from "@/components/cg/CgHero";
import { CgPixieHero } from "@/components/cg/CgPixieHero";
import { CgSocialProof } from "@/components/cg/CgSocialProof";
import { CgClients } from "@/components/cg/CgClients";
import { CgWhyUs } from "@/components/cg/CgWhyUs";
import { CgEngage } from "@/components/cg/CgEngage";
import { CgWorkflows } from "@/components/cg/CgWorkflows";
import { CgTestimonials } from "@/components/cg/CgTestimonials";
import { CgAwards } from "@/components/cg/CgAwards";
import { CgBlog } from "@/components/cg/CgBlog";
import { CgDemo } from "@/components/cg/CgDemo";
import { RandomGoldenGlowDense } from "@/components/cg/RandomGoldenGlow";
import { CgSectionDivider } from "@/components/cg/CgSectionDivider";

export default function HomePage() {
    return (
    <>
      <RandomGoldenGlowDense count={14} />
      <CgPixieHero />
      <CgHero />
      <CgSectionDivider />
      <CgSocialProof />
      <CgClients />
      <CgWhyUs />
      <CgSectionDivider flip />
      <CgEngage />
      <CgWorkflows />
      <CgTestimonials />
      <CgAwards />
      <CgBlog />
      <CgSectionDivider />
      <CgDemo />
    </>
  );
}
