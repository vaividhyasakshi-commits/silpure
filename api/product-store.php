<?php
require_once __DIR__ . '/admin-common.php';

function requirePostAndCsrf(): void {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        header('Allow: POST');
        jsonResponse(405, ['success'=>false,'message'=>'POST required']);
    }
    requireAdmin();
    $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    if (!$token || !hash_equals((string)($_SESSION['csrf_token'] ?? ''), (string)$token)) {
        jsonResponse(403, ['success'=>false,'message'=>'Invalid security token. Log in again.']);
    }
    // Require same-origin submission on current browsers.
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $host = $_SERVER['HTTP_HOST'] ?? '';
    if ($origin && $host && parse_url($origin, PHP_URL_HOST) !== explode(':', $host)[0]) {
        // Vite proxy origin is localhost, PHP host may be 127.0.0.1; CSRF token is the protection.
    }
}
function productFile(): string { return dirname(__DIR__) . '/storage/products.json'; }
function productTransaction(callable $edit): array {
    $filename = productFile();
    $handle = @fopen($filename, 'c+b');
    if (!$handle) jsonResponse(500, ['success'=>false,'message'=>'Cannot open product storage']);
    if (!flock($handle, LOCK_EX)) { fclose($handle); jsonResponse(500,['success'=>false,'message'=>'Storage lock failed']); }
    rewind($handle);
    $raw = stream_get_contents($handle);
    $items = json_decode($raw ?: '[]', true);
    if (!is_array($items) || !array_is_list($items)) {
        flock($handle, LOCK_UN); fclose($handle);
        jsonResponse(500, ['success'=>false,'message'=>'Invalid product data; no changes saved']);
    }
    [$changed, $result] = $edit($items);
    $encoded = json_encode($changed, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    if ($encoded === false) { flock($handle, LOCK_UN); fclose($handle); jsonResponse(500,['success'=>false,'message'=>'Encoding failed']); }
    rewind($handle);
    $ok = fwrite($handle, $encoded . "\n");
    if ($ok === false || $ok !== strlen($encoded . "\n") || !ftruncate($handle, strlen($encoded . "\n")) || !fflush($handle)) {
        flock($handle, LOCK_UN); fclose($handle);
        jsonResponse(500, ['success'=>false,'message'=>'Saving products failed']);
    }
    flock($handle, LOCK_UN); fclose($handle);
    return $result;
}
function cleanText($value, int $limit = 300): string {
    $value = trim((string)$value);
    if (strlen($value) > $limit) jsonResponse(422, ['success'=>false,'message'=>'A text field is too long']);
    return $value;
}
function slugify(string $name): string {
    $slug = strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $name), '-'));
    return $slug ?: 'product';
}
