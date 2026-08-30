import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { WpPost } from "@/lib/wp/types";

export function BlogCards({ posts }: { posts: WpPost[] }) {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">From the journal</p>
              <h2 className="mt-2 text-[var(--step-3)]">Ideas worth gifting.</h2>
            </div>
            <Link href="/blog/" className="btn-ghost text-sm">All posts →</Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <Link href={`/blog/${p.slug}/`} className="card group block h-full overflow-hidden">
                <img src={p.featuredMedia ?? "/placeholder-post-1.svg"} alt="" className="aspect-[16/10] w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <p className="text-xs text-ink/50">{new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                  <h3 className="mt-1 font-display text-xl group-hover:text-gold">{p.title}</h3>
                  <p className="mt-2 text-sm text-ink/70">{p.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
