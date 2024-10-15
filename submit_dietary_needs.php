<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect POST data
    $name = $_POST['name'] ?? null;
    $email = $_POST['email'] ?? null;
    $dietary_needs = $_POST['dietary_needs'] ?? null;

    // Validation (ensure all required fields are filled)
    if ($name && $email && $dietary_needs) {
        // Store data in the database (optional)
        /*
        $mysqli = new mysqli("host", "username", "password", "database");
        if ($mysqli->connect_error) {
            die("Connection failed: " . $mysqli->connect_error);
        }

        $stmt = $mysqli->prepare("INSERT INTO dietary_needs (name, email, dietary_needs) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $dietary_needs);
        $stmt->execute();
        $stmt->close();
        $mysqli->close();
        */

        echo "Dietary preferences submitted successfully.";
    } else {
        echo "Please fill all required fields.";
    }
} else {
    echo "Invalid request method.";
}
?>