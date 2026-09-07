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
