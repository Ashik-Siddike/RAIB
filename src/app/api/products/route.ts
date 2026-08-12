import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { SAMPLE_PRODUCTS } from "@/lib/productsData";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const id = searchParams.get("id");

    if (id) {
      const product = await Product.findOne({ id }) || SAMPLE_PRODUCTS.find(p => p.id === id);
      return NextResponse.json({ success: true, product });
    }

    let query: any = {};
    if (category && category !== "All") {
      if (category === "Best Sellers") {
        query.isBestSeller = true;
      } else {
        query.category = category;
      }
    }

    let products = await Product.find(query).sort({ createdAt: -1 });

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
      price: Number(body.price),
      originalPrice: Number(body.originalPrice) || Number(body.price) * 1.2,
      category: body.category || "Tote Bags",
      color: body.color || "Black",
      material: body.material || "Italian Leather",
      image: body.image || "/tote_bag_red_1786395433017.jpg",
      secondaryImage: body.secondaryImage || body.image,
      description: body.description || "Handcrafted luxury leather bag.",
      descriptionBn: body.descriptionBn || body.description,
      rating: body.rating || 5.0,
      reviewCount: body.reviewCount || 1,
      isNewArrival: body.isNewArrival ?? true,
      isBestSeller: body.isBestSeller ?? false,
      dimensions: body.dimensions || "Standard Size",
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error: any) {
    console.error("MongoDB POST Product Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { id, ...updateData } = body;

    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      { $set: updateData },
      { new: true }
    );

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error: any) {
    console.error("MongoDB PUT Product Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID required" }, { status: 400 });
    }

    await Product.deleteOne({ id });
    return NextResponse.json({ success: true, message: `Product ${id} deleted` });
  } catch (error: any) {
    console.error("MongoDB DELETE Product Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
