"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Award, Flame } from "lucide-react";

export function Hero() {
  const { lang, t } = useApp();

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-12 lg:py-20 border-b border-zinc-900">
      
      {/* Ambient Red & Dark Glow Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-red-900/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* New Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-semibold uppercase tracking-widest shadow-lg shadow-red-950/50"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-500 animate-spin" />
              <span>{t("heroBadge")}</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-serif leading-[1.1]">
              <span className="block text-zinc-100">{t("heroTitleLine1")}</span>
              <span className="bg-gradient-to-r from-red-500 via-red-400 to-amber-200 bg-clip-text text-transparent italic">
                {t("heroTitleLine2")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-sans leading-relaxed">
              {t("heroSubtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-red-950/60 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group"
              >
                <span>{t("heroCtaPrimary")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/shop?category=Best Sellers"
                className="w-full sm:w-auto px-8 py-4 bg-zinc-900/90 border border-zinc-700/80 hover:border-red-500/80 text-zinc-200 hover:text-white font-semibold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 hover:bg-zinc-800 flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4 text-red-500" />
                <span>{t("navBestSellers")}</span>
              </Link>
            </div>

            {/* Value Props Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-zinc-900 text-left">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-red-950/40 border border-red-900/40 text-red-500">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-200">100% Genuine</h4>
                  <p className="text-[10px] text-zinc-500">Italian Leather</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-red-950/40 border border-red-900/40 text-red-500">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-200">18K Hardware</h4>
                  <p className="text-[10px] text-zinc-500">Gold Plated</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-red-950/40 border border-red-900/40 text-red-500">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-200">Lifetime Warranty</h4>
                  <p className="text-[10px] text-zinc-500">Craft Integrity</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Hero Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              
              {/* Outer Glowing Border */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-600 via-amber-500 to-red-900 opacity-30 group-hover:opacity-75 blur-xl transition duration-700" />

              <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/tote_bag_red_1786395433017.jpg"
                    alt="RAIB Royal Red Tote Bag"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                </div>

                {/* Floating Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-red-500 tracking-wider">
                      Featured Masterpiece
                    </span>
                    <h3 className="text-sm font-bold text-white font-serif">
                      Royal Crimson Italian Leather Tote
                    </h3>
                    <p className="text-xs font-semibold text-red-400 font-sans mt-0.5">
                      ৳4,850 <span className="line-through text-zinc-500 text-[10px]">৳6,200</span>
                    </p>
                  </div>
                  <Link
                    href="/product/raib-tote-01"
                    className="p-3 bg-red-600 hover:bg-red-500 text-white rounded-full transition-transform hover:scale-110 shadow-lg shadow-red-950/50"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
