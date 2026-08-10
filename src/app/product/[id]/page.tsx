"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { SAMPLE_PRODUCTS } from "@/lib/productsData";
import { useApp } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, ArrowLeft, Check, Sparkles } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const { lang, t, addToCart, wishlist, toggleWishlist, setIsCartOpen } = useApp();

  const product = SAMPLE_PRODUCTS.find((p) => p.id === productId) || SAMPLE_PRODUCTS[0];

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string>(product.color);

  const isWishlisted = wishlist.includes(product.id);

  const relatedProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleBuyNow = () => {
    addToCart(product, selectedColor);
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Back Button */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-red-500 uppercase tracking-wider transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Shop</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/4] w-full rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              className="object-cover transition-all duration-500"
              priority
            />
            
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md border border-white/10 transition ${
                isWishlisted ? "bg-red-600 text-white shadow-lg" : "bg-zinc-950/60 text-zinc-300 hover:text-white"
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-4">
            <button
              onClick={() => setActiveImage(product.image)}
              className={`relative w-24 h-24 rounded-2xl overflow-hidden bg-zinc-900 border-2 transition ${
                activeImage === product.image ? "border-red-600 scale-105" : "border-zinc-800 opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </button>

            {product.secondaryImage && (
              <button
                onClick={() => setActiveImage(product.secondaryImage!)}
                className={`relative w-24 h-24 rounded-2xl overflow-hidden bg-zinc-900 border-2 transition ${
                  activeImage === product.secondaryImage ? "border-red-600 scale-105" : "border-zinc-800 opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={product.secondaryImage} alt={product.name} fill className="object-cover" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-950/50 px-3 py-1 rounded-full border border-red-900/50">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif leading-tight">
              {lang === "bn" && product.nameBn ? product.nameBn : product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-zinc-300">{product.rating}</span>
              <span className="text-xs text-zinc-500">({product.reviewCount} customer reviews)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-3xl font-extrabold text-white font-sans">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-base text-zinc-500 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="ml-auto text-xs font-bold text-green-400 bg-green-950/60 border border-green-800/60 px-2.5 py-1 rounded-full">
              In Stock & Ready to Ship
            </span>
          </div>

          {/* Color Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Color Option: <span className="text-white">{selectedColor}</span>
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedColor(product.color)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 ${
                  selectedColor === product.color
                    ? "bg-red-950/60 border-red-500 text-white"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-red-600 border border-white"></span>
                <span>{product.color}</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            {lang === "bn" && product.descriptionBn ? product.descriptionBn : product.description}
          </p>

          {/* Dimensions & Specs Box */}
          {product.dimensions && (
            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-1 text-xs">
              <span className="font-bold text-zinc-200 uppercase tracking-wider font-serif">
                {t("dimensions")}:
              </span>
              <p className="text-zinc-400 font-mono">{product.dimensions}</p>
            </div>
          )}

          {/* CTAs: Add to Cart & Buy Now */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => addToCart(product, selectedColor)}
              className="w-full py-4 bg-gradient-to-r from-red-600 via-red-700 to-zinc-900 hover:from-red-500 hover:to-zinc-800 text-white font-bold text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-red-950/60 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{t("addToCart")}</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-white font-bold text-sm uppercase tracking-wider rounded-2xl transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>{t("buyNow")}</span>
            </button>
          </div>

          {/* Service Guarantees */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-900 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-red-500" />
              <span>Free Delivery in BD</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>18K Gold Hardware</span>
            </div>
          </div>

        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-zinc-900 space-y-8">
          <h2 className="text-2xl font-bold text-white font-serif">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
