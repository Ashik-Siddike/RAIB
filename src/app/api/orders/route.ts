import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectToDatabase();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    console.error("MongoDB GET Orders Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const orderNumber = "RAIB-" + Math.floor(100000 + Math.random() * 900000);

    const newOrder = await Order.create({
      orderNumber,
      customerName: body.customerName,
      customerEmail: body.customerEmail || "",
      customerPhone: body.customerPhone,
      address: body.address,
      district: body.district,
      thana: body.thana || "",
      items: body.items,
      totalAmount: body.totalAmount,
      advancePaid: body.advancePaid || 120,
      paymentMethod: body.paymentMethod || "COD",
      transactionId: body.transactionId,
      senderPhone: body.senderPhone,
      orderStatus: "Pending",
      estimatedDelivery: "3-5 Business Days",
    });

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error: any) {
    console.error("MongoDB POST Order Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { id, orderStatus } = body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    );

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error: any) {
    console.error("MongoDB PUT Order Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
