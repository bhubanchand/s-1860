
// Blog data interface
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  createdAt: string;
  readTime: string;
  featured: boolean;
  featuredSize?: "large" | "medium" | "small";
}

// Import all blog posts from the centralized posts file
import { posts } from "./posts";

// Export the posts as blogPosts for backwards compatibility
export const blogPosts: BlogPost[] = posts;

/**
 * Generates the current date in YYYY-MM-DD format
 * This can be used when creating new blog posts to automatically set the current date
 */
export const getCurrentDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  // Adding 1 to getMonth because it returns 0-11
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

// Sorting by createdAt in descending order (newest first)
export const sortBlogPosts = (posts: BlogPost[]): BlogPost[] => {
  const now = new Date().getTime(); 

  return [...posts]
    .filter(post => post.createdAt && new Date(post.createdAt).getTime() <= now) 
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA; // Sort newest first
    });
};

// Get featured posts ensuring we have the right sizes and newest posts get priority
export const getFeaturedPosts = (): BlogPost[] => {
  // Get all posts sorted by date (newest first)
  const sortedPosts = sortBlogPosts(blogPosts);
  
  // Take the 6 newest posts for featuring, regardless of whether they were previously marked as featured
  const newFeaturedPosts = sortedPosts.slice(0, 6);
  
  // Always assign the newest post as the large post
  const mainFeaturedPost = newFeaturedPosts.length > 0 
    ? { ...newFeaturedPosts[0], featuredSize: "large" as const, featured: true }
    : null;
  
  // The next 5 newest posts are medium
  const mediumFeaturedPosts = newFeaturedPosts
    .slice(1, 6) // Skip the first post (used as large) and take up to 5 more
    .map(post => ({ ...post, featuredSize: "medium" as const, featured: true }));
  
  // Combine large post with medium posts
  const result = mainFeaturedPost ? [mainFeaturedPost, ...mediumFeaturedPosts] : [...mediumFeaturedPosts];
  
  return result;
};

// New function to prevent blog post repetition
export const getPostsWithoutRepetition = (
  category: string,
  count: number = 4,
  excludeIds: number[] = []
): BlogPost[] => {
  const filteredPosts = blogPosts.filter(
    (post) => post.category === category && !excludeIds.includes(post.id)
  );
  return sortBlogPosts(filteredPosts).slice(0, count);
};

// Utility functions
export const getRecentPosts = (count: number = 6, excludeIds: number[] = []): BlogPost[] => {
  return sortBlogPosts(
    blogPosts.filter(post => !excludeIds.includes(post.id))
  ).slice(0, count);
};

export const getPostsByCategory = (category: string, count?: number, excludeIds: number[] = []): BlogPost[] => {
  const filteredPosts = blogPosts.filter(
    (post) => post.category === category && !excludeIds.includes(post.id)
  );
  return count ? sortBlogPosts(filteredPosts).slice(0, count) : sortBlogPosts(filteredPosts);
};

export const getRelatedPosts = (currentPostId: number, count: number = 3): BlogPost[] => {
  const currentPost = blogPosts.find((post) => post.id === currentPostId);
  if (!currentPost) return [];

  return sortBlogPosts(
    blogPosts.filter((post) => post.id !== currentPostId && post.category === currentPost.category)
  ).slice(0, count);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

/**
 * Creates a new blog post with the current date
 * @param post The blog post data without createdAt
 * @returns A complete blog post with the current date
 */
export const createNewBlogPost = (post: Omit<BlogPost, 'createdAt'>): BlogPost => {
  return {
    ...post,
    createdAt: getCurrentDate(),
  };
};
