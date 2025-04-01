
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
    
    // Check if the post date is from a previous day
    if (postDate.getTime() < now.setHours(0, 0, 0, 0)) {
      return true;
    }
    
    // If it's today's post, check the time
    if (postDate.getDate() === now.getDate() && 
        postDate.getMonth() === now.getMonth() &&
        postDate.getFullYear() === now.getFullYear()) {
      
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
    console.error("Error checking post display status:", err);
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
          console.log("Store: Using already loaded posts");
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
              console.log("Store: Using cached posts from localStorage");
              set({ 
                blogPosts: posts,
                loading: false,
                error: null
              });
              return;
            }
          }
        } catch (e) {
          console.warn("Failed to load cached posts:", e);
        }
      }
      
      set({ loading: true, error: null });
      
      console.log("Store: Fetching posts from API");
      const response = await axios.get(API_URL, {
        params: { _t: new Date().getTime() }, // Cache busting
        timeout: 10000
      });
      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid API response format");
      }
      
      const posts = response.data as BlogPost[];
      console.log(`Store: Fetched ${posts.length} posts successfully`);
      
      // Normalize data to ensure consistent types
      const normalizedPosts = posts.map(post => ({
        ...post,
        id: Number(post.id),
        featured: Boolean(post.featured),
        content: String(post.content || ''),
        authorName: post.authorName || ''
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
        console.log("Store: Posts cached in localStorage");
      } catch (e) {
        console.warn("Failed to cache posts in localStorage:", e);
      }
      
    } catch (err) {
      console.error("Store: Error fetching posts:", err);
      
      // Try to load from localStorage cache as fallback
      try {
        const cachedData = localStorage.getItem('blog-posts-cache');
        if (cachedData) {
          const { posts, timestamp } = JSON.parse(cachedData);
          const cacheAge = Date.now() - timestamp;
          
          // Use cache if it's less than 1 hour old
          if (cacheAge < 60 * 60 * 1000 && Array.isArray(posts) && posts.length > 0) {
            console.log("Store: Using cached posts from localStorage");
            set({ 
              blogPosts: posts,
              loading: false,
              error: null
            });
            return;
          }
        }
      } catch (e) {
        console.warn("Failed to load cached posts:", e);
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
    return allPosts.filter(post => shouldDisplayPost(post));
  },
}));
