# OurDreams — Corporate Gifting Platform

Rebuild of the `corporategift.com` information architecture and feature set as an original
**OurDreams**-branded product: Next.js static export + WordPress/WooCommerce headless backend,
deployed to GoDaddy PHP hosting.

---

## 0. Scope & content boundary

We replicate **structure, page inventory, UX patterns, and feature set**. We do **not** copy
their protected assets:

| Replicated | Recreated as original |
|---|---|
| Route map / IA / nav taxonomy | All marketing copy (written fresh for OurDreams) |
| Page section ordering & layout intent | Logo, wordmark, palette, typography |
| Feature set (eGifting, automation, swag closet, multi-recipient send, insights) | Photography → licensed/placeholder assets |
| Commerce flows (PLP, PDP, cart, checkout, redemption) | Client logos → neutral placeholders, labelled as such |
| Component patterns (mega-menu, bento grid, sticky-scroll showcase) | Testimonials → clearly-marked sample content |
| | Award badges / G2 ratings → own design, no third-party marks |

**Non-negotiable:** no real third-party trademarks (SAP, Disney, Deloitte, G2, TrustPilot) and no
fabricated review scores. Placeholders are visually named `placeholder-client-*` so they are
impossible to ship by accident.

---

## 1. The central architectural problem

`output: 'export'` produces **static files with no server**. But WooCommerce REST v3 authenticates
with a `consumer_key` / `consumer_secret`. Those must *never* reach the browser — anything prefixed
`NEXT_PUBLIC_` is compiled into the JS bundle and is world-readable.

GoDaddy runs PHP. That is the asset here, not the limitation. Three-tier data access:

```
┌─ TIER 1 · BUILD TIME ────────────────────────────────────────────┐
│ Node during `next build` — secrets safe, never shipped           │
│ WooCommerce REST v3  (consumer key + secret)                    │
│ → products, categories, collections, WP posts/pages/ACF         │
│ → generateStaticParams() → prerendered HTML for every route     │
└──────────────────────────────────────────────────────────────────┘
┌─ TIER 2 · RUNTIME, PUBLIC ───────────────────────────────────────┐
│ Browser → WooCommerce Store API  /wp-json/wc/store/v1/          │
│ NO KEYS REQUIRED — cart-token + nonce based, built into Woo     │
│ → cart add/update/remove, live price & stock, search, filters   │
└──────────────────────────────────────────────────────────────────┘
┌─ TIER 3 · RUNTIME, PRIVILEGED ───────────────────────────────────┐
│ Browser → our own PHP on GoDaddy → Woo/WP (secrets server-side) │
│ → auth (JWT), orders, contacts, campaigns, budgets, approvals   │
│ → form handlers (demo, quote, contact, newsletter)              │
└──────────────────────────────────────────────────────────────────┘
```

Tier 1 gives SEO + instant loads. Tier 2 keeps commerce live despite static HTML (prices/stock
hydrate on mount, so a stale build never sells at a wrong price). Tier 3 keeps secrets off the client.

### Static-export constraints and mitigations

| Lost | Mitigation |
|---|---|
| SSR / ISR | Build-time prerender + client hydration for volatile data; WP webhook → CI rebuild |
| API routes | PHP endpoints in `/api/*.php`, same origin in production |
| `rewrites()` / middleware | Dev-only proxy via `next dev` rewrites; production is same-origin so no proxy needed |
| `next/image` optimization | `images.unoptimized: true`; consume WordPress's own generated `srcset` sizes + WebP/AVIF |
| Dynamic `[slug]` at runtime | All slugs known at build; genuine 404 → `.htaccess ErrorDocument` |

**Same-origin is a hard requirement.** WordPress must serve `/wp-json` on the *same* host as the
static frontend, otherwise Store API cart cookies get blocked by third-party-cookie rules and CORS
credentials. Recommended layout on GoDaddy:

