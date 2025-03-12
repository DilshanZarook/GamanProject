<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bus_booking";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['error' => "Connection failed: " . $conn->connect_error]));
} else {
  // Connection was successful, return a success message
  echo json_encode(['message' => "Connection to the database was successful!"]);
}

// Important: Do NOT close the connection here!
?>