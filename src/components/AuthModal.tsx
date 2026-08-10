"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useApp } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, Phone, ArrowRight, CheckCircle2 } from "lucide-react";

export function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, t, showToast } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone || !password) {
      showToast("Please fill in required fields");
      return;
    }
    showToast(isSignUp ? "Account Created Successfully! Welcome to RAIB." : "Logged In Successfully!");
    setIsAuthOpen(false);
  };

  const handleSocialLogin = (provider: string) => {
    showToast(`Signed in with ${provider}!`);
    setIsAuthOpen(false);
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAuthOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-auto z-50 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsAuthOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo & Header */}
            <div className="text-center space-y-2 mb-6">
              <div className="flex justify-center mb-2">
                <Image src="/logo.png" alt="RAIB Logo" width={48} height={48} priority />
              </div>
              <h2 className="text-2xl font-bold text-white font-serif">{t("loginTitle")}</h2>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">{t("loginSubtitle")}</p>
            </div>

            {/* Social Logins */}
            <div className="space-y-2.5 mb-6">
              <button
                onClick={() => handleSocialLogin("Google")}
                className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-3 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
                </svg>
                <span>{t("loginGoogle")}</span>
              </button>

              <button
                onClick={() => handleSocialLogin("Facebook")}
                className="w-full py-3 px-4 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 text-[#1877F2] text-xs font-semibold rounded-xl transition flex items-center justify-center gap-3 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>{t("loginFacebook")}</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex py-2 items-center mb-6">
              <div className="flex-grow border-t border-zinc-800"></div>
              <span className="flex-shrink mx-4 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                {t("socialLoginOr")}
              </span>
              <div className="flex-grow border-t border-zinc-800"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {isSignUp && (
                <div>
                  <label className="text-xs text-zinc-400 font-medium block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-red-500"
                  />
                </div>
              )}

              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1">{t("emailLabel")}</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="name@example.com or 01700000000"
                    className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1">{t("passwordLabel")}</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-950/60 transition cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                <span>{isSignUp ? t("signupBtn") : t("loginBtn")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle Switch */}
            <div className="text-center mt-6 pt-4 border-t border-zinc-900 text-xs text-zinc-400">
              <span>{isSignUp ? t("hasAccount") : t("noAccount")}</span>{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-red-400 font-bold hover:underline cursor-pointer ml-1"
              >
                {isSignUp ? t("loginBtn") : t("signupBtn")}
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
