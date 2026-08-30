import { useId } from "react";

/**
 * Dreamy animated wave divider between homepage sections — a flowing gold
 * filament with twinkling stars. Purely decorative.
 */
export function CgSectionDivider({ flip = false }: { flip?: boolean }) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gid = `dw-${raw}`;
  return (
    <div
      aria-hidden="true"
      className={`cg-divider-wave${flip ? " cg-divider-wave--flip" : ""}`}
    >
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="0.25" stopColor="#d4af37" stopOpacity="0.55" />
            <stop offset="0.5" stopColor="#ffd700" stopOpacity="0.9" />
            <stop offset="0.75" stopColor="#d4af37" stopOpacity="0.55" />
            <stop offset="1" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="cg-divider-path"
          d="M0,45 C240,90 480,0 720,45 C960,90 1200,0 1440,45"
          stroke={`url(#${gid})`}
          strokeWidth="1.5"
        />
        <circle className="cg-divider-star" cx="720" cy="45" r="3" fill="#ffd700" />
        <circle className="cg-divider-star cg-divider-star--2" cx="360" cy="38" r="2" fill="#d4af37" />
        <circle className="cg-divider-star cg-divider-star--3" cx="1080" cy="52" r="2" fill="#d4af37" />
      </svg>
    </div>
  );
}