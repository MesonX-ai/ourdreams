import type { Metadata } from "next";
import Header from "./Header";
import Footer from "./Footer";
import { SEO_CONFIG, STRUCTURED_DATA } from "@/lib/seo";

export const metadata: Metadata = {
  title: SEO_CONFIG.pages.catalog.title,
  description: SEO_CONFIG.pages.catalog.description,
  keywords: SEO_CONFIG.pages.catalog.keywords,
  openGraph: {
    title: SEO_CONFIG.pages.catalog.ogTitle,
    description: SEO_CONFIG.pages.catalog.ogDescription,
    url: `${SEO_CONFIG.site.url}/shop/catalog`,
    siteName: SEO_CONFIG.site.name,
    images: [
      {
        url: SEO_CONFIG.site.image,
        width: 1200,
        height: 630,
        alt: "Corporate Gifts Catalog - OurDreams",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_CONFIG.pages.catalog.ogTitle,
    description: SEO_CONFIG.pages.catalog.ogDescription,
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
    canonical: `${SEO_CONFIG.site.url}/shop/catalog`,
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Structured Data - Breadcrumb Navigation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            STRUCTURED_DATA.breadcrumb([
              { name: "Home", url: SEO_CONFIG.site.url },
              { name: "Shop", url: `${SEO_CONFIG.site.url}/shop` },
              {
                name: "Catalog",
                url: `${SEO_CONFIG.site.url}/shop/catalog`,
              },
            ])
          ),
        }}
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.1/css/bootstrap.min.css"
        rel="stylesheet"
        suppressHydrationWarning
      />
      {/* Preload custom fonts to reduce render-blocking */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
        suppressHydrationWarning
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
        suppressHydrationWarning
      />
      {/* Use font-display=swap to prevent FOIT (Flash of Invisible Text) */}
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
        rel="stylesheet"
        suppressHydrationWarning
      />
      <div className="shop-wrapper" style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '90px' }}>
        <style>{`
          /* System fonts render immediately while custom fonts load */
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
            background-color: #ffffff !important;
            color: #2D2928 !important;
          }
          .shop-wrapper {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            color: #2D2928;
            background-color: #ffffff;
          }
          .shop-wrapper * {
            box-sizing: border-box;
          }
          
          /* Use display:swap to allow font to load after page render */
          @supports (font-display: swap) {
            .shop-wrapper h1, .shop-wrapper h2, .shop-wrapper h3, .shop-wrapper h4 {
              font-family: 'Bebas Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              color: #2D2928;
            }
          }
          
          /* Fallback fonts render immediately */
          .shop-wrapper h1, .shop-wrapper h2, .shop-wrapper h3, .shop-wrapper h4 {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Bebas Neue', sans-serif;
            color: #2D2928;
            letter-spacing: 0.05em;
          }
          
          .shop-wrapper h5, .shop-wrapper h6 {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif;
            font-weight: 600;
          }
          
          /* Font swap animation to reduce layout shift */
          @font-feature-values 'Bebas Neue' {
            @styleset {
              off: 0;
              on: 1;
            }
          }
        `}</style>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
