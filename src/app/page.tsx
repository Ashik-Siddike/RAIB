"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Hero } from "@/components/Hero";
import { ReelsSection } from "@/components/ReelsSection";
import { OfferBanner } from "@/components/OfferBanner";
import { SAMPLE_PRODUCTS } from "@/lib/productsData";
import { ProductType, useApp } from "@/lib/store";
import { useSettings } from "@/lib/settingsStore";
import { ShieldCheck, Truck, RotateCcw, Award, ArrowRight } from "lucide-react";

export default function Home() {
  const { lang } = useApp();
  const { settings } = useSettings();

  const [products, setProducts] = useState<ProductType[]>(SAMPLE_PRODUCTS);

  // Fetch products from MongoDB API
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Failed to load products from API:", err);
      }
    }
    loadProducts();
  }, []);

  const bestSellers = products.slice(0, 6);
  const newArrivals = products.slice(0, 8);

  const showTrust = settings.showTrustBadges ?? true;

  return (
    <div className="space-y-0 w-full overflow-x-hidden bg-white text-zinc-900 transition-colors">
      
      {/* 1. Hero Section */}
      {settings.showHero && <Hero />}

      {/* 2. Bestsellers Section */}
      {settings.showBestsellers && (
        <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest block font-sans">
                {settings.bestsellersBadge || "FEATURED TODAY"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 font-serif tracking-tight">
                {settings.bestsellersTitle || "Bestsellers"}
              </h2>
              {settings.bestsellersSubtitle && (
                <p className="text-xs text-zinc-500 font-sans max-w-xl mx-auto">
                  {settings.bestsellersSubtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center pt-4">
              <Link
                href="/shop?category=Best Sellers"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-600 hover:text-zinc-900 transition group"
              >
                <span>{settings.bestsellersCtaText || "VIEW ALL BESTSELLERS"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-red-600" />
              </Link>
            </div>

          </div>
        </section>
      )}

      {/* 3. Video Reels / Stories Section ("STORIES THAT LEAD") */}
      {settings.showReels && <ReelsSection />}

      {/* 4. New Arrivals Section */}
      {settings.showNewArrivals && (
        <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest block font-sans">
                {settings.newArrivalsBadge || "JUST ARRIVED"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 font-serif tracking-tight">
                {settings.newArrivalsTitle || "New Arrivals"}
              </h2>
              {settings.newArrivalsSubtitle && (
                <p className="text-xs text-zinc-500 font-sans max-w-xl mx-auto">
                  {settings.newArrivalsSubtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center pt-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-600 hover:text-zinc-900 transition group"
              >
                <span>{settings.newArrivalsCtaText || "EXPLORE ALL BAGS"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-red-600" />
              </Link>
            </div>

          </div>
        </section>
      )}

      {/* 5. Promotional Offer Banner */}
      {settings.showOfferBanner && <OfferBanner />}

      {/* Trust Badges Section */}
      {showTrust && (
        <section className="py-12 bg-stone-50 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-4 space-y-2">
                <Award className="w-6 h-6 text-red-600 mx-auto" />
                <h4 className="text-xs font-bold text-zinc-900 uppercase font-serif">
                  {settings.trustBadge1Title || "100% Genuine Italian Leather"}
                </h4>
                <p className="text-[11px] text-zinc-500">
                  {settings.trustBadge1Subtitle || "Handcrafted by master artisans"}
                </p>
              </div>

              <div className="p-4 space-y-2">
                <Truck className="w-6 h-6 text-red-600 mx-auto" />
                <h4 className="text-xs font-bold text-zinc-900 uppercase font-serif">
                  {settings.trustBadge2Title || "Cash on Delivery"}
                </h4>
                <p className="text-[11px] text-zinc-500">
                  {settings.trustBadge2Subtitle || "Fast home delivery across BD"}
                </p>
              </div>

              <div className="p-4 space-y-2">
                <RotateCcw className="w-6 h-6 text-red-600 mx-auto" />
                <h4 className="text-xs font-bold text-zinc-900 uppercase font-serif">
                  {settings.trustBadge3Title || "7-Day Easy Exchange"}
                </h4>
                <p className="text-[11px] text-zinc-500">
                  {settings.trustBadge3Subtitle || "Guaranteed replacement protection"}
                </p>
              </div>

              <div className="p-4 space-y-2">
                <ShieldCheck className="w-6 h-6 text-red-600 mx-auto" />
                <h4 className="text-xs font-bold text-zinc-900 uppercase font-serif">
                  {settings.trustBadge4Title || "18K Gold-Plated Hardware"}
                </h4>
                <p className="text-[11px] text-zinc-500">
                  {settings.trustBadge4Subtitle || "Rust & tarnish resistant"}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
