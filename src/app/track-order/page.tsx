"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { Search, Package, Clock, CheckCircle2, Truck, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function TrackOrderPage() {
  const { lang, t } = useApp();
  const [query, setQuery] = useState("");
  const [orderResult, setOrderResult] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    setOrderResult(null);

    try {
      const res = await fetch("/api/orders");
      const data = await res.json();

      if (data.success && data.orders) {
        const found = data.orders.find(
          (o: any) =>
            o.orderNumber?.toLowerCase() === query.trim().toLowerCase() ||
            o.customerPhone?.replace(/\D/g, "") === query.trim().replace(/\D/g, "") ||
            o.transactionId?.toLowerCase() === query.trim().toLowerCase()
        );
        setOrderResult(found || null);
      }
    } catch (err) {
      console.error("Failed to track order:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 pb-24 lg:pb-20 space-y-12 w-full overflow-x-hidden">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-950/60 px-3.5 py-1 rounded-full border border-red-900/60">
          Live Order Status
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif">
          Track Your Order
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Enter your Order Number (e.g. RAIB-1001), Phone Number, or TrxID to track delivery progress.
        </p>
      </div>

      {/* Track Search Box */}
      <form onSubmit={handleTrack} className="max-w-xl mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Order Number, Phone, or TrxID..."
            className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white outline-none focus:border-red-500 text-sm font-mono shadow-xl"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-xl transition cursor-pointer flex items-center gap-2 flex-shrink-0"
        >
          {isLoading ? "Searching..." : "Track"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Result Display */}
      {hasSearched && (
        <div className="max-w-2xl mx-auto">
          {orderResult ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-bold">Order Number</span>
                  <h3 className="text-xl font-extrabold text-white font-mono">{orderResult.orderNumber}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      orderResult.orderStatus === "Confirmed"
                        ? "bg-green-950 text-green-400 border border-green-800"
                        : orderResult.orderStatus === "Cancelled"
                        ? "bg-red-950 text-red-400 border border-red-800"
                        : "bg-amber-950 text-amber-400 border border-amber-800 animate-pulse"
                    }`}
                  >
                    {orderResult.orderStatus === "Pending" ? "Processing & Verification" : orderResult.orderStatus}
                  </span>
                </div>
              </div>

              {/* Progress Timeline Tracker */}
              <div className="grid grid-cols-3 gap-2 py-4 text-center">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-green-950 border border-green-700 text-green-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-white block">Placed</span>
                </div>

                <div className="space-y-2">
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center mx-auto ${
                      orderResult.orderStatus === "Confirmed"
                        ? "bg-green-950 border-green-700 text-green-400"
                        : "bg-zinc-950 border-zinc-800 text-zinc-600"
                    }`}
                  >
                    <Package className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-white block">Confirmed</span>
                </div>

                <div className="space-y-2">
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center mx-auto ${
                      orderResult.orderStatus === "Confirmed"
                        ? "bg-amber-950 border-amber-700 text-amber-400 animate-bounce"
                        : "bg-zinc-950 border-zinc-800 text-zinc-600"
                    }`}
                  >
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-white block">Out for Delivery</span>
                </div>
              </div>

              {/* Order Summary Details */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Customer:</span>
                  <strong className="text-white">{orderResult.customerName} ({orderResult.customerPhone})</strong>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Delivery Address:</span>
                  <strong className="text-white text-right max-w-xs">{orderResult.address}, {orderResult.district}</strong>
                </div>
                <div className="flex justify-between text-zinc-400 border-t border-zinc-800 pt-2">
                  <span>Total Amount (COD):</span>
                  <strong className="text-red-400 font-mono text-sm">৳{orderResult.totalAmount?.toLocaleString()}</strong>
                </div>
              </div>

            </motion.div>
          ) : (
            <div className="text-center py-12 p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No Order Found</h3>
              <p className="text-xs text-zinc-400">
                We couldn't find an order matching "{query}". Please check your order number or phone number and try again.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
