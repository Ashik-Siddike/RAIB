"use client";

import React, { useState } from "react";
import { useSettings } from "@/lib/settingsStore";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ExternalLink } from "lucide-react";

export function LiveChatWidget() {
  const { settings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  const rawWhatsapp = settings?.whatsappNumber || "+8801700000000";
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, "");

  const handleWhatsApp = () => {
    const defaultText = encodeURIComponent("Hi RAIB Team! I am interested in your ladies bag collection.");
    const url = `https://wa.me/${cleanWhatsapp}?text=${defaultText}`;
    window.open(url, "_blank");
  };

  const handleMessenger = () => {
    const rawMessenger = settings?.messengerPageId || "raib.official";
    const url = `https://m.me/${rawMessenger}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50">
      
      {/* Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-72 bg-zinc-950 border border-zinc-800 rounded-3xl p-5 shadow-2xl space-y-4 font-sans text-left"
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                <h4 className="text-xs font-bold text-white font-serif">RAIB Live Support</h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-zinc-400 hover:text-white rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Hello! How can we assist you with your luxury bag selection today?
            </p>

            <div className="space-y-2.5 pt-1">
              
              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsApp}
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-2xl transition flex items-center justify-between shadow-lg shadow-green-950/40 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Chat on WhatsApp</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              {/* Messenger Button */}
              <button
                onClick={handleMessenger}
                className="w-full py-3 px-4 bg-[#0084FF] hover:bg-[#0074e0] text-white text-xs font-bold rounded-2xl transition flex items-center justify-between shadow-lg shadow-blue-950/40 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.96 3.127 3.26 5.89-3.26-6.558 6.96z"/>
                  </svg>
                  <span>Messenger Chat</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Solid Red Trigger Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-2xl shadow-red-950/80 border border-red-500/50 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer group"
        title="Live Chat Support"
      >
        <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform text-white" />
      </button>

    </div>
  );
}
