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
// Using source.unsplash.com search redirect URLs for reliability - always returns current, active images
const UNSPLASH_PHOTO_MAPPING: Record<string, string> = {
  // Executive Gifts - Premium leather and desk items
  "briefcase": "https://source.unsplash.com/500x500/?briefcase,business",
  "leather portfolio": "https://source.unsplash.com/500x500/?leather,portfolio,briefcase",
  "portfolio": "https://source.unsplash.com/500x500/?portfolio,leather,business",
  "desk organizer": "https://source.unsplash.com/500x500/?desk,organizer,office",
  "luxury pen": "https://source.unsplash.com/500x500/?pen,luxury,writing",
  "pen gift": "https://source.unsplash.com/500x500/?pen,gift,luxury",
  "pen set": "https://source.unsplash.com/500x500/?pen,set,stationery",
  "pen stand": "https://source.unsplash.com/500x500/?pen,holder,desk",
  "desk clock": "https://source.unsplash.com/500x500/?clock,desk,time",
  "mouse pad": "https://source.unsplash.com/500x500/?mousepad,desk,office",
  "business card": "https://source.unsplash.com/500x500/?business,card,stationery",
  "paperweight": "https://source.unsplash.com/500x500/?paperweight,office,desk",
  "notebook": "https://source.unsplash.com/500x500/?notebook,leather,journal",
  "lamp": "https://source.unsplash.com/500x500/?lamp,desk,light",
  "photo frame": "https://source.unsplash.com/500x500/?frame,photo,picture",

  // Employee Recognition - Awards and trophies
  "award": "https://source.unsplash.com/500x500/?award,trophy,recognition",
  "trophy": "https://source.unsplash.com/500x500/?trophy,award,success",
  "medal": "https://source.unsplash.com/500x500/?medal,achievement,award",
  "recognition": "https://source.unsplash.com/500x500/?recognition,award,success",
  "certificate": "https://source.unsplash.com/500x500/?certificate,diploma,achievement",
  "plaque": "https://source.unsplash.com/500x500/?plaque,award,recognition",
  "achievement": "https://source.unsplash.com/500x500/?achievement,success,trophy",
  "pin": "https://source.unsplash.com/500x500/?pin,badge,medal",
  "ornament": "https://source.unsplash.com/500x500/?ornament,decoration,gift",

  // Drinkware & Hydration - Mugs, bottles, glasses
  "coffee mug": "https://source.unsplash.com/500x500/?coffee,mug,beverage",
  "mug": "https://source.unsplash.com/500x500/?mug,cup,coffee",
  "water bottle": "https://source.unsplash.com/500x500/?water,bottle,drink",
  "tumbler": "https://source.unsplash.com/500x500/?tumbler,glass,drink",
  "thermos": "https://source.unsplash.com/500x500/?thermos,bottle,travel",
  "wine glass": "https://source.unsplash.com/500x500/?wine,glass,alcohol",
  "beer stein": "https://source.unsplash.com/500x500/?beer,stein,glass",
  "travel mug": "https://source.unsplash.com/500x500/?travel,mug,coffee",
  "sport bottle": "https://source.unsplash.com/500x500/?sports,bottle,water",

  // Tech Accessories - Gadgets and devices
  "laptop": "https://source.unsplash.com/500x500/?laptop,computer,tech",
  "charger": "https://source.unsplash.com/500x500/?charger,cable,power",
  "wireless speaker": "https://source.unsplash.com/500x500/?speaker,wireless,audio",
  "speaker": "https://source.unsplash.com/500x500/?speaker,audio,music",
  "tech gadget": "https://source.unsplash.com/500x500/?gadget,tech,electronics",
  "usb adapter": "https://source.unsplash.com/500x500/?adapter,usb,cable",
  "adapter": "https://source.unsplash.com/500x500/?adapter,cable,connection",

  // Office Supplies - Desk and workspace items
  "desk pad": "https://source.unsplash.com/500x500/?desk,pad,office",
  "organizer": "https://source.unsplash.com/500x500/?organizer,desk,storage",
  "notepad": "https://source.unsplash.com/500x500/?notepad,paper,notes",
  "folder": "https://source.unsplash.com/500x500/?folder,file,office",
  "clipboard": "https://source.unsplash.com/500x500/?clipboard,paper,office",

  // Apparel & Textiles - Clothing and accessories
  "polo shirt": "https://source.unsplash.com/500x500/?polo,shirt,clothing",
  "t-shirt": "https://source.unsplash.com/500x500/?tshirt,shirt,apparel",
  "shirt": "https://source.unsplash.com/500x500/?shirt,clothing,apparel",
  "cap": "https://source.unsplash.com/500x500/?cap,hat,headwear",
  "hat": "https://source.unsplash.com/500x500/?hat,cap,fashion",
  "jacket": "https://source.unsplash.com/500x500/?jacket,coat,clothing",
  "hoodie": "https://source.unsplash.com/500x500/?hoodie,sweatshirt,casual",
  "apparel": "https://source.unsplash.com/500x500/?apparel,clothing,fashion",

  // Wellness & Lifestyle - Yoga, fitness, meditation
  "yoga mat": "https://source.unsplash.com/500x500/?yoga,mat,exercise",
  "yoga": "https://source.unsplash.com/500x500/?yoga,meditation,wellness",
  "fitness": "https://source.unsplash.com/500x500/?fitness,exercise,health",
  "meditation": "https://source.unsplash.com/500x500/?meditation,mindfulness,yoga",
  "exercise ball": "https://source.unsplash.com/500x500/?exercise,ball,fitness",
  "exercise": "https://source.unsplash.com/500x500/?exercise,fitness,gym",
  "wellness": "https://source.unsplash.com/500x500/?wellness,health,fitness",
  "tracker": "https://source.unsplash.com/500x500/?tracker,fitness,watch",

  // Travel & Mobility - Luggage and travel gear
  "luggage": "https://source.unsplash.com/500x500/?luggage,suitcase,travel",
  "travel bag": "https://source.unsplash.com/500x500/?travel,bag,luggage",
  "passport": "https://source.unsplash.com/500x500/?passport,travel,world",
  "travel organizer": "https://source.unsplash.com/500x500/?travel,organizer,luggage",
  "travel": "https://source.unsplash.com/500x500/?travel,adventure,journey",
  "tag": "https://source.unsplash.com/500x500/?tag,luggage,travel",
  "bag": "https://source.unsplash.com/500x500/?bag,leather,fashion",

  // Awards & Recognition - Trophies and plaques
  "crystal award": "https://source.unsplash.com/500x500/?crystal,award,trophy",
  "acrylic plaque": "https://source.unsplash.com/500x500/?plaque,acrylic,award",

  // Eco-Friendly Gifts - Sustainable and natural products
  "bamboo": "https://source.unsplash.com/500x500/?bamboo,nature,sustainable",
  "eco-friendly": "https://source.unsplash.com/500x500/?eco,sustainable,green",
  "sustainable": "https://source.unsplash.com/500x500/?sustainable,eco,nature",
  "recycled": "https://source.unsplash.com/500x500/?recycled,eco,green",
  "natural": "https://source.unsplash.com/500x500/?natural,organic,earth",
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
