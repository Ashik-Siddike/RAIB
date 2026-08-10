"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { SAMPLE_PRODUCTS } from "@/lib/productsData";
import { useApp } from "@/lib/store";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const wishlistParam = searchParams.get("wishlist");

  const { lang, t, wishlist } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "All");
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = [
    "All",
    "Tote Bags",
    "Crossbody Bags",
    "Shoulder Bags",
    "Clutches & Evening",
    "Mini & Micro Bags",
    "Luxury Backpacks",
  ];

  const filteredProducts = useMemo(() => {
    let result = [...SAMPLE_PRODUCTS];

    if (wishlistParam === "true") {
      result = result.filter((p) => wishlist.includes(p.id));
    } else if (selectedCategory !== "All") {
      if (selectedCategory === "Best Sellers") {
        result = result.filter((p) => p.isBestSeller);
      } else {
        result = result.filter((p) => p.category === selectedCategory);
      }
    }

    result = result.filter((p) => p.price <= maxPrice);

    if (sortBy === "lowToHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highToLow") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return result;
  }, [selectedCategory, maxPrice, sortBy, wishlistParam, wishlist]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-950 via-red-950/40 to-zinc-950 p-8 sm:p-12 rounded-3xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
            {wishlistParam === "true" ? "Your Wishlist ❤️" : "Full Collection"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif">
            {wishlistParam === "true" ? "Saved Handbags" : "Luxury Bag Collections"}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg">
            Explore 100% handcrafted genuine Italian leather bags, finished with 18K gold-plated hardware.
          </p>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden px-5 py-3 bg-zinc-900 border border-zinc-800 hover:border-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2"
        >
          <SlidersHorizontal className="w-4 h-4 text-red-500" />
          <span>{t("filterTitle")}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Sidebar Filter */}
        <div className="hidden lg:block space-y-6 p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-serif flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-red-500" />
              {t("filterTitle")}
            </h3>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setMaxPrice(10000);
              }}
              className="text-[10px] text-red-400 font-bold uppercase hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-2">
              {t("filterCategory")}
            </label>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-red-600 text-white shadow-md shadow-red-950/60"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3 pt-4 border-t border-zinc-800">
            <div className="flex justify-between text-xs font-semibold text-zinc-300">
              <span>{t("filterPrice")}</span>
              <span className="text-red-400 font-bold">Up to ৳{maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="2000"
              max="10000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-red-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Main Products Grid Column */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Control Bar (Sort Dropdown) */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
            <span className="text-xs text-zinc-400 font-medium">
              Showing <strong className="text-white">{filteredProducts.length}</strong> items
            </span>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-red-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 text-xs font-semibold text-zinc-200 py-2 px-3 rounded-xl outline-none focus:border-red-500 cursor-pointer"
              >
                <option value="featured">{t("sortFeatured")}</option>
                <option value="lowToHigh">{t("sortLowToHigh")}</option>
                <option value="highToLow">{t("sortHighToLow")}</option>
                <option value="newest">{t("sortNewest")}</option>
              </select>
            </div>
          </div>

          {/* Product Cards */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800 space-y-4">
              <p className="text-zinc-400 text-sm font-medium">No bags found matching your filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setMaxPrice(10000);
                }}
                className="px-6 py-2.5 bg-red-600 text-white text-xs font-bold uppercase rounded-xl"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-zinc-400">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
