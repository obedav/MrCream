# Fix Database Access Error

## ❌ Error Received
```
Access denied for user 'mrcreaml_Blessing'@'localhost' to database 'mrcreaml_mrcream_db'
```

## ✅ Solution: Assign User to Database

The user exists, but it's **not assigned to the database**. Follow these steps:

### Step 1: Log into Syskay cPanel
1. Go to your Syskay hosting cPanel
2. Scroll down to the **Databases** section

### Step 2: Find "MySQL Databases"
1. Click on **MySQL Databases**
2. Scroll down to the section: **"Add User To Database"**

### Step 3: Assign User to Database
1. In the **"Add User To Database"** section:
   - **User:** Select `mrcreaml_Blessing` from the dropdown
   - **Database:** Select `mrcreaml_mrcream_db` from the dropdown
2. Click **"Add"** button

### Step 4: Grant Privileges
1. You'll see a page titled **"Manage User Privileges"**
2. **Check the box:** **"ALL PRIVILEGES"** (at the top)
   - This will automatically check all individual privileges
3. Click **"Make Changes"** button at the bottom

### Step 5: Confirmation
You should see a success message:
```
User mrcreaml_Blessing was added to the database mrcreaml_mrcream_db
```

### Step 6: Test Again
1. Go back to: `https://yourdomain.com/api/test-db-connection.php`
2. Refresh the page
3. You should now see:
   ```json
   {
       "overall_status": "SUCCESS",
       "message": "✅ Database is properly configured and ready to use!"
   }
   ```

## 🎯 What You're Looking For

In the **MySQL Databases** page, you should see:

### Current Databases
- `mrcreaml_mrcream_db` ✅

### Current Users
- `mrcreaml_Blessing` ✅

### Users Assigned to Database
This section might be **empty** or not show your user. After Step 3, you should see:
- Database: `mrcreaml_mrcream_db`
- Privileged Users: `mrcreaml_Blessing` (ALL PRIVILEGES)

## 🆘 Alternative: Create a New User

If assigning doesn't work, you can create a brand new user:

### In MySQL Databases:
1. Scroll to **"Add New User"** section
2. Username: `mrcream_api` (or any name)
3. Password: Generate a strong password
4. Click **"Create User"**
5. Then follow Steps 3-4 above to assign and grant privileges
6. Update `api-php/config.php` with the new username and password

## 📞 Still Having Issues?

Contact **Syskay Support** and tell them:
> "I need to grant ALL PRIVILEGES to database user 'mrcreaml_Blessing' for database 'mrcreaml_mrcream_db'. The user and database exist, but the user cannot access the database."

## ✅ After It Works

Once you see `"overall_status": "SUCCESS"`:
1. ✅ Delete `test-db-connection.php` (security)
2. ✅ Import `schema.sql` in phpMyAdmin
3. ✅ Your API will be ready to go!
