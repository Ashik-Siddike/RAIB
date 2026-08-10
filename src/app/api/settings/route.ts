import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function GET() {
  try {
    await connectToDatabase();
    let settings = await Settings.findOne({});

    if (!settings) {
      settings = await Settings.create({});
    }

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    console.error("MongoDB GET Settings Error:", error);
    return NextResponse.json({
      success: true,
      settings: {
        bkashNumber: "01700-000000",
        nagadNumber: "01800-000000",
        rocketNumber: "01900-000000",
        facebookPixelId: "",
        whatsappNumber: "+8801700000000",
        messengerPageId: "raib.official",
        deliveryCharge: 120,
      },
    });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    let settings = await Settings.findOne({});
    if (!settings) {
      settings = await Settings.create(body);
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, body, { new: true });
    }

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    console.error("MongoDB PUT Settings Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
