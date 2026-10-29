<?php
// Development-only router. Start from project root, never deploy this router publicly.
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';
if (str_starts_with($path, '/uploads/products/')) {
    $name = basename($path);
    if (!preg_match('/^[a-zA-Z0-9_-]+\.(?:png|jpg|jpeg|webp)$/i', $name)) {
        http_response_code(404); exit;
    }
    $file = __DIR__ . '/public/uploads/products/' . $name;
    if (!is_file($file)) { http_response_code(404); exit; }
    $type = (new finfo(FILEINFO_MIME_TYPE))->file($file);
    if (!in_array($type, ['image/png','image/jpeg','image/webp'], true)) {
        http_response_code(403); exit;
    }
    header('Content-Type: ' . $type);
    header('X-Content-Type-Options: nosniff');
    readfile($file);
    exit;
}
if (preg_match('#^/api/[a-z0-9-]+\.php$#i', $path)) return false;
http_response_code(404);
echo 'Not Found';
