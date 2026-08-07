import type { Metadata, Viewport } from "next";
import { Gloock, Albert_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import { QuickViewProvider } from "@/components/product/QuickViewProvider";
import QuickViewDrawer from "@/components/product/QuickViewDrawer";
import { site } from "@/content/site";

const gloock = Gloock({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-gloock",
  display: "swap",
});

const albertSans = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-albert",
  display: "swap",
});

// Brand logo typeface — self-hosted and preloaded so it lands without a
// flash of fallback text; adjustFontFallback keeps the metrics matched so
// there's no layout shift when it swaps in.
const frunchySage = localFont({
  src: "../src/fonts/frunchy-sage.ttf",
  variable: "--font-frunchy",
  display: "swap",
  weight: "400",
  preload: true,
  adjustFontFallback: "Times New Roman",
});

// Decorative capital used for the two "B"s in the wordmark, matching the
// pouch label logo. Self-hosted and preloaded like the brand typeface.
const tanPearl = localFont({
  src: "../src/fonts/TAN-Pearl-Regular.ttf",
  variable: "--font-tan-pearl",
  display: "swap",
  weight: "400",
  preload: true,
  adjustFontFallback: "Times New Roman",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} — ${site.tagline}`,
    template: `%s — ${site.brand}`,
  },
  description: site.description,
  applicationName: site.brand,
  keywords: [...site.keywords],
  authors: [{ name: site.brand }],
  creator: site.brand,
  publisher: site.brand,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.brand,
    title: `${site.brand} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: "en_IN",
    images: [
      { url: "/og-image.jpg", width: 667, height: 667, alt: site.brand },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} — ${site.tagline}`,
    description: site.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "food",
};

export const viewport: Viewport = {
  themeColor: "#1E0D05",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: site.brand,
  description: site.description,
  url: site.url,
  logo: `${site.url}/brand-logo.png`,
  image: `${site.url}/og-image.jpg`,
  email: site.contact.email,
  telephone: site.contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  sameAs: site.socials.map((s) => s.href).filter((h) => h !== "#"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${gloock.variable} ${albertSans.variable} ${frunchySage.variable} ${tanPearl.variable}`}
    >
      <body>
        {/* Pre-paint: hide scroll-animated elements before first paint so
            they don't flash visible then re-animate once the JS bundle loads
            (noticeable on slow networks). Guarded: skipped for reduced-motion,
            and a fallback reveals everything after 2.5s if the app never
            hydrates, so content is never permanently hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('js-anim');setTimeout(function(){d.classList.remove('js-anim')},2500);}catch(e){}})();",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          <QuickViewProvider>
            {children}
            <QuickViewDrawer />
            <CartDrawer />
          </QuickViewProvider>
        </CartProvider>
      </body>
    </html>
  );
}
