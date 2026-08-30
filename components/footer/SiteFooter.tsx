import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { NewsletterForm } from "./NewsletterForm";

const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Platform",
    links: [
      { label: "Marketplace", href: "/what-we-offer/marketplace/" },
      { label: "Multi-recipient sending", href: "/what-we-offer/multi-recipient-sending/" },
      { label: "Virtual swag closet", href: "/what-we-offer/virtual-swag-closet/" },
      { label: "Gift automation", href: "/what-we-offer/gift-automation/" },
      { label: "Insights & reporting", href: "/what-we-offer/insights-reporting/" },
    ],
  },
  {
    heading: "Shop",
    links: [
      { label: "All gifts", href: "/shop/" },
      { label: "Occasions", href: "/occasions/" },
      { label: "Collections", href: "/collections/" },
      { label: "eGift collections", href: "/egift-collections/" },
      { label: "Gift cards", href: "/gift-cards/" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about-us/" },
      { label: "Pricing", href: "/pricing/" },
      { label: "Case studies", href: "/case-studies/" },
      { label: "Blog", href: "/blog/" },
      { label: "Contact us", href: "/contact-us/" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy-policy/" },
      { label: "Terms", href: "/terms/" },
      { label: "Accessibility", href: "/accessibility/" },
      { label: "Shipping & returns", href: "/shipping-returns/" },
      { label: "Cookie policy", href: "/cookie-policy/" },
    ],
  },
];

const payments = ["Visa", "Mastercard", "Amex", "Apple Pay"];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-cream">
      <div className="container grid grid-cols-2 gap-10 py-16 md:grid-cols-6">
        <div className="col-span-2">
          <Wordmark className="[&_span]:text-cream" />
          <p className="mt-4 max-w-xs text-sm text-cream/70">
            Premium corporate gifting, made human. One vendor of record for marketplace, automation, and redemption.
          </p>
          <div className="mt-5">
            <p className="eyebrow text-champagne">The monthly note</p>
            <NewsletterForm />
          </div>
        </div>
        {columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <p className="text-sm font-semibold text-cream">{col.heading}</p>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-cream/70 hover:text-champagne">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-cream/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/60 sm:flex-row">
          <p>© {new Date().getFullYear()} OurDreams. All rights reserved. Original brand, not affiliated with any third party.</p>
          <div className="flex items-center gap-2" aria-label="Accepted payment methods">
            {payments.map((p) => (
              <span key={p} className="rounded-md bg-cream/10 px-2 py-1 text-[10px] uppercase tracking-wide">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
