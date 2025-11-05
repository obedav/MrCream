-- MrCream Sample Data
-- Optional: Run this AFTER schema.sql to populate test data
-- You can skip this if you want to start with an empty database

-- ============================================
-- SAMPLE CUSTOMERS
-- ============================================
INSERT INTO customers (first_name, last_name, email, phone, date_of_birth, is_age_verified) VALUES
('John', 'Doe', 'john.doe@example.com', '+234 801 234 5678', '1990-05-15', TRUE),
('Jane', 'Smith', 'jane.smith@example.com', '+234 802 345 6789', '1995-08-22', TRUE),
('Michael', 'Johnson', 'michael.j@example.com', '+234 803 456 7890', '1988-12-10', TRUE),
('Sarah', 'Williams', 'sarah.w@example.com', '+234 804 567 8901', '2005-03-18', FALSE);

-- ============================================
-- SAMPLE AGE VERIFICATIONS
-- ============================================
INSERT INTO age_verifications (customer_id, verification_token, date_of_birth, age, is_verified, expires_at, ip_address) VALUES
(1, 'a1b2c3d4e5f6g7h8i9j0', '1990-05-15', 34, TRUE, DATE_ADD(NOW(), INTERVAL 24 HOUR), '192.168.1.100'),
(2, 'z9y8x7w6v5u4t3s2r1q0', '1995-08-22', 29, TRUE, DATE_ADD(NOW(), INTERVAL 24 HOUR), '192.168.1.101'),
(3, 'm1n2o3p4q5r6s7t8u9v0', '1988-12-10', 36, TRUE, DATE_ADD(NOW(), INTERVAL 24 HOUR), '192.168.1.102');

-- ============================================
-- SAMPLE YOGHURT ORDERS
-- ============================================
INSERT INTO yoghurt_orders (order_id, customer_id, customer_first_name, customer_last_name, customer_email, customer_phone, sub_total, delivery_fee, total, payment_method, payment_status, order_status, delivery_street, delivery_city, delivery_state, estimated_delivery) VALUES
('order_6738a1b2c3d4e', 1, 'John', 'Doe', 'john.doe@example.com', '+234 801 234 5678', 900.00, 500.00, 1400.00, 'Cash', 'Paid', 'Delivered', '15 Banana Street', 'Ikeja', 'Lagos', DATE_ADD(NOW(), INTERVAL 2 HOUR)),
('order_6738a2c3d4e5f', 2, 'Jane', 'Smith', 'jane.smith@example.com', '+234 802 345 6789', 600.00, 0.00, 600.00, 'Transfer', 'Pending', 'Confirmed', NULL, NULL, NULL, DATE_ADD(NOW(), INTERVAL 30 MINUTE));

-- ============================================
-- SAMPLE YOGHURT ORDER ITEMS
-- ============================================
INSERT INTO yoghurt_order_items (order_id, flavour_id, flavour_name, quantity, unit_price, sub_total) VALUES
(1, 1, 'MrCream Strawberry', 2, 300.00, 600.00),
(1, 2, 'MrCream Vanilla', 1, 300.00, 300.00),
(2, 1, 'MrCream Strawberry', 2, 300.00, 600.00);

-- ============================================
-- SAMPLE WATER PARK BOOKINGS
-- ============================================
INSERT INTO waterpark_bookings (booking_id, booking_reference, customer_id, customer_first_name, customer_last_name, customer_email, customer_phone, visit_date, sub_total, service_fee, total, payment_method, payment_status, booking_status, special_requests) VALUES
('booking_6738b1c2d3e4f', 'MC202411051234', 1, 'John', 'Doe', 'john.doe@example.com', '+234 801 234 5678', DATE_ADD(CURDATE(), INTERVAL 3 DAY), 12000.00, 600.00, 12600.00, 'Card', 'Paid', 'Confirmed', 'Need wheelchair access'),
('booking_6738b2d3e4f5g', 'MC202411052345', 3, 'Michael', 'Johnson', 'michael.j@example.com', '+234 803 456 7890', DATE_ADD(CURDATE(), INTERVAL 7 DAY), 8000.00, 400.00, 8400.00, 'Cash', 'Pending', 'Confirmed', NULL);

