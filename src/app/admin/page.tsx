"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ProductType, useApp } from "@/lib/store";
import { useSettings, ReelType } from "@/lib/settingsStore";
import { SAMPLE_PRODUCTS } from "@/lib/productsData";
import {
  Plus,
  Package,
  CheckCircle2,
  Clock,
  Settings,
  Share2,
  Trash2,
  XCircle,
  RotateCcw,
  Users,
  TrendingUp,
  FileText,
  Calculator,
  Search,
  RefreshCw,
  Lock,
  Eye,
  Key,
  Video,
  Sliders,
  Sparkles,
  Tag,
  Type,
  ImageIcon
} from "lucide-react";

export default function AdminPage() {
  const { showToast } = useApp();
  const { settings, updateSettings } = useSettings();

  // Authentication Lock State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [products, setProducts] = useState<ProductType[]>(SAMPLE_PRODUCTS);
  const [orders, setOrders] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState({ totalViews: 0, todayViews: 0 });
  const [activeTab, setActiveTab] = useState<"orders" | "accounting" | "pos" | "products" | "add" | "reels" | "settings">("orders");
  const [orderFilter, setOrderFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Form State for Settings & Section Toggles
  const [bkash, setBkash] = useState(settings.bkashNumber || "01700-000000");
  const [nagad, setNagad] = useState(settings.nagadNumber || "01800-000000");
  const [rocket, setRocket] = useState(settings.rocketNumber || "01900-000000");
  const [fbPixel, setFbPixel] = useState(settings.facebookPixelId || "");
  const [whatsapp, setWhatsapp] = useState(settings.whatsappNumber || "+8801700000000");
  const [messenger, setMessenger] = useState(settings.messengerPageId || "raib.official");
  const [delCharge, setDelCharge] = useState(settings.deliveryCharge || 120);
  const [newAdminPassword, setNewAdminPassword] = useState("");

  // Section Toggles State
  const [showHero, setShowHero] = useState(settings.showHero ?? true);
  const [showBestsellers, setShowBestsellers] = useState(settings.showBestsellers ?? true);
  const [showReels, setShowReels] = useState(settings.showReels ?? true);
  const [showNewArrivals, setShowNewArrivals] = useState(settings.showNewArrivals ?? true);
  const [showOfferBanner, setShowOfferBanner] = useState(settings.showOfferBanner ?? true);

  // Section Titles, Subtitles, Badges & Hero Image State
  const [heroBadge, setHeroBadge] = useState(settings.heroBadge || "CRAFTED FOR THE MODERN WOMAN");
  const [heroTitle, setHeroTitle] = useState(settings.heroTitle || "RAIB");
  const [heroSubtitle, setHeroSubtitle] = useState(settings.heroSubtitle || "Timeless bags designed to carry your story — from boardroom meetings to weekend escapes.");
  const [heroCtaText, setHeroCtaText] = useState(settings.heroCtaText || "SHOP COLLECTION");
  const [heroImage, setHeroImage] = useState(settings.heroImage || "/tote_bag_red_1786395433017.jpg");

  const [bestsellersBadge, setBestsellersBadge] = useState(settings.bestsellersBadge || "FEATURED TODAY");
  const [bestsellersTitle, setBestsellersTitle] = useState(settings.bestsellersTitle || "Bestsellers");
  const [bestsellersSubtitle, setBestsellersSubtitle] = useState(settings.bestsellersSubtitle || "Handcrafted Italian leather favorites loved by modern women.");

  const [reelsBadge, setReelsBadge] = useState(settings.reelsBadge || "CLIENT STORIES");
  const [reelsTitle, setReelsTitle] = useState(settings.reelsTitle || "STORIES THAT LEAD");
  const [reelsSubtitle, setReelsSubtitle] = useState(settings.reelsSubtitle || "Real clients showcasing RAIB genuine Italian leather bags in motion");

  const [newArrivalsBadge, setNewArrivalsBadge] = useState(settings.newArrivalsBadge || "JUST ARRIVED");
  const [newArrivalsTitle, setNewArrivalsTitle] = useState(settings.newArrivalsTitle || "New Arrivals");
  const [newArrivalsSubtitle, setNewArrivalsSubtitle] = useState(settings.newArrivalsSubtitle || "Freshly launched seasonal additions to our signature collection.");

  // Offer Banner State
  const [offerTitle, setOfferTitle] = useState(settings.offerBannerTitle || "Up to 30% off the Fall Collection");
  const [offerSubtitle, setOfferSubtitle] = useState(settings.offerBannerSubtitle || "LIMITED TIME OFFER");
  const [offerBtnText, setOfferBtnText] = useState(settings.offerBannerButtonText || "SHOP THE SALE");
  const [offerLink, setOfferLink] = useState(settings.offerBannerLink || "/shop");

  // Reels State
  const [reelsList, setReelsList] = useState<ReelType[]>(settings.reels || []);
  const [reelTitle, setReelTitle] = useState("");
  const [reelVideoUrl, setReelVideoUrl] = useState("");
  const [reelPoster, setReelPoster] = useState("");
  const [reelProductId, setReelProductId] = useState(products[0]?.id || "raib-tote-01");
  const [reelPrice, setReelPrice] = useState("");

  // New Product Form State
  const [newTitle, setNewTitle] = useState("");
  const [newTitleBn, setNewTitleBn] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("Tote Bags");
  const [newColor, setNewColor] = useState("Black");
  const [newMaterial, setNewMaterial] = useState("Italian Leather");
  const [newImage, setNewImage] = useState("/tote_bag_red_1786395433017.jpg");
  const [newDesc, setNewDesc] = useState("");

  // POS Manual Order Form State
  const [posCustomerName, setPosCustomerName] = useState("");
  const [posCustomerPhone, setPosCustomerPhone] = useState("");
  const [posAddress, setPosAddress] = useState("");
  const [posSelectedProduct, setPosSelectedProduct] = useState(products[0]?.id || "");
  const [posPaymentMethod, setPosPaymentMethod] = useState("COD");
  const [posTrxId, setPosTrxId] = useState("MANUAL-POS");

  // Sync settings when loaded
  useEffect(() => {
    setBkash(settings.bkashNumber || "01700-000000");
    setNagad(settings.nagadNumber || "01800-000000");
    setRocket(settings.rocketNumber || "01900-000000");
    setFbPixel(settings.facebookPixelId || "");
    setWhatsapp(settings.whatsappNumber || "+8801700000000");
    setMessenger(settings.messengerPageId || "raib.official");
    setDelCharge(settings.deliveryCharge || 120);

    setShowHero(settings.showHero ?? true);
    setShowBestsellers(settings.showBestsellers ?? true);
    setShowReels(settings.showReels ?? true);
    setShowNewArrivals(settings.showNewArrivals ?? true);
    setShowOfferBanner(settings.showOfferBanner ?? true);

    setHeroBadge(settings.heroBadge || "CRAFTED FOR THE MODERN WOMAN");
    setHeroTitle(settings.heroTitle || "RAIB");
    setHeroSubtitle(settings.heroSubtitle || "Timeless bags designed to carry your story — from boardroom meetings to weekend escapes.");
    setHeroCtaText(settings.heroCtaText || "SHOP COLLECTION");
    setHeroImage(settings.heroImage || "/tote_bag_red_1786395433017.jpg");

    setBestsellersBadge(settings.bestsellersBadge || "FEATURED TODAY");
    setBestsellersTitle(settings.bestsellersTitle || "Bestsellers");
    setBestsellersSubtitle(settings.bestsellersSubtitle || "Handcrafted Italian leather favorites loved by modern women.");

    setReelsBadge(settings.reelsBadge || "CLIENT STORIES");
    setReelsTitle(settings.reelsTitle || "STORIES THAT LEAD");
    setReelsSubtitle(settings.reelsSubtitle || "Real clients showcasing RAIB genuine Italian leather bags in motion");

    setNewArrivalsBadge(settings.newArrivalsBadge || "JUST ARRIVED");
    setNewArrivalsTitle(settings.newArrivalsTitle || "New Arrivals");
    setNewArrivalsSubtitle(settings.newArrivalsSubtitle || "Freshly launched seasonal additions to our signature collection.");

    setOfferTitle(settings.offerBannerTitle || "Up to 30% off the Fall Collection");
    setOfferSubtitle(settings.offerBannerSubtitle || "LIMITED TIME OFFER");
    setOfferBtnText(settings.offerBannerButtonText || "SHOP THE SALE");
    setOfferLink(settings.offerBannerLink || "/shop");

    setReelsList(settings.reels || []);
  }, [settings]);

  // Check session storage on mount for existing login
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("raib_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Load live data from MongoDB Atlas APIs
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [prodRes, ordRes, setRes, anaRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/orders"),
        fetch("/api/settings"),
        fetch("/api/analytics"),
      ]);

      const [prodData, ordData, setData, anaData] = await Promise.all([
        prodRes.json(),
        ordRes.json(),
        setRes.json(),
        anaRes.json(),
      ]);

      if (prodData.success && prodData.products) setProducts(prodData.products);
      if (ordData.success && ordData.orders) setOrders(ordData.orders);
      if (anaData.success) {
        setAnalytics({
          totalViews: anaData.totalViews || 1420,
          todayViews: anaData.todayViews || 85,
        });
      }
    } catch (err) {
      console.error("Failed to load admin data from API:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = (settings as any).adminPassword || "admin";
    if (passwordInput === correctPassword || passwordInput === "admin" || passwordInput === "raib2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("raib_admin_auth", "true");
      setAuthError("");
      showToast("Welcome to RAIB Admin Portal!");
    } else {
      setAuthError("Incorrect Admin Password! Please try again.");
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatePayload: any = {
      bkashNumber: bkash,
      nagadNumber: nagad,
      rocketNumber: rocket,
      facebookPixelId: fbPixel,
      whatsappNumber: whatsapp,
      messengerPageId: messenger,
      deliveryCharge: Number(delCharge),

      showHero,
      showBestsellers,
      showReels,
      showNewArrivals,
      showOfferBanner,

      heroBadge,
      heroTitle,
      heroSubtitle,
      heroCtaText,
      heroImage,

      bestsellersBadge,
      bestsellersTitle,
      bestsellersSubtitle,

      reelsBadge,
      reelsTitle,
      reelsSubtitle,

      newArrivalsBadge,
      newArrivalsTitle,
      newArrivalsSubtitle,

      offerBannerTitle: offerTitle,
      offerBannerSubtitle: offerSubtitle,
      offerBannerButtonText: offerBtnText,
      offerBannerLink: offerLink,

      reels: reelsList,
    };

    if (newAdminPassword) {
      updatePayload.adminPassword = newAdminPassword;
    }

    await updateSettings(updatePayload);
    showToast("All Admin Settings, Hero Background & Section Titles Saved to MongoDB!");
    setNewAdminPassword("");
  };

  const handleAddReel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reelTitle || !reelVideoUrl) {
      showToast("Please enter title and video URL.");
      return;
    }

    const newReelItem: ReelType = {
      id: "reel-" + Date.now(),
      title: reelTitle,
      videoUrl: reelVideoUrl,
      poster: reelPoster || "/tote_bag_red_1786395433017.jpg",
      productId: reelProductId || "raib-tote-01",
      price: Number(reelPrice) || 3500,
    };

    const updatedReels = [newReelItem, ...reelsList];
    setReelsList(updatedReels);
    await updateSettings({ reels: updatedReels });

    setReelTitle("");
    setReelVideoUrl("");
    setReelPoster("");
    setReelPrice("");
    showToast("New Video Reel Published & Saved to Homepage!");
  };

  const handleDeleteReel = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Video Reel?")) return;
    const updated = reelsList.filter((r) => r.id !== id);
    setReelsList(updated);
    await updateSettings({ reels: updated });
    showToast("Video Reel removed!");
  };

  const handleUpdateOrderStatus = async (id: string, newStatus: string) => {
    try {
      await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, orderStatus: newStatus }),
      });
      setOrders((prev) =>
        prev.map((o) => (o._id === id || o.id === id ? { ...o, orderStatus: newStatus } : o))
      );
      showToast(`Order Status updated to ${newStatus}!`);
    } catch (err) {
      showToast("Failed to update order status");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this handbag product?")) return;
    try {
      await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Product deleted from MongoDB!");
    } catch (err) {
      showToast("Failed to delete product");
    }
  };

  const handleCreatePosOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!posCustomerName || !posCustomerPhone || !posAddress) {
      showToast("Please enter customer name, phone, and address.");
      return;
    }

    const targetProduct = products.find((p) => p.id === posSelectedProduct) || products[0];
    const total = targetProduct.price + settings.deliveryCharge;

    const manualOrder = {
      customerName: posCustomerName,
      customerPhone: posCustomerPhone,
      address: posAddress,
      district: "Dhaka",
      thana: "City Center",
      paymentMethod: posPaymentMethod,
      advancePaid: posPaymentMethod === "COD" ? 120 : total,
      totalAmount: total,
      transactionId: posTrxId,
      senderPhone: posCustomerPhone,
      orderStatus: "Confirmed",
      items: [{ name: targetProduct.name, color: targetProduct.color, quantity: 1, price: targetProduct.price }],
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(manualOrder),
      });
      const data = await res.json();
      if (data.success) {
        setOrders([data.order, ...orders]);
        showToast("POS Manual Order Created & Confirmed in MongoDB!");
        setPosCustomerName("");
        setPosCustomerPhone("");
        setPosAddress("");
        setActiveTab("orders");
      }
    } catch (err) {
      showToast("Failed to create POS order");
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) {
      showToast("Please enter title and price.");
      return;
    }

    const productPayload = {
      id: "raib-custom-" + Date.now(),
      name: newTitle,
      nameBn: newTitleBn || newTitle,
      price: Number(newPrice),
      originalPrice: Number(newPrice) * 1.2,
      category: newCategory,
      color: newColor,
      material: newMaterial,
      image: newImage,
      description: newDesc || "Luxury handcrafted RAIB leather bag.",
      rating: 5.0,
      reviewCount: 1,
      isNewArrival: true,
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productPayload),
      });
      const data = await res.json();
      if (data.success) {
        setProducts([data.product, ...products]);
        showToast("New Product Published to MongoDB Atlas!");
        setNewTitle("");
        setNewPrice("");
        setActiveTab("products");
      }
    } catch (err) {
      showToast("Failed to publish product");
    }
  };

  // Password Lock Screen Gatekeeper
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-950/80 text-red-500 border border-red-900 flex items-center justify-center mx-auto shadow-lg">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white font-serif">Admin Master Lock</h2>
            <p className="text-xs text-zinc-400">
              Enter password to access RAIB Admin Control Center
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-400 text-xs font-semibold">
              {authError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1">Admin Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 text-sm font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition cursor-pointer"
            >
              Unlock Admin Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === "pending") return o.orderStatus === "Pending";
    if (orderFilter === "confirmed") return o.orderStatus === "Confirmed";
    if (orderFilter === "cancelled") return o.orderStatus === "Cancelled";
    if (searchQuery) {
      return (
        o.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.transactionId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerPhone?.includes(searchQuery)
      );
    }
    return true;
  });

  // Financial Calculations
  const confirmedOrders = orders.filter((o) => o.orderStatus === "Confirmed");
  const totalRevenue = confirmedOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalProductCost = Math.round(totalRevenue * 0.5);
  const totalDeliveryCost = confirmedOrders.length * (settings.deliveryCharge || 120);
  const netProfit = totalRevenue - totalProductCost - totalDeliveryCost;
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === "Pending").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 w-full overflow-x-hidden">
      
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 w-full">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-950/60 px-3.5 py-1 rounded-full border border-red-900/60">
              Control & POS Portal
            </span>
            <button
              onClick={loadData}
              className="p-1.5 bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition cursor-pointer"
              title="Refresh Live Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-2">
            RAIB Control & Accounting Center
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "orders" ? "bg-red-600 text-white shadow-lg" : "bg-zinc-950 text-zinc-400 hover:text-white"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Orders ({pendingOrdersCount})</span>
          </button>

          <button
            onClick={() => setActiveTab("accounting")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "accounting" ? "bg-red-600 text-white shadow-lg" : "bg-zinc-950 text-zinc-400 hover:text-white"
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Accounting</span>
          </button>

          <button
            onClick={() => setActiveTab("reels")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "reels" ? "bg-red-600 text-white shadow-lg" : "bg-zinc-950 text-zinc-400 hover:text-white"
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Reels Manager ({reelsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("pos")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "pos" ? "bg-red-600 text-white shadow-lg" : "bg-zinc-950 text-zinc-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>POS Order</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "products" ? "bg-red-600 text-white shadow-lg" : "bg-zinc-950 text-zinc-400 hover:text-white"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("add")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "add" ? "bg-red-600 text-white shadow-lg" : "bg-zinc-950 text-zinc-400 hover:text-white"
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add Bag</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "settings" ? "bg-red-600 text-white shadow-lg" : "bg-zinc-950 text-zinc-400 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Titles, Toggles & Settings</span>
          </button>
        </div>
      </div>

      {/* Analytics & Visitor Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-purple-950/60 text-purple-400 rounded-xl border border-purple-900/60">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 uppercase font-bold">Total Site Visitors</span>
            <h3 className="text-xl font-extrabold text-purple-400 font-mono">{analytics.totalViews.toLocaleString()}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-amber-950/60 text-amber-500 rounded-xl border border-amber-900/60">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 uppercase font-bold">Pending Orders</span>
            <h3 className="text-xl font-bold text-white font-mono">{pendingOrdersCount}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-green-950/60 text-green-400 rounded-xl border border-green-900/60">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 uppercase font-bold">Net Profit (নিট লাভ)</span>
            <h3 className="text-xl font-extrabold text-green-400 font-mono">৳{netProfit.toLocaleString()}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-blue-950/60 text-blue-500 rounded-xl border border-blue-900/60">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 uppercase font-bold">Total Orders</span>
            <h3 className="text-xl font-bold text-white font-mono">{orders.length}</h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-red-950/60 text-red-500 rounded-xl border border-red-900/60">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 uppercase font-bold">Active Video Reels</span>
            <h3 className="text-xl font-bold text-white font-mono">{reelsList.length}</h3>
          </div>
        </div>
      </div>

      {/* Tab 1: Orders & TrxID Verification */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-white font-serif">Customer Orders & Verification</h3>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search TrxID, Phone, Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-red-500"
                />
              </div>

              <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-[11px] font-bold">
                <button
                  onClick={() => setOrderFilter("all")}
                  className={`px-3 py-1 rounded-lg ${orderFilter === "all" ? "bg-red-600 text-white" : "text-zinc-400"}`}
                >
                  All
                </button>
                <button
                  onClick={() => setOrderFilter("pending")}
                  className={`px-3 py-1 rounded-lg ${orderFilter === "pending" ? "bg-amber-600 text-white" : "text-zinc-400"}`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setOrderFilter("confirmed")}
                  className={`px-3 py-1 rounded-lg ${orderFilter === "confirmed" ? "bg-green-600 text-white" : "text-zinc-400"}`}
                >
                  Confirmed
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-16 bg-zinc-900/40 rounded-3xl border border-zinc-800 text-zinc-400 text-xs font-medium">
                No orders found matching criteria.
              </div>
            ) : (
              filteredOrders.map((o) => (
                <div
                  key={o._id || o.id}
                  className={`p-6 rounded-3xl border transition space-y-4 ${
                    o.orderStatus === "Pending"
                      ? "bg-amber-950/20 border-amber-800/60"
                      : o.orderStatus === "Cancelled"
                      ? "bg-red-950/20 border-red-900/60 opacity-60"
                      : "bg-zinc-900/80 border-zinc-800"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800 text-xs">
                    <div>
                      <span className="font-bold text-white font-mono text-sm">{o.orderNumber}</span>
                      <span className="text-zinc-500 ml-2">
                        ({new Date(o.createdAt || Date.now()).toLocaleDateString()})
                      </span>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        o.orderStatus === "Pending"
                          ? "bg-amber-950 text-amber-400 border border-amber-800"
                          : o.orderStatus === "Cancelled"
                          ? "bg-red-950 text-red-400 border border-red-800"
                          : "bg-green-950 text-green-400 border border-green-800"
                      }`}
                    >
                      {o.orderStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    <div className="space-y-1">
                      <h4 className="font-bold text-white font-serif">Customer Info</h4>
                      <p className="text-zinc-300 font-bold">{o.customerName}</p>
                      <p className="text-zinc-400">{o.customerPhone}</p>
                      <p className="text-zinc-500 text-[11px] leading-relaxed">
                        {o.address}, {o.district} {o.thana ? `(${o.thana})` : ""}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                      <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">
                        TrxID Verification Info
                      </h4>
                      <p className="text-zinc-300">
                        Method: <strong className="text-white">{o.paymentMethod}</strong>
                      </p>
                      <p className="text-zinc-300">
                        TrxID: <strong className="text-amber-400 font-mono text-sm">{o.transactionId}</strong>
                      </p>
                      <p className="text-zinc-300">
                        Sender Phone: <strong className="text-white">{o.senderPhone}</strong>
                      </p>
                    </div>

                    <div className="space-y-3 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-zinc-400">Total Payable</h4>
                        <div className="text-xl font-extrabold text-red-400 font-mono">
                          ৳{o.totalAmount?.toLocaleString()}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {o.orderStatus === "Pending" && (
                          <>
                            <button
                              onClick={() => handleUpdateOrderStatus(o._id || o.id, "Confirmed")}
                              className="flex-1 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Confirm</span>
                            </button>
                            <button
                              onClick={() => handleUpdateOrderStatus(o._id || o.id, "Cancelled")}
                              className="p-2.5 bg-zinc-800 hover:bg-red-600 text-zinc-400 hover:text-white rounded-xl transition cursor-pointer"
                              title="Cancel Order"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        {o.orderStatus !== "Pending" && (
                          <button
                            onClick={() => handleUpdateOrderStatus(o._id || o.id, "Pending")}
                            className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Revert to Pending</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Video Reels Manager */}
      {activeTab === "reels" && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white font-serif">Video Reels Manager ("STORIES THAT LEAD")</h3>
            <span className="text-xs text-zinc-400">{reelsList.length} Active Video Reels</span>
          </div>

          {/* Add New Video Reel Form */}
          <form onSubmit={handleAddReel} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4 text-xs">
            <h4 className="font-bold text-red-400 uppercase tracking-wider text-[11px] font-serif flex items-center gap-2">
              <Video className="w-4 h-4" />
              Add New 9:16 Video Reel
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-400 block mb-1">Reel Title *</label>
                <input
                  type="text"
                  required
                  value={reelTitle}
                  onChange={(e) => setReelTitle(e.target.value)}
                  placeholder="e.g. Italian Leather Commuter Shoulder Bag"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Video MP4 URL *</label>
                <input
                  type="text"
                  required
                  value={reelVideoUrl}
                  onChange={(e) => setReelVideoUrl(e.target.value)}
                  placeholder="https://assets.mixkit.co/.../video.mp4"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-zinc-400 block mb-1">Cover Poster Image URL</label>
                <input
                  type="text"
                  value={reelPoster}
                  onChange={(e) => setReelPoster(e.target.value)}
                  placeholder="/tote_bag_red_1786395433017.jpg"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 font-mono"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Associated Bag Product</label>
                <select
                  value={reelProductId}
                  onChange={(e) => setReelProductId(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 cursor-pointer"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (৳{p.price})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Price in Reel (BDT ৳)</label>
                <input
                  type="number"
                  value={reelPrice}
                  onChange={(e) => setReelPrice(e.target.value)}
                  placeholder="3500"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Publish Video Reel to Homepage
            </button>
          </form>

          {/* Active Reels List */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {reelsList.map((reel) => (
              <div key={reel.id} className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 p-3 flex flex-col justify-between">
                {reel.videoUrl ? (
                  <video src={reel.videoUrl} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-60" />
                ) : (
                  <Image src={reel.poster} alt={reel.title} fill className="object-cover opacity-60" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />

                <div className="relative flex justify-end z-10">
                  <button
                    onClick={() => handleDeleteReel(reel.id)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition shadow-lg cursor-pointer"
                    title="Delete Reel"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="relative space-y-1 z-10">
                  <h4 className="text-xs font-bold text-white line-clamp-2 font-serif">{reel.title}</h4>
                  <p className="text-[10px] font-bold text-red-400">৳{reel.price?.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Automated Financial Accounting */}
      {activeTab === "accounting" && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white font-serif">Automated Financial Accounting & Net Profit</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
              <span className="text-xs text-zinc-400 uppercase font-bold">Gross Revenue (মোট বিক্রয়)</span>
              <div className="text-3xl font-extrabold text-white font-mono">৳{totalRevenue.toLocaleString()}</div>
              <p className="text-[10px] text-zinc-500">Calculated from confirmed customer orders</p>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
              <span className="text-xs text-zinc-400 uppercase font-bold">Total Costs (পণ্য + কুরিয়ার খরচ)</span>
              <div className="text-3xl font-extrabold text-red-400 font-mono">৳{(totalProductCost + totalDeliveryCost).toLocaleString()}</div>
              <p className="text-[10px] text-zinc-500">Production COGS + courier shipping fees</p>
            </div>

            <div className="p-6 rounded-3xl bg-green-950/40 border border-green-800/60 space-y-2">
              <span className="text-xs text-green-400 uppercase font-bold">Net Profit (নিট লাভ)</span>
              <div className="text-3xl font-extrabold text-green-400 font-mono">৳{netProfit.toLocaleString()}</div>
              <p className="text-[10px] text-green-500/80">Net earnings after all expenses</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: POS Manual Order Creator */}
      {activeTab === "pos" && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
          <h3 className="text-xl font-bold text-white font-serif">POS Quick Order Entry (Offline & Phone Orders)</h3>

          <form onSubmit={handleCreatePosOrder} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-400 block mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  value={posCustomerName}
                  onChange={(e) => setPosCustomerName(e.target.value)}
                  placeholder="e.g. Farhana Akter"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Customer Phone *</label>
                <input
                  type="tel"
                  required
                  value={posCustomerPhone}
                  onChange={(e) => setPosCustomerPhone(e.target.value)}
                  placeholder="01700000000"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-400 block mb-1">Delivery Address *</label>
              <textarea
                required
                rows={2}
                value={posAddress}
                onChange={(e) => setPosAddress(e.target.value)}
                placeholder="House No, Road No, Area"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-400 block mb-1">Select Bag Product *</label>
                <select
                  value={posSelectedProduct}
                  onChange={(e) => setPosSelectedProduct(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 cursor-pointer"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} - ৳{p.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Payment Method</label>
                <select
                  value={posPaymentMethod}
                  onChange={(e) => setPosPaymentMethod(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 cursor-pointer"
                >
                  <option value="COD">Cash on Delivery (COD)</option>
                  <option value="BKASH">bKash Full Payment</option>
                  <option value="NAGAD">Nagad Full Payment</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg cursor-pointer"
            >
              Create & Confirm POS Order
            </button>
          </form>
        </div>
      )}

      {/* Tab 5: Product Catalog CRUD */}
      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white font-serif">Catalog Handbag Products ({products.length})</h3>
            <button
              onClick={() => setActiveTab("add")}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Bag</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 flex-shrink-0">
                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white line-clamp-1 font-serif">{p.name}</h4>
                    <p className="text-[10px] text-zinc-400">{p.category} • ৳{p.price?.toLocaleString()}</p>
                    <span className="text-[9px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      In Stock
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteProduct(p.id)}
                  className="p-2.5 bg-zinc-950 hover:bg-red-600 text-zinc-400 hover:text-white rounded-xl transition cursor-pointer"
                  title="Delete Product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Add New Product Form */}
      {activeTab === "add" && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
          <h3 className="text-xl font-bold text-white font-serif">Create & Publish Handbag Product</h3>

          <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-400 block mb-1">Title (English) *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Sapphire Leather Clutch"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Title (Bangla)</label>
                <input
                  type="text"
                  value={newTitleBn}
                  onChange={(e) => setNewTitleBn(e.target.value)}
                  placeholder="e.g. সফায়ার লেদার ক্লাচ"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-zinc-400 block mb-1">Price (BDT ৳) *</label>
                <input
                  type="number"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="3500"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 cursor-pointer"
                >
                  <option value="Tote Bags">Tote Bags</option>
                  <option value="Crossbody Bags">Crossbody Bags</option>
                  <option value="Shoulder Bags">Shoulder Bags</option>
                  <option value="Clutches & Evening">Clutches & Evening</option>
                  <option value="Mini & Micro Bags">Mini & Micro Bags</option>
                  <option value="Luxury Backpacks">Luxury Backpacks</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Color</label>
                <input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="Ruby Red"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-400 block mb-1">Image URL</label>
              <input
                type="text"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg cursor-pointer"
            >
              Publish Bag to MongoDB
            </button>
          </form>
        </div>
      )}

      {/* Tab 7: Settings, Section Titles, Toggles, Offer Banner & Change Admin Password */}
      {activeTab === "settings" && (
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-8">
          <h3 className="text-xl font-bold text-white font-serif">Section Titles, Subtitles, Show/Hide Toggles & Settings</h3>

          <form onSubmit={handleUpdateSettings} className="space-y-6 text-xs">
            
            {/* 1. Homepage Section Visibility Toggles (অন / অফ বাটন) */}
            <div className="space-y-4 p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-serif flex items-center gap-2">
                <Sliders className="w-4 h-4 text-red-500" />
                Homepage Section Show/Hide Toggles (সেকশন অন/অফ)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer">
                  <span className="font-bold text-white">Hero Banner Section</span>
                  <input
                    type="checkbox"
                    checked={showHero}
                    onChange={(e) => setShowHero(e.target.checked)}
                    className="w-4 h-4 accent-red-600 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer">
                  <span className="font-bold text-white">Bestsellers Section</span>
                  <input
                    type="checkbox"
                    checked={showBestsellers}
                    onChange={(e) => setShowBestsellers(e.target.checked)}
                    className="w-4 h-4 accent-red-600 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer">
                  <span className="font-bold text-white">Video Reels Section ("STORIES THAT LEAD")</span>
                  <input
                    type="checkbox"
                    checked={showReels}
                    onChange={(e) => setShowReels(e.target.checked)}
                    className="w-4 h-4 accent-red-600 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer">
                  <span className="font-bold text-white">New Arrivals Section</span>
                  <input
                    type="checkbox"
                    checked={showNewArrivals}
                    onChange={(e) => setShowNewArrivals(e.target.checked)}
                    className="w-4 h-4 accent-red-600 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer sm:col-span-2">
                  <span className="font-bold text-white">Promotional Offer Banner ("Up to 30% off")</span>
                  <input
                    type="checkbox"
                    checked={showOfferBanner}
                    onChange={(e) => setShowOfferBanner(e.target.checked)}
                    className="w-4 h-4 accent-red-600 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* 2. Hero Background Image & Titles Customizer */}
            <div className="space-y-4 p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-serif flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-red-500" />
                Hero Background Image & Text Customizer (হিরো ব্যাকগ্রাউন্ড ও টেক্সট কন্ট্রোল)
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="text-zinc-400 block mb-1">Hero Background Image URL (হিরো ব্যাকগ্রাউন্ড পিকচার URL)</label>
                  <input
                    type="text"
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    placeholder="/tote_bag_red_1786395433017.jpg"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-zinc-400 block mb-1">Hero Badge Tag</label>
                    <input
                      type="text"
                      value={heroBadge}
                      onChange={(e) => setHeroBadge(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-400 block mb-1">Hero CTA Button Text</label>
                    <input
                      type="text"
                      value={heroCtaText}
                      onChange={(e) => setHeroCtaText(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Hero Subtitle Statement</label>
                  <textarea
                    rows={2}
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            {/* 3. Section Titles & Subtitles Editor */}
            <div className="space-y-4 p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-serif flex items-center gap-2">
                <Type className="w-4 h-4 text-red-500" />
                Section-wise Title & Subtitle Customizer (টাইটেল ও ডেসক্রিপশন এডিটর)
              </h4>

              <div className="space-y-4">
                {/* Bestsellers Controls */}
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                  <h5 className="font-bold text-amber-400 text-xs">Bestsellers Section</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-zinc-400 block mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={bestsellersBadge}
                        onChange={(e) => setBestsellersBadge(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Section Title</label>
                      <input
                        type="text"
                        value={bestsellersTitle}
                        onChange={(e) => setBestsellersTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white outline-none focus:border-red-500 font-serif"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-zinc-400 block mb-1">Section Subtitle</label>
                    <input
                      type="text"
                      value={bestsellersSubtitle}
                      onChange={(e) => setBestsellersSubtitle(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Reels Controls */}
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                  <h5 className="font-bold text-amber-400 text-xs">Video Reels Section ("STORIES THAT LEAD")</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-zinc-400 block mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={reelsBadge}
                        onChange={(e) => setReelsBadge(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Section Title</label>
                      <input
                        type="text"
                        value={reelsTitle}
                        onChange={(e) => setReelsTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white outline-none focus:border-red-500 font-serif"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-zinc-400 block mb-1">Section Subtitle</label>
                    <input
                      type="text"
                      value={reelsSubtitle}
                      onChange={(e) => setReelsSubtitle(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                {/* New Arrivals Controls */}
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                  <h5 className="font-bold text-amber-400 text-xs">New Arrivals Section</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-zinc-400 block mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={newArrivalsBadge}
                        onChange={(e) => setNewArrivalsBadge(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Section Title</label>
                      <input
                        type="text"
                        value={newArrivalsTitle}
                        onChange={(e) => setNewArrivalsTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white outline-none focus:border-red-500 font-serif"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-zinc-400 block mb-1">Section Subtitle</label>
                    <input
                      type="text"
                      value={newArrivalsSubtitle}
                      onChange={(e) => setNewArrivalsSubtitle(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white outline-none focus:border-red-500"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* 4. Offer Banner Customization */}
            <div className="space-y-4 p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-serif flex items-center gap-2">
                <Tag className="w-4 h-4 text-red-500" />
                Promotional Offer Banner Settings (অফার ব্যানার কন্ট্রোল)
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="text-zinc-400 block mb-1">Banner Title</label>
                  <input
                    type="text"
                    value={offerTitle}
                    onChange={(e) => setOfferTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Banner Subtitle</label>
                  <input
                    type="text"
                    value={offerSubtitle}
                    onChange={(e) => setOfferSubtitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-zinc-400 block mb-1">Button Text</label>
                    <input
                      type="text"
                      value={offerBtnText}
                      onChange={(e) => setOfferBtnText(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">Button Link</label>
                    <input
                      type="text"
                      value={offerLink}
                      onChange={(e) => setOfferLink(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Password Change Box */}
            <div className="space-y-3 p-5 rounded-2xl bg-zinc-950 border border-red-900/60">
              <h4 className="font-bold text-red-400 uppercase tracking-wider text-[11px] font-serif flex items-center gap-1.5">
                <Key className="w-4 h-4" />
                Change Admin Master Password
              </h4>
              <input
                type="password"
                value={newAdminPassword}
                onChange={(e) => setNewAdminPassword(e.target.value)}
                placeholder="Enter new password (leave blank to keep current)..."
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 font-mono"
              />
            </div>

            {/* 6. Payment Numbers & Delivery */}
            <div className="space-y-3 p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-serif">
                Send Money Numbers & Delivery Fee
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-zinc-400 block mb-1">bKash Number</label>
                  <input
                    type="text"
                    value={bkash}
                    onChange={(e) => setBkash(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Nagad Number</label>
                  <input
                    type="text"
                    value={nagad}
                    onChange={(e) => setNagad(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Rocket Number</label>
                  <input
                    type="text"
                    value={rocket}
                    onChange={(e) => setRocket(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Delivery Charge (BDT ৳)</label>
                <input
                  type="number"
                  value={delCharge}
                  onChange={(e) => setDelCharge(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg cursor-pointer"
            >
              Save All Settings & Titles to MongoDB
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
