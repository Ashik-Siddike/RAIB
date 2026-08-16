"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/lib/store";
import { useSettings } from "@/lib/settingsStore";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const { lang, showToast } = useApp();
  const { settings } = useSettings();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast(lang === "en" ? "Subscribed to RAIB Newsletter!" : "নিউজলেটারে সাবস্ক্রাইব করা হয়েছে!");
    setEmail("");
  };

  return (
    <footer className="bg-stone-900 text-stone-300 font-sans border-t border-stone-800 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative h-7 w-7 flex-shrink-0">
                <Image src="/main-logo.png" alt="RAIB Main Logo" fill className="object-contain" />
              </div>
              <div className="relative h-7 w-28 flex-shrink-0">
                <Image src="/raib leter logo.png" alt="RAIB Letter Logo" fill className="object-contain object-left" />
              </div>
            </Link>

            <p className="text-xs text-stone-400 leading-relaxed font-sans max-w-sm">
              {settings.footerTagline ||
                (lang === "bn"
                  ? "আধুনিক নারীদের জন্য ইতালিয়ান চামড়ার হাতে সেলাই করা অভিজাত ব্যাগ।"
                  : "Timeless luxury ladies bags designed to carry your story with elegance.")}
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-stone-400 font-mono">
              {settings.footerPhone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-red-500" />
                  <span>{settings.footerPhone}</span>
                </div>
              )}
              {settings.footerEmail && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-red-500" />
                  <span>{settings.footerEmail}</span>
                </div>
              )}
              {settings.footerAddress && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="leading-snug">{settings.footerAddress}</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: SHOP Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-serif">SHOP</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/shop" className="hover:text-white transition">All Bags</Link>
              </li>
              <li>
                <Link href="/shop?category=Tote Bags" className="hover:text-white transition">Totes</Link>
              </li>
              <li>
                <Link href="/shop?category=Crossbody Bags" className="hover:text-white transition">Crossbody</Link>
              </li>
              <li>
                <Link href="/shop?category=Clutches %26 Evening" className="hover:text-white transition">Clutches</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: COMPANY Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-serif">COMPANY</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/faq" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">Shipping</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">Returns</Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-white transition">Track Order</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: NEWSLETTER */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-serif">NEWSLETTER</h4>
            <p className="text-xs text-stone-400">Get 10% off your first order & stay updated.</p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address..."
                className="flex-1 px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white outline-none focus:border-red-500 font-sans"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition flex items-center justify-center cursor-pointer"
                title="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright & Social Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>{settings.footerCopyright || "© 2026 RAIB Bags. All rights reserved."}</p>

          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-stone-800 hover:bg-stone-700 rounded-full text-stone-400 hover:text-white transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-stone-800 hover:bg-stone-700 rounded-full text-stone-400 hover:text-white transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
