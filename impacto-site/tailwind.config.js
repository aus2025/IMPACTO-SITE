/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#374151', // text-gray-700
            h1: {
              color: '#1e3a8a', // text-blue-900
            },
            h2: {
              color: '#1e3a8a', // text-blue-900
            },
            h3: {
              color: '#1e3a8a', // text-blue-900
            },
            h4: {
              color: '#1f2937', // text-gray-800
            },
            strong: {
              color: '#1f2937', // text-gray-800
            },
            a: {
              color: '#2563eb', // text-blue-600
              '&:hover': {
                color: '#1d4ed8', // text-blue-700
              },
            },
            blockquote: {
              color: '#4b5563', // text-gray-600
            },
            code: {
              color: '#1f2937', // text-gray-800
            },
            figcaption: {
              color: '#6b7280', // text-gray-500
            },
            li: {
              color: '#374151', // text-gray-700
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  // Additional optimization flags
  experimental: {
    optimizeUniversalDefaults: true,
  },
}; 