
<?php

define(
    "PRODUCTS_FILE",
    dirname(__DIR__) . "/storage/products.json"
);

function jsonResponse($status, $data)
{
    http_response_code($status);

    header("Content-Type: application/json; charset=utf-8");
    header("Cache-Control: no-store");
    header("X-Content-Type-Options: nosniff");

    echo json_encode(
        $data,
        JSON_UNESCAPED_SLASHES |
        JSON_UNESCAPED_UNICODE
    );

    exit;
}
