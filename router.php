<?php
// LOCAL DEV ONLY: routes explicit PHP endpoints and product image files.
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$allowed = [
    '/api/products.php' => 'products.php',
    '/api/login.php' => 'login.php',
    '/api/logout.php' => 'logout.php',
    '/api/session.php' => 'session.php'
];
if (isset($allowed[$path])) {
    require __DIR__ . '/api/' . $allowed[$path];
    exit;
}
if (preg_match('~^/uploads/products/([a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|webp))$~i', $path, $m)) {
    $file = __DIR__ . '/public/uploads/products/' . $m[1];
    if (!is_file($file)) { http_response_code(404); exit; }
    $type = mime_content_type($file);
    if (!in_array($type, ['image/jpeg', 'image/png', 'image/webp'], true)) {
        http_response_code(403); exit;
    }
    header('Content-Type: ' . $type);
    header('X-Content-Type-Options: nosniff');
    readfile($file);
    exit;
}
http_response_code(404);
echo 'Not found';
