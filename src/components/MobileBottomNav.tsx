"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/store";
import { Home, ShoppingBag, Search } from "lucide-react";
import { motion } from "framer-motion";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { t, cartCount, setIsCartOpen, setIsSearchOpen } = useApp();

  return (
    <div className="fixed bottom-3 left-4 right-4 z-40 lg:hidden">
      <div className="bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800/90 rounded-2xl p-2 shadow-2xl shadow-black/80 flex items-center justify-around">
        
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
            pathname === "/" ? "text-red-500 bg-red-950/40 font-bold" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">{t("mobNavHome")}</span>
        </Link>

        {/* Shop */}
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
            pathname === "/shop" ? "text-red-500 bg-red-950/40 font-bold" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">{t("mobNavShop")}</span>
        </Link>

        {/* Search Trigger */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Search</span>
        </button>

        {/* Cart / Bag Drawer Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl text-zinc-400 hover:text-zinc-200 transition-all relative cursor-pointer"
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
          <span className="text-[10px] font-bold mt-1 text-red-400">{t("mobNavCart")}</span>
        </button>

      </div>
    </div>
  );
}
