
import { isPostPublished } from "@/lib/utils";

// Blog data interface
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  createdAt: string; // This will be used as the display date once published
  publishDate: string; // New field for scheduling: ISO format date string
  readTime: string;
  featured: boolean;
  featuredSize?: "large" | "medium" | "small";
}

// Import all blog posts from the centralized posts file
import { posts } from "./posts";

// Export the posts as blogPosts for backwards compatibility
export const blogPosts: BlogPost[] = posts;

// Get only published posts
export const getPublishedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => isPostPublished(post.publishDate || post.createdAt));
};

// Sorting by createdAt in descending order (newest first)
export const sortBlogPosts = (posts: BlogPost[]): BlogPost[] => {
  return [...posts]
    .filter(post => post.createdAt && isPostPublished(post.publishDate || post.createdAt))
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA; // Sort newest first
    });
};

// Get featured posts ensuring we have the right sizes and newest posts get priority
export const getFeaturedPosts = (): BlogPost[] => {
  // Get all published posts
  const publishedPosts = getPublishedPosts();
  
  // Sort by date (newest first)
  const sortedPosts = sortBlogPosts(publishedPosts);
  
  if (sortedPosts.length === 0) return [];

  // Use the 6 newest posts as featured
  const newestPosts = sortedPosts.slice(0, 6);
  
  // Assign the most recent post as the large featured post
  const mainFeaturedPost = { ...newestPosts[0], featuredSize: "large" as const };
  
  // Assign the next 5 posts as medium featured posts
  const mediumFeaturedPosts = newestPosts.slice(1, 6).map(post => ({ 
    ...post, 
    featuredSize: "medium" as const 
  }));

  // Combine large post with medium posts
  return [mainFeaturedPost, ...mediumFeaturedPosts];
};

// New function to prevent blog post repetition
export const getPostsWithoutRepetition = (
  category: string,
  count: number = 4,
  excludeIds: number[] = []
): BlogPost[] => {
  const filteredPosts = getPublishedPosts().filter(
    (post) => post.category === category && !excludeIds.includes(post.id)
  );
  return sortBlogPosts(filteredPosts).slice(0, count);
};

// Utility functions
export const getRecentPosts = (count: number = 6, excludeIds: number[] = []): BlogPost[] => {
  return sortBlogPosts(
    getPublishedPosts().filter(post => !excludeIds.includes(post.id))
  ).slice(0, count);
};

export const getPostsByCategory = (category: string, count?: number, excludeIds: number[] = []): BlogPost[] => {
  const filteredPosts = getPublishedPosts().filter(
    (post) => post.category === category && !excludeIds.includes(post.id)
  );
  return count ? sortBlogPosts(filteredPosts).slice(0, count) : sortBlogPosts(filteredPosts);
};

export const getRelatedPosts = (currentPostId: number, count: number = 3): BlogPost[] => {
  const currentPost = getPublishedPosts().find((post) => post.id === currentPostId);
  if (!currentPost) return [];

  return sortBlogPosts(
    getPublishedPosts().filter((post) => post.id !== currentPostId && post.category === currentPost.category)
  ).slice(0, count);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  // For individual post display, we need to check if it's published
  const post = blogPosts.find((post) => post.slug === slug);
  if (!post) return undefined;
  
  // Only return the post if it's published or scheduled for publication
  return isPostPublished(post.publishDate || post.createdAt) ? post : undefined;
};

// Helper function to create a new blog post with scheduling
export const createScheduledPost = (
  postData: Omit<BlogPost, 'id' | 'publishDate' | 'createdAt'>, 
  scheduledDate: string
): BlogPost => {
  // Generate a new unique ID
  const newId = Math.max(...blogPosts.map(post => post.id)) + 1;
  
  // Current date for createdAt (will be shown as publication date)
  const createdAt = new Date().toISOString().slice(0, 10);
  
  return {
    ...postData,
    id: newId,
    createdAt: createdAt,
    publishDate: scheduledDate,
  };
};
