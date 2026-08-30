"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { ChevronDown, HelpCircle, ShieldCheck, Truck, RotateCcw, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqPage() {
  const { lang, t } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "হাউ ডাজ ক্যাশ অন ডেলিভারি (COD) ওয়ার্ক? (Cash on Delivery)",
      qEn: "How does Cash on Delivery (COD) work?",
      a: "ঢাকার ভেতরে ও বাহিরে ক্যাশ অন ডেলিভারি প্রযোজ্য। শুধুমাত্র কুরিয়ার পার্সেল ভেরিফিকেশনের জন্য ১২০ টাকা ক্যাশ অন ডেলিভারি চার্জ বিকাশ/নগদে সেন্ড মানি করতে হয়। বাকি সম্পূর্ণ টাকা ব্যাগ হাতে পেয়ে কুরিয়ারম্যানের কাছে পরিশোধ করতে পারবেন।",
      icon: CreditCard,
    },
    {
      q: "কত দিনের মধ্যে ডেলিভারি পাবো? (Delivery Timeframe)",
      qEn: "What is the delivery timeframe across Bangladesh?",
      a: "ঢাকার ভেতরে ২৪-৪৮ ঘণ্টার মধ্যে হোম ডেলিভারি পাওয়া যায়। ঢাকার বাহিরে ২-৪ কর্মদিবসের মধ্যে সুন্দরবন/রেডেক্স/স্টিডফাস্ট কুরিয়ারের মাধ্যমে ডেলিভারি করা হয়।",
      icon: Truck,
    },
    {
      q: "ব্যাগগুলো কি ১০০% খাঁটি চাইনিজ লেদার? (Authenticity)",
      qEn: "Are RAIB bags 100% Premium Chinese Leather?",
      a: "হ্যাঁ, RAIB-এর প্রতিটি ব্যাগ ১০০% প্রিমিয়াম ফুল-গ্রেইন চাইনিজ লেদার থেকে হাতে প্রস্তুত করা হয় এবং সাথে ১৮K গোল্ড-প্লেটেড হার্ডওয়্যার সংযুক্ত থাকে। প্রতিটি ব্যাগের সাথে কারিগরি সার্টিফিকেট ও প্রিমিয়াম ডাস্ট ব্যাগ দেওয়া হয়।",
      icon: ShieldCheck,
    },
    {
      q: "রিটার্ন ও এক্সচেঞ্জ পলিসি কি? (7 Days Return & Exchange Guarantee)",
      qEn: "What is the 7-day Return & Exchange policy?",
      a: "ব্যাগ ডেলিভারি পাওয়ার পর কোনো ম্যানুফ্যাকচারিং ত্রুটি বা অপছন্দ হলে ৭ দিনের মধ্যে সহজে রিটার্ন বা এক্সচেঞ্জ করতে পারবেন। আমাদের হোয়াটসঅ্যাপ (+8801700000000) নাম্বারে অর্ডার আইডি সহ মেসেজ দিন।",
      icon: RotateCcw,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-12 w-full overflow-x-hidden">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-950/60 px-3.5 py-1 rounded-full border border-red-900/60">
          Client Support & Assistance
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Everything you need to know about RAIB genuine leather bags, shipping across Bangladesh, and return guarantees.
        </p>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, idx) => {
          const IconComp = faq.icon;
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden transition-all shadow-xl"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-850/50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-red-950/60 text-red-500 border border-red-900/60 flex-shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-serif">
                    {lang === "bn" ? faq.q : faq.qEn}
                  </h3>
                </div>

                <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform ${isOpen ? "rotate-180 text-red-500" : ""}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 mt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Support CTA Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-zinc-950 via-red-950/40 to-zinc-950 border border-zinc-800 text-center space-y-4 max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-white font-serif">Still Have Questions?</h3>
        <p className="text-xs text-zinc-400">Our leather specialists are available on WhatsApp 24/7 to assist you.</p>
        <a
          href="https://wa.me/8801700000000"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase rounded-xl transition shadow-lg"
        >
          Chat on WhatsApp Live
        </a>
      </div>

    </div>
  );
}
