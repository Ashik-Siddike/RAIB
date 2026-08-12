"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductType, useApp } from "@/lib/store";
import { motion, useReducedMotion } from "framer-motion";
import { ShoppingCart, Star, Heart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: ProductType;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { lang, t, addToCart, wishlist, toggleWishlist } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  const shouldReduceMotion = useReducedMotion();

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.3 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "group relative bg-zinc-900/90 border border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col justify-between w-full max-w-full",
        "shadow-xl shadow-black/40 hover:border-red-600/60 transition-all duration-300",
        className
      )}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-950">
        <Link href={`/product/${product.id}`} className="block w-full h-full relative">
          <Image
            src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
            alt={lang === "bn" && product.nameBn ? product.nameBn : product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-108"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-black/20 pointer-events-none" />

        {/* Favorite/Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={cn(
            "absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-2 sm:p-2.5 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 z-10 cursor-pointer",
            isWishlisted
              ? "bg-red-600 text-white shadow-lg shadow-red-950/80 scale-110"
              : "bg-zinc-950/60 text-zinc-300 hover:bg-red-600 hover:text-white hover:scale-110"
          )}
          title="Wishlist"
        >
          <Heart className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", isWishlisted && "fill-current")} />
        </button>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-gradient-to-r from-red-600 to-red-800 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-lg border border-red-500/40">
            {discountPercent}% {t("discountBadge")}
          </div>
        )}

        {/* Quick View Trigger on Hover */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2 z-10 hidden sm:flex">
          <Link
            href={`/product/${product.id}`}
            className="flex-1 py-2 bg-zinc-950/90 hover:bg-zinc-900 border border-zinc-700/80 text-zinc-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t("quickView")}</span>
          </Link>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 space-y-2.5 flex-1 flex flex-col justify-between w-full">
        <div className="space-y-1">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs">
            <span className="text-red-400 font-medium tracking-wider uppercase text-[9px] sm:text-[10px] font-sans truncate">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-semibold flex-shrink-0">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-zinc-500 text-[9px] sm:text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1 font-serif">
              {lang === "bn" && product.nameBn ? product.nameBn : product.name}
            </h3>
          </Link>

          {/* Material Specs */}
          <p className="text-[11px] sm:text-xs text-zinc-400 line-clamp-1">
            {product.material}
          </p>
        </div>

        {/* Price & Add To Cart Button */}
        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-2 w-full">
          <div>
            <div className="text-base sm:text-lg font-extrabold text-white font-sans">
              ৳{product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-zinc-500 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:scale-105 cursor-pointer flex-shrink-0"
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{t("addToCart")}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
