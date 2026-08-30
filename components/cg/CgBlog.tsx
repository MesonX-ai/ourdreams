"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/useAnimations";
import { RandomGoldenGlow } from "./RandomGoldenGlow";

const posts = [
  {
    img: "/cg/blog/client-gift-guide-2026.png",
    alt: "2026 Client Gift Ideas",
    title: "2026 Client Gift Ideas: Elevated Gifts for Every Budget",
    href: "/",
    category: "Guide",
  },
  {
    img: "/cg/blog/gifting-strategy.png",
    alt: "Gifting strategy",
    title: "The 5 Questions That Will Shape Your Gifting Strategy",
    href: "/",
    category: "Strategy",
  },
  {
    img: "/cg/blog/trends-2026.webp",
    alt: "Gifting trends 2026",
    title: "What's Trending in Gifting for 2026",
    href: "/",
    category: "Trends",
  },
];

export function CgBlog() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section aria-label="Updates and inspiration" className="cg-section-elegant py-20 md:py-28">
      <div className="cg-orb" style={{ bottom: "10%", left: "10%", width: 240, height: 240, background: "radial-gradient(circle, rgba(255,215,0,0.05), transparent 70%)" }} />
      <RandomGoldenGlow count={6} />

      <div className="container">
        <header className="flex flex-col items-center justify-between gap-4 text-center">
          <h2 className="cg-h2">
            Updates and <b className="cg-gradient-text">inspiration</b>
          </h2>
        </header>

        <div ref={ref} className={`cg-stagger-grid ${inView ? "is-visible" : ""} mt-16 grid grid-cols-1 gap-8 md:grid-cols-3`}>
          {posts.map((post) => (
            <Link
              key={post.title}
              href={post.href}
              className="cg-media-card cg-tilt cg-shimmer-border group flex flex-col overflow-hidden"
              title={post.title}
              rel="noopener noreferrer"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={post.img}
                  alt={post.alt}
                  width={484}
                  height={280}
                  className="aspect-[484/280] w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute left-4 top-4 rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-white">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-lg font-extrabold leading-snug transition-colors group-hover:text-gold" style={{ fontFamily: "var(--font-display)" }}>
                  {post.title}
                </h3>
                <span className="cg-animated-link mt-auto w-fit text-sm font-semibold text-gold">Read more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
