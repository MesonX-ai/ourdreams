#!/bin/bash
#
# Corporate Gifts Upload Verification Script
# Tests the upload infrastructure before running full upload
#

set -e

echo "🔍 Corporate Gifts Upload Verification"
echo "======================================"
echo ""

# Check 1: Environment file
echo "1️⃣  Checking environment configuration..."
if [ -f .env.local ]; then
    echo "   ✓ .env.local exists"
    if grep -q "WOOCOMMERCE_CONSUMER_KEY" .env.local; then
        echo "   ✓ WOOCOMMERCE_CONSUMER_KEY found"
    else
        echo "   ✗ WOOCOMMERCE_CONSUMER_KEY not found"
        exit 1
    fi
    if grep -q "WOOCOMMERCE_CONSUMER_SECRET" .env.local; then
        echo "   ✓ WOOCOMMERCE_CONSUMER_SECRET found"
    else
        echo "   ✗ WOOCOMMERCE_CONSUMER_SECRET not found"
        exit 1
    fi
else
    echo "   ✗ .env.local not found"
    echo "   → Run: cp .env.example .env.local"
    exit 1
fi
echo ""

# Check 2: Dependencies
echo "2️⃣  Checking dependencies..."
if [ -d node_modules ]; then
    echo "   ✓ node_modules found"
    if [ -d "node_modules/ts-node" ]; then
        echo "   ✓ ts-node installed"
    else
        echo "   ⚠ ts-node not installed"
    fi
    if [ -d "node_modules/dotenv" ]; then
        echo "   ✓ dotenv installed"
    else
        echo "   ⚠ dotenv not installed"
    fi
else
    echo "   ✗ node_modules not found"
    echo "   → Run: npm install"
    exit 1
fi
echo ""

# Check 3: Script files
echo "3️⃣  Checking upload scripts..."
if [ -f scripts/upload-corporate-gifts.ts ]; then
    echo "   ✓ TypeScript script found"
else
    echo "   ✗ TypeScript script not found"
    exit 1
fi
if [ -f scripts/upload-corporate-gifts.php ]; then
    echo "   ✓ PHP script found"
else
    echo "   ✗ PHP script not found"
    exit 1
fi
echo ""

# Check 4: PHP syntax
echo "4️⃣  Checking PHP script syntax..."
if php -l scripts/upload-corporate-gifts.php > /dev/null 2>&1; then
    echo "   ✓ PHP script syntax valid"
else
    echo "   ✗ PHP script has syntax errors"
    exit 1
fi
echo ""

# Check 5: TypeScript compilation
echo "5️⃣  Checking TypeScript compilation..."
if npx tsc --noEmit scripts/upload-corporate-gifts.ts 2>/dev/null; then
    echo "   ✓ TypeScript compiles successfully"
else
    echo "   ✗ TypeScript compilation failed"
    npx tsc --noEmit scripts/upload-corporate-gifts.ts
    exit 1
fi
echo ""

# Check 6: Corporate gifts data
echo "6️⃣  Checking corporate gifts data..."
if [ -f lib/corporateGifts.ts ]; then
    echo "   ✓ Corporate gifts module found"
    GIFT_COUNT=$(grep -c "id:" lib/corporateGifts.ts || echo "0")
    echo "   ✓ Corporate gifts data loaded"
else
    echo "   ✗ Corporate gifts module not found"
    exit 1
fi
echo ""

# Check 7: WooCommerce connectivity (if credentials are set)
echo "7️⃣  Checking WooCommerce connectivity..."

# Extract credentials from .env.local
export $(grep WOOCOMMERCE_CONSUMER_KEY .env.local | tr -d ' ')
export $(grep WOOCOMMERCE_CONSUMER_SECRET .env.local | tr -d ' ')

if [ -z "$WOOCOMMERCE_CONSUMER_KEY" ] || [ -z "$WOOCOMMERCE_CONSUMER_SECRET" ]; then
    echo "   ⚠ Cannot test WooCommerce (credentials not set)"
else
    # Test connection
    if curl -s -I "https://www.ourdreams.us/wp-json/wc/v3/products" \
        -u "$WOOCOMMERCE_CONSUMER_KEY:$WOOCOMMERCE_CONSUMER_SECRET" | grep -q "HTTP"; then
        echo "   ✓ WooCommerce API is reachable"
    else
        echo "   ✗ WooCommerce API is not reachable"
        exit 1
    fi
fi
echo ""

# Summary
echo "✅ All checks passed!"
echo ""
echo "Ready to upload? Run:"
echo "  npm run upload:gifts:test    # Test with 5 products"
echo "  npm run upload:gifts          # Upload all products"
echo ""
