"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ReelType {
  id: string;
  videoUrl: string;
  poster: string;
  title: string;
  price: number;
  productId: string;
}

export interface SettingsType {
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  facebookPixelId: string;
  tiktokPixelId?: string;
  whatsappNumber: string;
  messengerPageId: string;
  facebookPageUrl?: string;
  instagramUrl?: string;
  deliveryCharge: number;
  adminPassword?: string;

  showAnnouncementBar: boolean;
  announcementText: string;
  stockUrgencyText?: string;

  showHero: boolean;
  showBestsellers: boolean;
  showReels: boolean;
  showNewArrivals: boolean;
  showOfferBanner: boolean;
  showTrustBadges: boolean;

  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroImage: string;

  bestsellersBadge: string;
  bestsellersTitle: string;
  bestsellersSubtitle: string;
  bestsellersCtaText: string;

  reelsBadge: string;
  reelsTitle: string;
  reelsSubtitle: string;
  reels: ReelType[];

  newArrivalsBadge: string;
  newArrivalsTitle: string;
  newArrivalsSubtitle: string;
  newArrivalsCtaText: string;

  offerBannerBadge: string;
  offerBannerTitle: string;
  offerBannerSubtitle: string;
  offerBannerButtonText: string;
  offerBannerLink: string;

  trustBadge1Title: string;
  trustBadge1Subtitle: string;
  trustBadge2Title: string;
  trustBadge2Subtitle: string;
  trustBadge3Title: string;
  trustBadge3Subtitle: string;
  trustBadge4Title: string;
  trustBadge4Subtitle: string;

  footerTagline: string;
  footerPhone: string;
  footerEmail: string;
  footerAddress: string;
  footerCopyright: string;
}

export const DEFAULT_SETTINGS: SettingsType = {
  bkashNumber: "01700-000000",
  nagadNumber: "01800-000000",
  rocketNumber: "01900-000000",
  facebookPixelId: "",
  tiktokPixelId: "",
  whatsappNumber: "+8801700000000",
  messengerPageId: "raib.official",
  facebookPageUrl: "https://facebook.com/raib.official",
  instagramUrl: "https://instagram.com/raib.official",
  deliveryCharge: 120,
  adminPassword: "admin",

  showAnnouncementBar: true,
  announcementText: "FREE EXPRESS SHIPPING NATIONWIDE ON ORDERS OVER ৳3,000 | 100% GENUINE ITALIAN LEATHER",
  stockUrgencyText: "🔥 স্টক সীমিত! ঢাকায় মাত্র ৪টি ব্যাগ বাকি আছে।",

  showHero: true,
  showBestsellers: true,
  showReels: true,
  showNewArrivals: true,
  showOfferBanner: false, // Turn off offer banner by default as requested
  showTrustBadges: true,

  heroBadge: "STYLED FOR THE MODERN WOMAN",
  heroTitle: "RAIB",
  heroSubtitle: "Timeless bags designed to carry your story — from boardroom meetings to weekend escapes.",
  heroCtaText: "SHOP COLLECTION",
  heroImage: "/hero-luxury-bg.jpg",

  bestsellersBadge: "FEATURED TODAY",
  bestsellersTitle: "Bestsellers",
  bestsellersSubtitle: "Handcrafted Italian leather favorites loved by modern women.",
  bestsellersCtaText: "VIEW ALL BESTSELLERS",

  reelsBadge: "CLIENT STORIES",
  reelsTitle: "STORIES THAT LEAD",
  reelsSubtitle: "Real clients showcasing RAIB genuine Italian leather bags in motion",
  reels: [
    {
      id: "reel-1",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-holding-a-black-handbag-41551-large.mp4",
      poster: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80",
      title: "The Royal Crimson Italian Leather Tote",
      price: 4850,
      productId: "raib-tote-01",
    },
    {
      id: "reel-2",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-with-a-red-handbag-in-a-park-41552-large.mp4",
      poster: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80",
      title: "Noir Velvet Executive Crossbody",
      price: 3950,
      productId: "raib-black-02",
    },
    {
      id: "reel-3",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fashion-woman-with-a-bag-walking-in-the-street-41550-large.mp4",
      poster: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
      title: "Emerald Gold Italian Clutch",
      price: 5200,
      productId: "raib-emerald-03",
    },
    {
      id: "reel-4",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-with-a-red-handbag-41553-large.mp4",
      poster: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
      title: "Sapphire Blue Shoulder Bag Review",
      price: 4300,
      productId: "raib-blue-04",
    },
    {
      id: "reel-5",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-walking-down-the-street-with-a-bag-41554-large.mp4",
      poster: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80",
      title: "Pearl Ivory Mini Clutch Showcase",
      price: 3100,
      productId: "raib-clutch-05",
    },
  ],

  newArrivalsBadge: "JUST ARRIVED",
  newArrivalsTitle: "New Arrivals",
  newArrivalsSubtitle: "Freshly launched seasonal additions to our signature collection.",
  newArrivalsCtaText: "EXPLORE ALL BAGS",

  offerBannerBadge: "LIMITED TIME",
  offerBannerTitle: "Up to 30% off the Fall Collection",
  offerBannerSubtitle: "LIMITED TIME OFFER",
  offerBannerButtonText: "SHOP THE SALE",
  offerBannerLink: "/shop",

  trustBadge1Title: "100% Genuine Italian Leather",
  trustBadge1Subtitle: "Handcrafted by master artisans",
  trustBadge2Title: "Cash on Delivery",
  trustBadge2Subtitle: "Fast home delivery across BD",
  trustBadge3Title: "7-Day Easy Exchange",
  trustBadge3Subtitle: "Guaranteed replacement protection",
  trustBadge4Title: "18K Gold-Plated Hardware",
  trustBadge4Subtitle: "Rust & tarnish resistant",

  footerTagline: "Timeless luxury ladies bags designed to carry your story with elegance.",
  footerPhone: "+880 1700-000000",
  footerEmail: "support@raib.site",
  footerAddress: "House 42, Road 11, Block D, Banani, Dhaka-1213, Bangladesh",
  footerCopyright: "© 2026 RAIB Leather. All rights reserved.",
};

interface SettingsContextType {
  settings: SettingsType;
  updateSettings: (newSettings: Partial<SettingsType>) => Promise<boolean>;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsType>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  // Sync settings with localStorage synchronously on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("raib_settings");
      if (saved) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Fetch settings from MongoDB API and sync with state & localStorage
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.success && data.settings) {
          const merged = { ...DEFAULT_SETTINGS, ...data.settings };
          setSettings(merged);
          try {
            localStorage.setItem("raib_settings", JSON.stringify(merged));
          } catch (e) {
            console.error(e);
          }
        }
      } catch (err) {
        console.error("Failed to load settings from API:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<SettingsType>): Promise<boolean> => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      localStorage.setItem("raib_settings", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      return data.success;
    } catch (err) {
      console.error("Failed to save settings to API:", err);
      return false;
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
