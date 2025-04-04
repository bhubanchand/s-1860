
import { BlogPost } from '@/data/blogData';
import { toast } from 'sonner';

/**
 * Process all posts for commands in the featuredSize field
 * @param posts List of blog posts to check for commands
 * @returns Number of posts with commands that were processed
 */
export const processAllPostCommands = async (posts: BlogPost[]): Promise<number> => {
  if (!posts || posts.length === 0) {
    return 0;
  }

  let processedCount = 0;

  for (const post of posts) {
    if (await processPostCommand(post)) {
      processedCount++;
    }
  }

  return processedCount;
};

/**
 * Process a single post for commands in the featuredSize field
 * @param post Blog post to check for commands
 * @returns True if a command was processed, false otherwise
 */
const processPostCommand = async (post: BlogPost): Promise<boolean> => {
  // Check if this post has a command in the featuredSize field
  if (!post.featuredSize) {
    return false;
  }

  const command = post.featuredSize;
  
  // Skip if it's not a command
  if (command !== 'send' && command !== 'save' && 
      command !== 'update' && command !== 'delete') {
    return false;
  }

  console.log(`Processing command '${command}' for post: ${post.title} (ID: ${post.id})`);

  try {
    switch (command) {
      case 'send':
      case 'save':
        // Create or update the post file and related assets
        await savePostFile(post);
        break;
        
      case 'update':
        // Update an existing post
        await updatePostFile(post);
        break;
        
      case 'delete':
        // Delete a post and related assets
        await deletePostFile(post);
        break;
    }
    
    return true;
  } catch (error) {
    console.error(`Error processing command for post ID ${post.id}:`, error);
    toast.error(`Failed to process ${command} command for post: ${post.title}`);
    return false;
  }
};

/**
 * Save a post to a file
 * Frontend implementation that uses LocalStorage to simulate file operations
 */
const savePostFile = async (post: BlogPost): Promise<void> => {
  // Get existing posts from localStorage or initialize empty array
  const savedPosts = JSON.parse(localStorage.getItem('saved-blog-posts') || '[]');
  
  // Check if post already exists
  const existingIndex = savedPosts.findIndex((p: BlogPost) => p.id === post.id);
  
  if (existingIndex >= 0) {
    // Update existing post
    savedPosts[existingIndex] = { 
      ...post,
      lastSaved: new Date().toISOString(),
      featuredSize: post.featuredSize === 'send' || post.featuredSize === 'save' ? 'medium' : post.featuredSize
    };
  } else {
    // Add new post
    savedPosts.push({
      ...post,
      lastSaved: new Date().toISOString(),
      featuredSize: 'medium' // Reset command to normal size
    });
  }
  
  // Save back to localStorage
  localStorage.setItem('saved-blog-posts', JSON.stringify(savedPosts));
  
  // Generate SEO data and store it
  const seoData = generateSEOData(post);
  
  const savedSEO = JSON.parse(localStorage.getItem('blog-seo-data') || '{}');
  savedSEO[post.id] = seoData;
  localStorage.setItem('blog-seo-data', JSON.stringify(savedSEO));
  
  // Generate ad configuration
  const adConfig = generateAdConfig(post);
  
  const savedAds = JSON.parse(localStorage.getItem('blog-ads-config') || '{}');
  savedAds[post.id] = adConfig;
  localStorage.setItem('blog-ads-config', JSON.stringify(savedAds));
  
  console.log(`Saved post "${post.title}" (ID: ${post.id}) to localStorage`);
  toast.success(`Post "${post.title}" has been saved`);
};

/**
 * Update an existing post file
 * Frontend implementation that uses LocalStorage to simulate file operations
 */
const updatePostFile = async (post: BlogPost): Promise<void> => {
  // Get existing posts from localStorage
  const savedPosts = JSON.parse(localStorage.getItem('saved-blog-posts') || '[]');
  
  // Check if post exists
  const existingIndex = savedPosts.findIndex((p: BlogPost) => p.id === post.id);
  
  if (existingIndex >= 0) {
    // Update existing post
    savedPosts[existingIndex] = { 
      ...post,
      lastUpdated: new Date().toISOString(),
      featuredSize: 'medium' // Reset command
    };
    
    // Save back to localStorage
    localStorage.setItem('saved-blog-posts', JSON.stringify(savedPosts));
    
    // Update SEO data
    const seoData = generateSEOData(post);
    const savedSEO = JSON.parse(localStorage.getItem('blog-seo-data') || '{}');
    savedSEO[post.id] = seoData;
    localStorage.setItem('blog-seo-data', JSON.stringify(savedSEO));
    
    // Update ad configuration
    const adConfig = generateAdConfig(post);
    const savedAds = JSON.parse(localStorage.getItem('blog-ads-config') || '{}');
    savedAds[post.id] = adConfig;
    localStorage.setItem('blog-ads-config', JSON.stringify(savedAds));
    
    console.log(`Updated post "${post.title}" (ID: ${post.id}) in localStorage`);
    toast.success(`Post "${post.title}" has been updated`);
  } else {
    // If post doesn't exist, save it instead
    await savePostFile(post);
  }
};

/**
 * Delete a post file and related assets
 * Frontend implementation that uses LocalStorage to simulate file operations
 */
const deletePostFile = async (post: BlogPost): Promise<void> => {
  // Get existing posts from localStorage
  const savedPosts = JSON.parse(localStorage.getItem('saved-blog-posts') || '[]');
  
  // Filter out the post to delete
  const updatedPosts = savedPosts.filter((p: BlogPost) => p.id !== post.id);
  
  // Save back to localStorage
  localStorage.setItem('saved-blog-posts', JSON.stringify(updatedPosts));
  
  // Remove SEO data
  const savedSEO = JSON.parse(localStorage.getItem('blog-seo-data') || '{}');
  delete savedSEO[post.id];
  localStorage.setItem('blog-seo-data', JSON.stringify(savedSEO));
  
  // Remove ad configuration
  const savedAds = JSON.parse(localStorage.getItem('blog-ads-config') || '{}');
  delete savedAds[post.id];
  localStorage.setItem('blog-ads-config', JSON.stringify(savedAds));
  
  console.log(`Deleted post "${post.title}" (ID: ${post.id}) from localStorage`);
  toast.success(`Post "${post.title}" has been deleted`);
};

/**
 * Generate SEO data for a blog post
 */
const generateSEOData = (post: BlogPost) => {
  return {
    title: post.title,
    description: post.excerpt,
    keywords: generateKeywords(post),
    ogImage: post.image,
    lastUpdated: new Date().toISOString(),
  };
};

/**
 * Generate ad configuration for a blog post
 */
const generateAdConfig = (post: BlogPost) => {
  // Generate different ad slots based on post content/category
  return {
    headerAd: `post-header-${post.id}`,
    contentAd: `post-content-${post.id}`,
    sidebarAd: `post-sidebar-${post.id}`,
    footerAd: `post-footer-${post.id}`,
    lastUpdated: new Date().toISOString(),
  };
};

/**
 * Generate keywords from post content
 */
const generateKeywords = (post: BlogPost): string[] => {
  // Simple implementation to extract potential keywords
  const allText = `${post.title} ${post.category} ${post.excerpt} ${post.content}`;
  
  // Remove special characters and split into words
  const words = allText.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  // Count word frequency
  const wordCount: Record<string, number> = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  // Convert to array of [word, count] pairs and sort by count
  const sortedWords = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .map(pair => pair[0]);
  
  // Return top 10 words as keywords, plus category
  return [...new Set([post.category.toLowerCase(), ...sortedWords.slice(0, 10)])];
};
