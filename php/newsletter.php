<?php
/** newsletter.php — subscribe to the monthly note. */
require_once __DIR__ . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    od_respond(false, 'Method not allowed.', [], [], 405);
}

$data = od_input();
od_honeypot($data);
od_rate_limit('newsletter');

$data = od_validate($data, [
    'email' => ['label' => 'Email', 'required' => true, 'email' => true, 'max' => 254],
]);

// In production, add to your ESP (e.g. POST to Mailchimp/Kit) here.
od_respond(true, 'You are on the list.', ['ok' => true]);
