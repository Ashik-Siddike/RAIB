"use client";

import React from "react";
import Image from "next/image";
import { useApp } from "@/lib/store";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Sparkles, Gem } from "lucide-react";

export function Craftsmanship() {
  const { t } = useApp();

  return (
    <section className="py-20 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-t border-b border-zinc-900 relative overflow-hidden">
      {/* Background Red Radial Ambient */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-900/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-950/60 px-4 py-1.5 rounded-full border border-red-900/60">
            Artisan Heritage
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif">
            {t("craftTitle")}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {t("craftDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 hover:border-red-600/50 transition-all duration-300 space-y-4 text-center group"
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-950/50 border border-red-900/50 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
              <Gem className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white font-serif">{t("feature1Title")}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">{t("feature1Desc")}</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 hover:border-red-600/50 transition-all duration-300 space-y-4 text-center group"
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-950/50 border border-red-900/50 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white font-serif">{t("feature2Title")}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">{t("feature2Desc")}</p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 hover:border-red-600/50 transition-all duration-300 space-y-4 text-center group"
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-950/50 border border-red-900/50 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white font-serif">{t("feature3Title")}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">{t("feature3Desc")}</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
