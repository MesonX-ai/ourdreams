<?php
/**
 * _bootstrap.php — shared hardening for the OurDreams PHP proxy.
 *
 * Every endpoint under /api/ begins by requiring this file. It sets secure
 * headers, parses JSON input, enforces the same-origin allowlist, applies a
 * light per-IP rate limit, and provides a JSON respond() helper. Real secrets
 * live in config.php (gitignored); config.sample.php is committed.
 */

declare(strict_types=1);

$od_config = __DIR__ . '/config.php';
if (!is_file($od_config)) {
    $od_config = __DIR__ . '/config.sample.php'; // safe defaults; no real secrets
}
require_once $od_config;

/* --- Headers ---------------------------------------------------------- */
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ALLOWED_ORIGINS, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (ERROR_REPORTING === false) {
    error_reporting(0);
    ini_set('display_errors', '0');
}

/* --- Helpers ---------------------------------------------------------- */
function od_respond(bool $ok, string $message, array $data = [], array $errors = [], int $status = 200): never
{
    http_response_code($status);
    echo json_encode([
        'ok'      => $ok,
        'message' => $message,
        'data'    => $data,
        'errors'  => (object) $errors,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

function od_input(): array
{
    $raw = file_get_contents('php://input') ?: '';
    $json = json_decode($raw, true);
    if (is_array($json)) {
        return $json;
    }
    return $_POST;
}

function od_rate_limit(string $bucket, int $max = 20, int $window = 300): void
{
    if (!RATE_LIMIT) {
        return;
    }
    $key = sys_get_temp_dir() . '/od_rl_' . $bucket . '_' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $hits = (int) @file_get_contents($key);
    $time = (int) @file_get_contents($key . '.t');
    if ($time && (time() - $time) > $window) {
        $hits = 0;
    }
    if ($hits >= $max) {
        od_respond(false, 'Too many requests. Please try again later.', [], [], 429);
    }
    @file_put_contents($key, (string) ($hits + 1));
    @file_put_contents($key . '.t', (string) time());
}

function od_honeypot(array $data): bool
{
    // Bots fill the hidden "website" field; pretend success silently.
    if (!empty($data['website'])) {
        od_respond(true, 'Thank you!');
    }
    return true;
}

function od_validate(array $data, array $rules): array
{
    $errors = [];
    foreach ($rules as $field => $rule) {
        $value = trim((string) ($data[$field] ?? ''));
        if (($rule['required'] ?? true) && $value === '') {
            $errors[$field] = $rule['label'] . ' is required.';
            continue;
        }
        if ($value !== '' && isset($rule['max']) && mb_strlen($value) > $rule['max']) {
            $errors[$field] = $rule['label'] . ' must be under ' . $rule['max'] . ' characters.';
        }
        if ($value !== '' && ($rule['email'] ?? false) && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
            $errors[$field] = 'That email does not look valid.';
        }
    }
    if ($errors) {
        od_respond(false, 'Please fix the highlighted fields.', [], $errors, 422);
    }
    return $data;
}

function base64url(string $b): string
{
    return rtrim(strtr(base64_encode($b), '+/', '-_'), '=');
}
