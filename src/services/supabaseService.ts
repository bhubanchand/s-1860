
import { BlogPost } from "@/data/posts";
import { blogPosts, getAllPostsIncludingScheduled, sortBlogPosts } from "@/data/blogData";
import { fetchAllPosts } from "@/lib/pocketbase";

// Simulating backend operations using frontend data
let nextId = 1;  // Will be updated after fetching posts

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

// Initialize the nextId based on existing posts
export const initializeNextId = async () => {
  try {
    const posts = await fetchAllPosts();
    if (posts.length > 0) {
      nextId = Math.max(...posts.map(post => typeof post.id === 'string' ? parseInt(post.id) : post.id)) + 1;
    }
  } catch (error) {
    console.error("Failed to initialize nextId:", error);
  }
};

// Call this function when the app starts
initializeNextId();

// Mock fetch function - returns a copy of the posts
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const posts = await fetchAllPosts();
    return [...posts];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [...blogPosts]; // Fallback to local data
  }
};

// Mock create function - adds to the local array
export const createScheduledBlogPost = async (post: Omit<BlogPost, 'id'>) => {
  const newPost: BlogPost = {
    ...post,
    id: nextId++,
    createdAt: new Date().toISOString()
  };
  
  // In a real app, we would push to PocketBase
  // This is a simulation
  blogPosts.push(newPost);
  
  return newPost;
};

// Fetch only published posts (respecting the publish_at date)
export const fetchPublishedBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const posts = await fetchAllPosts();
    return sortBlogPosts(posts);
  } catch (error) {
    console.error("Error fetching published blog posts:", error);
    return sortBlogPosts(blogPosts); // Fallback to local data
  }
};

// Update existing blog post with optional scheduling
export const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
  const allPosts = await getAllPostsIncludingScheduled();
  const postIndex = allPosts.findIndex(p => p.id.toString() === id);
  
  if (postIndex === -1) {
    throw new Error('Post not found');
  }
  
  // Update the post
  const updatedPost = {
    ...allPosts[postIndex],
    ...post,
    // Add updated timestamp
    updatedAt: new Date().toISOString()
  };
  
  // Update the post in the array (in real app, would update in PocketBase)
  blogPosts[postIndex] = updatedPost;
  
  return updatedPost;
};

export const deleteBlogPost = async (id: string) => {
  const allPosts = await getAllPostsIncludingScheduled();
  const postIndex = allPosts.findIndex(p => p.id.toString() === id);
  
  if (postIndex === -1) {
    throw new Error('Post not found');
  }
  
  // Remove the post from the array (in real app, would delete from PocketBase)
  blogPosts.splice(postIndex, 1);
  
  return true;
};

// Get all scheduled posts for admin view
export const fetchScheduledBlogPosts = async (): Promise<BlogPost[]> => {
  const now = new Date().toISOString();
  const allPosts = await getAllPostsIncludingScheduled();
  
  return allPosts
    .filter(post => post.publishAt && post.publishAt > now)
    .sort((a, b) => {
      return new Date(a.publishAt || '').getTime() - new Date(b.publishAt || '').getTime();
    });
};
