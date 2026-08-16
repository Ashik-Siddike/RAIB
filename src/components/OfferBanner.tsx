"use client";

import React from "react";
import Link from "next/link";
import { useSettings } from "@/lib/settingsStore";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function OfferBanner() {
  const { settings } = useSettings();

  if (!settings.showOfferBanner) {
    return null;
  }

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-zinc-950 text-white border-b border-zinc-900">
      
      {/* Background Image Overlay matching Image 2 */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1600&auto=format&fit=crop&q=80"
          alt="Fall Collection Offer Banner"
          className="w-full h-full object-cover opacity-50 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/70 to-zinc-950/90 z-10" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-20 text-center space-y-6">
        
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold text-amber-400 uppercase tracking-[0.3em] block font-sans"
        >
          {settings.offerBannerSubtitle || "LIMITED TIME"}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-serif leading-tight"
        >
          {settings.offerBannerTitle || "Up to 30% off the Fall Collection"}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="pt-4"
        >
          <Link
            href={settings.offerBannerLink || "/shop"}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-zinc-950 hover:bg-red-600 hover:text-white font-bold text-xs uppercase tracking-widest rounded-none border border-white transition-all duration-300 shadow-2xl group cursor-pointer"
          >
            <span>{settings.offerBannerButtonText || "SHOP THE SALE"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
