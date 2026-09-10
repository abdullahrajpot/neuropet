@echo off
echo ========================================
echo  NeuroPet Time Slots Seeder
echo ========================================
echo.
echo This will create sample time slots for the next 30 days
echo (Monday-Friday: 9am-5pm, Saturday: 9am-1pm)
echo.
pause

node scripts\seed-timeslots.js

echo.
pause
