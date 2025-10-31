# MrCream - SolidCP Deployment Guide

This guide will walk you through deploying the MrCream application to SolidCP hosting.

## Prerequisites

- SolidCP account (Gold hosting plan or higher)
- SQL Server 2019 access
- .NET 9.0 runtime installed on the server (check with your hosting provider)
- Your domain name

## Deployment Architecture

```
Your Domain (e.g., yourdomain.com)
├── / (Root - Frontend files)
│   ├── index.html
│   ├── waterpark.html
│   ├── yoghurt.html
│   ├── liqueur.html
│   ├── quote.html
│   ├── css/
│   ├── js/
│   └── images/
└── /api (IIS Application - Backend API)
    └── [Published .NET files]
```

---

## Step 1: Create SQL Server Database

1. Log into your SolidCP control panel
2. Navigate to **Databases** → **SQL Server 2019**
3. Click **Create Database**
4. Enter database name: `MrCreamDb`
5. Click **Create**
6. Create a database user:
   - Username: `mrcream_user`
   - Password: [Choose a strong password]
   - Grant permissions: `db_owner` role
7. **Save your database credentials:**
   - Server: [provided by SolidCP]
   - Database: `MrCreamDb`
   - Username: `mrcream_user`
   - Password: [your password]

---

## Step 2: Configure Production Settings

### 2.1 Update Database Connection String

1. Open `MrCream.API/appsettings.Production.json`
2. Update the connection string with your SQL Server details:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SQL_SERVER_ADDRESS;Database=MrCreamDb;User Id=mrcream_user;Password=YOUR_PASSWORD;TrustServerCertificate=True;Encrypt=True;"
  }
}
```

### 2.2 Generate JWT Secret Key

You need a secure random key (at least 32 characters). Generate one using PowerShell:

```powershell
# Run this in PowerShell to generate a secure random key
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

Update `appsettings.Production.json`:

```json
{
  "Jwt": {
    "Key": "YOUR_GENERATED_SECURE_KEY_HERE",
    "Issuer": "MrCreamAPI",
    "Audience": "MrCreamClients"
  }
}
```

### 2.3 Update CORS Allowed Origins

Update `appsettings.Production.json` with your actual domain:

```json
{
  "Cors": {
    "AllowedOrigins": [
      "https://yourdomain.com",
      "https://www.yourdomain.com",
      "http://yourdomain.com",
      "http://www.yourdomain.com"
    ]
  }
}
```

---

## Step 3: Publish the Backend API

### 3.1 Build and Publish

Open Command Prompt or PowerShell in the project directory:

```bash
cd C:\Users\obeda\Desktop\MrCream\MrCream.API

# Publish using the SolidCP profile
dotnet publish -c Release /p:PublishProfile=SolidCP

# Or manually:
dotnet publish -c Release -r win-x64 --self-contained false -o bin\Release\net9.0\publish
```

### 3.2 Verify Published Files

Check that `bin\Release\net9.0\publish` contains:
- `MrCream.API.dll`
- `appsettings.json`
- `appsettings.Production.json`
- `web.config`
- Other DLL dependencies

---

## Step 4: Upload Backend to SolidCP

### Option A: Using File Manager (Recommended for Small Deployments)

1. In SolidCP, go to **File Manager**
2. Navigate to your website root (usually `wwwroot` or `httpdocs`)
3. Create a new folder: `api`
4. Enter the `api` folder
5. Upload all files from `bin\Release\net9.0\publish\`
6. Wait for upload to complete

### Option B: Using FTP (Recommended for Faster Upload)

1. In SolidCP, go to **FTP Accounts**
2. Create or use existing FTP account
3. Note FTP credentials:
   - Server: [provided by SolidCP]
   - Username: [your FTP username]
   - Password: [your FTP password]
4. Use an FTP client (FileZilla, WinSCP):
   - Connect to your FTP server
   - Navigate to `wwwroot/api` (create `api` folder if it doesn't exist)
   - Upload all files from `bin\Release\net9.0\publish\`

---

## Step 5: Configure IIS Application in SolidCP

1. In SolidCP, go to **Web Sites**
2. Click on your website
3. Go to **Applications** tab
4. Click **Create Application**
5. Fill in details:
   - **Application Name**: `api`
   - **Application Path**: `/api`
   - **Physical Path**: `C:\HostingSpaces\[your-space]\wwwroot\api` (or wherever your api folder is)
   - **Enable 32-bit Applications**: No
   - **.NET CLR Version**: No Managed Code (important for .NET Core!)
6. Click **Create**

---

## Step 6: Configure Application Pool

1. In **Web Sites**, click your website
2. Go to **Application Pools** tab
3. Find the pool for your `/api` application
4. Click **Edit**
5. Set the following:
   - **.NET CLR Version**: No Managed Code
   - **Managed Pipeline Mode**: Integrated
   - **Enable 32-bit Applications**: False
6. Click **Save**

---

## Step 7: Upload Frontend Files

1. Using File Manager or FTP, navigate to your website root (`wwwroot`)
2. Upload the following files/folders from `frontend-new`:
   - `index.html`
   - `waterpark.html`
   - `yoghurt.html`
   - `liqueur.html`
   - `quote.html`
   - `css/` folder
   - `js/` folder
   - `images/` folder

**Important**: The API configuration in `js/api.js` will automatically detect the production environment and use the correct API URL.

---

## Step 8: Set Default Document

1. In SolidCP **Web Sites**, click your website
2. Go to **Default Documents** tab
3. Ensure `index.html` is in the list and near the top
4. If not, add it and move it to the top

---

## Step 9: Enable HTTPS/SSL

1. In SolidCP, go to **Web Sites**
2. Click your website
3. Go to **SSL** tab
4. Install SSL certificate (Let's Encrypt, purchased, or SolidCP provided)
5. Enable HTTPS redirect:
   - Go to **HTTP Redirect** or **URL Rewrite**
   - Add rule to redirect HTTP to HTTPS

---

## Step 10: Initialize Database

The database will be automatically created when you first access the API. To manually initialize:

1. Access your API health endpoint: `https://yourdomain.com/api/health`
2. You should see:
   ```json
   {
     "Status": "Healthy",
     "Timestamp": "2025-...",
     "Message": "MrCream API is running successfully!"
   }
   ```

