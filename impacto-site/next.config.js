/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React StrictMode
  reactStrictMode: true,
  
  // Fixes for Windows case sensitivity issues
  webpack: (config, { isServer, dev }) => {
    // Add case-sensitive paths plugin when in development
    if (dev && !isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
      
      // Add Windows path normalization to prevent EINVAL errors
      config.watchOptions = {
        ...(config.watchOptions || {}),
        followSymlinks: false,
        ignored: ['**/node_modules/**', '**/admin-backup/**', '**/.next/**'],
        poll: 1000, // Check for changes every second
      };
    }
    
    // Exclude admin-backup directory from builds
    config.watchOptions = config.watchOptions || {};
    config.watchOptions.ignored = Array.isArray(config.watchOptions.ignored) 
      ? [...config.watchOptions.ignored, '**/admin-backup/**'] 
      : ['**/node_modules/**', '**/admin-backup/**', '**/.next/**'];

    return config;
  },
  
  // Additional configurations
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.impactoautomation.com.au',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Apply trailing slash to all routes
  trailingSlash: false,
  
  // Experimental features
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
    // Enable ignoring TypeScript errors during builds
    ignoreBuildErrors: true,
  },
  // Output configuration
  output: 'standalone',
  // Add more control for static routes
  async redirects() {
    return [
      // Redirect API routes
      {
        source: '/api/:path*',
        destination: '/api/:path*',
        permanent: false,
        basePath: false,
      },
      // Redirect any case studies URL to the blog page
      {
        source: '/case-studies/:slug*',
        destination: '/blog',
        permanent: true,
        basePath: false,
      }
    ];
  },
};

module.exports = nextConfig;
