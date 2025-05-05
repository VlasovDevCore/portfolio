<?php
require_once 'db.php';

$sql = "SELECT type, image, title, description, technologies, content, links FROM projects";
$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    die(json_encode(["error" => "Error in query: " . $conn->error]));
}

$projects = [];
while ($row = $result->fetch_assoc()) {
    $row['technologies'] = json_decode($row['technologies'], true);
    $row['content'] = json_decode($row['content'], true);
    $row['links'] = json_decode($row['links'], true);
    $projects[] = $row;
}

$conn->close();

echo json_encode($projects, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
?>