```
public_html/
├─ index.html, 404.html, _next/, …   ← Next.js `out/` (frontend)
├─ api/                              ← our PHP proxy (Tier 3)
└─ wp/                               ← WordPress + WooCommerce (/wp-json lives here)
```
with `.htaccess` mapping `/wp-json` → `/wp/wp-json`.

---

## 2. Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 14.2.x**, App Router, `output: 'export'` | Matches existing `mesonsoft` project (14.2.15/React 18) |
| Language | TypeScript 5.5, `strict` | |
| UI | React 18.3 | |
| Styling | **Tailwind CSS 3.4** + CSS custom properties for theme tokens | Stable with Next 14; tokens keep rebranding to one file |
| Motion | **framer-motion 11** | Scroll reveal, kinetic type, shared-layout transitions |
| Node graphs | **@xyflow/react 12** (React Flow) | Already a dependency in `mesonsoft` |
| Client data | **@tanstack/react-query 5** | Cache/retry/dedupe for Store API |
| Cart state | **zustand** + `persist` | Cart token + optimistic lines in localStorage |
| Validation | **zod** | Shared schema for forms, mirrored in PHP |
| Carousel | **embla-carousel-react** | Lightweight, accessible |
| Icons | **lucide-react** | |
| Backend | WordPress + WooCommerce (live, keys supplied) | |
| Deploy | `out/` → FTP → `public_html` | Matches existing FTP workflow |

---

## 3. Brand: OurDreams

Positioning: *premium, warm, human — the opposite of transactional swag.* Distinctly not the
lavender/violet SaaS look of the reference site.

```
Ink        #12131A   near-black base, headings
Plum       #2A1B3D   deep secondary surface
Champagne  #E8C87E   primary accent (CTAs, highlights)
Gold       #C9A227   accent hover / borders
Blush      #F5E6E0   warm tint surface
Cream      #FBF7F2   page background
Sage       #6F8F7A   success / eco (ZeroWaste)
```

- **Display:** high-contrast serif (`Instrument Serif` / `Fraunces`) — luxury gifting cue
- **Body:** `Inter` — neutral, legible at small sizes
- Loaded via `next/font/google` (self-hosted at build; works under static export)
- Tokens live in `styles/tokens.css` + `tailwind.config.ts`. Rebrand = edit tokens only.

Deliverables: SVG wordmark + monogram (light/dark), favicon set, OG image template.

---

## 4. Route map (~45 patterns)

### Marketing
```
/                                    Showcase homepage
/what-we-offer/                      Hub
/what-we-offer/marketplace/          Thousands of gifts, one vendor of record
/what-we-offer/multi-recipient-sending/
/what-we-offer/virtual-swag-closet/
/what-we-offer/gift-automation/      ← ReactFlow builder demo
/what-we-offer/team-gifting/
/what-we-offer/company-store/
/what-we-offer/egifting/
/what-we-offer/personal-touches/
/what-we-offer/insights-reporting/
/what-we-offer/seamless-integrations/  ← ReactFlow integrations map
/how-it-works/    /pricing/    /individual-plan/
/request-demo/    /about-us/   /contact-us/
```

### Commerce
```
/shop/                               PLP root + faceted filtering
/shop/[category]/                    Category PLP
/shop/[category]/[subcategory]/
/product/[slug]/                     PDP — variations, branding upload, qty tiers
/occasions/          /occasions/[slug]/
/collections/        /collections/[slug]/
/egift-collections/  /egift-collections/[slug]/
/brands/             /brands/[slug]/
/swag/               /gift-cards/     /search/
/cart/
/checkout/                           Multi-recipient checkout
/checkout/confirmation/
/wishlist/                           Collaborative
```

### Recipient eGift redemption (no auth — token in URL)
```
/redeem/[token]/            Branded landing, choose from collection
/redeem/[token]/confirm/    Address + size capture
/redeem/[token]/thank-you/  Thank-you note back to sender
```

