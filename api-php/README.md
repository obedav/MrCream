# MrCream PHP API

PHP REST API for MrCream - Water Park, Yoghurt, and Liqueur products.

## Features

- ✅ RESTful API compatible with cPanel hosting
- ✅ CORS enabled for cross-origin requests
- ✅ Clean URL routing with `.htaccess`
- ✅ JSON request/response format
- ✅ Logging system
- ✅ Error handling
- ✅ Compatible with existing .NET API endpoints

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Water Park
- `GET /api/waterpark/attractions` - Get all attractions
- `GET /api/waterpark/tickets` - Get ticket types and pricing
- `GET /api/waterpark/info` - Get park information
- `GET /api/waterpark/events` - Get event packages
- `GET /api/waterpark/capacity` - Get real-time capacity
- `POST /api/waterpark/book` - Book tickets

### Yoghurt
- `GET /api/yoghurt/flavours` - Get all flavours
- `GET /api/yoghurt/flavours/{id}` - Get specific flavour
- `POST /api/yoghurt/order` - Place order
- `GET /api/yoghurt/nutrition` - Get nutritional info
- `GET /api/yoghurt/stores` - Get store locations

### Liqueur (18+)
- `POST /api/liqueur/verify-age` - Verify age (18+)
- `GET /api/liqueur/products` - Get products (requires token)
- `GET /api/liqueur/cocktails` - Get cocktail recipes (requires token)
- `GET /api/liqueur/serving-guide` - Get serving guide (requires token)
- `POST /api/liqueur/order` - Place order (requires token)
- `GET /api/liqueur/responsible-drinking` - Get responsible drinking info

### Quotes
- `POST /api/quotes` - Submit quote request
- `GET /api/quotes/{id}` - Get quote status

## Requirements

- PHP 7.4 or higher
- Apache with mod_rewrite enabled
- cPanel hosting (or any PHP hosting)

## Installation (cPanel)

### Step 1: Upload Files

1. **Login to cPanel File Manager**
2. **Navigate to `public_html`**
3. **Create `api` folder** (if it doesn't exist)
4. **Upload all files** from `api-php/` to `public_html/api/`

Your structure should look like:
```
public_html/
├── api/
│   ├── controllers/
│   │   ├── WaterparkController.php
│   │   ├── YoghurtController.php
│   │   ├── LiqueurController.php
│   │   └── QuotesController.php
│   ├── logs/
│   ├── .htaccess
│   ├── config.php
│   ├── index.php
│   └── README.md
├── css/
├── js/
├── images/
├── index.html
└── ... (other frontend files)
```

### Step 2: Set Permissions

Using cPanel File Manager:
1. Right-click on `api` folder → **Change Permissions**
2. Set `api/` folder to **0755**
3. Set `api/logs/` folder to **0755** (create if not exists)
4. Set `.htaccess` to **0644**
5. Set `*.php` files to **0644**

### Step 3: Test the API

Visit in your browser:
- **https://mrcreamlimited.com/api** (should show welcome message)
- **https://mrcreamlimited.com/api/health** (should show health check)
- **https://mrcreamlimited.com/api/waterpark/attractions** (should show attractions)

### Step 4: Configure (Optional)

Edit `config.php` to customize:
- Error logging settings
- JWT secret key
- Database credentials (if you add database later)

## Testing Locally

If you want to test locally before deploying:

1. **Install PHP** (if not already installed)
2. **Navigate to the folder**:
   ```bash
   cd C:\Users\obeda\Desktop\MrCream\api-php
   ```
3. **Start PHP built-in server**:
   ```bash
   php -S localhost:8000
   ```
4. **Test in browser**:
   - http://localhost:8000/api/health
   - http://localhost:8000/api/waterpark/attractions

## Troubleshooting

### 404 Error on all endpoints

**Problem:** `.htaccess` not working

**Solution:**
1. Ensure mod_rewrite is enabled in Apache
2. Check file permissions on `.htaccess` (should be 0644)
3. Verify `.htaccess` is in the `api/` folder

### CORS Errors

**Problem:** Frontend can't access API from different domain

**Solution:**
- CORS headers are already configured in `config.php`
- If still issues, check if your hosting provider blocks headers
- Contact hosting support to enable CORS

### 500 Internal Server Error

**Problem:** PHP errors

**Solution:**
1. Check error logs in `api/logs/php-errors.log`
2. Check cPanel error logs
3. Enable error display temporarily in `config.php`:
   ```php
   ini_set('display_errors', '1');
   ```

### Empty Response

**Problem:** No JSON output

**Solution:**
1. Check if PHP version is 7.4+
2. Verify JSON functions are enabled
3. Check logs in `api/logs/`

## Logs

API logs are stored in:
- `logs/api-YYYY-MM-DD.log` - API request logs
- `logs/php-errors.log` - PHP error logs

## Security Notes

1. **Change JWT Secret** in `config.php` before production
2. **Disable error display** in production (`display_errors = '0'`)
3. **Set up HTTPS** (SSL certificate)
4. **Regularly check logs** for suspicious activity

## Next Steps

### Add Database Support

Currently, the API uses hardcoded data (like the .NET version). To add database:

1. **Create MySQL database** in cPanel
2. **Update config.php** with database credentials
3. **Modify controllers** to use database queries
4. **Create tables** for products, orders, bookings, etc.

### Add Email Notifications

For orders and quotes:
1. Use PHP `mail()` function
2. Or integrate with email service (SendGrid, Mailgun)

### Add Payment Integration

For actual bookings:
1. Integrate Paystack or Flutterwave
2. Add payment processing endpoints

## Support

For issues:
- Check logs in `api/logs/`
- Contact your hosting provider
- Email: info@loylatyglobal.com

## License

Copyright © 2024 MrCream Limited
