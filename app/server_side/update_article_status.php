<?php

require_once 'functions.php';
$db = new Database();
$errors = array();
$data = array();
// Getting posted data and decodeing json
$postedData = json_decode(file_get_contents('php://input'), true);
$updateData = array("status" => $postedData['status']);
$whereCondition = "artical_id = '".$postedData['articleId']."'";
$result = $db->update("articals", $updateData, $whereCondition );

$insertData = array( "artical_command" => $postedData['adminComment'], "artical_id" => $postedData['username'], "created_date" => date("Y-m-d h:i:s") );
$result = $db -> insert("article_commands",$insertData);  

$data['message'] = 'Article Updated Successfully...';

echo json_encode($data);
?>