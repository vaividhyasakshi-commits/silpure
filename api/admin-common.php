<?php
require_once __DIR__ . '/config.php';

function adminSession(): void {
    if (session_status() === PHP_SESSION_ACTIVE) return;
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    session_name('silpure_admin');
    session_set_cookie_params([
        'lifetime' => 0, 'path' => '/', 'httponly' => true,
        'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
        'samesite' => 'Lax'
    ]);
    session_start();
}

function jsonInput(): array {
    if (($_SERVER['CONTENT_TYPE'] ?? '') !== 'application/json') {
        // Accept application/json with charset as well.
        if (!str_starts_with(strtolower($_SERVER['CONTENT_TYPE'] ?? ''), 'application/json')) {
            jsonResponse(415, ['success' => false, 'message' => 'JSON body required']);
        }
    }
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > 65536) {
        jsonResponse(400, ['success' => false, 'message' => 'Invalid request']);
    }
    $data = json_decode($raw, true);
    if (!is_array($data)) jsonResponse(400, ['success' => false, 'message' => 'Invalid JSON']);
    return $data;
}

function requireAdmin(): void {
    adminSession();
    if (empty($_SESSION['admin_authenticated'])) {
        jsonResponse(401, ['success' => false, 'message' => 'Authentication required']);
    }
}
