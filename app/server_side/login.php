<?php
require_once 'functions.php';
$db = new Database();
$errors = array();
$data = array();
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);

// checking for blank values.

if (empty($_POST['username']))
  $errors['username'] = 'Username is required.';

if (empty($_POST['password']))
  $errors['password'] = 'Password is required.';

if (!empty($errors)) {
  $data['errors']  = $errors;
} else {
    
  $insertData = array( "name" => $_POST['name'], "username" => $_POST['username'], "email" => $_POST['email']
          , "password" => md5($_POST['password']), "mobile" => $_POST['mobile'], "user_type" => "author", "created_date" => date("Y-m-d") );  
  $result = $db -> insert("users",$insertData);  
    
  $data['message'] = 'Congrats! Registered Successfully...';
}
echo json_encode($data);

?>