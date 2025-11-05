<?php
/**
 * Debug Script - Shows routing information
 */

header('Content-Type: application/json; charset=UTF-8');

$info = [
    'debug' => 'MrCream API Debug Info',
    'route_param' => $_GET['route'] ?? 'NOT SET',
    'all_get_params' => $_GET,
    'request_uri' => $_SERVER['REQUEST_URI'] ?? 'NOT SET',
    'script_name' => $_SERVER['SCRIPT_NAME'] ?? 'NOT SET',
    'query_string' => $_SERVER['QUERY_STRING'] ?? 'NOT SET',
    'php_self' => $_SERVER['PHP_SELF'] ?? 'NOT SET',
    'request_method' => $_SERVER['REQUEST_METHOD'] ?? 'NOT SET',
    'mod_rewrite_enabled' => function_exists('apache_get_modules') && in_array('mod_rewrite', apache_get_modules()) ? 'YES' : 'UNKNOWN',
];

echo json_encode($info, JSON_PRETTY_PRINT);
