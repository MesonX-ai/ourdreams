<?php
/**
 * WooCommerce REST API Proxy
 *
 * Proxy endpoint that forwards authenticated requests to the WooCommerce
 * REST API.  In dev mode the Next.js rewrites proxy /api/api.php to
 * http://127.0.0.1:8000/api.php (see start_local.sh and next.config.mjs).
 * In production PHP runs same-origin at /api/api.php on ourdreams.us.
 *
 * Usage examples (dev):
 *   http://localhost:3000/api/api.php?path=products
 *   http://localhost:3000/api/api.php?path=products&fields=id,name,price
 *   http://localhost:3000/api/api.php?path=products/123
 *
 * The query string is forwarded as-is to the WooCommerce API; the only
 * special parameter is `path` which maps to the WC REST endpoint segment
 * after /wc/v3/.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle CORS preflight.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/**
 * Handle corporate gifts API requests (fallback endpoint)
 */
function handleCorporateGiftsRequest($path) {
    $parts = explode('/', trim($path, '/'));
    
    if (count($parts) < 2) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid corporate gifts endpoint']);
        return;
    }

    $action = $parts[1];
    $id = isset($parts[2]) ? (int)$parts[2] : null;

    switch ($action) {
        case 'categories':
            if ($id) {
                $result = CorporateGiftsAPI::getCategoryById($id);
                if ($result) {
                    echo $result;
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Category not found']);
                }
            } else {
                echo CorporateGiftsAPI::getCategories();
            }
            break;

        case 'products':
            $categoryId = isset($_GET['category']) ? (int)$_GET['category'] : 100;
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $per_page = isset($_GET['per_page']) ? (int)$_GET['per_page'] : 20;
            
            $result = CorporateGiftsAPI::getProductsByCategory($categoryId, $page, $per_page);
            if ($result) {
                header('X-WP-Total: ' . $result['total']);
                header('X-WP-TotalPages: ' . ceil($result['total'] / $per_page));
                echo json_encode($result['products']);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Category not found']);
            }
            break;

        case 'search':
            $query = isset($_GET['q']) ? $_GET['q'] : '';
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $per_page = isset($_GET['per_page']) ? (int)$_GET['per_page'] : 20;
            
            $result = CorporateGiftsAPI::search($query, $page, $per_page);
            header('X-WP-Total: ' . $result['total']);
            header('X-WP-TotalPages: ' . ceil($result['total'] / $per_page));
            echo json_encode($result['products']);
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'Unknown corporate gifts endpoint: ' . $action]);
    }
}

// Load configuration (git-ignored).
$config_file = __DIR__ . '/config.php';
if (!file_exists($config_file)) {
    http_response_code(500);
    echo json_encode(['error' => 'Configuration file (php/config.php) not found.']);
    exit;
}
require $config_file;

// Load corporate gifts helper for fallback
require_once __DIR__ . '/corporate-gifts.php';

// Determine the WooCommerce API endpoint path.
$path = isset($_GET['path']) ? $_GET['path'] : '';
$path = trim($path, '/');

if ($path === '') {
    // Default: list products.
    $path = 'products';
}

// Check if this is a corporate gifts request (for fallback handling)
$is_corporate_request = false;
if (strpos($path, 'corporate-gifts') === 0) {
    $is_corporate_request = true;
    // Handle corporate gifts endpoints
    handleCorporateGiftsRequest($path);
    exit;
}

// Build the full API URL for WooCommerce.
$api_url = WC_API_URL . '/' . $path;

// Append consumer key / secret for authentication.
$query_params = [
    'consumer_key'    => WC_CONSUMER_KEY,
    'consumer_secret' => WC_CONSUMER_SECRET,
];

// Forward any additional query parameters (except `path` which we consumed).
foreach ($_GET as $key => $value) {
    if ($key === 'path') {
        continue;
    }
    $query_params[$key] = $value;
}

$api_url = $api_url . '?' . http_build_query($query_params);

// Determine HTTP method.
$method = $_SERVER['REQUEST_METHOD'];

// Read request body for POST/PUT.
$body = null;
if (in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE'])) {
    $body = file_get_contents('php://input');
}

// Initialize cURL.
$ch = curl_init($api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

if ($body !== null) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
}

// Forward relevant headers.
$headers = [];
foreach (getallheaders() as $name => $value) {
    if (strtolower($name) !== 'host' && strtolower($name) !== 'content-length') {
        $headers[] = "$name: $value";
    }
}
if (!empty($headers)) {
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
}

// Execute the request.
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// Handle cURL errors - implement fallback to corporate gifts for categories/products
if ($response === false) {
    // Try fallback to corporate gifts for certain endpoints
    if (preg_match('/products\/categories|products\?/', $path)) {
        http_response_code(503);
        echo json_encode([
            'error' => 'WooCommerce API unavailable. Please use /api/api.php?path=corporate-gifts/categories',
            'fallback' => 'corporate-gifts API',
        ]);
    } else {
        http_response_code(502);
        echo json_encode([
            'error'   => 'Failed to reach WooCommerce API',
            'details' => $error,
        ]);
    }
    exit;
}

// Forward the response from WooCommerce.
http_response_code($http_code);
echo $response;
