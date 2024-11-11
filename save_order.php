<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "denimshop";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    @$customer_name = $_POST['customer_name'];
    @$mobile = $_POST['monumber'];
    @$total = $_POST['totalp'];

    $stmt = $conn->prepare("INSERT INTO customerdetails values('','$customer_name','$mobile','$total')");
    $stmt->execute();
    $stmt->close();
    
    @$items = $_POST['itemName'];
    @$quantities = $_POST['itemQty'];
    @$prices = $_POST['itemPrice'];
    @$totals = $_POST['itemTotal'];
// =======================================================================================================================
$sql = "SELECT * FROM customerdetails ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $Cid = $row["id"];
}
// =======================================================================================================================


for ($i = 0; $i < count($items); $i++){
    $item = $conn->real_escape_string($items[$i]);
    $quantity = $conn->real_escape_string($quantities[$i]);
    $price = $conn->real_escape_string($prices[$i]);
    $total = $conn->real_escape_string($totals[$i]);
    $date = date('Y-m-d H:i:s');
    
    $stmt2 = "INSERT INTO purchasedetail values('$Cid','$item','$quantity','$price','$total','$date')";
    if (!$conn->query($stmt2)) {
        echo "Error: " . $stmt2 . "<br>" . $conn->error;
    }
}



header("Location:http://localhost/DENIM/index.html");
}


$conn->close();
?>
