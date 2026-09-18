/**
 * Product Image URL Generator
 *
 * Generates contextual image URLs for corporate gifts based on category and product name.
 * Uses multiple reliable image sources with fallbacks.
 */

// Map categories to relevant search keywords for images
const CATEGORY_IMAGE_KEYWORDS: Record<string, string[]> = {
  "Executive Gifts": ["briefcase", "leather portfolio", "desk organizer", "luxury pen", "desk clock"],
  "Employee Recognition": ["award", "trophy", "medal", "recognition", "certificate"],
  "Drinkware & Hydration": ["coffee mug", "water bottle", "tumbler", "thermos", "wine glass"],
  "Tech Accessories": ["laptop", "phone charger", "wireless speaker", "tech gadget", "usb adapter"],
  "Office Supplies": ["desk pad", "pen organizer", "notepad", "folder", "clipboard"],
  "Apparel & Textiles": ["polo shirt", "t-shirt", "cap", "jacket", "hoodie"],
  "Wellness & Lifestyle": ["yoga mat", "fitness", "meditation", "exercise ball", "wellness"],
  "Travel & Mobility": ["luggage", "travel bag", "passport", "travel organizer", "travel mug"],
  "Awards & Recognition": ["trophy", "award", "crystal award", "acrylic plaque", "medal"],
  "Eco-Friendly Gifts": ["bamboo", "eco-friendly", "sustainable", "recycled", "natural"],
};

// Map specific keywords to curated image URLs 
// Using Picsum Photos (picsum.photos) for reliable, consistent product images
// Provides high-quality placeholder images with deterministic seeding
const UNSPLASH_PHOTO_MAPPING: Record<string, string> = {
  // Executive Gifts - Premium leather and desk items
  "briefcase": "https://picsum.photos/500/500?random=1",
  "leather portfolio": "https://picsum.photos/500/500?random=2",
  "portfolio": "https://picsum.photos/500/500?random=3",
  "desk organizer": "https://picsum.photos/500/500?random=4",
  "luxury pen": "https://picsum.photos/500/500?random=5",
  "pen gift": "https://picsum.photos/500/500?random=6",
  "pen set": "https://picsum.photos/500/500?random=7",
  "pen stand": "https://picsum.photos/500/500?random=8",
  "desk clock": "https://picsum.photos/500/500?random=9",
  "mouse pad": "https://picsum.photos/500/500?random=10",
  "business card": "https://picsum.photos/500/500?random=11",
  "paperweight": "https://picsum.photos/500/500?random=12",
  "notebook": "https://picsum.photos/500/500?random=13",
  "lamp": "https://picsum.photos/500/500?random=14",
  "photo frame": "https://picsum.photos/500/500?random=15",

  // Employee Recognition - Awards and trophies
  "award": "https://picsum.photos/500/500?random=16",
  "trophy": "https://picsum.photos/500/500?random=17",
  "medal": "https://picsum.photos/500/500?random=18",
  "recognition": "https://picsum.photos/500/500?random=19",
  "certificate": "https://picsum.photos/500/500?random=20",
  "plaque": "https://picsum.photos/500/500?random=21",
  "achievement": "https://picsum.photos/500/500?random=22",
  "pin": "https://picsum.photos/500/500?random=23",
  "ornament": "https://picsum.photos/500/500?random=24",

  // Drinkware & Hydration - Mugs, bottles, glasses
  "coffee mug": "https://picsum.photos/500/500?random=25",
  "mug": "https://picsum.photos/500/500?random=26",
  "water bottle": "https://picsum.photos/500/500?random=27",
  "tumbler": "https://picsum.photos/500/500?random=28",
  "thermos": "https://picsum.photos/500/500?random=29",
  "wine glass": "https://picsum.photos/500/500?random=30",
  "beer stein": "https://picsum.photos/500/500?random=31",
  "travel mug": "https://picsum.photos/500/500?random=32",
  "sport bottle": "https://picsum.photos/500/500?random=33",

  // Tech Accessories - Gadgets and devices
  "laptop": "https://picsum.photos/500/500?random=34",
  "charger": "https://picsum.photos/500/500?random=35",
  "wireless speaker": "https://picsum.photos/500/500?random=36",
  "speaker": "https://picsum.photos/500/500?random=37",
  "tech gadget": "https://picsum.photos/500/500?random=38",
  "usb adapter": "https://picsum.photos/500/500?random=39",
  "adapter": "https://picsum.photos/500/500?random=40",

  // Office Supplies - Desk and workspace items
  "desk pad": "https://picsum.photos/500/500?random=41",
  "organizer": "https://picsum.photos/500/500?random=42",
  "notepad": "https://picsum.photos/500/500?random=43",
  "folder": "https://picsum.photos/500/500?random=44",
  "clipboard": "https://picsum.photos/500/500?random=45",

  // Apparel & Textiles - Clothing and accessories
  "polo shirt": "https://picsum.photos/500/500?random=46",
  "t-shirt": "https://picsum.photos/500/500?random=47",
  "shirt": "https://picsum.photos/500/500?random=48",
  "cap": "https://picsum.photos/500/500?random=49",
  "hat": "https://picsum.photos/500/500?random=50",
  "jacket": "https://picsum.photos/500/500?random=51",
  "hoodie": "https://picsum.photos/500/500?random=52",
  "apparel": "https://picsum.photos/500/500?random=53",

  // Wellness & Lifestyle - Yoga, fitness, meditation
  "yoga mat": "https://picsum.photos/500/500?random=54",
  "yoga": "https://picsum.photos/500/500?random=55",
  "fitness": "https://picsum.photos/500/500?random=56",
  "meditation": "https://picsum.photos/500/500?random=57",
  "exercise ball": "https://picsum.photos/500/500?random=58",
  "exercise": "https://picsum.photos/500/500?random=59",
  "wellness": "https://picsum.photos/500/500?random=60",
  "tracker": "https://picsum.photos/500/500?random=61",

  // Travel & Mobility - Luggage and travel gear
  "luggage": "https://picsum.photos/500/500?random=62",
  "travel bag": "https://picsum.photos/500/500?random=63",
  "passport": "https://picsum.photos/500/500?random=64",
  "travel organizer": "https://picsum.photos/500/500?random=65",
  "travel": "https://picsum.photos/500/500?random=66",
  "tag": "https://picsum.photos/500/500?random=67",
  "bag": "https://picsum.photos/500/500?random=68",

  // Awards & Recognition - Trophies and plaques
  "crystal award": "https://picsum.photos/500/500?random=69",
  "acrylic plaque": "https://picsum.photos/500/500?random=70",

  // Eco-Friendly Gifts - Sustainable and natural products
  "bamboo": "https://picsum.photos/500/500?random=71",
  "eco-friendly": "https://picsum.photos/500/500?random=72",
  "sustainable": "https://picsum.photos/500/500?random=73",
  "recycled": "https://picsum.photos/500/500?random=74",
  "natural": "https://picsum.photos/500/500?random=75",
};

