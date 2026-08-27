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
  const { settings, loading } = useSettings();

  const heroBgImage = settings.heroImage || "/hero-luxury-bg.jpg";

  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white min-h-[75vh] flex items-center justify-center border-b border-stone-200 transition-colors">
      
      {/* Background Image — uses Next.js Image for optimized loading + priority */}
      <div className="absolute inset-0 z-0">
        {!loading && (
          <Image
            src={heroBgImage}
            alt="RAIB Luxury Studio Background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
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

        {/* Hero Styled Letter Logo Only (Centered) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-full flex items-center justify-center py-2 mx-auto"
        >
          <div className="relative h-16 sm:h-24 lg:h-28 w-56 sm:w-84 lg:w-96 drop-shadow-lg flex-shrink-0">
            <Image
              src="/raib leter logo.png"
              alt="RAIB Letter Logo"
              fill
              priority
              className="object-contain"
            />
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
