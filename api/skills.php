<?php
require_once 'db.php';

$sql = "SELECT name, icon_path as icon, level, category, color FROM skills";
$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    die(json_encode(["error" => "Error in query: " . $conn->error]));
}

$skills = [];
while($row = $result->fetch_assoc()) {
    $skills[] = $row;
}

$conn->close();

echo json_encode($skills, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
?>