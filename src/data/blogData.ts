
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
  // Get all featured posts sorted by date (newest first)
  const allFeaturedPosts = sortBlogPosts(blogPosts.filter((post) => post.featured));

  if (allFeaturedPosts.length === 0) return [];

  // Determine the most recent valid date from the featured posts
  const mostRecentDate = Math.max(...allFeaturedPosts.map(post => new Date(post.createdAt).getTime()));

  // Find all posts with this most recent date
  const latestFeaturedPosts = allFeaturedPosts.filter(
    post => new Date(post.createdAt).getTime() === mostRecentDate
  );

  // Assign the most recent featured post as the large post
  const mainFeaturedPost = latestFeaturedPosts.length > 0 
    ? { ...latestFeaturedPosts[0], featuredSize: "large" as const }
    : null;

  // Remove the selected large post from the list and sort remaining for medium posts
  const remainingFeaturedPosts = allFeaturedPosts.filter(post => post.id !== mainFeaturedPost?.id);

  // Get the next 5 most recent featured posts and assign them as medium
  const mediumFeaturedPosts = remainingFeaturedPosts
    .slice(0, 3) // Take up to 5 more posts
    .map(post => ({ ...post, featuredSize: "medium" as const }));

  // Combine large post with medium posts
  const result = mainFeaturedPost ? [mainFeaturedPost, ...mediumFeaturedPosts] : [...mediumFeaturedPosts];

  // Limit to 6 total featured posts (1 large + 5 medium)
  return result.slice(0, 6);
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
