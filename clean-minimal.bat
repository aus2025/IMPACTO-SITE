@echo off
echo Cleaning project folders...
rd /s /q node_modules
rd /s /q .next
del package-lock.json

echo Installing fresh dependencies...
call npm install
if %errorlevel% neq 0 (
  echo Error during npm install! Exiting...
  pause
  exit /b %errorlevel%
)

echo Skipping lint and type checks...

echo Running build with type checking disabled...
call npm run build -- --no-lint --no-type-check
if %errorlevel% neq 0 (
  echo Error during build! Exiting...
  pause
  exit /b %errorlevel%
)

echo ✅ Project cleaned and rebuilt!
pause 