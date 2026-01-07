@echo off
echo ========================================
echo 3rdEyeVisualz + Notifications API
echo Quick Start Script
echo ========================================
echo.

REM Check if API is already running
curl -s http://localhost:8000/health >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Notifications API is already running on port 8000
) else (
    echo ⚠️  Notifications API is NOT running
    echo.
    echo To start the API, open a NEW terminal and run:
    echo    cd "C:\Repos\Notifications API"
    echo    venv\Scripts\activate
    echo    uvicorn app.main:app --reload
    echo.
    echo Then open ANOTHER terminal for Celery worker:
    echo    cd "C:\Repos\Notifications API"
    echo    venv\Scripts\activate
    echo    celery -A app.tasks.celery_app worker --loglevel=info
    echo.
    pause
)

echo.
echo ========================================
echo Starting 3rdEyeVisualz Website...
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)

echo Starting website on http://localhost:3000
echo.
echo 📧 Make sure you've updated BUSINESS_EMAIL in:
echo    assets\js\api-integration.js
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start
