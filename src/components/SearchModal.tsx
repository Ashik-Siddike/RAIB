"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp, ProductType } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/SafeImage";

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, lang } = useApp();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (isSearchOpen) {
      async function fetchProducts() {
        try {
          const res = await fetch("/api/products");
          const data = await res.json();
          if (data.success && Array.isArray(data.products)) {
            setProducts(data.products);
          }
        } catch (e) {
          console.error(e);
        }
      }
      fetchProducts();
    }
  }, [isSearchOpen]);

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          (p.nameBn && p.nameBn.includes(query)) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.color.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50 font-sans"
          >
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4">
              
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3">
                <Search className="w-5 h-5 text-red-500 flex-shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="খুঁজুন (যেমন: Tote Bag, Red, Sapphire)..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white rounded-full transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results List */}
              {query.trim() && (
                <div className="max-h-80 overflow-y-auto space-y-2 pt-2 divide-y divide-zinc-900">
                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-8 text-xs text-zinc-500">
                      কোনো প্রোডাক্ট পাওয়া যায়নি।
                    </div>
                  ) : (
                    filteredProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="pt-2 first:pt-0 flex items-center justify-between gap-4 p-3 rounded-2xl hover:bg-zinc-900 transition group cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0">
                            <SafeImage src={p.image} alt={p.name} fill className="object-cover" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white group-hover:text-red-500 transition-colors font-serif">
                              {lang === "bn" && p.nameBn ? p.nameBn : p.name}
                            </h4>
                            <span className="text-[10px] text-zinc-500">{p.category} • {p.color}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-red-400 font-mono">
                            ৳{p.price.toLocaleString()}
                          </span>
                          <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
