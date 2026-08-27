"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { useSettings } from "@/lib/settingsStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Tag, Sparkles, MessageCircle } from "lucide-react";
import { SafeImage } from "@/components/SafeImage";

export function CartDrawer() {
  const { lang, t, cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, showToast } = useApp();
  const { settings } = useSettings();

  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const freeShippingThreshold = 3000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const freeShippingProgress = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "RAIB10") {
      setAppliedDiscount(Math.round(cartTotal * 0.1));
      showToast(lang === "en" ? "10% Promo Code Applied!" : "১০% ডিসকাউন্ট কোড যুক্ত হয়েছে!");
    } else {
      showToast(lang === "en" ? "Invalid Promo Code (Try RAIB10)" : "অকার্যকর কোড (চেষ্টা করুন: RAIB10)");
    }
  };

  const finalTotal = Math.max(0, cartTotal - appliedDiscount);

  const handleWhatsAppOrderCart = () => {
    if (cart.length === 0) return;
    let rawPhone = settings?.whatsappNumber || "+8801700000000";
    let cleanPhone = rawPhone.replace(/\D/g, "");
    if (cleanPhone.startsWith("01")) cleanPhone = "88" + cleanPhone;

    const origin = typeof window !== "undefined" ? window.location.origin : "https://raib.site";
    const itemsSummary = cart
      .map((item, idx) => {
        const absoluteImg = item.image.startsWith("http")
          ? item.image
          : `${origin}${item.image.startsWith("/") ? "" : "/"}${item.image}`;
        return `${idx + 1}. 👜 *${item.name}*\n   🆔 Code: ${item.id}\n   🎨 Color: ${item.color}\n   🔢 Qty: x${item.quantity}\n   💰 Price: ৳${(item.price * item.quantity).toLocaleString()}\n   🖼️ Photo: ${absoluteImg}`;
      })
      .join("\n\n");

    const messageText = `🛍️ *RAIB LUXURY LEATHER - CART ORDER*

${itemsSummary}

---------------------------
💰 *Total Payable:* ৳${finalTotal.toLocaleString()}
📦 *Delivery:* Cash on Delivery (COD)

_Please confirm my order & send delivery details!_`;

    const waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(messageText)}`;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = waUrl;
    } else {
      window.open(waUrl, "_blank");
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          {/* Slide-Over Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[450px] bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col justify-between overflow-hidden shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-bold text-white font-serif">{t("cartTitle")}</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-red-950/40 p-4 border-b border-red-900/40 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-200">
                <span className="flex items-center gap-1.5 text-red-400">
                  <Truck className="w-4 h-4" />
                  {remainingForFreeShipping === 0
                    ? t("freeShippingAchieved")
                    : t("freeShippingRemaining", { amount: `৳${remainingForFreeShipping.toLocaleString()}` })}
                </span>
                <span>{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${freeShippingProgress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-red-600 to-amber-400 rounded-full"
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-zinc-900">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="p-6 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-600">
                    <ShoppingBag className="w-12 h-12" />
                  </div>
                  <p className="text-zinc-400 text-sm font-medium">{t("cartEmpty")}</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-red-500 transition cursor-pointer"
                  >
                    {t("cartStartShopping")}
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="pt-4 first:pt-0 flex gap-4">
                    {/* Item Thumbnail */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0">
                      <SafeImage src={item.image} alt={item.name} fill className="object-cover" />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 space-y-1">
                      <h4 className="text-sm font-bold text-white line-clamp-1 font-serif">
                        {lang === "bn" && item.nameBn ? item.nameBn : item.name}
                      </h4>
                      <p className="text-xs text-zinc-400">Color: <span className="text-zinc-200">{item.color}</span></p>
                      <div className="text-sm font-bold text-red-400 font-sans">
                        ৳{item.price.toLocaleString()}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center border border-zinc-800 rounded-lg bg-zinc-900 overflow-hidden text-xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                            className="p-1.5 hover:bg-zinc-800 text-zinc-300 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                            className="p-1.5 hover:bg-zinc-800 text-zinc-300 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id, item.color)}
                          className="p-1 text-zinc-500 hover:text-red-500 transition cursor-pointer"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer & Checkout Action */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-zinc-800 bg-zinc-900/80 space-y-4">
                
                {/* Promo Code Input */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder={t("promoCodePlaceholder")}
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white uppercase focus:border-red-500 outline-none"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    {t("apply")}
                  </button>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs text-zinc-400">
                  <div className="flex justify-between">
                    <span>{t("subtotal")}</span>
                    <span className="text-zinc-200 font-bold">৳{cartTotal.toLocaleString()}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-red-400 font-semibold">
                      <span>Promo Discount (10%)</span>
                      <span>-৳{appliedDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-zinc-800 text-sm font-bold text-white">
                    <span>Total</span>
                    <span className="text-red-400 font-extrabold text-base">৳{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Link & WhatsApp Order Option */}
                <div className="space-y-2">
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-4 bg-gradient-to-r from-red-600 via-red-700 to-zinc-900 hover:from-red-500 hover:to-zinc-800 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-red-950/60 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{t("checkoutButton")}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <button
                    onClick={handleWhatsAppOrderCart}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Order All via WhatsApp (হোয়াটসঅ্যাপে বুক করুন)</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
