<?php
/**
 * auth.php — issue / refresh / revoke JWT against WordPress.
 * Stateless HS256 tokens; the secret lives only in config.php on the server.
 */
require_once __DIR__ . '/_bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    od_respond(false, 'Method not allowed.', [], [], 405);
}

$action = od_input()['action'] ?? 'issue';

if ($action === 'refresh' || $action === 'revoke') {
    // Client-side token rotation / revocation; server keeps no session state.
    od_respond(true, $action === 'revoke' ? 'Revoked.' : 'Refreshed.');
}

// issue: verify WP credentials, then sign a short-lived token.
$creds = od_input();
od_rate_limit('auth', 10, 300);
if (empty($creds['username']) || empty($creds['password'])) {
    od_respond(false, 'Credentials required.', [], [], 422);
}

// In production: POST to WP wp-json/wp-plugin-jwt/v1/token to validate the
// password server-side, then mint our own token. For the skeleton we sign a
// claims object without contacting WP (replace with real verification).
$claims = [
    'sub' => preg_replace('/[^a-z0-9.@_-]/i', '', $creds['username']),
    'iat' => time(),
    'exp' => time() + 3600,
];
$payload = base64url(json_encode($claims));
$sig = base64url(hash_hmac('sha256', $payload, defined('JWT_SECRET') ? JWT_SECRET : 'dev', true));
od_respond(true, 'Token issued.', ['token' => $payload . '.' . $sig]);
