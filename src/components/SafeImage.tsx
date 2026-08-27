"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export function SafeImage({
  src,
  alt,
  fallbackSrc = "/main-logo.png",
  className = "",
  ...props
}: SafeImageProps) {
  const resolvedSrc = typeof src === "string" && src.trim() ? src : fallbackSrc;
  const [imgSrc, setImgSrc] = useState<string>(resolvedSrc);
  const [hasError, setHasError] = useState(false);

  // Sync internal state when the src prop changes (e.g. color variant switch)
  useEffect(() => {
    const newSrc = typeof src === "string" && src.trim() ? src : fallbackSrc;
    setImgSrc(newSrc);
    setHasError(false);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={hasError || !imgSrc ? fallbackSrc : imgSrc}
      alt={alt || "RAIB Genuine Leather Bag"}
      className={className}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
