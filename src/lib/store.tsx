"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language } from "./translations";

export type ThemeMode = "light" | "dark";

export interface CartItem {
  id: string;
  name: string;
  nameBn?: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: string;
  quantity: number;
}

export interface ProductType {
  _id?: string;
  id: string;
  name: string;
  nameBn?: string;
  price: number;
  originalPrice?: number;
  category: string;
  color: string;
  material: string;
  image: string;
  secondaryImage?: string;
  images?: string[];
  description: string;
  descriptionBn?: string;
  rating: number;
  reviewCount: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  dimensions?: string;
}

interface AppContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations['en'], params?: Record<string, string | number>) => string;
  cart: CartItem[];
  addToCart: (product: ProductType, selectedColor?: string, quantity?: number) => void;
  removeFromCart: (id: string, color: string) => void;
  updateQuantity: (id: string, color: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [lang, setLang] = useState<Language>('en');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Force Light Mode on mount & clear any old dark mode in localStorage
  useEffect(() => {
    try {
      localStorage.removeItem("raib_theme");
      const root = document.documentElement;
      root.classList.remove("dark");
      root.classList.add("light");
      setThemeState('light');

      const savedLang = localStorage.getItem("raib_lang") as Language;
      if (savedLang) setLang(savedLang);

      const savedCart = localStorage.getItem("raib_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("raib_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Ensure root element stays light
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("raib_lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("raib_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("raib_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const t = (key: keyof typeof translations['en'], params?: Record<string, string | number>) => {
    let text = translations[lang]?.[key] || translations['en'][key] || String(key);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  const addToCart = (product: ProductType, selectedColor?: string, quantityAdd = 1) => {
    const color = selectedColor || product.color || "Default";
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.color === color);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.color === color
            ? { ...item, quantity: item.quantity + quantityAdd }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          nameBn: product.nameBn,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          color,
          quantity: quantityAdd,
        },
      ];
    });
    setIsCartOpen(true);
    showToast(lang === 'en' ? `Added ${product.name} to Cart` : `কার্টে যোগ করা হয়েছে: ${product.nameBn || product.name}`);
  };

  const removeFromCart = (id: string, color: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.color === color)));
  };

  const updateQuantity = (id: string, color: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.color === color ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(
        exists
          ? (lang === 'en' ? "Removed from Wishlist" : "উইশলিস্ট থেকে সরানো হয়েছে")
          : (lang === 'en' ? "Added to Wishlist ❤️" : "উইশলিস্টে যুক্ত হয়েছে ❤️")
      );
      return updated;
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        lang,
        setLang,
        t,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        wishlist,
        toggleWishlist,
        isCartOpen,
        setIsCartOpen,
        isAuthOpen,
        setIsAuthOpen,
        isSearchOpen,
        setIsSearchOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
