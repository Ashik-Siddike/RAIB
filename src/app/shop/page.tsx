"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductType, useApp } from "@/lib/store";
import { SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const wishlistParam = searchParams.get("wishlist");

  const { lang, t, wishlist } = useApp();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "All");
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Fetch live catalog dynamically from MongoDB Atlas API
  useEffect(() => {
    try {
      const cached = sessionStorage.getItem("raib_products_cache");
      if (cached) {
        setProducts(JSON.parse(cached));
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
    }

    async function loadLiveProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
          try {
            sessionStorage.setItem("raib_products_cache", JSON.stringify(data.products));
          } catch (e) {}
        }
      } catch (err) {
        console.error("Failed to load live catalog from API:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadLiveProducts();
  }, []);

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
    return products
      .filter((p) => {
        if (wishlistParam === "true") {
          return wishlist.includes(p.id);
        }
        const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
        const matchPrice = p.price <= maxPrice;
        return matchCategory && matchPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [products, selectedCategory, maxPrice, sortBy, wishlistParam, wishlist]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-stone-900 text-white space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest font-mono">
          RAIB Handbag Collection
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight">
          {wishlistParam === "true" ? "Your Saved Wishlist" : "Genuine Italian Leather Catalog"}
        </h1>
        <p className="text-stone-400 text-xs sm:text-sm max-w-xl font-light">
          Explore handcrafted Italian full-grain leather bags designed to complement your distinct lifestyle.
        </p>
      </div>

      {/* Main Filter & Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Desktop Sidebar Filter */}
        <aside className="hidden lg:block w-64 space-y-6 flex-shrink-0">
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-6">
            <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider font-serif border-b border-stone-200 pb-3">
              Filter By Category
            </h3>

            <div className="space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                    selectedCategory === cat
                      ? "bg-red-600 text-white shadow-sm"
                      : "text-zinc-600 hover:bg-stone-200/60 hover:text-zinc-900"
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              ))}
            </div>

            {/* Price Range Slider */}
            <div className="space-y-3 border-t border-stone-200 pt-6">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-900 uppercase font-serif">Max Price</span>
                <span className="font-mono font-bold text-red-600">৳{maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="15000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="flex-1 space-y-6">
          
          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
            
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-3.5 py-2 bg-white border border-stone-300 rounded-xl font-bold text-zinc-900 flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-red-600" />
              <span>Filters</span>
            </button>

            <span className="text-zinc-500 font-medium">
              Showing <strong className="text-zinc-900 font-bold">{filteredProducts.length}</strong> items
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400 hidden sm:block" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-bold text-zinc-900 outline-none focus:border-red-600 cursor-pointer"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Grid / Skeleton Loading */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-stone-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-stone-50 rounded-3xl border border-stone-200 space-y-3">
              <h3 className="text-base font-bold text-zinc-900 font-serif">No products found</h3>
              <p className="text-xs text-zinc-500">Try adjusting your filters or price range.</p>
            </div>
          )}

        </main>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-80 h-full bg-white p-6 space-y-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <h3 className="font-bold text-zinc-900 text-sm font-serif">Filter Products</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Categories</label>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer ${
                      selectedCategory === cat ? "bg-red-600 text-white" : "text-zinc-700 hover:bg-stone-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-900 uppercase">Max Price</span>
                  <span className="font-mono font-bold text-red-600">৳{maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-zinc-400">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
