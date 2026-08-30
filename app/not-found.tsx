import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center pt-[var(--header-h)] text-center">
      <p className="font-display text-7xl text-gold">404</p>
      <h1 className="mt-4 text-[var(--step-2)]">This gift took a wrong turn.</h1>
      <p className="mt-3 text-ink/70">The page you're looking for isn't here — let's get you back.</p>
      <Link href="/" className="btn-primary mt-6">Return home</Link>
    </div>
  );
}
