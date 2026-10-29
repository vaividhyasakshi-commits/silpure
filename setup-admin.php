<?php
// Run from command-line ONLY; delete after creating admin account.
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
$directory = __DIR__ . '/storage';
if (!is_dir($directory)) { fwrite(STDERR, "Missing storage folder\n"); exit(1); }
$filename = $directory . '/admin.json';
if (file_exists($filename)) { fwrite(STDERR, "Admin already exists. Delete this file only if intentionally resetting credentials.\n"); exit(1); }
echo "Silpure admin setup\nAdmin ID: ";
$user = trim(fgets(STDIN));
if (!preg_match('/^[a-zA-Z0-9_.-]{3,40}$/', $user)) { fwrite(STDERR, "ID must be 3-40 letters/numbers/._-\n"); exit(1); }
echo "Password (visible while typing; use a private terminal): ";
$password = rtrim(fgets(STDIN), "\r\n");
if (strlen($password) < 12) { fwrite(STDERR, "Use at least 12 characters\n"); exit(1); }
$payload = json_encode(['username' => $user, 'password_hash' => password_hash($password, PASSWORD_DEFAULT)], JSON_PRETTY_PRINT);
if (file_put_contents($filename, $payload, LOCK_EX) === false) { fwrite(STDERR, "Cannot save admin credentials\n"); exit(1); }
echo "Created storage/admin.json. Delete setup-admin.php now.\n";
