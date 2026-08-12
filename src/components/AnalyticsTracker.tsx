"use client";

import { useEffect } from "react";

export function AnalyticsTracker() {
  useEffect(() => {
    // Fire visit ping once per page session
    const hasTracked = sessionStorage.getItem("raib_visit_tracked");
    if (!hasTracked) {
      fetch("/api/analytics", { method: "POST" })
        .then(() => sessionStorage.setItem("raib_visit_tracked", "true"))
        .catch((err) => console.error(err));
    }
  }, []);

  return null;
}
