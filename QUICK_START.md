# 🚀 Quick Start Commands

Copy and paste these commands in order to upload corporate gifts to WooCommerce.

---

## Step 1: Setup Environment (One Time)

```bash
# Navigate to project
cd /Users/mesonx/MY\ LAB/ourdreams

# Create environment file with your WooCommerce credentials
cat > .env.local << 'EOF'
WOOCOMMERCE_CONSUMER_KEY=ck_aa43ad580908f597eb5904a36cc36c8cb32c5338
WOOCOMMERCE_CONSUMER_SECRET=cs_28a690ef4a771a130d6e89dbdce26fa9190646c7
WC_API_URL=https://www.ourdreams.us/wp-json/wc/v3
EOF

# Install dependencies
npm install
```

---

## Step 2: Verify Setup

```bash
# Check everything is configured correctly
bash scripts/verify-upload.sh
```

Expected output:
```
✅ All checks passed!

Ready to upload? Run:
  npm run upload:gifts:test    # Test with 5 products
  npm run upload:gifts          # Upload all products
```

---

## Step 3: Test Upload (Recommended)

```bash
# Upload only 5 products first to verify everything works
npm run upload:gifts:test
```

Expected output:
```
🚀 Corporate Gifts Bulk Upload Started
==================================================

📁 Preparing categories...
✓ Found category: Executive Gifts (ID: 15)
✓ Found category: Employee Recognition (ID: 16)
...

📦 Uploading 5 of 500 products

[001/005] Uploading: Leather Portfolio Briefcase... ✓ Created (ID: 412)
[002/005] Uploading: Executive Desk Organizer Set... ✓ Created (ID: 413)
[003/005] Uploading: Personalized Desk Clock... ✓ Created (ID: 414)
[004/005] Uploading: Premium Pen Gift Set... ✓ Created (ID: 415)
[005/005] Uploading: Executive Leather Notebook... ✓ Created (ID: 416)

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

---

## Step 4: Full Upload

Once test succeeds, upload all products:

```bash
# Upload all 500+ products
npm run upload:gifts
```

**Time to complete**: ~5-10 minutes

Expected progress:
```
🚀 Corporate Gifts Bulk Upload Started
==================================================

📁 Preparing categories...
[Progress bar showing creation of 10 categories...]

📦 Uploading 500 of 500 products

[001/500] Uploading: Leather Portfolio Briefcase... ✓ Created (ID: 412)
[002/500] Uploading: Executive Desk Organizer Set... ✓ Created (ID: 413)
...
[500/500] Uploading: Eco Jute Tote Bag... ✓ Created (ID: 911)

==================================================
📊 Upload Summary
==================================================
Total Processed: 500
✓ Created: 500
✗ Failed: 0
⊘ Skipped: 0
Success Rate: 100.0%
==================================================
```

---

## Step 5: Verify in WooCommerce Admin

```bash
# Open WordPress admin
open https://www.ourdreams.us/wp-admin/

# Navigate to: Products → All Products
# Should see 500+ products with categories
```

---

## Step 6: Test in Catalog

```bash
# Start local development server
npm run dev

# Open catalog in browser
open http://localhost:3000/shop/catalog

# Verify:
# ✅ 500+ products visible
# ✅ Categories filter working
# ✅ Brand filter working
# ✅ Price filter working (range expanded)
# ✅ Search functionality working
```

---

## Alternative: Use PHP Version

If you prefer PHP instead of Node.js:

```bash
# Test with 5 products
php scripts/upload-corporate-gifts.php 5

# Upload all
php scripts/upload-corporate-gifts.php
```

---

## Troubleshooting

### If any step fails:

```bash
# 1. Check verification script
bash scripts/verify-upload.sh

# 2. Test WooCommerce connection directly
curl -u "ck_aa43ad580908f597eb5904a36cc36c8cb32c5338:cs_28a690ef4a771a130d6e89dbdce26fa9190646c7" \
  "https://www.ourdreams.us/wp-json/wc/v3/products?per_page=1"

# Should return JSON (not HTML error)

# 3. Check npm dependencies
npm install

# 4. View upload script logs
npm run upload:gifts:test 2>&1 | tee upload.log
```

---

## Complete Script (Copy & Run All At Once)

```bash
#!/bin/bash

# Navigate to project
cd /Users/mesonx/MY\ LAB/ourdreams

# Step 1: Create env file if not exists
if [ ! -f .env.local ]; then
    cat > .env.local << 'EOF'
WOOCOMMERCE_CONSUMER_KEY=ck_aa43ad580908f597eb5904a36cc36c8cb32c5338
WOOCOMMERCE_CONSUMER_SECRET=cs_28a690ef4a771a130d6e89dbdce26fa9190646c7
WC_API_URL=https://www.ourdreams.us/wp-json/wc/v3
EOF
    echo "✓ Created .env.local"
fi

# Step 2: Install dependencies
echo "Installing dependencies..."
npm install --silent

# Step 3: Run verification
echo ""
echo "Verifying setup..."
bash scripts/verify-upload.sh

# Step 4: Test upload
echo ""
echo "Running test upload (5 products)..."
npm run upload:gifts:test

# Step 5: Ask user to proceed with full upload
echo ""
read -p "Test successful! Run full upload? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run upload:gifts
fi
```

---

## Expected Timeline

| Step | Command | Time |
|------|---------|------|
| 1 | Setup environment | 1 min |
| 2 | Verify setup | 1 min |
| 3 | Test upload (5 products) | 1 min |
| 4 | Full upload (500 products) | 5-10 min |
| 5 | Verify in admin | 2 min |
| 6 | Test in catalog | 2 min |
| **Total** | **Complete** | **~15-20 min** |

---

## Success Checklist

After completing all steps:

- [ ] Step 1: Environment configured with credentials
- [ ] Step 2: Verification script shows all checks passed
- [ ] Step 3: Test upload shows 5/5 products created successfully
- [ ] Step 4: Full upload completes with ~500 products created
- [ ] Step 5: WooCommerce admin shows 500+ products with categories
- [ ] Step 6: Catalog UI displays all products with working filters

---

## Need Help?

- 📖 Full documentation: `UPLOAD_CORPORATE_GIFTS.md`
- 📋 Summary: `BULK_UPLOAD_SUMMARY.md`
- 🔧 Scripts info: `scripts/README.md`

---

**Ready? Run Step 1-2, then Step 3!**
