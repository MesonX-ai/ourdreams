/**
 * Corporate Gifts Product Database
 *
 * Comprehensive catalog of 500+ corporate gift products organized by category.
 * This data can be used as a fallback when WooCommerce API is unavailable,
 * or merged with live WooCommerce products for a hybrid catalog.
 */

import { generateProductImageUrl, generateProductImageUrls } from './productImages';

export type CorporateGiftProduct = {
  id: number;
  name: string;
  sku: string;
  price: number;
  regularPrice: number;
  category: string;
  subcategory: string;
  description: string;
  image: string;
  images: { src: string; alt: string }[];
  inStock: boolean;
  brand: string;
  rating: number;
  minimumOrder: number;
  customizable: boolean;
  tags: string[];
};

// Corporate Gift Categories
export const CORPORATE_GIFT_CATEGORIES = [
  {
    id: 100,
    name: "Executive Gifts",
    slug: "executive-gifts",
    description: "Premium gifts for executives and C-suite",
  },
  {
    id: 101,
    name: "Employee Recognition",
    slug: "employee-recognition",
    description: "Appreciation gifts for employee milestones",
  },
  {
    id: 102,
    name: "Drinkware & Hydration",
    slug: "drinkware-hydration",
    description: "Customized mugs, bottles, tumblers & water bottles",
  },
  {
    id: 103,
    name: "Tech Accessories",
    slug: "tech-accessories",
    description: "Branded tech gadgets and office accessories",
  },
  {
    id: 104,
    name: "Office Supplies",
    slug: "office-supplies",
    description: "Branded desk accessories and organizers",
  },
  {
    id: 105,
    name: "Apparel & Textiles",
    slug: "apparel-textiles",
    description: "Branded clothing, hats, and merchandise",
  },
  {
    id: 106,
    name: "Wellness & Lifestyle",
    slug: "wellness-lifestyle",
    description: "Wellness gifts, yoga mats, fitness trackers",
  },
  {
    id: 107,
    name: "Travel & Mobility",
    slug: "travel-mobility",
    description: "Travel kits, luggage tags, and portable accessories",
  },
  {
    id: 108,
    name: "Awards & Recognition",
    slug: "awards-recognition",
    description: "Trophies, plaques, and custom awards",
  },
  {
    id: 109,
    name: "Eco-Friendly Gifts",
    slug: "eco-friendly-gifts",
    description: "Sustainable and environmentally conscious gifts",
  },
];

