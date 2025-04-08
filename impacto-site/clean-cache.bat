@echo off
echo Stopping any running processes...
taskkill /f /im node.exe 2>nul

echo Cleaning Next.js cache...
rd /s /q .next 2>nul
mkdir .next
echo {}> .next\.nojekyll

echo Starting Next.js in development mode...
npm run dev 