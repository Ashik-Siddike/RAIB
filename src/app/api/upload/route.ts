import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    // If client sends JSON with pre-compressed Data URL
    if (contentType.includes("application/json")) {
      const body = await req.json();
      if (!body.dataUrl) {
        return NextResponse.json({ success: false, error: "No image data provided" }, { status: 400 });
      }
      return NextResponse.json({
        success: true,
        url: body.dataUrl,
        fileName: body.fileName || "uploaded_image.jpg",
      });
    }

    // Handle standard FormData upload
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/jpeg";
    const dataUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;

    return NextResponse.json({
      success: true,
      url: dataUrl,
      fileName: file.name,
    });
  } catch (error: any) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
