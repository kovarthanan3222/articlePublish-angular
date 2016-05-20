<?php
require_once 'functions.php';
$db = new Database();
$errors = array();
$data = array();
$data["statusList"] = $db -> select("artical_status");

echo json_encode($data);

?>