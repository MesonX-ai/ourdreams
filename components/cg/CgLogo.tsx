"use client";

import { useId } from "react";
import Link from "next/link";

/**
 * OurDreams animated brand lockup.
 * - Gold-gradient gift mark with a rotating shine ring and gentle float
 * - Bow wiggle + twinkling sparkles on hover
 * - Wordmark with a shimmer sweep across "Dreams"
 * - Soft entrance animation on first paint
 */
export function CgLogo({ className = "" }: { className?: string }) {
  const gradientId = `cg-logo-grad-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <Link
      href="/"
      aria-label="Our Dreams home"
      className={`cg-logo ${className}`}
    >
      <span className="cg-logo-mark" aria-hidden="true">
        <span className="cg-logo-ring" />
        <svg viewBox="0 0 43 42" width="42" height="42" className="cg-logo-gift">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="55%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#b8860b" />
            </linearGradient>
          </defs>
          <circle cx="21.6111" cy="21" r="21" fill={`url(#${gradientId})`} />
          <g fill="#fff">
            <path d="M15.4537 27.529H27.7636V15.3944H15.4537V27.529ZM28.6168 29.1632H14.6506C14.1982 29.1632 13.8462 28.8162 13.8462 28.3708V14.6014C13.8462 14.156 14.1982 13.809 14.6506 13.809H28.5667C29.0197 13.809 29.3711 14.156 29.3711 14.6014V28.3214C29.4213 28.7667 29.0699 29.1632 28.6168 29.1632Z" />
            <path d="M21.6847 28.9653C21.2317 28.9653 20.8796 28.6176 20.8796 28.1723V14.9484C20.8796 14.5024 21.2317 14.1561 21.6847 14.1561C22.1365 14.1561 22.4878 14.5024 22.4878 14.9484V28.1723C22.4878 28.5688 22.1365 28.9653 21.6847 28.9653Z" />
            <path d="M28.5668 19.3066H14.9512C14.4995 19.3066 14.1475 18.9602 14.1475 18.5142C14.1475 18.0682 14.4995 17.7225 14.9512 17.7225H28.5668C29.0199 17.7225 29.3712 18.0682 29.3712 18.5142C29.3712 18.9602 29.0199 19.3066 28.5668 19.3066Z" />
            <path d="M21.8847 15.3442C21.6846 15.3442 21.5334 15.2947 21.3828 15.1463L17.514 12.0257C17.1619 11.7288 17.1117 11.2334 17.4136 10.887C17.7147 10.5393 18.2173 10.4905 18.5687 10.7881L22.4375 13.908C22.7895 14.2055 22.8397 14.7003 22.5379 15.048C22.3866 15.2453 22.1364 15.3442 21.8847 15.3442Z" />
            <path d="M21.4331 15.3442C21.1814 15.3442 20.9807 15.2453 20.8301 15.048C20.5283 14.7003 20.5784 14.2055 20.9305 13.908L24.7993 10.7881C25.15 10.4905 25.6539 10.5393 25.9544 10.887C26.2562 11.2334 26.206 11.7288 25.854 12.0257L21.935 15.1463C21.7844 15.2947 21.6345 15.3442 21.4331 15.3442Z" />
            <path d="M21.6345 15.245C21.1814 15.245 20.8301 14.8986 20.8301 14.4526V9.8958C20.8301 9.45048 21.1814 9.10345 21.6345 9.10345C22.0862 9.10345 22.4376 9.45048 22.4376 9.8958V14.4526C22.4376 14.8491 22.0862 15.245 21.6345 15.245Z" />
          </g>
        </svg>
        <span className="cg-logo-sparkle cg-logo-sparkle--1">✦</span>
        <span className="cg-logo-sparkle cg-logo-sparkle--2">✧</span>
        <span className="cg-logo-sparkle cg-logo-sparkle--3">✦</span>
      </span>
      <span className="cg-logo-word">
        <span className="cg-logo-our">Our</span>
        <span className="cg-logo-dreams">Dreams</span>
      </span>
    </Link>
  );
}