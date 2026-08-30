"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { talkToSales } from "./talkToSales";
import { CgRequestForm } from "./CgRequestForm";

export function CgTalkToSalesPanel() {
  const open = talkToSales((s) => s.open);
  const closePanel = talkToSales((s) => s.closePanel);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closePanel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Talk to sales">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 h-full w-full cursor-default bg-black/50"
        onClick={closePanel}
      />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-[660px] flex-col overflow-y-auto bg-white shadow-2xl">
        <div className="flex items-center justify-between px-8 pt-8">
          <p className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
            Talk to Sales
          </p>
          <button
            type="button"
            onClick={closePanel}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#62646a] hover:bg-black/5"
            aria-label="Close panel"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="px-8 pb-12 pt-4">
          <CgRequestForm id="drawer" />
        </div>
      </div>
    </div>
  );
}