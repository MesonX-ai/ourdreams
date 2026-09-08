# Corporate Gifts Bulk Upload Guide

Upload all 500+ corporate gift products to WooCommerce with a single command!

---

## Quick Start

### Option 1: Using Node.js/TypeScript (Recommended)

```bash
# Upload all products
npm run upload:gifts

# Test with just 5 products first
npm run upload:gifts:test

# Upload specific number (e.g., 50)
node -r ts-node/register scripts/upload-corporate-gifts.ts 50
```

### Option 2: Using PHP

```bash
# Upload all products
npm run upload:gifts:php

# Or run directly
php scripts/upload-corporate-gifts.php

# Test with first 5 products
php scripts/upload-corporate-gifts.php 5
```

---

## Prerequisites

### 1. WooCommerce Setup
- ✅ WooCommerce installed on your GoDaddy site
- ✅ REST API enabled
- ✅ API credentials generated (Consumer Key & Secret)

### 2. Environment Configuration

**Create `.env.local`** (never commit this file):
```bash
# Copy from template
cp .env.example .env.local

# Edit with your WooCommerce credentials
WOOCOMMERCE_CONSUMER_KEY=ck_your_key_here
WOOCOMMERCE_CONSUMER_SECRET=cs_your_secret_here
WC_API_URL=https://www.ourdreams.us/wp-json/wc/v3
```

### 3. Dependencies

Install if not already installed:
```bash
npm install
```

---

## What Gets Uploaded

Each product includes:

✅ **Title** - Product name (e.g., "Leather Portfolio Briefcase")  
✅ **Description** - Full product description  
✅ **SKU** - Unique identifier (e.g., "CORP-EXECUTIVE-GIFTS-001")  
✅ **Price** - Sale price + regular price  
✅ **Stock Quantity** - Inventory levels (10-50 units per product)  
✅ **Images** - Placeholder/actual product images  
✅ **Categories** - Organized by gift type  
✅ **Brand** - Corporate brand association  
✅ **Specifications** - Material, dimensions, color, customization options  
✅ **Meta Data** - Corporate gift flag, customizable status, MOQ  

### Sample Product Structure

```json
{
  "name": "Leather Portfolio Briefcase",
  "sku": "CORP-EXECUTIVE-GIFTS-001",
  "price": "149.99",
  "regular_price": "199.99",
  "stock_quantity": 15,
  "category": "Executive Gifts",
  "brand": "Marquee Brands",
  "description": "Premium leather briefcase for executives",
  "specification": {
    "Material": "Premium Leather",
    "Dimensions": "10\" × 6\" × 2\"",
    "Weight": "0.5 lbs",
    "Color": "Black",
    "Customizable": "Yes",
    "MOQ": "10 units"
  },
  "images": [
    {
      "src": "https://via.placeholder.com/500x500?text=Leather+Portfolio+Briefcase",
      "alt": "Leather Portfolio Briefcase"
    }
  ]
}
```

---

## Running the Upload

### Step 1: Test with Sample Products

```bash
# Test with 5 products first
npm run upload:gifts:test
```

**Expected Output:**
```
🚀 Corporate Gifts Bulk Upload Started
==================================================

📁 Preparing categories...
✓ Found category: Executive Gifts (ID: 15)
✓ Found category: Employee Recognition (ID: 16)
...

📦 Uploading 5 of 500 products

[001/005] Uploading: Leather Portfolio Briefcase (CORP-EXECUTIVE-GIFTS-001)... ✓ Created (ID: 412)
[002/005] Uploading: Executive Desk Organizer Set (CORP-EXECUTIVE-GIFTS-002)... ✓ Created (ID: 413)
[003/005] Uploading: Personalized Desk Clock (CORP-EXECUTIVE-GIFTS-003)... ✓ Created (ID: 414)
[004/005] Uploading: Premium Pen Gift Set (CORP-EXECUTIVE-GIFTS-004)... ✓ Created (ID: 415)
[005/005] Uploading: Executive Leather Notebook (CORP-EXECUTIVE-GIFTS-005)... ✓ Created (ID: 416)

==================================================
📊 Upload Summary
==================================================
Total Processed: 5
✓ Created: 5
✗ Failed: 0
⊘ Skipped: 0
Success Rate: 100.0%
==================================================
```

### Step 2: Upload All Products

Once you're confident the test works:

```bash
# Upload all 500+ products
npm run upload:gifts
```

**Expected Time**: ~5-10 minutes (200ms rate limit between requests)

### Step 3: Verify in WooCommerce Admin

1. Go to WordPress Admin → WooCommerce → Products
2. Should see all products listed
3. Filter by category to see organized products
4. Click a product to verify:
   - ✅ Title, description, price
   - ✅ SKU and stock quantity
   - ✅ Images
   - ✅ Categories and attributes
   - ✅ Meta data with specifications

---

## Troubleshooting

### Issue: "WOOCOMMERCE_CONSUMER_KEY not found"

**Solution**: Create `.env.local` file with credentials
```bash
cp .env.example .env.local
# Edit .env.local with your actual keys
```

### Issue: "Error: 401 Unauthorized"

**Solution**: Verify API credentials
```bash
# Test connection
curl -u "your_key:your_secret" "https://www.ourdreams.us/wp-json/wc/v3/products?per_page=1"

# Should return a product or empty array (not 401 error)
```

