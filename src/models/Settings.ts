import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  facebookPixelId: string;
  whatsappNumber: string;
  messengerPageId: string;
  deliveryCharge: number;
}

const SettingsSchema: Schema = new Schema(
  {
    bkashNumber: { type: String, default: "01700-000000" },
    nagadNumber: { type: String, default: "01800-000000" },
    rocketNumber: { type: String, default: "01900-000000" },
    facebookPixelId: { type: String, default: "" },
    whatsappNumber: { type: String, default: "+8801700000000" },
    messengerPageId: { type: String, default: "raib.official" },
    deliveryCharge: { type: Number, default: 120 },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);
