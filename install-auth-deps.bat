@echo off
echo Installing authentication dependencies...
echo.
npm install bcryptjs jose nanoid
npm install -D @types/bcryptjs
echo.
echo Dependencies installed successfully!
echo.
echo Next steps:
echo 1. Create admin user (see AUTH-SYSTEM-SETUP.md)
echo 2. Test login at http://localhost:3000/admin/login
echo 3. Test client registration at http://localhost:3000/client/register
echo.
pause