---

## Step 11: Test the Deployment

### Test API Endpoints

1. **Health Check**: `https://yourdomain.com/api/health`
2. **Swagger UI** (if enabled): `https://yourdomain.com/api/swagger`
3. **Water Park**: `https://yourdomain.com/api/waterpark/info`
4. **Yoghurt**: `https://yourdomain.com/api/yoghurt/flavours`

### Test Frontend

1. Visit `https://yourdomain.com`
2. Navigate to each section:
   - Home page
   - Water Park
   - Yoghurt
   - Liqueur (test age verification)
3. Check browser console for any errors

---

## Troubleshooting

### Issue: "500 Internal Server Error"

**Solution**:
1. Check that `.NET 9.0 runtime` is installed on the server
2. Contact your hosting provider to install it
3. Verify `web.config` has correct settings
4. Check error logs in SolidCP File Manager: `api/logs/stdout_*.log`

### Issue: "CORS Error in Browser Console"

**Solution**:
1. Verify `appsettings.Production.json` has your domain in `Cors:AllowedOrigins`
2. Ensure both `http://` and `https://` versions are listed
3. Restart the application pool in SolidCP

### Issue: "Database Connection Failed"

**Solution**:
1. Verify SQL Server connection string in `appsettings.Production.json`
2. Check that the database user has proper permissions
3. Test connection using SQL Server Management Studio or SolidCP SQL query tool
4. Ensure `TrustServerCertificate=True` is in the connection string

### Issue: "API Returns 404 Not Found"

**Solution**:
1. Verify the IIS Application is created correctly at `/api` path
2. Check that Application Pool is set to "No Managed Code"
3. Ensure `web.config` is in the `api` folder
4. Restart the application pool

### Issue: "Frontend Shows But API Calls Fail"

**Solution**:
1. Check browser console for the exact error
2. Verify API URL in browser DevTools Network tab
3. Ensure `/api` path is accessible: `https://yourdomain.com/api/health`
4. Check that HTTPS is properly configured

---

## Security Checklist

Before going live, ensure:

- [ ] JWT secret key is strong and unique (not the default)
- [ ] SQL Server password is strong
- [ ] `appsettings.Production.json` is properly configured
- [ ] HTTPS/SSL is enabled and working
- [ ] Database user has minimal required permissions
- [ ] Error logging is disabled or configured to not expose sensitive info
- [ ] CORS is configured only for your domain (not wildcard)
- [ ] Age verification is working for Liqueur section

---

## Maintenance

### Updating the Application

To deploy updates:

1. Make your code changes
2. Re-publish: `dotnet publish -c Release /p:PublishProfile=SolidCP`
3. Use FTP or File Manager to upload only changed files to `/api`
4. Restart the application pool in SolidCP

### Database Migrations

If you add new database features using Entity Framework:

```bash
# Create migration
dotnet ef migrations add MigrationName --project MrCream.Infrastructure

# Update production database (via command line on server or local with production connection string)
dotnet ef database update --project MrCream.API
```

---

## Environment Variables (Alternative to appsettings.json)

For better security, you can store sensitive data as environment variables in SolidCP:

1. Go to **Web Sites** → Your site → **Environment Variables**
2. Add:
   - `ConnectionStrings__DefaultConnection` = [your connection string]
   - `Jwt__Key` = [your JWT key]

This overrides `appsettings.Production.json` values.

---

## Support

- **SolidCP Documentation**: https://solidcp.com/documentation
- **ASP.NET Core Hosting**: https://docs.microsoft.com/aspnet/core/host-and-deploy/iis/
- **Your Hosting Provider**: info@loylatyglobal.com

---

## Quick Reference: File Locations

**Local Development**:
- Backend: `C:\Users\obeda\Desktop\MrCream\MrCream.API\`
- Frontend: `C:\Users\obeda\Desktop\MrCream\frontend-new\`
- Published Backend: `C:\Users\obeda\Desktop\MrCream\MrCream.API\bin\Release\net9.0\publish\`

**SolidCP Production**:
- Website Root: `wwwroot\` or `httpdocs\`
- Frontend: `wwwroot\` (index.html, css, js, images)
- Backend API: `wwwroot\api\` (published .NET files)

---

## Done!

Your MrCream application should now be live at your domain. If you encounter any issues, refer to the troubleshooting section or contact your hosting provider.
