"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store";
import { X, Mail, Lock, User, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";

export function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, lang, t, showToast } = useApp();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone || !password) {
      showToast(lang === "en" ? "Please fill in all credentials" : "অনুগ্রহ করে আপনার তথ্য দিন");
      return;
    }

    showToast(
      authMode === "login"
        ? (lang === "en" ? "Logged in successfully!" : "সফলভাবে লগইন হয়েছে!")
        : (lang === "en" ? "Account created successfully!" : "নতুন অ্যাকাউন্ট তৈরি হয়েছে!")
    );

    setIsAuthOpen(false);
  };

  const handleGoogleSignIn = () => {
    try {
      signIn("google", { callbackUrl: "https://raib.site" });
      showToast(lang === "en" ? "Redirecting to Google Sign-In..." : "গুগল সাইন-ইনে রিডাইরেক্ট করা হচ্ছে...");
    } catch (e) {
      showToast(lang === "en" ? "Google Sign-In Triggered" : "গুগল সাইন-ইন ট্রিপল হয়েছে");
    }
  };

  const handleFacebookSignIn = () => {
    try {
      signIn("facebook", { callbackUrl: "https://raib.site" });
      showToast(lang === "en" ? "Redirecting to Facebook Sign-In..." : "ফেসবুক সাইন-ইনে রিডাইরেক্ট করা হচ্ছে...");
    } catch (e) {
      showToast(lang === "en" ? "Facebook Sign-In Triggered" : "ফেসবুক সাইন-ইন ট্রিপল হয়েছে");
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAuthOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <div>
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest font-sans">
                RAIB Privilege Account
              </span>
              <h2 className="text-xl font-bold text-white font-serif mt-1">
                {authMode === "login" ? t("loginBtn") : "Create Account"}
              </h2>
            </div>
            <button
              onClick={() => setIsAuthOpen(false)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Social Sign-In Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleSignIn}
              className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-red-600/50 rounded-2xl text-xs font-bold text-zinc-200 transition flex items-center justify-center gap-3 cursor-pointer shadow-md"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{t("continueWithGoogle")}</span>
            </button>

            <button
              onClick={handleFacebookSignIn}
              className="w-full py-3 px-4 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 rounded-2xl text-xs font-bold text-[#1877F2] transition flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>{t("continueWithFacebook")}</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center text-xs">
            <span className="bg-zinc-950 px-3 text-zinc-500 z-10 uppercase tracking-widest text-[10px]">
              OR WITH EMAIL / PHONE
            </span>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-900" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {authMode === "signup" && (
              <div>
                <label className="text-zinc-400 block mb-1 font-medium">{t("fullName")}</label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sadia Jahan"
                    className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-zinc-400 block mb-1 font-medium">Email or Phone Number</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="name@example.com or 01700000000"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-400 block mb-1 font-medium">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-xl transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{authMode === "login" ? t("loginBtn") : "Sign Up"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle Login / Signup */}
          <div className="text-center pt-2 border-t border-zinc-900 text-xs">
            {authMode === "login" ? (
              <p className="text-zinc-400">
                Don't have an account?{" "}
                <button
                  onClick={() => setAuthMode("signup")}
                  className="text-red-400 font-bold hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p className="text-zinc-400">
                Already have an account?{" "}
                <button
                  onClick={() => setAuthMode("login")}
                  className="text-red-400 font-bold hover:underline"
                >
                  Log in
                </button>
              </p>
            )}
          </div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
}
