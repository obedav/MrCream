@echo off
echo ====================================
echo MrCream - SolidCP Publishing Script
echo ====================================
echo.

cd /d "%~dp0MrCream.API"

echo [1/4] Cleaning previous builds...
if exist "bin\Release\net9.0\publish" (
    rmdir /s /q "bin\Release\net9.0\publish"
)

echo [2/4] Restoring dependencies...
dotnet restore

echo [3/4] Publishing application...
dotnet publish -c Release --output "bin\Release\net9.0\publish" --runtime win-x64 --self-contained false

echo [4/4] Verifying output...
if exist "bin\Release\net9.0\publish\MrCream.API.dll" (
    echo.
    echo ====================================
    echo SUCCESS! Application published
    echo ====================================
    echo.
    echo Published files location:
    echo %cd%\bin\Release\net9.0\publish
    echo.
    echo Next Steps:
    echo 1. Upload all files from the publish folder to your SolidCP /api directory
    echo 2. Follow the SOLIDCP_DEPLOYMENT_GUIDE.md for complete instructions
    echo.
) else (
    echo.
    echo ====================================
    echo ERROR! Publishing failed
    echo ====================================
    echo.
    echo Please check the error messages above
)

echo.
pause
