@echo off
echo.
echo ========================================
echo   Installing Email Dependencies
echo ========================================
echo.

echo Installing Resend package...
call npm install resend

echo.
echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Sign up at https://resend.com
echo 2. Get your API key from dashboard
echo 3. Add RESEND_API_KEY to .env.local
echo 4. Test emails by submitting a form
echo.
echo For detailed setup instructions, see:
echo EMAIL-SETUP-GUIDE.md
echo.
pause
