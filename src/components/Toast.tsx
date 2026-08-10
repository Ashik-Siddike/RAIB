"use client";

import React from "react";
import { useApp } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function Toast() {
  const { toastMessage } = useApp();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 bg-zinc-900/95 border border-red-600/60 rounded-full text-white text-xs font-bold shadow-2xl shadow-red-950/80 backdrop-blur-xl flex items-center gap-2.5"
        >
          <CheckCircle2 className="w-4 h-4 text-red-500" />
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
