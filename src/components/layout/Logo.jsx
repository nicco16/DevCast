import React from "react";

// Renderiza el logo SVG de la marca DevCast.
export default function Logo({ size = 40, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="devcastLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="80" height="80" rx="22" fill="url(#devcastLogoGrad)" />
      <rect x="30" y="32" width="10" height="36" rx="5" fill="#E8E0FF" opacity="0.95" />
      <rect x="60" y="32" width="10" height="36" rx="5" fill="#E8E0FF" opacity="0.95" />
    </svg>
  );
}
