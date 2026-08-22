/**
 * WhatsApp Pre-filled Order Link Builder
 * Constructs a rich pre-filled message with product details, selected color, serial code, price, and absolute bag image link.
 */

export interface WhatsAppOrderDetails {
  whatsappNumber?: string;
  productName: string;
  productId: string;
  colorName?: string;
  price: number;
  imageUrl: string;
  productUrl?: string;
  customerName?: string;
  customerAddress?: string;
}

export function createWhatsAppOrderLink(details: WhatsAppOrderDetails): string {
  // Clean phone number (default: +8801700000000)
  let rawPhone = details.whatsappNumber || "+8801700000000";
  let cleanPhone = rawPhone.replace(/\D/g, "");

  // Ensure Bangladesh country code prefix 88
  if (cleanPhone.startsWith("01")) {
    cleanPhone = "88" + cleanPhone;
  } else if (!cleanPhone.startsWith("88") && cleanPhone.length === 10) {
    cleanPhone = "880" + cleanPhone;
  }

  // Ensure absolute image URL
  const absoluteImgUrl = details.imageUrl.startsWith("http")
    ? details.imageUrl
    : `https://raib.site${details.imageUrl.startsWith("/") ? "" : "/"}${details.imageUrl}`;

  const absoluteProductUrl = details.productUrl || `https://raib.site/product/${details.productId}`;

  // Formatted WhatsApp Message
  let messageText = `🛍️ *RAIB LUXURY LEATHER - NEW ORDER*

👜 *Product:* ${details.productName}
🆔 *Serial / Item Code:* ${details.productId}
🎨 *Selected Color:* ${details.colorName || "Default"}
💰 *Price:* ৳${details.price.toLocaleString()}
📦 *Delivery Method:* Cash on Delivery (COD)

🖼️ *Selected Bag Photo:*
${absoluteImgUrl}

🔗 *Product Page Link:*
${absoluteProductUrl}`;

  if (details.customerName) {
    messageText += `\n\n👤 *Customer Name:* ${details.customerName}`;
  }
  if (details.customerAddress) {
    messageText += `\n📍 *Address:* ${details.customerAddress}`;
  }

  messageText += `\n\n_Please confirm availability & delivery details!_`;

  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(messageText)}`;
}
