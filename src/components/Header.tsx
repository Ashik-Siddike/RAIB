"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/store";
import { useSettings } from "@/lib/settingsStore";
import {
  ShoppingBag,
  Search,
  User,
  Menu,
  X,
  PhoneCall,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const pathname = usePathname();
  const { cart, isCartOpen, setIsCartOpen, setIsSearchOpen, setIsAuthOpen, lang, setLang } = useApp();
  const { settings } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [
    { name: "Tote Bags", bnName: "টোট ব্যাগ", href: "/shop?category=Tote Bags" },
    { name: "Crossbody Bags", bnName: "ক্রসবডি ব্যাগ", href: "/shop?category=Crossbody Bags" },
    { name: "Shoulder Bags", bnName: "শোল্ডার ব্যাগ", href: "/shop?category=Shoulder Bags" },
    { name: "Clutches & Evening", bnName: "ক্লাচ ব্যাগ", href: "/shop?category=Clutches & Evening" },
    { name: "Best Sellers", bnName: "বেস্ট সেলার", href: "/shop?category=Best Sellers" },
  ];

  const showBar = settings.showAnnouncementBar ?? true;
  const barText = settings.announcementText || "FREE EXPRESS SHIPPING NATIONWIDE ON ORDERS OVER ৳3,000 | 100% PREMIUM CHINESE LEATHER";

  return (
    <>
      {/* Dynamic Top Announcement Bar */}
      {showBar && (
        <div className="bg-red-600 text-white text-[11px] font-bold py-2 px-4 text-center tracking-widest font-sans uppercase flex items-center justify-center gap-2 shadow-md">
          <span>{barText}</span>
        </div>
      )}

      {/* Main Dark Translucent Gradient Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-zinc-950/95 via-zinc-900/95 to-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 text-white shadow-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Left: Mobile Hamburger & Search */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-xl transition cursor-pointer"
                aria-label="Open Navigation Drawer"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-xl transition cursor-pointer flex items-center gap-2"
                aria-label="Search Handbags"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                <span className="hidden md:inline text-xs font-medium text-zinc-400">Search products...</span>
              </button>
            </div>

            {/* Center: Clean Brand Logos directly on dark navbar */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 cursor-pointer py-1"
            >
              {/* Main emblem logo */}
              <div className="relative h-7 sm:h-9 w-7 sm:w-9 flex-shrink-0">
                <Image
                  src="/main-logo.png"
                  alt="RAIB Emblem Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Styled letter logo */}
              <div className="relative h-7 sm:h-9 w-28 sm:w-36 flex-shrink-0">
                <Image
                  src="/raib leter logo.png"
                  alt="RAIB Letter Logo"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Right: Language Switcher, Account, Cart */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Language Switcher */}
              <button
                onClick={() => setLang(lang === "en" ? "bn" : "en")}
                className="hidden sm:flex px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-[11px] font-bold text-zinc-300 hover:text-white transition cursor-pointer"
              >
                {lang === "en" ? "বাংলা" : "ENG"}
              </button>

              {/* Account Button */}
              <button
                onClick={() => setIsAuthOpen(true)}
                className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-xl transition cursor-pointer"
                aria-label="User Account"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Shopping Bag Trigger */}
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg transition flex items-center justify-center cursor-pointer group"
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white text-zinc-950 font-extrabold text-[10px] flex items-center justify-center shadow-md font-mono border border-zinc-300">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Desktop Navigation Links Category Bar */}
        <nav className="hidden lg:block border-t border-zinc-800/60 bg-zinc-950/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-8 h-10 text-xs font-bold uppercase tracking-wider">
              {categories.map((cat) => {
                const isActive = pathname === cat.href;
                return (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className={`transition-colors py-2 border-b-2 ${
                      isActive
                        ? "text-red-500 border-red-500 font-extrabold"
                        : "text-zinc-300 hover:text-white border-transparent"
                    }`}
                  >
                    {lang === "bn" ? cat.bnName : cat.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-zinc-950 text-white shadow-2xl flex flex-col justify-between border-r border-zinc-800 p-6 font-sans z-10"
            >
              <div className="space-y-6">
                
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
                  <div className="flex items-center gap-2">
                    <div className="relative h-6 w-6 flex-shrink-0">
                      <Image src="/main-logo.png" alt="RAIB Logo" fill className="object-contain" />
                    </div>
                    <div className="relative h-6 w-24 flex-shrink-0">
                      <Image src="/raib leter logo.png" alt="RAIB Wordmark" fill className="object-contain object-left" />
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 block mb-2 font-serif">
                    Categories
                  </span>
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-3 px-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 text-sm font-bold text-zinc-200 hover:text-white transition"
                    >
                      <span>{lang === "bn" ? cat.bnName : cat.name}</span>
                      <ChevronRight className="w-4 h-4 text-zinc-500" />
                    </Link>
                  ))}
                </div>

              </div>

              {/* Footer info inside Drawer */}
              <div className="pt-6 border-t border-zinc-900 space-y-4">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Language</span>
                  <button
                    onClick={() => setLang(lang === "en" ? "bn" : "en")}
                    className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold"
                  >
                    {lang === "en" ? "বাংলায় দেখুন" : "English"}
                  </button>
                </div>

                <div className="text-[11px] text-zinc-500 space-y-1">
                  <p>Customer Support: {settings.footerPhone || "+880 1700-000000"}</p>
                  <p>{settings.footerAddress || "House 42, Gulshan Avenue, Dhaka"}</p>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
