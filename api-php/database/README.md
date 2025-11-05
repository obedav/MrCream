# MrCream Database Setup Guide

## Database Created
✅ Database Name: `mrcreaml_mrcream_db`

## Step-by-Step Setup Instructions

### Step 1: Import Database Schema
1. Log into your **Syskay cPanel**
2. Open **phpMyAdmin**
3. Select your database `mrcreaml_mrcream_db` from the left sidebar
4. Click the **Import** tab at the top
5. Click **Choose File** and select `schema.sql` from this folder
6. Scroll down and click **Go** button
7. Wait for success message: "Import has been successfully finished"

### Step 2: (Optional) Import Sample Data
If you want test data to see how the system works:
1. In phpMyAdmin, still in `mrcreaml_mrcream_db`
2. Click **Import** tab again
3. Choose `sample_data.sql` from this folder
4. Click **Go**
5. You should now have sample customers, orders, bookings, etc.

**Note:** Skip Step 2 if you want to start with an empty database.

### Step 3: Update API Configuration
1. Open `api-php/config.php` in a text editor
2. Update the database credentials (around line 44-48):

```php
// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'mrcreaml_mrcream_db');     // ✅ Your database name
define('DB_USER', 'mrcreaml_XXXXX');          // Your database username
define('DB_PASS', 'your_password_here');      // Your database password
```

3. Replace `mrcreaml_XXXXX` with your actual database username
4. Replace `your_password_here` with your actual database password
5. Save the file

### Step 4: Update Controllers to Use Database
Currently, your PHP controllers use hardcoded data. You'll need to update them to use the database. This is a more advanced step.

**Example: Updating YoghurtController to save orders**

Current code (hardcoded):
```php
$response = [
    'OrderId' => uniqid('order_'),
    ...
];
sendJson($response);
```

With database (future update):
```php
// Connect to database
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Insert order into database
$stmt = $conn->prepare("INSERT INTO yoghurt_orders (order_id, customer_email, total, ...) VALUES (?, ?, ?, ...)");
// ... execute query

sendJson($response);
```

## Database Tables Created

### Core Tables
- **customers** - Customer information
- **age_verifications** - Age verification tokens for liqueur access

### Order Tables
- **yoghurt_orders** - Yoghurt drink orders
- **yoghurt_order_items** - Line items for each yoghurt order
- **waterpark_bookings** - Water park ticket bookings
- **waterpark_booking_tickets** - Tickets for each booking
- **liqueur_orders** - Liqueur product orders
- **liqueur_order_items** - Line items for each liqueur order
- **quotes** - Quote requests from customers

### Tracking Tables
- **activity_logs** - API usage and customer activity logs

## Verifying the Setup

### Test in phpMyAdmin
1. In phpMyAdmin, select `mrcreaml_mrcream_db`
2. Click on any table (e.g., `customers`)
3. Click **Browse** to see the data

### Test the API Connection
Create a test file `api-php/test-db.php`:

```php
<?php
require_once 'config.php';

// Test database connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die(json_encode([
        'error' => true,
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]));
}

echo json_encode([
    'success' => true,
    'message' => 'Database connected successfully!',
    'database' => DB_NAME,
    'tables' => $conn->query("SHOW TABLES")->num_rows . ' tables found'
]);

$conn->close();
```

Visit: `https://yourdomain.com/api/test-db.php`

You should see:
```json
{
    "success": true,
    "message": "Database connected successfully!",
    "database": "mrcreaml_mrcream_db",
    "tables": "10 tables found"
}
```

## Common Issues & Solutions

### Issue: "Access denied for user"
**Solution:** Double-check your DB_USER and DB_PASS in config.php

### Issue: "Unknown database"
**Solution:** Make sure you created the database in cPanel and the name matches exactly

### Issue: "Table doesn't exist"
**Solution:** Run the schema.sql import again in phpMyAdmin

### Issue: Tables imported but empty
**Solution:** This is normal! Sample data is optional. Import sample_data.sql if needed.

## Security Reminders

1. **Never commit** your real database password to git
2. Keep `config.php` secure with proper permissions (644 or 640)
3. Use strong passwords for your database user
4. Regularly backup your database in cPanel

## Next Steps

After setup, you'll want to:
1. ✅ Update controllers to INSERT data into database
2. ✅ Update controllers to SELECT data from database
3. ✅ Add proper error handling for database operations
4. ✅ Implement database backups (use cPanel backup feature)
5. ✅ Monitor database size and performance

## Support

If you encounter issues:
- Check Syskay hosting documentation
- Contact Syskay support for database/phpMyAdmin issues
- Review error logs in `api-php/logs/`
