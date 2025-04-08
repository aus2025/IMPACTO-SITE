const fs = require('fs');
const path = require('path');

// Blog post information for image generation
const blogPosts = [
  {
    number: 1,
    title: "The Rise of Autonomous AI Agents",
    subtitle: "Beyond Recommendation Engines",
    primaryColor: "#1e40af",
    secondaryColor: "#3b82f6"
  },
  {
    number: 2,
    title: "Orchestration",
    subtitle: "The Secret Sauce of Business Hyperautomation",
    primaryColor: "#1e3a8a", 
    secondaryColor: "#3b82f6"
  },
  {
    number: 3,
    title: "Embedded AI",
    subtitle: "The Era of \"AI Inside\" Has Arrived",
    primaryColor: "#1e3a8a",
    secondaryColor: "#2563eb"
  },
  {
    number: 4,
    title: "Data-Centric AI",
    subtitle: "Taming the Information Flood",
    primaryColor: "#166534",
    secondaryColor: "#16a34a"
  },
  {
    number: 5,
    title: "Responsible AI",
    subtitle: "Balancing Innovation and Regulation",
    primaryColor: "#7c2d12",
    secondaryColor: "#ea580c"
  },
  {
    number: 6,
    title: "Workforce Augmentation",
    subtitle: "Humans and AI, Side by Side",
    primaryColor: "#4a044e",
    secondaryColor: "#a855f7"
  },
  {
    number: 7,
    title: "Implementing Autonomous AI Agents",
    subtitle: "From Concept to Reality",
    primaryColor: "#1e3a8a",
    secondaryColor: "#3b82f6"
  },
  {
    number: 8,
    title: "Hyperautomation",
    subtitle: "Beyond Simple Process Automation",
    primaryColor: "#9f1239",
    secondaryColor: "#ec4899"
  },
  {
    number: 9,
    title: "Embedded AI Strategy",
    subtitle: "Maximizing \"Out-of-the-Box\" Intelligence",
    primaryColor: "#0f766e",
    secondaryColor: "#14b8a6"
  },
  {
    number: 10,
    title: "Building Data-Centric AI Systems",
    subtitle: "Implementation Strategies",
    primaryColor: "#166534",
    secondaryColor: "#16a34a"
  },
  {
    number: 11,
    title: "AI and Automation in 2025",
    subtitle: "From Trends to Transformation",
    primaryColor: "#1e3a8a",
    secondaryColor: "#3b82f6"
  }
];

// Generate a simple SVG for each blog post
function generateBlogSVG(blogInfo) {
  const {number, title, subtitle, primaryColor, secondaryColor} = blogInfo;
  
  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="100%" height="100%" fill="${primaryColor}"/>
  
  <!-- Gradient overlay -->
  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
    <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:0.7" />
  </linearGradient>
  <rect width="100%" height="100%" fill="url(#grad)"/>
  
  <!-- Decorative elements -->
  <circle cx="${200 + Math.random() * 200}" cy="${150 + Math.random() * 200}" r="${70 + Math.random() * 50}" fill="white" opacity="0.1"/>
  <circle cx="${600 + Math.random() * 300}" cy="${150 + Math.random() * 200}" r="${70 + Math.random() * 50}" fill="white" opacity="0.1"/>
  
  <!-- Number indicator -->
  <circle cx="150" cy="150" r="80" fill="white" opacity="0.2"/>
  <text x="150" y="180" font-family="Arial" font-size="100" font-weight="bold" fill="white" text-anchor="middle">${number}</text>
  
  <!-- Text background for better readability -->
  <rect x="150" y="350" width="900" height="150" rx="10" fill="black" opacity="0.3"/>
  
  <!-- Text -->
  <text x="50%" y="400" font-family="Arial" font-size="48" font-weight="bold" fill="white" text-anchor="middle" stroke="black" stroke-width="1">${title}</text>
  <text x="50%" y="460" font-family="Arial" font-size="28" fill="white" opacity="0.9" text-anchor="middle" stroke="black" stroke-width="0.5">${subtitle}</text>
</svg>`;
}

// Write SVGs to files
function createBlogImages() {
  const imagesDir = path.join(__dirname, '../public/images/blog');
  
  // Ensure the directory exists
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log(`Created directory: ${imagesDir}`);
  }
  
  // Generate each SVG file
  blogPosts.forEach(blog => {
    const svgContent = generateBlogSVG(blog);
    const filePath = path.join(imagesDir, `blog-${blog.number}.svg`);
    
    fs.writeFileSync(filePath, svgContent);
    console.log(`Created SVG for blog-${blog.number} at ${filePath}`);
  });
}

// Run the function
console.log('Generating blog images...');
createBlogImages();
console.log('Blog image generation complete!'); 