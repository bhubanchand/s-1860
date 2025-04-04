
import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({ children, title = "tonight", description = "Tonight - It isn't just a blog. It's a time machine." }: LayoutProps) => {
  const location = useLocation();
  const canonicalUrl = `https://tonight.blog${location.pathname}`;
  const logoUrl = "https://res.cloudinary.com/dyzamqtdw/image/upload/v1743554489/logo_llf3w4.svg";

  useEffect(() => {
    if (window.adsbygoogle && typeof window.adsbygoogle.push === "function") {
      setTimeout(() => {
        try {
          window.adsbygoogle.push({});
        } catch (e) {
          console.error("Error pushing ads:", e);
        }
      }, 500); 
    }

    // Push to Google Tag Manager for tracking (if available)
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "pageView",
        pageTitle: title,
        pagePath: location.pathname,
        logoImage: logoUrl,
      });
    }
  }, [location.pathname, title]);

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={logoUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tonight Blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={logoUrl} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "${title}",
              "description": "${description}",
              "url": "${canonicalUrl}",
              "image": "${logoUrl}",
              "publisher": {
                "@type": "Organization",
                "name": "Tonight Blog",
                "logo": {
                  "@type": "ImageObject",
                  "url": "${logoUrl}"
                }
              }
            }
          `}
        </script>
      </Helmet>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
