<?php
require_once 'db.php';

$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 5;

$sql = "SELECT id, date, title, content, fullcontent FROM blog_posts ORDER BY date DESC LIMIT ?, ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $offset, $limit);
$stmt->execute();
$result = $stmt->get_result();

$posts = [];
while ($row = $result->fetch_assoc()) {
    $posts[] = $row;
}

$count_query = $conn->query("SELECT COUNT(*) as total FROM blog_posts");
$total_rows = $count_query->fetch_assoc()['total'];

$has_more = ($offset + count($posts)) < $total_rows;

echo json_encode([
    'posts' => $posts,
    'hasMore' => $has_more
], JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);

$stmt->close();
$conn->close();
?>