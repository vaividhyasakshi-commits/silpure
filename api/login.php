<?php
require_once __DIR__ . '/admin-common.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    jsonResponse(405, ['success' => false, 'message' => 'Method not allowed']);
}
adminSession();
$input = jsonInput();
$username = trim((string)($input['username'] ?? ''));
$password = (string)($input['password'] ?? '');
if (strlen($username) > 128 || strlen($password) > 1024) {
    jsonResponse(400, ['success' => false, 'message' => 'Invalid credentials']);
}
// Lightweight localhost login throttling. Production requires IP-based limits too.
$attempts = $_SESSION['login_attempts'] ?? [];
$attempts = array_values(array_filter($attempts, fn($t) => $t > time() - 900));
if (count($attempts) >= 8) {
    jsonResponse(429, ['success' => false, 'message' => 'Too many attempts. Try again later.']);
}
$path = dirname(__DIR__) . '/storage/admin.json';
$data = is_file($path) ? json_decode(file_get_contents($path), true) : null;
$valid = is_array($data) && hash_equals((string)($data['username'] ?? ''), $username)
    && password_verify($password, (string)($data['password_hash'] ?? ''));
if (!$valid) {
    $attempts[] = time();
    $_SESSION['login_attempts'] = $attempts;
    jsonResponse(401, ['success' => false, 'message' => 'Incorrect admin ID or password']);
}
session_regenerate_id(true);
$_SESSION['admin_authenticated'] = true;
$_SESSION['admin_username'] = $username;
$_SESSION['login_attempts'] = [];
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));
jsonResponse(200, ['success' => true, 'username' => $username, 'csrfToken' => $_SESSION['csrf_token']]);
