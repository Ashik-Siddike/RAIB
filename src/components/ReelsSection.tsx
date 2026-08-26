"use client";

import React from "react";
import { useSettings, DEFAULT_SETTINGS } from "@/lib/settingsStore";
import { useApp, ProductType } from "@/lib/store";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/SafeImage";

// Helper function to format Instagram Reel links into embed URLs if needed
function getInstagramEmbedUrl(url: string): string | null {
  if (!url) return null;
  const match = url.match(/instagram\.com\/(?:reel|p)\/([^/?#&]+)/);
  if (match && match[1]) {
    return `https://www.instagram.com/reel/${match[1]}/embed/captioned/`;
  }
  return null;
}

export function ReelsSection() {
  const { settings } = useSettings();
  const { addToCart, setIsCartOpen, showToast } = useApp();

  // Guarantee fallback so Video Reels section NEVER disappears
  const reelsList =
    settings.reels && settings.reels.length > 0 ? settings.reels : DEFAULT_SETTINGS.reels;

  const showReelsSection = settings.showReels ?? true;

  if (!showReelsSection || !reelsList || reelsList.length === 0) {
    return null;
  }

  // Display top 5 video reels in single row
  const displayReels = reelsList.slice(0, 5);

  return (
    <section className="py-16 sm:py-24 bg-white text-zinc-900 border-b border-stone-200 overflow-hidden transition-colors">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest block font-sans">
            {settings.reelsBadge || "CLIENT STORIES"}
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase font-serif text-zinc-900">
            {settings.reelsTitle || "STORIES THAT LEAD"}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 font-sans max-w-xl mx-auto">
            {settings.reelsSubtitle || "Real clients showcasing RAIB genuine Italian leather bags in motion"}
          </p>
        </div>

        {/* 5 Video Cards Side-By-Side in 1 Single Row */}
        <div className="flex gap-4 sm:gap-5 overflow-x-auto snap-x scrollbar-none pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {displayReels.map((reel, index) => {
            const reelImage = reel.poster || "/main-logo.png";
            const reelPrice = reel.price || 3500;
            const instaEmbed = getInstagramEmbedUrl(reel.videoUrl);

            const reelProduct: ProductType = {
              id: reel.productId || reel.id || `reel-item-${index}`,
              name: reel.title,
              price: reelPrice,
              originalPrice: Math.round(reelPrice * 1.2),
              category: "Tote Bags",
              color: "Black",
              material: "Italian Leather",
              image: reelImage,
              description: "Luxury Italian leather bag featured in Client Stories.",
              rating: 5.0,
              reviewCount: 1,
            };

            return (
              <motion.div
                key={reel.id || `reel-slot-${index}`}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-[9/16] min-w-[240px] sm:min-w-[260px] lg:min-w-0 min-h-[380px] sm:min-h-[420px] lg:min-h-[450px] w-full rounded-3xl overflow-hidden bg-zinc-950 border border-stone-200 shadow-xl flex flex-col justify-between flex-shrink-0 lg:flex-shrink"
              >
                {/* Background Video Player */}
                {instaEmbed ? (
                  <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                    <iframe
                      src={instaEmbed}
                      title={reel.title}
                      className="w-full h-[120%] -mt-[10%] object-cover border-0"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />
                  </div>
                ) : reel.videoUrl ? (
                  <video
                    src={reel.videoUrl}
                    poster={reelImage}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                ) : (
                  <SafeImage
                    src={reelImage}
                    alt={reel.title}
                    fill
                    className="object-cover pointer-events-none"
                  />
                )}

                {/* Dark Gradient Overlay for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/20 pointer-events-none" />

                {/* Top Reel Slot Numbering Badge */}
                <div className="relative p-3.5 flex items-center justify-between z-10 pointer-events-none">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    Reel {index + 1}
                  </span>
                </div>

                {/* Bottom Product Info & Direct BUY NOW Button */}
                <div className="relative p-3.5 sm:p-4 space-y-3 z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/30 flex-shrink-0 bg-zinc-950 shadow-md">
                      <SafeImage
                        src={reelImage}
                        alt={reel.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white line-clamp-1 font-serif leading-snug drop-shadow">
                        {reel.title}
                      </h4>
                      <p className="text-xs font-extrabold text-amber-400 font-mono drop-shadow">
                        ৳{reelPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Direct Buy Now & Add to Cart Action Buttons */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    <button
                      onClick={() => {
                        addToCart(reelProduct);
                        showToast("Added to bag!");
                      }}
                      className="py-2.5 px-2 bg-zinc-900/90 hover:bg-zinc-800 text-white font-bold text-[11px] uppercase tracking-wider rounded-xl border border-zinc-700 transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ShoppingCart className="w-3 h-3 text-red-500" />
                      <span>Add</span>
                    </button>

                    <button
                      onClick={() => {
                        addToCart(reelProduct);
                        setIsCartOpen(true);
                      }}
                      className="py-2.5 px-2 bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>BUY NOW</span>
                      <ArrowRight className="w-3 h-3 text-white" />
                    </button>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
