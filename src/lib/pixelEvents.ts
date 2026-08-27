"use client";

// Unified helper to track e-commerce events across Facebook Meta Pixel and TikTok Pixel

export function trackPixelViewContent(product: {
  id: string;
  name: string;
  price: number;
  category?: string;
}) {
  if (typeof window === "undefined") return;

  // Facebook Pixel
  if ((window as any).fbq) {
    try {
      (window as any).fbq("track", "ViewContent", {
        content_name: product.name,
        content_ids: [product.id],
        content_type: "product",
        value: product.price,
        currency: "BDT",
      });
    } catch (e) {}
  }

  // TikTok Pixel
  if ((window as any).ttq) {
    try {
      (window as any).ttq.track("ViewContent", {
        content_id: product.id,
        content_type: "product",
        content_name: product.name,
        quantity: 1,
        price: product.price,
        value: product.price,
        currency: "BDT",
      });
    } catch (e) {}
  }
}

export function trackPixelAddToCart(product: {
  id: string;
  name: string;
  price: number;
  category?: string;
}) {
  if (typeof window === "undefined") return;

  // Facebook Pixel
  if ((window as any).fbq) {
    try {
      (window as any).fbq("track", "AddToCart", {
        content_name: product.name,
        content_ids: [product.id],
        content_type: "product",
        value: product.price,
        currency: "BDT",
      });
    } catch (e) {}
  }

  // TikTok Pixel
  if ((window as any).ttq) {
    try {
      (window as any).ttq.track("AddToCart", {
        content_id: product.id,
        content_type: "product",
        content_name: product.name,
        quantity: 1,
        price: product.price,
        value: product.price,
        currency: "BDT",
      });
    } catch (e) {}
  }
}

export function trackPixelInitiateCheckout(items: any[], totalValue: number) {
  if (typeof window === "undefined") return;

  const contentIds = items.map((i) => i.id || i.product?.id);

  // Facebook Pixel
  if ((window as any).fbq) {
    try {
      (window as any).fbq("track", "InitiateCheckout", {
        content_ids: contentIds,
        num_items: items.length,
        value: totalValue,
        currency: "BDT",
      });
    } catch (e) {}
  }

  // TikTok Pixel
  if ((window as any).ttq) {
    try {
      (window as any).ttq.track("InitiateCheckout", {
        contents: items.map((i) => ({
          content_id: i.id || i.product?.id,
          content_type: "product",
          content_name: i.name || i.product?.name,
          quantity: i.quantity || 1,
          price: i.price || i.product?.price,
        })),
        value: totalValue,
        currency: "BDT",
      });
    } catch (e) {}
  }
}

export function trackPixelPurchase(order: {
  orderNumber: string;
  totalAmount: number;
  items?: any[];
}) {
  if (typeof window === "undefined") return;

  // Facebook Pixel
  if ((window as any).fbq) {
    try {
      (window as any).fbq("track", "Purchase", {
        content_type: "product",
        value: order.totalAmount,
        currency: "BDT",
        transaction_id: order.orderNumber,
      });
    } catch (e) {}
  }

  // TikTok Pixel
  if ((window as any).ttq) {
    try {
      (window as any).ttq.track("CompletePayment", {
        content_type: "product",
        value: order.totalAmount,
        currency: "BDT",
        order_id: order.orderNumber,
      });
    } catch (e) {}
  }
}
