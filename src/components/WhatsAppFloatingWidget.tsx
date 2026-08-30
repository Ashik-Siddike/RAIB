"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSettings } from "@/lib/settingsStore";
import { MessageCircle, Send, X, CheckCheck, Sparkles, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function WhatsAppFloatingWidget() {
  const { settings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");

  const rawPhone = settings?.whatsappNumber || "+8801700000000";
  let cleanPhone = rawPhone.replace(/\D/g, "");
  if (cleanPhone.startsWith("01")) cleanPhone = "88" + cleanPhone;

  const quickPrompts = [
    "হ্যালো! আমি এই ব্যাগটির অর্ডার কনফার্ম করতে চাই 👜",
    "ব্যাগটির স্টক ও ডেলিভারি সময় কত দিন লাগবে? 🚚",
    "ব্যাগটিতে অন্যান্য কালার ভ্যারিয়েন্ট দেখাবেন কি? 🎨",
  ];

  const handleSendToWhatsApp = (textToSend?: string) => {
    const finalMsg = textToSend || userMessage.trim();
    if (!finalMsg) return;

    const waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(finalMsg)}`;
    window.open(waUrl, "_blank");
    setUserMessage("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Interactive Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="mb-4 w-80 sm:w-96 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-emerald-950 via-zinc-900 to-zinc-950 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-900 border border-emerald-500/50 flex-shrink-0">
                  <Image src="/main-logo.png" alt="RAIB Support" fill className="object-cover p-1" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-zinc-950 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white font-serif flex items-center gap-1">
                    RAIB Luxury Leather Support
                    <Sparkles className="w-3 h-3 text-amber-400" />
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-medium">
                    🟢 Typically replies in 1 minute
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 space-y-4 max-h-72 overflow-y-auto text-xs bg-zinc-900/40">
              {/* Agent Welcome Bubble */}
              <div className="flex gap-2 items-end">
                <div className="p-3.5 rounded-2xl rounded-bl-none bg-zinc-900 border border-zinc-800 text-zinc-200 max-w-[85%] space-y-1 shadow-md">
                  <p className="leading-relaxed">
                    হ্যালো! 👋 <strong>RAIB Luxury Leather</strong> এ স্বাগতম। আপনার পছন্দের ব্যাগ অর্ডার বা যেকোনো তথ্যের জন্য সরাসরি আমাদের লিখুন।
                  </p>
                  <span className="text-[9px] text-zinc-500 flex items-center gap-1 justify-end">
                    Just now <CheckCheck className="w-3 h-3 text-emerald-400" />
                  </span>
                </div>
              </div>

              {/* Quick Action Chips */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Quick Options (ক্লিক করুন):
                </span>
                <div className="flex flex-col gap-1.5">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendToWhatsApp(prompt)}
                      className="p-2.5 bg-zinc-950 hover:bg-emerald-950/60 border border-zinc-800 hover:border-emerald-800 text-zinc-300 hover:text-white rounded-xl text-left text-[11px] transition flex items-center justify-between group cursor-pointer"
                    >
                      <span>{prompt}</span>
                      <Send className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendToWhatsApp();
              }}
              className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="মেসেজ লিখুন..."
                className="flex-1 px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
              />

              <button
                type="submit"
                disabled={!userMessage.trim()}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl transition cursor-pointer flex-shrink-0"
                title="Send via WhatsApp"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative p-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-950/80 transition-all transform hover:scale-110 flex items-center justify-center cursor-pointer border-2 border-emerald-400/40"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        
        {/* Pulse Indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
        </span>

        {/* Hover Tooltip Badge */}
        <span className="absolute right-16 bg-zinc-950 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-zinc-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          💬 WhatsApp Live Chat
        </span>
      </button>

    </div>
  );
}