### Account / dashboard (client-rendered shell, Tier 3 data)
```
/login/  /register/  /forgot-password/
/account/                    Overview
/account/orders/  /account/orders/[id]/
/account/contacts/  /account/addresses/
/account/campaigns/          Automation list
/account/campaigns/builder/  ← ReactFlow gift-automation builder
/account/swag-closet/        Inventory management
/account/insights/           Engagement reporting
/account/budgets/  /account/team/  /account/approvals/  /account/settings/
```

### Resources (WordPress-driven)
```
/blog/  /blog/[slug]/  /blog/category/[slug]/
/resources/  /guides/[slug]/
/case-studies/  /case-studies/[slug]/
/faq/  /integrations/  /integrations/[slug]/
```

### Legal / utility
```
/privacy-policy/  /terms/  /accessibility/  /shipping-returns/  /cookie-policy/
/404  /500  /sitemap.xml  /robots.txt
```

---

## 5. Homepage (the showcase piece)

Sixteen sections, each a self-contained component reading from ACF so content stays editable.

1. **Announcement bar** — dismissible, seasonal
2. **Sticky glass nav** — three mega-menus (What we offer / Shop / Resources), phone, account, `Talk to sales`. Scroll-shrink, full a11y keyboard nav, mobile drawer
3. **Hero** — asymmetric split; animated aurora-mesh canvas (CSS-only, GPU-cheap); word-level stagger headline; video-play badge; dual CTA; trust chip
4. **Client marquee** — dual-row opposing infinite scroll, `prefers-reduced-motion` aware
5. **★ ReactFlow "How gifting works"** — auto-playing pipeline: `Trigger → Audience → Gift/Collection → Personalize → Send → Track`. Nodes pop in on scroll, edges animate in sequence, custom node components in brand style, `nodesDraggable={false}` for the marketing view
6. **Bento feature grid** — 6 asymmetric cards → feature pages, image/video reveal on hover
7. **"Engage recipients"** — sticky-scroll: pinned device mockup, copy scrolls, mockup crossfades per step (eGifting / personal touches / insights)
8. **"Streamline workflows"** — alternating split rows, numbered, parallax art
9. **Product spotlight** — live WooCommerce carousel from a curated category, real prices via Tier 2
10. **Occasions grid** — 8 tiles → `/occasions/[slug]/`
11. **Stats band** — count-up on viewport entry
12. **Testimonials** — Embla carousel, sample content, honestly labelled
13. **Awards row** — original badge design
14. **Blog cards** — 3 latest from WordPress
15. **Pricing teaser** — 3 tiers → `/pricing/`
16. **CTA + footer** — demo form (PHP handler) + newsletter; mega footer with sitemap, socials, payment marks

**Quality bar:** Lighthouse ≥ 95 across the board · LCP < 2.5s · CLS < 0.05 · WCAG 2.2 AA
(contrast, focus-visible, skip-link, landmarks, reduced-motion) · zero layout shift from fonts
(`display: swap` + size-adjust fallbacks).

---

## 6. ReactFlow surfaces

### A. Homepage pipeline (§5.5)
Read-only, auto-animating, decorative-but-accurate. Static fallback image under reduced-motion.

### B. Gift Automation Builder — `/account/campaigns/builder/`
The real differentiator. Drag-and-drop canvas compiling to a JSON campaign definition.

Custom node types:
| Node | Purpose |
|---|---|
| `TriggerNode` | New hire · Birthday · Work anniversary · Deal closed · Manual · Webhook |
| `AudienceNode` | Contact list / segment / CSV import |
| `ConditionNode` | Branch on tenure, region, department, deal size |
| `GiftNode` | Single product, or eGift collection with budget cap |
| `BudgetNode` | Per-recipient cap, cost centre allocation |
| `ApprovalNode` | Approver, threshold, escalation |
| `DelayNode` | Wait N days / until date |
| `SendNode` | Email · link · physical ship |
| `TrackNode` | Terminal — engagement metrics |

Features: typed handles with connection validation (no invalid edges), palette sidebar with drag-to-add,
node inspector panel, undo/redo, minimap + controls, autosave to WP CPT `od_campaign` via Tier 3,
dry-run preview computing projected cost and recipient count, JSON import/export.

