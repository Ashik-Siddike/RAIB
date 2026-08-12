"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { ArrowRight, ShieldCheck, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  const { lang, t } = useApp();

  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-zinc-900">
      
      {/* Ambient Red Glow Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-red-600/15 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Quiet Luxury Statement & Typography */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 backdrop-blur-md shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-500 animate-spin" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-300 font-cinzel">
                {t("heroBadge")}
              </span>
            </motion.div>

            {/* Main Title with Quiet Luxury Typography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-serif text-white leading-[1.1]">
                {lang === "bn" ? (
                  <>
                    <span className="block">আধুনিক নারীদের অভিজাত</span>
                    <span className="bg-gradient-to-r from-red-500 via-amber-200 to-red-400 bg-clip-text text-transparent italic font-serif">
                      রুচির সেরা স্মারক
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block">Elegance Redefined For</span>
                    <span className="bg-gradient-to-r from-red-500 via-amber-200 to-red-400 bg-clip-text text-transparent italic font-serif">
                      The Modern Woman
                    </span>
                  </>
                )}
              </h1>
              <p className="text-xs sm:text-base text-zinc-400 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed pt-2">
                {t("heroSubtitle")}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-2xl shadow-red-950/80 hover:scale-105 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{t("heroCtaPrimary")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/shop?category=Best Sellers"
                className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-red-500/50 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t("navBestSellers")}</span>
              </Link>
            </motion.div>

            {/* Social Proof & Guarantees Bar */}
            <div className="pt-6 border-t border-zinc-900 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="text-lg sm:text-2xl font-extrabold text-white font-serif">100%</div>
                <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-sans">Italian Leather</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-extrabold text-red-400 font-serif">10,000+</div>
                <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-sans">Happy Clients</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-extrabold text-amber-400 font-serif">4.9 ★</div>
                <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-sans">Top Rating</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Spotlight Feature Card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group"
            >
              <Image
                src="/tote_bag_red_1786395433017.jpg"
                alt="RAIB Signature Royal Crimson Tote Bag"
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

              {/* Floating Product Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 shadow-2xl flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider font-sans">Signature Collection</span>
                  <h3 className="text-sm sm:text-base font-bold text-white font-serif line-clamp-1">
                    The Royal Crimson Italian Leather Tote
                  </h3>
                  <div className="text-sm font-extrabold text-red-400 font-sans mt-0.5">৳4,850</div>
                </div>

                <Link
                  href="/product/raib-tote-01"
                  className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl text-xs font-bold flex-shrink-0 hover:scale-105 transition shadow-md"
                >
                  Buy Now
                </Link>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
