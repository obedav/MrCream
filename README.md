# 🥛 MrCream - Where Every Drop is a Splash of Joy!

<div align="center">

![MrCream Banner](frontend-new/images/logo/Logo.png)

**Premium Nigerian Hospitality Experience**

[![Live Site](https://img.shields.io/badge/Live-mrcreamlimited.com-blue?style=for-the-badge)](https://mrcreamlimited.com)
[![PHP Version](https://img.shields.io/badge/PHP-7.4+-777BB4?style=for-the-badge&logo=php)](https://www.php.net/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](LICENSE)

*Delicious yoghurt drinks, thrilling water park attractions, and premium cream liqueur - all in one destination!*

[Features](#-features) • [Tech Stack](#-technology-stack) • [Installation](#-installation) • [API Docs](#-api-documentation) • [Security](#-security)

</div>

---

## 📋 Table of Contents

- [About](#-about-mrcream)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [API Documentation](#-api-documentation)
- [Security Features](#-security)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About MrCream

MrCream Limited is Nigeria's premier destination for:

🥤 **Premium Yoghurt Drinks**
- 100% natural ingredients
- Multiple flavors: Strawberry, Vanilla, Mixed Berry
- Nutritious and refreshing

🏊‍♂️ **Aqua Splash Water Park**
- Lagos' most exciting water park
- Wave pools, lazy rivers, thrilling slides
- Open 7 days a week
- Event hosting (birthdays, corporate events, school trips)

🍾 **Turbo Cream Liqueur** *(18+ Only)*
- Premium African cream liqueur
- Unique blend with West African ingredients
- Original, Gold Reserve, and Coffee Fusion variants

📦 **Business Solutions**
- Bulk ordering for distributors
- Wholesale pricing for retailers
- Partnership opportunities

---

## 🌟 Features

### Customer-Facing Features
✅ **Responsive Design** - Perfect experience on mobile, tablet, and desktop
✅ **Age Verification** - Secure 18+ verification for liqueur section
✅ **WhatsApp Integration** - Instant customer support via WhatsApp
✅ **Quote Request System** - Easy quote requests for bulk orders
✅ **Product Catalog** - Browse yoghurt flavors and liqueur products
✅ **Water Park Booking** - View attractions and ticket packages

### Technical Features
🔒 **Security Headers** - XSS, clickjacking, and MIME-sniffing protection
🛡️ **Input Sanitization** - Prevent injection attacks
⏱️ **Rate Limiting** - Prevent API abuse (3 requests per 5 minutes)
🔐 **Token-Based Auth** - Secure age verification with JWT-style tokens
📧 **Email Validation** - Server-side and client-side validation
📱 **Mobile-First Design** - Optimized for mobile devices
🌐 **CORS Configuration** - Secure cross-origin resource sharing

### Business Features
📊 **Quote Management** - Admin dashboard for quote requests
📈 **Analytics Tracking** - User behavior and page analytics
🎫 **Ticket Pricing** - Dynamic ticket packages and pricing
🍹 **Cocktail Recipes** - Curated cocktail recipes for liqueur products

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Vanilla JavaScript for interactivity
- **Bootstrap Icons** - Icon library

### Backend
- **PHP 7.4+** - Server-side logic
- **MySQL** - Database management
- **REST API** - JSON-based API endpoints

### Security
- **Input Sanitization** - htmlspecialchars() for XSS prevention
- **Prepared Statements** - SQL injection prevention
- **CORS** - Cross-origin security
- **Security Headers** - X-Frame-Options, CSP, etc.

### Infrastructure
- **Git** - Version control
- **cPanel/DirectAdmin** - Hosting management
- **SSL/TLS** - HTTPS encryption

---

## 📁 Project Structure

```
MrCream/
├── frontend-new/              # Frontend application
│   ├── index.html            # Home page
│   ├── waterpark.html        # Water park page
│   ├── yoghurt.html          # Yoghurt products page
│   ├── liqueur.html          # Liqueur products (18+)
│   ├── quote.html            # Quote request page
│   ├── css/
│   │   └── styles.css        # Main stylesheet
│   ├── js/
│   │   ├── main.js           # Core JavaScript with security utilities
│   │   ├── api.js            # API client
│   │   └── quote-modal.js    # Quote modal functionality
│   └── images/               # Product images and assets
│
├── api-php/                   # PHP Backend API
│   ├── config.php            # Configuration (NOT in Git)
│   ├── config.example.php    # Config template
│   ├── index.php             # API router
│   ├── controllers/          # API Controllers
│   │   ├── WaterparkController.php
│   │   ├── YoghurtController.php
│   │   ├── LiqueurController.php
│   │   └── QuotesController.php
│   ├── database/             # Database layer
│   │   ├── schema.sql        # Database schema
│   │   ├── Database.php      # Database connection class
│   │   └── sample_data.sql   # Sample data
│   └── .gitignore            # Protect sensitive files
│
└── README.md                  # This file
```

---

## 🚀 Installation

### Prerequisites
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache/Nginx)
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mrcream.git
   cd mrcream
   ```

2. **Set up the database**
   ```bash
   mysql -u root -p < api-php/database/schema.sql
   mysql -u root -p < api-php/database/sample_data.sql
   ```

3. **Configure the API**
   ```bash
   cd api-php
   cp config.example.php config.php
   # Edit config.php with your database credentials
   ```

4. **Start local server**
   ```bash
   # Using PHP built-in server
   cd frontend-new
   php -S localhost:8000

   # In another terminal, start API
   cd api-php
   php -S localhost:7001
   ```

5. **Access the application**
   - Frontend: `http://localhost:8000`
   - API: `http://localhost:7001/api/health`

---

## 📡 API Documentation

### Base URL
```
Production: https://mrcreamlimited.com/api
Development: http://localhost:7001/api
```

### Authentication
Liqueur endpoints require age verification token in Authorization header:
```
Authorization: Bearer {verification_token}
```

### Endpoints

#### Health Check
```http
GET /api/health
```
**Response:**
```json
{
  "Status": "Healthy",
  "Timestamp": "2025-11-05T04:50:20+01:00",
  "Message": "MrCream PHP API is running successfully!"
}
```

#### Water Park

```http
GET /api/waterpark/attractions    # Get all attractions
GET /api/waterpark/tickets        # Get ticket pricing
GET /api/waterpark/info           # Get park information
GET /api/waterpark/events         # Get event packages
GET /api/waterpark/capacity       # Get current capacity
POST /api/waterpark/book          # Book tickets
```

#### Yoghurt

```http
GET /api/yoghurt/flavours         # Get all flavours
GET /api/yoghurt/flavours/{id}    # Get specific flavour
GET /api/yoghurt/nutrition        # Nutritional info
GET /api/yoghurt/stores           # Store locations
POST /api/yoghurt/order           # Place order
```

#### Liqueur (18+ Age Gated)

```http
POST /api/liqueur/verify-age      # Verify age (returns token)
GET /api/liqueur/products         # Get products (requires token)
GET /api/liqueur/cocktails        # Get cocktail recipes (requires token)
GET /api/liqueur/serving-guide    # Serving suggestions (requires token)
POST /api/liqueur/order           # Place order (requires token)
GET /api/liqueur/responsible-drinking  # Responsible drinking info
```

#### Quotes

```http
POST /api/quotes                  # Submit quote request
GET /api/quotes/{id}              # Get quote status
GET /api/quotes                   # Get all quotes (admin)
PUT /api/quotes/{id}              # Update quote (admin)
```

### Example: Submit Quote Request

**Request:**
```http
POST /api/quotes
Content-Type: application/json

{
  "Name": "John Doe",
  "Email": "john@example.com",
  "Phone": "+234 803 123 4567",
  "Company": "ABC Distributors",
  "ProductCategory": "yoghurt",
  "Quantity": 500,
  "Message": "Interested in bulk yoghurt orders"
}
```

**Response:**
```json
{
  "Id": "quote_67890abcdef",
  "Message": "Thank you for your quote request. We will contact you soon!",
  "SubmittedAt": "2025-11-05T10:30:00+01:00",
  "Email": "john@example.com"
}
```

---

## 🔒 Security

### Implemented Security Measures

✅ **XSS Prevention**
- Input sanitization with `htmlspecialchars()`
- Content Security Policy (CSP)
- X-XSS-Protection headers

✅ **SQL Injection Prevention**
- Prepared statements with parameterized queries
- Input validation and type casting

✅ **CSRF Protection**
- Same-origin policy enforcement
- Secure CORS configuration

✅ **Clickjacking Prevention**
- X-Frame-Options: SAMEORIGIN
- Frame ancestors CSP directive

✅ **Rate Limiting**
- 3 requests per 5 minutes on quote submissions
- Prevents API abuse and DoS attempts

✅ **Secure Authentication**
- Tokens sent via Authorization headers (not URLs)
- 24-hour token expiration
- Age verification for restricted content

✅ **Data Validation**
- Email format validation
- Phone number format validation
- Input length limits (max 100 chars for emails/names)

✅ **Error Handling**
- User-friendly error messages
- No sensitive information in errors
- Detailed logging for debugging

### Security Headers Applied

```http
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Sensitive Files Protected

The following files are excluded from Git via `.gitignore`:
- `api-php/config.php` - Database credentials and JWT secrets
- `api-php/logs/` - Application logs
- `.env` - Environment variables

---

## 🌐 Deployment

### Production Deployment Checklist

- [ ] Update `api-php/config.php` with production credentials
- [ ] Set `display_errors` to `'0'` in `config.php`
- [ ] Comment out CORS wildcard in production
- [ ] Verify database connection
- [ ] Test all API endpoints
- [ ] Enable HTTPS/SSL
- [ ] Set up automated backups
- [ ] Configure error logging
- [ ] Test responsive design on mobile devices
- [ ] Verify WhatsApp integration
- [ ] Test quote submission flow

### Environment Variables

Create `api-php/config.php` based on `config.example.php`:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_database_user');
define('DB_PASS', 'your_secure_password');
define('JWT_SECRET', 'your_jwt_secret_key');
```

---

## 👥 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use semantic HTML5
- Follow PSR-12 for PHP code
- Use camelCase for JavaScript variables
- Add comments for complex logic
- Test all changes before submitting

---

## 📊 Stats

- 🎉 **260,000+** satisfied customers
- 🏊 **7 days** water park operation
- 🥤 **100%** natural ingredients
- ⭐ **4.8/5** customer satisfaction rating

---

## 📄 License

Copyright © 2025 MrCream Limited. All rights reserved.

This is proprietary software. Unauthorized copying, modification, or distribution is prohibited.

---

## 📞 Contact

**MrCream Limited**

- 🌐 Website: [https://mrcreamlimited.com](https://mrcreamlimited.com)
- 📧 Email: info@mrcreamlimited.com
- 📱 WhatsApp: [+234 803 2354 952](https://wa.me/2348032354952)
- 📍 Location: Lagos, Nigeria

### Business Inquiries
- **Bulk Orders:** d.blessing@mrcreamlimited.com
- **Partnerships:** partnerships@mrcreamlimited.com
- **Water Park Events:** events@mrcreamlimited.com

---

## 🙏 Acknowledgments

- Bootstrap Icons for the icon library
- Google Fonts for typography
- All our amazing customers and partners!

---

<div align="center">

**Made with ❤️ in Nigeria**

*Where Every Drop is a Splash of Joy!*

</div>
