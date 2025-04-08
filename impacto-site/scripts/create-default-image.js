const fs = require('fs');
const path = require('path');

// Function to create a simple HTML-based placeholder image
function createPlaceholderImage() {
  const imageDir = path.join(__dirname, '../public/images/blog');
  
  // Ensure the directory exists
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
    console.log(`Created directory: ${imageDir}`);
  }
  
  // Create a text file placeholder instruction 
  const defaultImagePath = path.join(imageDir, 'default.txt');
  const defaultImageContent = `
This is a placeholder for the default blog image.

Please replace this with an actual image file named "default.jpg".

The recommended dimensions are 1200x630 pixels.
  `;
  
  fs.writeFileSync(defaultImagePath, defaultImageContent);
  console.log(`Created default image placeholder at ${defaultImagePath}`);
  
  // Create numbered placeholder instructions for each blog
  for (let i = 1; i <= 11; i++) {
    const blogImagePath = path.join(imageDir, `blog-${i}.txt`);
    const blogImageContent = `
This is a placeholder for blog-${i}.jpg.

Please replace this with an actual image file with the same name.

The recommended dimensions are 1200x630 pixels.
    `;
    
    fs.writeFileSync(blogImagePath, blogImageContent);
    console.log(`Created blog-${i} image placeholder at ${blogImagePath}`);
  }
}

// Run the function
console.log('Creating placeholder images for blog posts...');
createPlaceholderImage();
console.log('Placeholder creation complete!'); 