// Alternative high-quality placeholder service URLs
const getPixabayStylePlaceholder = (category: string, productName: string, index: number): string => {
  const categoryKeywords = CATEGORY_IMAGE_KEYWORDS[category] || ["product"];
  const keyword = categoryKeywords[index % categoryKeywords.length] || "product";
  
  // Using picsum.photos with seed for deterministic images
  return `https://picsum.photos/500/500?random=${category.replace(/\s+/g, "_")}_${index}`;
};

// Get Unsplash image URL (now returns full URL directly)
const getUnsplashUrl = (photoUrl: string): string => {
  // If already a full URL, return as-is
  if (photoUrl.startsWith('http')) {
    return photoUrl;
  }
  // Fallback: construct URL from photo ID (legacy support)
  return `https://images.unsplash.com/${photoUrl}?w=500&h=500&fit=crop&q=80`;
};

// Fallback gradient/color based placeholder
const getColorPlaceholder = (category: string, productName: string): string => {
  const colors = [
    "FF6B6B", // Red
    "4ECDC4", // Teal
    "45B7D1", // Blue
    "96CEB4", // Green
    "FFEAA7", // Yellow
    "DDA15E", // Brown
    "BC6C25", // Dark Brown
    "8B5A8E", // Purple
    "FF6B9D", // Pink
    "C44569", // Rose
  ];
  
  const colorIndex = productName.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];
  const textColor = "FFFFFF";
  
  // Create placeholder with text
  const encodedText = encodeURIComponent(productName.substring(0, 30));
  return `https://via.placeholder.com/500x500/${bgColor}/${textColor}?text=${encodedText}`;
};

/**
 * Generate appropriate image URL for a product
 * Falls back through multiple services for reliability
 */
export function generateProductImageUrl(
  category: string,
  productName: string,
  productIndex: number
): string {
  // Try to match specific product names to keywords
  const lowerProductName = productName.toLowerCase();
  const lowerCategory = category.toLowerCase();
  
  // Search for matching keyword
  let matchedKeyword: string | null = null;
  for (const [keyword, photoId] of Object.entries(UNSPLASH_PHOTO_MAPPING)) {
    if (lowerProductName.includes(keyword)) {
      return getUnsplashUrl(photoId);
    }
  }
  
  // Try category keywords
  const categoryKeywords = CATEGORY_IMAGE_KEYWORDS[category];
  if (categoryKeywords) {
    const keyword = categoryKeywords[productIndex % categoryKeywords.length];
    if (UNSPLASH_PHOTO_MAPPING[keyword]) {
      return getUnsplashUrl(UNSPLASH_PHOTO_MAPPING[keyword]);
    }
  }
  
  // Fallback to color placeholder with product name
  return getColorPlaceholder(category, productName);
}

/**
 * Generate array of image URLs for a product (for multi-image support)
 */
export function generateProductImageUrls(
  category: string,
  productName: string,
  productIndex: number,
  count: number = 3
): { src: string; alt: string }[] {
  const images: { src: string; alt: string }[] = [];
  
  // Primary image
  images.push({
    src: generateProductImageUrl(category, productName, productIndex),
    alt: productName,
  });
  
  // Additional angle/views (using slight variations)
  for (let i = 1; i < count; i++) {
    images.push({
      src: generateProductImageUrl(category, productName, productIndex + i * 1000),
      alt: `${productName} - View ${i + 1}`,
    });
  }
  
  return images;
}

/**
 * Get category-specific default image
 */
export function getCategoryDefaultImage(category: string): string {
  const defaultImages: Record<string, string> = {
    "Executive Gifts": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop&q=80",
    "Employee Recognition": "https://images.unsplash.com/photo-1540575467063-178f50911e94?w=500&h=500&fit=crop&q=80",
    "Drinkware & Hydration": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop&q=80",
    "Tech Accessories": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop&q=80",
    "Office Supplies": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=500&fit=crop&q=80",
    "Apparel & Textiles": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop&q=80",
    "Wellness & Lifestyle": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=500&fit=crop&q=80",
    "Travel & Mobility": "https://images.unsplash.com/photo-1526941481183-34f63f1ac040?w=500&h=500&fit=crop&q=80",
    "Awards & Recognition": "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=500&fit=crop&q=80",
    "Eco-Friendly Gifts": "https://images.unsplash.com/photo-1542601906960-ba2006ce398f?w=500&h=500&fit=crop&q=80",
  };
  
  return defaultImages[category] || getColorPlaceholder(category, "Product");
}
