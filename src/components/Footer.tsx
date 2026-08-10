"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { Mail, Phone, MapPin, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export function Footer() {
  const { t } = useApp();

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 pt-16 pb-24 lg:pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Features Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 mb-12 border-b border-zinc-900 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 bg-red-950/50 border border-red-900/50 rounded-2xl text-red-500">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-serif">Express Delivery</h4>
              <p className="text-xs text-zinc-500">Free shipping on orders over ৳3,000</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 bg-red-950/50 border border-red-900/50 rounded-2xl text-red-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-serif">Authenticity Guaranteed</h4>
              <p className="text-xs text-zinc-500">100% Genuine Italian Leather</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 bg-red-950/50 border border-red-900/50 rounded-2xl text-red-500">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-serif">Hassle-Free Returns</h4>
              <p className="text-xs text-zinc-500">7 Days return & exchange guarantee</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="RAIB Logo" width={36} height={36} />
              <div className="relative w-24 h-8">
                <Image src="/lgo2.png" alt="RAIB Wordmark" fill className="object-contain" />
              </div>
            </Link>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              {t("footerDesc")}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2.5 bg-zinc-900 hover:bg-red-600 hover:text-white rounded-full transition text-zinc-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="p-2.5 bg-zinc-900 hover:bg-red-600 hover:text-white rounded-full transition text-zinc-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-red-400 transition">{t("navHome")}</Link></li>
              <li><Link href="/shop" className="hover:text-red-400 transition">{t("navShop")}</Link></li>
              <li><Link href="/shop?category=Best Sellers" className="hover:text-red-400 transition">{t("navBestSellers")}</Link></li>
              <li><Link href="/checkout" className="hover:text-red-400 transition">{t("checkoutTitle")}</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              {t("customerCare")}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500" />
                <span>support@raibbags.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Gulshan Avenue, Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              {t("newsletterTitle")}
            </h4>
            <p className="text-xs text-zinc-400">{t("newsletterDesc")}</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-red-950/50 cursor-pointer"
              >
                {t("subscribe")}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} RAIB. {t("allRightsReserved")}</p>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-300 font-bold">bKash</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-300 font-bold">Nagad</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-300 font-bold">Rocket</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-300 font-bold">COD</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
