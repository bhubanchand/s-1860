
import { BlogPost, useBlogStore, shouldDisplayPost } from "./posts";

// Get published posts with proper sorting
export const getPublishedPosts = (): BlogPost[] => {
  // Access the store directly
  const blogPosts = useBlogStore.getState().getPublishedPosts();
  
  // Sort posts by date (newest first)
  return sortByDate(blogPosts);
};

// Improved sorting for posts by date, time, and ID
export const sortByDate = (posts: BlogPost[]): BlogPost[] => {
  return [...posts].sort((a, b) => {
    // Convert dates to timestamps for comparison
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    
    // First, compare by date (newest first)
    if (dateA !== dateB) {
      return dateB - dateA;
    }
    
    // If dates are identical, check time field
    if (a.time && b.time) {
      const [hoursA, minutesA] = a.time.split('.').map(Number);
      const [hoursB, minutesB] = b.time.split('.').map(Number);
      
      const timeA = hoursA * 60 + minutesA;
      const timeB = hoursB * 60 + minutesB;
      
      if (timeA !== timeB) {
        return timeB - timeA;
      }
    }
    
    // If time is also identical, use ID as tiebreaker
    return b.id - a.id;
  });
};

// Get featured posts
export const getFeaturedPosts = (): BlogPost[] => {
  const posts = getPublishedPosts();
  const featuredPosts = posts.filter(post => post.featured);
  
  if (featuredPosts.length === 0) {
    return [];
  }
  
  // Get the main featured post (newest)
  const mainFeaturedPost = featuredPosts.length > 0 
    ? { ...featuredPosts[0], featuredSize: "large" as const }
    : null;
  
  // Get secondary featured posts
  const secondaryFeaturedPosts = featuredPosts
    .slice(1, 4)
    .map(post => ({ ...post, featuredSize: "medium" as const }));
  
  return mainFeaturedPost 
    ? [mainFeaturedPost, ...secondaryFeaturedPosts] 
    : secondaryFeaturedPosts;
};

// Get posts by category
export const getPostsByCategory = (category: string, limit?: number, excludeIds: number[] = []): BlogPost[] => {
  const allPosts = getPublishedPosts();
  
  // Filter by category and exclude specified posts
  const filteredPosts = allPosts.filter(post => 
    post.category === category && !excludeIds.includes(post.id)
  );
  
  return limit ? filteredPosts.slice(0, limit) : filteredPosts;
};

// Get recent posts
export const getRecentPosts = (limit: number = 6, excludeIds: number[] = []): BlogPost[] => {
  const allPosts = getPublishedPosts();
  
  // Filter out excluded posts
  const filteredPosts = allPosts.filter(post => !excludeIds.includes(post.id));
  
  // Return sorted and limited posts
  return filteredPosts.slice(0, limit);
};

// Get related posts (same category as the current post)
export const getRelatedPosts = (currentPostId: number, limit: number = 3): BlogPost[] => {
  const allPosts = getPublishedPosts();
  const currentPost = allPosts.find(post => post.id === currentPostId);
  
  if (!currentPost) return [];
  
  // Filter posts in the same category, excluding the current post
  const relatedPosts = allPosts.filter(post => 
    post.id !== currentPostId && post.category === currentPost.category
  );
  
  // Apply limit
  return relatedPosts.slice(0, limit);
};

// Find post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  if (!slug) return undefined;
  
  const allPosts = getPublishedPosts();
  return allPosts.find(post => post.slug === slug);
};

// Get posts for selected categories without repetition
export const getPostsWithoutRepetition = (category: string, limit: number = 4, excludeIds: number[] = []): BlogPost[] => {
  return getPostsByCategory(category, limit, excludeIds);
};
