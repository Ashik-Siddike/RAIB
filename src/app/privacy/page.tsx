"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-8 w-full overflow-x-hidden text-zinc-300">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-red-500 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="space-y-3 border-b border-zinc-800 pb-6">
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-950/60 px-3.5 py-1 rounded-full border border-red-900/60">
          Legal & Security Policy
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif">
          Privacy Policy
        </h1>
        <p className="text-xs text-zinc-400">
          Last Updated: August 2026 | RAIB Luxury Leather Goods
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed font-sans">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white font-serif">1. Information We Collect</h2>
          <p>
            When you visit RAIB (https://raib.site) or place an order for genuine leather handbags, we collect necessary personal details including your name, delivery address, mobile phone number, and transaction details for Cash on Delivery or mobile banking (bKash/Nagad/Rocket) verification.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white font-serif">2. Use of Social Sign-In Data</h2>
          <p>
            If you choose to log in via Google or Facebook Authentication, we only receive your public profile name and email address to create your secure customer privilege account. We do not access private messages or post on your behalf.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white font-serif">3. Data Protection & Security</h2>
          <p>
            Your data is stored with SSL 256-bit encryption and is never sold, rented, or shared with third parties, except for delivery logistics partners (Redx, Steadfast, Sundarban Courier) to fulfill your orders across Bangladesh.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white font-serif">4. Data Deletion Requests</h2>
          <p>
            You may request complete deletion of your account and order history anytime by contacting our support team at <strong className="text-white">support@raibbags.com</strong> or via WhatsApp at <strong className="text-white">+8801700000000</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
