/**
 * Client-side Image Compression Utility
 * Resizes raw camera/high-res images to max 1200px width/height and compresses to lightweight WebP/JPEG Data URL.
 * Prevents 413 Payload Too Large errors and ensures lightning-fast upload & publishing.
 */
export async function compressImageFile(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If it's already a small SVG or tiny file (< 100KB), convert directly to data URL
    if (file.type === "image/svg+xml" || file.size < 100 * 1024) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
      return;
    }

    const image = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      image.src = e.target?.result as string;
    };

    reader.onerror = (err) => reject(err);

    image.onload = () => {
      let width = image.width;
      let height = image.height;

      // Calculate aspect ratio scaling
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        // Fallback to FileReader if canvas context fails
        resolve(image.src);
        return;
      }

      // Smooth scaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(image, 0, 0, width, height);

      // Export as compressed WebP or JPEG
      const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
      const dataUrl = canvas.toDataURL(outputType, quality);
      resolve(dataUrl);
    };

    image.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
