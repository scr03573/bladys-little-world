<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect POST data
    $input = json_decode(file_get_contents('php://input'), true);

    $latitude = isset($input['latitude']) ? trim($input['latitude']) : '';
    $longitude = isset($input['longitude']) ? trim($input['longitude']) : '';

    // Initialize response
    $response = ['status' => 'error', 'message' => 'Invalid input.'];

    // Basic validation
    if ($latitude && $longitude) {
        // Optionally, verify the data (e.g., ensure they are valid coordinates)

        // Process the location data
        // Example: Log the data to a file
        $logData = "Latitude: $latitude, Longitude: $longitude\n";
        file_put_contents('location_log.txt', $logData, FILE_APPEND);

        $response = ['status' => 'success', 'message' => 'Location data logged successfully.'];
    } else {
        $response = ['status' => 'error', 'message' => 'Please provide valid latitude and longitude.'];
    }

    echo json_encode($response);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>