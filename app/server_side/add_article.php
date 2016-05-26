<?php

require_once 'functions.php';
$db = new Database();
$errors = array();
$data = array();
// Getting posted data and decodeing json
$postedData = json_decode(file_get_contents('php://input'), true);
$insertData = array("artical_name" => $postedData['name'], "category_id" => $postedData['category'], "content" => $postedData['content']
    , "created_by" => 2, "status" => $postedData['status'], "created_date" => date("Y-m-d"));
$result = $db->insert("articals", $insertData);

$data['message'] = 'Article Added Successfully...';

echo json_encode($data);
?>