<?php
require_once 'functions.php';
$db = new Database();
$errors = array();
$data = array();
$_POST = json_decode(file_get_contents('php://input'), true);

$loginQuery = "SELECT `user_id`, `name`, `username`, `email`, `password`, `mobile`,"
        . "`user_type`, `created_date` FROM `users` WHERE username = '".$_POST['username']."' and password = '".md5($_POST['password'])."'";
        
$loginResult = $db -> myQurey($loginQuery);

if(count($loginResult) == 1){
    $data["status"] = "success";
//    $data["loginMessage"] = "success";
$data["userdetails"] = $loginResult;

}
else{
    $data["status"] = "failure";
    $data["loginMessage"] = "Username or Password Incorrecr";
}
echo json_encode($data);

?>