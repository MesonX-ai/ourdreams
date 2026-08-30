"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Wordmark } from "@/components/ui/Wordmark";
import { AnnouncementBar } from "./AnnouncementBar";
import { megaMenus, utilityLinks } from "./navData";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const open = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(id);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 flex flex-col ${
        scrolled || openMenu ? "bg-cream/80 shadow-soft backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <AnnouncementBar />
      <a href="/cart/" className="sr-only">View cart</a>
      <nav className="container flex h-[var(--header-h)] items-center justify-between gap-4" aria-label="Primary">
        <Wordmark />

        <ul className="hidden items-center gap-1 lg:flex">
          {megaMenus.map((m) => (
            <li key={m.id} className="relative" onMouseEnter={() => open(m.id)} onMouseLeave={scheduleClose}>
              <button
                type="button"
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink/100 hover:text-ink aria-expanded:bg-ink/5"
                aria-expanded={openMenu === m.id}
                aria-haspopup="true"
                aria-controls={`mega-${m.id}`}
                onClick={() => (openMenu === m.id ? setOpenMenu(null) : open(m.id))}
                onFocus={() => open(m.id)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setOpenMenu(null);
                }}
              >
                {m.label}
                <ChevronDown className={`h-4 w-4 transition-transform ${openMenu === m.id ? "rotate-180" : ""}`} aria-hidden />
              </button>

              {openMenu === m.id && (
                <MegaPanel menu={m} onClose={() => setOpenMenu(null)} />
              )}
            </li>
          ))}
          {utilityLinks.map((u) => (
            <li key={u.href}>
              <Link href={u.href} className="rounded-full px-4 py-2 text-sm font-medium text-ink/100 hover:text-ink">
                {u.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/request-demo/" className="btn-primary hidden sm:inline-flex">
            Talk to sales
          </Link>
          <button
            type="button"
            className="btn-ghost lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}
    </header>
  );
}

function MegaPanel({ menu, onClose }: { menu: (typeof megaMenus)[number]; onClose: () => void }) {
  const panelId = useId();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      id={`mega-${menu.id}`}
      role="region"
      aria-label={`${menu.label} menu`}
      className="absolute left-1/2 top-full mt-3 w-[min(92vw,880px)] -translate-x-1/2 rounded-3xl border border-ink/10 bg-cream/95 p-6 shadow-glow backdrop-blur-xl"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {menu.columns.map((col) => (
          <div key={col.heading}>
            <p className="eyebrow mb-3">{col.heading}</p>
            <ul className="space-y-1">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block rounded-xl px-3 py-2 hover:bg-ink/5"
                    onClick={onClose}
                  >
                    <span className="block text-sm font-medium text-ink">{l.label}</span>
                    {l.desc && <span className="block text-xs text-ink/60">{l.desc}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {menu.feature && (
          <Link
            href={menu.feature.href}
            onClick={onClose}
            className="flex flex-col justify-between rounded-2xl bg-plum p-5 text-cream"
          >
            <div>
              <p className="font-display text-lg">{menu.feature.title}</p>
              <p className="mt-1 text-sm text-cream/80">{menu.feature.body}</p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-sm text-champagne">
              Explore <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-[min(88vw,360px)] overflow-y-auto bg-cream p-6 shadow-glow">
        <div className="flex items-center justify-between">
          <Wordmark />
          <button type="button" className="btn-ghost" aria-label="Close menu" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-6 space-y-6" aria-label="Mobile">
          {megaMenus.map((m) => (
            <div key={m.id}>
              <p className="eyebrow mb-2">{m.label}</p>
              <ul className="space-y-1">
                {m.columns.flatMap((c) => c.links).map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="block rounded-lg px-2 py-2 text-sm hover:bg-ink/5" onClick={onClose}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="border-t border-ink/10 pt-4">
            {utilityLinks.map((u) => (
              <Link key={u.href} href={u.href} className="block rounded-lg px-2 py-2 text-sm hover:bg-ink/5" onClick={onClose}>
                {u.label}
              </Link>
            ))}
          </div>
          <Link href="/request-demo/" className="btn-primary w-full" onClick={onClose}>
            Talk to sales
          </Link>
        </nav>
      </div>
    </div>
  );
}
