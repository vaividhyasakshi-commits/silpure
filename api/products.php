
<?php

require_once __DIR__ . "/config.php";

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    header("Allow: GET");

    jsonResponse(405, [
        "success" => false,
        "message" => "Method not allowed"
    ]);
}

if (!file_exists(PRODUCTS_FILE)) {
    jsonResponse(500, [
        "success" => false,
        "message" => "Products JSON file not found"
    ]);
}

$handle = fopen(PRODUCTS_FILE, "rb");

if ($handle === false) {
    jsonResponse(500, [
        "success" => false,
        "message" => "Unable to open products file"
    ]);
}

if (!flock($handle, LOCK_SH)) {
    fclose($handle);

    jsonResponse(500, [
        "success" => false,
        "message" => "Unable to lock products file"
    ]);
}

$content = stream_get_contents($handle);

flock($handle, LOCK_UN);
fclose($handle);

if ($content === false) {
    jsonResponse(500, [
        "success" => false,
        "message" => "Unable to read products file"
    ]);
}

$products = json_decode($content, true);

if (
    json_last_error() !== JSON_ERROR_NONE ||
    !is_array($products) ||
    !array_is_list($products)
) {
    jsonResponse(500, [
        "success" => false,
        "message" => "Invalid products JSON"
    ]);
}

jsonResponse(200, [
    "success" => true,
    "count" => count($products),
    "products" => $products
]);
