@echo off
echo ================================================
echo NeuroPet - Create Admin User
echo ================================================
echo.
echo This script will create an admin user account.
echo Make sure the dev server is running (npm run dev)
echo.
pause

set /p EMAIL="Enter admin email: "
set /p PASSWORD="Enter admin password (min 8 chars): "
set /p NAME="Enter admin name: "

echo.
echo Creating admin user...
echo Email: %EMAIL%
echo Name: %NAME%
echo.

curl -X POST http://localhost:3000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -H "X-Admin-Key: create-admin-secret-key-2024" ^
  -d "{\"email\":\"%EMAIL%\",\"password\":\"%PASSWORD%\",\"name\":\"%NAME%\",\"role\":\"admin\"}"

echo.
echo.
echo ================================================
echo If successful, you can now login at:
echo http://localhost:3000/admin/login
echo ================================================
echo.
pause
