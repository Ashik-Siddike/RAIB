import mongoose, { Schema, Document } from "mongoose";

export interface IColorVariant {
  colorName: string;
  colorHex?: string;
  image: string;
  isDefault?: boolean;
}

export interface IProduct extends Document {
  id: string;
  name: string;
  nameBn?: string;
  price: number;
  originalPrice?: number;
  category: string;
  color: string;
  material: string;
  image: string;
  secondaryImage?: string;
  images?: string[];
  colorVariants?: IColorVariant[];
  description: string;
  descriptionBn?: string;
  rating: number;
  reviewCount: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  dimensions?: string;
  sortOrder?: number;
}

const ColorVariantSchema: Schema = new Schema({
  colorName: { type: String, required: true },
  colorHex: { type: String, default: "#DC2626" },
  image: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const ProductSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    nameBn: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    category: { type: String, required: true },
    color: { type: String, required: true },
    material: { type: String, required: true },
    image: { type: String, required: true },
    secondaryImage: { type: String },
    images: { type: [String], default: [] },
    colorVariants: { type: [ColorVariantSchema], default: [] },
    description: { type: String, required: true },
    descriptionBn: { type: String },
    rating: { type: Number, default: 5 },
    reviewCount: { type: Number, default: 0 },
    isNewArrival: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    dimensions: { type: String },
    sortOrder: { type: Number, default: 100 },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
