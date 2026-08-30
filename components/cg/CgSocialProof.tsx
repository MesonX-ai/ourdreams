import Image from "next/image";

export function CgSocialProof() {
  return (
    <section aria-label="Ratings and social proof" className="container pb-2">
      <div className="flex flex-col items-center justify-center gap-1 py-4 text-center">
        <div className="flex items-center gap-3">
          <p className="text-4xl font-extrabold cg-shimmer-text" style={{ fontFamily: "var(--font-display)" }}>
            4.9
          </p>
          <div className="flex gap-1" aria-hidden>
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} width="22" height="22" viewBox="0 0 16 16" className="cg-star-gold" aria-hidden>
                <path d="M8 0l2.16 4.94 5.4.58-4.07 3.62 1.14 5.29L8 11.56 3.37 14.43l1.14-5.29L.44 5.52l5.4-.58z" />
              </svg>
            ))}
          </div>
          <span className="text-base font-semibold text-[#222325]">Trusted by 20,000+</span>
        </div>
        <div className="mt-1 opacity-70">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cg/testimonials/g2-badge.png" alt="G2 reviews" width={164} height={32} />
        </div>
      </div>
    </section>
  );
}