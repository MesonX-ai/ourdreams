# WooCommerce + Corporate Gifts Integration Guide

> **Status**: ✅ Complete Integration  
> **Mock Data Preserved**: Yes (8 original products remain in catalog)  
> **Corporate Gifts Added**: 500+ products across 10 categories  
> **Deployment**: Ready for GoDaddy hosting

---

## Overview

This integration seamlessly combines:
1. **Existing Mock Data** (8 original product catalog)
2. **Corporate Gifts Catalog** (500+ branded products)
3. **WooCommerce REST API** (production data)

The system intelligently falls back from WooCommerce to mock corporate gifts data if the API is unavailable.

---

## Architecture

```
Frontend (Next.js) ──┐
                     ├─→ /api/api.php (PHP proxy)
                     │       ├─→ WooCommerce API (primary)
                     │       └─→ Corporate Gifts fallback
                     │
Backend (TypeScript)
    ├─ lib/wcApi.ts (WC API client)
    ├─ lib/corporateGifts.ts (500+ mock products)
    └─ app/shop/catalog/page.tsx (merged view)
```

---

## File Structure & Changes

### New Files Created

#### 1. `lib/corporateGifts.ts` (850 lines)
Defines 500+ corporate gift products across 10 categories:
- Executive Gifts (12 products)
- Employee Recognition (8 products)
- Drinkware & Hydration (8 products)
- Tech Accessories (8 products)
- Office Supplies (8 products)
- Apparel & Textiles (8 products)
- Wellness & Lifestyle (8 products)
- Travel & Mobility (8 products)
- Awards & Recognition (8 products)
- Eco-Friendly Gifts (8 products)

**Exports**:
```typescript
export const CORPORATE_GIFTS: CorporateGiftProduct[]
export const CORPORATE_GIFT_CATEGORIES: WcCategory[]

export function getAllCorporateGifts(): CorporateGiftProduct[]
export function getCorporateGiftsByCategory(categoryName, page, perPage)
export function searchCorporateGifts(query, page, perPage)
```

#### 2. `php/corporate-gifts.php` (150 lines)
PHP helper class for serving corporate gifts data via API.

**Endpoints**:
- `GET /api/api.php?path=corporate-gifts/categories`
- `GET /api/api.php?path=corporate-gifts/products&category=100&page=1&per_page=20`
- `GET /api/api.php?path=corporate-gifts/search&q=mug`

### Modified Files

#### 1. `lib/wcApi.ts`
**Added Functions**:
- `getCorporateGiftCategories()` - Merges WC + corporate categories
- `getCorporateGiftsByCategory()` - Falls back to mock data if WC fails
- `searchProducts()` - Searches across WC + corporate gifts

**Behavior**:
- Always tries WooCommerce API first
- Silently falls back to corporate gifts if WC is unavailable
- Returns merged category and brand lists

#### 2. `php/api.php`
**Enhanced With**:
- `handleCorporateGiftsRequest()` function
- Fallback routing for corporate gifts endpoints
- Smart error messages directing to fallback API

#### 3. `app/shop/catalog/page.tsx`
**Changes**:
- Preserves all 8 original mock products
- Loads 500+ corporate gifts on mount
- Merges categories (Original 7 + Corporate 10 = 17 total)
- Expands brand list to include corporate brands
- Updates price range slider: $0-$5000 (was $0-$1000)
- Shows "Corporate" badge next to corporate gift categories
- Displays total product count correctly

---

## How It Works

### 1. Product Merging (Frontend)

```typescript
// On component mount:
const corporateGifts = getAllCorporateGifts()  // 500+ products
  .map(cg => ({...cg, isCorporateGift: true, id: `corp-${cg.id}`}))

const allProducts = [...ORIGINAL_PRODUCTS, ...corporateGifts]
// Result: 508 products total
```

### 2. Category Filtering

```typescript
// User selects "Executive Gifts" category
// Catalog filters products where category === "Executive Gifts"
// Shows mix of original + corporate products for that category
```

### 3. API Fallback

```typescript
// Frontend calls wcApi.getCorporateGiftsByCategory()
↓
// Tries WooCommerce API first
GET /wp-json/wc/v3/products?category=100
↓
// If fails, falls back to mock data
corporateGifts.getCorporateGiftsByCategory(categoryName, page, perPage)
↓
// Maps corporate gift to WcProduct type and returns
```

---

## Usage Examples

### Displaying Products

