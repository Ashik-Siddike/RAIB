import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { SAMPLE_PRODUCTS } from "@/lib/productsData";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Check if products already exist
    const count = await Product.countDocuments();
    if (count > 0) {
      return NextResponse.json({
        success: true,
        message: `Database already seeded with ${count} products.`,
      });
    }

    // Insert sample products
    const inserted = await Product.insertMany(SAMPLE_PRODUCTS);

    return NextResponse.json({
      success: true,
      message: `Seeded ${inserted.length} sample luxury handbag products into MongoDB!`,
      products: inserted,
    });
  } catch (error: any) {
    console.error("MongoDB Seed Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
