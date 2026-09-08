# Corporate Gifts + WooCommerce Quick Start

## What Was Added

✅ **500+ Corporate Gift Products** - Ready to use in catalog  
✅ **10 Gift Categories** - Executive, Employee Recognition, Tech, Wellness, etc.  
✅ **Preserved Original Mock Data** - Your 8 existing products are still there  
✅ **Automatic Fallback** - Corporate gifts used if WooCommerce API is down  
✅ **Seamless Merge** - Products, categories, and filters all combined  

---

## Quick Test

### 1. View All Products
```bash
npm run dev
# Visit: http://localhost:3000/shop/catalog
```

**Expected**: You'll see 508 total products (8 original + 500 corporate)

### 2. Filter by Corporate Gift Category
- Click "Executive Gifts" in sidebar
- See 12 premium executive gift products
- Products show with prices $14-$149

### 3. Filter by Original Category
- Click "Furniture" in sidebar
- See original Armchair + Sofa
- Mix of original and anything else in that category

### 4. Search
- Type "mug" in search
- Results show coffee mugs from corporate collection
- Try "sofa", "lamp", "gifts"

---

## Using in Your Code

### Get Corporate Gifts

```typescript
import { getAllCorporateGifts } from '@/lib/corporateGifts'

const gifts = getAllCorporateGifts()
console.log(`Total products: ${gifts.length}`)  // 500+
```

### Get by Category

```typescript
import { getCorporateGiftsByCategory } from '@/lib/corporateGifts'

const { products, total } = getCorporateGiftsByCategory('Executive Gifts', 1, 20)
console.log(`Showing ${products.length} of ${total}`)
```

### Search

```typescript
import { searchCorporateGifts } from '@/lib/corporateGifts'

const { products } = searchCorporateGifts('coffee', 1, 20)
products.forEach(p => console.log(p.name))  // Corporate Coffee Mug, etc.
```

### Hybrid WooCommerce + Corporate

```typescript
import { getCorporateGiftsByCategory, searchProducts } from '@/lib/wcApi'

// Always tries WooCommerce first, falls back to corporate gifts
const result = await getCorporateGiftsByCategory(102, 1, 20)

// Search both WC + corporate
const search = await searchProducts('mug', 1, 20)
```

---

## API Endpoints (PHP)

### Get Categories
```bash
curl "http://localhost:3000/api/api.php?path=corporate-gifts/categories"
```

**Response**:
```json
[
  {"id": 100, "name": "Executive Gifts", "slug": "executive-gifts"},
  {"id": 101, "name": "Employee Recognition", "slug": "employee-recognition"},
  ...
]
```

### Get Products in Category
```bash
curl "http://localhost:3000/api/api.php?path=corporate-gifts/products?category=100&page=1&per_page=5"
```

**Response**:
```json
[
  {
    "id": 1001,
    "name": "Leather Portfolio Briefcase",
    "sku": "CORP-EXECUTIVE-GIFTS-001",
    "price": "149.99",
    "regular_price": "199.99"
  },
  ...
]
```

### Search
```bash
curl "http://localhost:3000/api/api.php?path=corporate-gifts/search?q=mug"
```

---

## File Structure

### New Files
- `lib/corporateGifts.ts` - 500+ product definitions
- `php/corporate-gifts.php` - API backend
- `WOOCOMMERCE_CORPORATE_GIFTS_INTEGRATION.md` - Full docs

### Modified Files
- `lib/wcApi.ts` - Added fallback functions
- `php/api.php` - Added routing logic
- `app/shop/catalog/page.tsx` - Merged UI

### Unchanged
- Original 8 mock products preserved
- All styling intact
- Your deploy scripts work as-is

---

## Original Products (Still Here!)

| Product | Category | Price |
|---------|----------|-------|
| Awesome Armchair | Furniture | $123 |
| Wooden casket | Decoration | $90 |
| Awesome Lamp | Lighting | $20 |
| Soft Pillow | Bedding | $40 |
| Comfy Cushion | Bedding | $30 |
| Scandinavian Sofa | Furniture | $450 |
| Ceramic Vase | Decoration | $15 |
| Minimalist Clock | Decoration | $25 |

---

## New Corporate Gift Categories

1. **Executive Gifts** ($14-$149)
   - Leather briefcases, desk organizers, crystal paperweights

2. **Employee Recognition** ($12-$39)
   - Award plaques, achievement trophies, service pins

3. **Drinkware & Hydration** ($9-$24)
   - Custom mugs, thermal tumblers, water bottles

4. **Tech Accessories** ($9-$49)
   - Wireless chargers, power banks, Bluetooth speakers

5. **Office Supplies** ($6-$22)
   - Desk pads, pen sets, organizers, calendars

6. **Apparel & Textiles** ($9-$44)
   - Polo shirts, hats, hoodies, t-shirts

7. **Wellness & Lifestyle** ($11-$32)
   - Yoga mats, fitness trackers, meditation pillows

8. **Travel & Mobility** ($9-$24)
   - Luggage tags, travel organizers, toiletry bags

9. **Awards & Recognition** ($24-$79)
   - Custom trophies, crystal awards, plaques

10. **Eco-Friendly Gifts** ($3-$32)
    - Bamboo organizers, recycled notebooks, jute bags

---

## Deploy to Production

### 1. Build & Deploy Frontend
```bash
npm run build
scp -r out/* user@host:/path/to/public_html/
```

### 2. Deploy Backend
```bash
scp php/api.php user@host:/path/to/api/
scp php/corporate-gifts.php user@host:/path/to/api/
```

### 3. Verify
```bash
curl https://yourdomain.com/api/api.php?path=corporate-gifts/categories
# Should return category list
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Corporate gifts not showing | Clear cache, check browser console |
| WooCommerce API down | Automatic fallback to corporate gifts |
| Categories not merged | Refresh page, check `allCategories` in console |
| Search not working | Verify `/api/api.php?path=corporate-gifts/search` endpoint |
| Images not loading | Check Unsplash URLs are accessible |

---

## What's Next?

- Add to cart functionality
- Wishlist for corporate gifts
- Bulk order pricing
- Customization options (monogram, etc.)
- Corporate account features

---

**Questions?** Check `WOOCOMMERCE_CORPORATE_GIFTS_INTEGRATION.md` for full documentation.
