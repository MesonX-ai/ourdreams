import type { Metadata } from "next";
import { headLinks, headStyles } from "@/content/home/head-styles";
import { pageMeta } from "@/content/home/meta";
import { SEO_CONFIG, SEO_KEYWORDS, STRUCTURED_DATA } from "@/lib/seo";

export const metadata: Metadata = {
  title: SEO_CONFIG.pages.home.title,
  description: SEO_CONFIG.pages.home.description,
  keywords: SEO_KEYWORDS.join(", "),
  openGraph: {
    title: SEO_CONFIG.pages.home.ogTitle,
    description: SEO_CONFIG.pages.home.ogDescription,
    url: SEO_CONFIG.site.url,
    siteName: SEO_CONFIG.site.name,
    images: [
      {
        url: SEO_CONFIG.site.image,
        width: 1200,
        height: 630,
        alt: "OurDreams - Curated Corporate Gifts",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_CONFIG.pages.home.ogTitle,
    description: SEO_CONFIG.pages.home.ogDescription,
    images: [SEO_CONFIG.site.image],
    creator: SEO_CONFIG.site.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SEO_CONFIG.site.url,
  },
  metadataBase: new URL(SEO_CONFIG.site.url),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={pageMeta.htmlClass}>
      <head>
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(STRUCTURED_DATA.organization),
          }}
        />
        
        {/* Standard Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="OurDreams Team - Shiva Dhanuskodi, Richa Shivarajkumar, Rohit Shivarajkumar" />
        <meta name="publisher" content="OurDreams" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Additional SEO Meta Tags */}
        <link rel="canonical" href={SEO_CONFIG.site.url} />
        <link rel="alternate" hrefLang="en-us" href={SEO_CONFIG.site.url} />
        
        {headLinks.map((link, i) => (
          <link
            key={i}
            rel={link.rel}
            href={link.href}
            id={link.id}
            media={link.media}
            sizes={link.sizes}
            as={link.as}
          />
        ))}
        {headStyles.map((style, i) => (
          <style
            key={i}
            id={style.id}
            media={style.media}
            dangerouslySetInnerHTML={{ __html: style.css }}
          />
        ))}
      </head>
      <body className={pageMeta.bodyClass} {...pageMeta.bodyData}>
        {children}
      </body>
    </html>
  );
}
