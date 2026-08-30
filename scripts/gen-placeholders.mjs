// Generates lightweight SVG placeholders so the build never references
// third-party/copyrighted assets. Run with: node scripts/gen-placeholders.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
mkdirSync(root, { recursive: true });

const PALETTE = {
  ink: "#12131A",
  plum: "#2A1B3D",
  champagne: "#E8C87E",
  gold: "#C9A227",
  blush: "#F5E6E0",
  cream: "#FBF7F2",
  sage: "#6F8F7A",
};

function tile({ w, h, bg, fg, label, sub }) {
  const id = "g" + Math.random().toString(36).slice(2, 8);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg}"/>
      <stop offset="1" stop-color="${fg}" stop-opacity="0.55"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${id})"/>
  <circle cx="${w * 0.78}" cy="${h * 0.22}" r="${Math.min(w, h) * 0.18}" fill="${PALETTE.champagne}" opacity="0.35"/>
  <text x="50%" y="50%" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(Math.min(w, h) * 0.09)}" fill="${PALETTE.cream}" opacity="0.92">${label}</text>
  ${sub ? `<text x="50%" y="${h * 0.5 + Math.min(w, h) * 0.1}" text-anchor="middle" font-family="Inter, sans-serif" font-size="${Math.round(Math.min(w, h) * 0.045)}" fill="${PALETTE.cream}" opacity="0.7">${sub}</text>` : ""}
</svg>`;
}

const productNames = {
  101: "Aurora Smart Mug",
  102: "Linen Commuter Tote",
  103: "Terra Diffuser Set",
  104: "Heirloom Notebook",
  105: "ZeroWaste Desk Kit",
  106: "Champagne Gift Box",
  107: "Slate Charge Pad",
  108: "Bloom Tea Collection",
};

for (const [id, name] of Object.entries(productNames)) {
  writeFileSync(join(root, `placeholder-product-${id}.svg`), tile({ w: 800, h: 800, bg: PALETTE.plum, fg: PALETTE.ink, label: name }));
}
writeFileSync(join(root, "placeholder-product.svg"), tile({ w: 800, h: 800, bg: PALETTE.plum, fg: PALETTE.ink, label: "OurDreams" }));

for (let i = 1; i <= 4; i++) {
  writeFileSync(join(root, `placeholder-collection-${i}.svg`), tile({ w: 1000, h: 700, bg: PALETTE.blush, fg: PALETTE.plum, label: "Collection" }));
}
for (let i = 1; i <= 3; i++) {
  writeFileSync(join(root, `placeholder-post-${i}.svg`), tile({ w: 1000, h: 600, bg: PALETTE.cream, fg: PALETTE.gold, label: "Journal" }));
  writeFileSync(join(root, `placeholder-case-${i}.svg`), tile({ w: 1000, h: 600, bg: PALETTE.plum, fg: PALETTE.ink, label: "Case study" }));
}
for (let i = 1; i <= 2; i++) {
  writeFileSync(join(root, `placeholder-guide-${i}.svg`), tile({ w: 1000, h: 600, bg: PALETTE.sage, fg: PALETTE.ink, label: "Guide" }));
}

// Neutral client-logo placeholders — visually named so they can't ship as real marks.
const clients = ["northwind", "lumen", "atlas", "meridian", "harbor", "cedar"];
for (const c of clients) {
  writeFileSync(
    join(root, `placeholder-client-${c}.svg`),
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="48" viewBox="0 0 160 48" role="img" aria-label="Placeholder client logo">
  <rect width="160" height="48" rx="8" fill="${PALETTE.ink}" opacity="0.06"/>
  <text x="50%" y="52%" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" letter-spacing="1" fill="${PALETTE.ink}" opacity="0.5">${c}</text>
</svg>`,
  );
}

// Favicon + monogram
writeFileSync(
  join(root, "favicon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${PALETTE.ink}"/><path d="M20 44V20l12 14 12-14v24" fill="none" stroke="${PALETTE.champagne}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
);

// OG image template
writeFileSync(
  join(root, "og.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="OurDreams"><rect width="1200" height="630" fill="${PALETTE.cream}"/><rect width="1200" height="630" fill="${PALETTE.plum}" opacity="0.05"/><text x="80" y="300" font-family="Georgia, serif" font-size="92" fill="${PALETTE.ink}">OurDreams</text><text x="80" y="370" font-family="Inter, sans-serif" font-size="34" fill="${PALETTE.gold}">Premium corporate gifting, made human.</text></svg>`,
);

console.log("Placeholder assets written to public/");
