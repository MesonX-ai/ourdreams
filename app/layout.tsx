import type { Metadata } from "next";
import { headLinks, headStyles } from "@/content/home/head-styles";
import { pageMeta } from "@/content/home/meta";

export const metadata: Metadata = {
  title: pageMeta.title,
  description: pageMeta.description || undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={pageMeta.htmlClass}>
      <head>
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
