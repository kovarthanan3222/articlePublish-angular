<?php
require_once 'functions.php';
$db = new Database();
$errors = array();
$data = array();
$data["categoryList"] = $db -> select("artical_category");

echo json_encode($data);

?>