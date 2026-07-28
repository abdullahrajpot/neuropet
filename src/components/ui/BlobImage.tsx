"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export function BlobImage({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const clipId = useId().replace(/:/g, "");

  return (
    <div className={cn("relative", className)}>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d="M0.12,0.04 C0.32,0,0.68,0,0.88,0.04 C0.97,0.07,1,0.22,0.96,0.42 C0.91,0.68,0.76,0.96,0.5,0.99 C0.24,0.96,0.06,0.74,0.03,0.48 C0,0.22,0.04,0.08,0.12,0.04 Z" />
          </clipPath>
        </defs>
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        style={{ clipPath: `url(#${clipId})` }}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
}

export function RoundedImage({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card shadow-card",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
}
