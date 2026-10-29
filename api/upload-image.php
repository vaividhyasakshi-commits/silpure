<?php
require_once __DIR__ . '/product-store.php';
requirePostAndCsrf();
if (!isset($_FILES['image']) || !is_array($_FILES['image'])) jsonResponse(422,['success'=>false,'message'=>'Select an image']);
$image = $_FILES['image'];
if (($image['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) jsonResponse(422,['success'=>false,'message'=>'Image upload failed']);
if ($image['size'] < 1 || $image['size'] > 5 * 1024 * 1024) jsonResponse(422,['success'=>false,'message'=>'Image maximum size is 5 MB']);
if (!is_uploaded_file($image['tmp_name'])) jsonResponse(422,['success'=>false,'message'=>'Invalid upload']);
$type = (new finfo(FILEINFO_MIME_TYPE))->file($image['tmp_name']);
$extensions = ['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp'];
if (!isset($extensions[$type]) || @getimagesize($image['tmp_name']) === false) jsonResponse(422,['success'=>false,'message'=>'Only valid JPG, PNG or WebP images allowed']);
$dir = dirname(__DIR__) . '/public/uploads/products';
if (!is_dir($dir) && !mkdir($dir,0755,true)) jsonResponse(500,['success'=>false,'message'=>'Upload directory unavailable']);
$name = bin2hex(random_bytes(16)) . '.' . $extensions[$type];
$target = $dir . '/' . $name;
if (!move_uploaded_file($image['tmp_name'], $target)) jsonResponse(500,['success'=>false,'message'=>'Failed to store image']);
chmod($target,0644);
jsonResponse(200,['success'=>true,'image'=>'/uploads/products/' . $name]);
