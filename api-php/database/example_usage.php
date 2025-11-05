<?php
/**
 * Example: How to use the Database class in your controllers
 *
 * This file shows examples of common database operations
 * Copy these patterns into your actual controllers
 */

require_once '../config.php';
require_once 'Database.php';

// ============================================
// EXAMPLE 1: Insert a Yoghurt Order
// ============================================
function exampleInsertYoghurtOrder($orderData) {
    $db = getDB();

    try {
        // Start transaction
        $db->beginTransaction();

        // Insert main order
        $stmt = $db->prepare("
            INSERT INTO yoghurt_orders
            (order_id, customer_first_name, customer_last_name, customer_email,
             customer_phone, sub_total, delivery_fee, total, payment_method,
             order_status, estimated_delivery)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $orderId = uniqid('order_');
        $status = 'Confirmed';
        $estimatedDelivery = date('Y-m-d H:i:s', strtotime('+2 hours'));

        $stmt->bind_param(
            'sssssdddsss',
            $orderId,
            $orderData['CustomerInfo']['FirstName'],
            $orderData['CustomerInfo']['LastName'],
            $orderData['CustomerInfo']['Email'],
            $orderData['CustomerInfo']['Phone'],
            $orderData['SubTotal'],
            $orderData['DeliveryFee'],
            $orderData['Total'],
            $orderData['PaymentMethod'],
            $status,
            $estimatedDelivery
        );

        $stmt->execute();
        $orderDbId = $db->getLastInsertId();
        $stmt->close();

        // Insert order items
        $itemStmt = $db->prepare("
            INSERT INTO yoghurt_order_items
            (order_id, flavour_id, flavour_name, quantity, unit_price, sub_total)
            VALUES (?, ?, ?, ?, ?, ?)
        ");

        foreach ($orderData['Items'] as $item) {
            $itemStmt->bind_param(
                'iisidd',
                $orderDbId,
                $item['FlavourId'],
                $item['FlavourName'],
                $item['Quantity'],
                $item['UnitPrice'],
                $item['SubTotal']
            );
            $itemStmt->execute();
        }

        $itemStmt->close();

        // Commit transaction
        $db->commit();

        return [
            'success' => true,
            'order_id' => $orderId,
            'database_id' => $orderDbId
        ];

    } catch (Exception $e) {
        $db->rollback();
        logMessage("Failed to insert yoghurt order: " . $e->getMessage(), 'ERROR');
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

// ============================================
// EXAMPLE 2: Get All Orders for a Customer
// ============================================
function exampleGetCustomerOrders($email) {
    $db = getDB();

    try {
        $stmt = $db->prepare("
            SELECT
                order_id, customer_first_name, customer_last_name,
                total, order_status, created_at
            FROM yoghurt_orders
            WHERE customer_email = ?
            ORDER BY created_at DESC
        ");

        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();

        $orders = [];
        while ($row = $result->fetch_assoc()) {
            $orders[] = $row;
        }

        $stmt->close();

        return [
            'success' => true,
            'orders' => $orders
        ];

    } catch (Exception $e) {
        logMessage("Failed to get customer orders: " . $e->getMessage(), 'ERROR');
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

// ============================================
// EXAMPLE 3: Save Age Verification
// ============================================
function exampleSaveAgeVerification($dob, $age, $token) {
    $db = getDB();

    try {
        $stmt = $db->prepare("
            INSERT INTO age_verifications
            (verification_token, date_of_birth, age, is_verified, expires_at, ip_address)
            VALUES (?, ?, ?, ?, ?, ?)
        ");

        $isVerified = $age >= 18 ? 1 : 0;
        $expiresAt = date('Y-m-d H:i:s', strtotime('+24 hours'));
        $ipAddress = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

        $stmt->bind_param(
            'ssiiss',
            $token,
            $dob,
            $age,
            $isVerified,
            $expiresAt,
            $ipAddress
        );

        $stmt->execute();
        $verificationId = $db->getLastInsertId();
        $stmt->close();

        return [
            'success' => true,
            'verification_id' => $verificationId
        ];

    } catch (Exception $e) {
        logMessage("Failed to save age verification: " . $e->getMessage(), 'ERROR');
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

// ============================================
// EXAMPLE 4: Verify Token (Check if valid)
// ============================================
function exampleVerifyToken($token) {
    $db = getDB();

    try {
        $stmt = $db->prepare("
            SELECT id, age, is_verified, expires_at
            FROM age_verifications
            WHERE verification_token = ?
            AND is_verified = 1
            AND expires_at > NOW()
        ");

        $stmt->bind_param('s', $token);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $verification = $result->fetch_assoc();
            $stmt->close();

            return [
                'success' => true,
                'valid' => true,
                'verification' => $verification
            ];
        } else {
            $stmt->close();

            return [
                'success' => true,
                'valid' => false,
                'message' => 'Invalid or expired token'
            ];
        }

    } catch (Exception $e) {
        logMessage("Failed to verify token: " . $e->getMessage(), 'ERROR');
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

// ============================================
// EXAMPLE 5: Insert Water Park Booking
// ============================================
function exampleInsertWaterParkBooking($bookingData) {
    $db = getDB();

    try {
        $db->beginTransaction();

        // Insert booking
        $stmt = $db->prepare("
            INSERT INTO waterpark_bookings
            (booking_id, booking_reference, customer_first_name, customer_last_name,
             customer_email, customer_phone, visit_date, sub_total, service_fee,
             total, payment_method, booking_status, special_requests)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $bookingId = uniqid('booking_');
        $reference = 'MC' . date('Ymd') . rand(1000, 9999);
        $status = 'Confirmed';

        $stmt->bind_param(
            'sssssssdddsss',
            $bookingId,
            $reference,
            $bookingData['CustomerInfo']['FirstName'],
            $bookingData['CustomerInfo']['LastName'],
            $bookingData['CustomerInfo']['Email'],
            $bookingData['CustomerInfo']['Phone'],
            $bookingData['VisitDate'],
            $bookingData['SubTotal'],
            $bookingData['ServiceFee'],
            $bookingData['Total'],
            $bookingData['PaymentMethod'],
            $status,
            $bookingData['SpecialRequests']
        );

        $stmt->execute();
        $bookingDbId = $db->getLastInsertId();
        $stmt->close();

        // Insert tickets
        $ticketStmt = $db->prepare("
            INSERT INTO waterpark_booking_tickets
            (booking_id, ticket_type_id, ticket_type_name, quantity, unit_price, sub_total, valid_for)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");

        foreach ($bookingData['Tickets'] as $ticket) {
            $ticketStmt->bind_param(
                'iisidds',
                $bookingDbId,
                $ticket['TicketTypeId'],
                $ticket['TicketTypeName'],
                $ticket['Quantity'],
                $ticket['UnitPrice'],
                $ticket['SubTotal'],
                $ticket['ValidFor']
            );
            $ticketStmt->execute();
        }

        $ticketStmt->close();
        $db->commit();

        return [
            'success' => true,
            'booking_id' => $bookingId,
            'booking_reference' => $reference
        ];

    } catch (Exception $e) {
        $db->rollback();
        logMessage("Failed to insert booking: " . $e->getMessage(), 'ERROR');
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

// ============================================
// EXAMPLE 6: Get Order by ID
// ============================================
function exampleGetOrderById($orderId) {
    $db = getDB();

    try {
        // Get order
        $stmt = $db->prepare("
            SELECT * FROM yoghurt_orders WHERE order_id = ?
        ");

        $stmt->bind_param('s', $orderId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            return [
                'success' => false,
                'message' => 'Order not found'
            ];
        }

        $order = $result->fetch_assoc();
        $orderDbId = $order['id'];
        $stmt->close();

        // Get order items
        $itemStmt = $db->prepare("
            SELECT * FROM yoghurt_order_items WHERE order_id = ?
        ");

        $itemStmt->bind_param('i', $orderDbId);
        $itemStmt->execute();
        $itemsResult = $itemStmt->get_result();

        $items = [];
        while ($item = $itemsResult->fetch_assoc()) {
            $items[] = $item;
        }

        $itemStmt->close();

        $order['items'] = $items;

        return [
            'success' => true,
            'order' => $order
        ];

    } catch (Exception $e) {
        logMessage("Failed to get order: " . $e->getMessage(), 'ERROR');
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

// ============================================
// HOW TO USE IN YOUR CONTROLLERS
// ============================================

/*
In YoghurtController.php, update postOrder() method:

public function postOrder() {
    $request = getJsonInput();

    // ... validation code ...

    // Prepare order data
    $orderData = [
        'CustomerInfo' => $request['CustomerInfo'],
        'Items' => $orderItems,  // From your existing code
        'SubTotal' => $total,
        'DeliveryFee' => $deliveryFee,
        'Total' => $total + $deliveryFee,
        'PaymentMethod' => $request['PaymentMethod'] ?? 'Cash'
    ];

    // Save to database
    require_once __DIR__ . '/../database/Database.php';
    $result = exampleInsertYoghurtOrder($orderData);

    if (!$result['success']) {
        sendError('Failed to save order', 500);
    }

    // Return response
    $response = [
        'OrderId' => $result['order_id'],
        // ... rest of response
    ];

    sendJson($response);
}
*/
