<?php
/**
 * MrCream PHP API
 * Main Router and Entry Point
 */

require_once 'config.php';

// Get the route from URL
$route = isset($_GET['route']) ? trim($_GET['route'], '/') : '';
$method = $_SERVER['REQUEST_METHOD'];

// DEBUG: Temporary debugging (remove after fixing)
// Uncomment the next 3 lines to see debug info:
// echo json_encode(['DEBUG' => ['route' => $route, 'GET' => $_GET, 'REQUEST_URI' => $_SERVER['REQUEST_URI']]]);
// exit();

// Log the request
logMessage("$method /$route");

// Root endpoint
if (empty($route)) {
    sendJson([
        'message' => 'Welcome to MrCream API!',
        'version' => API_VERSION,
        'endpoints' => [
            'GET /api/health' => 'Health check',
            'GET /api/waterpark/*' => 'Water park endpoints',
            'GET /api/yoghurt/*' => 'Yoghurt endpoints',
            'GET /api/liqueur/*' => 'Liqueur endpoints (18+)',
            'POST /api/quotes' => 'Quote requests'
        ]
    ]);
}

// Health check endpoint
if ($route === 'health' && $method === 'GET') {
    sendJson([
        'Status' => 'Healthy',
        'Timestamp' => date('c'),
        'Message' => 'MrCream PHP API is running successfully!'
    ]);
}

// Split route into parts
$parts = explode('/', $route);

// Get controller name and action
$controller = isset($parts[0]) ? $parts[0] : '';
$action = isset($parts[1]) ? $parts[1] : 'index';
$param = isset($parts[2]) ? $parts[2] : null;

// Route to appropriate controller
$controllerFile = __DIR__ . "/controllers/" . ucfirst($controller) . "Controller.php";

if (!file_exists($controllerFile)) {
    sendError("Controller not found: $controller", 404);
}

require_once $controllerFile;

$controllerClass = ucfirst($controller) . "Controller";

if (!class_exists($controllerClass)) {
    sendError("Controller class not found: $controllerClass", 500);
}

$controllerInstance = new $controllerClass();

// Convert hyphenated action to camelCase (e.g., 'verify-age' -> 'verifyAge')
$actionCamelCase = str_replace('-', '', ucwords($action, '-'));
$actionCamelCase = lcfirst($actionCamelCase);

// Build method name from action and HTTP method
$methodName = strtolower($method) . ucfirst($actionCamelCase);

// Try alternative method names
$possibleMethods = [
    $methodName,
    $actionCamelCase,
    $action,
    strtolower($method),
    'handle' . ucfirst($actionCamelCase)
];

$methodFound = false;
foreach ($possibleMethods as $possibleMethod) {
    if (method_exists($controllerInstance, $possibleMethod)) {
        $methodFound = true;
        $controllerInstance->$possibleMethod($param);
        break;
    }
}

if (!$methodFound) {
    sendError("Method not found: $action in $controllerClass", 404);
}
