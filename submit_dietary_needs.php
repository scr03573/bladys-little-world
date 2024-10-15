<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect POST data
    $input = json_decode(file_get_contents('php://input'), true);

    $childName = isset($input['childName']) ? trim($input['childName']) : '';
    $ageGroup = isset($input['ageGroup']) ? trim($input['ageGroup']) : '';
    $dietaryRestrictions = isset($input['dietaryRestrictions']) ? trim($input['dietaryRestrictions']) : '';
    $preferredMeals = isset($input['preferredMeals']) ? trim($input['preferredMeals']) : '';
    $recaptcha = isset($input['recaptcha']) ? trim($input['recaptcha']) : '';

    // Initialize response
    $response = ['status' => 'error', 'message' => 'Invalid input.'];

    // Basic validation
    if ($childName && $ageGroup && $dietaryRestrictions && $recaptcha) {
        // Verify reCAPTCHA
        $secretKey = '6Le4r18qAAAAAGb3_gVseemFEa135HPKDG-xHptW'; // Replace with your actual secret key
        $verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
        $responseRecaptcha = file_get_contents($verifyUrl . '?secret=' . urlencode($secretKey) . '&response=' . urlencode($recaptcha));
        $responseData = json_decode($responseRecaptcha, true);

        if ($responseData['success']) {
            // Process the form data
            // Example: Send an email to the admin
            $to = 'admin@camroy135@gmail.com'; // Replace with your admin email
            $subject = 'New Dietary Needs Submission';
            $messageBody = "Child's Name: $childName\n";
            $messageBody .= "Age Group: $ageGroup\n";
            $messageBody .= "Dietary Restrictions: $dietaryRestrictions\n";
            $messageBody .= "Preferred Meals: $preferredMeals\n";

            $headers = "From: no-reply@bladyslittleworld.com\r\n"; // Replace with a valid sender email
            $headers .= "Reply-To: no-reply@bladyslittleworld.com\r\n";

            if (mail($to, $subject, $messageBody, $headers)) {
                $response = ['status' => 'success', 'message' => 'Your dietary needs have been submitted.'];
            } else {
                $response = ['status' => 'error', 'message' => 'Failed to send email. Please try again later.'];
            }

            // Optionally, store data in the database
            /*
            $mysqli = new mysqli("host", "username", "password", "database");
            if ($mysqli->connect_error) {
                $response = ['status' => 'error', 'message' => 'Database connection failed.'];
            } else {
                $stmt = $mysqli->prepare("INSERT INTO dietary_needs (child_name, age_group, dietary_restrictions, preferred_meals) VALUES (?, ?, ?, ?)");
                $stmt->bind_param("ssss", $childName, $ageGroup, $dietaryRestrictions, $preferredMeals);
                if ($stmt->execute()) {
                    $response = ['status' => 'success', 'message' => 'Your dietary needs have been submitted.'];
                } else {
                    $response = ['status' => 'error', 'message' => 'Failed to save your dietary needs.'];
                }
                $stmt->close();
                $mysqli->close();
            }
            */
        } else {
            $response = ['status' => 'error', 'message' => 'reCAPTCHA verification failed. Please try again.'];
        }
    } else {
        $response = ['status' => 'error', 'message' => 'Please fill all required fields correctly.'];
    }

    echo json_encode($response);
} else {
    // Invalid request method
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>