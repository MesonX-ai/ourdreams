# OurDreams — Corporate Gifting Platform (Phase 1)

A premium corporate-gifting platform: **Next.js static export + WordPress/WooCommerce
headless backend**, deployed to GoDaddy PHP hosting. This is Phase 1 — foundation, brand,
data layer, a complete 16-section homepage, and three reference pages that lock the quality bar.

## Stack

- **Next.js 14.2.15** (App Router, `output: 'export'`) · React 18.3 · TypeScript 5.5 (strict)
- **Tailwind CSS 3.4** + CSS custom-property brand tokens (`styles/tokens.css`)
- **framer-motion 11**, **@xyflow/react 12** (React Flow), **@tanstack/react-query 5**
- **zustand** (cart) · **zod** (validation) · **embla-carousel-react** · **lucide-react**
- Backend: WordPress + WooCommerce (Tier 1 build-time, Tier 2 Store API, Tier 3 PHP proxy)

## Three-tier data access

| Tier | When | Secrets | Where |
|---|---|---|---|
| 1 · Build | `next build` prerender | Woo consumer key/secret | `lib/wc/rest.ts` (server-only) |
| 2 · Runtime | browser, public | none | Woo Store API `/wp-json/wc/store/v1` |
| 3 · Runtime | browser → our PHP | server-side | `php/*.php` same origin |

Tier 1 secrets are guarded by `import "server-only"` + a runtime `typeof window` check +
a `NEXT_PUBLIC_` assertion, so they can never reach the client bundle.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # optional: add Woo keys to go live
npm run dev                        # next dev + local PHP proxy on :8000
# or
./start_local.sh --dev             # same, with a local PHP mail handler
```

Build & preview the static export:

```bash
npm run build
npm run preview                    # serves out/ at http://localhost:3000
```

## Scripts

| Command | What |
|---|---|
| `dev` | `next dev` with `/api/*` proxied to the local PHP server |
| `build` | `next build` → static `out/` (zero errors/warnings expected) |
| `preview` | serve `out/` locally |
| `lint` / `typecheck` | `next lint` / `tsc --noEmit` |
| `deploy:dry` | list the FTP file manifest (no upload) |
| `deploy` | mirror `out/` + `php/` to `public_html` via `basic-ftp` |

## Deploy

`scripts/deploy.mjs` uses `basic-ftp`, reading `FTP_HOST` / `FTP_USER` / `FTP_PASSWORD` from
env. It mirrors `out/` → `public_html/ourdreams.us` and `php/` → `public_html/ourdreams.us/api`,
copies `.htaccess` to the web root, and **never touches `wp/`**. FTP credentials are never
committed (see `.gitignore` and the security note below).

## Security notes

- `ftp-config.json` in the workspace holds plaintext FTP passwords — rotate it, move creds to
  env/CI, and keep it out of the repo. This project reads FTP creds from env only.
- `WC_CONSUMER_SECRET` is never `NEXT_PUBLIC_` (enforced in `lib/wc/rest.ts`).
- `.gitignore` excludes `.env*`, `out/`, `php/config.php`, and `ftp-config.json` from commit one.
- The static frontend never touches card data — payment is handed to Woo-hosted (or Stripe)
  Checkout, keeping the build out of PCI scope.

## What's in Phase 1

- 16-section homepage (hero, marquee, ReactFlow pipeline, bento, sticky showcase, workflows,
  live-price product carousel, occasions, stats, testimonials, awards, blog, pricing, CTA).
- Reference pages: `/what-we-offer/gift-automation/` (ReactFlow builder: drag nodes, validated
  edges, inspector, minimap, dry-run, JSON export/import, save), `/shop/` (faceted PLP),
  `/product/[slug]/` (PDP with volume pricing + live-price hydration).
- `lib/` data layer with zod-validated types and schema-accurate fixtures (swap to live Woo =
  config change).
- PHP proxy skeleton (`_bootstrap`, `config.sample`, `contact`, `demo-request`, `quote`,
  `newsletter`, `campaigns`, `auth`, `wc`, `upload`) with CORS allowlist, rate limit, honeypot,
  and JSON validation.
- `.htaccess`, deploy script, `start_local.sh`, this README.

## Phase 2–5 (not yet built)

Remaining feature/account/resource pages, live Woo key wiring, SEO (JSON-LD, sitemap, robots),
and a Lighthouse/a11y audit pass. See `PLAN.md` §12.

> Original OurDreams brand. No third-party trademarks, logos, or review scores are used;
> placeholder assets are visually named `placeholder-*` so they cannot ship by accident.
