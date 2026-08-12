import mongoose, { Schema, Document } from "mongoose";

export interface IAnalytics extends Document {
  date: string; // e.g. "2026-08-12"
  pageViews: number;
  uniqueVisitors: number;
  ipAddresses: string[];
}

const AnalyticsSchema: Schema = new Schema(
  {
    date: { type: String, required: true, unique: true },
    pageViews: { type: Number, default: 0 },
    uniqueVisitors: { type: Number, default: 0 },
    ipAddresses: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Analytics || mongoose.model<IAnalytics>("Analytics", AnalyticsSchema);
