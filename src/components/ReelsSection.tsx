"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSettings, ReelType } from "@/lib/settingsStore";
import { useApp } from "@/lib/store";
import { SAMPLE_PRODUCTS } from "@/lib/productsData";
import { Play, Volume2, VolumeX, X, ShoppingCart, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ReelsSection() {
  const { settings } = useSettings();
  const { addToCart, showToast } = useApp();

  const [activeReel, setActiveReel] = useState<ReelType | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!settings.showReels || !settings.reels || settings.reels.length === 0) {
    return null;
  }

  const handleOpenReel = (reel: ReelType) => {
    setActiveReel(reel);
    setIsPlaying(true);
    setIsMuted(false);
  };

  const handleCloseReel = () => {
    setActiveReel(null);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white text-zinc-900 border-b border-stone-200 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-widest uppercase font-serif text-zinc-900">
            STORIES THAT LEAD
          </h2>
          <p className="text-xs text-zinc-600 font-sans">
            Real clients showcasing RAIB genuine Italian leather bags in motion
          </p>
        </div>

        {/* 9:16 Video Cards Carousel / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto pb-4">
          {settings.reels.map((reel) => {
            const linkedProduct =
              SAMPLE_PRODUCTS.find((p) => p.id === reel.productId) || SAMPLE_PRODUCTS[0];

            return (
              <motion.div
                key={reel.id}
                whileHover={{ y: -5 }}
                className="group relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-md cursor-pointer flex flex-col justify-between"
                onClick={() => handleOpenReel(reel)}
              >
                {/* Background Video Preview / Poster */}
                {reel.videoUrl ? (
                  <video
                    src={reel.videoUrl}
                    poster={reel.poster || linkedProduct.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={reel.poster || linkedProduct.image}
                    alt={reel.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}

                {/* Dark Gradient Overlays for Video Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                {/* Top Play Indicator */}
                <div className="relative p-3 flex items-center justify-end">
                  <span className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 group-hover:scale-110 transition">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </span>
                </div>

                {/* Bottom Product Info & Add To Cart Button */}
                <div className="relative p-3 space-y-2.5 z-10">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/30 flex-shrink-0 bg-zinc-950">
                      <Image
                        src={reel.poster || linkedProduct.image}
                        alt={reel.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-[11px] font-bold text-white line-clamp-1 font-serif leading-snug">
                        {reel.title}
                      </h4>
                      <p className="text-[10px] font-bold text-amber-400 font-mono">
                        ৳{reel.price ? reel.price.toLocaleString() : linkedProduct.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Add To Cart Bar */}
                  <div className="flex items-center bg-black text-white rounded-lg overflow-hidden border border-zinc-700 text-[11px] font-bold">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(linkedProduct);
                        showToast("Added to bag!");
                      }}
                      className="flex-1 py-1.5 px-2 hover:bg-zinc-800 transition flex items-center justify-center gap-1"
                    >
                      <span>Add To Cart</span>
                    </button>
                    <div className="p-1.5 border-l border-zinc-700 bg-zinc-900 text-zinc-400">
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Interactive 9:16 Full Video Reel Modal Popup */}
      <AnimatePresence>
        {activeReel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseReel}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Content Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col justify-between"
            >
              {/* Main Fullscreen Video */}
              {activeReel.videoUrl ? (
                <video
                  ref={videoRef}
                  src={activeReel.videoUrl}
                  poster={activeReel.poster}
                  autoPlay
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={activeReel.poster}
                  alt={activeReel.title}
                  fill
                  className="object-cover"
                />
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-black/40 pointer-events-none" />

              {/* Top Controls Bar */}
              <div className="relative p-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-black transition cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={togglePlay}
                    className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-black transition cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <button
                  onClick={handleCloseReel}
                  className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-red-600 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Drawer Overlay */}
              <div className="relative p-6 space-y-4 z-10">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-zinc-700 flex-shrink-0 bg-zinc-900">
                    <Image
                      src={activeReel.poster}
                      alt={activeReel.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white line-clamp-1 font-serif">
                      {activeReel.title}
                    </h3>
                    <p className="text-xs font-extrabold text-red-400 font-sans mt-0.5">
                      ৳{activeReel.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Modal Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const linkedProduct =
                        SAMPLE_PRODUCTS.find((p) => p.id === activeReel.productId) || SAMPLE_PRODUCTS[0];
                      addToCart(linkedProduct);
                      showToast("Added to cart!");
                    }}
                    className="flex-1 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4 text-red-500" />
                    <span>Add to Cart</span>
                  </button>

                  <Link
                    href={`/product/${activeReel.productId}`}
                    onClick={handleCloseReel}
                    className="flex-1 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>BUY NOW</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
