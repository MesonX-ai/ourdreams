"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="bg-plum text-cream">
      <div className="container flex items-center justify-center gap-3 py-2 text-center text-sm">
        <span className="hidden sm:inline">🍂</span>
        <span>Autumn gifting is open — book your holiday program before Oct 31 for priority fulfilment.</span>
        <Link href="/request-demo/" className="font-medium text-champagne underline-offset-2 hover:underline">
          Reserve now
        </Link>
        <button type="button" aria-label="Dismiss announcement" className="ml-2 rounded p-1 hover:bg-cream/10" onClick={() => setOpen(false)}>
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
