/**
 * Corporate Gifts Bulk Upload Script (TypeScript/Node.js)
 *
 * Uploads all 500+ corporate gift products to WooCommerce via REST API
 * including images, prices, descriptions, and inventory.
 *
 * Usage:
 *   npm run upload:gifts [limit]
 *   node -r ts-node/register scripts/upload-corporate-gifts.ts
 *   node -r ts-node/register scripts/upload-corporate-gifts.ts 50
 *
 * Requires:
 *   - .env.local with WOOCOMMERCE_CONSUMER_KEY and WOOCOMMERCE_CONSUMER_SECRET
 */

import * as dotenv from 'dotenv';
import { getAllCorporateGifts, CORPORATE_GIFT_CATEGORIES } from '../lib/corporateGifts';

dotenv.config({ path: '.env.local' });

interface UploadStats {
  created: number;
  failed: number;
  skipped: number;
  total: number;
}

interface ProductPayload {
  name: string;
  type: string;
  status: string;
  sku: string;
  description: string;
  short_description: string;
  regular_price: string;
  sale_price: string;
  stock_quantity: number;
  manage_stock: boolean;
  stock_status: 'instock' | 'outofstock';
  categories: Array<{ id: number }>;
  attributes: Array<{
    name: string;
    option: string;
    visible: boolean;
  }>;
  images: Array<{ src: string; alt: string }>;
  meta_data: Array<{ key: string; value: string }>;
}

class CorporateGiftsUploader {
  private apiUrl: string;
  private consumerKey: string;
  private consumerSecret: string;
  private stats: UploadStats = {
    created: 0,
    failed: 0,
    skipped: 0,
    total: 0,
  };

  constructor() {
    this.apiUrl = process.env.WC_API_URL || 'https://www.ourdreams.us/wp-json/wc/v3';
    this.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
    this.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

    if (!this.consumerKey || !this.consumerSecret) {
      console.error('❌ Error: WOOCOMMERCE_CONSUMER_KEY and WOOCOMMERCE_CONSUMER_SECRET not set in .env.local');
      process.exit(1);
    }
  }

  /**
   * Get basic auth header
   */
  private getAuthHeader(): string {
    const credentials = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
    return `Basic ${credentials}`;
  }

  /**
   * Generate product specifications
   */
  private generateSpecification(name: string) {
    return {
      Material: this.getMaterialByName(name),
      Dimensions: '10" × 6" × 2"',
      Weight: '0.5 lbs',
      Color: this.getColorByName(name),
      Customizable: 'Yes',
      MOQ: '10 units',
      'Lead Time': '5-7 business days',
      Packaging: 'Premium gift box included',
    };
  }

  private getMaterialByName(name: string): string {
    if (name.toLowerCase().includes('leather')) return 'Premium Leather';
    if (name.toLowerCase().includes('wood')) return 'Solid Wood';
    if (name.toLowerCase().includes('glass')) return 'Tempered Glass';
    if (name.toLowerCase().includes('steel') || name.toLowerCase().includes('metal')) return 'Stainless Steel';
    if (name.toLowerCase().includes('ceramic')) return 'Ceramic';
    if (name.toLowerCase().includes('plastic')) return 'BPA-Free Plastic';
    return 'Premium Material';
  }

  private getColorByName(name: string): string {
    if (name.toLowerCase().includes('black')) return 'Black';
    if (name.toLowerCase().includes('white')) return 'White';
    if (name.toLowerCase().includes('blue')) return 'Blue';
    if (name.toLowerCase().includes('gold') || name.toLowerCase().includes('brass')) return 'Gold';
    if (name.toLowerCase().includes('silver')) return 'Silver';
    return 'Assorted';
  }

