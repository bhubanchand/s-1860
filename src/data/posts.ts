
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { getCurrentISTDateTime, isPostPublished } from "@/lib/utils";

const API_URL = "https://script.google.com/macros/s/AKfycbzs97wtjvWKT8odbHgsBWT4g8RH_H0Mag-hXTSgDtcwbBXH8hoKoqZJXVWnFHRn2Ora/exec";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  createdAt: string;
  readTime: string;
  time: string; // Time field for scheduling (format: "HH.MM")
  featured: boolean;
  featuredSize?: "large" | "medium" | "small";
};

type BlogStore = {
  blogPosts: BlogPost[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  startAutoFetch: () => () => void;
  getScheduledPosts: () => BlogPost[];
};

export const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      blogPosts: [],
      loading: true,
      error: null,

      fetchPosts: async () => {
        try {
          const response = await axios.get(API_URL);
          const newPosts: BlogPost[] = response.data;

          // Process content for markdown-like formatting
          const processedPosts = newPosts.map(post => ({
            ...post,
            // Ensure content is a string
            content: typeof post.content === 'string' ? post.content : '',
          }));

          // Ensure a re-render by forcing a new array reference
          set({ blogPosts: [...processedPosts], loading: false, error: null });
          console.log(`Fetched ${processedPosts.length} posts, current time: ${new Date().toLocaleTimeString()}`);
        } catch (err) {
          set({ error: "Failed to fetch blog posts", loading: false });
          console.error("Error fetching posts:", err);
        }
      },

      getScheduledPosts: () => {
        const blogPosts = get().blogPosts;
        const now = getCurrentISTDateTime();
        
        return blogPosts.filter(post => {
          // Include immediately if no time is specified
          if (!post.time || post.time.trim() === '') return true;
          
          // Try to parse and validate the time format (HH.MM)
          if (!/^\d{1,2}\.\d{1,2}$/.test(post.time)) {
            console.warn(`Invalid time format for post ID ${post.id}: ${post.time}`);
            return false;
          }
          
          // Get hours and minutes from string like "14.30"
          const [hoursStr, minutesStr] = post.time.split('.');
          const hours = parseInt(hoursStr, 10);
          const minutes = parseInt(minutesStr, 10);
          
          // Basic validation
          if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            console.warn(`Invalid time values for post ID ${post.id}: ${post.time}`);
            return false;
          }
          
          // Create post date (today with specified time)
          const postDate = new Date();
          postDate.setHours(hours, minutes, 0, 0);
          
          // Compare with current time
          return postDate.getTime() <= now.getTime();
        });
      },

      startAutoFetch: () => {
        const interval = setInterval(async () => {
          await get().fetchPosts(); // Fetch new data every 60s
        }, 60000);
        return () => clearInterval(interval);
      },
    }),
    {
      name: "blog-storage", // Persist blog data in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
