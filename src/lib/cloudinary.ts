export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "wwf3m9ze";

/**
 * Generates an optimized Cloudinary URL for any uploaded image public ID or raw URL
 */
export function getCloudinaryUrl(publicIdOrUrl: string, options?: { width?: number; height?: number; crop?: string }) {
  if (!publicIdOrUrl) return "/tote_bag_red_1786395433017.jpg";

  // If already a full URL
  if (publicIdOrUrl.startsWith("http") || publicIdOrUrl.startsWith("/")) {
    return publicIdOrUrl;
  }

  const { width = 800, height = 800, crop = "fill" } = options || {};
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_${width},h_${height},c_${crop},q_auto,f_auto/${publicIdOrUrl}`;
}

/**
 * Uploads an image file to Cloudinary via unsigned/signed preset or direct upload API endpoint
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default"); // Default fallback or direct preset

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.secure_url) {
      return data.secure_url;
    }
    throw new Error(data.error?.message || "Upload failed");
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    throw err;
  }
}
