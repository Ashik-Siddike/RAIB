"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductType, ColorVariant, useApp } from "@/lib/store";
import { useSettings } from "@/lib/settingsStore";
import { createWhatsAppOrderLink } from "@/lib/whatsappHelper";
import { ProductCard } from "@/components/ProductCard";
import { SafeImage } from "@/components/SafeImage";
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
  ThumbsUp,
  MessageCircle,
  Palette
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
      name: "Sabrina Chowdhury",
      location: "Gulshan-2, Dhaka",
      rating: 5,
      date: "১ দিন আগে",
      comment: "মাশাল্লাহ! ব্যাগটার ইতালিয়ান চামড়ার মান আর গোল্ড মেটালিক চেইনের ফিনিশিং এক কথায় অসাধারণ। শোরুমের যেকোনো ৩০-৪০ হাজার টাকার ব্র্যান্ড ব্যাগের সাথে পাল্লা দেওয়ার মতো কোয়ালিটি!",
      verified: true,
      helpful: 42,
    },
    {
      id: 2,
      name: "Tanjila Akter",
      location: "Banani, Dhaka",
      rating: 5,
      date: "২ দিন আগে",
      comment: "আমি অফিসে ব্যবহারের জন্য নিয়েছিলাম। ভেতরে অনেক স্পেস, আইপ্যাড, মেকআপ বক্স আর ওয়ালেট সহজে ধরে। চামড়ার সুবাসটাই বলে দেয় এটি ১০০% আসল লেদার। থ্যাঙ্ক ইউ RAIB!",
      verified: true,
      helpful: 38,
    },
    {
      id: 3,
      name: "Nusrat Jahan Tanvin",
      location: "Nasirabad, Chittagong",
      rating: 5,
      date: "৩ দিন আগে",
      comment: "অর্ডার দেওয়ার মাত্র ২৪ ঘণ্টার মধ্যে চট্টগ্রামেই হোম ডেলিভারি পেয়েছি। লাক্সারি ডাস্ট ব্যাগ ও গিফট বক্স প্যাকিং দেখে অনেক ভালো লেগেছে। প্রিমিয়াম ফিল!",
      verified: true,
      helpful: 29,
    },
    {
      id: 4,
      name: "Dr. Farhana Yasmin",
      location: "Dhanmondi, Dhaka",
      rating: 5,
      date: "৫ দিন আগে",
      comment: "আমার ফ্রেন্ডের রিকমেন্ডেশনে অর্ডার করেছিলাম। ব্যাকসাইডের সেলাই আর চেইনের ওয়েট দেখলেই বোঝা যায় আসল ইতালিয়ান লেদার। কালারটা ছবিতে যেমন ছিল বাস্তবে তার চেয়েও রয়াল!",
      verified: true,
      helpful: 24,
    },
    {
      id: 5,
      name: "Sharmin Sultana",
      location: "Zindabazar, Sylhet",
      rating: 5,
      date: "১ সপ্তাহ আগে",
      comment: "কুরিয়ার ম্যান আসার পর আমি আগে ব্যাগ হাতে নিয়ে ভালো করে চেক করে তারপর পেমেন্ট করেছি। কোনো দাগ বা খুঁত নেই। মেটালের ১৮K গোল্ড কালারটা লার্স্টিং!",
      verified: true,
      helpful: 19,
    },
    {
      id: 6,
      name: "Ayesha Siddiqua",
      location: "Uttara, Dhaka",
      rating: 5,
      date: "২ সপ্তাহ আগে",
      comment: "ব্যাগটা হাতে পাওয়ার পর থেকে যেখানেই যাচ্ছি সবাই জিজ্ঞেস করছে কোথা থেকে নেওয়া! অত্যন্ত ফ্যাশনেবল অ্যান্ড এলিগ্যান্ট। দাম হিসেবে ১০০০% স্যাটিসফাইড!",
      verified: true,
      helpful: 15,
    },
  ]);

  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);

  // Fetch product from MongoDB Atlas API with instant cache & non-blocking hydration
  useEffect(() => {
    // 1. Instant Cache Hydration (0ms load)
    try {
      const cachedStr = sessionStorage.getItem("raib_products_cache");
      if (cachedStr) {
        const cachedList: ProductType[] = JSON.parse(cachedStr);
        const matched = cachedList.find((p) => p.id === productId);
        if (matched) {
          setProduct(matched);
          const colorVars = matched.colorVariants || [];
          const defaultVar = colorVars.find((cv) => cv.isDefault) || colorVars[0];
          if (defaultVar) {
            setSelectedColor(defaultVar.colorName);
            setActiveImage(defaultVar.image || matched.image);
          } else {
            setSelectedColor(matched.color || "Default");
            setActiveImage(matched.image);
          }
          setIsLoading(false);

          // Non-blocking related products
          const related = cachedList.filter((p) => p.category === matched.category && p.id !== matched.id).slice(0, 3);
          if (related.length > 0) setRelatedProducts(related);
        }
      }
    } catch (e) {
      console.error(e);
    }

    // 2. Background fresh fetch from API
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products?id=${productId}`);
        const data = await res.json();
        
        if (data.success && data.product) {
          const prodData: ProductType = data.product;
          setProduct(prodData);

          const colorVars = prodData.colorVariants || [];
          const defaultVar = colorVars.find((cv) => cv.isDefault) || colorVars[0];

          if (defaultVar) {
            setSelectedColor((prev) => prev || defaultVar.colorName);
            setActiveImage((prev) => prev || defaultVar.image || prodData.image);
          } else {
            setSelectedColor((prev) => prev || prodData.color || "Default");
            setActiveImage((prev) => prev || prodData.image);
          }

          // Fetch related category products in non-blocking background
          fetch(`/api/products?category=${encodeURIComponent(prodData.category)}`)
            .then((r) => r.json())
            .then((relData) => {
              if (relData.success && Array.isArray(relData.products)) {
                setRelatedProducts(relData.products.filter((p: ProductType) => p.id !== prodData.id).slice(0, 3));
              }
            })
            .catch(() => {});
        } else if (!product) {
          setProduct(null);
        }
      } catch (err) {
        console.error("Failed to load product by ID:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [productId]);

  if (isLoading && !product) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-pulse">
          <div className="h-12 bg-zinc-900 rounded-2xl w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 aspect-square bg-zinc-900 rounded-3xl" />
            <div className="lg:col-span-5 space-y-6">
              <div className="h-6 bg-zinc-900 rounded-full w-1/3" />
              <div className="h-10 bg-zinc-900 rounded-xl w-3/4" />
              <div className="h-16 bg-zinc-900 rounded-2xl w-full" />
              <div className="h-28 bg-zinc-900 rounded-2xl w-full" />
              <div className="h-14 bg-zinc-900 rounded-2xl w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white w-full flex flex-col items-center justify-center space-y-4 text-center px-4 py-20">
        <h2 className="text-2xl font-bold text-white font-serif">প্রোডাক্ট খুঁজে পাওয়া যায়নি</h2>
        <p className="text-zinc-400 text-xs">অনুগ্রহ করে আমাদের শপ পেজ থেকে কালেকশন ঘুরে দেখুন।</p>
        <Link href="/shop" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition">
          সকল প্রোডাক্ট দেখুন
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const colorVariants: ColorVariant[] = product.colorVariants && product.colorVariants.length > 0
    ? product.colorVariants
    : [
        { colorName: product.color || "Default", colorHex: "#DC2626", image: product.image, isDefault: true },
        { colorName: "Classic Black", colorHex: "#000000", image: product.secondaryImage || product.image, isDefault: false },
      ];

  // Multiple images gallery support
  const galleryImages = [
    ...colorVariants.map((cv) => cv.image),
    ...(product.images && product.images.length > 0 ? product.images : []),
    product.image,
    product.secondaryImage,
  ].filter((img, index, self) => Boolean(img) && self.indexOf(img) === index) as string[];

  // Select Color Variant Trigger
  const handleSelectColorVariant = (variant: ColorVariant) => {
    setSelectedColor(variant.colorName);
    const targetImage = variant.image || product.image;
    if (targetImage) {
      setActiveImage(targetImage);
    }
  };

  // Select Image Thumbnail Trigger
  const handleSelectImageThumbnail = (img: string) => {
    setActiveImage(img);
    // If thumbnail matches a color variant, update selected color accordingly
    const matchingVar = colorVariants.find((cv) => cv.image === img);
    if (matchingVar) {
      setSelectedColor(matchingVar.colorName);
    }
  };

  // Direct WhatsApp Order Trigger with Product Image & Details
  const handleWhatsAppOrder = () => {
    const waUrl = createWhatsAppOrderLink({
      whatsappNumber: settings?.whatsappNumber || "+8801700000000",
      productName: product.name,
      productId: product.id,
      colorName: selectedColor,
      price: product.price,
      imageUrl: activeImage,
      productUrl: typeof window !== "undefined" ? window.location.href : `https://raib.site/product/${product.id}`,
    });

    window.open(waUrl, "_blank");
  };

  // Direct Messenger Order Trigger
  const handleMessengerOrder = () => {
    const pageId = settings?.messengerPageId || "raib.official";
    const absoluteImgUrl = activeImage.startsWith("http")
      ? activeImage
      : `https://raib.site${activeImage.startsWith("/") ? "" : "/"}${activeImage}`;

    const messageText = `Hi RAIB Team! I want to order this bag:

👜 Product: ${product.name}
🆔 Serial/ID: ${product.id}
🎨 Color: ${selectedColor}
💰 Price: ৳${product.price.toLocaleString()}
🖼️ Selected Color Bag Image: ${absoluteImgUrl}`;

    window.open(`https://m.me/${pageId}?text=${encodeURIComponent(messageText)}`, "_blank");
  };

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
        showToast("Order Submitted! Redirecting to WhatsApp...");

        const waUrl = createWhatsAppOrderLink({
          whatsappNumber: settings?.whatsappNumber || "+8801700000000",
          productName: product.name,
          productId: product.id,
          colorName: selectedColor,
          price: product.price,
          imageUrl: activeImage,
          productUrl: typeof window !== "undefined" ? window.location.href : `https://raib.site/product/${product.id}`,
          customerName: expressName,
          customerAddress: `${expressAddress}, ${expressDistrict}`,
        });

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          window.location.href = waUrl;
        } else {
          window.open(waUrl, "_blank");
        }
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
    <div className="min-h-screen bg-zinc-950 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-24 lg:pb-12 space-y-16 w-full overflow-x-hidden">
        
        {/* 1. Urgency & Stock Scarcity Counter Header */}
      <div className="bg-zinc-900 border border-red-900/60 p-3.5 sm:p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-red-500 font-bold">
          <Flame className="w-4 h-4 text-red-500 animate-bounce" />
          <span>{settings.stockUrgencyText || "🔥 স্টক সীমিত! ঢাকায় মাত্র ৪টি ব্যাগ বাকি আছে।"}</span>
        </div>

        <div className="flex items-center gap-2 text-zinc-300 font-mono font-bold bg-zinc-950 px-3 py-1 rounded-xl border border-zinc-800">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>অফার শেষ হতে বাকি: <strong>০৪:১৮:৩৫</strong></span>
        </div>
      </div>

      {/* 2. Main Product Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Interactive Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square w-full rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group"
          >
            <SafeImage
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

          {/* Interactive Multiple Image Gallery Thumbnails Selector */}
          {galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectImageThumbnail(img)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-zinc-900 border-2 transition flex-shrink-0 cursor-pointer ${
                    activeImage === img ? "border-red-600 shadow-md scale-105" : "border-zinc-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <SafeImage src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Pricing, Color Variants, WhatsApp Ordering & Controls */}
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

          {/* Multi-Color Variants Selector with Auto-Image Matching */}
          <div className="space-y-3 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5 font-serif">
                <Palette className="w-4 h-4 text-red-500" />
                <span>Select Color Variant:</span>
              </label>
              <span className="text-xs font-bold text-red-400 font-serif bg-red-950/60 px-2.5 py-0.5 rounded-full border border-red-900/60">
                {selectedColor}
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-1">
              {colorVariants.map((cv, idx) => {
                const isSelected = selectedColor === cv.colorName;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectColorVariant(cv)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      isSelected
                        ? "bg-red-600 border-red-500 text-white shadow-lg scale-105"
                        : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm flex-shrink-0"
                      style={{ backgroundColor: cv.colorHex || "#DC2626" }}
                    />
                    <span>{cv.colorName}</span>
                    {cv.isDefault && (
                      <span className="text-[9px] bg-white/20 px-1.5 py-0.2 rounded font-sans">
                        Default
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Regular Add to Cart & Express Cash-on-Delivery Order Button */}
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

          {/* Direct WhatsApp Order & Messenger Order Action Buttons */}
          <div className="space-y-2.5 pt-2 border-t border-zinc-900">
            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Order via WhatsApp (ছবি ও কালারসহ হোয়াটসঅ্যাপে অর্ডার করুন)</span>
            </button>

            <button
              onClick={handleMessengerOrder}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md transition flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Order via Messenger (মেসেঞ্জারে সরাসরি অর্ডার করুন)</span>
            </button>
          </div>

        </div>

      </div>

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
    </div>
  );
}
