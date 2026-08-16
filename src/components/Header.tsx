"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { Search, ShoppingBag, Heart, Menu, X, User, Globe, ArrowRight, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const { lang, setLang, theme, toggleTheme, t, cartCount, wishlist, setIsCartOpen, setIsAuthOpen, setIsSearchOpen } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLang(lang === "en" ? "bn" : "en");
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-zinc-950 text-zinc-300 text-[10px] sm:text-xs py-1.5 px-4 sm:px-8 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0"></span>
            <span className="font-medium tracking-wide truncate">
              {lang === "en" ? "FREE Delivery in BD over ৳3,000 | Cash on Delivery" : "৳৩,০০০ টাকার অর্ডারে ফ্রি ডেলিভারি | ক্যাশ অন ডেলিভারি"}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-700/60 text-zinc-200 hover:border-red-500 transition-all cursor-pointer font-sans text-[10px] sm:text-xs font-semibold"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3 h-3 text-indigo-400" />
                  <span>Dark</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-700/60 text-zinc-200 hover:border-red-500 transition-all cursor-pointer font-sans text-[10px] sm:text-xs font-semibold"
              title="Switch Language"
            >
              <Globe className="w-3 h-3 text-red-500" />
              <span>{lang === "en" ? "বাংলা" : "English"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/95 dark:bg-zinc-950/95 light:bg-stone-50/95 backdrop-blur-xl border-b border-zinc-800/80 dark:border-zinc-800/80 light:border-stone-200 shadow-lg transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Left: Navigation or Mobile Trigger */}
          <div className="flex items-center gap-2 sm:gap-6">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 text-zinc-300 dark:text-zinc-300 light:text-zinc-800 hover:text-white hover:bg-zinc-900 rounded-xl transition"
              aria-label="Toggle Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <nav className="hidden lg:flex items-center gap-8 font-sans text-xs tracking-widest uppercase font-semibold">
              <Link href="/" className="text-zinc-300 dark:text-zinc-300 light:text-zinc-800 hover:text-red-500 transition-colors py-1">
                {t("navHome")}
              </Link>
              <Link href="/shop" className="text-zinc-300 dark:text-zinc-300 light:text-zinc-800 hover:text-red-500 transition-colors py-1">
                {t("navShop")}
              </Link>
              <Link href="/shop?category=Best Sellers" className="text-zinc-300 dark:text-zinc-300 light:text-zinc-800 hover:text-red-500 transition-colors py-1 flex items-center gap-1.5">
                {t("navBestSellers")}
                <span className="bg-red-600/20 text-red-400 text-[9px] px-1.5 py-0.2 rounded-full font-bold border border-red-500/30 uppercase">HOT</span>
              </Link>
              <Link href="/faq" className="text-zinc-300 dark:text-zinc-300 light:text-zinc-800 hover:text-red-500 transition-colors py-1">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Center Brand Logo: Emblem (/logo.png) + Natural Rectangle Wordmark (/lgo2.png) */}
          <Link href="/" className="flex items-center gap-3 group py-1">
            {/* Emblem /logo.png */}
            <div className="relative h-7 sm:h-9 w-7 sm:w-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="RAIB Emblem"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Wordmark /lgo2.png in Natural Rectangle Shape matching main logo height */}
            <div className="relative h-7 sm:h-9 w-28 sm:w-36 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/lgo2.png"
                alt="RAIB Wordmark"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Right Action Icons & Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-zinc-300 dark:text-zinc-300 light:text-zinc-800 hover:text-red-500 hover:bg-zinc-900 rounded-full transition cursor-pointer"
              title="Search Bags"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <Link
              href="/shop?wishlist=true"
              className="hidden sm:flex p-2 text-zinc-300 dark:text-zinc-300 light:text-zinc-800 hover:text-red-500 hover:bg-zinc-900 rounded-full transition relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Account / Auth Trigger */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="p-2 text-zinc-300 dark:text-zinc-300 light:text-zinc-800 hover:text-white hover:bg-zinc-900 rounded-full transition cursor-pointer"
              title="Sign In / Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Drawer Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition duration-300 shadow-md shadow-red-950/50 hover:scale-105 group cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline font-sans text-xs font-bold uppercase tracking-wider">
                {t("mobNavCart")}
              </span>
              <span className="w-5 h-5 bg-white text-red-900 text-xs font-black rounded-full flex items-center justify-center shadow-inner">
                {cartCount}
              </span>
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-xs bg-zinc-950 border-r border-zinc-800 p-6 z-50 flex flex-col justify-between overflow-y-auto lg:hidden text-white"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <div className="relative h-7 w-7 flex-shrink-0">
                      <Image src="/logo.png" alt="RAIB Logo" fill className="object-contain" />
                    </div>
                    <div className="relative h-7 w-28 flex-shrink-0">
                      <Image src="/lgo2.png" alt="RAIB Wordmark" fill className="object-contain object-left" />
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="py-6 space-y-2 font-sans text-sm font-semibold uppercase tracking-wider">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-zinc-200 hover:text-red-400 hover:bg-zinc-900 rounded-xl transition"
                  >
                    {t("navHome")}
                  </Link>
                  <Link
                    href="/shop"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-zinc-200 hover:text-red-400 hover:bg-zinc-900 rounded-xl transition"
                  >
                    {t("navShop")}
                  </Link>
                  <Link
                    href="/shop?category=Best Sellers"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-zinc-200 hover:text-red-400 hover:bg-zinc-900 rounded-xl transition"
                  >
                    {t("navBestSellers")}
                  </Link>
                  <Link
                    href="/faq"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-zinc-200 hover:text-red-400 hover:bg-zinc-900 rounded-xl transition"
                  >
                    FAQ & Policies
                  </Link>
                  <Link
                    href="/track-order"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-zinc-200 hover:text-red-400 hover:bg-zinc-900 rounded-xl transition"
                  >
                    Track Order
                  </Link>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-800 space-y-3">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-medium cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
                    Theme Mode
                  </span>
                  <span className="text-[10px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800">
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </span>
                </button>

                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-medium cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-red-500" />
                    Language / ভাষা
                  </span>
                  <span className="text-[10px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800">
                    {lang === "en" ? "বাংলা করুন" : "English"}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthOpen(true);
                  }}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-950/40 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  {t("loginBtn")}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
