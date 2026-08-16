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
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  facebookPixelId: string;
  whatsappNumber: string;
  messengerPageId: string;
  deliveryCharge: number;
  adminPassword?: string;

  // Visibility Toggles
  showHero: boolean;
  showBestsellers: boolean;
  showReels: boolean;
  showNewArrivals: boolean;
  showOfferBanner: boolean;

  // Hero Section Customizer
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;

  // Bestsellers Customizer
  bestsellersBadge: string;
  bestsellersTitle: string;
  bestsellersSubtitle: string;

  // Video Reels Customizer
  reelsBadge: string;
  reelsTitle: string;
  reelsSubtitle: string;
  reels: IReel[];

  // New Arrivals Customizer
  newArrivalsBadge: string;
  newArrivalsTitle: string;
  newArrivalsSubtitle: string;

  // Offer Banner Customizer
  offerBannerBadge: string;
  offerBannerTitle: string;
  offerBannerSubtitle: string;
  offerBannerButtonText: string;
  offerBannerLink: string;
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
    bkashNumber: { type: String, default: "01700-000000" },
    nagadNumber: { type: String, default: "01800-000000" },
    rocketNumber: { type: String, default: "01900-000000" },
    facebookPixelId: { type: String, default: "" },
    whatsappNumber: { type: String, default: "+8801700000000" },
    messengerPageId: { type: String, default: "raib.official" },
    deliveryCharge: { type: Number, default: 120 },
    adminPassword: { type: String, default: "admin" },

    showHero: { type: Boolean, default: true },
    showBestsellers: { type: Boolean, default: true },
    showReels: { type: Boolean, default: true },
    showNewArrivals: { type: Boolean, default: true },
    showOfferBanner: { type: Boolean, default: true },

    heroBadge: { type: String, default: "CRAFTED FOR THE MODERN WOMAN" },
    heroTitle: { type: String, default: "RAIB" },
    heroSubtitle: { type: String, default: "Timeless bags designed to carry your story — from boardroom meetings to weekend escapes." },
    heroCtaText: { type: String, default: "SHOP COLLECTION" },

    bestsellersBadge: { type: String, default: "FEATURED TODAY" },
    bestsellersTitle: { type: String, default: "Bestsellers" },
    bestsellersSubtitle: { type: String, default: "Handcrafted Italian leather favorites loved by modern women." },

    reelsBadge: { type: String, default: "CLIENT STORIES" },
    reelsTitle: { type: String, default: "STORIES THAT LEAD" },
    reelsSubtitle: { type: String, default: "Real clients showcasing RAIB genuine Italian leather bags in motion" },
    reels: [ReelSchema],

    newArrivalsBadge: { type: String, default: "JUST ARRIVED" },
    newArrivalsTitle: { type: String, default: "New Arrivals" },
    newArrivalsSubtitle: { type: String, default: "Freshly launched seasonal additions to our signature collection." },

    offerBannerBadge: { type: String, default: "LIMITED TIME" },
    offerBannerTitle: { type: String, default: "Up to 30% off the Fall Collection" },
    offerBannerSubtitle: { type: String, default: "LIMITED TIME OFFER" },
    offerBannerButtonText: { type: String, default: "SHOP THE SALE" },
    offerBannerLink: { type: String, default: "/shop" },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);
