"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface SettingsType {
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  facebookPixelId: string;
  whatsappNumber: string;
  messengerPageId: string;
  deliveryCharge: number;
}

const DEFAULT_SETTINGS: SettingsType = {
  bkashNumber: "01700-000000",
  nagadNumber: "01800-000000",
  rocketNumber: "01900-000000",
  facebookPixelId: "",
  whatsappNumber: "+8801700000000",
  messengerPageId: "raib.official",
  deliveryCharge: 120,
};

interface SettingsContextType {
  settings: SettingsType;
  updateSettings: (newSettings: Partial<SettingsType>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsType>(DEFAULT_SETTINGS);

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

  const updateSettings = (newSettings: Partial<SettingsType>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem("raib_settings", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
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
