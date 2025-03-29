
import post1 from "@/blogs/1";
import post2 from "@/blogs/2";
import post3 from "@/blogs/3";
import post4 from "@/blogs/4";
import post5 from "@/blogs/5";
import post6 from "@/blogs/6";
import post7 from "@/blogs/7";
import post8 from "@/blogs/8";
import post9 from "@/blogs/9";
import post10 from "@/blogs/10";
import post11 from "@/blogs/11";
import post12 from "@/blogs/12";
import post13 from "@/blogs/13";
import post14 from "@/blogs/14";
import post15 from "@/blogs/15";
import post16 from "@/blogs/16";

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

// Import all blog posts - organizing them in dedicated files
export const blogPosts: BlogPost[] = [
post1,  
post2,  
post3,  
post4,  
post5,  
post6,  
post7,  
post8,  
post9,  
post10,  
post11,  
post12,  
post13,  
post14,  
post15,  
post16,  
];

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

// Get featured posts ensuring we have the right sizes and limits
export const getFeaturedPosts = (): BlogPost[] => {
  const allFeaturedPosts = sortBlogPosts(blogPosts.filter((post) => post.featured));
  
  // First, find the most recent large featured post
  const largeFeaturedPost = allFeaturedPosts.find(post => post.featuredSize === "large");
  
  // If no large featured post exists, take the most recent featured post and make it large
  const mainFeaturedPost = largeFeaturedPost 
    ? largeFeaturedPost 
    : (allFeaturedPosts.length > 0 
      ? { ...allFeaturedPosts[0], featuredSize: "large" as const } 
      : null);
  
  // Get medium featured posts (limit to 5)
  const mediumFeaturedPosts = allFeaturedPosts
    .filter(post => post.id !== (mainFeaturedPost?.id || 0))
    .slice(0, 5)
    .map(post => ({ ...post, featuredSize: "medium" as const }));
  
  // Combine large post with medium posts, ensuring we don't exceed 6 total
  const result = mainFeaturedPost ? [mainFeaturedPost, ...mediumFeaturedPosts] : [...mediumFeaturedPosts];
  
  // Limit to 6 total featured posts (1 large + 5 medium)
  return result.slice(0, 6);
};

// Utility functions
export const getRecentPosts = (count: number = 6): BlogPost[] => {
  return sortBlogPosts(blogPosts).slice(0, count);
};

export const getPostsByCategory = (category: string, count?: number): BlogPost[] => {
  const filteredPosts = blogPosts.filter((post) => post.category === category);
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
