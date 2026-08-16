"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ReelType {
  id: string;
  title: string;
  videoUrl: string;
  poster: string;
  productId: string;
  price: number;
}

export interface SettingsType {
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  facebookPixelId: string;
  whatsappNumber: string;
  messengerPageId: string;
  deliveryCharge: number;

  // Section Toggles
  showHero: boolean;
  showBestsellers: boolean;
  showReels: boolean;
  showNewArrivals: boolean;
  showOfferBanner: boolean;

  // Offer Banner
  offerBannerTitle: string;
  offerBannerSubtitle: string;
  offerBannerButtonText: string;
  offerBannerLink: string;

  // Video Reels
  reels: ReelType[];
}

interface SettingsContextType {
  settings: SettingsType;
  updateSettings: (newSettings: Partial<SettingsType>) => Promise<void>;
  isLoading: boolean;
}

const defaultSettings: SettingsType = {
  bkashNumber: "01700-000000",
  nagadNumber: "01800-000000",
  rocketNumber: "01900-000000",
  facebookPixelId: "",
  whatsappNumber: "+8801700000000",
  messengerPageId: "raib.official",
  deliveryCharge: 120,

  // Section Toggles
  showHero: true,
  showBestsellers: true,
  showReels: true,
  showNewArrivals: true,
  showOfferBanner: true,

  // Offer Banner
  offerBannerTitle: "Up to 30% off the Fall Collection",
  offerBannerSubtitle: "LIMITED TIME OFFER",
  offerBannerButtonText: "SHOP THE SALE",
  offerBannerLink: "/shop",

  // Video Reels
  reels: [
    {
      id: "reel-1",
      title: "New Style Large Capacity Shoulder Bag",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-showing-a-handbag-42848-large.mp4",
      poster: "/tote_bag_red_1786395433017.jpg",
      productId: "raib-tote-01",
      price: 4850,
    },
    {
      id: "reel-2",
      title: "Trendy Oxford Cloth Men's Outdoor Messenger Bag",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-holding-a-leather-bag-42850-large.mp4",
      poster: "/crossbody_black_1786395824801.jpg",
      productId: "raib-crossbody-02",
      price: 3950,
    },
    {
      id: "reel-3",
      title: "High-End Retro Commuter Shoulder Bag",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-model-posing-with-a-leather-bag-42849-large.mp4",
      poster: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80",
      productId: "raib-shoulder-03",
      price: 5200,
    },
    {
      id: "reel-4",
      title: "Luxury Crocodile Pattern Genuine Leather Kelly Handbag",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-holding-a-stylish-black-handbag-42851-large.mp4",
      poster: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80",
      productId: "raib-clutch-04",
      price: 6800,
    },
    {
      id: "reel-5",
      title: "Butterfly Design Shoulder Bag",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-with-a-handbag-42852-large.mp4",
      poster: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
      productId: "raib-tote-01",
      price: 3700,
    },
  ],
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsType>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch settings dynamically from MongoDB on mount
  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.success && data.settings) {
          setSettings((prev) => ({ ...prev, ...data.settings }));
        }
      } catch (err) {
        console.error("Failed to load dynamic settings from API:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<SettingsType>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);

    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } catch (err) {
      console.error("Failed to sync settings to MongoDB:", err);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
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
