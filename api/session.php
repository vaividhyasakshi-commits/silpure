<?php
require_once __DIR__ . '/admin-common.php';
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    jsonResponse(405, ['success' => false, 'message' => 'Method not allowed']);
}
adminSession();
if (empty($_SESSION['admin_authenticated'])) {
    jsonResponse(200, ['authenticated' => false]);
}
jsonResponse(200, [
    'authenticated' => true,
    'username' => $_SESSION['admin_username'] ?? 'admin',
    'csrfToken' => $_SESSION['csrf_token'] ?? null
]);
