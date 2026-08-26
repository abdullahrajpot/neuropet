@echo off
echo ================================================
echo NeuroPet - Installing Required Dependencies
echo ================================================
echo.

echo Installing authentication dependencies...
call npm install bcryptjs jose nanoid

echo.
echo Installing TypeScript types...
call npm install -D @types/bcryptjs

echo.
echo ================================================
echo Installation Complete!
echo ================================================
echo.
echo Next steps:
echo 1. Start dev server: npm run dev
echo 2. Create admin user (see AUTH-SYSTEM-SETUP.md)
echo 3. Test the system
echo.
pause
