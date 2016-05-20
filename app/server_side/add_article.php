<?php
require_once 'functions.php';
$db = new Database();
$errors = array();
$data = array();
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);
print_r($_POST);
//print_r($_FILES);
$data["articleList"] = $db -> myQurey($articleListQuery);
    echo $_FILES["category"];
  $insertData = array( "artical_name" => $_FILES['name'], "category_id" => $_POST['category'], "content" => $_POST['content']
          , "created_by" => 2, "status" => $_POST['status'], "created_date" => date("Y-m-d") );  
  $result = $db -> insert("articals",$insertData);  
    
  $data['message'] = 'Article Added Successfully...';

echo json_encode($data);

?>