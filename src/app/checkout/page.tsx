"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { useSettings } from "@/lib/settingsStore";
import { ShieldCheck, Truck, ArrowLeft, Check, Ticket, Copy, Printer } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, lang, t, showToast } = useApp();
  const { settings } = useSettings();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("Dhaka");
  const [thana, setThana] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "BKASH" | "NAGAD">("COD");
  const [transactionId, setTransactionId] = useState("");
  const [senderPhone, setSenderPhone] = useState("");

  // Promo Code Engine State
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedCouponName, setAppliedCouponName] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);

  const deliveryCharge = settings.deliveryCharge || 120;
  const subtotalAfterDiscount = Math.max(0, cartTotal - appliedDiscount);
  const totalPayable = subtotalAfterDiscount + deliveryCharge;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();

    if (cleanCode === "WELCOME500") {
      setAppliedDiscount(500);
      setAppliedCouponName("WELCOME500 (৳500 OFF)");
      showToast("Coupon Applied: ৳500 Discount!");
    } else if (cleanCode === "RAIB10") {
      const discount = Math.round(cartTotal * 0.1);
      setAppliedDiscount(discount);
      setAppliedCouponName("RAIB10 (10% OFF)");
      showToast(`Coupon Applied: ৳${discount} Discount!`);
    } else if (cleanCode === "EID2026") {
      setAppliedDiscount(750);
      setAppliedCouponName("EID2026 (৳750 OFF)");
      showToast("Coupon Applied: ৳750 Discount!");
    } else {
      showToast("Invalid Coupon Code. Try WELCOME500 or RAIB10");
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!customerName || !customerPhone || !address) {
      showToast("Please fill in your name, phone number, and delivery address.");
      return;
    }

    if (paymentMethod !== "COD" && (!transactionId || !senderPhone)) {
      showToast("Please provide the TrxID and Sender Phone number.");
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      customerName,
      customerPhone,
      address,
      district,
      thana,
      paymentMethod,
      advancePaid: paymentMethod === "COD" ? 120 : totalPayable,
      totalAmount: totalPayable,
      transactionId: paymentMethod === "COD" ? `COD-${Date.now()}` : transactionId,
      senderPhone: paymentMethod === "COD" ? customerPhone : senderPhone,
      items: cart.map((item) => ({
        name: item.name,
        color: item.color,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (data.success) {
        setOrderConfirmed(data.order);
        clearCart();
        showToast(lang === "en" ? "Order Placed Successfully!" : "অর্ডার সফলভাবে সম্পন্ন হয়েছে!");
      }
    } catch (err) {
      console.error("Order submit failed:", err);
      showToast("Order submit failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Printable Invoice Printer
  const handlePrintInvoice = () => {
    window.print();
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8 print:p-0">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-2xl print:bg-white print:text-black print:border-none"
        >
          <div className="w-16 h-16 rounded-full bg-green-950 text-green-400 border border-green-800 flex items-center justify-center mx-auto print:hidden">
            <Check className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest print:text-black">
              Official Tax Invoice
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-serif print:text-black">
              Order Confirmed!
            </h1>
            <p className="text-xs text-zinc-400 font-mono print:text-black">
              Invoice #{orderConfirmed.orderNumber}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-left space-y-2 text-xs print:bg-gray-100 print:text-black">
            <div className="flex justify-between">
              <span className="text-zinc-400 print:text-black">Customer Name:</span>
              <strong className="text-white print:text-black">{orderConfirmed.customerName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 print:text-black">Phone:</span>
              <strong className="text-white print:text-black">{orderConfirmed.customerPhone}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 print:text-black">Delivery Address:</span>
              <strong className="text-white text-right max-w-xs print:text-black">{orderConfirmed.address}, {orderConfirmed.district}</strong>
            </div>
            <div className="flex justify-between border-t border-zinc-800 pt-2 print:border-black">
              <span className="text-zinc-400 print:text-black">Total Amount Payable:</span>
              <strong className="text-red-400 font-mono text-sm print:text-black">৳{orderConfirmed.totalAmount?.toLocaleString()}</strong>
            </div>
          </div>

          <div className="flex gap-4 print:hidden">
            <button
              onClick={handlePrintInvoice}
              className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice Receipt</span>
            </button>

            <Link
              href="/shop"
              className="flex-1 py-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 w-full overflow-x-hidden">
      
      <div className="flex items-center gap-4">
        <Link href="/shop" className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-white transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-serif">Checkout & Order Placement</h1>
          <p className="text-xs text-zinc-400">100% Secure Checkout | Cash on Delivery Available Across Bangladesh</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Customer Address & Payment Entry */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            
            {/* Delivery Address Box */}
            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
                <Truck className="w-5 h-5 text-red-500" />
                <span>1. Shipping & Contact Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Farhana Akter"
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="01700000000"
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 font-mono"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="text-zinc-400 block mb-1">Delivery Address *</label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House No, Road No, Area, Thana..."
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1">District</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 cursor-pointer"
                  >
                    <option value="Dhaka">Dhaka (ঢাকার ভেতরে)</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                    <option value="Outside Dhaka">Outside Dhaka (ঢাকার বাইরে)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-red-500" />
                <span>2. Select Payment Method</span>
              </h3>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("COD")}
                  className={`p-4 rounded-2xl border text-center transition cursor-pointer ${
                    paymentMethod === "COD" ? "bg-red-950/60 border-red-500 text-white font-bold" : "bg-zinc-950 border-zinc-800 text-zinc-400"
                  }`}
                >
                  Cash on Delivery
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("BKASH")}
                  className={`p-4 rounded-2xl border text-center transition cursor-pointer ${
                    paymentMethod === "BKASH" ? "bg-pink-950/60 border-pink-500 text-white font-bold" : "bg-zinc-950 border-zinc-800 text-zinc-400"
                  }`}
                >
                  bKash
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("NAGAD")}
                  className={`p-4 rounded-2xl border text-center transition cursor-pointer ${
                    paymentMethod === "NAGAD" ? "bg-orange-950/60 border-orange-500 text-white font-bold" : "bg-zinc-950 border-zinc-800 text-zinc-400"
                  }`}
                >
                  Nagad
                </button>
              </div>

              {paymentMethod !== "COD" && (
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-red-950/40 border border-red-900/60 text-zinc-300">
                    Send Money Number: <strong className="text-white font-mono text-sm">{paymentMethod === "BKASH" ? settings.bkashNumber : settings.nagadNumber}</strong>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-zinc-400 block mb-1">TrxID (Transaction ID) *</label>
                      <input
                        type="text"
                        required
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="e.g. 9J87K2L1"
                        className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">Sender Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                        placeholder="01700000000"
                        className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-red-950/80 transition cursor-pointer"
            >
              {isSubmitting ? "Processing Order..." : `Confirm Order (৳${totalPayable.toLocaleString()})`}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary & Promo Code Engine */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white font-serif">Order Summary</h3>

            {/* Cart Items */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-zinc-800/60">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-zinc-400">Qty: {item.quantity} • {item.color}</p>
                    </div>
                  </div>

                  <span className="font-bold text-white font-mono">৳{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Promo Coupon Form */}
            <form onSubmit={handleApplyCoupon} className="pt-2">
              <label className="text-[11px] font-bold text-zinc-400 block mb-1 flex items-center gap-1">
                <Ticket className="w-3.5 h-3.5 text-red-500" />
                Promo Coupon Code (e.g. WELCOME500)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon..."
                  className="flex-1 px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-red-500 font-mono uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {appliedCouponName && (
                <span className="text-[10px] text-green-400 font-bold mt-1 block">
                  ✓ Active Promo: {appliedCouponName}
                </span>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-2 pt-4 border-t border-zinc-800 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal:</span>
                <span className="font-mono text-white">৳{cartTotal.toLocaleString()}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-400 font-bold">
                  <span>Coupon Discount:</span>
                  <span className="font-mono">-৳{appliedDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-400">
                <span>Shipping Fee (Bangladesh):</span>
                <span className="font-mono text-white">৳{deliveryCharge.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-zinc-800">
                <span>Total Payable:</span>
                <span className="font-mono text-red-400">৳{totalPayable.toLocaleString()}</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
