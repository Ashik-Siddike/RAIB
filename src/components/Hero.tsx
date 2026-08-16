"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { useSettings } from "@/lib/settingsStore";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  const { lang } = useApp();
  const { settings } = useSettings();

  return (
    <section className="relative overflow-hidden bg-white text-zinc-900 min-h-[75vh] flex items-center justify-center border-b border-stone-200 transition-colors">
      
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/tote_bag_red_1786395433017.jpg"
          alt="RAIB Luxury Bag Collection"
          className="w-full h-full object-cover opacity-15 filter brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/50" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 sm:space-y-8 py-20">
        
        {/* Gold Accent Subtitle Badge */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-red-600 font-sans block"
        >
          {settings.heroBadge || "CRAFTED FOR THE MODERN WOMAN"}
        </motion.span>

        {/* Huge Brand Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-8xl lg:text-9xl font-extrabold tracking-widest font-serif text-zinc-900 uppercase"
        >
          {settings.heroTitle || "RAIB"}
        </motion.h1>

        {/* Subtitle Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-lg text-zinc-700 max-w-2xl mx-auto font-sans leading-relaxed font-semibold"
        >
          {settings.heroSubtitle ||
            (lang === "bn"
              ? "আধুনিক নারীদের আত্মবিশ্বাস আর অভিজাত রুচির সেরা স্মারক — বোর্ডরুম মিটিং থেকে উইকেন্ড ভ্রমণ পর্যন্ত।"
              : "Timeless bags designed to carry your story — from boardroom meetings to weekend escapes.")}
        </motion.p>

        {/* Solid Red CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-4"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-none shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer"
          >
            <span>{settings.heroCtaText || "SHOP COLLECTION"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
