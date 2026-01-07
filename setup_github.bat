@echo off
echo ============================================
echo Initializing Git for 3rdEyeVisualz
echo ============================================
echo.

cd "C:\Repos\3rdEyeVisualz"

echo Initializing git repository...
git init

echo.
echo Adding all files (respecting .gitignore)...
git add .

echo.
echo Creating initial commit...
git commit -m "Initial commit: 3rdEyeVisualz photography portfolio website"

echo.
echo ============================================
echo Git initialized successfully!
echo ============================================
echo.
echo Next steps:
echo 1. Create a new repository on GitHub named "3rdeyevisualz"
echo 2. Run these commands (replace YOUR-USERNAME):
echo.
echo    git branch -M main
echo    git remote add origin https://github.com/YOUR-USERNAME/3rdeyevisualz.git
echo    git push -u origin main
echo.
echo Or use GitHub Desktop to publish the repository.
echo.
pause
