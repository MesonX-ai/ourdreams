# Upload Scripts Directory

Quick scripts for bulk uploading corporate gift products to WooCommerce.

## Available Scripts

### 1. TypeScript/Node.js Version
**File**: `upload-corporate-gifts.ts`

```bash
# Upload all products
npm run upload:gifts

# Test with 5 products
npm run upload:gifts:test

# Upload specific number
node -r ts-node/register upload-corporate-gifts.ts 50
```

**Advantages**:
- Type-safe with TypeScript
- Better error messages
- Easy to modify and extend
- Cross-platform

### 2. PHP Version
**File**: `upload-corporate-gifts.php`

```bash
# Upload all products
npm run upload:gifts:php

# Or run directly
php upload-corporate-gifts.php

# Upload specific number
php upload-corporate-gifts.php 50
```

**Advantages**:
- No runtime dependencies
- Runs anywhere PHP is installed
- Can be deployed on server directly

## Prerequisites

### Required
- ✅ `.env.local` with WooCommerce credentials
- ✅ WooCommerce API enabled
- ✅ Consumer Key and Secret

### For TypeScript Script
- Node.js v18+
- Dependencies: `npm install`

### For PHP Script
- PHP 7.4+
- cURL extension enabled

## Quick Start

```bash
# 1. Configure credentials
cp .env.example .env.local
# Edit .env.local with your keys

# 2. Install dependencies
npm install

# 3. Test upload
npm run upload:gifts:test

# 4. Upload all products
npm run upload:gifts
```

## What Gets Uploaded

- ✅ 500+ corporate gift products
- ✅ 10 organized categories
- ✅ Titles, descriptions, SKUs
- ✅ Prices (sale + regular)
- ✅ Inventory quantities
- ✅ Product images
- ✅ Specifications (material, color, dimensions)
- ✅ Brand associations
- ✅ Customization metadata

## Upload Progress

Both scripts show real-time progress:

```
[001/500] Uploading: Product Name... ✓ Created (ID: 412)
[002/500] Uploading: Product Name... ✓ Created (ID: 413)
...
```

## Success Metrics

- **Speed**: ~1-2 products/second
- **Time**: 5-10 minutes for all 500
- **Success Rate**: Should be 100% if configured correctly

## After Upload

1. ✅ Visit WordPress Admin → WooCommerce → Products
2. ✅ Verify products are listed
3. ✅ Check categories and prices
4. ✅ Test storefront: `/shop/catalog`
5. ✅ Replace placeholder images with real ones

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `WOOCOMMERCE_CONSUMER_KEY not found` | Create `.env.local` file |
| `401 Unauthorized` | Check API credentials |
| `Failed: Invalid JSON` | Verify no special chars in keys |
| `Script hangs` | Kill with Ctrl+C, check connection |

## Documentation

See [UPLOAD_CORPORATE_GIFTS.md](../UPLOAD_CORPORATE_GIFTS.md) for complete guide.

---

**Ready?** Run: `npm run upload:gifts:test`