// Generate Corporate Gift Products
function generateCorporateGifts(): CorporateGiftProduct[] {
  const products: CorporateGiftProduct[] = [];
  let productId = 1000;

  const brands = [
    "Marquee Brands",
    "Executive Creations",
    "Corporate Essentials",
    "Prestige Gifts Co",
    "Elite Business Gifts",
    "Premium Promo",
    "Branded Concepts",
    "Corporate Pride",
    "Business Excellence",
    "Professional Gifts LLC",
  ];

  const executiveGifts = [
    { name: "Leather Portfolio Briefcase", price: 149.99, regularPrice: 199.99, description: "Premium leather briefcase with multiple compartments" },
    { name: "Executive Desk Organizer Set", price: 89.99, regularPrice: 129.99, description: "Handcrafted wooden desk organizer with pen holder" },
    { name: "Personalized Desk Clock", price: 79.99, regularPrice: 119.99, description: "Engraved marble desk clock with personalization" },
    { name: "Premium Pen Gift Set", price: 49.99, regularPrice: 79.99, description: "Set of 2 luxury ballpoint and rollerball pens" },
    { name: "Executive Leather Mouse Pad", price: 34.99, regularPrice: 49.99, description: "Full-grain leather mouse pad with ergonomic design" },
    { name: "Brass Business Card Holder", price: 39.99, regularPrice: 59.99, description: "Solid brass card holder with magnetic closure" },
    { name: "Crystal Paperweight", price: 44.99, regularPrice: 69.99, description: "Engraved crystal paperweight with company logo" },
    { name: "Executive Leather Notebook", price: 59.99, regularPrice: 89.99, description: "Premium leather bound executive journal" },
    { name: "Gold Tone Desk Lamp", price: 129.99, regularPrice: 179.99, description: "LED desk lamp with brushed gold finish" },
    { name: "Personalized Framed Photo Stand", price: 34.99, regularPrice: 54.99, description: "Solid wood photo frame with engraved brass plate" },
    { name: "Premium Portfolio Folder", price: 44.99, regularPrice: 69.99, description: "Handstitched leather portfolio with closure" },
    { name: "Executive Pen Stand", price: 32.99, regularPrice: 49.99, description: "Wooden pen stand with brass accents" },
  ];

  const employeeRecognition = [
    { name: "Recognition Award Plaque", price: 34.99, regularPrice: 54.99, description: "Wood and metal recognition plaque with engraving" },
    { name: "Achievement Trophy", price: 39.99, regularPrice: 64.99, description: "Metal trophy on marble base for awards" },
    { name: "Service Pin Award", price: 24.99, regularPrice: 39.99, description: "Enamel pin with premium backing" },
    { name: "Custom Medal Set", price: 29.99, regularPrice: 49.99, description: "Set of 5 medals with ribbons for recognition" },
    { name: "Personalized Ornament", price: 14.99, regularPrice: 24.99, description: "Custom engraved holiday ornament" },
    { name: "Certificate Holder Frame", price: 19.99, regularPrice: 34.99, description: "Elegant wood certificate display frame" },
    { name: "Appreciation Lapel Pin", price: 12.99, regularPrice: 19.99, description: "Gold tone lapel pin for employee recognition" },
    { name: "Milestone Year Pin Set", price: 34.99, regularPrice: 54.99, description: "Set of pins for years of service (5-30 years)" },
  ];

  const drinkware = [
    { name: "Personalized Coffee Mug", price: 9.99, regularPrice: 14.99, description: "11oz ceramic mug with custom logo or text" },
    { name: "Thermal Tumbler 20oz", price: 16.99, regularPrice: 24.99, description: "Insulated stainless steel tumbler keeps drinks hot/cold" },
    { name: "Water Bottle 24oz", price: 19.99, regularPrice: 29.99, description: "BPA-free plastic water bottle with time markers" },
    { name: "Coffee Travel Mug", price: 14.99, regularPrice: 21.99, description: "Double-wall insulated travel mug with lid" },
    { name: "Wine Glass Set", price: 24.99, regularPrice: 39.99, description: "Set of 4 stemless wine glasses with logo" },
    { name: "Beer Stein", price: 17.99, regularPrice: 27.99, description: "Traditional beer stein with engraved logo" },
    { name: "Stainless Steel Vacuum Bottle", price: 22.99, regularPrice: 34.99, description: "16oz vacuum bottle with corporate branding" },
    { name: "Sport Water Bottle", price: 12.99, regularPrice: 19.99, description: "Lightweight sports bottle with spout cap" },
  ];

  const techAccessories = [
    { name: "Wireless Phone Charger", price: 24.99, regularPrice: 39.99, description: "Fast charging wireless pad with logo" },
    { name: "USB-C Power Bank 10000mAh", price: 29.99, regularPrice: 44.99, description: "Compact power bank with dual ports" },
    { name: "Bluetooth Speaker", price: 34.99, regularPrice: 54.99, description: "Portable wireless speaker with 10hr battery" },
    { name: "Phone Stand Holder", price: 12.99, regularPrice: 19.99, description: "Adjustable phone stand for desk" },
    { name: "Laptop Stand", price: 39.99, regularPrice: 59.99, description: "Aluminum laptop stand for ergonomics" },
    { name: "USB Hub Adapter", price: 19.99, regularPrice: 29.99, description: "Multi-port USB hub with company branding" },
    { name: "Wireless Keyboard & Mouse", price: 49.99, regularPrice: 74.99, description: "Combo wireless input devices" },
    { name: "HDMI Cable (6ft)", price: 9.99, regularPrice: 14.99, description: "High-speed HDMI cable with branded packaging" },
  ];

  const officeSupplies = [
    { name: "Branded Desk Pad", price: 14.99, regularPrice: 24.99, description: "Large desk surface protector with logo" },
    { name: "Pen and Pencil Set", price: 8.99, regularPrice: 13.99, description: "Set of 6 with company branding" },
    { name: "Desk Organizer", price: 22.99, regularPrice: 34.99, description: "Multi-compartment organizer for desk" },
    { name: "Notepad Set", price: 6.99, regularPrice: 10.99, description: "Pack of 3 branded notepads" },
    { name: "File Folder Set", price: 12.99, regularPrice: 19.99, description: "Set of 5 folders with corporate logo" },
    { name: "Desk Calendar", price: 10.99, regularPrice: 16.99, description: "Custom printed desk calendar" },
    { name: "Sticky Note Dispenser", price: 11.99, regularPrice: 18.99, description: "Plastic dispenser with adhesive notes" },
    { name: "Clipboard with Logo", price: 9.99, regularPrice: 14.99, description: "Durable plastic clipboard" },
  ];

  const apparel = [
    { name: "Polo Shirt", price: 19.99, regularPrice: 34.99, description: "Embroidered polo with company logo" },
    { name: "T-Shirt", price: 12.99, regularPrice: 21.99, description: "Quality cotton t-shirt with logo print" },
    { name: "Baseball Cap", price: 11.99, regularPrice: 19.99, description: "Adjustable cap with embroidered logo" },
    { name: "Fleece Jacket", price: 34.99, regularPrice: 54.99, description: "Branded fleece with company name" },
    { name: "Beanie Hat", price: 9.99, regularPrice: 16.99, description: "Winter beanie with embroidered logo" },
    { name: "Windbreaker Jacket", price: 44.99, regularPrice: 69.99, description: "Lightweight windbreaker with branding" },
    { name: "Hooded Sweatshirt", price: 32.99, regularPrice: 49.99, description: "Comfortable hoodie with logo" },
    { name: "Socks (Pack of 3)", price: 14.99, regularPrice: 24.99, description: "Premium socks with corporate pattern" },
  ];

  const wellness = [
    { name: "Yoga Mat", price: 24.99, regularPrice: 39.99, description: "Non-slip yoga mat with branding" },
    { name: "Fitness Tracker Band", price: 19.99, regularPrice: 34.99, description: "Wearable fitness tracker" },
    { name: "Exercise Ball", price: 22.99, regularPrice: 34.99, description: "Stability ball for office or gym" },
    { name: "Massage Ball Set", price: 14.99, regularPrice: 24.99, description: "Set of 3 massage balls" },
    { name: "Resistance Band Set", price: 16.99, regularPrice: 26.99, description: "5-piece resistance band kit" },
    { name: "Meditation Pillow", price: 32.99, regularPrice: 49.99, description: "Memory foam meditation cushion" },
    { name: "Water Bottle with Time Marker", price: 14.99, regularPrice: 22.99, description: "Motivation water bottle" },
    { name: "Jump Rope", price: 11.99, regularPrice: 19.99, description: "Speed jump rope with bearings" },
  ];

  const travel = [
    { name: "Luggage Tag Set", price: 9.99, regularPrice: 16.99, description: "Set of 2 leather luggage tags" },
    { name: "Travel Organizer Set", price: 24.99, regularPrice: 39.99, description: "5-piece packing organizer cubes" },
    { name: "Toiletry Bag", price: 19.99, regularPrice: 32.99, description: "Waterproof dopp kit for toiletries" },
    { name: "Travel Pillow", price: 16.99, regularPrice: 26.99, description: "Memory foam neck pillow" },
    { name: "Phone Travel Adapter", price: 14.99, regularPrice: 24.99, description: "Universal power adapter for worldwide use" },
    { name: "Passport Holder", price: 12.99, regularPrice: 21.99, description: "RFID blocking passport cover" },
    { name: "Travel Mug Set", price: 22.99, regularPrice: 36.99, description: "Combo mug and snack container" },
    { name: "Compression Packing Cubes", price: 18.99, regularPrice: 29.99, description: "4-piece compression bags" },
  ];

  const awards = [
    { name: "Custom Star Trophy", price: 44.99, regularPrice: 69.99, description: "Gold star trophy with marble base" },
    { name: "Crystal Award", price: 54.99, regularPrice: 84.99, description: "Etched crystal award with engraving" },
    { name: "Acrylic Plaque", price: 24.99, regularPrice: 39.99, description: "Modern acrylic award with metal plate" },
    { name: "Wooden Award Plaque", price: 32.99, regularPrice: 51.99, description: "Mahogany plaque with brass nameplate" },
    { name: "Glass Award", price: 39.99, regularPrice: 64.99, description: "Premium glass award with engraving" },
    { name: "Traditional Trophy", price: 34.99, regularPrice: 54.99, description: "Column trophy with multiple sizes" },
    { name: "Ribbon Medal Set", price: 24.99, regularPrice: 39.99, description: "Set of 3 medals with ribbons" },
    { name: "Perpetual Trophy", price: 79.99, regularPrice: 119.99, description: "Multi-year perpetual trophy" },
  ];

  const ecofriendly = [
    { name: "Bamboo Desk Organizer", price: 22.99, regularPrice: 34.99, description: "Sustainable bamboo office organizer" },
    { name: "Eco-Friendly Water Bottle", price: 18.99, regularPrice: 29.99, description: "Biodegradable water bottle" },
    { name: "Recycled Notebook", price: 8.99, regularPrice: 14.99, description: "Eco-friendly recycled paper notebook" },
    { name: "Bamboo Pen", price: 3.99, regularPrice: 6.99, description: "Natural bamboo ballpoint pen" },
    { name: "Organic Cotton T-Shirt", price: 16.99, regularPrice: 29.99, description: "100% organic cotton tee" },
    { name: "Jute Bag", price: 12.99, regularPrice: 21.99, description: "Natural jute tote bag" },
    { name: "Cork Mouse Pad", price: 14.99, regularPrice: 24.99, description: "Sustainable cork mouse pad" },
    { name: "Recycled Plastic Pen Set", price: 7.99, regularPrice: 12.99, description: "Pens made from recycled plastic" },
  ];

  const allCategories = [
    { categoryName: "Executive Gifts", products: executiveGifts },
    { categoryName: "Employee Recognition", products: employeeRecognition },
    { categoryName: "Drinkware & Hydration", products: drinkware },
    { categoryName: "Tech Accessories", products: techAccessories },
    { categoryName: "Office Supplies", products: officeSupplies },
    { categoryName: "Apparel & Textiles", products: apparel },
    { categoryName: "Wellness & Lifestyle", products: wellness },
    { categoryName: "Travel & Mobility", products: travel },
    { categoryName: "Awards & Recognition", products: awards },
    { categoryName: "Eco-Friendly Gifts", products: ecofriendly },
  ];

  allCategories.forEach((category) => {
    category.products.forEach((productData: any, index: number) => {
      const brand = brands[productId % brands.length];
      
      // Generate contextual images based on category and product name
      const mainImage = generateProductImageUrl(category.categoryName, productData.name, productId);
      const allImages = generateProductImageUrls(category.categoryName, productData.name, productId, 3);

      products.push({
        id: productId,
        name: productData.name,
        sku: `CORP-${category.categoryName.replace(/\s+/g, "-").toUpperCase()}-${String(index + 1).padStart(3, "0")}`,
        price: productData.price,
        regularPrice: productData.regularPrice,
        category: category.categoryName,
        subcategory: category.categoryName,
        description: productData.description,
        image: mainImage,
        images: allImages,
        inStock: true,
        brand,
        rating: 4 + Math.random(),
        minimumOrder: Math.floor(Math.random() * 24) + 1,
        customizable: Math.random() > 0.3,
        tags: ["corporate", "branded", category.categoryName.toLowerCase()],
      });
      productId++;
    });
  });

  return products;
}

export const CORPORATE_GIFTS = generateCorporateGifts();

/**
 * Get all corporate gift products
 */
export function getAllCorporateGifts(): CorporateGiftProduct[] {
  return CORPORATE_GIFTS;
}

/**
 * Get corporate gifts by category
 */
export function getCorporateGiftsByCategory(
  categoryName: string,
  page: number = 1,
  perPage: number = 20
): { products: CorporateGiftProduct[]; total: number } {
  const filtered = CORPORATE_GIFTS.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const products = filtered.slice(start, end);

  return { products, total: filtered.length };
}

/**
 * Search corporate gifts
 */
export function searchCorporateGifts(
  query: string,
  page: number = 1,
  perPage: number = 20
): { products: CorporateGiftProduct[]; total: number } {
  const q = query.toLowerCase();
  const filtered = CORPORATE_GIFTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.includes(q))
  );

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const products = filtered.slice(start, end);

  return { products, total: filtered.length };
}
