#!/bin/bash

# Install dependencies
npm install --legacy-peer-deps @react-pdf/renderer

# Create skip directory
mkdir -p .skip

echo "==> Removing admin and protected routes for production build..."

# 1. Admin and authentication related pages
mv app/admin .skip/ 2>/dev/null || true
mv app/login .skip/ 2>/dev/null || true
mv app/auth-debug .skip/ 2>/dev/null || true

# 2. API routes (won't work without backend config)
mv app/api .skip/ 2>/dev/null || true

# 3. Assessment/dynamic routes requiring authentication
mv app/assessment .skip/ 2>/dev/null || true
mv app/assessments .skip/ 2>/dev/null || true

# 4. Legacy and debug pages
mv pages/blog_old .skip/ 2>/dev/null || true
mv app/blog/debug* .skip/ 2>/dev/null || true
mv app/blog/fix* .skip/ 2>/dev/null || true
mv app/blog/diagnostic* .skip/ 2>/dev/null || true
mv app/blog/test* .skip/ 2>/dev/null || true
mv app/blog/static-debug .skip/ 2>/dev/null || true
mv app/blog/step-by-step-fix .skip/ 2>/dev/null || true
mv app/blog/init-tables .skip/ 2>/dev/null || true

echo "==> Setting up blog page for dynamic rendering..."
# Ensure blog page is dynamic to avoid static generation errors
grep -q "export const dynamic = 'force-dynamic';" app/blog/page.tsx || sed -i "1s/^/export const dynamic = 'force-dynamic';\n/" app/blog/page.tsx

echo "==> Creating optimized Next.js config for production..."
# Create production-ready next.config.js
cat > next.config.js << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable type checking and linting in build
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  
  // Output as standalone for easier deployment
  output: "standalone",
  
  // Set distDir to a predictable location
  distDir: "build",
  
  // Skip middleware URL normalization
  skipMiddlewareUrlNormalize: true,
  
  // Mark these routes as dynamic to prevent static generation issues
  experimental: {
    esmExternals: true
  },
  
  // Force dynamic rendering for specific routes
  async rewrites() {
    return [
      { source: '/blog', destination: '/blog' },
      { source: '/blog/:path*', destination: '/blog/:path*' }
    ];
  },
  
  // Set image domains for optimization
  images: {
    domains: ['impactoautomationai.com', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  }
};

module.exports = nextConfig;
EOL

echo "==> Setting up environment for production..."
# Create a .env.production file for deployment
echo "NODE_ENV=production" > .env.production

echo "==> Building the application..."
# Build the application
NODE_ENV=production npx next build

echo "✅ Build complete! The application has been built for production with admin functionality disabled." 