<?php
/**
 * campaigns.php — CRUD for the od_campaign CPT (Tier 3).
 * Validates the canvas JSON (mirrors lib/campaign/schema.ts) and requires a
 * bearer token issued by auth.php. Autosave from the builder lands here.
 */
require_once __DIR__ . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    od_respond(false, 'Method not allowed.', [], [], 405);
}

$data = od_input();
od_honeypot($data);
od_rate_limit('campaign', 60, 600);

// --- auth: require a valid bearer token (HMAC JWT, see auth.php) ----------
$token = '';
if (isset($_SERVER['HTTP_AUTHORIZATION']) && preg_match('/Bearer\s+(.+)/', $_SERVER['HTTP_AUTHORIZATION'], $m)) {
    $token = $m[1];
}
if (!od_verify_jwt($token)) {
    od_respond(false, 'Unauthorized.', [], [], 401);
}

// --- validate the campaign shape -----------------------------------------
if (empty($data['name']) || mb_strlen(trim($data['name'])) < 2) {
    od_respond(false, 'Campaign needs a name.', [], ['name' => 'Name is required.'], 422);
}
if (!is_array($data['nodes'] ?? null) || count($data['nodes']) < 1) {
    od_respond(false, 'A campaign needs at least one node.', [], ['nodes' => 'Add a node.'], 422);
}
$allowed_kinds = ['trigger','audience','condition','gift','budget','approval','delay','send','track'];
foreach ($data['nodes'] as $node) {
    if (!isset($node['kind']) || !in_array($node['kind'], $allowed_kinds, true)) {
        od_respond(false, 'Invalid node kind.', [], ['nodes' => 'Unknown node.'], 422);
    }
}
// Persist: in production, wp_insert_post(od_campaign) + meta. Return an id.
od_respond(true, 'Campaign saved.', ['id' => $data['id'] ?? random_int(1000, 9999)]);

/* --- minimal JWT verify (HS256) ----------------------------------------- */
function od_verify_jwt(string $token): bool
{
    if ($token === '' || !defined('JWT_SECRET') || JWT_SECRET === '') {
        return false;
    }
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return false;
    }
    $payload = $parts[0] . '.' . $parts[1];
    $sig = hash_hmac('sha256', $payload, JWT_SECRET, true);
    return hash_equals(base64url($sig), $parts[2]);
}
function base64url(string $b): string
{
    return rtrim(strtr(base64_encode($b), '+/', '-_'), '=');
}
