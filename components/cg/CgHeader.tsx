"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { CgLogo } from "./CgLogo";
import { allMenus, type CgMenu } from "./cgNavData";
import { talkToSales } from "./talkToSales";

function SearchBar() {
  return (
    <div className="cg-search" role="search">
      <input type="search" placeholder="Search gifts, brands, occasions…" aria-label="Search" />
      <span className="cg-search-icon">
        <Search className="h-[14px] w-[14px] text-white" strokeWidth={2.5} />
      </span>
    </div>
  );
}

function Dropdown({ menu, onNavigate }: { menu: CgMenu; onNavigate: () => void }) {
  return (
    <div className="cg-dropdown" role="menu" aria-label={`${menu.label} submenu`}>
      <div className="grid grid-cols-1 gap-0">
        {menu.items.map((item) => (
          <Link key={item.label} href={item.href} role="menuitem" onClick={onNavigate}>
            {item.label}
            {item.desc && <span>{item.desc}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function CgHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const openPanel = talkToSales((s) => s.openPanel);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!openMenu) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  const toggle = (id: string) => setOpenMenu((cur) => (cur === id ? null : id));
  const openSoon = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(id);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 200);
  };

  return (
    <header ref={rootRef} className="cg-header-shell">
      <div className="container flex h-full flex-col">
        {/* Top row — logo, search, account icons */}
        <div className="flex flex-1 items-center justify-between gap-6" style={{ minHeight: 0 }}>
          <div className="flex items-center gap-4">
            {/* Mobile hamburger */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#222325] hover:bg-black/5 lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <CgLogo />
          </div>

          <div className="hidden flex-1 justify-center px-4 lg:flex">
            <SearchBar />
          </div>
          {/* Right icons: favorites, account, cart, CTA */}
          <div className="flex items-center gap-5">
            {/* Favorite icon (desktop) */}
            <Link href="/shop/" aria-label="Favorites" className="hidden text-[#222325] hover:opacity-60 md:block">
              <svg viewBox="0 0 25 22" width="22" height="20" fill="none" aria-hidden>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.3671 21.7659C12.5231 21.922 12.7312 22 12.9653 22C13.1993 22 13.4074 21.922 13.5634 21.7659L22.6925 12.0647C25.4234 9.25581 25.3974 4.78234 22.6665 2.05144C19.9096 -0.679462 15.4101 -0.679462 12.6792 2.02543L12.3671 2.33753L12.081 2.05144C9.32407 -0.679462 4.82459 -0.679462 2.06768 2.05144C-0.689227 4.80834 -0.689227 9.28182 2.06768 12.0387L12.3671 19.9713L22.6925 12.0647"
                  fill="#000"
                />
              </svg>
            </Link>
            {/* Account */}
            <Link
              href="/shop/"
              className="hidden items-center gap-2 text-sm font-medium text-[#222325] hover:opacity-60 md:flex"
            >
              <svg viewBox="0 0 24 22" width="22" height="20" fill="none" aria-hidden>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.7344 13.434C16.3079 13.434 15.9629 13.7824 15.9629 14.212C15.9629 14.6426 16.3079 14.991 16.7344 14.991C20.2227 13.434 23.06 16.2976 23.06 19.8196C23.06 21.0214 22.0897 22 20.8994 22H2.85054C1.66135 22 0.692139 21.0214 0.692139 19.8196C0.692139 16.2976 3.52832 13.434 7.01549 13.434C7.44203 13.434 7.78706 13.7824 7.78706 14.212C7.78706 14.6426 7.44203 14.991 7.01549 14.991C4.38029 14.991 2.23417 17.1567 2.23417 19.8196C2.23417 20.1623 2.51109 20.4419 2.85054 20.4419H20.8994C21.2399 20.4419 21.5169 20.1623 21.5169 19.8196C21.5169 17.1567 19.3707 14.991 16.7344 14.991ZM11.8761 1.55693C15.0662 1.55693 17.6601 4.04622 17.6601 7.10598C17.6601 11.0248 15.0662 14.212 11.8761 14.212C8.68593 14.212 6.09093 11.0248 6.09093 7.10598C6.09093 4.04622 8.68593 1.55693 11.8761 1.55693ZM10.2983 0C9.40286 0 8.56382 0.239079 7.72788 0.760992C6.67157 2.14431 6.09093 5.23901 6.09093 7.10598C6.09093 11.0248 8.68593 16.4649 11.8761 16.4649C15.0662 16.4649 17.6601 11.0248 17.6601 7.10598C17.6601 3.18715 15.0662 0 10.2983 0Z"
                  fill="#000"
                />
              </svg>
              My account
            </Link>
            {/* Cart */}
            <Link href="/shop/" aria-label="Cart" className="relative text-[#222325] hover:opacity-60">
              <svg viewBox="0 0 20 23" width="20" height="22" fill="none" aria-hidden>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.46387 21.125L2.73289 7.375H5.5873V8.94044C5.17174 9.179 4.88889 9.61763 4.88889 10.125C4.88889 10.884 5.51466 11.5 6.28571 11.5C7.05746 11.5 7.68254 10.884 7.68254 10.125C7.68254 9.61763 7.40038 9.179 6.98412 8.94044V7.375H12.5714V8.94044C12.1559 9.179 11.873 9.61763 11.873 10.125C11.873 10.884 12.4988 11.5 13.2698 11.5C14.0416 11.5 14.6667 10.884 14.6667 10.125C14.6667 9.61763 14.3845 9.179 13.9683 8.94044V7.375H16.8227L18.0924 21.125H1.46387ZM6.98412 4.625C6.98412 3.10837 8.23778 1.875 9.77778 1.875C11.3178 1.875 12.5714 3.10837 12.5714 4.625V6H6.98412V4.625ZM18.1559 6.62562C18.1238 6.27156 17.8221 6 17.4603 6H13.9682V4.625C13.9682 2.35006 12.0888 0.5 9.77776 0.5C7.46741 0.5 5.58728 2.35006 5.58728 4.625V6H2.09522C1.73414 6 1.43242 6.27156 1.3996 6.62562L0.00277084 21.7506C-0.0146895 21.9424 0.0509613 22.1336 0.182961 22.2759C0.314961 22.4189 0.502136 22.5 0.69839 22.5H18.8571C19.0541 22.5 19.2405 22.4189 19.3732 22.2759C19.5052 22.1336 19.5709 21.9424 19.5527 21.7506L18.1559 6.62562Z"
                  fill="#000"
                />
              </svg>
              <span
                className="absolute -right-2 -top-1.5 flex h-[22px] min-w-[22px] items-center justify-center rounded-full px-1 text-[14px] font-bold text-white"
                style={{ backgroundColor: "#d4af37" }}
              >
                0
              </span>
            </Link>
            {/* Talk to sales */}
            <button type="button" onClick={openPanel} className="cg-solid-btn hidden !px-5 !py-1.5 text-base md:inline-flex">
              Talk to sales
            </button>
          </div>
        </div>
{/* Menu row */}
        <nav className="hidden items-center gap-9 lg:flex" style={{ borderTop: "1px solid rgba(212, 175, 55, 0.2)" }}>
          {allMenus.map((menu) => (
            <div key={menu.id} className="relative" onMouseEnter={() => openSoon(menu.id)} onMouseLeave={closeSoon}>
              <button
                type="button"
                className="cg-menu-btn"
                aria-expanded={openMenu === menu.id}
                aria-haspopup="true"
                onClick={() => toggle(menu.id)}
              >
                {menu.label}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${openMenu === menu.id ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              {openMenu === menu.id && <Dropdown menu={menu} onNavigate={() => setOpenMenu(null)} />}
            </div>
          ))}
          <Link href="/pricing/" className="cg-header-link font-semibold">
            Pricing
          </Link>
          <Link href="/shop/" className="cg-shop-holiday">
            ⚡ Shop Holiday
          </Link>
          <Link href="/shop/" className="cg-header-link font-semibold">
            Let Them Choose!
          </Link>
        </nav>
      </div>

      {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}
    </header>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  const openPanel = talkToSales((s) => s.openPanel);
  return (
    <div className="fixed inset-0 z-[90] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 h-full w-full cursor-default bg-black/50"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 right-0 flex w-[min(90vw,380px)] flex-col overflow-y-auto bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <CgLogo />
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-6">
          <SearchBar />
        </div>
        <nav className="mt-6 space-y-5" aria-label="Mobile">
          {allMenus.map((menu) => (
            <div key={menu.id}>
              <p className="mb-1 text-sm font-bold uppercase tracking-wide text-[#62646a]">{menu.label}</p>
              <ul className="space-y-1">
                {menu.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="block rounded-lg px-2 py-2 text-sm hover:bg-black/5"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="border-t border-black/10 pt-4">
            <Link href="/pricing/" className="block rounded-lg px-2 py-2 text-sm hover:bg-black/5" onClick={onClose}>
              Pricing
            </Link>
            <Link href="/shop/" className="block rounded-lg px-2 py-2 text-sm font-bold text-[#d4af37]" onClick={onClose}>
              Shop Holiday
            </Link>
          </div>
          <button
            type="button"
            className="cg-solid-btn w-full"
            onClick={() => {
              onClose();
              openPanel();
            }}
          >
            Talk to sales
          </button>
        </nav>
      </div>
    </div>
  );
}