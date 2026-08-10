"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { useSettings } from "@/lib/settingsStore";
import { CheckCircle2, ShieldCheck, Truck, Copy, ArrowRight, Clock, MessageSquare, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { lang, t, cart, cartTotal, clearCart, showToast } = useApp();
  const { settings } = useSettings();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("Dhaka");
  const [thana, setThana] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<"COD" | "BKASH" | "NAGAD" | "ROCKET">("COD");
  const [transactionId, setTransactionId] = useState("");
  const [senderPhone, setSenderPhone] = useState("");

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState<any>(null);

  const deliveryCharge = settings.deliveryCharge || 120;
  const grandTotal = cartTotal + deliveryCharge;

  // Advance payment required amount
  const requiredAmount = paymentMethod === "COD" ? deliveryCharge : grandTotal;

  const getTargetNumber = () => {
    if (paymentMethod === "NAGAD") return settings.nagadNumber;
    if (paymentMethod === "ROCKET") return settings.rocketNumber;
    return settings.bkashNumber;
  };

  const handleCopyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    showToast(lang === "en" ? `Copied ${num} to clipboard!` : `${num} নম্বরটি কপি করা হয়েছে!`);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !district || !thana) {
      showToast(lang === "en" ? "Please fill in all mandatory shipping details (Name, Phone, Address, District, Thana)." : "অনুগ্রহ করে আপনার পূর্ণ নাম, ফোন, ঠিকানা, জেলা ও থানা পূরণ করুন।");
      return;
    }

    if (!transactionId.trim() || !senderPhone.trim()) {
      showToast(lang === "en" ? "Please enter your Transaction ID (TrxID) & Sender Number" : "অনুগ্রহ করে আপনার ট্রানজ্যাকশন আইডি ও প্রেরক নম্বর লিখুন");
      return;
    }

    const generatedOrderNum = "RAIB-" + Math.floor(100000 + Math.random() * 900000);
    
    const orderData = {
      orderNumber: generatedOrderNum,
      customerName: fullName,
      customerPhone: phone,
      customerEmail: email,
      address,
      district,
      thana,
      items: cart,
      totalAmount: grandTotal,
      advancePaid: requiredAmount,
      paymentMethod,
      transactionId,
      senderPhone,
      orderStatus: "Pending",
      estimatedDelivery: "3-5 Business Days",
    };

    setPlacedOrderDetails(orderData);
    setIsOrderPlaced(true);
    clearCart();
    showToast(lang === "en" ? "Order Placed & Sent for TrxID Verification!" : "আপনার অর্ডার ও ট্রানজ্যাকশন আইডি গ্রহণ করা হয়েছে!");
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(`Hi RAIB Team, I have placed Order #${placedOrderDetails?.orderNumber} with TrxID: ${placedOrderDetails?.transactionId}. Please confirm my order!`);
    const cleanNum = settings.whatsappNumber.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${cleanNum}?text=${text}`, "_blank");
  };

  const handleOpenMessenger = () => {
    window.open(`https://m.me/${settings.messengerPageId}`, "_blank");
  };

  if (isOrderPlaced && placedOrderDetails) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        
        {/* Animated Pending Clock Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 mx-auto rounded-full bg-amber-950/80 border-2 border-amber-500 text-amber-500 flex items-center justify-center shadow-2xl"
        >
          <Clock className="w-10 h-10 animate-pulse" />
        </motion.div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-4 py-1.5 rounded-full border border-amber-800/60">
            {lang === "en" ? "Your Order is Pending" : "আপনার অর্ডারটি পেন্ডিং রয়েছে"}
          </span>
          <h1 className="text-3xl font-extrabold text-white font-serif pt-2">
            {lang === "en" ? "Order Submitted — Awaiting Verification" : "অর্ডার সাবমিট হয়েছে — ভেরিফিকেশন সাপেক্ষ"}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
            {lang === "en"
              ? "Your order has been registered. Our admin representative will verify your TrxID and confirm your order shortly!"
              : "আপনার অর্ডার সফলভাবে রেজিস্টার্ড হয়েছে। আমাদের প্রতিনিধি আপনার প্রদত্ত ট্রানজ্যাকশন আইডি (TrxID) ও পেমেন্ট রিভিউ করে শীঘ্রই অর্ডারটি কনফার্ম করে দেবেন।"}
          </p>
        </div>

        {/* Live Support Box for Instant Confirmation */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-zinc-950 border border-red-900/50 max-w-md mx-auto space-y-3 text-left">
          <div className="flex items-center gap-2 text-white font-serif font-bold text-sm">
            <MessageSquare className="w-4 h-4 text-red-500" />
            <span>অর্ডার কনফার্ম হতে দেরি হচ্ছে?</span>
          </div>
          <p className="text-xs text-zinc-400">
            সরাসরি আমাদের হোয়াটসঅ্যাপ বা মেসেঞ্জারে ট্রানজ্যাকশন আইডি মেসেজ দিয়ে খুব দ্রুত অর্ডার কনফার্ম করিয়ে নিন:
          </p>

          <div className="flex gap-3 pt-1">
            <button
              onClick={handleOpenWhatsApp}
              className="flex-1 py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg"
            >
              <span>WhatsApp Chat</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleOpenMessenger}
              className="flex-1 py-2.5 px-3 bg-[#0084FF] hover:bg-[#0074e0] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Messenger</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Estimated Delivery Banner */}
        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 max-w-md mx-auto flex items-center gap-3 text-left">
          <Truck className="w-6 h-6 text-red-500 flex-shrink-0" />
          <div className="text-xs">
            <h4 className="font-bold text-white">Estimated Delivery Time</h4>
            <p className="text-zinc-400">
              আপনার শহরের দূরত্ব অনুযায়ী ডেলিভারি পেতে <strong>৩ থেকে ৫ দিন</strong> লাগতে পারে (সর্বোচ্চ ৭ দিন)।
            </p>
          </div>
        </div>

        {/* Order Details Summary */}
        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 text-left max-w-md mx-auto space-y-3 text-xs text-zinc-300">
          <div className="flex justify-between">
            <span className="text-zinc-500">Order Number:</span>
            <span className="font-bold text-white font-mono">{placedOrderDetails.orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Customer Name:</span>
            <span className="font-bold text-white">{placedOrderDetails.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Phone Number:</span>
            <span className="font-bold text-white">{placedOrderDetails.customerPhone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Delivery Address:</span>
            <span className="font-bold text-white">{placedOrderDetails.address}, {placedOrderDetails.district}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Payment Method:</span>
            <span className="font-bold text-red-400">{placedOrderDetails.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Submitted TrxID:</span>
            <span className="font-bold text-amber-400 font-mono">{placedOrderDetails.transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Sender Number:</span>
            <span className="font-bold text-zinc-200">{placedOrderDetails.senderPhone}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-zinc-800 font-bold text-sm text-white">
            <span>Total Payable Amount:</span>
            <span className="text-red-400 font-extrabold">৳{placedOrderDetails.totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/shop"
            className="px-8 py-3.5 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition inline-flex items-center gap-2 shadow-xl shadow-red-950/60"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="space-y-2">
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
          Checkout
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
          {t("checkoutTitle")}
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Delivery Form & Payment Instructions */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Customer & Shipping Info */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-6">
            <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
              <Truck className="w-5 h-5 text-red-500" />
              <span>{t("contactInfo")}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1">{t("fullName")} *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sadia Jahan"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1">{t("phoneNumber")} *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01700000000"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium block mb-1">{t("emailAddress")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium block mb-1">{t("deliveryAddress")} *</label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House No, Road No, Area details"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-red-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1">{t("cityDistrict")} *</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-red-500 cursor-pointer"
                >
                  <option value="Dhaka">Dhaka Division</option>
                  <option value="Chittagong">Chittagong Division</option>
                  <option value="Sylhet">Sylhet Division</option>
                  <option value="Rajshahi">Rajshahi Division</option>
                  <option value="Khulna">Khulna Division</option>
                  <option value="Barisal">Barisal Division</option>
                  <option value="Rangpur">Rangpur Division</option>
                  <option value="Mymensingh">Mymensingh Division</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1">{t("thanaArea")} *</label>
                <input
                  type="text"
                  required
                  value={thana}
                  onChange={(e) => setThana(e.target.value)}
                  placeholder="e.g. Gulshan / Dhanmondi"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-red-500"
                />
              </div>
            </div>

          </div>

          {/* Payment Method Selector & Send Money Instructions */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-serif">Select Payment Option</h3>
              <span className="text-xs font-bold text-red-400 bg-red-950/60 px-3 py-1 rounded-full border border-red-900/60">
                Send Money (bKash / Nagad / Rocket)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* COD Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod("COD")}
                className={`p-4 rounded-2xl border text-left transition ${
                  paymentMethod === "COD" ? "bg-red-950/40 border-red-500 text-white" : "bg-zinc-950 border-zinc-800 text-zinc-400"
                }`}
              >
                <div className="font-bold text-xs">Cash on Delivery</div>
                <div className="text-[10px] text-zinc-500 mt-1">Advance ৳120 delivery charge required</div>
              </button>

              {/* bKash Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod("BKASH")}
                className={`p-4 rounded-2xl border text-left transition ${
                  paymentMethod === "BKASH" ? "bg-red-950/40 border-red-500 text-white" : "bg-zinc-950 border-zinc-800 text-zinc-400"
                }`}
              >
                <div className="font-bold text-xs text-pink-400">bKash Send Money</div>
                <div className="text-[10px] text-zinc-500 mt-1">Full Payment via bKash</div>
              </button>

              {/* Nagad Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod("NAGAD")}
                className={`p-4 rounded-2xl border text-left transition ${
                  paymentMethod === "NAGAD" ? "bg-red-950/40 border-red-500 text-white" : "bg-zinc-950 border-zinc-800 text-zinc-400"
                }`}
              >
                <div className="font-bold text-xs text-orange-400">Nagad Send Money</div>
                <div className="text-[10px] text-zinc-500 mt-1">Full Payment via Nagad</div>
              </button>

            </div>

            {/* Send Money Instructions Box */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                <span className="font-bold text-white font-serif uppercase tracking-wider">
                  Payment Number ({paymentMethod})
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-red-400">{getTargetNumber()}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyNumber(getTargetNumber())}
                    className="p-1.5 bg-zinc-900 hover:bg-red-600 text-zinc-300 hover:text-white rounded-lg transition"
                    title="Copy Number"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Instructions List */}
              <div className="space-y-2 text-zinc-300 leading-relaxed">
                <p className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-950 border border-red-800 text-red-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0">1</span>
                  <span>
                    আপনার <strong>{paymentMethod}</strong> অ্যাপ থেকে সেন্ড মানি (Send Money) অপশনে যান।
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-950 border border-red-800 text-red-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0">2</span>
                  <span>
                    নাম্বার বক্সে <strong>{getTargetNumber()}</strong> ইনপুট দিন।
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-950 border border-red-800 text-red-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0">3</span>
                  <span>
                    টাকার পরিমাণ দিন: <strong className="text-red-400 font-bold">৳{requiredAmount.toLocaleString()}</strong>{" "}
                    {paymentMethod === "COD" ? "(ক্যাশ অন ডেলিভারির জন্য ১২০ টাকা অগ্রিম শিপিং চার্জ)" : "(সম্পূর্ণ ফুল পেমেন্ট)"}
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-950 border border-red-800 text-red-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0">4</span>
                  <span>
                    সেন্ড মানি করার পর প্রাপ্ত <strong>Transaction ID (TrxID)</strong> এবং আপনার <strong>প্রেরক বিকাশ/নগদ নম্বরটি</strong> নিচের ঘরে বসিয়ে দিন।
                  </span>
                </p>
              </div>

              {/* TrxID & Sender Phone Input Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-zinc-900">
                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">
                    Transaction ID (TrxID) *
                  </label>
                  <input
                    type="text"
                    required
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                    placeholder="e.g. 9J87K2L5M"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono uppercase text-white outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">
                    Sender Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    placeholder="01700000000"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-red-500"
                  />
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800/80 space-y-6 sticky top-24">
            <h3 className="text-lg font-bold text-white font-serif">Order Summary</h3>

            {/* Cart Items List */}
            <div className="space-y-3 divide-y divide-zinc-900 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={`${item.id}-${item.color}`} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white line-clamp-1">{item.name}</h4>
                      <p className="text-zinc-500">Qty: {item.quantity} • {item.color}</p>
                    </div>
                  </div>
                  <span className="font-bold text-white">৳{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Pricing Details */}
            <div className="space-y-2 pt-4 border-t border-zinc-800 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-white">৳{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-bold text-zinc-300">৳{deliveryCharge}</span>
              </div>
              <div className="flex justify-between">
                <span>Advance Required Now</span>
                <span className="font-bold text-red-400">৳{requiredAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-800 text-sm font-bold text-white">
                <span>Total Amount</span>
                <span className="text-red-400 font-extrabold text-lg">৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Button with Vibrant Red Gradient */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-red-950/60 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span>Confirm & Submit TrxID</span>
            </button>

          </div>
        </div>

      </form>

    </div>
  );
}
