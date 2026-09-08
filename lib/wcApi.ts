export type WcCategory = {
  id: number;
  name: string;
  slug: string;
  count?: number;
  image?: {
    src?: string;
    alt?: string;
  };
};

export type WcProduct = {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  images: Array<{ src: string; alt?: string }>;
  categories: WcCategory[];
  stock_status?: "instock" | "outofstock" | "onbackorder";
};

export type WcPaymentMethod = {
  id: string;
  title: string;
  enabled: boolean;
};

export type WcOrderPayload = {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: Record<string, string>;
  shipping: Record<string, string>;
  line_items: Array<{ product_id: number; quantity: number }>;
};

const PROXY_BASE_PATHS = ["/api/api.php", "/api/api", "/php/api.php", "/api.php"];
const STORE_API_BASES = ["/wp-json/wc/store/v1"];

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  let response: Response;
  try {
    response = await fetch(url, { cache: "no-store", ...init });
  } catch {
    return null;
  }
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as T;
}

async function safeFetch(url: string, init?: RequestInit): Promise<Response | null> {
  try {
    return await fetch(url, { cache: "no-store", ...init });
  } catch {
    return null;
  }
}

function fromMinorUnits(value?: string, unit = 2): string {
  if (!value) {
    return "0";
  }
  const n = Number(value);
  if (Number.isNaN(n)) {
    return "0";
  }
  return (n / Math.pow(10, unit)).toFixed(2);
}

function mapStoreProduct(raw: any): WcProduct {
  const minor = raw?.prices?.currency_minor_unit ?? 2;
  return {
    id: raw.id,
    name: raw.name,
    price: fromMinorUnits(raw?.prices?.price, minor),
    regular_price: fromMinorUnits(raw?.prices?.regular_price, minor),
    images: Array.isArray(raw.images)
      ? raw.images.map((image: any) => ({ src: image.src, alt: image.alt || image.name }))
      : [],
    categories: Array.isArray(raw.categories)
      ? raw.categories.map((category: any) => ({ id: category.id, name: category.name, slug: category.slug }))
      : [],
    stock_status: raw.stock_status,
  };
}

export async function getCategories(): Promise<WcCategory[]> {
  for (const endpoint of PROXY_BASE_PATHS) {
    const data = await fetchJson<WcCategory[]>(`${endpoint}?path=products/categories&per_page=100`);
    if (Array.isArray(data)) {
      return data;
    }
  }

  for (const base of STORE_API_BASES) {
    const data = await fetchJson<WcCategory[]>(`${base}/products/categories?per_page=100`);
    if (Array.isArray(data)) {
      return data;
    }
  }

  throw new Error("Unable to load categories.");
}

export async function getCategoryById(categoryId: number): Promise<WcCategory | null> {
  for (const endpoint of PROXY_BASE_PATHS) {
    const data = await fetchJson<WcCategory>(`${endpoint}?path=products/categories/${categoryId}`);
    if (data && typeof data.id === "number") {
      return data;
    }
  }

  const all = await getCategories().catch(() => [] as WcCategory[]);
  return all.find((category) => category.id === categoryId) || null;
}

export async function getProductsByCategory(
  categoryId: number,
  page: number,
  perPage: number
): Promise<{ products: WcProduct[]; total: number }> {
  for (const endpoint of PROXY_BASE_PATHS) {
    const response = await safeFetch(
      `${endpoint}?path=products&orderby=title&order=asc&status=publish&category=${categoryId}&per_page=${perPage}&page=${page}`,
      { cache: "no-store" }
    );

    if (response?.ok) {
      const total = Number(response.headers.get("x-wp-total") || "0");
      const data = (await response.json()) as WcProduct[];
      return { products: Array.isArray(data) ? data : [], total };
    }
  }

  for (const base of STORE_API_BASES) {
    const response = await safeFetch(
      `${base}/products?category=${categoryId}&per_page=${perPage}&page=${page}&orderby=date&order=desc`,
      { cache: "no-store" }
    );

    if (response?.ok) {
      const total = Number(response.headers.get("x-wp-total") || "0");
      const data = (await response.json()) as any[];
      const products = Array.isArray(data) ? data.map(mapStoreProduct) : [];
      return { products, total: total || products.length };
    }
  }

  throw new Error("Unable to load products.");
}

export async function getPaymentMethods(): Promise<WcPaymentMethod[]> {
  for (const endpoint of PROXY_BASE_PATHS) {
    const data = await fetchJson<WcPaymentMethod[]>(`${endpoint}?path=payment_gateways`);
    if (Array.isArray(data)) {
      return data;
    }
  }
  throw new Error("Unable to load payment methods.");
}

