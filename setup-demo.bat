@echo off
echo Setting up React Universal Toast demo site...
echo.

REM Check if git is initialized
if not exist .git (
    echo Initializing git repository...
    git init
    git branch -M main
    echo.
)

REM Check if docs directory exists
if not exist docs (
    echo Error: docs directory not found!
    pause
    exit /b 1
)

echo Current demo files:
dir docs /b
echo.

echo Steps to deploy to GitHub Pages:
echo.
echo 1. Create GitHub repository: react-universal-toast
echo 2. Add remote: git remote add origin https://github.com/deveshlashkari/react-universal-toast.git
echo 3. Commit and push:
echo    git add .
echo    git commit -m "Add demo site and documentation"
echo    git push -u origin main
echo.
echo 4. Enable GitHub Pages:
echo    - Go to repository Settings ^> Pages
echo    - Source: GitHub Actions
echo    - The workflow will auto-deploy from docs/ folder
echo.
echo 5. Your demo will be live at:
echo    https://deveshlashkari.github.io/react-universal-toast
echo.

REM Check if http-server is available for local testing
where http-server >nul 2>&1
if %errorlevel% == 0 (
    echo To test locally, run: http-server docs -p 8080
) else (
    echo To test locally, install http-server: npm install -g http-server
    echo Then run: http-server docs -p 8080
)
echo.

echo Alternatively, open docs/index.html directly in your browser.
echo.
pause
