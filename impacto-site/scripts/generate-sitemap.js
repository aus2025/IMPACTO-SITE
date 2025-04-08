const fs = require('fs');
const path = require('path');
const { parseStringPromise, Builder } = require('xml2js');
const prettier = require('prettier');

async function generateSitemap() {
  console.log('Generating sitemap...');
  
  // Read the sitemap from Next.js output
  const sitemap = fs.readFileSync(path.join(process.cwd(), '.next/server/app/sitemap.xml'), 'utf8');
  
  try {
    // Parse the XML
    const result = await parseStringPromise(sitemap);
    
    // Validate the required structure
    if (!result.urlset || !Array.isArray(result.urlset.url)) {
      throw new Error('Invalid sitemap format');
    }
    
    // Sort URLs by priority (highest first)
    result.urlset.url.sort((a, b) => {
      const priorityA = parseFloat(a.priority) || 0;
      const priorityB = parseFloat(b.priority) || 0;
      return priorityB - priorityA;
    });
    
    // Convert back to XML
    const builder = new Builder();
    let xml = builder.buildObject(result);
    
    // Format and minify the XML
    xml = prettier.format(xml, { parser: 'xml' });
    
    // Add XML declaration if it doesn't exist
    if (!xml.startsWith('<?xml')) {
      xml = '<?xml version="1.0" encoding="UTF-8"?>\n' + xml;
    }
    
    // Write to public directory for static serving
    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), xml);
    
    console.log('Sitemap generated successfully at public/sitemap.xml');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

// Execute
generateSitemap(); 