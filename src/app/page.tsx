"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { Craftsmanship } from "@/components/Craftsmanship";
import { SAMPLE_PRODUCTS } from "@/lib/productsData";
import { useApp } from "@/lib/store";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";

export default function Home() {
  const { lang, t } = useApp();
  const [activeTab, setActiveTab] = useState<"all" | "bestseller" | "new">("all");

  const categories = [
    { name: "Tote Bags", nameBn: "টোট ব্যাগ", count: "12 Items", image: "/tote_bag_red_1786395433017.jpg", href: "/shop?category=Tote Bags" },
    { name: "Crossbody Bags", nameBn: "ক্রসবডি ব্যাগ", count: "18 Items", image: "/crossbody_black_1786395824801.jpg", href: "/shop?category=Crossbody Bags" },
    { name: "Shoulder Bags", nameBn: "শোল্ডার ব্যাগ", count: "15 Items", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80", href: "/shop?category=Shoulder Bags" },
    { name: "Clutches & Evening", nameBn: "ক্লাচ ব্যাগ", count: "9 Items", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=80", href: "/shop?category=Clutches & Evening" },
  ];

  const filteredProducts = SAMPLE_PRODUCTS.filter((p) => {
    if (activeTab === "bestseller") return p.isBestSeller;
    if (activeTab === "new") return p.isNewArrival;
    return true;
  });

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Banner */}
      <Hero />

      {/* Categories Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
              Collections
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-zinc-300 hover:text-red-400 uppercase tracking-wider flex items-center gap-1 group"
          >
            <span>{t("navShop")}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-80 rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
                <div>
                  <h3 className="text-xl font-bold text-white font-serif">
                    {lang === "bn" ? cat.nameBn : cat.name}
                  </h3>
                  <span className="text-xs text-zinc-400 font-sans">{cat.count}</span>
                </div>

                <Link
                  href={cat.href}
                  className="p-3 rounded-full bg-zinc-950/80 text-white border border-zinc-700/80 group-hover:bg-red-600 group-hover:border-red-500 transition-all duration-300 group-hover:scale-110 shadow-lg"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-950/50 px-3.5 py-1 rounded-full border border-red-900/50">
            {t("featuredTitle")}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif">
            Iconic Leather Bags
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans">
            {t("featuredSubtitle")}
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition ${
                activeTab === "all"
                  ? "bg-red-600 text-white shadow-lg shadow-red-950/60"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              All Bags
            </button>
            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition ${
                activeTab === "bestseller"
                  ? "bg-red-600 text-white shadow-lg shadow-red-950/60"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition ${
                activeTab === "new"
                  ? "bg-red-600 text-white shadow-lg shadow-red-950/60"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Craftsmanship Section */}
      <Craftsmanship />

      {/* Testimonials & Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
            Loved by 10,000+ Women
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mt-2">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-zinc-300 italic font-serif leading-relaxed">
              "The Royal Crimson Tote exceeds all expectations! The Italian leather smell and gold hardware feel like a ৳50,000 luxury bag. Best purchase this year!"
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
              <div className="w-10 h-10 rounded-full bg-zinc-800 font-bold text-red-400 flex items-center justify-center">
                SJ
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Sadia Jahan</h4>
                <p className="text-[10px] text-zinc-500">Verified Customer, Dhaka</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-zinc-300 italic font-serif leading-relaxed">
              "Obsidian Crossbody is my everyday go-to. Extremely fast delivery in Chittagong within 2 days! Packaging was super luxury with dust bag."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
              <div className="w-10 h-10 rounded-full bg-zinc-800 font-bold text-red-400 flex items-center justify-center">
                NR
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Nusrat Rahman</h4>
                <p className="text-[10px] text-zinc-500">Verified Customer, Chittagong</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-zinc-300 italic font-serif leading-relaxed">"100% genuine leather! The finishing and stitching quality is world-class. Thank you RAIB team!"</p>
            <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
              <div className="w-10 h-10 rounded-full bg-zinc-800 font-bold text-red-400 flex items-center justify-center">
                FA
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Farhana Akter</h4>
                <p className="text-[10px] text-zinc-500">Verified Customer, Sylhet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram / UGC Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
              @RAIBOFFICIAL
            </span>
            <h2 className="text-2xl font-bold text-white font-serif">Follow Us on Instagram</h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-red-500 text-xs font-bold text-zinc-200 rounded-xl transition"
          >
            <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Join Community</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden group bg-zinc-900">
            <Image src="/tote_bag_red_1786395433017.jpg" alt="Instagram 1" fill className="object-cover group-hover:scale-110 transition duration-500" />
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden group bg-zinc-900">
            <Image src="/crossbody_black_1786395824801.jpg" alt="Instagram 2" fill className="object-cover group-hover:scale-110 transition duration-500" />
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden group bg-zinc-900">
            <Image src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80" alt="Instagram 3" fill className="object-cover group-hover:scale-110 transition duration-500" />
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden group bg-zinc-900">
            <Image src="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=80" alt="Instagram 4" fill className="object-cover group-hover:scale-110 transition duration-500" />
          </div>
        </div>
      </section>
    </div>
  );
}
