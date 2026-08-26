import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectToDatabase();
    const count = await Product.countDocuments();
    return NextResponse.json({
      success: true,
      message: `Current product count in database: ${count}. Auto-seeding disabled. Add products from Admin Panel.`,
      count,
    });
  } catch (error: any) {
    console.error("MongoDB Seed Check Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
