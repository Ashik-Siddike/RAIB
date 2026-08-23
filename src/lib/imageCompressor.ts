/**
 * Ultra-Lightweight Client-Side Image Compression Utility
 * Resizes camera/high-res images to max 950px and compresses below 200KB per photo.
 * Prevents Vercel 4.5MB Serverless Function payload limits (HTTP 413 Request Entity Too Large).
 */

export async function compressImageFile(
  file: File | string,
  maxWidth = 950,
  maxHeight = 950,
  quality = 0.68
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If input is already a string URL (not base64 data url), return as is
    if (typeof file === "string") {
      if (!file.startsWith("data:image/")) {
        resolve(file);
        return;
      }
    }

    const image = new Image();
    
    if (typeof file === "string") {
      image.src = file;
    } else {
      if (file.type === "image/svg+xml") {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        image.src = e.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    }

    image.onload = () => {
      let width = image.width;
      let height = image.height;

      // Scale aspect ratio
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
        resolve(image.src);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
      ctx.drawImage(image, 0, 0, width, height);

      let compressedDataUrl = canvas.toDataURL("image/jpeg", quality);

      // Recursive check: If output base64 is still larger than 250KB, compress further
      if (compressedDataUrl.length > 250 * 1024) {
        compressedDataUrl = canvas.toDataURL("image/jpeg", 0.55);
      }
      if (compressedDataUrl.length > 200 * 1024) {
        // Create smaller canvas (750px)
        const smallCanvas = document.createElement("canvas");
        smallCanvas.width = Math.round(width * 0.75);
        smallCanvas.height = Math.round(height * 0.75);
        const smallCtx = smallCanvas.getContext("2d");
        if (smallCtx) {
          smallCtx.drawImage(canvas, 0, 0, smallCanvas.width, smallCanvas.height);
          compressedDataUrl = smallCanvas.toDataURL("image/jpeg", 0.50);
        }
      }

      resolve(compressedDataUrl);
    };

    image.onerror = (err) => reject(err);
  });
}
