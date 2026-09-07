import type { Metadata } from "next";
import Header from "./Header";
import Footer from "./Footer";

export const metadata: Metadata = {
  title: "Shop - Our Dreams",
  description: "Browse our collection of premium furniture and home decor",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.1/css/bootstrap.min.css"
        rel="stylesheet"
        suppressHydrationWarning
      />
      <link
        href="https://fonts.googleapis.com/css?family=Bebas+Neue"
        rel="stylesheet"
        suppressHydrationWarning
      />
      <div className="shop-wrapper" style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '90px' }}>
        <style>{`
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
          .shop-wrapper h1, .shop-wrapper h2, .shop-wrapper h3, .shop-wrapper h4 {
            font-family: 'Bebas Neue', sans-serif;
            color: #2D2928;
          }
          .shop-wrapper h5, .shop-wrapper h6 {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif;
            font-weight: 600;
          }
        `}</style>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