### C. Integrations map — `/what-we-offer/seamless-integrations/`
Radial graph: HRIS / CRM / Slack / Calendar sources → OurDreams engine → outputs. Clickable nodes
open a detail drawer. Doubles as navigation to `/integrations/[slug]/`.

---

## 7. Data layer

```
lib/
├─ wc/
│  ├─ rest.ts          Tier 1 — server-only, asserts !NEXT_PUBLIC, throws if imported client-side
│  ├─ store.ts         Tier 2 — Store API client, cart token handling
│  ├─ proxy.ts         Tier 3 — typed fetch → /api/*.php
│  ├─ types.ts         WooCommerce product/order/cart types
│  └─ map.ts           Woo payload → view models (decouples UI from Woo schema)
├─ wp/
│  ├─ rest.ts          Posts, pages, ACF, CPTs
│  └─ types.ts
├─ cart/store.ts       zustand + persist
└─ campaign/schema.ts  zod schema for the automation graph
```

`rest.ts` carries a build-time guard so a stray client import fails the build rather than leaking
the secret. Every network response is parsed through zod before reaching a component.

**Required from you:** `WP_BASE_URL`, `WC_CONSUMER_KEY`, `WC_CONSUMER_SECRET` in `.env.local`
(gitignored). Until they arrive, a `lib/wc/fixtures/` fallback with schema-accurate sample products
keeps the build green — same types, so switching over is a config change, not a rewrite.

---

## 8. PHP proxy (`php/` → deploys to `public_html/api/`)

```
api/
├─ config.php          gitignored; real secrets. config.sample.php is committed
├─ _bootstrap.php      CORS allowlist, JSON I/O, rate limit, error shape
├─ auth.php            JWT issue / refresh / revoke against WP
├─ wc.php              Whitelisted server-signed Woo REST reads (orders, customer)
├─ campaigns.php       CRUD for od_campaign
├─ demo-request.php    → WP CPT + notification email
├─ quote.php  contact.php  newsletter.php
└─ upload.php          Logo/artwork upload for branding, MIME+size validated
```

Hardening on every endpoint: strict method check, JSON schema validation mirroring the zod schemas,
origin allowlist, per-IP rate limiting, honeypot + timing check on public forms, action allowlisting
in `wc.php` (never proxy arbitrary paths), `error_reporting` off in production with logging on.

---

## 9. WordPress configuration (documented in `docs/wordpress-setup.md`)

**Plugins:** WooCommerce · WooCommerce Blocks (Store API) · JWT Authentication for WP-API ·
ACF Pro (flexible content for page sections) · Custom Post Type UI

**CPTs:** `od_case_study` · `od_guide` · `od_integration` · `od_collection` · `od_occasion` ·
`od_campaign` (private)

**ACF groups:** Homepage sections (repeater-driven so section order is editable) · Feature page
template · Pricing tiers · Testimonials · Occasions

**Woo taxonomy:** product categories mirroring `/shop/` tree; global attributes for
`budget-tier`, `occasion`, `branding-available`, `lead-time`, `ships-to`

**Store API CORS:** allow the frontend origin with credentials; same-origin deployment makes this a
no-op, which is why §1 recommends it.

**Checkout & PCI:** the static frontend must not touch card data. Multi-recipient cart is assembled
client-side, then handed to **Woo-hosted checkout** or **Stripe Checkout** for payment. Keeps the
build out of PCI scope entirely.

---

## 10. Build & deploy

**`next.config.mjs`**
```js
output: 'export',
trailingSlash: true,          // /pricing/ → /pricing/index.html on Apache
images: { unoptimized: true },
basePath / assetPrefix        // set only if serving from a subdirectory
```

**`.htaccess`** (committed, copied into `out/`): force HTTPS + canonical host · `ErrorDocument 404
/404.html` · `/wp-json` → `/wp/wp-json` · gzip/deflate · `Cache-Control: immutable` for
`/_next/static`, short TTL for HTML · security headers (HSTS, X-Content-Type-Options, Referrer-Policy,
Permissions-Policy, CSP with explicit WP origin) · block `.env`, `*.md`, `config.php`