export async function createOrder(payload: WcOrderPayload): Promise<{ id: number; status: string }> {
  for (const endpoint of PROXY_BASE_PATHS) {
    const response = await safeFetch(`${endpoint}?path=orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response?.ok) {
      return (await response.json()) as { id: number; status: string };
    }
  }
  throw new Error("Unable to create order on configured WooCommerce proxy endpoints.");
}

// ===== CORPORATE GIFTS API FUNCTIONS =====

/**
 * Get corporate gift categories (fallback/enrichment)
 * Returns both WooCommerce categories and corporate gift categories
 */
export async function getCorporateGiftCategories(): Promise<WcCategory[]> {
  // Try to get categories from WooCommerce first
  const wcCategories = await getCategories().catch(() => [] as WcCategory[]);

  // Import and merge with corporate gift categories
  const { CORPORATE_GIFT_CATEGORIES } = await import("./corporateGifts");
  const corporateCategories: WcCategory[] = CORPORATE_GIFT_CATEGORIES.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    image: undefined,
  }));

  // Merge and deduplicate by slug
  const merged = [...wcCategories];
  const wcSlugs = new Set(wcCategories.map((c) => c.slug));
  corporateCategories.forEach((cat) => {
    if (!wcSlugs.has(cat.slug)) {
      merged.push(cat);
    }
  });

  return merged;
}

/**
 * Get corporate gifts by category ID (hybrid: WC + mock data)
 * Falls back to corporate gifts mock data if WooCommerce fails
 */
export async function getCorporateGiftsByCategory(
  categoryId: number,
  page: number = 1,
  perPage: number = 20
): Promise<{ products: WcProduct[]; total: number }> {
  // Try WooCommerce first
  const wcResult = await getProductsByCategory(categoryId, page, perPage).catch(() => null);
  if (wcResult && wcResult.products.length > 0) {
    return wcResult;
  }

  // Fallback to corporate gifts mock data
  const { getCorporateGiftsByCategory: getCorporateGifts } = await import("./corporateGifts");

  // Map corporate gift category ID to name
  const { CORPORATE_GIFT_CATEGORIES } = await import("./corporateGifts");
  const categoryName = CORPORATE_GIFT_CATEGORIES.find((c) => c.id === categoryId)?.name;

  if (!categoryName) {
    return { products: [], total: 0 };
  }

  const corporateResult = getCorporateGifts(categoryName, page, perPage);
  const products: WcProduct[] = corporateResult.products.map((cg) => ({
    id: cg.id,
    name: cg.name,
    price: cg.price.toString(),
    regular_price: cg.regularPrice.toString(),
    images: cg.images,
    categories: [{ id: categoryId, name: categoryName, slug: categoryName.toLowerCase().replace(/\s+/g, "-") }],
    stock_status: cg.inStock ? "instock" : "outofstock",
  }));

  return { products, total: corporateResult.total };
}

/**
 * Get all products from WooCommerce (fetches all pages)
 * Used for catalog view when syncing with live WooCommerce data
 */
export async function getAllProducts(
  perPage: number = 100,
  maxPages: number = 10
): Promise<{ products: WcProduct[]; total: number }> {
  const allProducts: WcProduct[] = [];
  let total = 0;
  let page = 1;
  let hasMore = true;

  for (const endpoint of PROXY_BASE_PATHS) {
    while (hasMore && page <= maxPages) {
      try {
        const response = await safeFetch(
          `${endpoint}?path=products&status=publish&per_page=${perPage}&page=${page}`,
          { cache: "no-store" }
        );

        if (response?.ok) {
          const data = (await response.json()) as WcProduct[];
          const pageTotal = Number(response.headers.get("x-wp-total") || data.length);
          total = pageTotal;

          if (Array.isArray(data) && data.length > 0) {
            allProducts.push(...data);
            hasMore = allProducts.length < pageTotal;
            page++;
          } else {
            hasMore = false;
          }
        } else {
          hasMore = false;
        }
      } catch {
        hasMore = false;
      }
    }

    if (allProducts.length > 0) {
      return { products: allProducts, total };
    }

    // Reset for next endpoint
    page = 1;
    hasMore = true;
    allProducts.length = 0;
  }

  // Try store API as fallback
  page = 1;
  hasMore = true;
  for (const base of STORE_API_BASES) {
    while (hasMore && page <= maxPages) {
      try {
        const response = await safeFetch(
          `${base}/products?per_page=${perPage}&page=${page}&orderby=date&order=desc&status=publish`,
          { cache: "no-store" }
        );

        if (response?.ok) {
          const data = (await response.json()) as any[];
          const pageTotal = Number(response.headers.get("x-wp-total") || data.length);
          total = pageTotal;

          if (Array.isArray(data) && data.length > 0) {
            const products = data.map(mapStoreProduct);
            allProducts.push(...products);
            hasMore = allProducts.length < pageTotal;
            page++;
          } else {
            hasMore = false;
          }
        } else {
          hasMore = false;
        }
      } catch {
        hasMore = false;
      }
    }

    if (allProducts.length > 0) {
      return { products: allProducts, total };
    }

    page = 1;
    hasMore = true;
    allProducts.length = 0;
  }

  return { products: allProducts, total: 0 };
}

/**
 * Search across all products (WooCommerce + corporate gifts)
 */
export async function searchProducts(
  query: string,
  page: number = 1,
  perPage: number = 20
): Promise<{ products: WcProduct[]; total: number }> {
  // Try WooCommerce search
  for (const endpoint of PROXY_BASE_PATHS) {
    const response = await safeFetch(
      `${endpoint}?path=products&search=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`,
      { cache: "no-store" }
    );

    if (response?.ok) {
      const total = Number(response.headers.get("x-wp-total") || "0");
      const data = (await response.json()) as WcProduct[];
      if (Array.isArray(data) && data.length > 0) {
        return { products: data, total };
      }
    }
  }

  // Fallback to corporate gifts search
  const { searchCorporateGifts } = await import("./corporateGifts");
  const corporateResult = searchCorporateGifts(query, page, perPage);
  const products: WcProduct[] = corporateResult.products.map((cg) => ({
    id: cg.id,
    name: cg.name,
    price: cg.price.toString(),
    regular_price: cg.regularPrice.toString(),
    images: cg.images,
    categories: [
      {
        id: 100,
        name: cg.category,
        slug: cg.category.toLowerCase().replace(/\s+/g, "-"),
      },
    ],
    stock_status: cg.inStock ? "instock" : "outofstock",
  }));

  return { products, total: corporateResult.total };
}
