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

// Map specific keywords to curated unsplash photo IDs for reliability
const UNSPLASH_PHOTO_MAPPING: Record<string, string> = {
  // Executive Gifts
  "briefcase": "photo-1622296277387-114a-8b60-3fda5f5e8c00",
  "leather portfolio": "photo-1553062407-98eeb64c6a62",
  "desk organizer": "photo-1612198188060-c7c2a3b66eae",
  "luxury pen": "photo-1581092161562-40038e57c47a",
  "desk clock": "photo-1579769673668-461cb66d7480",

  // Employee Recognition
  "award": "photo-1540575467063-178f50911e94",
  "trophy": "photo-1540575467063-178f50911e94",
  "medal": "photo-1578926314433-8af2f400458b",
  "recognition": "photo-1552664730-d307ca884978",
  "certificate": "photo-1493857671505-72967e2e2760",

  // Drinkware
  "coffee mug": "photo-1509042239860-f550ce710b93",
  "water bottle": "photo-1535632066927-ab7c9ab60908",
  "tumbler": "photo-1602087113235-7d7a39bde438",
  "thermos": "photo-1602087113235-7d7a39bde438",
  "wine glass": "photo-1510812431401-41d2cab2de3d",

  // Tech Accessories
  "laptop": "photo-1517694712202-14dd9538aa97",
  "phone charger": "photo-1556656793-08538906a9f8",
  "wireless speaker": "photo-1608043152269-423dbba4e7e1",
  "tech gadget": "photo-1625948515291-69613efd103f",
  "usb adapter": "photo-1597872200969-2b65d56bd16b",

  // Office Supplies
  "desk pad": "photo-1484480974693-6ca0a78fb36b",
  "pen organizer": "photo-1484480974693-6ca0a78fb36b",
  "notepad": "photo-1484480974693-6ca0a78fb36b",
  "folder": "photo-1484480974693-6ca0a78fb36b",
  "clipboard": "photo-1484480974693-6ca0a78fb36b",

  // Apparel
  "polo shirt": "photo-1521572163474-6864f9cf17ab",
  "t-shirt": "photo-1521572163474-6864f9cf17ab",
  "cap": "photo-1521572163474-6864f9cf17ab",
  "jacket": "photo-1551028719-00167b16ebc5",
  "hoodie": "photo-1556821552-107fcaa46f67",

  // Wellness
  "yoga mat": "photo-1506126613408-eca07ce68773",
  "fitness": "photo-1534438327276-14e5300c3a48",
  "meditation": "photo-1506126613408-eca07ce68773",
  "exercise ball": "photo-1534438327276-14e5300c3a48",
  "wellness": "photo-1506126613408-eca07ce68773",

  // Travel
  "luggage": "photo-1526941481183-34f63f1ac040",
  "travel bag": "photo-1526941481183-34f63f1ac040",
  "passport": "photo-1488646953014-85cb44e25828",
  "travel organizer": "photo-1526941481183-34f63f1ac040",
  "travel mug": "photo-1559056199-641a0ac8b8d2",

  // Awards
  "crystal award": "photo-1540575467063-178f50911e94",
  "acrylic plaque": "photo-1540575467063-178f50911e94",

  // Eco-Friendly
  "bamboo": "photo-1518837695005-2083093ee35b",
  "eco-friendly": "photo-1518837695005-2083093ee35b",
  "sustainable": "photo-1518837695005-2083093ee35b",
  "recycled": "photo-1518837695005-2083093ee35b",
  "natural": "photo-1518837695005-2083093ee35b",
};

// Alternative high-quality placeholder service URLs
const getPixabayStylePlaceholder = (category: string, productName: string, index: number): string => {
  const categoryKeywords = CATEGORY_IMAGE_KEYWORDS[category] || ["product"];
  const keyword = categoryKeywords[index % categoryKeywords.length] || "product";
  
  // Using picsum.photos with seed for deterministic images
  return `https://picsum.photos/500/500?random=${category.replace(/\s+/g, "_")}_${index}`;
};

// Get Unsplash image URL
const getUnsplashUrl = (photoId: string): string => {
  return `https://images.unsplash.com/${photoId}?w=500&h=500&fit=crop&crop=faces`;
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
    "Executive Gifts": getUnsplashUrl("photo-1553062407-98eeb64c6a62"),
    "Employee Recognition": getUnsplashUrl("photo-1540575467063-178f50911e94"),
    "Drinkware & Hydration": getUnsplashUrl("photo-1509042239860-f550ce710b93"),
    "Tech Accessories": getUnsplashUrl("photo-1517694712202-14dd9538aa97"),
    "Office Supplies": getUnsplashUrl("photo-1484480974693-6ca0a78fb36b"),
    "Apparel & Textiles": getUnsplashUrl("photo-1521572163474-6864f9cf17ab"),
    "Wellness & Lifestyle": getUnsplashUrl("photo-1506126613408-eca07ce68773"),
    "Travel & Mobility": getUnsplashUrl("photo-1526941481183-34f63f1ac040"),
    "Awards & Recognition": getUnsplashUrl("photo-1540575467063-178f50911e94"),
    "Eco-Friendly Gifts": getUnsplashUrl("photo-1518837695005-2083093ee35b"),
  };
  
  return defaultImages[category] || getColorPlaceholder(category, "Product");
}
