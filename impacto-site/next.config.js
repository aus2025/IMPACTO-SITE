/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['impactoautomationai.com'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons', 'lucide-react', 'framer-motion'],
  },
  // Options that were moved out of experimental
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  compress: true,
  poweredByHeader: false,
  eslint: {
    // Ignore ESLint errors during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Explicitly disable static exports for administrative routes
  output: 'standalone',
  // Add more control for static routes
  async redirects() {
    return [
      // Redirect admin pages to themselves as a way to exclude them from static generation
      {
        source: '/admin/:path*',
        destination: '/admin/:path*',
        permanent: false,
        basePath: false,
      },
      // Specific admin reports redirect to bypass prerendering
      {
        source: '/admin/reports/:path*',
        destination: '/admin/reports/:path*',
        permanent: false,
        basePath: false,
      },
      // Redirect API routes as well
      {
        source: '/api/:path*',
        destination: '/api/:path*',
        permanent: false,
        basePath: false,
      },
      // Also exclude problematic blog debug pages
      {
        source: '/blog/static-debug',
        destination: '/blog/static-debug',
        permanent: false,
        basePath: false,
      },
      {
        source: '/blog/fix-query',
        destination: '/blog/fix-query',
        permanent: false,
        basePath: false,
      },
      {
        source: '/blog/step-by-step-fix',
        destination: '/blog/step-by-step-fix',
        permanent: false,
        basePath: false,
      },
    ];
  },
};

module.exports = nextConfig;
