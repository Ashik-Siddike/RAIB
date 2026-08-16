import mongoose, { Schema, Document } from "mongoose";

export interface IReel {
  id: string;
  title: string;
  videoUrl: string;
  poster: string;
  productId: string;
  price: number;
}

export interface ISettings extends Document {
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  facebookPixelId: string;
  whatsappNumber: string;
  messengerPageId: string;
  deliveryCharge: number;
  
  // Section Toggles
  showHero: boolean;
  showBestsellers: boolean;
  showReels: boolean;
  showNewArrivals: boolean;
  showOfferBanner: boolean;
  
  // Offer Banner Settings
  offerBannerTitle: string;
  offerBannerSubtitle: string;
  offerBannerButtonText: string;
  offerBannerLink: string;

  // Video Reels
  reels: IReel[];
}

const ReelSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, default: "RAIB Luxury Bag" },
  videoUrl: { type: String, required: true },
  poster: { type: String, default: "" },
  productId: { type: String, default: "raib-tote-01" },
  price: { type: Number, default: 3500 },
});

const SettingsSchema: Schema = new Schema(
  {
    bkashNumber: { type: String, default: "01700-000000" },
    nagadNumber: { type: String, default: "01800-000000" },
    rocketNumber: { type: String, default: "01900-000000" },
    facebookPixelId: { type: String, default: "" },
    whatsappNumber: { type: String, default: "+8801700000000" },
    messengerPageId: { type: String, default: "raib.official" },
    deliveryCharge: { type: Number, default: 120 },

    // Section Toggles
    showHero: { type: Boolean, default: true },
    showBestsellers: { type: Boolean, default: true },
    showReels: { type: Boolean, default: true },
    showNewArrivals: { type: Boolean, default: true },
    showOfferBanner: { type: Boolean, default: true },

    // Offer Banner
    offerBannerTitle: { type: String, default: "Up to 30% off the Fall Collection" },
    offerBannerSubtitle: { type: String, default: "LIMITED TIME OFFER" },
    offerBannerButtonText: { type: String, default: "SHOP THE SALE" },
    offerBannerLink: { type: String, default: "/shop" },

    // Video Reels
    reels: {
      type: [ReelSchema],
      default: [
        {
          id: "reel-1",
          title: "New Style Large Capacity Shoulder Bag",
          videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-showing-a-handbag-42848-large.mp4",
          poster: "/tote_bag_red_1786395433017.jpg",
          productId: "raib-tote-01",
          price: 4850,
        },
        {
          id: "reel-2",
          title: "Trendy Oxford Cloth Men's Outdoor Messenger Bag",
          videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-holding-a-leather-bag-42850-large.mp4",
          poster: "/crossbody_black_1786395824801.jpg",
          productId: "raib-crossbody-02",
          price: 3950,
        },
        {
          id: "reel-3",
          title: "High-End Retro Commuter Shoulder Bag",
          videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-model-posing-with-a-leather-bag-42849-large.mp4",
          poster: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80",
          productId: "raib-shoulder-03",
          price: 5200,
        },
        {
          id: "reel-4",
          title: "Luxury Crocodile Pattern Genuine Leather Kelly Handbag",
          videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-holding-a-stylish-black-handbag-42851-large.mp4",
          poster: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80",
          productId: "raib-clutch-04",
          price: 6800,
        },
        {
          id: "reel-5",
          title: "Butterfly Design Shoulder Bag",
          videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-with-a-handbag-42852-large.mp4",
          poster: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
          productId: "raib-tote-01",
          price: 3700,
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);
