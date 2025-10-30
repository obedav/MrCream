# MrCream - New Frontend

This is the new frontend design for MrCream, built with clean HTML, CSS, and JavaScript. It connects to the existing .NET Core backend API.

## 📁 Project Structure

```
frontend-new/
├── index.html          # Homepage
├── waterpark.html      # Water Park page (connects to WaterParkController)
├── yoghurt.html        # Yoghurt products page (connects to YoghurtController)
├── liqueur.html        # Liqueur page with age verification (connects to LiqueurController)
├── quote.html          # Contact/Quote request page
├── css/
│   └── styles.css      # Main stylesheet with design system
├── js/
│   ├── api.js          # API client for backend connection
│   └── main.js         # Common JavaScript functionality
└── images/             # Store your images here
```

## 🚀 Getting Started

### 1. Development Setup

1. **Start the Backend API:**
   ```bash
   cd ../MrCream.API
   dotnet run
   ```
   The API will run at: `https://localhost:7001`

2. **Serve the Frontend:**

   **Option A - Using Live Server (VS Code):**
   - Install "Live Server" extension in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"

   **Option B - Using Python:**
   ```bash
   cd frontend-new
   python -m http.server 8000
   ```
   Then open: `http://localhost:8000`

   **Option C - Using Node.js:**
   ```bash
   cd frontend-new
   npx http-server -p 8000
   ```

3. **Open in Browser:**
   Navigate to the URL provided by your server (e.g., `http://127.0.0.1:5500` or `http://localhost:8000`)

### 2. Production Deployment (SolidCP)

#### Backend Deployment:
1. Publish your .NET API:
   ```bash
   cd MrCream.API
   dotnet publish -c Release
   ```

2. Upload the published files to SolidCP in a subfolder like `/api`

3. Configure IIS application pool for .NET Core

4. Update connection string in `appsettings.json` for production database

#### Frontend Deployment:
1. Update API URL in `js/api.js`:
   ```javascript
   const API_CONFIG = {
       baseUrl: 'https://yourdomain.com/api',  // Change this to your production URL
       // ...
   };
   ```

2. Upload all frontend files to your SolidCP website root:
   - index.html
   - waterpark.html
   - yoghurt.html
   - liqueur.html
   - quote.html
   - css/ folder
   - js/ folder
   - images/ folder

3. Your site structure on SolidCP should look like:
   ```
   yoursite.com/
   ├── index.html
   ├── waterpark.html
   ├── yoghurt.html
   ├── liqueur.html
   ├── quote.html
   ├── css/
   ├── js/
   ├── images/
   └── api/           (your .NET backend)
   ```

## 🎨 Customization

### Changing Colors
Edit CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #FF6B6B;      /* Main brand color */
    --secondary-color: #4ECDC4;    /* Secondary brand color */
    --accent-color: #FFE66D;       /* Accent color */
    /* ... more variables ... */
}
```

### Adding Images
1. Place your images in the `images/` folder
2. Update image paths in HTML files
3. Example:
   ```html
   <img src="images/your-image.jpg" alt="Description">
   ```

### Changing Fonts
Edit the Google Fonts import in each HTML file's `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;600;700&display=swap" rel="stylesheet">
```

Then update the CSS variable:
```css
:root {
    --font-family: 'YourFont', sans-serif;
}
```

## 🔌 API Integration

### Available API Endpoints

**Water Park:**
- `GET /api/waterpark/attractions` - Get all attractions
- `GET /api/waterpark/tickets` - Get ticket types
- `GET /api/waterpark/info` - Get park information
- `GET /api/waterpark/events` - Get event packages
- `GET /api/waterpark/capacity` - Get capacity status
- `POST /api/waterpark/book` - Book tickets

**Yoghurt:**
- `GET /api/yoghurt/flavours` - Get all flavours
- `GET /api/yoghurt/flavours/{id}` - Get specific flavour
- `POST /api/yoghurt/order` - Place order

**Liqueur (18+):**
- `POST /api/liqueur/verify-age` - Verify age
- `GET /api/liqueur/products` - Get products (requires token)
- `GET /api/liqueur/cocktails` - Get cocktails (requires token)

### Using the API in Your Code

```javascript
// Example: Load water park attractions
const attractions = await window.MrCreamAPI.waterpark.getAttractions();

// Example: Book water park tickets
const booking = await window.MrCreamAPI.waterpark.book({
    name: 'John Doe',
    email: 'john@example.com',
    date: '2025-06-15',
    guests: 4
});

// Example: Order yoghurt
const order = await window.MrCreamAPI.yoghurt.order({
    flavourId: 1,
    quantity: 10,
    address: '123 Main St'
});
```

## 📱 Features

✅ **Fully Responsive** - Works on desktop, tablet, and mobile
✅ **Modern Design System** - Clean, professional look with CSS variables
✅ **API Integration** - Connects to your .NET backend
✅ **Age Verification** - 18+ gate for liqueur section with localStorage persistence
✅ **Form Validation** - Client-side validation with error handling
✅ **Loading States** - Visual feedback during API calls
✅ **Notifications** - Toast messages for success/error feedback
✅ **Smooth Animations** - CSS transitions and effects
✅ **Accessibility** - Semantic HTML and ARIA labels
✅ **SEO Friendly** - Proper meta tags and structure

## 🛠 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Notes

### CORS Configuration
The backend is already configured for CORS. If you add a new development server URL, update `Program.cs` in the backend:

```csharp
policy.WithOrigins(
    "http://localhost:3000",
    "http://127.0.0.1:5500",
    "http://localhost:5173",
    "https://localhost:7001",
    "http://your-new-url:8000"  // Add your URL here
)
```

### Age Verification
The liqueur page stores age verification in localStorage for 24 hours. To test:
- Clear localStorage: Open DevTools → Application → Local Storage → Clear
- The age gate will appear again

### Mobile Menu
The mobile menu activates automatically on screens smaller than 768px. Test by:
- Resizing browser window
- Using browser DevTools device emulation
- Viewing on actual mobile device

## 🆘 Troubleshooting

**API calls failing:**
1. Check if backend is running (`dotnet run` in MrCream.API)
2. Verify API URL in `js/api.js`
3. Check browser console for errors
4. Verify CORS is configured correctly

**Styles not loading:**
1. Check file paths are correct
2. Ensure CSS file is in `css/styles.css`
3. Clear browser cache

**Images not showing:**
1. Verify image paths
2. Check images are in `images/` folder
3. Ensure file names match exactly (case-sensitive on Linux servers)

## 📞 Support

For issues or questions, contact: info@mrcream.com

---

**Built with ❤️ for MrCream**
