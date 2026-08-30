import Link from "next/link";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="OurDreams home" className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
        <rect width="64" height="64" rx="14" fill="var(--ink)" />
        <path d="M20 44V20l12 14 12-14v24" fill="none" stroke="var(--champagne)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-display text-xl tracking-tight text-ink">OurDreams</span>
    </Link>
  );
}