-- ============================================
-- SAMPLE WATER PARK BOOKING TICKETS
-- ============================================
INSERT INTO waterpark_booking_tickets (booking_id, ticket_type_id, ticket_type_name, quantity, unit_price, sub_total, valid_for) VALUES
(1, 4, 'Family Package (2 Adults + 2 Children)', 1, 12000.00, 12000.00, '1 Day'),
(2, 3, 'VIP Pass', 1, 8000.00, 8000.00, '1 Day');

-- ============================================
-- SAMPLE LIQUEUR ORDERS
-- ============================================
INSERT INTO liqueur_orders (order_id, customer_id, customer_first_name, customer_last_name, customer_email, customer_phone, verification_token, age_verification_id, sub_total, shipping_fee, total, payment_method, payment_status, order_status, shipping_street, shipping_city, shipping_state, estimated_delivery) VALUES
('liqueur_6738c1d2e3f4g', 1, 'John', 'Doe', 'john.doe@example.com', '+234 801 234 5678', 'a1b2c3d4e5f6g7h8i9j0', 1, 8500.00, 1500.00, 10000.00, 'Card', 'Pending', 'Processing', '15 Banana Street', 'Ikeja', 'Lagos', DATE_ADD(NOW(), INTERVAL 3 DAY)),
('liqueur_6738c2e3f4g5h', 2, 'Jane', 'Smith', 'jane.smith@example.com', '+234 802 345 6789', 'z9y8x7w6v5u4t3s2r1q0', 2, 12000.00, 1500.00, 13500.00, 'Transfer', 'Paid', 'Shipped', '23 Orange Avenue', 'Lekki', 'Lagos', DATE_ADD(NOW(), INTERVAL 2 DAY));

-- ============================================
-- SAMPLE LIQUEUR ORDER ITEMS
-- ============================================
INSERT INTO liqueur_order_items (order_id, product_id, product_name, quantity, unit_price, sub_total, alcohol_content, volume) VALUES
(1, 1, 'Turbo Cream Liqueur Original', 1, 8500.00, 8500.00, 18.0, '250ml'),
(2, 2, 'Turbo Cream Gold Reserve', 1, 12000.00, 12000.00, 20.0, '250ml');

-- ============================================
-- SAMPLE QUOTES
-- ============================================
INSERT INTO quotes (quote_id, customer_id, name, email, phone, company, product_category, quantity, message, status) VALUES
('quote_6738d1e2f3g4h', NULL, 'David Brown', 'david.b@company.com', '+234 805 678 9012', 'ABC Company Ltd', 'Yoghurt', 500, 'Looking for bulk order for office cafeteria', 'Pending'),
('quote_6738d2f3g4h5i', NULL, 'Lisa Anderson', 'lisa.a@school.com', '+234 806 789 0123', 'Happy Kids School', 'Water Park', 100, 'School excursion for 100 students', 'Responded');

-- ============================================
-- SAMPLE ACTIVITY LOGS
-- ============================================
INSERT INTO activity_logs (customer_id, action, resource_type, resource_id, ip_address, response_status) VALUES
(1, 'yoghurt_order_placed', 'order', 'order_6738a1b2c3d4e', '192.168.1.100', 200),
(1, 'waterpark_booking_created', 'booking', 'booking_6738b1c2d3e4f', '192.168.1.100', 200),
(1, 'age_verification_success', 'verification', 'a1b2c3d4e5f6g7h8i9j0', '192.168.1.100', 200),
(2, 'yoghurt_order_placed', 'order', 'order_6738a2c3d4e5f', '192.168.1.101', 200);
