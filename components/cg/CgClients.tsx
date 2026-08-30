import Image from "next/image";
import { clientLogos } from "./cgNavData";

export function CgClients() {
  const twice = [...clientLogos, ...clientLogos];
  return (
    <section aria-label="Companies we work with" className="py-10">
      <div className="cg-divider mb-10" />
      <div className="overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}>
        <div className="cg-marquee-track">
          {twice.map((logo, i) => (
            <div key={`${logo.alt}-${i}`} className="cg-logo-chip">
              <Image src={logo.src} alt={logo.alt} width={180} height={34} style={{ width: "auto", height: 30 }} unoptimized />
            </div>
          ))}
        </div>
      </div>
      <div className="cg-divider mt-10" />
    </section>
  );
}