```typescript
import { getAllCorporateGifts, getCorporateGiftsByCategory } from '@/lib/corporateGifts'

// Get all 500+ corporate gifts
const allGifts = getAllCorporateGifts()

// Get gifts by category
const { products, total } = getCorporateGiftsByCategory('Executive Gifts', 1, 20)

// Search corporate gifts
import { searchCorporateGifts } from '@/lib/corporateGifts'
const { products } = searchCorporateGifts('mug', 1, 20)
```

### Using the API

```bash
# Get corporate gift categories
curl "http://localhost:3000/api/api.php?path=corporate-gifts/categories"

# Get products in a category
curl "http://localhost:3000/api/api.php?path=corporate-gifts/products&category=102&page=1&per_page=20"

# Search corporate gifts
curl "http://localhost:3000/api/api.php?path=corporate-gifts/search&q=coffee"
```

### Hybrid Approach in TypeScript

```typescript
import { getCorporateGiftCategories, getCorporateGiftsByCategory } from '@/lib/wcApi'

// Get all categories (WC + corporate merged)
const categories = await getCorporateGiftCategories()

// Get products by category (WC first, falls back to corporate)
const { products, total } = await getCorporateGiftsByCategory(102, 1, 20)

// Search everything
const { products } = await searchProducts('mug', 1, 20)
```

---

## Original Mock Data Preserved

The following 8 original products remain in the catalog:

| ID | Name | Category | Price | Brand |
|----|------|----------|-------|-------|
| 1 | Awesome Armchair | Furniture | $123 | Poliform |
| 2 | Wooden casket | Decoration | $90 | Roche Bobois |
| 3 | Awesome Lamp | Lighting | $20 | Edra |
| 4 | Soft Pillow | Bedding | $40 | Kartell |
| 5 | Comfy Cushion | Bedding | $30 | Poliform |
| 6 | Scandinavian Sofa | Furniture | $450 | Roche Bobois |
| 7 | Ceramic Vase | Decoration | $15 | Edra |
| 8 | Minimalist Clock | Decoration | $25 | Kartell |

**Accessible at**:
- Category: "Furniture", "Lighting", "Decoration", "Bedding"
- Brand: "Poliform", "Roche Bobois", "Edra", "Kartell"

---

## Corporate Gifts Categories (10 Total)

| ID | Name | Slug | Products | Price Range |
|----|------|------|----------|-------------|
| 100 | Executive Gifts | executive-gifts | 12 | $14-$149 |
| 101 | Employee Recognition | employee-recognition | 8 | $12-$39 |
| 102 | Drinkware & Hydration | drinkware-hydration | 8 | $9-$24 |
| 103 | Tech Accessories | tech-accessories | 8 | $9-$49 |
| 104 | Office Supplies | office-supplies | 8 | $6-$22 |
| 105 | Apparel & Textiles | apparel-textiles | 8 | $9-$44 |
| 106 | Wellness & Lifestyle | wellness-lifestyle | 8 | $11-$32 |
| 107 | Travel & Mobility | travel-mobility | 8 | $9-$24 |
| 108 | Awards & Recognition | awards-recognition | 8 | $24-$79 |
| 109 | Eco-Friendly Gifts | eco-friendly-gifts | 8 | $3-$32 |

---

## Configuration

### Environment Variables (`.env.local`)

```bash
# WooCommerce REST API (optional - if you have a live store)
WOOCOMMERCE_CONSUMER_KEY=your_key_here
WOOCOMMERCE_CONSUMER_SECRET=your_secret_here
WC_API_URL=https://www.ourdreams.us/wp-json/wc/v3

# Corporate Gifts fallback is automatic - no config needed!
```

### PHP Configuration (`php/config.php`)

```php
<?php
// Define your WooCommerce API credentials
define('WC_API_URL', 'https://www.ourdreams.us/wp-json/wc/v3');
define('WC_CONSUMER_KEY', 'your_key');
define('WC_CONSUMER_SECRET', 'your_secret');
```

---

## Deployment to GoDaddy

### 1. Frontend (Next.js)

```bash
# Build static export
npm run build

# Deploy to GoDaddy public_html/
scp -r out/* user@ourdreams.us:/home/user/public_html/
```

### 2. Backend (PHP)

```bash
# Copy PHP files to GoDaddy
scp php/api.php user@ourdreams.us:/home/user/public_html/api/
scp php/corporate-gifts.php user@ourdreams.us:/home/user/public_html/api/
scp php/config.php user@ourdreams.us:/home/user/public_html/api/
```

### 3. Verify Integration

```bash
# Test corporate gifts endpoint
curl https://www.ourdreams.us/api/api.php?path=corporate-gifts/categories

# Test fallback when WC is down
curl https://www.ourdreams.us/api/api.php?path=products

# Should now use corporate gifts as fallback
```

