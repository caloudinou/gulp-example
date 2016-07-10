 <?php
header('Content-type: application/json');
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "chatroom";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = "SELECT * FROM message";
($result = $mysqli->query($query))

if($row = $result->fetch_row()){

var_dump($row);
};


$conn->close();
?>