### Issue: "Failed: Invalid JSON"

**Solution**: Ensure credentials don't have special characters that need escaping

### Issue: "CORS error" or "SSL certificate error"

**Solution**: Use the PHP script instead (handles CORS and SSL via server)
```bash
npm run upload:gifts:php
```

### Issue: Upload hangs or times out

**Solution**: 
1. Kill the script (Ctrl+C)
2. Check how many products were created
3. Resume with a smaller batch:
   ```bash
   node -r ts-node/register scripts/upload-corporate-gifts.ts 50
   ```

### Issue: Duplicate products appear

**Solution**: Check SKUs in WooCommerce before re-running
- Modify script to check for existing SKUs
- Or delete failed products and retry

---

## Advanced Usage

### Upload with Custom Batch Size

```bash
# Upload in batches of 25
node -r ts-node/register scripts/upload-corporate-gifts.ts 25
```

### Monitor Progress

The script shows real-time progress:
```
[001/500] Uploading: Product Name... ✓ Created (ID: 412)
[002/500] Uploading: Product Name... ✗ Failed: API Error
[003/500] Uploading: Product Name... ✓ Created (ID: 413)
```

### Using with CI/CD

```yaml
# Example GitHub Actions workflow
- name: Upload Corporate Gifts
  env:
    WOOCOMMERCE_CONSUMER_KEY: ${{ secrets.WC_KEY }}
    WOOCOMMERCE_CONSUMER_SECRET: ${{ secrets.WC_SECRET }}
  run: npm run upload:gifts
```

---

## Script Features

### Node.js/TypeScript Version (`upload-corporate-gifts.ts`)
- ✅ Written in TypeScript
- ✅ Full type safety
- ✅ Uses native Node.js fetch API
- ✅ Supports dotenv for credentials
- ✅ Better error messages
- ✅ Automatic category creation

### PHP Version (`upload-corporate-gifts.php`)
- ✅ No JavaScript runtime required
- ✅ Uses cURL for reliable connection
- ✅ Can run on server or locally
- ✅ Good for server deployments
- ✅ Native PHP integration

---

## Product Categories (10 Total)

| Category | Products | Avg Price | Examples |
|----------|----------|-----------|----------|
| Executive Gifts | 12 | $90 | Briefcases, Organizers, Trophies |
| Employee Recognition | 8 | $25 | Awards, Plaques, Pins |
| Drinkware & Hydration | 8 | $16 | Mugs, Tumblers, Bottles |
| Tech Accessories | 8 | $29 | Chargers, Speakers, Adapters |
| Office Supplies | 8 | $14 | Pads, Pens, Organizers |
| Apparel & Textiles | 8 | $26 | Polos, Hoodies, Hats |
| Wellness & Lifestyle | 8 | $21 | Yoga Mats, Trackers, Pillows |
| Travel & Mobility | 8 | $16 | Tags, Organizers, Kits |
| Awards & Recognition | 8 | $47 | Trophies, Awards, Plaques |
| Eco-Friendly Gifts | 8 | $17 | Bamboo, Recycled, Jute |

**Total**: 500+ products

---

## Performance Notes

- **Upload Speed**: ~1-2 products per second (with rate limiting)
- **Total Time for 500 products**: ~5-10 minutes
- **API Calls**: 500+ POST requests (1 per product)
- **Rate Limit**: 200ms between requests (customizable)

---

## After Upload

### 1. Verify in Admin
```
WordPress Admin → WooCommerce → Products
```

### 2. Test Storefront
```
Visit: https://www.ourdreams.us/shop/catalog
Should show all corporate gift products
```

### 3. Test Locally
```bash
npm run dev
# Visit: http://localhost:3000/shop/catalog
```

### 4. Setup Images (Optional)

Replace placeholder images with actual images:
- Download images from Unsplash
- Upload to WooCommerce media library
- Update product images

---

## Next Steps

After uploading:

1. ✅ **Test the catalog**: Visit `/shop/catalog` to see products
2. ✅ **Configure shipping**: Set up shipping rules in WooCommerce
3. ✅ **Setup payments**: Configure payment gateways
4. ✅ **Customize images**: Replace placeholders with actual product images
5. ✅ **Add reviews**: Create sample reviews to boost engagement
6. ✅ **Enable customization**: Set up product customization options

---

## Troubleshooting Checklist

- [ ] `.env.local` created with credentials
- [ ] WooCommerce REST API enabled
- [ ] API credentials are valid (test with curl)
- [ ] PHP cURL extension enabled (for PHP script)
- [ ] Node.js v18+ installed (for TypeScript script)
- [ ] npm dependencies installed (`npm install`)
- [ ] Test upload works (`npm run upload:gifts:test`)
- [ ] Check WooCommerce admin for created products

---

## Support

If you encounter issues:

1. Check `.env.local` credentials are correct
2. Verify WooCommerce is online
3. Test API directly: 
   ```bash
   curl -u "key:secret" "https://www.ourdreams.us/wp-json/wc/v3/products"
   ```
4. Check server logs for errors
5. Try PHP script instead of Node.js (or vice versa)

---

**Ready to upload?** Run:
```bash
npm run upload:gifts:test
```

Then when satisfied:
```bash
npm run upload:gifts
```

Good luck! 🚀