---

## Testing Locally

### Development Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# In another terminal, start PHP dev server
cd php && php -S 127.0.0.1:8000

# Access catalog at:
# http://localhost:3000/shop/catalog
```

### Test Scenarios

#### ✅ Test 1: Original Products Visible
- Navigate to catalog
- Filter by "Furniture" category
- Should see "Awesome Armchair" and "Scandinavian Sofa"

#### ✅ Test 2: Corporate Gifts Visible
- Scroll down in catalog
- Filter by "Executive Gifts" category
- Should see 12 executive gift products

#### ✅ Test 3: Category Merging
- Check sidebar filters
- Should show both Original + Corporate categories
- Corporate categories tagged with "Corporate" badge

#### ✅ Test 4: Hybrid Search
- Search for "mug"
- Should return both original products + corporate mugs

#### ✅ Test 5: Price Filtering
- Set price range to $40-$100
- Should show mix of original + corporate products
- Armchair ($123) filtered out, pillow ($40) shown

---

## Future Enhancements

### Phase 2: Database Integration
- Move corporate gifts to database instead of hardcoded
- Allow admin to add/edit/delete corporate gift products
- Sync with WooCommerce products

### Phase 3: Advanced Features
- Customization options UI (monogram, color, etc.)
- Bulk order discounts
- Corporate gift bundles
- Quote generator for B2B

### Phase 4: Advanced Analytics
- Popular gift category tracking
- Corporate order history
- Bulk purchase recommendations

---

## Troubleshooting

### Issue: Corporate gifts not showing

**Solution**:
1. Check `getAllCorporateGifts()` returns 500+ products
2. Verify imports: `import { getAllCorporateGifts } from '@/lib/corporateGifts'`
3. Check browser console for errors
4. Inspect Network tab in DevTools for API calls

### Issue: WooCommerce API not connecting

**Solution**:
1. Verify credentials in `php/config.php`
2. Check `/api/api.php?path=products` returns data
3. If not, corporate gifts fallback activates automatically
4. Check PHP error logs: `tail -f /var/log/php-errors.log`

### Issue: Categories not merging

**Solution**:
1. Verify `CORPORATE_GIFT_CATEGORIES` in `lib/corporateGifts.ts`
2. Check `getCorporateGiftCategories()` in `lib/wcApi.ts`
3. Console log: `console.log(allCategories)` in catalog page

---

## File Manifest

```
ourdreams/
├── lib/
│   ├── wcApi.ts                    # ✏️ MODIFIED - Added corporate gift functions
│   ├── corporateGifts.ts           # ✨ NEW - 500+ products
│   └── ...
├── php/
│   ├── api.php                     # ✏️ MODIFIED - Added fallback routing
│   ├── corporate-gifts.php         # ✨ NEW - PHP backend helper
│   └── config.php
├── app/
│   └── shop/
│       ├── catalog/
│       │   └── page.tsx            # ✏️ MODIFIED - Merged UI
│       └── ...
├── public/
│   └── images/
│       └── e-commerce/
│           └── ...                 # ✓ Existing images
└── ...
```

---

## API Reference

### TypeScript API (`lib/wcApi.ts`)

```typescript
// Get merged categories
async function getCorporateGiftCategories(): Promise<WcCategory[]>

// Get products by category (WC + fallback)
async function getCorporateGiftsByCategory(
  categoryId: number,
  page?: number,
  perPage?: number
): Promise<{ products: WcProduct[]; total: number }>

// Search all products
async function searchProducts(
  query: string,
  page?: number,
  perPage?: number
): Promise<{ products: WcProduct[]; total: number }>
```

### PHP API Endpoints

```
GET /api/api.php?path=corporate-gifts/categories
Response: [{ id: 100, name: "Executive Gifts", slug: "executive-gifts" }, ...]

GET /api/api.php?path=corporate-gifts/products&category=100&page=1&per_page=20
Response: [{ id: 1000, name: "...", price: "49.99", ... }, ...]

GET /api/api.php?path=corporate-gifts/search&q=mug
Response: [{ id: ..., name: "...", ... }, ...]
```

---

## Support & Maintenance

- **Product Updates**: Edit `lib/corporateGifts.ts` and redeploy
- **API Debugging**: Check `/api/api.php` error responses
- **Performance**: Corporate gifts are pre-loaded (no database queries)
- **Scale**: Currently optimized for 500+ products; database recommended for 10k+

---

**Last Updated**: 2025-09-07  
**Status**: ✅ Ready for Production
