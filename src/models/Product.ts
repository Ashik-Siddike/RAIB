import mongoose, { Schema, Document } from "mongoose";

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
  description: string;
  descriptionBn?: string;
  rating: number;
  reviewCount: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  dimensions?: string;
}

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
    description: { type: String, required: true },
    descriptionBn: { type: String },
    rating: { type: Number, default: 5 },
    reviewCount: { type: Number, default: 0 },
    isNewArrival: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    dimensions: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
