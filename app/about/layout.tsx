import type { Metadata } from "next";
import Header from "../shop/Header";
import Footer from "../shop/Footer";

export const metadata: Metadata = {
  title: "About Us - Our Dreams",
  description: "Learn more about our sustainable furniture and design principles",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.1/css/bootstrap.min.css"
        rel="stylesheet"
        suppressHydrationWarning
      />
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat:300,400,600,700,800"
        rel="stylesheet"
        suppressHydrationWarning
      />
      <div className="shop-wrapper" style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '90px' }}>
        <style>{`
          body {
            font-family: Montserrat, sans-serif !important;
            background-color: #ffffff !important;
            color: #29323a !important;
          }
          .shop-wrapper {
            font-family: Montserrat, sans-serif;
            color: #29323a;
          }
          .shop-wrapper * {
            box-sizing: border-box;
          }
        `}</style>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}