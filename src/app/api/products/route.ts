import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { SAMPLE_PRODUCTS } from "@/lib/productsData";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let query: any = {};
    if (category && category !== "All") {
      query.category = category;
    }

    let products = await Product.find(query).sort({ createdAt: -1 });

    // Fallback to sample products if DB is empty
    if (products.length === 0) {
      return NextResponse.json({ success: true, products: SAMPLE_PRODUCTS, source: "fallback" });
    }

    return NextResponse.json({ success: true, products, source: "mongodb" });
  } catch (error: any) {
    console.error("MongoDB GET Products Error:", error);
    return NextResponse.json({ success: true, products: SAMPLE_PRODUCTS, source: "fallback" });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const newProduct = await Product.create({
      id: body.id || "raib-" + Date.now(),
      name: body.name,
      nameBn: body.nameBn || body.name,
      price: body.price,
      originalPrice: body.originalPrice || body.price * 1.2,
      category: body.category,
      color: body.color || "Black",
      material: body.material || "Italian Leather",
      image: body.image,
      secondaryImage: body.secondaryImage,
      description: body.description,
      descriptionBn: body.descriptionBn,
      rating: body.rating || 5.0,
      reviewCount: body.reviewCount || 1,
      isNewArrival: body.isNewArrival ?? true,
      isBestSeller: body.isBestSeller ?? false,
      dimensions: body.dimensions,
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error: any) {
    console.error("MongoDB POST Product Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
