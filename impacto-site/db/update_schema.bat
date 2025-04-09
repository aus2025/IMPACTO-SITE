@echo off
echo Running database schema updates...

:: Set environment variables (replace these with your actual values)
:: You can also set these permanently in your environment
set NNEXT_PUBLIC_SUPABASE_URL=https://akyivwuupputmuehngvs.supabase.co
set NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFreWl2d3V1cHB1dG11ZWhuZ3ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MDI1NzcsImV4cCI6MjA1ODI3ODU3N30.K5E5J5497Mk0GQYk-XNjmXuUeIkTovSY-mumIz_7AIQ
:: Install dependencies if needed
echo Checking for required packages...
cd ..
call npm install @supabase/supabase-js --no-save

:: Run the script
echo Executing schema update script...
node db/apply_schema_updates.js

echo.
echo Schema update complete.
pause 