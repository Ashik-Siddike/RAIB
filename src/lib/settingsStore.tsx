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
  whatsappNumber: string;
  messengerPageId: string;
  deliveryCharge: number;
  adminPassword?: string;

  showHero: boolean;
  showBestsellers: boolean;
  showReels: boolean;
  showNewArrivals: boolean;
  showOfferBanner: boolean;

  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroImage: string;

  bestsellersBadge: string;
  bestsellersTitle: string;
  bestsellersSubtitle: string;

  reelsBadge: string;
  reelsTitle: string;
  reelsSubtitle: string;
  reels: ReelType[];

  newArrivalsBadge: string;
  newArrivalsTitle: string;
  newArrivalsSubtitle: string;

  offerBannerBadge: string;
  offerBannerTitle: string;
  offerBannerSubtitle: string;
  offerBannerButtonText: string;
  offerBannerLink: string;
}

export const DEFAULT_SETTINGS: SettingsType = {
  bkashNumber: "01700-000000",
  nagadNumber: "01800-000000",
  rocketNumber: "01900-000000",
  facebookPixelId: "",
  whatsappNumber: "+8801700000000",
  messengerPageId: "raib.official",
  deliveryCharge: 120,
  adminPassword: "admin",

  showHero: true,
  showBestsellers: true,
  showReels: true,
  showNewArrivals: true,
  showOfferBanner: true,

  heroBadge: "CRAFTED FOR THE MODERN WOMAN",
  heroTitle: "RAIB",
  heroSubtitle: "Timeless bags designed to carry your story — from boardroom meetings to weekend escapes.",
  heroCtaText: "SHOP COLLECTION",
  heroImage: "/tote_bag_red_1786395433017.jpg",

  bestsellersBadge: "FEATURED TODAY",
  bestsellersTitle: "Bestsellers",
  bestsellersSubtitle: "Handcrafted Italian leather favorites loved by modern women.",

  reelsBadge: "CLIENT STORIES",
  reelsTitle: "STORIES THAT LEAD",
  reelsSubtitle: "Real clients showcasing RAIB genuine Italian leather bags in motion",
  reels: [
    {
      id: "reel-1",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-showing-a-handbag-41551-large.mp4",
      poster: "/tote_bag_red_1786395433017.jpg",
      title: "Royal Crimson Italian Tote in Motion",
      price: 4850,
      productId: "raib-tote-01",
    },
    {
      id: "reel-2",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-holding-a-black-bag-41550-large.mp4",
      poster: "/crossbody_black_1786395824801.jpg",
      title: "Obsidian Black Leather Crossbody Unboxing",
      price: 3950,
      productId: "raib-crossbody-02",
    },
    {
      id: "reel-3",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-carrying-a-leather-bag-in-the-city-41552-large.mp4",
      poster: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80",
      title: "Emerald Gold Structured Bag Styling",
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

  offerBannerBadge: "LIMITED TIME",
  offerBannerTitle: "Up to 30% off the Fall Collection",
  offerBannerSubtitle: "LIMITED TIME OFFER",
  offerBannerButtonText: "SHOP THE SALE",
  offerBannerLink: "/shop",
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

  // Fetch settings from MongoDB API
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.success && data.settings) {
          setSettings({
            ...DEFAULT_SETTINGS,
            ...data.settings,
          });
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
