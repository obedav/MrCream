<?php
/**
 * Quotes Controller
 * Handles quote requests from customers
 */

require_once __DIR__ . '/../database/Database.php';

class QuotesController {

    /**
     * GET /api/quotes or GET /api/quotes/{id}
     * Get all quote requests (for admin) or get specific quote by ID
     */
    public function get($id = null) {
        // If ID not provided as parameter, check if it's in the route
        if ($id === null) {
            $route = isset($_GET['route']) ? trim($_GET['route'], '/') : '';
            $parts = explode('/', $route);
            // For /api/quotes/{id}, the ID will be in parts[1]
            $id = isset($parts[1]) && !empty($parts[1]) ? $parts[1] : null;
        }

        // If ID provided, get specific quote
        if ($id !== null) {
            return $this->getQuoteStatus($id);
        }

        // Otherwise, get all quotes (admin view)
        try {
            $db = getDB();

            $query = "
                SELECT
                    quote_id, name, email, phone, company,
                    product_category, quantity, message, status,
                    created_at, updated_at
                FROM quotes
                ORDER BY created_at DESC
            ";

            $result = $db->query($query);
            $quotes = [];

            while ($row = $result->fetch_assoc()) {
                $quotes[] = $row;
            }

            sendJson([
                'success' => true,
                'count' => count($quotes),
                'quotes' => $quotes
            ]);

        } catch (Exception $e) {
            logMessage("Failed to retrieve quotes: " . $e->getMessage(), 'ERROR');
            sendError('Failed to retrieve quotes', 500);
        }
    }

