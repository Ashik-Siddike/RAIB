"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Hero() {
  const { lang, t } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      id: "raib-tote-01",
      name: "The Royal Crimson Italian Leather Tote",
      nameBn: "দ্য রয়্যাল ক্রিমসন ইতালিয়ান লেদার টোট",
      price: 4850,
      tag: "Signature Collection",
      image: "/tote_bag_red_1786395433017.jpg",
    },
    {
      id: "raib-crossbody-02",
      name: "The Obsidian Leather Crossbody",
      nameBn: "দ্য অবসিডিয়ান লেদার ক্রসবডি",
      price: 3950,
      tag: "Trending Arrival",
      image: "/crossbody_black_1786395824801.jpg",
    },
    {
      id: "raib-emerald-03",
      name: "The Emerald Gold Structured Bag",
      nameBn: "দ্য এমারেল্ড গোল্ড স্ট্রাকচার্ড ব্যাগ",
      price: 5200,
      tag: "Bestseller Edition",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80",
    },
  ];

  // Auto slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const activeItem = carouselItems[currentSlide];

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

            {/* Guarantees Bar */}
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

          {/* Right Column: Modern Signature Bag Carousel Spotlight */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={activeItem.image}
                    alt={activeItem.name}
                    fill
                    priority
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                  {/* Floating Product Spotlight Card */}
                  <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 shadow-2xl flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider font-sans">
                        {activeItem.tag}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white font-serif line-clamp-1">
                        {lang === "bn" ? activeItem.nameBn : activeItem.name}
                      </h3>
                      <div className="text-sm font-extrabold text-red-400 font-sans mt-0.5">
                        ৳{activeItem.price.toLocaleString()}
                      </div>
                    </div>

                    <Link
                      href={`/product/${activeItem.id}`}
                      className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl text-xs font-bold flex-shrink-0 hover:scale-105 transition shadow-md"
                    >
                      Buy Now
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Carousel Controls (Chevron Buttons) */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-950/80 text-white border border-zinc-800 hover:bg-red-600 transition backdrop-blur-md opacity-80 group-hover:opacity-100 cursor-pointer"
                title="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-950/80 text-white border border-zinc-800 hover:bg-red-600 transition backdrop-blur-md opacity-80 group-hover:opacity-100 cursor-pointer"
                title="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Carousel Indicator Dots */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-md">
                {carouselItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentSlide === idx ? "w-6 bg-red-600" : "w-1.5 bg-zinc-600 hover:bg-zinc-400"
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
