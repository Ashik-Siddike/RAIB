import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const id = searchParams.get("id");

    // Products are fetched directly without purging demo data on every request

    if (id) {
      const product = await Product.findOne({ id }).lean();
      return NextResponse.json(
        { success: true, product },
        {
          headers: {
            "Cache-Control": "public, s-maxage=10, stale-while-revalidate=60",
          },
        }
      );
    }

    let query: any = {};
    if (category && category !== "All") {
      if (category === "Best Sellers") {
        query.isBestSeller = true;
      } else {
        query.category = category;
      }
    }

    // Fast lean execution sorting by custom serial (sortOrder ASC, then newest createdAt DESC)
    const products = await Product.find(query).lean().sort({ sortOrder: 1, createdAt: -1 });

    return NextResponse.json(
      { success: true, products, source: "mongodb", count: products.length },
      {
        headers: {
          "Cache-Control": "public, s-maxage=5, stale-while-revalidate=30",
        },
      }
    );
  } catch (error: any) {
    console.error("MongoDB GET Products Error:", error);
    return NextResponse.json({ success: false, error: error.message, products: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.name || !body.price) {
      return NextResponse.json({ success: false, error: "Title and price are required." }, { status: 400 });
    }

    const mainCoverImage = body.image || body.secondaryImage || "/main-logo.png";

    // Sanitize color variants to ensure valid schema elements
    const rawColorVariants = Array.isArray(body.colorVariants) ? body.colorVariants : [];
    const validColorVariants = rawColorVariants
      .filter((cv: any) => cv && cv.colorName)
      .map((cv: any, idx: number) => ({
        colorName: String(cv.colorName).trim() || "Default",
        colorHex: cv.colorHex || "#DC2626",
        image: cv.image ? String(cv.image).trim() : mainCoverImage,
        isDefault: cv.isDefault ?? idx === 0,
      }));

    // If no color variants provided, create default fallback variant
    if (validColorVariants.length === 0) {
      validColorVariants.push({
        colorName: body.color || "Standard",
        colorHex: "#DC2626",
        image: mainCoverImage,
        isDefault: true,
      });
    }

    const newProduct = await Product.create({
      id: body.id || "raib-" + Date.now(),
      name: String(body.name).trim(),
      nameBn: body.nameBn ? String(body.nameBn).trim() : String(body.name).trim(),
      price: Number(body.price),
      originalPrice: Number(body.originalPrice) || Number(body.price) * 1.2,
      category: body.category || "Tote Bags",
      color: body.color || validColorVariants[0].colorName || "Black",
      material: body.material || "Chinese Leather",
      image: mainCoverImage,
      secondaryImage: body.secondaryImage || mainCoverImage,
      images: Array.isArray(body.images) && body.images.length > 0 ? body.images : [mainCoverImage],
      colorVariants: validColorVariants,
      description: body.description || "Handcrafted luxury leather bag.",
      descriptionBn: body.descriptionBn || body.description || "বিলাসবহুল খাঁটি চামড়ার ব্যাগ।",
      rating: body.rating || 5.0,
      reviewCount: body.reviewCount || 1,
      isNewArrival: body.isNewArrival ?? true,
      isBestSeller: body.isBestSeller ?? false,
      dimensions: body.dimensions || "Standard Size",
      sortOrder: body.sortOrder !== undefined ? Number(body.sortOrder) : 100,
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error: any) {
    console.error("MongoDB POST Product Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    // 1. Bulk sequence / serial reordering support
    if (Array.isArray(body.orderedIds) && body.orderedIds.length > 0) {
      const bulkOps = body.orderedIds.map((pid: string, index: number) => ({
        updateOne: {
          filter: { id: pid },
          update: { $set: { sortOrder: index + 1 } },
        },
      }));
      await Product.bulkWrite(bulkOps);
      const updatedProducts = await Product.find({}).lean().sort({ sortOrder: 1, createdAt: -1 });
      return NextResponse.json({
        success: true,
        message: "Product serial sequence updated successfully",
        products: updatedProducts,
      });
    }

    const { id, ...updateFields } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID required for update" }, { status: 400 });
    }

    if (updateFields.price) {
      updateFields.price = Number(updateFields.price);
    }
    if (updateFields.originalPrice) {
      updateFields.originalPrice = Number(updateFields.originalPrice);
    }
    if (updateFields.sortOrder !== undefined) {
      updateFields.sortOrder = Number(updateFields.sortOrder);
    }

    if (Array.isArray(updateFields.colorVariants)) {
      updateFields.colorVariants = updateFields.colorVariants
        .filter((cv: any) => cv && cv.colorName)
        .map((cv: any, idx: number) => ({
          colorName: String(cv.colorName).trim() || "Default",
          colorHex: cv.colorHex || "#DC2626",
          image: cv.image ? String(cv.image).trim() : updateFields.image || "/main-logo.png",
          isDefault: cv.isDefault ?? idx === 0,
        }));
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error: any) {
    console.error("MongoDB PUT Product Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to update product" }, { status: 500 });
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

    const deleteResult = await Product.deleteOne({ id });
    return NextResponse.json({
      success: true,
      deletedCount: deleteResult.deletedCount,
      message: `Product ${id} permanently deleted from MongoDB`,
    });
  } catch (error: any) {
    console.error("MongoDB DELETE Product Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
