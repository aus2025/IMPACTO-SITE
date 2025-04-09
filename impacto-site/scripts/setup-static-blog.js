const fs = require('fs');
const path = require('path');

// Source and destination directories
const sourceDir = path.join(__dirname, '../../Blog texts');
const destDir = path.join(__dirname, '../public/blog-content');

// Create the destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log(`Created directory: ${destDir}`);
}

// Create the blog images directory if it doesn't exist
const blogImagesDir = path.join(__dirname, '../public/images/blog');
if (!fs.existsSync(blogImagesDir)) {
  fs.mkdirSync(blogImagesDir, { recursive: true });
  console.log(`Created directory: ${blogImagesDir}`);
}

// Create a default image for blog posts
const createDefaultImage = () => {
  // Create a text file explaining how to add images
  const readmePath = path.join(blogImagesDir, 'README.txt');
  const readmeContent = `
Blog Images Directory

To add images for blog posts:
1. Place image files named after the blog post number:
   - blog-1.jpg for the first blog post
   - blog-2.jpg for the second blog post
   etc.

2. Or simply use the first part of the blog slug:
   - For blog-1-autonomous-ai-agents.md, use blog-1.jpg
   - For blog-2-orchestration.md, use blog-2.jpg

The system will automatically use these images when displaying blog posts.
`;

  fs.writeFileSync(readmePath, readmeContent);
  console.log(`Created README at ${readmePath}`);
};

// Copy blog posts from source to destination
const copyBlogPosts = () => {
  try {
    // Read all files from the source directory
    const files = fs.readdirSync(sourceDir);
    
    // Filter markdown files
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    // Copy each file
    markdownFiles.forEach(file => {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file);
      
      // Copy the file
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied ${sourcePath} to ${destPath}`);
    });
    
    console.log(`Successfully copied ${markdownFiles.length} blog posts`);
  } catch (error) {
    console.error('Error copying blog posts:', error);
  }
};

// Main execution
console.log('Setting up static blog...');
copyBlogPosts();
createDefaultImage();
console.log('Static blog setup complete!'); 