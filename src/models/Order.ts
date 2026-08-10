import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  district: string;
  thana: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    color: string;
  }>;
  totalAmount: number;
  advancePaid: number;
  paymentMethod: "COD" | "BKASH" | "NAGAD" | "ROCKET";
  transactionId: string;
  senderPhone: string;
  orderStatus: "Pending" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled";
  estimatedDelivery: string;
}

const OrderSchema: Schema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String },
    customerPhone: { type: String, required: true },
    address: { type: String, required: true },
    district: { type: String, required: true },
    thana: { type: String },
    items: [
      {
        id: String,
        name: String,
        price: Number,
        quantity: Number,
        color: String,
      },
    ],
    totalAmount: { type: Number, required: true },
    advancePaid: { type: Number, default: 0 },
    paymentMethod: { type: String, enum: ["COD", "BKASH", "NAGAD", "ROCKET"], default: "COD" },
    transactionId: { type: String, required: true },
    senderPhone: { type: String, required: true },
    orderStatus: { type: String, enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
    estimatedDelivery: { type: String, default: "3-5 Business Days" },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
