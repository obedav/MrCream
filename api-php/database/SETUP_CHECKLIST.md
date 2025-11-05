# Database Setup Checklist

## ✅ What You've Done
- [x] Created database: `mrcreaml_mrcream_db` on Syskay hosting

## 📋 Next Steps

### Step 1: Get Your Database Credentials
1. Log into **Syskay cPanel**
2. Go to **MySQL Databases**
3. Find your database user (should be something like `mrcreaml_XXXXX`)
4. Note down:
   - Database Username: `mrcreaml_______`
   - Database Password: `________________`

### Step 2: Import Database Schema
1. In cPanel, open **phpMyAdmin**
2. Click on `mrcreaml_mrcream_db` in the left sidebar
3. Click **Import** tab
4. Upload `schema.sql` (from this folder)
5. Click **Go** and wait for success message

### Step 3: (Optional) Import Sample Data
1. Still in phpMyAdmin
2. Click **Import** again
3. Upload `sample_data.sql`
4. Click **Go**

**Skip this if you want to start with an empty database**

### Step 4: Update config.php
1. Open `api-php/config.php`
2. Find lines 47-49
3. Replace:
   - `mrcreaml_XXXXX` with your actual username
   - `YOUR_PASSWORD_HERE` with your actual password
4. Save the file

### Step 5: Upload to Server
1. Upload the entire `api-php` folder to your Syskay hosting
2. Make sure files are in the correct directory (usually `public_html/api/`)
3. Set permissions:
   - Folders: 755
   - PHP files: 644
   - config.php: 644 or 640

### Step 6: Test the Connection
1. Visit: `https://yourmrcreamdomain.com/api/health`
2. You should see:
   ```json
   {
     "Status": "Healthy",
     "Timestamp": "...",
     "Message": "MrCream PHP API is running successfully!"
   }
   ```

### Step 7: Test Database Connection
1. Create a test file or use phpMyAdmin to verify
2. Check that all 10 tables exist:
   - customers
   - age_verifications
   - yoghurt_orders
   - yoghurt_order_items
   - waterpark_bookings
   - waterpark_booking_tickets
   - liqueur_orders
   - liqueur_order_items
   - quotes
   - activity_logs

## 🚀 After Setup

Once everything is working:
1. Update controllers to use database (see `example_usage.php`)
2. Test each endpoint (yoghurt, waterpark, liqueur, quotes)
3. Monitor the logs folder for any errors
4. Set up regular database backups in cPanel

## 📞 Need Help?

- Database not connecting? Check username/password in config.php
- Tables not created? Re-run schema.sql import
- API not working? Check logs in `api-php/logs/`
- Still stuck? Contact Syskay support

## 🔐 Security Reminders

- ✅ Keep database password secure
- ✅ Never commit config.php with real passwords to git
- ✅ Set proper file permissions (644 for files, 755 for folders)
- ✅ Enable HTTPS on your domain
- ✅ Regular backups via cPanel
