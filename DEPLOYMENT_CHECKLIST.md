# MrCream SolidCP Deployment Checklist

Use this checklist to ensure you complete all deployment steps correctly.

## Pre-Deployment

- [ ] Obtain SQL Server connection details from SolidCP
- [ ] Know your domain name
- [ ] Have FTP credentials ready (optional, but recommended)

## Database Setup

- [ ] Create database `MrCreamDb` in SolidCP SQL Server 2019
- [ ] Create database user `mrcream_user` with strong password
- [ ] Grant `db_owner` permissions to the user
- [ ] Note down: Server address, Database name, Username, Password

## Configuration

- [ ] Update `appsettings.Production.json` connection string with SQL Server details
- [ ] Generate secure JWT key (64+ characters)
- [ ] Update `appsettings.Production.json` JWT:Key with generated key
- [ ] Update `appsettings.Production.json` CORS:AllowedOrigins with your domain
- [ ] Verify all configuration changes are saved

## Build & Publish

- [ ] Open command prompt in `MrCream.API` folder
- [ ] Run: `dotnet publish -c Release /p:PublishProfile=SolidCP`
- [ ] Verify files exist in `bin\Release\net9.0\publish\`
- [ ] Confirm `web.config` is present in publish folder
- [ ] Confirm `appsettings.Production.json` is present in publish folder

## Upload Backend (API)

- [ ] Connect to SolidCP via File Manager or FTP
- [ ] Navigate to website root (wwwroot or httpdocs)
- [ ] Create folder named `api`
- [ ] Upload all files from `bin\Release\net9.0\publish\` to `api` folder
- [ ] Verify all files uploaded successfully

## Configure IIS Application

- [ ] In SolidCP Web Sites, create new Application
- [ ] Set Application Name: `api`
- [ ] Set Application Path: `/api`
- [ ] Set .NET CLR Version: **No Managed Code** (important!)
- [ ] Set Managed Pipeline Mode: Integrated
- [ ] Disable 32-bit applications
- [ ] Save and verify application is created

## Upload Frontend

- [ ] Navigate to website root in File Manager/FTP
- [ ] Upload all HTML files (index.html, waterpark.html, yoghurt.html, liqueur.html, quote.html)
- [ ] Upload `css` folder
- [ ] Upload `js` folder
- [ ] Upload `images` folder
- [ ] Verify all files uploaded

## Website Configuration

- [ ] Set `index.html` as default document
- [ ] Move `index.html` to top of default documents list
- [ ] Enable HTTPS/SSL certificate
- [ ] Configure HTTP to HTTPS redirect
- [ ] Save all changes

## Testing

- [ ] Test API health: `https://yourdomain.com/api/health`
  - Should return JSON with "Status": "Healthy"
- [ ] Test API endpoint: `https://yourdomain.com/api/waterpark/info`
- [ ] Test homepage: `https://yourdomain.com`
- [ ] Test Water Park page: `https://yourdomain.com/waterpark.html`
- [ ] Test Yoghurt page: `https://yourdomain.com/yoghurt.html`
- [ ] Test Liqueur page: `https://yourdomain.com/liqueur.html`
- [ ] Test age verification on Liqueur page
- [ ] Open browser DevTools console - check for errors
- [ ] Test on mobile device

## Security Final Checks

- [ ] Verify JWT key is NOT the default value
- [ ] Verify SQL password is strong
- [ ] Verify HTTPS is enforced
- [ ] Verify CORS only allows your domain
- [ ] Test that API is NOT accessible from other domains
- [ ] Verify no sensitive data in error messages

## Post-Deployment

- [ ] Monitor error logs in `api/logs/` folder
- [ ] Test all major features:
  - [ ] Water Park booking form
  - [ ] Yoghurt ordering
  - [ ] Liqueur age verification
  - [ ] Quote request modal
- [ ] Set up monitoring/analytics (optional)
- [ ] Create backup of database (in SolidCP)

## Troubleshooting (If Issues Occur)

If you encounter errors, check:

- [ ] Application Pool is running (SolidCP → Application Pools)
- [ ] .NET 9.0 Runtime is installed (contact hosting provider if not)
- [ ] Connection string is correct in `appsettings.Production.json`
- [ ] `web.config` is present in `/api` folder
- [ ] Error logs in `/api/logs/stdout_*.log`
- [ ] Browser console for JavaScript errors
- [ ] CORS settings match your domain exactly

---

## Quick Commands Reference

### Generate JWT Key (PowerShell)
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

### Publish Backend
```bash
cd C:\Users\obeda\Desktop\MrCream\MrCream.API
dotnet publish -c Release /p:PublishProfile=SolidCP
```

### Test API Locally Before Deploying
```bash
cd C:\Users\obeda\Desktop\MrCream\MrCream.API
$env:ASPNETCORE_ENVIRONMENT="Production"
dotnet run
```

---

## Support Contacts

- **Hosting Provider**: info@loylatyglobal.com
- **SolidCP Support**: Check your hosting provider's support portal

---

## Notes

Add any deployment-specific notes here:

- SQL Server: _______________
- Database: MrCreamDb
- FTP Server: _______________
- Domain: _______________
- Deployment Date: _______________

---

## Status: ⬜ Not Started | 🟡 In Progress | ✅ Completed
