
import { BlogPost, useBlogStore } from "./posts";

// Use the scheduled posts from the store
export const getScheduledPosts = (): BlogPost[] => {
  return useBlogStore.getState().getScheduledPosts();
};

// Sorting by createdAt in descending order (newest first)
export const sortBlogPosts = (posts: BlogPost[]): BlogPost[] => {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Reset time to 00:00:00 for today's date

  return [...posts]
    .filter(post => {
      if (!post.createdAt) return false;

      const postDate = new Date(post.createdAt);
      postDate.setHours(0, 0, 0, 0); // Normalize post date to ignore time
      
      return postDate.getTime() <= now.getTime(); // Exclude future dates
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Sort newest first
};

// Get featured posts ensuring we have the right sizes and newest posts get priority
export const getFeaturedPosts = (): BlogPost[] => {
  const blogPosts = getScheduledPosts();
  const allFeaturedPosts = sortBlogPosts(blogPosts.filter(post => post.featured));

  if (allFeaturedPosts.length === 0) return [];

  const mostRecentDate = Math.max(...allFeaturedPosts.map(post => new Date(post.createdAt).getTime()));

  const latestFeaturedPosts = allFeaturedPosts
    .filter(post => new Date(post.createdAt).getTime() === mostRecentDate)
    .sort((a, b) => b.id - a.id);

  const mainFeaturedPost = latestFeaturedPosts.length > 0 
    ? { ...latestFeaturedPosts[0], featuredSize: "large" as const }
    : null;

  const remainingFeaturedPosts = allFeaturedPosts.filter(post => post.id !== mainFeaturedPost?.id);
  const sortedRemainingPosts = remainingFeaturedPosts.sort((a, b) => {
    const dateDiff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return dateDiff !== 0 ? dateDiff : b.id - a.id;
  });

  const mediumFeaturedPosts = sortedRemainingPosts
    .slice(0, 3)
    .map(post => ({ ...post, featuredSize: "medium" as const }));

  return mainFeaturedPost ? [mainFeaturedPost, ...mediumFeaturedPosts] : [...mediumFeaturedPosts];
};

// Utility functions (All now filter through the scheduler)
export const getPostsWithoutRepetition = (category: string, count: number = 4, excludeIds: number[] = []): BlogPost[] => {
  const blogPosts = getScheduledPosts();
  const filteredPosts = blogPosts.filter(post => post.category === category && !excludeIds.includes(post.id));
  return sortBlogPosts(filteredPosts).slice(0, count);
};

export const getRecentPosts = (count: number = 6, excludeIds: number[] = []): BlogPost[] => {
  const blogPosts = getScheduledPosts();
  return sortBlogPosts(blogPosts.filter(post => !excludeIds.includes(post.id))).slice(0, count);
};

export const getPostsByCategory = (category: string, count?: number, excludeIds: number[] = []): BlogPost[] => {
  const blogPosts = getScheduledPosts();
  const filteredPosts = blogPosts.filter(post => post.category === category && !excludeIds.includes(post.id));
  return count ? sortBlogPosts(filteredPosts).slice(0, count) : sortBlogPosts(filteredPosts);
};

export const getRelatedPosts = (currentPostId: number, count: number = 3): BlogPost[] => {
  const blogPosts = getScheduledPosts();
  const currentPost = blogPosts.find(post => post.id === currentPostId);
  if (!currentPost) return [];

  return sortBlogPosts(blogPosts.filter(post => post.id !== currentPostId && post.category === currentPost.category)).slice(0, count);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  const blogPosts = getScheduledPosts();
  return blogPosts.find(post => post.slug === slug);
};