**Deploy:** `scripts/deploy.mjs` using `basic-ftp` — reads `FTP_HOST` / `FTP_USER` / `FTP_PASSWORD`
from env, mirrors `out/` + `php/`, deletes stale files, never touches `wp/`. Dry-run flag by default.

**Content freshness:** WP webhook on product/post save → CI rebuild + redeploy. Volatile data
(price, stock, cart) is Tier 2 client-side, so a stale build is never *wrong*, only slightly behind
on copy.

**Scripts:** `dev` · `build` · `preview` (serve `out/`) · `lint` · `typecheck` · `deploy` · `deploy:dry`

---

## 11. Security notes — action needed

1. **`../ftp-config.json` holds plaintext FTP passwords, one shared across seven sites.** It sits in
   the workspace and would land in any repo created here. Recommend: rotate that password, move
   credentials to `.env.local` / CI secrets, and gitignore the file. This project will read FTP
   creds from env only and will never contain them.
2. `WC_CONSUMER_SECRET` is **never** `NEXT_PUBLIC_`. Enforced by the guard in §7 and a lint rule.
3. `.gitignore` from commit one: `.env*`, `out/`, `php/config.php`, `ftp-config.json`.
4. Restrict the Woo API key to **Read** unless order creation genuinely needs Write.

---

## 12. Phasing

**Phase 1 — foundation + homepage (this pass)**
Scaffold, config, Tailwind + tokens, brand assets, `lib/` data layer with types + fixtures, PHP
skeleton, nav + mega-menus + footer, **complete homepage (all 16 sections)**, plus three reference
pages to lock the quality bar: `/what-we-offer/gift-automation/` (with ReactFlow), `/shop/` (PLP),
`/product/[slug]/` (PDP). Ships with `.htaccess`, deploy script, README.
→ *You review, then remaining pages are produced to the established pattern.*

**Phase 2** — remaining 9 feature pages, `/pricing/`, `/individual-plan/`, `/request-demo/`,
`/about-us/`, `/contact-us/`, `/how-it-works/`, legal pages

**Phase 3** — commerce depth: categories, occasions, collections, eGift collections, brands, search,
cart, multi-recipient checkout, redemption flow

**Phase 4** — dashboard: automation builder, swag closet, insights, team/budgets/approvals, auth

**Phase 5** — resources/blog from WP, live key wiring, SEO (metadata, JSON-LD Product/Organization/
BreadcrumbList, sitemap, robots), a11y + Lighthouse audit, deploy

---

## 13. Open items

| # | Item | Default if unanswered |
|---|---|---|
| 1 | `WP_BASE_URL` + Woo consumer key/secret | Build against fixtures; wire in Phase 5 |
| 2 | Root domain or subdirectory? (affects `basePath`) | Assume **root domain**; single-line change if not |
| 3 | Existing OurDreams logo/brand assets? | Create original per §3 |
| 4 | Payment: Woo-hosted checkout vs Stripe Checkout | Woo-hosted (fewer moving parts) |
| 5 | Is WordPress already installed, and at which path? | Assume `public_html/wp/` per §1 |

---

## 14. Definition of done — Phase 1

- [ ] `npm run build` produces `out/` with zero errors/warnings
- [ ] `npm run typecheck` and `npm run lint` clean
- [ ] Homepage renders all 16 sections, fully responsive 360px → 2560px
- [ ] ReactFlow pipeline animates on scroll; static fallback under `prefers-reduced-motion`
- [ ] Mega-menus fully keyboard navigable; visible focus throughout
- [ ] Lighthouse ≥ 95 performance / ≥ 95 a11y on the built output
- [ ] No secret in any client bundle (verified by grepping `out/`)
- [ ] `/shop/` and `/product/[slug]/` render from the data layer with live-price hydration
- [ ] `npm run deploy:dry` reports the correct file manifest
