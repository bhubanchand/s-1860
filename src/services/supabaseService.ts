
import { BlogPost } from "@/data/blogData";
import { blogPosts, getAllPostsIncludingScheduled, sortBlogPosts } from "@/data/blogData";

// Simulating backend operations using frontend data
let nextId = Math.max(...blogPosts.map(post => typeof post.id === 'string' ? parseInt(post.id) : post.id)) + 1;

export interface SupabaseBlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  slug: string;
  category: string;
  read_time: string;
  created_at: string;
  updated_at: string;
  featured: boolean;
  featured_size?: string;
  publish_at?: string; // Field for scheduled posts
}

// Mock fetch function - returns a copy of the posts
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  return Promise.resolve([...blogPosts]);
};

// Mock create function - adds to the local array
export const createScheduledBlogPost = async (post: Omit<BlogPost, 'id'>) => {
  const newPost: BlogPost = {
    ...post,
    id: nextId++,
    createdAt: new Date().toISOString()
  };
  
  // In a real app, we would push to database
  // This is a simulation
  blogPosts.push(newPost);
  
  return newPost;
};

// Fetch only published posts (respecting the publish_at date)
export const fetchPublishedBlogPosts = async (): Promise<BlogPost[]> => {
  return Promise.resolve(sortBlogPosts(blogPosts));
};

// Update existing blog post with optional scheduling
export const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
  const postIndex = blogPosts.findIndex(p => p.id.toString() === id);
  
  if (postIndex === -1) {
    throw new Error('Post not found');
  }
  
  // Update the post
  const updatedPost = {
    ...blogPosts[postIndex],
    ...post,
    // Add updated timestamp
    updatedAt: new Date().toISOString()
  };
  
  // Update the post in the array
  blogPosts[postIndex] = updatedPost;
  
  return updatedPost;
};

export const deleteBlogPost = async (id: string) => {
  const postIndex = blogPosts.findIndex(p => p.id.toString() === id);
  
  if (postIndex === -1) {
    throw new Error('Post not found');
  }
  
  // Remove the post from the array
  blogPosts.splice(postIndex, 1);
  
  return true;
};

// Get all scheduled posts for admin view
export const fetchScheduledBlogPosts = async (): Promise<BlogPost[]> => {
  const now = new Date().toISOString();
  
  return Promise.resolve(
    blogPosts
      .filter(post => post.publishAt && post.publishAt > now)
      .sort((a, b) => {
        return new Date(a.publishAt || '').getTime() - new Date(b.publishAt || '').getTime();
      })
  );
};
