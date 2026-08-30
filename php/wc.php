<?php
/**
 * wc.php — whitelisted, server-signed WooCommerce REST reads (Tier 3).
 * The browser NEVER sees the consumer key/secret. Only the actions listed in
 * ALLOWED_ACTIONS are proxied; arbitrary paths are refused.
 */
require_once __DIR__ . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    od_respond(false, 'Method not allowed.', [], [], 405);
}

$token = '';
if (isset($_SERVER['HTTP_AUTHORIZATION']) && preg_match('/Bearer\s+(.+)/', $_SERVER['HTTP_AUTHORIZATION'], $m)) {
    $token = $m[1];
}
if (!od_verify_jwt($token)) {
    od_respond(false, 'Unauthorized.', [], [], 401);
}

$body = od_input();
$action = $body['action'] ?? '';
$ALLOWED_ACTIONS = ['orders', 'customer'];
if (!in_array($action, $ALLOWED_ACTIONS, true)) {
    od_respond(false, 'Action not allowed.', [], [], 400);
}

if (!defined('WC_CONSUMER_KEY') || WC_CONSUMER_KEY === '') {
    od_respond(false, 'Woo not configured on the server.', [], [], 503);
}

$path = $action === 'orders' ? '/wc/v3/orders' : '/wc/v3/customers/me';
$url = rtrim(WP_BASE_URL, '/') . '/wp-json' . $path;
$url .= (str_contains($url, '?') ? '&' : '?') . 'consumer_key=' . urlencode(WC_CONSUMER_KEY) . '&consumer_secret=' . urlencode(WC_CONSUMER_SECRET);

$ch = curl_init($url);
curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 15, CURLOPT_HTTPHEADER => ['Accept: application/json']]);
$res = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($res === false) {
    od_respond(false, 'Upstream error.', [], [], 502);
}
od_respond(true, 'ok', ['code' => $code, 'body' => json_decode($res, true) ?: []]);

function od_verify_jwt(string $token): bool
{
    if ($token === '' || !defined('JWT_SECRET') || JWT_SECRET === '') {
        return false;
    }
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return false;
    }
    $sig = hash_hmac('sha256', $parts[0] . '.' . $parts[1], JWT_SECRET, true);
    return hash_equals(base64url($sig), $parts[2]);
}
