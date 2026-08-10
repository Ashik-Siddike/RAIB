"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SAMPLE_PRODUCTS } from "@/lib/productsData";
import { ProductType, useApp } from "@/lib/store";
import { useSettings } from "@/lib/settingsStore";
import {
  Plus,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  DollarSign,
  Settings,
  Share2,
  Trash2,
  XCircle,
  RotateCcw,
  Users,
  TrendingUp,
  FileText,
  Calculator,
  UserCheck
} from "lucide-react";

export default function AdminPage() {
  const { showToast } = useApp();
  const { settings, updateSettings } = useSettings();

  const [products, setProducts] = useState<ProductType[]>(SAMPLE_PRODUCTS);
  const [activeTab, setActiveTab] = useState<"orders" | "accounting" | "pos" | "products" | "add" | "settings">("orders");

  // Sample Orders for Admin Management
  const [orders, setOrders] = useState([
    {
      id: "ord-101",
      orderNumber: "RAIB-849201",
      customerName: "Sadia Jahan",
      customerPhone: "01711-223344",
      address: "House 12, Road 5, Block B, Dhanmondi, Dhaka",
      paymentMethod: "COD",
      advancePaid: 120,
      totalAmount: 4970,
      productCost: 2400,
      transactionId: "9J87K2L5M",
      senderPhone: "01711-223344",
      orderStatus: "Pending",
      items: [{ name: "The Royal Crimson Italian Leather Tote", color: "Crimson Red", quantity: 1, price: 4850 }],
      createdAt: "10 Mins ago",
    },
    {
      id: "ord-102",
      orderNumber: "RAIB-639102",
      customerName: "Nusrat Rahman",
      customerPhone: "01822-334455",
      address: "GEC Circle, Chittagong",
      paymentMethod: "BKASH",
      advancePaid: 4070,
      totalAmount: 4070,
      productCost: 1900,
      transactionId: "BKASH99281X",
      senderPhone: "01822-334455",
      orderStatus: "Confirmed",
      items: [{ name: "Obsidian Quilted Chain Crossbody Bag", color: "Classic Black", quantity: 1, price: 3950 }],
      createdAt: "1 Hour ago",
    },
  ]);

  // Settings State
  const [bkash, setBkash] = useState(settings.bkashNumber);
  const [nagad, setNagad] = useState(settings.nagadNumber);
  const [rocket, setRocket] = useState(settings.rocketNumber);
  const [fbPixel, setFbPixel] = useState(settings.facebookPixelId);
  const [whatsapp, setWhatsapp] = useState(settings.whatsappNumber);
  const [messenger, setMessenger] = useState(settings.messengerPageId);

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

  const handleUpdateSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      bkashNumber: bkash,
      nagadNumber: nagad,
      rocketNumber: rocket,
      facebookPixelId: fbPixel,
      whatsappNumber: whatsapp,
      messengerPageId: messenger,
    });
    showToast("Admin Settings & Facebook Pixel Saved!");
  };

  const handleConfirmOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, orderStatus: "Confirmed" } : o))
    );
    showToast("TrxID Verified & Order Confirmed!");
  };

  const handleCancelOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, orderStatus: "Cancelled" } : o))
    );
    showToast("Order Cancelled!");
  };

  const handleRevertOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, orderStatus: "Pending" } : o))
    );
    showToast("Order Reverted back to Pending Status!");
  };

  const handleCreatePosOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!posCustomerName || !posCustomerPhone || !posAddress) {
      showToast("Please enter customer name, phone, and address.");
      return;
    }

    const targetProduct = products.find((p) => p.id === posSelectedProduct) || products[0];
    const total = targetProduct.price + settings.deliveryCharge;
    const cost = Math.round(targetProduct.price * 0.5);

    const manualOrder = {
      id: "ord-" + Date.now(),
      orderNumber: "RAIB-POS-" + Math.floor(1000 + Math.random() * 9000),
      customerName: posCustomerName,
      customerPhone: posCustomerPhone,
      address: posAddress,
      paymentMethod: posPaymentMethod as any,
      advancePaid: posPaymentMethod === "COD" ? 120 : total,
      totalAmount: total,
      productCost: cost,
      transactionId: posTrxId,
      senderPhone: posCustomerPhone,
      orderStatus: "Confirmed",
      items: [{ name: targetProduct.name, color: targetProduct.color, quantity: 1, price: targetProduct.price }],
      createdAt: "Just now (POS)",
    };

    setOrders([manualOrder, ...orders]);
    showToast("POS Manual Order Created & Confirmed!");
    setPosCustomerName("");
    setPosCustomerPhone("");
    setPosAddress("");
    setActiveTab("orders");
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) {
      showToast("Please enter title and price.");
      return;
    }

    const created: ProductType = {
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

    setProducts([created, ...products]);
    showToast("New Product Listing Published!");
    setActiveTab("products");
  };

  // Financial Calculations
  const confirmedOrders = orders.filter((o) => o.orderStatus !== "Cancelled");
  const totalRevenue = confirmedOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalProductCost = confirmedOrders.reduce((sum, o) => sum + o.productCost, 0);
  const totalDeliveryCost = confirmedOrders.length * settings.deliveryCharge;
  const netProfit = totalRevenue - totalProductCost - totalDeliveryCost;

  const pendingOrdersCount = orders.filter((o) => o.orderStatus === "Pending").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800">
        <div>
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-950/60 px-3.5 py-1 rounded-full border border-red-900/60">
            Admin Management Portal & CRM / POS
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-2">
            RAIB Control & Accounting Center
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "orders" ? "bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-lg shadow-red-950/60" : "bg-zinc-950 text-zinc-400 hover:text-white"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Orders ({pendingOrdersCount} Pending)</span>
          </button>

          <button
            onClick={() => setActiveTab("accounting")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "accounting" ? "bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-lg shadow-red-950/60" : "bg-zinc-950 text-zinc-400 hover:text-white"
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Accounting (আয়-ব্যয়)</span>
          </button>

          <button
            onClick={() => setActiveTab("pos")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "pos" ? "bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-lg shadow-red-950/60" : "bg-zinc-950 text-zinc-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>POS Manual Order</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "products" ? "bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-lg shadow-red-950/60" : "bg-zinc-950 text-zinc-400 hover:text-white"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "settings" ? "bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-lg shadow-red-950/60" : "bg-zinc-950 text-zinc-400 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-amber-950/60 text-amber-500 rounded-xl border border-amber-900/60">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 uppercase font-bold">Pending TrxID Verification</span>
            <h3 className="text-xl font-bold text-white font-mono">{pendingOrdersCount}</h3>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-green-950/60 text-green-400 rounded-xl border border-green-900/60">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 uppercase font-bold">Net Profit (খাঁটি লাভ)</span>
            <h3 className="text-xl font-extrabold text-green-400 font-mono">৳{netProfit.toLocaleString()}</h3>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-blue-950/60 text-blue-500 rounded-xl border border-blue-900/60">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 uppercase font-bold">Total Clients / Visitors</span>
            <h3 className="text-xl font-bold text-white font-mono">1,240</h3>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-red-950/60 text-red-500 rounded-xl border border-red-900/60">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 uppercase font-bold">FB Pixel Status</span>
            <h3 className="text-xs font-bold text-zinc-200">{settings.facebookPixelId ? "ACTIVE" : "Not Set"}</h3>
          </div>
        </div>
      </div>

      {/* Tab 1: Orders & TrxID Verification */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white font-serif">Customer Orders & Verification Flow</h3>
            <span className="text-xs text-zinc-400">Verify TrxID to confirm or cancel orders</span>
          </div>

          <div className="space-y-4">
            {orders.map((o) => (
              <div
                key={o.id}
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
                    <span className="text-zinc-500 ml-2">({o.createdAt})</span>
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
                  {/* Customer Details */}
                  <div className="space-y-1">
                    <h4 className="font-bold text-white font-serif">Customer Info</h4>
                    <p className="text-zinc-300 font-bold">{o.customerName}</p>
                    <p className="text-zinc-400">{o.customerPhone}</p>
                    <p className="text-zinc-500 text-[11px] leading-relaxed">{o.address}</p>
                  </div>

                  {/* TrxID Verification Box */}
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                    <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">
                      TrxID Verification Info
                    </h4>
                    <p className="text-zinc-300">
                      Payment Method: <strong className="text-white">{o.paymentMethod}</strong>
                    </p>
                    <p className="text-zinc-300">
                      TrxID: <strong className="text-amber-400 font-mono text-sm">{o.transactionId}</strong>
                    </p>
                    <p className="text-zinc-300">
                      Sender Phone: <strong className="text-white">{o.senderPhone}</strong>
                    </p>
                  </div>

                  {/* Order Total & Actions */}
                  <div className="space-y-3 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-zinc-400">Total Amount</h4>
                      <div className="text-xl font-extrabold text-red-400 font-mono">
                        ৳{o.totalAmount.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {o.orderStatus === "Pending" && (
                        <>
                          <button
                            onClick={() => handleConfirmOrder(o.id)}
                            className="flex-1 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Confirm</span>
                          </button>
                          <button
                            onClick={() => handleCancelOrder(o.id)}
                            className="p-2.5 bg-zinc-800 hover:bg-red-600 text-zinc-400 hover:text-white rounded-xl transition cursor-pointer"
                            title="Cancel Order"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {o.orderStatus !== "Pending" && (
                        <button
                          onClick={() => handleRevertOrder(o.id)}
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
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Automated Financial Accounting (আয়-ব্যয় ও লাভ-ক্ষতি) */}
      {activeTab === "accounting" && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white font-serif">Automated Financial Accounting & Profit Summary</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
              <span className="text-xs text-zinc-400 uppercase font-bold">Total Gross Revenue (মোট বিক্রয়)</span>
              <div className="text-3xl font-extrabold text-white font-mono">৳{totalRevenue.toLocaleString()}</div>
              <p className="text-[10px] text-zinc-500">Total earnings from confirmed orders</p>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
              <span className="text-xs text-zinc-400 uppercase font-bold">Product & Delivery Cost (মোট খরচ)</span>
              <div className="text-3xl font-extrabold text-red-400 font-mono">৳{(totalProductCost + totalDeliveryCost).toLocaleString()}</div>
              <p className="text-[10px] text-zinc-500">Material costs + courier shipping fees</p>
            </div>

            <div className="p-6 rounded-3xl bg-green-950/40 border border-green-800/60 space-y-2">
              <span className="text-xs text-green-400 uppercase font-bold">Net Profit (খাঁটি খাঁটি লাভ)</span>
              <div className="text-3xl font-extrabold text-green-400 font-mono">৳{netProfit.toLocaleString()}</div>
              <p className="text-[10px] text-green-500/80">Calculated automatically after expenses</p>
            </div>

          </div>
        </div>
      )}

      {/* Tab 3: POS Manual Order Creator */}
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
              className="w-full py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition cursor-pointer"
            >
              Create & Confirm POS Order
            </button>
          </form>
        </div>
      )}

      {/* Tab 4: Settings (Payment Numbers & Facebook Pixel ID) */}
      {activeTab === "settings" && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
          <h3 className="text-xl font-bold text-white font-serif">
            Payment Numbers & Facebook Pixel Integration
          </h3>

          <form onSubmit={handleUpdateSettings} className="space-y-4 text-xs">
            
            {/* Payment Numbers */}
            <div className="space-y-3 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-serif">
                bKash / Nagad / Rocket Send Money Numbers
              </h4>

              <div>
                <label className="text-zinc-400 block mb-1">bKash Send Money Number</label>
                <input
                  type="text"
                  value={bkash}
                  onChange={(e) => setBkash(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 font-mono"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Nagad Send Money Number</label>
                <input
                  type="text"
                  value={nagad}
                  onChange={(e) => setNagad(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 font-mono"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Rocket Send Money Number</label>
                <input
                  type="text"
                  value={rocket}
                  onChange={(e) => setRocket(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 font-mono"
                />
              </div>
            </div>

            {/* Facebook Pixel */}
            <div className="space-y-3 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-serif">
                Facebook Pixel ID Setup
              </h4>
              <p className="text-[11px] text-zinc-500">
                Enter your Meta Pixel Dataset ID. The pixel script will automatically inject into your website head for ad tracking.
              </p>
              <input
                type="text"
                value={fbPixel}
                onChange={(e) => setFbPixel(e.target.value)}
                placeholder="e.g. 123456789012345"
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 font-mono"
              />
            </div>

            {/* WhatsApp & Messenger Settings */}
            <div className="space-y-3 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-serif">
                Live Chat Handles (WhatsApp & Messenger)
              </h4>

              <div>
                <label className="text-zinc-400 block mb-1">WhatsApp Business Number (with country code)</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+8801700000000"
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Messenger Page Username</label>
                <input
                  type="text"
                  value={messenger}
                  onChange={(e) => setMessenger(e.target.value)}
                  placeholder="raibofficial"
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition cursor-pointer"
            >
              Save Settings
            </button>

          </form>
        </div>
      )}

      {/* Tab 5: Products Management */}
      {activeTab === "products" && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white font-serif">Catalog Products ({products.length})</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 flex-shrink-0">
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="text-xs font-bold text-white line-clamp-1 font-serif">{p.name}</h4>
                  <p className="text-[10px] text-zinc-400">{p.category} • ৳{p.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Add New Product Form */}
      {activeTab === "add" && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
          <h3 className="text-xl font-bold text-white font-serif">Create New Handbag Listing</h3>

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
              className="w-full py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition cursor-pointer"
            >
              Publish Bag Product
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
