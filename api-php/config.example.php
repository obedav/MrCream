<?php
/**
 * MrCream PHP API Configuration - EXAMPLE FILE
 *
 * INSTRUCTIONS:
 * 1. Copy this file to config.php
 * 2. Update the database credentials with your actual values
 * 3. Never commit config.php to git (it's in .gitignore)
 */

// Error Reporting (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', '0');  // Set to '0' in production
ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/logs/php-errors.log');

// Timezone
date_default_timezone_set('Africa/Lagos');

// CORS Headers - Secure configuration for production
$allowedOrigins = [
    'https://mrcreamlimited.com',
    'https://www.mrcreamlimited.com',
    'http://mrcreamlimited.com',
    'http://www.mrcreamlimited.com',
    'http://localhost',
    'http://127.0.0.1'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Allow all origins in development (comment out in production)
    header('Access-Control-Allow-Origin: *');
}

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=UTF-8');

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Configuration
// TODO: Update with your actual database credentials
define('DB_HOST', 'localhost');
define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_database_user');
define('DB_PASS', 'your_database_password');

// JWT Configuration
define('JWT_SECRET', 'your-super-secret-jwt-key-for-mrcream-application');
define('JWT_ISSUER', 'MrCreamAPI');
define('JWT_AUDIENCE', 'MrCreamClients');

// Application Settings
define('API_VERSION', 'v1');
define('LOG_DIR', __DIR__ . '/logs');

// Create logs directory if it doesn't exist
if (!file_exists(LOG_DIR)) {
    mkdir(LOG_DIR, 0755, true);
}

/**
 * Helper function to send JSON response
 */
function sendJson($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit();
}

/**
 * Helper function to send error response
 */
function sendError($message, $statusCode = 400) {
    http_response_code($statusCode);
    echo json_encode([
        'error' => true,
        'message' => $message,
        'timestamp' => date('c')
    ], JSON_PRETTY_PRINT);
    exit();
}

/**
 * Get JSON input from request body
 */
function getJsonInput() {
    $input = file_get_contents('php://input');
    return json_decode($input, true);
}

/**
 * Log message to file
 */
function logMessage($message, $level = 'INFO') {
    $logFile = LOG_DIR . '/api-' . date('Y-m-d') . '.log';
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] [$level] $message" . PHP_EOL;
    file_put_contents($logFile, $logEntry, FILE_APPEND);
}
