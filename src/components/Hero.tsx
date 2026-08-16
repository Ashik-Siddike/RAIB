"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { useSettings } from "@/lib/settingsStore";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  const { lang } = useApp();
  const { settings } = useSettings();

  const heroBgImage = settings.heroImage || "/hero-luxury-bg.jpg";

  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white min-h-[75vh] flex items-center justify-center border-b border-stone-200 transition-colors">
      
      {/* 100% Crisp Full Opacity Background Image (No White Overlays) */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgImage}
          alt="RAIB Luxury Studio Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 sm:space-y-8 py-20 flex flex-col items-center justify-center">
        
        {/* Pure White Subtitle Badge */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-white font-sans block drop-shadow-md text-center"
        >
          {settings.heroBadge || "STYLED FOR THE MODERN WOMAN"}
        </motion.span>

        {/* Hero Unified Centered Logo Graphic Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-full flex items-center justify-center gap-3 sm:gap-5 py-2 mx-auto"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-5 drop-shadow-lg mx-auto">
            {/* Emblem Logo */}
            <div className="relative h-12 sm:h-20 lg:h-24 w-12 sm:w-20 lg:w-24 flex-shrink-0">
              <Image
                src="/main-logo.png"
                alt="RAIB Main Emblem Logo"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Letter Wordmark Logo */}
            <div className="relative h-12 sm:h-20 lg:h-24 w-44 sm:w-72 lg:w-80 flex-shrink-0">
              <Image
                src="/raib leter logo.png"
                alt="RAIB Letter Logo"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </div>
        </motion.div>

        {/* Pure White Subtitle Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-lg text-white max-w-2xl mx-auto font-sans leading-relaxed font-bold pt-2 drop-shadow-lg text-center"
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
          className="pt-2 text-center"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-none shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer"
          >
            <span>{settings.heroCtaText || "SHOP COLLECTION"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
