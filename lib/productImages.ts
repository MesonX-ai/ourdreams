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

// Map specific keywords to curated unsplash photo URLs (high-quality, corporate-appropriate)
const UNSPLASH_PHOTO_MAPPING: Record<string, string> = {
  // Executive Gifts - Premium leather and desk items
  "briefcase": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop&q=80",
  "leather portfolio": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&q=80",
  "portfolio": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&q=80",
  "desk organizer": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=500&fit=crop&q=80",
  "luxury pen": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop&q=80",
  "pen gift": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop&q=80",
  "pen set": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop&q=80",
  "pen stand": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop&q=80",
  "desk clock": "https://images.unsplash.com/photo-1579769673668-461cb66d7480?w=500&h=500&fit=crop&q=80",
  "mouse pad": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=500&fit=crop&q=80",
  "business card": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop&q=80",
  "paperweight": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop&q=80",
  "notebook": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop&q=80",
  "lamp": "https://images.unsplash.com/photo-1565636192335-14f8c7df4b5d?w=500&h=500&fit=crop&q=80",
  "photo frame": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop&q=80",

  // Employee Recognition - Awards and trophies
  "award": "https://images.unsplash.com/photo-1540575467063-178f50911e94?w=500&h=500&fit=crop&q=80",
  "trophy": "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=500&fit=crop&q=80",
  "medal": "https://images.unsplash.com/photo-1551027613-112d4d1d313e?w=500&h=500&fit=crop&q=80",
  "recognition": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop&q=80",
  "certificate": "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=500&h=500&fit=crop&q=80",
  "plaque": "https://images.unsplash.com/photo-1540575467063-178f50911e94?w=500&h=500&fit=crop&q=80",
  "achievement": "https://images.unsplash.com/photo-1540575467063-178f50911e94?w=500&h=500&fit=crop&q=80",
  "pin": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop&q=80",
  "ornament": "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&h=500&fit=crop&q=80",

  // Drinkware & Hydration - Mugs, bottles, glasses
  "coffee mug": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop&q=80",
  "mug": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop&q=80",
  "water bottle": "https://images.unsplash.com/photo-1602087113235-7d7a39bde438?w=500&h=500&fit=crop&q=80",
  "tumbler": "https://images.unsplash.com/photo-1614707267537-b85faf00021b?w=500&h=500&fit=crop&q=80",
  "thermos": "https://images.unsplash.com/photo-1602087113235-7d7a39bde438?w=500&h=500&fit=crop&q=80",
  "wine glass": "https://images.unsplash.com/photo-1510812431401-41d2cab2de3d?w=500&h=500&fit=crop&q=80",
  "beer stein": "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500&h=500&fit=crop&q=80",
  "travel mug": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop&q=80",
  "sport bottle": "https://images.unsplash.com/photo-1602087113235-7d7a39bde438?w=500&h=500&fit=crop&q=80",

  // Tech Accessories - Gadgets and devices
  "laptop": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop&q=80",
  "charger": "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop&q=80",
  "wireless speaker": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&q=80",
  "speaker": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&q=80",
  "tech gadget": "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop&q=80",
  "usb adapter": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop&q=80",
  "adapter": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop&q=80",

  // Office Supplies - Desk and workspace items
  "desk pad": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=500&fit=crop&q=80",
  "organizer": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=500&fit=crop&q=80",
  "notepad": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=500&fit=crop&q=80",
  "folder": "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop&q=80",
  "clipboard": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=500&fit=crop&q=80",

  // Apparel & Textiles - Clothing and accessories
  "polo shirt": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop&q=80",
  "t-shirt": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&q=80",
  "shirt": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop&q=80",
  "cap": "https://images.unsplash.com/photo-1533418735396-971a0b1f89d7?w=500&h=500&fit=crop&q=80",
  "hat": "https://images.unsplash.com/photo-1533418735396-971a0b1f89d7?w=500&h=500&fit=crop&q=80",
  "jacket": "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop&q=80",
  "hoodie": "https://images.unsplash.com/photo-1556821552-107fcaa46f67?w=500&h=500&fit=crop&q=80",
  "apparel": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop&q=80",

  // Wellness & Lifestyle - Yoga, fitness, meditation
  "yoga mat": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=500&fit=crop&q=80",
  "yoga": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=500&fit=crop&q=80",
  "fitness": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop&q=80",
  "meditation": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=500&fit=crop&q=80",
  "exercise ball": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop&q=80",
  "exercise": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop&q=80",
  "wellness": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=500&fit=crop&q=80",
  "tracker": "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop&q=80",

  // Travel & Mobility - Luggage and travel gear
  "luggage": "https://images.unsplash.com/photo-1526941481183-34f63f1ac040?w=500&h=500&fit=crop&q=80",
  "travel bag": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&q=80",
  "passport": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=500&fit=crop&q=80",
  "travel organizer": "https://images.unsplash.com/photo-1556821552-107fcaa46f67?w=500&h=500&fit=crop&q=80",
  "travel": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=500&fit=crop&q=80",
  "tag": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=500&fit=crop&q=80",
  "bag": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&q=80",

  // Awards & Recognition - Trophies and plaques
  "crystal award": "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=500&fit=crop&q=80",
  "acrylic plaque": "https://images.unsplash.com/photo-1540575467063-178f50911e94?w=500&h=500&fit=crop&q=80",

  // Eco-Friendly Gifts - Sustainable and natural products
  "bamboo": "https://images.unsplash.com/photo-1542601906960-ba2006ce398f?w=500&h=500&fit=crop&q=80",
  "eco-friendly": "https://images.unsplash.com/photo-1542601906960-ba2006ce398f?w=500&h=500&fit=crop&q=80",
  "sustainable": "https://images.unsplash.com/photo-1542601906960-ba2006ce398f?w=500&h=500&fit=crop&q=80",
  "recycled": "https://images.unsplash.com/photo-1542601906960-ba2006ce398f?w=500&h=500&fit=crop&q=80",
  "natural": "https://images.unsplash.com/photo-1542601906960-ba2006ce398f?w=500&h=500&fit=crop&q=80",
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
