import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "RAIB | Contemporary Luxury Handbags & Leather Goods",
  description: "Explore RAIB's handcrafted Italian leather tote bags, shoulder bags, crossbody bags, and clutches. Quiet luxury crafted for empowered women.",
  keywords: "RAIB, ladies bag, luxury handbag, leather tote, designer purse, Bangladesh luxury bags, ecommerce",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-zinc-950 text-zinc-100 antialiased selection:bg-red-600 selection:text-white min-h-screen flex flex-col justify-between`}>
        <SettingsProvider>
          <AppProvider>
            <FacebookPixel />
            <Header />
            <main className="flex-1">{children}</main>
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
