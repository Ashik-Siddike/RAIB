"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/store";
import { Home, ShoppingBag, Heart, Search, User } from "lucide-react";
import { motion } from "framer-motion";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { t, cartCount, wishlist, setIsCartOpen, setIsSearchOpen, setIsAuthOpen } = useApp();

  return (
    <div className="fixed bottom-3 left-3 right-3 z-40 lg:hidden">
      <div className="bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800/90 rounded-2xl p-2 shadow-2xl shadow-black flex items-center justify-around">
        
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            pathname === "/" ? "text-red-500 bg-red-950/40" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">{t("mobNavHome")}</span>
        </Link>

        {/* Shop */}
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            pathname === "/shop" ? "text-red-500 bg-red-950/40" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">{t("mobNavShop")}</span>
        </Link>

        {/* Search */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center justify-center p-2 rounded-xl text-zinc-400 hover:text-zinc-200 transition-all"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Search</span>
        </button>

        {/* Wishlist */}
        <Link
          href="/shop?wishlist=true"
          className="flex flex-col items-center justify-center p-2 rounded-xl text-zinc-400 hover:text-zinc-200 transition-all relative"
        >
          <Heart className="w-5 h-5" />
          {wishlist.length > 0 && (
            <span className="absolute top-1.5 right-2 w-3.5 h-3.5 bg-red-600 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
          <span className="text-[10px] font-medium mt-1">{t("mobNavWishlist")}</span>
        </Link>

        {/* Cart Drawer Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center p-2 rounded-xl text-zinc-400 hover:text-zinc-200 transition-all relative"
        >
          <ShoppingBag className="w-5 h-5 text-red-400" />
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1 right-2 w-4 h-4 bg-red-600 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center shadow-lg"
            >
              {cartCount}
            </motion.span>
          )}
          <span className="text-[10px] font-medium mt-1 text-red-400 font-bold">{t("mobNavCart")}</span>
        </button>

        {/* Account / Auth */}
        <button
          onClick={() => setIsAuthOpen(true)}
          className="flex flex-col items-center justify-center p-2 rounded-xl text-zinc-400 hover:text-zinc-200 transition-all"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">{t("mobNavAccount")}</span>
        </button>

      </div>
    </div>
  );
}
