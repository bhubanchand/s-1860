import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { processAllPostCommands } from "@/utils/blogCommands";

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
  featuredSize?: "large" | "medium" | "small" | "send" | "save" | "update" | "delete";
};

type BlogStore = {
  blogPosts: BlogPost[];
  loading: boolean;
  error: string | null;
  fetchPosts: (options?: { forceFresh?: boolean }) => Promise<void>;
  getPublishedPosts: () => BlogPost[];
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
      
      const response = await axios.get(API_URL, {
        params: { _t: new Date().getTime() }, // Cache busting
        timeout: 10000
      });
      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid API response format");
      }
      
      const posts = response.data as BlogPost[];
      
      // Normalize data to ensure consistent types
      const normalizedPosts = posts.map(post => ({
        ...post,
        id: Number(post.id),
        featured: Boolean(post.featured),
        content: String(post.content || ''),
        authorName: post.authorName || ''
      }));
      
      // Process any commands in the posts before updating the store
      const processedCount = await processAllPostCommands(normalizedPosts);
      if (processedCount > 0) {
        console.log(`Processed commands for ${processedCount} posts`);
      }
      
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
    
    // Filter out posts that have command values in featuredSize
    // and posts that shouldn't be displayed yet
    const publishedPosts = allPosts.filter(post => {
      // Don't show posts with command values in featuredSize
      if (post.featuredSize === "send" || 
          post.featuredSize === "save" || 
          post.featuredSize === "update" || 
          post.featuredSize === "delete") {
        return false;
      }
      
      // Check if post should be displayed based on schedule
      return shouldDisplayPost(post);
    });
    
    return publishedPosts;
  },
}));
