@echo off
cd impacto-site
rmdir /s /q node_modules
del package-lock.json
npm install --legacy-peer-deps
npm install @supabase/ssr@0.6.1 --legacy-peer-deps --save
npm run dev 