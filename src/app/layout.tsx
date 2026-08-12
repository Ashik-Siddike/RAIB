import type { Metadata, Viewport } from "next";
import { Inter, Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import { SettingsProvider } from "@/lib/settingsStore";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { AuthModal } from "@/components/AuthModal";
import { SearchModal } from "@/components/SearchModal";
import { Toast } from "@/components/Toast";
import { LiveChatWidget } from "@/components/LiveChatWidget";
import { FacebookPixel } from "@/components/FacebookPixel";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#09090b",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://raib.site"),
  title: {
    default: "RAIB | Genuine Italian Leather Ladies Bags in Bangladesh",
    template: "%s | RAIB Luxury Bags",
  },
  description: "Discover RAIB's handcrafted Italian leather tote bags, shoulder bags, crossbody bags, and evening clutches. Cash on Delivery & Free Delivery over ৳3,000 in Bangladesh.",
  keywords: [
    "RAIB", "RAIB bags", "RAIB leather bags", "ladies bag Bangladesh", "luxury handbag BD",
    "leather tote bag Dhaka", "crossbody bag Bangladesh", "cash on delivery ladies bag",
    "genuine leather purse BD", "Italian leather bags Bangladesh"
  ],
  authors: [{ name: "RAIB Luxury Leather Goods" }],
  creator: "RAIB",
  publisher: "RAIB",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "RAIB | Genuine Italian Leather Ladies Bags in Bangladesh",
    description: "Explore RAIB's handcrafted Italian leather tote bags, shoulder bags, crossbody bags, and clutches. Quiet luxury crafted for empowered women.",
    url: "https://raib.site",
    siteName: "RAIB Luxury Leather Goods",
    images: [
      {
        url: "/tote_bag_red_1786395433017.jpg",
        width: 1200,
        height: 630,
        alt: "RAIB Royal Crimson Italian Leather Tote",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RAIB | Genuine Italian Leather Ladies Bags in Bangladesh",
    description: "Handcrafted Italian leather tote bags & clutches in Bangladesh. Cash on Delivery available.",
    images: ["/tote_bag_red_1786395433017.jpg"],
  },
  other: {
    "geo.region": "BD-13",
    "geo.placename": "Dhaka, Bangladesh",
    "geo.position": "23.8103;90.4125",
    "ICBM": "23.8103, 90.4125",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "name": "RAIB",
    "url": "https://raib.site",
    "logo": "https://raib.site/logo.png",
    "image": "https://raib.site/tote_bag_red_1786395433017.jpg",
    "description": "Contemporary luxury handcrafted Italian leather tote bags, shoulder bags, and clutches in Bangladesh.",
    "telephone": "+8801700000000",
    "priceRange": "৳2,500 - ৳10,000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gulshan Avenue",
      "addressLocality": "Dhaka",
      "addressRegion": "Dhaka Division",
      "postalCode": "1212",
      "addressCountry": "BD"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.8103,
      "longitude": 90.4125
    },
    "currenciesAccepted": "BDT",
    "paymentAccepted": "Cash, bKash, Nagad, Rocket, Cash on Delivery",
    "openingHours": "Mo-Su 09:00-22:00"
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${cinzel.variable} ${cormorant.variable} font-sans bg-zinc-950 text-zinc-100 antialiased selection:bg-red-600 selection:text-white min-h-screen flex flex-col justify-between overflow-x-hidden`}>
        <SettingsProvider>
          <AppProvider>
            <AnalyticsTracker />
            <FacebookPixel />
            <Header />
            <main className="flex-1 w-full overflow-x-hidden">{children}</main>
            <Footer />
            <CartDrawer />
            <MobileBottomNav />
            <AuthModal />
            <SearchModal />
            <Toast />
            <LiveChatWidget />
          </AppProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
