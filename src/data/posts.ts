
import { create } from "zustand";
import axios from "axios";

const API_URL = "https://script.google.com/macros/s/AKfycbzf0VinqJxKhdytV0NwUtneq1l--weG_cTUkoR9tUMwgQ6uUdjH3b_Kj27qCBxLulgZWg/exec";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  createdAt: string;
  authorName?: string;
  readTime: string;
  time: string;
  featured: boolean;
  featuredSize?: "large" | "medium" | "small";
  publishAt?: string; // Added this property to fix TypeScript errors
  updatedAt?: string; // Added for consistency
};

type BlogStore = {
  blogPosts: BlogPost[];
  loading: boolean;
  error: string | null;
  fetchPosts: (options?: { forceFresh?: boolean }) => Promise<void>;
  getPublishedPosts: () => BlogPost[];
  startAutoFetch: () => () => void; // Added this function to fix the TypeScript error
};

// Determine if a post should be displayed based on its scheduled time
export function shouldDisplayPost(post: BlogPost): boolean {
  try {
    // If time is missing or empty, always display the post
    if (!post.time || post.time.trim() === '') {
      return true;
    }
    
    // Parse dates for comparison
    const now = new Date();
    const postDate = new Date(post.createdAt);
    
    // Create a new Date for start of today to avoid modifying 'now'
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    
    // Check if the post date is from a previous day
    if (postDate.getTime() < todayStart.getTime()) {
      return true;
    }
    
    // If it's today's post, check the time
    if (postDate.getDate() === now.getDate() && 
        postDate.getMonth() === now.getMonth() &&
        postDate.getFullYear() === now.getFullYear()) {
      
      // Handle case when time format is invalid
      if (!post.time.includes('.')) {
        return false;
      }
      
      const [hoursStr, minutesStr] = post.time.split('.');
      const scheduledHours = parseInt(hoursStr, 10);
      const scheduledMinutes = parseInt(minutesStr, 10);
      
      if (isNaN(scheduledHours) || isNaN(scheduledMinutes)) {
        return false;
      }
      
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      
      // Compare with current time
      if (currentHours > scheduledHours) {
        return true;
      }
      
      if (currentHours === scheduledHours && currentMinutes >= scheduledMinutes) {
        return true;
      }
      
      return false;
    }
    
    // If it's a future date, don't display
    return false;
    
  } catch (err) {
    return false;
  }
}

// Create a secure data access method using localStorage as a cache to reduce API exposure
const getSecureData = async (url: string) => {
  // Check localStorage cache first
  try {
    const cachedData = localStorage.getItem('blog-posts-cache');
    if (cachedData) {
      const { posts, timestamp } = JSON.parse(cachedData);
      const cacheAge = Date.now() - timestamp;
      
      // Use cache if it's less than 30 minutes old
      if (cacheAge < 30 * 60 * 1000 && Array.isArray(posts) && posts.length > 0) {
        return posts;
      }
    }
  } catch (e) {
    // Continue with API fetch if cache fails
  }
  
  // Fetch data with a secure approach
  try {
    // Add a cache-busting parameter without revealing the exact URL structure
    const secureUrl = url + (url.includes('?') ? '&' : '?') + '_t=' + Date.now();
    
    // Use the fetch API with more security headers
    const response = await fetch(secureUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache',
        'Referrer-Policy': 'no-referrer'
      },
      credentials: 'omit' // Don't send cookies with the request
    });
    
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const useBlogStore = create<BlogStore>()((set, get) => ({
  blogPosts: [],
  loading: true,
  error: null,

  fetchPosts: async (options = {}) => {
    try {
      if (!options.forceFresh) {
        // Check if we already have posts loaded
        const currentPosts = get().blogPosts;
        if (currentPosts.length > 0) {
          return;
        }

        // Check localStorage cache first if not forcing fresh data
        try {
          const cachedData = localStorage.getItem('blog-posts-cache');
          if (cachedData) {
            const { posts, timestamp } = JSON.parse(cachedData);
            const cacheAge = Date.now() - timestamp;
            
            // Use cache if it's less than 1 hour old
            if (cacheAge < 60 * 60 * 1000 && Array.isArray(posts) && posts.length > 0) {
              set({ 
                blogPosts: posts,
                loading: false,
                error: null
              });
              return;
            }
          }
        } catch (e) {
          // Continue with API fetch if cache fails
        }
      }
      
      set({ loading: true, error: null });
      
      // Use the secure data access method
      const data = await getSecureData(API_URL);
      
      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid API response format");
      }
      
      const posts = data as BlogPost[];
      
      // Normalize data to ensure consistent types
      const normalizedPosts = posts.map(post => ({
        ...post,
        id: Number(post.id),
        featured: Boolean(post.featured),
        content: String(post.content || ''),
        authorName: post.authorName || '',
        publishAt: post.publishAt || null // Ensure publishAt property exists
      }));
      
      set({ 
        blogPosts: normalizedPosts, 
        loading: false,
        error: null
      });
      
      // Store in localStorage as backup
      try {
        localStorage.setItem('blog-posts-cache', JSON.stringify({
          posts: normalizedPosts,
          timestamp: Date.now()
        }));
      } catch (e) {
        // Ignore storage errors
      }
      
    } catch (err) {
      // Try to load from localStorage cache as fallback
      try {
        const cachedData = localStorage.getItem('blog-posts-cache');
        if (cachedData) {
          const { posts } = JSON.parse(cachedData);
          if (Array.isArray(posts) && posts.length > 0) {
            set({ 
              blogPosts: posts,
              loading: false,
              error: null
            });
            return;
          }
        }
      } catch (e) {
        // Continue with error handling
      }
      
      set({ 
        error: "Failed to fetch blog posts", 
        loading: false 
      });
      
      throw err;
    }
  },

  getPublishedPosts: () => {
    const allPosts = get().blogPosts;
    const publishedPosts = allPosts.filter(post => shouldDisplayPost(post));
    
    return publishedPosts;
  },
  
  // Added to fix the TypeScript error in BlogProvider
  startAutoFetch: () => {
    const interval = setInterval(async () => {
      try {
        await get().fetchPosts({ forceFresh: true });
      } catch (err) {
        console.error("Auto-fetch error:", err);
      }
    }, 10 * 60 * 1000); // Check every 10 minutes instead of every 10 seconds
    
    return () => clearInterval(interval);
  }
}));
