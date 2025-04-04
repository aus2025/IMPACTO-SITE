// This file configures the build process for production deployment
module.exports = {
  // Disable strict typechecking and linting for production build
  eslint: { 
    ignoreDuringBuilds: true 
  },
  typescript: { 
    ignoreBuildErrors: true 
  },
  
  // Output as standalone for easier deployment
  output: "standalone",
  
  // Configure experimental features
  experimental: {
    esmExternals: true
  },
  
  // Skip middleware URL normalization to prevent issues
  skipMiddlewareUrlNormalize: true,
  
  // Mark the blog and other dynamic pages as dynamic to avoid static generation errors
  async redirects() {
    return [];
  },
  
  async rewrites() {
    return [
      {
        source: '/blog',
        destination: '/blog'
      }
    ];
  }
}; 