<?php
/**
 * config.sample.php — COPY to config.php and fill in. config.php is gitignored.
 *
 * Never commit real secrets. The deploy only uploads php/ (including config.php
 * if present on disk) to public_html/api/; keep it out of version control.
 */
define('ALLOWED_ORIGINS', [
    'https://ourdreams.example',   // TODO: replace with the production origin
    'http://127.0.0.1:3000',        // local next dev
]);
define('WP_BASE_URL', 'https://ourdreams.example/wp'); // same host as the static frontend
define('WC_CONSUMER_KEY', '');     // Read-only Woo key, populated on the server
define('WC_CONSUMER_SECRET', '');
define('JWT_SECRET', '');          // random 32+ char string for auth.php
define('MAIL_TO', 'gifting@ourdreams.example');
define('MAIL_FROM', 'no-reply@ourdreams.example');
define('RATE_LIMIT', true);
define('ERROR_REPORTING', false); // true only while debugging
