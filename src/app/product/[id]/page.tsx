"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductType, useApp } from "@/lib/store";
import { SAMPLE_PRODUCTS } from "@/lib/productsData";
import { ProductCard } from "@/components/ProductCard";
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ArrowRight,
  Share2
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const { lang, t, addToCart, wishlist, toggleWishlist, showToast } = useApp();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dynamic product from MongoDB Atlas API
  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products?id=${productId}`);
        const data = await res.json();
        if (data.success && data.product) {
          setProduct(data.product);
          setActiveImage(data.product.image);
          setSelectedColor(data.product.color || "Default");
        } else {
          // Fallback to sample data if not found in DB
          const fallback = SAMPLE_PRODUCTS.find((p) => p.id === productId) || SAMPLE_PRODUCTS[0];
          setProduct(fallback);
          setActiveImage(fallback.image);
          setSelectedColor(fallback.color);
        }
      } catch (err) {
        console.error("Failed to load product by ID:", err);
        const fallback = SAMPLE_PRODUCTS.find((p) => p.id === productId) || SAMPLE_PRODUCTS[0];
        setProduct(fallback);
        setActiveImage(fallback.image);
        setSelectedColor(fallback.color);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [productId]);

  if (isLoading || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-zinc-400">
        Loading product details...
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const galleryImages = [
    product.image,
    product.secondaryImage || product.image,
    "/tote_bag_red_1786395433017.jpg",
    "/crossbody_black_1786395824801.jpg",
  ].filter(Boolean);

  const relatedProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(lang === "en" ? "Product URL copied to clipboard!" : "প্রোডাক্টের লিংক কপি করা হয়েছে!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16 w-full overflow-x-hidden">
      
      {/* Product Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Image Gallery & Thumbnail Selector */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square w-full rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group"
          >
            <Image
              src={activeImage}
              alt={product.name}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md border border-white/10 transition z-10 ${
                isWishlisted ? "bg-red-600 text-white shadow-lg" : "bg-zinc-950/60 text-zinc-300 hover:bg-red-600 hover:text-white"
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
            </button>
          </motion.div>

          {/* Gallery Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-zinc-900 border-2 transition flex-shrink-0 ${
                  activeImage === img ? "border-red-600 shadow-md scale-105" : "border-zinc-800 opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: Specifications & Purchasing Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Category & Badge */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-950/50 px-3.5 py-1 rounded-full border border-red-900/50">
              {product.category}
            </span>

            <button
              onClick={handleShare}
              className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full transition border border-zinc-800"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Ratings */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-serif leading-tight">
              {lang === "bn" && product.nameBn ? product.nameBn : product.name}
            </h1>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating}</span>
              </div>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400 font-medium">{product.reviewCount} Client Reviews</span>
              <span className="text-zinc-500">•</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>{t("inStock")}</span>
              </span>
            </div>
          </div>

          {/* Price Header */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-3xl font-extrabold text-white font-sans">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-zinc-500 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="ml-auto text-xs font-bold text-red-400 bg-red-950/60 px-2.5 py-1 rounded-full border border-red-900/60">
              Cash on Delivery Available
            </span>
          </div>

          {/* Product Description */}
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {lang === "bn" && product.descriptionBn ? product.descriptionBn : product.description}
          </p>

          {/* Color Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Selected Color: <span className="text-red-400">{selectedColor}</span>
            </label>
            <div className="flex gap-2">
              {[product.color, "Classic Black", "Crimson Red", "Sahara Tan"].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                    selectedColor === c ? "bg-red-600 border-red-500 text-white shadow-md" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">Quantity</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 text-zinc-400 hover:text-white font-bold"
                >
                  -
                </button>
                <span className="px-4 py-2 text-xs font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 text-zinc-400 hover:text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Primary Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => addToCart(product, selectedColor, quantity)}
              className="flex-1 py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-red-950/60 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t("addToCart")}</span>
            </button>

            <Link
              href="/checkout"
              onClick={() => addToCart(product, selectedColor, quantity)}
              className="flex-1 py-4 bg-zinc-900 hover:bg-zinc-850 border border-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition flex items-center justify-center gap-2 shadow-lg"
            >
              <span>{t("buyNow")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Guarantees Box */}
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-3 text-xs text-zinc-400">
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>Express Shipping in Bangladesh (3-5 Days)</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>100% Genuine Tuscan Full-Grain Italian Leather</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>7 Days Return & Exchange Guarantee</span>
            </div>
          </div>

        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-zinc-900 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-3xl font-extrabold text-white font-serif">
              You May Also Like
            </h3>
            <Link href="/shop" className="text-xs font-bold text-red-400 hover:underline">
              View All Bags
            </Link>
          </div>

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
