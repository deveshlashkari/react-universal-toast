@echo off
setlocal enabledelayedexpansion

REM Release script for react-universal-toast (Windows)
REM Usage: release.bat [patch|minor|major]

REM Default to patch if no argument provided
set RELEASE_TYPE=%1
if "%RELEASE_TYPE%"=="" set RELEASE_TYPE=patch

echo 🚀 Starting release process...
echo.

REM Check if working directory is clean
git status --porcelain > nul 2>&1
if !errorlevel! neq 0 (
    echo ❌ Working directory is not clean. Please commit or stash changes.
    pause
    exit /b 1
)

REM Check current branch
for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
if not "%CURRENT_BRANCH%"=="main" (
    echo ❌ Please switch to main branch before releasing.
    pause
    exit /b 1
)

REM Pull latest changes
echo 📥 Pulling latest changes...
git pull origin %CURRENT_BRANCH%
if !errorlevel! neq 0 (
    echo ❌ Failed to pull latest changes.
    pause
    exit /b 1
)

REM Run tests
echo 🧪 Running tests...
npm test
if !errorlevel! neq 0 (
    echo ❌ Tests failed.
    pause
    exit /b 1
)

REM Build the project
echo 🔨 Building project...
npm run build
if !errorlevel! neq 0 (
    echo ❌ Build failed.
    pause
    exit /b 1
)

REM Bump version
echo 📈 Bumping version (%RELEASE_TYPE%)...
for /f "tokens=*" %%i in ('npm version %RELEASE_TYPE% --no-git-tag-version') do set NEW_VERSION=%%i
echo ✅ New version: !NEW_VERSION!

REM Commit version bump
git add package.json package-lock.json
git commit -m "chore: bump version to !NEW_VERSION!"
if !errorlevel! neq 0 (
    echo ❌ Failed to commit version bump.
    pause
    exit /b 1
)

REM Create and push tag
echo 🏷️ Creating and pushing tag...
git tag !NEW_VERSION!
git push origin %CURRENT_BRANCH%
git push origin !NEW_VERSION!

if !errorlevel! equ 0 (
    echo.
    echo 🎉 Release !NEW_VERSION! initiated!
    echo ✅ GitHub Actions will automatically publish to npm.
    echo 📦 Check the Actions tab on GitHub for progress.
) else (
    echo ❌ Failed to push tag.
)

echo.
pause
