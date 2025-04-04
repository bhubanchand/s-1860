import { useEffect } from 'react';
import { useBlogStore } from '../data/posts';
import { generateSitemap, generateRobotsTxt } from '../utils/sitemapGenerator';

/**
 * SEOManager handles dynamic sitemap generation and SEO optimizations
 * It must be included in the App.tsx to work globally
 */
const SEOManager = () => {
  const blogPosts = useBlogStore(state => state.blogPosts);
  const loading = useBlogStore(state => state.loading);
  const fetchPosts = useBlogStore(state => state.fetchPosts);
  const getPublishedPosts = useBlogStore(state => state.getPublishedPosts);

  useEffect(() => {
    if (!blogPosts.length && !loading) {
      fetchPosts();
    }
    
    // Refresh posts periodically to keep the sitemap up to date
    const refreshInterval = setInterval(() => {
      fetchPosts({ forceFresh: true });
      console.log('Refreshed blog posts for sitemap generation');
    }, 3600000); // Every hour
    
    return () => clearInterval(refreshInterval);
  }, [blogPosts.length, loading, fetchPosts]);

  // Setup dynamic routes for sitemap.xml and robots.txt
  useEffect(() => {
    if (!blogPosts.length) return;

    // Get only published posts for sitemap generation
    const publishedPosts = getPublishedPosts();

    // Create a custom endpoint for sitemap.xml
    const handleSitemapRequest = (e: any) => {
      if (window.location.pathname === '/sitemap.xml') {
        e.preventDefault();
        e.stopPropagation();
        
        // Generate the XML content using only published posts
        const sitemapXml = generateSitemap(publishedPosts);
        
        // Create a blob and download it
        const blob = new Blob([sitemapXml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        // Return XML content
        document.open();
        document.write(sitemapXml);
        // Use document.documentElement.setAttribute instead of contentType
        document.documentElement.setAttribute('Content-Type', 'application/xml');
        document.close();
        
        console.log('Dynamic sitemap.xml served with', publishedPosts.length, 'posts');
      }
    };
    
    // Create a custom endpoint for robots.txt
    const handleRobotsRequest = (e: any) => {
      if (window.location.pathname === '/robots.txt') {
        e.preventDefault();
        e.stopPropagation();
        
        // Generate the robots.txt content
        const robotsTxt = generateRobotsTxt();
        
        // Return text content
        document.open();
        document.write(robotsTxt);
        // Use document.documentElement.setAttribute instead of contentType
        document.documentElement.setAttribute('Content-Type', 'text/plain');
        document.close();
        
        console.log('Dynamic robots.txt served');
      }
    };

    // Add event listeners
    window.addEventListener('navigate', handleSitemapRequest);
    window.addEventListener('navigate', handleRobotsRequest);
    window.addEventListener('popstate', handleSitemapRequest);
    window.addEventListener('popstate', handleRobotsRequest);
    
    // Also check on initial load
    if (window.location.pathname === '/sitemap.xml') {
      handleSitemapRequest(new Event('navigate'));
    }
    if (window.location.pathname === '/robots.txt') {
      handleRobotsRequest(new Event('navigate'));
    }

    return () => {
      window.removeEventListener('navigate', handleSitemapRequest);
      window.removeEventListener('navigate', handleRobotsRequest);
      window.removeEventListener('popstate', handleSitemapRequest);
      window.removeEventListener('popstate', handleRobotsRequest);
    };
  }, [blogPosts, getPublishedPosts]);

  // Add some global SEO metadata to the document head
  useEffect(() => {
    // Add verification tags for search engines if needed
    const logoUrl = "https://res.cloudinary.com/dyzamqtdw/image/upload/v1743554489/logo_llf3w4.svg";
    
    // Check if ld+json schema already exists
    const existingSchema = document.querySelector('script[type="application/ld+json"]');
    
    if (!existingSchema) {
      // Add JSON-LD structured data for the website
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Tonight Blog",
        "url": "https://tonight.blog",
        "logo": logoUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://tonight.blog/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      });
      document.head.appendChild(script);
      
      console.log('Added global structured data for better SEO');
    }
  }, []);

  return null;
};

export default SEOManager;
