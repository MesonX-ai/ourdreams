<?php
/**
 * upload.php — logo / artwork upload for gift branding.
 * MIME + size validated; files land outside the web root's executable path.
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

od_rate_limit('upload', 30, 600);

if (empty($_FILES['file'])) {
    od_respond(false, 'No file.', [], [], 422);
}

$ALLOWED = ['image/png' => 'png', 'image/jpeg' => 'jpg', 'image/svg+xml' => 'svg', 'application/pdf' => 'pdf'];
$f = $_FILES['file'];
if (!isset($ALLOWED[$f['type']]) || $f['size'] > 5 * 1024 * 1024) {
    od_respond(false, 'Unsupported file (png/jpg/svg/pdf, 5MB max).', [], [], 422);
}

$dir = sys_get_temp_dir() . '/od_uploads';
if (!is_dir($dir)) {
    mkdir($dir, 0750, true);
}
$name = bin2hex(random_bytes(12)) . '.' . $ALLOWED[$f['type']];
if (!move_uploaded_file($f['tmp_name'], $dir . '/' . $name)) {
    od_respond(false, 'Upload failed.', [], [], 500);
}
// In production: move into the WP uploads tree and return a public URL.
od_respond(true, 'Uploaded.', ['file' => $name]);

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
