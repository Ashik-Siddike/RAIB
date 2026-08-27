import mongoose, { Schema, Document } from "mongoose";

export interface IReel {
  id: string;
  videoUrl: string;
  poster: string;
  title: string;
  price: number;
  productId: string;
}

export interface ISettings extends Document {
  // Payment & Courier Numbers
  hasSeededProducts?: boolean;
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  facebookPixelId: string;
  whatsappNumber: string;
  messengerPageId: string;
  facebookPageUrl?: string;
  instagramUrl?: string;
  deliveryCharge: number;
  adminPassword?: string;

  // Announcement & Stock Scarcity Bar
  showAnnouncementBar: boolean;
  announcementText: string;
  stockUrgencyText?: string;

  // Visibility Toggles
  showHero: boolean;
  showBestsellers: boolean;
  showReels: boolean;
  showNewArrivals: boolean;
  showOfferBanner: boolean;
  showTrustBadges: boolean;

  // Hero Section Customizer
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroImage: string;

  // Bestsellers Customizer
  bestsellersBadge: string;
  bestsellersTitle: string;
  bestsellersSubtitle: string;
  bestsellersCtaText: string;

  // Video Reels Customizer
  reelsBadge: string;
  reelsTitle: string;
  reelsSubtitle: string;
  reels: IReel[];

  // New Arrivals Customizer
  newArrivalsBadge: string;
  newArrivalsTitle: string;
  newArrivalsSubtitle: string;
  newArrivalsCtaText: string;

  // Offer Banner Customizer
  offerBannerBadge: string;
  offerBannerTitle: string;
  offerBannerSubtitle: string;
  offerBannerButtonText: string;
  offerBannerLink: string;

  // Trust Badges Customizer
  trustBadge1Title: string;
  trustBadge1Subtitle: string;
  trustBadge2Title: string;
  trustBadge2Subtitle: string;
  trustBadge3Title: string;
  trustBadge3Subtitle: string;
  trustBadge4Title: string;
  trustBadge4Subtitle: string;

  // Footer Customizer
  footerTagline: string;
  footerPhone: string;
  footerEmail: string;
  footerAddress: string;
  footerCopyright: string;
}

const ReelSchema = new Schema<IReel>({
  id: { type: String, required: true },
  videoUrl: { type: String, default: "" },
  poster: { type: String, default: "" },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  productId: { type: String, required: true },
});

const SettingsSchema = new Schema<ISettings>(
  {
    hasSeededProducts: { type: Boolean, default: false },
    bkashNumber: { type: String, default: "01700-000000" },
    nagadNumber: { type: String, default: "01800-000000" },
    rocketNumber: { type: String, default: "01900-000000" },
    facebookPixelId: { type: String, default: "" },
    whatsappNumber: { type: String, default: "+8801700000000" },
    messengerPageId: { type: String, default: "raib.official" },
    facebookPageUrl: { type: String, default: "https://facebook.com/raib.official" },
    instagramUrl: { type: String, default: "https://instagram.com/raib.official" },
    deliveryCharge: { type: Number, default: 120 },
    adminPassword: { type: String, default: "admin" },

    showAnnouncementBar: { type: Boolean, default: true },
    announcementText: { type: String, default: "FREE EXPRESS SHIPPING NATIONWIDE ON ORDERS OVER ৳3,000 | 100% GENUINE ITALIAN LEATHER" },
    stockUrgencyText: { type: String, default: "🔥 স্টক সীমিত! ঢাকায় মাত্র ৪টি ব্যাগ বাকি আছে।" },

    showHero: { type: Boolean, default: true },
    showBestsellers: { type: Boolean, default: true },
    showReels: { type: Boolean, default: true },
    showNewArrivals: { type: Boolean, default: true },
    showOfferBanner: { type: Boolean, default: true },
    showTrustBadges: { type: Boolean, default: true },

    heroBadge: { type: String, default: "STYLED FOR THE MODERN WOMAN" },
    heroTitle: { type: String, default: "RAIB" },
    heroSubtitle: { type: String, default: "Timeless bags designed to carry your story — from boardroom meetings to weekend escapes." },
    heroCtaText: { type: String, default: "SHOP COLLECTION" },
    heroImage: { type: String, default: "/hero-luxury-bg.jpg" },

    bestsellersBadge: { type: String, default: "FEATURED TODAY" },
    bestsellersTitle: { type: String, default: "Bestsellers" },
    bestsellersSubtitle: { type: String, default: "Handcrafted Italian leather favorites loved by modern women." },
    bestsellersCtaText: { type: String, default: "VIEW ALL BESTSELLERS" },

    reelsBadge: { type: String, default: "CLIENT STORIES" },
    reelsTitle: { type: String, default: "STORIES THAT LEAD" },
    reelsSubtitle: { type: String, default: "Real clients showcasing RAIB genuine Italian leather bags in motion" },
    reels: [ReelSchema],

    newArrivalsBadge: { type: String, default: "JUST ARRIVED" },
    newArrivalsTitle: { type: String, default: "New Arrivals" },
    newArrivalsSubtitle: { type: String, default: "Freshly launched seasonal additions to our signature collection." },
    newArrivalsCtaText: { type: String, default: "EXPLORE ALL BAGS" },

    offerBannerBadge: { type: String, default: "LIMITED TIME" },
    offerBannerTitle: { type: String, default: "Up to 30% off the Fall Collection" },
    offerBannerSubtitle: { type: String, default: "LIMITED TIME OFFER" },
    offerBannerButtonText: { type: String, default: "SHOP THE SALE" },
    offerBannerLink: { type: String, default: "/shop" },

    trustBadge1Title: { type: String, default: "100% Genuine Italian Leather" },
    trustBadge1Subtitle: { type: String, default: "Handcrafted by master artisans" },
    trustBadge2Title: { type: String, default: "Cash on Delivery" },
    trustBadge2Subtitle: { type: String, default: "Fast home delivery across BD" },
    trustBadge3Title: { type: String, default: "7-Day Easy Exchange" },
    trustBadge3Subtitle: { type: String, default: "Guaranteed replacement protection" },
    trustBadge4Title: { type: String, default: "18K Gold-Plated Hardware" },
    trustBadge4Subtitle: { type: String, default: "Rust & tarnish resistant" },

    footerTagline: { type: String, default: "Timeless luxury ladies bags designed to carry your story with elegance." },
    footerPhone: { type: String, default: "+880 1700-000000" },
    footerEmail: { type: String, default: "support@raib.site" },
    footerAddress: { type: String, default: "House 42, Road 11, Block D, Banani, Dhaka-1213, Bangladesh" },
    footerCopyright: { type: String, default: "© 2026 RAIB Leather. All rights reserved." },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);