  /**
   * Create product via WooCommerce API
   */
  private async createProduct(product: any): Promise<{ success: boolean; product_id?: number; error?: string }> {
    const categoryMap: { [key: number]: number } = {
      100: 15,
      101: 16,
      102: 17,
      103: 18,
      104: 19,
      105: 20,
      106: 21,
      107: 22,
      108: 23,
      109: 24,
    };

    const payload: ProductPayload = {
      name: product.name,
      type: 'simple',
      status: 'publish',
      sku: product.sku,
      description: product.description,
      short_description: product.description.substring(0, 100),
      regular_price: product.regularPrice.toFixed(2),
      sale_price: product.price.toFixed(2),
      stock_quantity: product.minimumOrder ? product.minimumOrder * 2 : 20,
      manage_stock: true,
      stock_status: 'instock',
      categories: [{ id: categoryMap[product.categories[0].id] || 15 }],
      attributes: [
        {
          name: 'Brand',
          option: product.brand || 'Corporate Brands',
          visible: true,
        },
        {
          name: 'Material',
          option: this.getMaterialByName(product.name),
          visible: true,
        },
      ],
      images: [
        {
          src: product.images[0]?.src || `https://via.placeholder.com/500x500?text=${encodeURIComponent(product.name)}`,
          alt: product.name,
        },
      ],
      meta_data: [
        { key: 'corporate_gift', value: 'yes' },
        { key: 'product_specification', value: JSON.stringify(this.generateSpecification(product.name)) },
        { key: 'brand', value: product.brand || 'Corporate' },
        { key: 'customizable', value: 'yes' },
        { key: 'moq', value: product.minimumOrder?.toString() || '10' },
      ],
    };

    try {
      const response = await fetch(`${this.apiUrl}/products`, {
        method: 'POST',
        headers: {
          'Authorization': this.getAuthHeader(),
          'Content-Type': 'application/json',
          'User-Agent': 'Corporate-Gifts-Uploader/1.0',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json() as any;
        return { success: true, product_id: result.id };
      } else {
        const errorData = await response.text();
        let errorMsg = 'Unknown error';
        try {
          const parsed = JSON.parse(errorData);
          errorMsg = parsed.message || parsed.error || errorMsg;
        } catch {
          errorMsg = errorData || 'API Error';
        }
        return {
          success: false,
          error: `${response.status}: ${errorMsg}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  /**
   * Ensure categories exist
   */
  private async ensureCategories(): Promise<void> {
    console.log('📁 Preparing categories...');

    const categories = [
      { id: 100, name: 'Executive Gifts' },
      { id: 101, name: 'Employee Recognition' },
      { id: 102, name: 'Drinkware & Hydration' },
      { id: 103, name: 'Tech Accessories' },
      { id: 104, name: 'Office Supplies' },
      { id: 105, name: 'Apparel & Textiles' },
      { id: 106, name: 'Wellness & Lifestyle' },
      { id: 107, name: 'Travel & Mobility' },
      { id: 108, name: 'Awards & Recognition' },
      { id: 109, name: 'Eco-Friendly Gifts' },
    ];

    for (const category of categories) {
      try {
        // Search for existing category
        const searchResponse = await fetch(
          `${this.apiUrl}/products/categories?search=${encodeURIComponent(category.name)}`,
          {
            headers: { 'Authorization': this.getAuthHeader() },
          }
        );

        const existing = (await searchResponse.json()) as any[];

        if (existing && existing.length > 0) {
          console.log(`✓ Found category: ${category.name} (ID: ${existing[0].id})`);
        } else {
          // Create category
          const createResponse = await fetch(`${this.apiUrl}/products/categories`, {
            method: 'POST',
            headers: {
              'Authorization': this.getAuthHeader(),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: category.name }),
          });

          if (createResponse.ok) {
            const result = await createResponse.json() as any;
            console.log(`✓ Created category: ${category.name} (ID: ${result.id})`);
          }
        }
      } catch (error) {
        console.log(`⚠ Could not create category: ${category.name}`);
      }
    }
  }

  /**
   * Run the bulk upload
   */
  public async upload(limit?: number): Promise<void> {
    console.log('\n🚀 Corporate Gifts Bulk Upload Started');
    console.log('='.repeat(50) + '\n');

    // Ensure categories exist
    await this.ensureCategories();
    console.log();

    // Get products
    const allProducts = getAllCorporateGifts();
    this.stats.total = allProducts.length;

    let products = allProducts;
    if (limit) {
      products = products.slice(0, limit);
      console.log(`📦 Uploading ${limit} of ${this.stats.total} products\n`);
    } else {
      console.log(`📦 Uploading ${this.stats.total} products\n`);
    }

    // Upload each product
    for (let index = 0; index < products.length; index++) {
      const product = products[index];
      const totalStr = String(this.stats.total).padStart(3, '0');
      const indexStr = String(index + 1).padStart(3, '0');

      process.stdout.write(
        `[${indexStr}/${totalStr}] Uploading: ${product.name} (${product.sku})... `
      );

      const result = await this.createProduct(product);

      if (result.success) {
        console.log(`✓ Created (ID: ${result.product_id})`);
        this.stats.created++;
      } else {
        console.log(`✗ Failed: ${result.error}`);
        this.stats.failed++;
      }

      // Rate limit: 200ms between requests
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 Upload Summary');
    console.log('='.repeat(50));
    console.log(`Total Processed: ${this.stats.total}`);
    console.log(`✓ Created: ${this.stats.created}`);
    console.log(`✗ Failed: ${this.stats.failed}`);
    console.log(`⊘ Skipped: ${this.stats.skipped}`);
    console.log(
      `Success Rate: ${((this.stats.created / this.stats.total) * 100).toFixed(1)}%`
    );
    console.log('='.repeat(50) + '\n');
  }
}

// Run upload
const limit = process.argv[2] ? parseInt(process.argv[2]) : undefined;
const uploader = new CorporateGiftsUploader();
uploader.upload(limit).catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
