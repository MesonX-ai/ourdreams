<?php
/** quote.php — bulk-quote enquiry from the shop / pricing pages. */
require_once __DIR__ . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    od_respond(false, 'Method not allowed.', [], [], 405);
}

$data = od_input();
od_honeypot($data);
od_rate_limit('quote');

$data = od_validate($data, [
    'name'     => ['label' => 'Name', 'required' => true, 'max' => 100],
    'email'    => ['label' => 'Email', 'required' => true, 'email' => true, 'max' => 254],
    'company'  => ['label' => 'Company', 'required' => true, 'max' => 120],
    'quantity' => ['label' => 'Quantity', 'required' => false, 'max' => 12],
    'notes'    => ['label' => 'Notes', 'required' => false, 'max' => 4000],
]);

$ok = @mail(MAIL_TO, '[ourdreams] Quote request', http_build_query($data),
    implode("\r\n", ['From: ' . MAIL_FROM, 'Reply-To: ' . strip_tags($data['email'])]));
od_respond($ok ? true : false, $ok ? 'Thanks — we will prepare a quote.' : 'Could not submit. Please email us.', ['id' => uniqid('q_')], [], $ok ? 200 : 500);
