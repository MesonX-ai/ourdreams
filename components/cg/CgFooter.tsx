import Link from "next/link";
import { CgLogo } from "@/components/cg/CgLogo";

const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Shop products",
    links: [
      { label: "Gift baskets & sets", href: "/shop/" },
      { label: "Tech", href: "/shop/" },
      { label: "Drinkware", href: "/shop/" },
      { label: "Home & kitchen", href: "/shop/" },
      { label: "Apparel & bags", href: "/shop/" },
      { label: "Wine, liquor & food", href: "/shop/" },
    ],
  },
  {
    heading: "What we offer",
    links: [
      { label: "Multi-recipient sending", href: "/shop/" },
      { label: "Virtual swag closet", href: "/shop/" },
      { label: "Gift automation", href: "/what-we-offer/gift-automation/" },
      { label: "eGifting", href: "/shop/" },
      { label: "Personal touches", href: "/what-we-offer/gift-automation/" },
      { label: "Company store", href: "/shop/" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/" },
      { label: "Pricing", href: "/pricing/" },
      { label: "Customer stories", href: "/" },
      { label: "Blog", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Contact us", href: "/" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "FAQs", href: "/" },
      { label: "Video tutorials", href: "/" },
      { label: "Privacy policy", href: "/" },
      { label: "Terms & conditions", href: "/" },
      { label: "Accessibility", href: "/" },
    ],
  },
];

export function CgFooter() {
  return (
    <footer className="bg-white">
      <div className="container border-t border-gold/15 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 max-w-xs">
            <CgLogo />
            <p className="mt-5 text-sm leading-relaxed text-ink/60">
              Dream gifting platform and marketplace. We automate everything but the smile — gift
              sourcing, customization, budgeting, storage, and logistics from one vendor of record.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { label: "X", href: "https://x.com/" },
                { label: "Instagram", href: "https://www.instagram.com/" },
                { label: "LinkedIn", href: "https://www.linkedin.com/" },
                { label: "Facebook", href: "https://www.facebook.com/" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 text-sm font-semibold text-ink transition-all duration-300 hover:border-gold hover:bg-gold hover:text-white hover:shadow-lg hover:shadow-gold/20"
                >
                  {s.label.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="text-sm font-bold uppercase tracking-wide text-ink">{col.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="cg-animated-link text-sm text-ink/60">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-gold/15">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink/50 sm:flex-row">
          <p>© {new Date().getFullYear()} OurDreams. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Visa · Mastercard · Amex · Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
