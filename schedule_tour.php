<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect POST data
    $name = $_POST['name'] ?? null;
    $email = $_POST['email'] ?? null;
    $tour_date = $_POST['tour_date'] ?? null;

    // Validation (ensure all required fields are filled)
    if ($name && $email && $tour_date) {
        // Store data in the database (example, assuming you use MySQL)
        // Note: This requires a proper database connection
        /*
        $mysqli = new mysqli("host", "username", "password", "database");
        if ($mysqli->connect_error) {
            die("Connection failed: " . $mysqli->connect_error);
        }

        $stmt = $mysqli->prepare("INSERT INTO tours (name, email, tour_date) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $tour_date);
        $stmt->execute();
        $stmt->close();
        $mysqli->close();
        */

        // Optionally, send a confirmation email
        /*
        mail($email, "Tour Confirmation", "Thank you for scheduling a tour on $tour_date", "From: no-reply@example.com");
        */

        echo "Tour scheduled successfully.";
    } else {
        echo "Please fill all required fields.";
    }
} else {
    echo "Invalid request method.";
}
?>