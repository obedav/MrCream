<?php
/**
 * Debug script for Quotes endpoint
 * This will show you exactly what's wrong
 *
 * USAGE: Upload to /api/ folder and visit:
 * https://mrcreamlimited.com/api/debug-quotes.php
 *
 * DELETE THIS FILE after debugging!
 */

error_reporting(E_ALL);
ini_set('display_errors', '1');

echo "<h1>MrCream Quotes Debug</h1>";
echo "<pre>";

// Step 1: Check config file
echo "=== STEP 1: Checking config.php ===\n";
if (file_exists('config.php')) {
    echo "✅ config.php exists\n";
    require_once 'config.php';
    echo "✅ config.php loaded\n";
    echo "DB_HOST: " . DB_HOST . "\n";
    echo "DB_NAME: " . DB_NAME . "\n";
    echo "DB_USER: " . DB_USER . "\n";
    echo "DB_PASS: " . (DB_PASS ? "***SET***" : "NOT SET") . "\n\n";
} else {
    echo "❌ config.php NOT FOUND!\n\n";
    exit;
}

// Step 2: Check Database.php
echo "=== STEP 2: Checking Database.php ===\n";
$dbFile = __DIR__ . '/database/Database.php';
if (file_exists($dbFile)) {
    echo "✅ Database.php exists at: $dbFile\n";
    try {
        require_once $dbFile;
        echo "✅ Database.php loaded successfully\n\n";
    } catch (Exception $e) {
        echo "❌ Error loading Database.php: " . $e->getMessage() . "\n\n";
        exit;
    }
} else {
    echo "❌ Database.php NOT FOUND at: $dbFile\n\n";
    exit;
}

// Step 3: Test database connection
echo "=== STEP 3: Testing Database Connection ===\n";
try {
    $db = getDB();
    echo "✅ Database connection successful!\n\n";
} catch (Exception $e) {
    echo "❌ Database connection FAILED!\n";
    echo "Error: " . $e->getMessage() . "\n\n";
    exit;
}

// Step 4: Check if quotes table exists
echo "=== STEP 4: Checking 'quotes' table ===\n";
try {
    $result = $db->query("SHOW TABLES LIKE 'quotes'");
    if ($result->num_rows > 0) {
        echo "✅ 'quotes' table exists\n\n";
    } else {
        echo "❌ 'quotes' table DOES NOT EXIST!\n";
        echo "You need to import schema.sql in phpMyAdmin\n\n";
        exit;
    }
} catch (Exception $e) {
    echo "❌ Error checking table: " . $e->getMessage() . "\n\n";
    exit;
}

// Step 5: Check QuotesController.php
echo "=== STEP 5: Checking QuotesController.php ===\n";
$controllerFile = __DIR__ . '/controllers/QuotesController.php';
if (file_exists($controllerFile)) {
    echo "✅ QuotesController.php exists at: $controllerFile\n";
    try {
        require_once $controllerFile;
        echo "✅ QuotesController.php loaded successfully\n";
        if (class_exists('QuotesController')) {
            echo "✅ QuotesController class found\n\n";
        } else {
            echo "❌ QuotesController class NOT FOUND!\n\n";
            exit;
        }
    } catch (Exception $e) {
        echo "❌ Error loading QuotesController.php: " . $e->getMessage() . "\n\n";
        exit;
    }
} else {
    echo "❌ QuotesController.php NOT FOUND at: $controllerFile\n\n";
    exit;
}

// Step 6: Try to get quotes
echo "=== STEP 6: Testing SELECT query on quotes table ===\n";
try {
    $query = "SELECT * FROM quotes ORDER BY created_at DESC LIMIT 5";
    $result = $db->query($query);
    echo "✅ Query executed successfully!\n";
    echo "Quotes found: " . $result->num_rows . "\n\n";

    if ($result->num_rows > 0) {
        echo "Sample quotes:\n";
        while ($row = $result->fetch_assoc()) {
            echo "  - ID: {$row['quote_id']}, Name: {$row['name']}, Email: {$row['email']}\n";
        }
    }
} catch (Exception $e) {
    echo "❌ Query FAILED: " . $e->getMessage() . "\n\n";
    exit;
}

echo "\n=== DIAGNOSIS ===\n";
echo "✅ All checks passed!\n";
echo "The /api/quotes endpoint SHOULD work.\n\n";

echo "=== NEXT STEPS ===\n";
echo "1. Try visiting: https://mrcreamlimited.com/api/quotes again\n";
echo "2. If still 500 error, check server error logs in cPanel\n";
echo "3. DELETE this debug-quotes.php file after testing!\n\n";

echo "=== CHECK SERVER ERROR LOG ===\n";
echo "In cPanel:\n";
echo "1. Go to 'Errors' or 'Error Log'\n";
echo "2. Look for recent PHP errors\n";
echo "3. The error will tell you exactly what's wrong\n";

echo "</pre>";
