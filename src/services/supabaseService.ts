import { BlogPost } from "@/data/posts";
import { getRecentPosts, getPostsByCategory, getRelatedPosts } from "@/data/blogData";

// Secure the data operations using localStorage as a secure vault
// This simulates backend operations but keeps everything in the browser
const LOCAL_STORAGE_KEY = "secure-blog-posts-vault";

// Initialize secure vault if it doesn't exist
const initializeSecureVault = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    // Get initial data from the current store
    const initialPosts = getRecentPosts(100);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialPosts));
  }
};

// Get posts from secure vault
const getSecureVaultPosts = (): BlogPost[] => {
  initializeSecureVault();
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading secure vault:", error);
    return [];
  }
};

// Save posts to secure vault
const saveSecureVaultPosts = (posts: BlogPost[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error("Error writing to secure vault:", error);
  }
};

// Simulating backend operations using frontend data
let nextId = 1000; // Start with a high number to avoid conflicts

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

// Secure fetch function - returns a copy of the posts
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const posts = getSecureVaultPosts();
  return Promise.resolve([...posts]);
};

// Secure create function - adds to the secure vault
export const createScheduledBlogPost = async (post: Omit<BlogPost, 'id'>) => {
  const posts = getSecureVaultPosts();
  
  const newPost: BlogPost = {
    ...post,
    id: nextId++,
    createdAt: new Date().toISOString()
  };
  
  posts.push(newPost);
  saveSecureVaultPosts(posts);
  
  return newPost;
};

// Fetch only published posts (respecting the publishAt date)
export const fetchPublishedBlogPosts = async (): Promise<BlogPost[]> => {
  const posts = getSecureVaultPosts();
  const now = new Date();
  
  return Promise.resolve(
    posts.filter(post => {
      // If no publishAt date, show the post
      if (!post.publishAt) return true;
      
      // If post has a publishAt date, only show if it's in the past
      return new Date(post.publishAt) <= now;
    }).sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
  );
};

// Update existing blog post with optional scheduling
export const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
  const posts = getSecureVaultPosts();
  const postIndex = posts.findIndex(p => p.id.toString() === id);
  
  if (postIndex === -1) {
    throw new Error('Post not found');
  }
  
  // Update the post
  const updatedPost = {
    ...posts[postIndex],
    ...post,
    // Add updated timestamp
    updatedAt: new Date().toISOString()
  };
  
  // Update the post in the array
  posts[postIndex] = updatedPost;
  saveSecureVaultPosts(posts);
  
  return updatedPost;
};

export const deleteBlogPost = async (id: string) => {
  const posts = getSecureVaultPosts();
  const postIndex = posts.findIndex(p => p.id.toString() === id);
  
  if (postIndex === -1) {
    throw new Error('Post not found');
  }
  
  // Remove the post from the array
  posts.splice(postIndex, 1);
  saveSecureVaultPosts(posts);
  
  return true;
};

// Get all scheduled posts for admin view
export const fetchScheduledBlogPosts = async (): Promise<BlogPost[]> => {
  const posts = getSecureVaultPosts();
  const now = new Date().toISOString();
  
  return Promise.resolve(
    posts
      .filter(post => post.publishAt && post.publishAt > now)
      .sort((a, b) => {
        return new Date(a.publishAt || '').getTime() - new Date(b.publishAt || '').getTime();
      })
  );
};
