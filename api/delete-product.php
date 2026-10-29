<?php
require_once __DIR__ . '/product-store.php';
requirePostAndCsrf();
$input = jsonInput();
$id = filter_var($input['id'] ?? null, FILTER_VALIDATE_INT);
if ($id === false || $id === null || $id <= 0) jsonResponse(422,['success'=>false,'message'=>'Invalid product ID']);
$result = productTransaction(function($items) use($id) {
    $updated = array_values(array_filter($items,fn($item)=>(int)($item['id']??0)!==$id));
    if (count($updated)===count($items)) jsonResponse(404,['success'=>false,'message'=>'Product not found']);
    // Images deliberately kept to avoid accidentally removing shared media.
    return [$updated,['success'=>true,'deletedId'=>$id]];
});
jsonResponse(200,$result);
