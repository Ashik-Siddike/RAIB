"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Hero } from "@/components/Hero";
import { ReelsSection } from "@/components/ReelsSection";
import { OfferBanner } from "@/components/OfferBanner";
import { ProductType, useApp } from "@/lib/store";
import { useSettings } from "@/lib/settingsStore";
import { ShieldCheck, Truck, RotateCcw, Award, ArrowRight } from "lucide-react";

export default function Home() {
  const { lang } = useApp();
  const { settings } = useSettings();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch live products directly from MongoDB API
  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Failed to load products from API:", err);
      } finally {
        setIsLoading(false);
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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-red-600 tracking-widest uppercase font-sans">
                  {settings.bestsellersBadge || "FEATURED TODAY"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight font-serif">
                  {settings.bestsellersTitle || "Bestsellers"}
                </h2>
                <p className="text-sm text-zinc-600 max-w-xl">
                  {settings.bestsellersSubtitle || "Handcrafted Italian leather favorites loved by modern women."}
                </p>
              </div>

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 uppercase tracking-wider group transition-colors flex-shrink-0"
              >
                <span>{settings.bestsellersCtaText || "VIEW ALL BESTSELLERS"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Bestsellers Grid / Loading Skeleton */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-stone-100 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : bestSellers.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                {bestSellers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-stone-400 text-xs font-medium bg-stone-50 rounded-2xl border border-stone-200">
                No products found in Bestsellers. Add products from Admin Panel.
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3. Client Stories Reels Section */}
      {settings.showReels && <ReelsSection />}

      {/* 4. New Arrivals Section */}
      {settings.showNewArrivals && (
        <section className="py-16 sm:py-24 bg-stone-50/50 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-red-600 tracking-widest uppercase font-sans">
                  {settings.newArrivalsBadge || "EXCLUSIVE DROPS"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight font-serif">
                  {settings.newArrivalsTitle || "New Arrivals"}
                </h2>
                <p className="text-sm text-zinc-600 max-w-xl">
                  {settings.newArrivalsSubtitle || "Explore our latest handcrafted genuine leather arrivals."}
                </p>
              </div>

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 uppercase tracking-wider group transition-colors flex-shrink-0"
              >
                <span>{settings.newArrivalsCtaText || "DISCOVER ALL PRODUCTS"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* New Arrivals Grid / Loading Skeleton */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-stone-200/60 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : newArrivals.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {newArrivals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-stone-400 text-xs font-medium bg-white rounded-2xl border border-stone-200">
                No new arrivals found. Add products from Admin Panel.
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. Promotional Offer Banner */}
      {settings.showOfferBanner && <OfferBanner />}

      {/* 6. Trust Badges & Guarantee Features */}
      {showTrust && (
        <section className="py-16 bg-white border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-3">
                <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-serif">
                  {settings.trustBadge1Title || "100% Genuine Italian Leather"}
                </h4>
                <p className="text-[11px] text-zinc-500">
                  {settings.trustBadge1Subtitle || "Handcrafted by master artisans with full-grain leather."}
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-3">
                <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                  <Truck className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-serif">
                  {settings.trustBadge2Title || "Fast Express Shipping"}
                </h4>
                <p className="text-[11px] text-zinc-500">
                  {settings.trustBadge2Subtitle || "24-48 Hour delivery across Dhaka and nationwide."}
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-3">
                <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-serif">
                  {settings.trustBadge3Title || "Cash on Delivery Available"}
                </h4>
                <p className="text-[11px] text-zinc-500">
                  {settings.trustBadge3Subtitle || "Inspect product upon delivery before payment."}
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-3">
                <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-serif">
                  {settings.trustBadge4Title || "7-Day Easy Exchange"}
                </h4>
                <p className="text-[11px] text-zinc-500">
                  {settings.trustBadge4Subtitle || "Hassle-free size or color exchange guaranteed."}
                </p>
              </div>

            </div>
          </div>
        </section>
      )}

    </div>
  );
}
