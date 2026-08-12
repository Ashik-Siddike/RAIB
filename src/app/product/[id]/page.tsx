"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductType, useApp } from "@/lib/store";
import { useSettings } from "@/lib/settingsStore";
import { SAMPLE_PRODUCTS } from "@/lib/productsData";
import { ProductCard } from "@/components/ProductCard";
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ArrowRight,
  Share2,
  Flame,
  Clock,
  ChevronDown,
  MessageSquare,
  Award,
  CheckCircle2,
  ThumbsUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const { lang, t, addToCart, wishlist, toggleWishlist, showToast } = useApp();
  const { settings } = useSettings();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Express 1-Click Order Form State
  const [expressName, setExpressName] = useState("");
  const [expressPhone, setExpressPhone] = useState("");
  const [expressAddress, setExpressAddress] = useState("");
  const [expressDistrict, setExpressDistrict] = useState("Dhaka");
  const [isSubmittingExpress, setIsSubmittingExpress] = useState(false);
  const [expressSuccess, setExpressSuccess] = useState<any | null>(null);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Reviews State
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      name: "Sadia Jahan",
      location: "Gulshan, Dhaka",
      rating: 5,
      date: "2 days ago",
      comment: "ব্যাগটার ফিনিশিং ও ইতালিয়ান চামড়ার ফিনিশিং চমৎকার! গোল্ড মেটালের চেইন ও হার্ডওয়্যার খুব কোয়ালিটিফুল। দাম হিসেবে ১০০০% স্যাটিসফাইড!",
      verified: true,
      helpful: 24,
    },
    {
      id: 2,
      name: "Nusrat Rahman",
      location: "Chittagong",
      rating: 5,
      date: "5 days ago",
      comment: "অর্ডার দেওয়ার ৪৮ ঘণ্টার মধ্যে চট্টগ্রামে ডেলিভারি পেয়েছি। ডাস্ট ব্যাগ ও প্যাকিংটা অনেক লাক্সারি ছিল।",
      verified: true,
      helpful: 18,
    },
    {
      id: 3,
      name: "Farhana Akter",
      location: "Sylhet",
      rating: 5,
      date: "1 week ago",
      comment: "১০০% রিয়েল চামড়ার ব্যাগ! আমার সব মেকআপ আর আইপ্যাড সহজে আটে। থ্যাঙ্ক ইউ RAIB টীম!",
      verified: true,
      helpful: 12,
    },
  ]);

  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Fetch product from MongoDB Atlas API
  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products?id=${productId}`);
        const data = await res.json();
        if (data.success && data.product) {
          setProduct(data.product);
          setActiveImage(data.product.image);
          setSelectedColor(data.product.color || "Default");
        } else {
          const fallback = SAMPLE_PRODUCTS.find((p) => p.id === productId) || SAMPLE_PRODUCTS[0];
          setProduct(fallback);
          setActiveImage(fallback.image);
          setSelectedColor(fallback.color);
        }
      } catch (err) {
        console.error("Failed to load product by ID:", err);
        const fallback = SAMPLE_PRODUCTS.find((p) => p.id === productId) || SAMPLE_PRODUCTS[0];
        setProduct(fallback);
        setActiveImage(fallback.image);
        setSelectedColor(fallback.color);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [productId]);

  if (isLoading || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-zinc-400">
        Loading luxury product details...
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const galleryImages = [
    product.image,
    product.secondaryImage || product.image,
    "/tote_bag_red_1786395433017.jpg",
    "/crossbody_black_1786395824801.jpg",
  ].filter(Boolean);

  const relatedProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  // Direct Express Order Submit
  const handleExpressOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expressName || !expressPhone || !expressAddress) {
      showToast("Please enter your name, phone, and address.");
      return;
    }

    setIsSubmittingExpress(true);
    const total = product.price * quantity + (settings.deliveryCharge || 120);

    const orderPayload = {
      customerName: expressName,
      customerPhone: expressPhone,
      address: expressAddress,
      district: expressDistrict,
      thana: "City Center",
      paymentMethod: "COD",
      advancePaid: 120,
      totalAmount: total,
      transactionId: `EXPRESS-COD-${Date.now()}`,
      senderPhone: expressPhone,
      items: [{ name: product.name, color: selectedColor, quantity, price: product.price }],
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (data.success) {
        setExpressSuccess(data.order);
        showToast("Express Order Submitted Successfully!");
      }
    } catch (err) {
      showToast("Order placement failed.");
    } finally {
      setIsSubmittingExpress(false);
    }
  };

  // Add Review Submit
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewComment) return;

    const newEntry = {
      id: Date.now(),
      name: newReviewName,
      location: "Verified Buyer, BD",
      rating: newReviewRating,
      date: "Just now",
      comment: newReviewComment,
      verified: true,
      helpful: 1,
    };

    setReviewsList([newEntry, ...reviewsList]);
    setNewReviewName("");
    setNewReviewComment("");
    setShowReviewForm(false);
    showToast("Thank you for your review!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(lang === "en" ? "Product URL copied to clipboard!" : "প্রোডাক্টের লিংক কপি করা হয়েছে!");
    }
  };

  const productFaqs = [
    {
      q: "এই ব্যাগটি কি আসল খাঁটি লেদারের তৈরি?",
      a: "জি, RAIB-এর প্রতিটি ব্যাগ ১০০% Tuscan ইতালিয়ান চামড়া থেকে অত্যন্ত যত্নসহকারে হ্যান্ডক্রাফটেড। এর সাথে ১৮K গোল্ড-প্লেটেড হার্ডওয়্যার চেইন ব্যবহৃত হয় যা সহজে রঙ নষ্ট হয় না।",
    },
    {
      q: "ডেলিভারি সময় এবং ক্যাশ অন ডেলিভারি সুবিধা আছে কি?",
      a: "ঢাকার ভেতরে ২৪-৪৮ ঘণ্টায় এবং ঢাকার বাইরে ২-৪ কর্মদিবসে ক্যাশ অন ডেলিভারিতে হোম ডেলিভারি দেওয়া হয়। শুধুমাত্র কুরিয়ার চার্জ ১২০ টাকা অগ্রিম পরিশোধ করতে হয়।",
    },
    {
      q: "পণ্য হাতে পাওয়ার পর পছন্দ না হলে বা সমস্যা থাকলে কি বদল করা যাবে?",
      a: "হ্যাঁ, ডেলিভারি পাওয়ার ৭ দিনের মধ্যে যেকোনো ত্রুটি বা কালার পরিবর্তনের জন্য আমাদের ৭-দিনের ইজি এক্সচেঞ্জ গ্যারান্টি রয়েছে।",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 w-full overflow-x-hidden">
      
      {/* 1. Urgency & Stock Scarcity Counter Header */}
      <div className="bg-zinc-900 border border-red-900/60 p-3.5 sm:p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-red-500 font-bold">
          <Flame className="w-4 h-4 text-red-500 animate-bounce" />
          <span>🔥 স্টক সীমিত! ঢাকায় মাত্র ৪টি ব্যাগ বাকি আছে।</span>
        </div>

        <div className="flex items-center gap-2 text-zinc-300 font-mono font-bold bg-zinc-950 px-3 py-1 rounded-xl border border-zinc-800">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>অফার শেষ হতে বাকি: <strong>০৪:১৮:৩৫</strong></span>
        </div>
      </div>

      {/* 2. Main Product Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square w-full rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group"
          >
            <Image
              src={activeImage}
              alt={product.name}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md border border-white/10 transition z-10 cursor-pointer ${
                isWishlisted ? "bg-red-600 text-white shadow-lg" : "bg-zinc-950/60 text-zinc-300 hover:bg-red-600 hover:text-white"
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
            </button>

            <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-lg border border-red-500">
              100% Genuine Italian Leather
            </span>
          </motion.div>

          {/* Thumbnails Selector */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-zinc-900 border-2 transition flex-shrink-0 cursor-pointer ${
                  activeImage === img ? "border-red-600 shadow-md scale-105" : "border-zinc-800 opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Pricing & Purchasing Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-950/50 px-3.5 py-1 rounded-full border border-red-900/50">
              {product.category}
            </span>

            <button
              onClick={handleShare}
              className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full transition border border-zinc-800 cursor-pointer"
              title="Share Product"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-serif leading-tight">
              {lang === "bn" && product.nameBn ? product.nameBn : product.name}
            </h1>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>4.9</span>
              </div>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400 font-medium">128 Verified Client Reviews</span>
              <span className="text-zinc-500">•</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>In Stock (Dhaka Warehouse)</span>
              </span>
            </div>
          </div>

          {/* Price Tag Box */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-zinc-500 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="ml-auto text-xs font-bold text-red-400 bg-red-950/60 px-2.5 py-1 rounded-full border border-red-900/60">
              Save 20% Today
            </span>
          </div>

          {/* Product Description */}
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
            {lang === "bn" && product.descriptionBn ? product.descriptionBn : product.description}
          </p>

          {/* Color Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Color Option: <span className="text-red-400 font-serif">{selectedColor}</span>
            </label>
            <div className="flex gap-2">
              {[product.color, "Classic Black", "Crimson Red", "Sahara Tan"].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    selectedColor === c ? "bg-red-600 border-red-500 text-white shadow-md" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Call to Action Solid Color Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => addToCart(product, selectedColor, quantity)}
              className="flex-1 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-red-500" />
              <span>Add to Cart</span>
            </button>

            <a
              href="#express-order-form"
              className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-2xl shadow-xl transition flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>১-ক্লিকে এখনই অর্ডার করুন</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

      </div>

      {/* 3. "Why This Bag is Superior" Feature Highlights Grid (কেন এই ব্যাগটি সেরা?) */}
      <section className="space-y-8 pt-8 border-t border-zinc-900">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
            Craftsmanship Excellence
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-serif">
            কেন RAIB চামড়ার ব্যাগটি আপনার জন্য সেরা পছন্দ?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-3 shadow-xl">
            <div className="p-3 bg-red-950/60 text-red-500 rounded-2xl border border-red-900/60 w-fit">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-serif">১০০% আসল ইতালিয়ান চামড়া</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Tuscan Full-Grain চামড়া দিয়ে হাতে সেলাই করা যা বছরের পর বছর নতুন ব্র্যান্ডের মতো চকচকে থাকবে।
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-3 shadow-xl">
            <div className="p-3 bg-red-950/60 text-red-500 rounded-2xl border border-red-900/60 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-serif">১৮K গোল্ড প্লেটেড চেইন</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              মরচে পড়া বা কালচে দাগমুক্ত ১৮K প্রিমিয়াম গোল্ড মেটালিক চেইন ও ভারী হার্ডওয়্যার সংযুক্ত।
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-3 shadow-xl">
            <div className="p-3 bg-red-950/60 text-red-500 rounded-2xl border border-red-900/60 w-fit">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-serif">পানি ও দাগ নিরোধক প্রলেপ</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              বিশেষ ওয়াটার-রেজিস্ট্যান্ট কোটিং যা বৃষ্টি বা দুর্ঘটনাবশত তরল পড়লেও চামড়ার ক্ষতি হতে দেয় না।
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-3 shadow-xl">
            <div className="p-3 bg-red-950/60 text-red-500 rounded-2xl border border-red-900/60 w-fit">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-serif">৭ দিনের ফ্রি এক্সচেঞ্জ</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              পণ্য হাতে পাওয়ার পর ৭ দিনের মধ্যে যেকোনো রঙের পরিবর্তন বা রিপ্লেসমেন্ট গ্যারান্টি।
            </p>
          </div>
        </div>
      </section>

      {/* 4. "What Fits Inside My Bag?" Capacity Breakdown Visualizer */}
      <section className="p-8 sm:p-12 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-8">
        <div className="max-w-xl mx-auto text-center space-y-2">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
            Capacity Guide
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif">
            এই ব্যাগে আপনার যা যা সহজে আঁটবে (What Fits Inside)
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <span className="text-2xl">📱</span>
            <h4 className="text-xs font-bold text-white">iPhone / Android</h4>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <span className="text-2xl">📱</span>
            <h4 className="text-xs font-bold text-white">iPad / Tablet</h4>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <span className="text-2xl">💄</span>
            <h4 className="text-xs font-bold text-white">Makeup Pouch</h4>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <span className="text-2xl">👛</span>
            <h4 className="text-xs font-bold text-white">Long Leather Wallet</h4>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <span className="text-2xl">🕶️</span>
            <h4 className="text-xs font-bold text-white">Sunglasses Case</h4>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <span className="text-2xl">🔑</span>
            <h4 className="text-xs font-bold text-white">Car & House Keys</h4>
          </div>
        </div>
      </section>

      {/* 5. 1-Click Express Cash on Delivery Order Form */}
      <section id="express-order-form" className="max-w-2xl mx-auto p-6 sm:p-10 rounded-3xl bg-zinc-900 border-2 border-red-800 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-red-400 uppercase tracking-widest bg-red-950 px-3.5 py-1 rounded-full border border-red-800">
            Express Cash on Delivery Order
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            এখনই ১-ক্লিকে ব্যাগটির অর্ডার সম্পন্ন করুন
          </h2>
          <p className="text-xs text-zinc-400">
            নিচের ফর্মে আপনার নাম ও ঠিকানা দিন। আমরা কুরিয়ারের মাধ্যমে ক্যাশ অন ডেলিভারিতে পৌঁছে দেব।
          </p>
        </div>

        {expressSuccess ? (
          <div className="p-6 rounded-2xl bg-green-950/60 border border-green-800 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে!</h3>
            <p className="text-xs text-zinc-300">
              অর্ডার নাম্বার: <strong className="text-amber-400 font-mono">{expressSuccess.orderNumber}</strong>
            </p>
            <p className="text-xs text-zinc-400">আমাদের প্রতিনিধি শীঘ্রই আপনার নাম্বারে কল দিয়ে ডেলিভারি কনফার্ম করবেন।</p>
          </div>
        ) : (
          <form onSubmit={handleExpressOrder} className="space-y-4 text-xs">
            <div>
              <label className="text-zinc-300 font-bold block mb-1">আপনার পূর্ণ নাম *</label>
              <input
                type="text"
                required
                value={expressName}
                onChange={(e) => setExpressName(e.target.value)}
                placeholder="যেমন: ফারহানা আক্তার"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 text-sm"
              />
            </div>

            <div>
              <label className="text-zinc-300 font-bold block mb-1">মোবাইল নাম্বার *</label>
              <input
                type="tel"
                required
                value={expressPhone}
                onChange={(e) => setExpressPhone(e.target.value)}
                placeholder="01700000000"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 font-mono text-sm"
              />
            </div>

            <div>
              <label className="text-zinc-300 font-bold block mb-1">সম্পূর্ণ ডেলিভারি ঠিকানা *</label>
              <textarea
                required
                rows={2}
                value={expressAddress}
                onChange={(e) => setExpressAddress(e.target.value)}
                placeholder="বাসা নম্বর, রোড নম্বর, এলাকা, থানা..."
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-300 font-bold block mb-1">জেলা (District)</label>
                <select
                  value={expressDistrict}
                  onChange={(e) => setExpressDistrict(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 cursor-pointer"
                >
                  <option value="Dhaka">Dhaka (ঢাকার ভেতরে)</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Outside Dhaka">Outside Dhaka (ঢাকার বাইরে)</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-300 font-bold block mb-1">পেমেন্ট মেথড</label>
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-red-400 font-bold text-center">
                  Cash on Delivery (COD)
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmittingExpress}
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase tracking-widest rounded-2xl shadow-xl transition cursor-pointer"
              >
                {isSubmittingExpress ? "অর্ডার প্রসেসিং হচ্ছে..." : `অর্ডার কনফার্ম করুন (মোট ৳${(product.price * quantity + 120).toLocaleString()})`}
              </button>
            </div>
          </form>
        )}
      </section>

      {/* 6. Product Comparison Table */}
      <section className="space-y-6 pt-8 border-t border-zinc-900">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
            Quality Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
            RAIB আসল ইতালিয়ান চামড়া vs সাধারণ নকল লেদার
          </h2>
        </div>

        <div className="max-w-3xl mx-auto overflow-x-auto rounded-3xl border border-zinc-800 bg-zinc-900/60">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-white font-serif border-b border-zinc-800">
              <tr>
                <th className="p-4">বৈশিষ্ট্য (Features)</th>
                <th className="p-4 text-red-400 font-bold">RAIB Genuine Leather 🇮🇹</th>
                <th className="p-4 text-zinc-500">সাধারণ নকল কৃত্তিম ব্যাগ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              <tr>
                <td className="p-4 font-bold text-white">উপাদান (Material)</td>
                <td className="p-4 text-emerald-400 font-bold">১০০% ইতালিয়ান ফুল-গ্রেইন লেদার</td>
                <td className="p-4 text-zinc-500">নকল প্লাস্টিক PU কৃত্তিম লেদার</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">স্থায়িত্ব (Durability)</td>
                <td className="p-4 text-emerald-400 font-bold">১০+ বছর নতুন চামড়ার সুবাসসহ টেকে</td>
                <td className="p-4 text-zinc-500">৩ মাসের মধ্যে চামড়া উঠে যায়</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">হার্ডওয়্যার ও চেইন</td>
                <td className="p-4 text-emerald-400 font-bold">১৮K গোল্ড প্লেটেড ভারী মেটালিক চেইন</td>
                <td className="p-4 text-zinc-500">হালকা অ্যালুমিনিয়াম (মরিচা ধরে)</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">গ্যারান্টি</td>
                <td className="p-4 text-emerald-400 font-bold">৭ দিনের ইজি এক্সচেঞ্জ গ্যারান্টি</td>
                <td className="p-4 text-zinc-500">কোনো গ্যারান্টি নেই</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Verified Customer Reviews Section */}
      <section className="space-y-8 pt-8 border-t border-zinc-900">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
              Verified Client Feedback
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-serif mt-1">
              সম্মানিত ক্রেতাদের রিভিউ ({reviewsList.length})
            </h2>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-red-500 text-white font-bold text-xs uppercase rounded-xl flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-red-500" />
            <span>আপনার রিভিউ লিখুন</span>
          </button>
        </div>

        {/* Add Review Form */}
        <AnimatePresence>
          {showReviewForm && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={handleAddReview}
              className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4 max-w-xl mx-auto text-xs"
            >
              <h3 className="text-base font-bold text-white font-serif">আপনার মতামত শেয়ার করুন</h3>

              <div>
                <label className="text-zinc-400 block mb-1">আপনার নাম</label>
                <input
                  type="text"
                  required
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  placeholder="e.g. Tanzila Ahmed"
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">রেটিং</label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 cursor-pointer"
                >
                  <option value="5">⭐⭐⭐⭐⭐ (5/5 Excellent)</option>
                  <option value="4">⭐⭐⭐⭐ (4/5 Good)</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">মন্তব্য (Review)</label>
                <textarea
                  required
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="ব্যাগের ফিনিশিং ও কোয়ালিটি কেমন লেগেছে লিখুন..."
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase rounded-xl cursor-pointer"
              >
                পাবলিশ করুন
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] text-zinc-500">{rev.date}</span>
              </div>

              <p className="text-xs text-zinc-300 italic font-serif leading-relaxed">
                "{rev.comment}"
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-xs">
                <div>
                  <h4 className="font-bold text-white flex items-center gap-1">
                    {rev.name}
                    {rev.verified && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </h4>
                  <span className="text-[10px] text-zinc-500">{rev.location}</span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded-full border border-zinc-800">
                  <ThumbsUp className="w-3 h-3 text-red-500" />
                  <span>{rev.helpful}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Product FAQ Accordion */}
      <section className="space-y-6 pt-8 border-t border-zinc-900 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
            Common Questions
          </span>
          <h2 className="text-2xl font-bold text-white font-serif">
            পণ্য সম্পর্কিত সাধারণ প্রশ্নাবলি (Product FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {productFaqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-xs text-white font-serif flex justify-between items-center cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${openFaq === idx ? "rotate-180 text-red-500" : ""}`} />
              </button>

              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/60 mt-1">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-zinc-900 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-3xl font-extrabold text-white font-serif">
              আরো কিছু সেরা লাক্সারি ব্যাগ ক্যাটালগ
            </h3>
            <Link href="/shop" className="text-xs font-bold text-red-400 hover:underline">
              সব ব্যাগ দেখুন
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
