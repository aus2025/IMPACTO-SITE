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

echo Skipping lint checks...

echo Running audit...
call npm dedupe
call npm audit

echo Running type check...
call npx tsc --noEmit
if %errorlevel% neq 0 (
  echo Error during type check! Exiting...
  pause
  exit /b %errorlevel%
)

echo Running production build...
call npm run build
if %errorlevel% neq 0 (
  echo Error during build! Exiting...
  pause
  exit /b %errorlevel%
)

echo ✅ Project cleaned and verified!
pause 