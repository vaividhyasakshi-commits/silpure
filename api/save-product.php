<?php
require_once __DIR__ . '/product-store.php';
requirePostAndCsrf();
$body = jsonInput();
$name = cleanText($body['name'] ?? '', 180);
$category = cleanText($body['category'] ?? '', 80);
if ($name === '' || !preg_match('/^[a-z0-9-]+$/', $category)) {
    jsonResponse(422, ['success'=>false,'message'=>'Product name and valid category are required']);
}
$price = filter_var($body['price'] ?? null, FILTER_VALIDATE_FLOAT);
if ($price === false || !is_finite((float)$price) || $price < 0 || $price > 100000000) {
    jsonResponse(422,['success'=>false,'message'=>'Enter a valid price']);
}
$oldPrice = $body['oldPrice'] ?? null;
if ($oldPrice !== null && $oldPrice !== '') {
    $oldPrice = filter_var($oldPrice, FILTER_VALIDATE_FLOAT);
    if ($oldPrice === false || $oldPrice < 0 || $oldPrice > 100000000) jsonResponse(422,['success'=>false,'message'=>'Invalid old price']);
} else { $oldPrice = null; }
$image = cleanText($body['image'] ?? '', 300);
if ($image !== '' && !preg_match('~^/uploads/products/[a-zA-Z0-9_-]+\.(png|jpg|jpeg|webp)$~i', $image)) {
    jsonResponse(422,['success'=>false,'message'=>'Upload an image using the admin panel']);
}
$collections = $body['collections'] ?? [];
if (!is_array($collections) || count($collections) > 30) jsonResponse(422,['success'=>false,'message'=>'Invalid collections']);
$collections = array_values(array_unique(array_map(fn($x)=>cleanText($x,80), $collections)));
foreach ($collections as $col) if (!preg_match('/^[a-z0-9-]+$/', $col)) jsonResponse(422,['success'=>false,'message'=>'Invalid collection']);
$id = $body['id'] ?? null;
if ($id !== null && (!is_numeric($id) || (int)$id < 1)) jsonResponse(422,['success'=>false,'message'=>'Invalid product ID']);
$input = [
    'name'=>$name,'category'=>$category,'price'=>(float)$price,'oldPrice'=>$oldPrice,
    'shortDescription'=>cleanText($body['shortDescription'] ?? '',2000),
    'description'=>cleanText($body['description'] ?? '',10000),
    'material'=>cleanText($body['material'] ?? '',160),
    'badge'=>cleanText($body['badge'] ?? '',40),
    'inStock'=>(bool)($body['inStock'] ?? false),
    'isNewArrival'=>(bool)($body['isNewArrival'] ?? false),
    'collections'=>$collections
];
$result = productTransaction(function($items) use ($id, $input, $image) {
    $index = -1;
    if ($id !== null) foreach ($items as $i=>$item) if ((int)($item['id']??0)===(int)$id) { $index=$i; break; }
    if ($id !== null && $index === -1) jsonResponse(404,['success'=>false,'message'=>'Product not found']);
    $old = $index >= 0 ? $items[$index] : [];
    $newId = $id === null ? max(array_map(fn($p)=>(int)($p['id']??0),$items) ?: [0]) + 1 : (int)$id;
    $slug = $old['slug'] ?? slugify($input['name']) . '-' . $newId;
    $item = array_merge($old, $input, [
        'id'=>$newId,'slug'=>$slug,
        'image'=>$image !== '' ? $image : ($old['image'] ?? '')
    ]);
    if (!$item['image']) jsonResponse(422,['success'=>false,'message'=>'Please upload a product image']);
    if ($index < 0) $items[] = $item; else $items[$index] = $item;
    return [$items, ['success'=>true,'product'=>$item]];
});
jsonResponse(200,$result);
