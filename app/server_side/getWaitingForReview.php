<?php
require_once 'functions.php';
$db = new Database();
$data = array();
$authorId = $_GET["authorId"];
$articleListQuery = "SELECT art.`artical_id`, art.`artical_name`, art.`category_id`, art.`content`, art.`created_by`, art.`image`, art.`status`, art.`created_date`, ac.category_name, s.status,u.name FROM `articals` as art
LEFT JOIN artical_category as ac on ac.category_id = art.category_id
LEFT JOIN artical_status as s on s.status_id = art.status
LEFT JOIN users as u on u.user_id = art.created_by
WHERE art.status = 2";
$data["waitingForArticleReview"] = $db -> myQurey($articleListQuery);

echo json_encode($data);

?>