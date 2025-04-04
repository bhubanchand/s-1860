
import { BlogPost } from "../data/posts";

/**
 * Generates XML sitemap content for all blog posts and static pages
 */
export function generateSitemap(blogPosts: BlogPost[]): string {
  const baseUrl = "https://tonight.blog";
  const logoUrl = "https://res.cloudinary.com/dyzamqtdw/image/upload/v1743554489/logo_llf3w4.svg";
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
  // Static pages with their details
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/trending", priority: "0.9", changefreq: "daily" },
    { url: "/movies", priority: "0.8", changefreq: "weekly" },
    { url: "/team", priority: "0.7", changefreq: "monthly" },
    { url: "/contact", priority: "0.7", changefreq: "monthly" },
    { url: "/privacy-policy", priority: "0.5", changefreq: "yearly" },
    { url: "/terms-of-service", priority: "0.5", changefreq: "yearly" },
  ];

  // Get all categories for category pages
  const categories = [...new Set(blogPosts.map(post => post.category))];
  
  // Start XML with proper declaration
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  
  // Add static pages
  staticPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '    <image:image>\n';
    xml += `      <image:loc>${logoUrl}</image:loc>\n`;
    xml += `      <image:title>Tonight Blog</image:title>\n`;
    xml += '    </image:image>\n';
    xml += '  </url>\n';
  });
  
  // Add category pages
  categories.forEach(category => {
    if (!category) return; // Skip if category is undefined
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/category/${category.toLowerCase()}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += '    <image:image>\n';
    xml += `      <image:loc>${logoUrl}</image:loc>\n`;
    xml += `      <image:title>Tonight Blog - ${category} Category</image:title>\n`;
    xml += '    </image:image>\n';
    xml += '  </url>\n';
  });
  
  // Add blog posts
  blogPosts.forEach(post => {
    if (!post.slug) return; // Skip if slug is missing
    
    const postDate = new Date(post.createdAt).toISOString().split('T')[0];
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/post/${post.slug}</loc>\n`;
    xml += `    <lastmod>${postDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>${post.featured ? '0.8' : '0.7'}</priority>\n`;
    // Add image information for Google Image Search
    xml += '    <image:image>\n';
    // Use post.image for cover image if it exists, fallback to logo
    xml += `      <image:loc>${post.image || logoUrl}</image:loc>\n`;
    // Escape special characters in title
    const safeTitle = post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
    xml += `      <image:title>${safeTitle}</image:title>\n`;
    xml += '    </image:image>\n';
    xml += '  </url>\n';
  });
  
  // Close XML
  xml += '</urlset>';
  
  return xml;
}

/**
 * Create a robots.txt file content with improved directives
 */
export function generateRobotsTxt(): string {
  return `
User-agent: *
Allow: /

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

# Disallow certain patterns
User-agent: *
Disallow: /api/
Disallow: */undefined
Disallow: */undefined/*
Disallow: /undefined
Disallow: /undefined/*

# Sitemap
Sitemap: https://tonight.blog/sitemap.xml

# Crawl delay for bots (in seconds)
Crawl-delay: 1

# Explicitly allow important pages
User-agent: *
Allow: /post/
Allow: /category/
Allow: /trending
Allow: /movies
Allow: /team
Allow: /contact
Allow: /privacy-policy
Allow: /terms-of-service
`.trim();
}
