<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect POST data
    $name = $_POST['name'] ?? null;
    $email = $_POST['email'] ?? null;
    $message = $_POST['message'] ?? null;

    // Validation (ensure all required fields are filled)
    if ($name && $email && $message) {
        // Store data in the database (optional)
        /*
        $mysqli = new mysqli("host", "username", "password", "database");
        if ($mysqli->connect_error) {
            die("Connection failed: " . $mysqli->connect_error);
        }

        $stmt = $mysqli->prepare("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $message);
        $stmt->execute();
        $stmt->close();
        $mysqli->close();
        */

        // Optionally, send an email to the site owner/admin
        /*
        mail("admin@example.com", "New Contact Form Submission", "Message from $name ($email): $message", "From: no-reply@example.com");
        */

        echo "Thank you for your message.";
    } else {
        echo "Please fill all required fields.";
    }
} else {
    echo "Invalid request method.";
}
?>