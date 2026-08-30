<?php
/** contact.php — public contact form handler (mirrors mesonsoft pattern). */
require_once __DIR__ . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    od_respond(false, 'Method not allowed.', [], [], 405);
}

$data = od_input();
od_honeypot($data);
od_rate_limit('contact');

$data = od_validate($data, [
    'name'    => ['label' => 'Name', 'required' => true, 'max' => 100],
    'email'   => ['label' => 'Email', 'required' => true, 'email' => true, 'max' => 254],
    'subject' => ['label' => 'Subject', 'required' => true, 'max' => 150],
    'message' => ['label' => 'Message', 'required' => true, 'max' => 5000],
]);

$clean = static fn (string $v) => str_replace(["\r", "\n", "%0a", "%0d"], ' ', strip_tags($v));
$body = "New contact message from ourdreams\n" . str_repeat('-', 40) . "\n"
    . "Name: {$clean($data['name'])}\nEmail: {$clean($data['email'])}\n"
    . "Sent: " . date('r') . "\nIP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n"
    . str_repeat('-', 40) . "\n\n" . trim(strip_tags($data['message']));

$ok = @mail(MAIL_TO, '[ourdreams] ' . $clean($data['subject']), $body,
    implode("\r\n", ['From: ' . MAIL_FROM, 'Reply-To: ' . $clean($data['email']), 'X-Mailer: PHP/' . phpversion()]));
if (!$ok) {
    error_log('[contact.php] mail failed');
    od_respond(false, 'Could not send right now. Please email us directly.', [], [], 500);
}
od_respond(true, 'Thank you! Your message is on its way.');