    /**
     * POST /api/quotes
     * Submit a quote request
     */
    public function post($id = null) {
        $request = getJsonInput();

        // Validate required fields
        if (empty($request['Email'])) {
            sendError('Email is required.', 400);
        }

        if (empty($request['Name'])) {
            sendError('Name is required.', 400);
        }

        // Validate email format
        if (!isValidEmail($request['Email'])) {
            sendError('Invalid email format.', 400);
        }

        // Validate phone if provided
        if (!empty($request['Phone']) && !isValidPhone($request['Phone'])) {
            sendError('Invalid phone number format.', 400);
        }

        // Validate input lengths
        if (strlen($request['Name']) > 100) {
            sendError('Name is too long (max 100 characters).', 400);
        }

        if (strlen($request['Email']) > 100) {
            sendError('Email is too long (max 100 characters).', 400);
        }

        $quoteId = uniqid('quote_');

        // Save to database
        try {
            $db = getDB();

            $stmt = $db->prepare("
                INSERT INTO quotes
                (quote_id, name, email, phone, company, product_category,
                 quantity, message, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");

            $status = 'Pending';

            // Sanitize all inputs
            $name = sanitizeInput($request['Name']);
            $email = sanitizeInput($request['Email']);
            $phone = sanitizeInput($request['Phone'] ?? '');
            $company = sanitizeInput($request['Company'] ?? '');
            $category = sanitizeInput($request['ProductCategory'] ?? '');
            $quantity = isset($request['Quantity']) ? (int)$request['Quantity'] : 0;
            $message = sanitizeInput($request['Message'] ?? '');

            $stmt->bind_param(
                'ssssssiis',
                $quoteId,
                $name,
                $email,
                $phone,
                $company,
                $category,
                $quantity,
                $message,
                $status
            );

            $stmt->execute();
            $stmt->close();

            logMessage("Quote request saved: {$quoteId} from {$request['Email']}");

            // Send email notification (optional)
            $this->sendEmailNotification($request);

        } catch (Exception $e) {
            logMessage("Failed to save quote: " . $e->getMessage(), 'ERROR');
            // Continue anyway - don't fail the request
        }

        $response = [
            'Id' => $quoteId,
            'Message' => 'Thank you for your quote request. We will contact you soon!',
            'SubmittedAt' => date('c'),
            'Email' => $request['Email']
        ];

        sendJson($response);
    }

    /**
     * PUT /api/quotes/{id}
     * Update quote status
     */
    public function put($id = null) {
        // Get ID from route if not provided
        if ($id === null) {
            $route = isset($_GET['route']) ? trim($_GET['route'], '/') : '';
            $parts = explode('/', $route);
            $id = isset($parts[1]) && !empty($parts[1]) ? $parts[1] : null;
        }

        if ($id === null) {
            sendError('Quote ID is required', 400);
        }

        $request = getJsonInput();

        if (empty($request['status'])) {
            sendError('Status is required', 400);
        }

        try {
            $db = getDB();

            // Check if quote exists
            $checkStmt = $db->prepare("SELECT quote_id FROM quotes WHERE quote_id = ?");
            $checkStmt->bind_param('s', $id);
            $checkStmt->execute();
            $result = $checkStmt->get_result();

            if ($result->num_rows === 0) {
                sendError('Quote not found', 404);
            }
            $checkStmt->close();

            // Update the quote
            $stmt = $db->prepare("
                UPDATE quotes
                SET status = ?, response = ?, responded_at = NOW(), updated_at = NOW()
                WHERE quote_id = ?
            ");

            $response = $request['response'] ?? '';
            $stmt->bind_param('sss', $request['status'], $response, $id);
            $stmt->execute();
            $stmt->close();

            logMessage("Quote {$id} updated to status: {$request['status']}");

            sendJson([
                'success' => true,
                'message' => 'Quote updated successfully',
                'quote_id' => $id,
                'status' => $request['status']
            ]);

        } catch (Exception $e) {
            logMessage("Failed to update quote: " . $e->getMessage(), 'ERROR');
            sendError('Failed to update quote', 500);
        }
    }

    /**
     * Get quote status by ID
     */
    private function getQuoteStatus($id) {
        try {
            $db = getDB();

            $stmt = $db->prepare("
                SELECT
                    quote_id, name, email, phone, company,
                    product_category, quantity, message, status,
                    created_at, updated_at, response, responded_at
                FROM quotes
                WHERE quote_id = ?
            ");

            $stmt->bind_param('s', $id);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows === 0) {
                sendError('Quote not found', 404);
            }

            $quote = $result->fetch_assoc();
            $stmt->close();

            sendJson([
                'success' => true,
                'quote' => $quote
            ]);

        } catch (Exception $e) {
            logMessage("Failed to retrieve quote: " . $e->getMessage(), 'ERROR');
            sendError('Failed to retrieve quote', 500);
        }
    }

    /**
     * Send email notification for new quote (optional)
     */
    private function sendEmailNotification($data) {
        try {
            $to = 'd.blessing@mrcreamlimited.com'; // Your email address
            $subject = 'New Quote Request - MrCream';

            $message = "New Quote Request Received\n\n";
            $message .= "Name: {$data['Name']}\n";
            $message .= "Email: {$data['Email']}\n";
            $message .= "Phone: " . ($data['Phone'] ?? 'Not provided') . "\n";
            $message .= "Company: " . ($data['Company'] ?? 'Not provided') . "\n";
            $message .= "Product Category: " . ($data['ProductCategory'] ?? 'Not specified') . "\n";
            $message .= "Quantity: " . ($data['Quantity'] ?? 'Not specified') . "\n";
            $message .= "Message:\n" . ($data['Message'] ?? 'No message') . "\n\n";
            $message .= "Submitted at: " . date('Y-m-d H:i:s') . "\n";

            $headers = "From: noreply@mrcreamlimited.com\r\n";
            $headers .= "Reply-To: {$data['Email']}\r\n";

            // Only send if mail function is available
            if (function_exists('mail')) {
                mail($to, $subject, $message, $headers);
                logMessage("Email notification sent for quote request from {$data['Email']}");
            }

        } catch (Exception $e) {
            logMessage("Failed to send email notification: " . $e->getMessage(), 'WARNING');
            // Don't fail - email is optional
        }
    }
}
