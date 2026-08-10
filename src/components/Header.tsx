"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { Search, ShoppingBag, Heart, Menu, X, User, Globe, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const { lang, setLang, t, cartCount, wishlist, setIsCartOpen, setIsAuthOpen, setIsSearchOpen } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLang(lang === "en" ? "bn" : "en");
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-zinc-950 via-red-950 to-zinc-950 text-zinc-300 text-xs py-2 px-4 border-b border-red-900/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-medium tracking-wide">
              {lang === "en" ? "FREE Delivery in Bangladesh over ৳3,000 | Cash on Delivery Available" : "৳৩,০০০ টাকার বেশি অর্ডারে ফ্রি ডেলিভারি | ক্যাশ অন ডেলিভারি সুবিধা"}
            </span>
          </div>

          {/* Language Switcher Button in Topbar */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-zinc-900 border border-zinc-700/60 text-zinc-200 hover:border-red-500 transition-all cursor-pointer font-sans text-xs font-semibold"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-red-500" />
            <span>{lang === "en" ? "বাংলা" : "English"}</span>
          </button>
        </div>
      </div>

      {/* Main Glassmorphic Sticky Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-800/80 shadow-2xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left: Mobile Menu Trigger & Navigation Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-xl transition"
              aria-label="Toggle Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <nav className="hidden lg:flex items-center gap-8 font-sans text-sm tracking-wider uppercase font-medium">
              <Link href="/" className="text-zinc-300 hover:text-red-500 transition-colors relative py-1 group">
                {t("navHome")}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/shop" className="text-zinc-300 hover:text-red-500 transition-colors relative py-1 group">
                {t("navShop")}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/shop?category=Best Sellers" className="text-zinc-300 hover:text-red-500 transition-colors relative py-1 group flex items-center gap-1.5">
                {t("navBestSellers")}
                <span className="bg-red-600/20 text-red-400 text-[10px] px-1.5 py-0.2 rounded-full font-bold border border-red-500/30 uppercase">HOT</span>
              </Link>
            </nav>
          </div>

          {/* Center Logo with Full Brand Combination (logo.png Icon + lgo2.png Wordmark Image) */}
          <Link href="/" className="flex items-center gap-3 group py-2">
            {/* Icon Mark */}
            <div className="relative w-9 h-9 transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="RAIB Emblem"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Full Wordmark Image from lgo2.png */}
            <div className="relative w-24 h-8 transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/lgo2.png"
                alt="RAIB Wordmark"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-zinc-300 hover:text-red-400 hover:bg-zinc-900 rounded-full transition-colors relative"
              title="Search Bags"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <Link
              href="/shop?wishlist=true"
              className="hidden sm:flex p-2.5 text-zinc-300 hover:text-red-500 hover:bg-zinc-900 rounded-full transition-colors relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Account / Auth Modal Trigger */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="p-2.5 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-full transition-colors"
              title="Sign In / Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-4.5 py-2.5 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white rounded-full transition-all duration-300 shadow-lg shadow-red-950/60 hover:scale-105 group cursor-pointer"
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
              className="fixed top-0 left-0 bottom-0 w-5/6 max-w-sm bg-zinc-950 border-r border-zinc-800 p-6 z-50 flex flex-col justify-between overflow-y-auto lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    <Image src="/logo.png" alt="RAIB Logo" width={28} height={28} />
                    <div className="relative w-20 h-7">
                      <Image src="/lgo2.png" alt="RAIB Wordmark" fill className="object-contain" />
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-zinc-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="py-6 space-y-2">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-lg font-medium text-zinc-200 hover:text-red-400 hover:bg-zinc-900 rounded-xl transition"
                  >
                    {t("navHome")}
                  </Link>
                  <Link
                    href="/shop"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-lg font-medium text-zinc-200 hover:text-red-400 hover:bg-zinc-900 rounded-xl transition"
                  >
                    {t("navShop")}
                  </Link>
                  <Link
                    href="/shop?category=Best Sellers"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-lg font-medium text-zinc-200 hover:text-red-400 hover:bg-zinc-900 rounded-xl transition"
                  >
                    {t("navBestSellers")}
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-lg font-medium text-zinc-200 hover:text-red-400 hover:bg-zinc-900 rounded-xl transition"
                  >
                    {t("checkoutTitle")}
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-lg font-medium text-red-400 hover:bg-red-950/40 rounded-xl transition"
                  >
                    {t("navAdmin")}
                  </Link>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-800 space-y-4">
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 font-medium"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-red-500" />
                    Language / ভাষা
                  </span>
                  <span className="text-xs font-bold text-red-400 bg-red-950/60 px-2 py-1 rounded border border-red-800">
                    {lang === "en" ? "বাংলা করুন" : "English"}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthOpen(true);
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-950/40"
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
