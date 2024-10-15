<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect POST data
    $input = json_decode(file_get_contents('php://input'), true);

    $tourParentName = isset($input['tourParentName']) ? trim($input['tourParentName']) : '';
    $tourEmail = isset($input['tourEmail']) ? trim($input['tourEmail']) : '';
    $preferredTourDate = isset($input['preferredTourDate']) ? trim($input['preferredTourDate']) : '';
    $preferredTourTime = isset($input['preferredTourTime']) ? trim($input['preferredTourTime']) : '';
    $recaptcha = isset($input['recaptcha']) ? trim($input['recaptcha']) : '';

    // Initialize response
    $response = ['status' => 'error', 'message' => 'Invalid input.'];

    // Basic validation
    if ($tourParentName && $tourEmail && filter_var($tourEmail, FILTER_VALIDATE_EMAIL) && $preferredTourDate && $preferredTourTime && $recaptcha) {
        // Verify reCAPTCHA
        $secretKey = '6Le4r18qAAAAAGb3_gVseemFEa135HPKDG-xHptW'; // Replace with your actual secret key
        $verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
        $responseRecaptcha = file_get_contents($verifyUrl . '?secret=' . urlencode($secretKey) . '&response=' . urlencode($recaptcha));
        $responseData = json_decode($responseRecaptcha, true);

        if ($responseData['success']) {
            // Process the form data
            // Example: Send an email to the admin
            $to = 'admin@camroy135@gmail.com'; // Replace with your admin email
            $subject = 'New Tour Scheduling Submission';
            $messageBody = "Parent's Name: $tourParentName\n";
            $messageBody .= "Email: $tourEmail\n";
            $messageBody .= "Preferred Tour Date: $preferredTourDate\n";
            $messageBody .= "Preferred Tour Time: $preferredTourTime\n";

            $headers = "From: no-reply@bladyslittleworld.com\r\n"; // Replace with a valid sender email
            $headers .= "Reply-To: $tourEmail\r\n";

            if (mail($to, $subject, $messageBody, $headers)) {
                $response = ['status' => 'success', 'message' => 'Tour scheduled successfully.'];
            } else {
                $response = ['status' => 'error', 'message' => 'Failed to send email. Please try again later.'];
            }
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