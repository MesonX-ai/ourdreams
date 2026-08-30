<?php
/** demo-request.php — request-a-demo form; stores to WP CPT + notifies. */
require_once __DIR__ . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    od_respond(false, 'Method not allowed.', [], [], 405);
}

$data = od_input();
od_honeypot($data);
od_rate_limit('demo');

$data = od_validate($data, [
    'name'    => ['label' => 'Name', 'required' => true, 'max' => 100],
    'email'   => ['label' => 'Email', 'required' => true, 'email' => true, 'max' => 254],
    'company' => ['label' => 'Company', 'required' => false, 'max' => 120],
]);

$company = !empty($data['company']) ? strip_tags($data['company']) : 'Not provided';
$detail = implode("\n", array_filter([
    !empty($data['phone']) ? 'Phone: ' . strip_tags($data['phone']) : null,
    !empty($data['kind']) ? 'Request type: ' . strip_tags($data['kind']) : null,
    !empty($data['message']) ? 'Message: ' . strip_tags($data['message']) : null,
]));

$ok = @mail(MAIL_TO, '[ourdreams] Demo request from ' . strip_tags($data['name']),
    "Name: " . strip_tags($data['name']) . "\nEmail: " . strip_tags($data['email']) . "\nCompany: " . $company . ($detail ? "\n" . $detail : ''),
    implode("\r\n", ['From: ' . MAIL_FROM, 'Reply-To: ' . strip_tags($data['email'])]));

// In production, insert a draft `od_demo_request` CPT via the WP REST API here.
od_respond(true, 'Thanks — a specialist will reach out shortly.', ['id' => uniqid('demo_')]);
