<?php
/**
 * Corporate Gifts API Helper
 *
 * Bridges WooCommerce REST API with corporate gifts mock data.
 * Provides fallback support when WC products are unavailable.
 */

// Sample corporate gifts categories for API endpoints
// In production, these would come from corporateGifts.ts or a database

class CorporateGiftsAPI {
    private static $categories = [
        ['id' => 100, 'name' => 'Executive Gifts', 'slug' => 'executive-gifts'],
        ['id' => 101, 'name' => 'Employee Recognition', 'slug' => 'employee-recognition'],
        ['id' => 102, 'name' => 'Drinkware & Hydration', 'slug' => 'drinkware-hydration'],
        ['id' => 103, 'name' => 'Tech Accessories', 'slug' => 'tech-accessories'],
        ['id' => 104, 'name' => 'Office Supplies', 'slug' => 'office-supplies'],
        ['id' => 105, 'name' => 'Apparel & Textiles', 'slug' => 'apparel-textiles'],
        ['id' => 106, 'name' => 'Wellness & Lifestyle', 'slug' => 'wellness-lifestyle'],
        ['id' => 107, 'name' => 'Travel & Mobility', 'slug' => 'travel-mobility'],
        ['id' => 108, 'name' => 'Awards & Recognition', 'slug' => 'awards-recognition'],
        ['id' => 109, 'name' => 'Eco-Friendly Gifts', 'slug' => 'eco-friendly-gifts'],
    ];

    /**
     * Get corporate gifts categories as JSON
     */
    public static function getCategories() {
        return json_encode(self::$categories);
    }

    /**
     * Get a category by ID
     */
    public static function getCategoryById($id) {
        foreach (self::$categories as $category) {
            if ($category['id'] == $id) {
                return json_encode($category);
            }
        }
        return null;
    }

    /**
     * Generate mock corporate gift products for a category
     */
    public static function getProductsByCategory($categoryId, $page = 1, $per_page = 20) {
        $category = null;
        foreach (self::$categories as $cat) {
            if ($cat['id'] == $categoryId) {
                $category = $cat;
                break;
            }
        }

        if (!$category) {
            return null;
        }

        // Generate sample products for this category
        $products = [];
        $basePrice = 50;
        
        for ($i = 1; $i <= 30; $i++) {
            $price = $basePrice + ($i * 5);
            $regularPrice = $price + 20;
            
            $products[] = [
                'id' => (1000 + $categoryId * 100 + $i),
                'name' => $category['name'] . ' Product ' . $i,
                'sku' => 'CORP-' . strtoupper(str_replace(' ', '-', $category['name'])) . '-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'price' => number_format($price, 2),
                'regular_price' => number_format($regularPrice, 2),
                'description' => 'Premium ' . $category['name'] . ' product',
                'categories' => [
                    [
                        'id' => $categoryId,
                        'name' => $category['name'],
                        'slug' => $category['slug']
                    ]
                ],
                'images' => [
                    [
                        'src' => 'https://via.placeholder.com/300x300?text=' . urlencode($category['name'] . '+' . $i),
                        'alt' => $category['name'] . ' Product ' . $i
                    ]
                ],
                'stock_status' => 'instock',
                'in_stock' => true,
                'brand' => 'Corporate Brand ' . chr(65 + ($i % 10))
            ];
        }

        // Paginate
        $start = ($page - 1) * $per_page;
        $paginated = array_slice($products, $start, $per_page);

        return [
            'products' => $paginated,
            'total' => count($products),
            'page' => $page,
            'per_page' => $per_page
        ];
    }

    /**
     * Search corporate gifts
     */
    public static function search($query, $page = 1, $per_page = 20) {
        $allProducts = [];
        foreach (self::$categories as $category) {
            $result = self::getProductsByCategory($category['id'], 1, 100);
            if ($result) {
                $allProducts = array_merge($allProducts, $result['products']);
            }
        }

        $query = strtolower($query);
        $filtered = array_filter($allProducts, function($product) use ($query) {
            return stripos($product['name'], $query) !== false ||
                   stripos($product['description'], $query) !== false;
        });

        $start = ($page - 1) * $per_page;
        $paginated = array_slice($filtered, $start, $per_page);

        return [
            'products' => $paginated,
            'total' => count($filtered),
            'page' => $page,
            'per_page' => $per_page
        ];
    }
}

// Export for use by api.php
?>