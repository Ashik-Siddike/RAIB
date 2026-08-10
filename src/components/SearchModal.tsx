"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { SAMPLE_PRODUCTS } from "@/lib/productsData";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, lang, t } = useApp();
  const [query, setQuery] = useState("");

  const filteredProducts = query.trim()
    ? SAMPLE_PRODUCTS.filter(
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50"
          >
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4">
              
              {/* Search Bar Input */}
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-red-500 absolute left-4" />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("navSearchPlaceholder")}
                  className="w-full pl-12 pr-10 py-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl text-sm text-white outline-none focus:border-red-500 placeholder-zinc-500 font-sans"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-3 p-1.5 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Instant Search Results */}
              {query.trim() && (
                <div className="max-h-96 overflow-y-auto space-y-2 pt-2 divide-y divide-zinc-900">
                  {filteredProducts.length === 0 ? (
                    <p className="text-zinc-500 text-xs text-center py-6">
                      No matching handbags found for "{query}"
                    </p>
                  ) : (
                    filteredProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-900 transition group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
                            <Image src={p.image} alt={p.name} fill className="object-cover" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white group-hover:text-red-400 font-serif">
                              {lang === "bn" && p.nameBn ? p.nameBn : p.name}
                            </h4>
                            <p className="text-xs text-zinc-400">{p.category} • {p.color}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-red-400">৳{p.price.toLocaleString()}</span>
                          <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition" />
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
